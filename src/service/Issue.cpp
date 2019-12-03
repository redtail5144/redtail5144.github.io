/******************************
* @date 2019-10
* @author Matthew Wilbern
*/

#include <nlohmann/json.hpp>
#include <string>

#include "Issue.h"

using nlohmann::json;

unsigned int Issue::lastID = 0;

#define stats static_cast<std::string>
#define stati static_cast<unsigned int>

Issue::Issue() {
  data = {
    {"ID", ++Issue::lastID}, // increment the last ID then set our ID to it.
    {"status", "New"},
  };
}

Issue::~Issue() {
  // dtor
}

std::string Issue::getTitle() const {
  return stats(data["title"]);
}

Issue& Issue::setTitle(std::string val) {
  data["title"] = val;
  return *this;
}

std::string Issue::getDescription() const {
  return stats(data["description"]);
}

Issue& Issue::setDescription(std::string val) {
  data["description"] = val;
  return *this;
}

std::string Issue::getPriority() const {
  return stats(data["priority"]);
}

Issue& Issue::setPriority(std::string val) {
  data["priority"] = val;
  return *this;
}

std::string Issue::getOS() const {
  return stats(data["os"]);
}

Issue& Issue::setOS(std::string val) {
  data["os"] = val;
  return *this;
}

std::string Issue::getComponent() const {
  return stats(data["component"]);
}

Issue& Issue::setComponent(std::string val) {
  data["component"] = val;
  return *this;
}

std::string Issue::getAssignee() const {
  return stats(data["assignee"]);
}

Issue& Issue::setAssignee(std::string val) {
  data["assignee"] = val;
  return *this;
}

unsigned int Issue::getID() const {
  return stati(data["ID"]);
}

Issue& Issue::setID(unsigned int ID) {
  data["ID"] = ID;
  lastID = ID;
  return *this;
}

std::string Issue::getStatus() const {
  return stats(data["status"]);
}

Issue& Issue::setStatus(std::string val) {
  data["status"] = val;
  return *this;
}

std::string Issue::getUser() const {
  return stats(data["user"]);
}

Issue& Issue::setUser(std::string val) {
  data["user"] = val;
  return *this;
}

json& Issue::get() {
  return data;
}

Issue& Issue::addComment(Comment* c) {
  if (!(data.contains("comments")))
    data["comments"] = {};
  data["comments"].push_back(c->get());
  return *this;
}

json& Issue::getComments() {
  return data["comments"];
}

bool Issue::operator==(const Issue& b) const {
  return data["ID"] == b.getID();
}

bool Issue::operator!=(const Issue& b) const {
  return !(*this == b);
}

bool Issue::operator>(const Issue& b) const {
  return data["title"] == b.getTitle()
      && data["description"] == b.getDescription()
      && data["priority"] == b.getPriority()
      && data["os"] == b.getOS()
      && data["component"] == b.getComponent()
      && data["assignee"] == b.getAssignee()
      && data["status"] == b.getStatus()
      && data["ID"] == b.getID()
      && data["user"] == b.getUser();
}
