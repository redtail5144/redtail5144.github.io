/******************************
* @date 2019-10
* @author Matthew Wilbern
*/

#ifndef USER_H
#define USER_H

#include <nlohmann/json.hpp>
#include <string>

using nlohmann::json;

class User {
 public:
  User();
  virtual ~User();

  std::string getName();

  User& setName(std::string val);

  unsigned int getID();

  User& setID(unsigned int val);

  static unsigned int lastID;

  json& get();

 private:
  json data;
  unsigned int ID;
};

#endif // USER_H
