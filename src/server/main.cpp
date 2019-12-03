/*!
* \date 2019-10
* \version 1.3
* \mainpage WHAP! issue tracker
* \author Austin Campbell
* \author Matthew Wilbern
* \author Kyler Fisher
*/

#include <restbed>
#include <nlohmann/json.hpp>
#include <cstring>
#include <cstdlib>
#include <memory>
#include <vector>
#include <string>
#include <iostream>
#include <fstream>
#include <sstream>
#include <map>
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
using std::vector;
using saveload::save;
using saveload::load;

int main() {
  Info::INFO("Server initializing.");
  Data dataObj("data/data.data");
  dataObj.load();

  // Add paths and handlers for issues
  auto resAddIssue = std::make_shared<restbed::Resource>();
  resAddIssue->set_path("/whap/add-issue");
  resAddIssue->set_method_handler("POST", issue_post_method_handler);

  auto resIssues = std::make_shared<restbed::Resource>();
  resIssues->set_path("/whap/issues");
  resIssues->set_method_handler("GET", issue_get_method_handler);
  resIssues->set_method_handler("PUT", issue_put_method_handler);
  resIssues->set_method_handler("DELETE", issue_delete_method_handler);
  resIssues->set_method_handler("OPTIONS", issue_options_method_handler);
  resIssues->set_error_handler(error_handler);

  // Add paths and handlers for issues
  auto resAddComment = std::make_shared<restbed::Resource>();
  resAddComment->set_path("/whap/add-comment");
  resAddComment->set_method_handler("POST", comment_post_method_handler);
  auto resComments = std::make_shared<restbed::Resource>();
  resComments->set_path("/whap/comments");
  resComments->set_method_handler("GET", comment_get_method_handler);

// Add paths and handlers for users
auto resAddUser = std::make_shared<restbed::Resource>();
resAddUser->set_path("/whap/add-user");
resAddUser->set_method_handler("POST", user_post_method_handler);

auto resUsers = std::make_shared<restbed::Resource>();
resUsers->set_path("/whap/users");
resUsers->set_method_handler("GET", user_get_method_handler);
resUsers->set_method_handler("PUT", user_put_method_handler);
resUsers->set_method_handler("OPTIONS", user_options_method_handler);
resUsers->set_method_handler("DELETE", user_delete_method_handler);
resUsers->set_error_handler(error_handler);


  auto settings = std::make_shared<restbed::Settings>();
  settings->set_port(1234);

  // Publish and start service
  restbed::Service service;
  service.publish(resAddIssue);
  service.publish(resIssues);

  service.publish(resAddComment);
  service.publish(resComments);
  service.publish(resAddUser);
  service.publish(resUsers);

  service.set_ready_handler(service_ready_handler);

  Info::INFO("Starting service.");
  service.start(settings);
  return EXIT_SUCCESS;
}
