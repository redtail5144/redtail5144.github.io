/******************************
* @date 2019-10
* @author Matthew Wilbern
*/

#ifndef DATA_H
#define DATA_H

#include <nlohmann/json.hpp>
#include <vector>
#include <string>

#include "Issue.h"
#include "User.h"
#include "Comment.h"

using nlohmann::json;

class Data {
 public:
  Data(std::string saveLocation);

  /**
  * @return the issues
  */
  json& getIssues();

  /**
  * @brief adds an issue, then saves.
  * @param issue the issue to be added
  */
  void addIssue(Issue issue);

  /**
  * @return the issues as a json object
  */
  json& getUsers();

  /**
  * @brief adds a user then saves.
  * @param name the name of the user to be added
  * @return if the user needed to be created (false = already exists)
  */
  bool addUser(std::string name);

  /**
  * @param ID the user to be searched for
  * @return the user as a json object
  * @throw indexOutOfBoundsError if user can't be found.
  */
  json& searchUser(unsigned int ID);

  /**
  * @param name the user to be searched for
  * @return the user as a json object
  * @throw indexOutOfBoundsError if user can't be found.
  */
  json& searchUser(std::string name);

  /**
  * @brief reads data from a file then overwrites the json table
  */
  void load();

  /**
  * @return the issues
  */
  void manualSave();

  /**
  * @return the issues
  */
  bool deleteIssueByID(unsigned int ID);

  /**
  * @param ID the issue to be searched for
  * @return the issue as a json object
  * @throw indexOutOfBoundsError if issue can't be found.
  */
  json& searchIssue(unsigned int ID);

  /**
  * @param name the issue to be searched for
  * @return the issue as a json object
  * @throw indexOutOfBoundsError if issue can't be found.
  */
  json& searchIssue(std::string name);

  /**
  * @param ID the id of the issue to grab comments for
  * @return a json object containing the comments
  * @throw indexOutOfBoundsError if issue cant be found
  */
  json& getComments(unsigned int ID);

  /**
  * @brief like other `add` functions, this will save upon completion.
  * @param ID the ID of the issue to add a comment to
  * @param c the comment to be added
  */
  void addComment(unsigned int ID, Comment *c);

  /**
  * @return the issues
  */
  json& getData();

 private:
  json data;
  std::string save_location;
};

#endif // DATA_H
