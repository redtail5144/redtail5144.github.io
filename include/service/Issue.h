/******************************
* @date 2019-10
* @author Matthew Wilbern
*/

#ifndef ISSUE_H
#define ISSUE_H

#include <nlohmann/json.hpp>
#include <string>

#include "Comment.h"

using nlohmann::json;

class Issue {
 public:
  Issue();
  virtual ~Issue();

  /**
  * @return the title of the issue
  */
  std::string getTitle() const;

  /**
  * @param val the title to be set
  * @return a reference to the issue (for chain calling)
  */
  Issue& setTitle(std::string val);

  /**
  * @return the description of the issue
  */
  std::string getDescription() const;

  /**
  * @param val the description
  * @return a reference to the issue (for chain calling)
  */
  Issue& setDescription(std::string val);

  /**
  * @return the priority of the issue
  */
  std::string getPriority() const;

  /**
  * @param val the priority
  * @return a reference to the issue (for chain calling)
  */
  Issue& setPriority(std::string val);

  /**
  * @return the os of the issue
  */
  std::string getOS() const;

  /**
  * @param val the os
  * @return a reference to the issue (for chain calling)
  */
  Issue& setOS(std::string val);

  /**
  * @return the component of the issue
  */
  std::string getComponent() const;

  /**
  * @param val the component
  * @return a reference to the issue (for chain calling)
  */
  Issue& setComponent(std::string val);

  /**
  * @return the assignee of the issue
  */
  std::string getAssignee() const;

  /**
  * @param val the description
  * @return a reference to the issue (for chain calling)
  */
  Issue& setAssignee(std::string val);

  /**
  * @return the ID of the issue
  */
  unsigned int getID() const;

  /**
  * @brief to be used only when loading, otherwise it will mess things up.
  * @param ID the ID to be set
  * @return a reference to the issue (for chain calling)
  */
  Issue& setID(unsigned int ID);

  /**
  * @return the status (open/closed)
  */
  std::string getStatus() const;

  /**
  * @param val is the issue open or closed (true if open)
  * @return a reference to the issue (for chain calling)
  */
  Issue& setStatus(std::string val);

  /**
  * @return the user who submitted issue
  */
  std::string getUser() const;

  /**
  * @param use is user who submitted issue
  * @return a reference to the issue (for chain calling)
  */
  Issue& setUser(std::string use);

  /**
  * @param c the comment to be added
  * @return a reference to the issue for chain calling
  */
  Issue& addComment(Comment* c);

  /**
  * @return the comments
  */
  json& getComments();

  json& get();

  /**
  * @brief compares the ID
  * @param b the right side
  * @return if the issues ID are the same
  */
  bool operator==(const Issue& b) const;

  /**
  * @brief compares ALL data
  * @param b the right side
  * @param if the whole issue is the same.
  */
  bool operator>(const Issue& b) const;

  /**
  * @param b the right side
  * @return if the issues are not the same
  */
  bool operator!=(const Issue& b) const;

  static unsigned int lastID;

 private:
  json data;
  //std::string title, description, priority, os, component, assignee, user;
  //std::string status = "New";
  //unsigned int ID;
};

#endif // ISSUE_H
