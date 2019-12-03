/******************************
* @date 2019-10
* @author Matthew Wilbern
*/

#include <nlohmann/json.hpp>
#include <string>
#include "User.h"

using nlohmann::json;

unsigned int User::lastID = 0;

User::User() {
  data = {
    {"ID", ++User::lastID},
    {"name", "undefined"}
  };
}

User::~User() {
}

std::string User::getName() {
  return static_cast<std::string>(data["name"]);
}

User& User::setName(std::string val) {
  data["name"] = val;
  return *this;
}

unsigned int User::getID() {
  return static_cast<unsigned int>(data["ID"]);
}

json& User::get() {
  return data;
}

User& User::setID(unsigned int val) {
  data["ID"] = val;
  lastID = val;
  return *this;
}
