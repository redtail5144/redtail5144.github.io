/*!
* \date 2019-10
* \author Austin Campbell
* \author Kyler Fisher
* \author Matthew Wilbern
*/

#include "RestMethods.h"

#include <restbed>
#include <nlohmann/json.hpp>
#include <cstring>
#include <memory>
#include <string>
#include <sstream>
#include <utility>
#include <stdexcept>

#include "Data.h"
#include "Issue.h"
#include "User.h"
#include "SaveLoad.h"
#include "Info.h"
#include "utily.h"      // NOLINT
#include "Exceptions.h"
#include "Comment.h"
#include "RestMethods.h"

using nlohmann::json;
using saveload::save;
using saveload::load;

// Response header to prevent a cross site validation problem
#define MULTMAPSS std::multimap<std::string, std::string>
#define ALLOW_ALL { "Access-Control-Allow-Origin", "*" }
#define THE_CREDS { "Access-Control-Allow-Credentials", "true" }
#define RESPONSE_T { "Content-Type", "application/json" }

// Response header to close connection
#define CLOSE_CONNECTION { "Connection", "close" }

std::string FILE_SAVE = "data/data.data"; // NOLINT
Data d(FILE_SAVE);

//***************************************************************
//
// HELPER METHOD(S)
//
//***************************************************************

bool upShift(json* j, int ID) {
  json j2;
  bool f = false;
  for (int i = 0; i < j->size(); i++) {
    if (j->at(i)["ID"] != ID) {
      j2.push_back(j->at(i));
    } else {
      f = true;
    }
  }
  *j = j2;
  return f;
}

//***************************************************************
//
// ERROR METHOD(S)
//
//***************************************************************

void error_handler(const int a,
                   const std::exception& exc,
    const std::shared_ptr<restbed::Session>& session) {
  Info::ERR("Error when processing");
  Info::ERR("what(): " + std::string(exc.what()));
}

//***************************************************************
//
// ISSUE METHOD(S)
//
//***************************************************************

void issue_post_method_handler(
    const std::shared_ptr<restbed::Session>& session) {
  const auto request = session->get_request();
  size_t content_length = request->get_header("Content-Length", 0);

  session->fetch(
    content_length,
    [ request ]
    (const std::shared_ptr< restbed::Session > session,
  const restbed::Bytes & body) {
    std::string b = std::string(reinterpret_cast<const char*>(body.data()));

    // convert the data to a string
    utily::fixJson(&b); // remove the extra data at the end of the json string
    json j = json::parse(b); // convert the string to a json object
    Info::POST( // log it
      session->get_origin(),
      request->get_path(),
      "New Issue", j);

    std::string response;
    json jresp;

    if (j.contains("id")) {
      Info::WARN("POST request containing ID parameter, did you mean to PUT?");
      Info::WARN("POSTing new issue instead of updating.");
    }

    if (j.contains("name")
        && j.contains("ass")
        && j.contains("com")
        && j.contains("des")
        && j.contains("os")
        && j.contains("prio")
        && j.contains("user")) {
      Issue tmp;
      tmp.setTitle(j["name"])
      .setDescription(j["des"])
      .setPriority(j["prio"])
      .setOS(j["os"])
      .setComponent(j["com"])
      .setAssignee(j["ass"])
      .setUser(j["user"]);
      d.addIssue(tmp); // set and add the issue

      response = "/whap/issues?id=" + std::to_string(tmp.getID());
      jresp = {"result", response};

      // setup headers
      MULTMAPSS HEADERS = {
        ALLOW_ALL,
        {
          "Content-Length",
          std::to_string(jresp.dump().size())
        },
        {
          "Location",
          response
        },
        RESPONSE_T,
        CLOSE_CONNECTION
      };

      Info::RESP(201, jresp, HEADERS);
      // setup and print the response
      session->close(201, jresp.dump(), HEADERS);
      return;
    }

    // json was missing one or more components:
    response = "Bad Request";
    Info::RESP(400, response);
    session->close(400);  // 400 bad request (malformed input)
  });
}


void issue_put_method_handler(
    const std::shared_ptr<restbed::Session>& session) {

  const auto request = session->get_request();
  size_t content_length = request->get_header("Content-Length", 0);

  session->fetch(
                 content_length,
                 [ request ]
                 (const std::shared_ptr< restbed::Session > session,
                 const restbed::Bytes & body) {
    std::string b = std::string(reinterpret_cast<const char*>(body.data()));
    utily::fixJson(&b);
    json j = json::parse(b);

    if (!request->has_query_parameter("id"))
      throw badInputError("PUT request with missing ID");

    Info::PUT(session->get_origin(),
              request->get_path(),
              request->get_query_parameter("id"),
              j);

    MULTMAPSS HEADERS = {
      ALLOW_ALL,
      RESPONSE_T,
      CLOSE_CONNECTION
    };
    json jresp;

    int code = 200;
    int id;
    std::stringstream converter;
    converter << request->get_query_parameter("id");
    converter >> id;
    std::string errorString;
    converter >> errorString;
    if (errorString != "")
      id = -1;

    try {
      json& issue = d.searchIssue(id);
      if (issue["ID"] == id) {
        if (j.contains("ass")) {
          issue["assignee"] = j["ass"];
        }
        if (j.contains("des")) {
          issue["description"] = j["des"];
        }
        if (j.contains("prio")) {
          issue["priority"] = j["prio"];
        }
        if (j.contains("os")) {
          issue["os"] = j["os"];
        }
        if (j.contains("com")) {
          issue["component"] = j["com"];
        }
        if (j.contains("name")) {
          issue["title"] = j["name"];
        }
        if (j.contains("status")) {
          issue["status"] = j["status"];
        }
        d.manualSave();
        jresp["result"] = "OK";
      } else {
        jresp["error"] = "error matching all to existing json record";
        code = 500;
      }
    } catch (const indexOutOfBoundsError& io) {
      jresp["error"] = "Not Found";
      code = 404;
    }

    HEADERS.insert({
                     "Content-Length",
                     std::to_string(jresp.dump().length())
                   });
    Info::RESP(code, jresp, HEADERS);
    session->close(code, jresp.dump(), HEADERS);
  });
}

void issue_delete_method_handler(
    const std::shared_ptr<restbed::Session>& session) {
  const auto request = session->get_request();

  MULTMAPSS HEADERS = {
    ALLOW_ALL,
    RESPONSE_T,
    CLOSE_CONNECTION
  };
  json jresp;
  int code = 200;
  std::string id = request->get_query_parameter("id");
  std::stringstream tmp;
  tmp << id;
  int idint = -1; // attempt to convert to an integer
  tmp >> idint;
  std::string errorTemp = "";
  tmp >> errorTemp;
  if (errorTemp != "")
    idint = -2;
  json result;
  Info::DEL(session->get_origin(), request->get_path()
                                   + "?id=" + std::to_string(idint));
  //
  json& issues = d.getIssues();
  bool delFlag = upShift(&issues, idint);
  if (delFlag) {
    code = 200;
    jresp["result"] = "Deleted successfully.";
    d.manualSave();
  } else {
    code = 404;
    jresp["error"] = "Not Found";
  }

  HEADERS.insert({
                   "Content-Length",
                   std::to_string(jresp.dump().length())
                 });

  Info::RESP(code, jresp, HEADERS);
  session->close(code, jresp.dump(), HEADERS);
}

void issue_options_method_handler(
    const std::shared_ptr<restbed::Session>& session) {
  const auto request = session->get_request();

  Info::OPT(session->get_origin(), request->get_path());
  json jresp;
  jresp["result"] = "OK";
  std::string response = jresp.dump();

  MULTMAPSS HEADERS = {
    ALLOW_ALL,
    {
      "Content-Length",
      std::to_string(response.length())
    },
    {
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PUT,DELETE"
    },
    {
      "Allow",
      "GET,OPTIONS,PUT,DELETE"
    },
    RESPONSE_T,
    CLOSE_CONNECTION
  };

  Info::RESP(200, jresp, HEADERS);
  session->close(200, response, HEADERS);
}

void issue_get_method_handler(
  const std::shared_ptr<restbed::Session>& session) {
  const auto request = session->get_request();

  json jresp;
  int code;
  MULTMAPSS HEADERS = {
    ALLOW_ALL,
    RESPONSE_T,
    CLOSE_CONNECTION
  };

  if (request->has_query_parameter("getAllIssues")) {
    Info::GET(request->get_path(), session->get_origin(), "All Issues");
    jresp["result"] = d.getIssues();
    code = 200;
  } else if (request->has_query_parameter("id")) {
    std::stringstream tmp;
    tmp << request->get_query_parameter("id");
    int id = -1;
    tmp >> id; // convert to integer
    std::string errorString;
    tmp >> errorString; // put leftover into a string
    if (errorString != "")
      id = -2; // if there was leftover, assume bad input

    Info::GET(request->get_path(),
              session->get_origin(),
              "Issue with ID " // print informations
              + std::to_string(id));
    try {
      jresp["result"] = d.searchIssue(id);
      code = 200;
    } catch (const indexOutOfBoundsError& io) {
      Info::ERR("Attempt to grab out of bounds issue.");
      jresp["error"] = "Not Found";
      code = 404;
    }
  } else if (request->has_query_parameter("name")) {
    std::string name = request->get_query_parameter("name");

    Info::GET(request->get_path(),
              session->get_origin(),
              "Issue with name " + name);

    try {
      jresp["result"] = d.searchIssue(name);
      code = 200;
    } catch (const indexOutOfBoundsError& io) {
      Info::ERR("Attempt to grab out of bounds issue.");
      jresp["error"] = "Not Found";
      code = 404;
    }
  }

  HEADERS.insert({
                    "Content-Length",
                    std::to_string(jresp.dump().length())
                 });

  Info::RESP(code, jresp, HEADERS);

  session->close(code, jresp.dump(), HEADERS);
  }

//***************************************************************
//
// USER METHOD(S)
//
//***************************************************************

void user_post_method_handler(
  const std::shared_ptr<restbed::Session>& session) {
  const auto request = session->get_request();
  size_t content_length = request->get_header("Content-Length", 0);

  session->fetch(
        content_length,
        [ request ]
        (const std::shared_ptr< restbed::Session > session,
        const restbed::Bytes & body) {
    std::string response = "/whap/users?id=";
    json jresp;
    std::string b = std::string(reinterpret_cast<const char*>(body.data()));
    utily::fixJson(&b);
    json j = json::parse(b);

    MULTMAPSS HEADERS = {
      ALLOW_ALL,
      RESPONSE_T,
      CLOSE_CONNECTION
    };
    int code;

    if (j.contains("id")) {
      Info::WARN("POST request containing ID parameter, did you mean to PUT?");
      Info::WARN("POSTing new user instead of updating.");
    }
    Info::POST(session->get_origin(), request->get_path(), j["name"], j);

    d.addUser(j["name"]);

    try {
      response += std::to_string(
                    static_cast<int>(
                      d.searchUser(
                        static_cast<std::string>(
                          j["name"]))["ID"]));
      code = 201;
      jresp["result"] = response;
    } catch (const indexOutOfBoundsError& exc) {
      jresp["error"] = "Not Found";
      code = 500;
    }

    HEADERS.insert(
      {
        "Content-Length",
        std::to_string(jresp.dump().length())
      });

    Info::RESP(code, jresp, HEADERS);
    session->close(code, jresp.dump(), HEADERS);
  });
}

void user_get_method_handler(
  const std::shared_ptr<restbed::Session>& session) {
  const auto request = session->get_request();
  json jresp;
  int code = 200;

  if (request->has_query_parameter("getAllUsers")) {
    Info::GET(request->get_path(), session->get_origin(), "get all users");
    jresp["result"] = d.getUsers();
  } else if (request->has_query_parameter("name")) {
    std::string name = request->get_query_parameter("name");
    Info::GET(request->get_path(),
              session->get_origin(),
              "Get user name " + name);
    try {
      jresp["result"] = d.searchUser(name);
    } catch (const indexOutOfBoundsError& err) {
      code = 404;
      jresp["error"] = "Not Found";
    }
  } else if (request->has_query_parameter("id")) {
    std::stringstream ss;
    int id = -1;
    ss << request->get_query_parameter("id");
    ss >> id;

    try {
      jresp["result"] = d.searchUser(id);
    } catch (const indexOutOfBoundsError& err) {
      code = 404;
      jresp["error"] = "Not Found";
    }
  }

  MULTMAPSS HEADERS = {
    ALLOW_ALL,
    {
      "Content-Length",
      std::to_string(jresp.dump().length())
    },
    RESPONSE_T,
    CLOSE_CONNECTION
  };

  Info::RESP(code, jresp, HEADERS);
  session->close(code, jresp.dump(), HEADERS);
}

void user_put_method_handler(
  const std::shared_ptr<restbed::Session>& session) {
  const auto request = session->get_request();
  json j;
  Info::PUT(session->get_origin(), request->get_path(), "Update user", j);

  json jresp;
  jresp["error"] = "Not Implemented";
  MULTMAPSS HEADERS = {
    ALLOW_ALL,
    {
      "Content-Length",
      std::to_string(jresp.dump().length())
    },
    RESPONSE_T,
    CLOSE_CONNECTION
  };
  Info::RESP(501, jresp, HEADERS);
  session->close(501, jresp.dump(), HEADERS);
}

void user_delete_method_handler(
    const std::shared_ptr<restbed::Session>& session) {
  const auto request = session->get_request();
  MULTMAPSS HEADERS = {
    ALLOW_ALL,
    RESPONSE_T,
    CLOSE_CONNECTION
  };
  json jresp;
  int code = 200;
  std::string id = request->get_query_parameter("id");
  std::stringstream tmp;
  tmp << id;
  int idint = -1; // attempt to convert to an integer
  tmp >> idint;
  std::string errorThing = "";
  tmp >> errorThing;
  if (errorThing != "")
    idint = -2;
  json result;
  Info::DEL(session->get_origin(), request->get_path()
                                   + "?id=" + std::to_string(idint));
  //
  json& users = d.getUsers();
  bool delFlag = upShift(&users, idint);
  if (delFlag) {
    code = 200;
    jresp["result"] = "Deleted successfully.";
    d.manualSave();
  } else {
    code = 404;
    jresp["error"] = "Not Found";
  }

  HEADERS.insert({
                   "Content-Length",
                   std::to_string(jresp.dump().length())
                 });

  Info::RESP(code, jresp, HEADERS);
  session->close(code, jresp.dump(), HEADERS);
}

void user_options_method_handler(
  const std::shared_ptr<restbed::Session>& session) {
  const auto request = session->get_request();

  Info::OPT(session->get_origin(), request->get_path());
  json jresp;
  jresp["result"] = "OK";

  MULTMAPSS HEADERS = {
    ALLOW_ALL,
    {
      "Content-Length",
      std::to_string(jresp.dump().length())
    },
    {
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PUT,DELETE"
    },
    {
      "Allow",
      "GET,OPTIONS,PUT,DELETE"
    },
    RESPONSE_T,
    CLOSE_CONNECTION
  };

  Info::RESP(200, jresp, HEADERS);
  session->close(200, jresp.dump(), HEADERS);
}

/**
* Used as the ready handler for the service; when the service is ready,
* "Service started" is put to the console.
*/
void service_ready_handler(const restbed::Service& a) { // NOLINT
  Info::INFO("Service started.");
}

/**
* Handle a POST request to add a comment.
* @param session The request session.
*/
void comment_post_method_handler(
        const std::shared_ptr<restbed::Session>& session) {
  const auto request = session->get_request();
  size_t content_length = request->get_header("Content-Length", 0);

  session->fetch(
        content_length,
        [ request ]
        (const std::shared_ptr< restbed::Session > session,
        const restbed::Bytes & body) {
    json jresp;
    std::string b = std::string(reinterpret_cast<const char*>(body.data()));
    utily::fixJson(&b);
    json j = json::parse(b);

    int code;
    MULTMAPSS HEADERS = {
      ALLOW_ALL,

      RESPONSE_T,
      CLOSE_CONNECTION
    };

    Info::POST(session->get_origin(),
               request->get_path(),
               "Create new comment", j);

    if (j.contains("user")
        && j.contains("id")
        && j.contains("comment")) {
      Comment c(j["user"]);
      c.setBody(j["comment"]);
      d.addComment(j["id"], &c);
      code = 201;
      jresp["result"] = "OK";

  d.load();
  // Setup service and request handlers
  auto resAddIssue = std::make_shared<restbed::Resource>();
  resAddIssue->set_path("/whap/add-issue");
  resAddIssue->set_method_handler("POST", issue_post_method_handler);
    } else {
      code = 400;
      jresp["error"] = "Malformed Input";
    }

    HEADERS.insert({
                     "Content-Length",
                     std::to_string(jresp.dump().length())
                   });


    Info::RESP(code, jresp, HEADERS);
    session->close(code, jresp.dump(), HEADERS);
  });
}

/**
* Handle a GET request to retrieve a comment.
* @param session The request session.
*/
void comment_get_method_handler(
        const std::shared_ptr<restbed::Session>& session) {
  const auto request = session->get_request();
  //
  MULTMAPSS HEADERS = {
    ALLOW_ALL,
    RESPONSE_T,
    CLOSE_CONNECTION
  };
  int code;
  json jresp;

  if (request->has_query_parameter("id")) {
    std::stringstream ss;
    int id = -1;
    ss << request->get_query_parameter("id");
    ss >> id;
    std::string extra;
    ss >> extra;
    if (extra != "") {
      id = -2;
    }

    Info::GET(request->get_path(),
              session->get_origin(),
              "Get user ID " + std::to_string(id));

    try {
      jresp["result"] = d.getComments(id);
      code = 200;
    } catch (const indexOutOfBoundsError& io) {
      code = 404;
      jresp["error"] = "Not Found";
    }
  } else {
    code = 400;
    jresp["error"] = "Malformed request.";
  }

  HEADERS.insert({
                    "Content-Length",
                    std::to_string(jresp.dump().length())
                 });
  Info::RESP(code, jresp, HEADERS);
  session->close(code, jresp.dump(), HEADERS);
}
