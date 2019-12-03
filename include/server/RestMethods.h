/******************************
* @date 2019-10
* @author Matthew Wilbern
* @author Kyler Fisher
* @author Austin Campbell
*/

#ifndef RESTMETHODS_H
#define RESTMETHODS_H

#include <restbed>
#include <nlohmann/json.hpp>
#include <memory>
#include <stdexcept>
#include "RestMethods.h"

using nlohmann::json;

//***************************************************************
//
// REST HELPER METHOD(S)
//
//***************************************************************

/**
* Helper function that shifts values in json object. Called after removing
* an item from json object to avoid empty records (gaps) in the structure.
* @param json object and ID, the integer position of the deleted item.
*/
bool upShift(json* j, int ID);

//***************************************************************
//
// REST ERROR METHOD(S)
//
//***************************************************************

/**
* The designated error handler for the service.
* @param exc The exception raised
* @param session The request session.
*/
void error_handler(const int a,
                   const std::exception& exc,
    const std::shared_ptr<restbed::Session>& session);

//***************************************************************
//
// REST ISSUE METHOD(S)
//
//***************************************************************

/**
* Handle a POST request to create a new issue.
* @param session The request session.
*/
void issue_post_method_handler(
    const std::shared_ptr<restbed::Session>& session);

/**
* Handle a POST request to create a new issue.
* @param session The request session.
*/
void issue_put_method_handler(
    const std::shared_ptr<restbed::Session>& session);

/**
* Handle a PUT request to update an issue.
* @param session The request session.
*/
void issue_delete_method_handler(
    const std::shared_ptr<restbed::Session>& session);

/**
* Handles a OPTIONS request; used to enable PUT updates for issues.
* @param session The request session.
*/
void issue_options_method_handler(
    const std::shared_ptr<restbed::Session>& session);

/**
* Handle a GET request to retrieve an existing issue.
* @param session The request session.
*/
void issue_get_method_handler(
  const std::shared_ptr<restbed::Session>& session);

//***************************************************************
//
//  REST USER METHOD(S)
//
//***************************************************************

/**
* Handle a POST request to create a new user.
* @param session The request session.
*/
void user_post_method_handler(
  const std::shared_ptr<restbed::Session>& session);

/**
* Handle a GET request to retrieve an existing user.
* @param session The request session.
*/
void user_get_method_handler(
  const std::shared_ptr<restbed::Session>& session);

/**
* Handle a PUT request to update an existing user.
* @param session The request session.
*/
void user_put_method_handler(
  const std::shared_ptr<restbed::Session>& session);

/**
* Handle a DELETE request to remove an existing user.
* @param session The request session.
*/
void user_delete_method_handler(
    const std::shared_ptr<restbed::Session>& session);

/**
* Handles a OPTIONS request; used to enable PUT updates for users.
* @param session The request session.
*/
void user_options_method_handler(
  const std::shared_ptr<restbed::Session>& session);

//***************************************************************
//
// REST COMMENT METHOD(S)
//
//***************************************************************

/**
* Handle a POST request to add a comment.
* @param session The request session.
*/
void comment_post_method_handler(
        const std::shared_ptr<restbed::Session>& session);

/**
* Handle a GET request to retrieve a comment.
* @param session The request session.
*/
void comment_get_method_handler(
        const std::shared_ptr<restbed::Session>& session);


//***************************************************************
//
// OTHER REST SERVICE METHOD(S)
//
//***************************************************************

/**
* Passed as the ready handler for the service; when the service is ready,
* "Service started" is put to the console.
*/
void service_ready_handler(const restbed::Service& a);

#endif // RESTMETHODS_H
