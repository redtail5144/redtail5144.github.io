/******************************
* @date 2019-10
* @author Matthew Wilbern
* @author Kyler
* @author Austin
*/
#include <string>
#include <vector>
#include "Data.h"
#include "Issue.h"
#include "User.h"
#include "SaveLoad.h"
#include "Exceptions.h"

using saveload::save;
using saveload::load;

Data::Data(std::string saveLocation) {
  save_location = saveLocation;
}

void Data::load() {
  data = saveload::load(save_location);
  Info::INFO("Loaded data.");
}

void Data::manualSave() {
  save(data, save_location);
}

json& Data::getIssues() {
  return data["issues"];
}

void Data::addIssue(Issue issue) {
  data["issues"][data["issues"].size()] = issue.get();
  save(data, save_location);
}

json& Data::getComments(unsigned int ID) {
  json& issue = searchIssue(ID);
  return issue["comments"];
}

void Data::addComment(unsigned int ID, Comment *c) {
  json& issue = searchIssue(ID);

  if (!(issue.contains("comments")))
    issue["comments"] = {};
  issue["comments"].push_back(c->get());

  save(data, save_location);
}

json& Data::getUsers() {
  return data["users"];
}

bool Data::addUser(std::string name) {
  for (int i = 0; i < data["users"].size(); i++) {
    if (data["users"][i]["name"] == name) {
      return false;
    }
  }
  User u;
  u.setName(name);
  data["users"][data["users"].size()] = u.get();
  save(data, save_location);
  return true;
}

json& Data::searchUser(unsigned int ID) {
  for (int i = 0; i < data["users"].size(); i++) {
    if (data["users"][i]["ID"] == ID) {
      return data["users"][i];
    }
  }
  throw indexOutOfBoundsError("No user with that ID");
}

json& Data::searchUser(std::string name) {
  for (int i = 0; i < data["users"].size(); i++) {
    if (data["users"][i]["name"] == name) {
      return data["users"][i];
    }
  }
  throw indexOutOfBoundsError("No user with that name");
}

bool Data::deleteIssueByID(unsigned int ID) {
  return false;
}

json& Data::searchIssue(unsigned int ID) {
  for (int i = 0; i < data["issues"].size(); i++) {
    if (data["issues"][i]["ID"] == ID) {
      return data["issues"][i];
    }
  }
  throw indexOutOfBoundsError("No issue with that ID");
}

json& Data::searchIssue(std::string name) {
  for (int i = 0; i < data["issues"].size(); i++) {
    if (data["issues"][i]["title"] == name) {
      return data["issues"][i];
    }
  }
  throw indexOutOfBoundsError("No issue with that title");
}

json& Data::getData() {
  return data;
}
