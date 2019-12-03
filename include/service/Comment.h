/******************************
* @date 2019-10
* @author Matthew Wilbern
*/

#ifndef COMMENT_H
#define COMMENT_H

#include <nlohmann/json.hpp>

#include <string>

using nlohmann::json;

class Comment {
 public:
  /**
  * @param author the author of the comment
  */
  Comment(std::string author);

  /**
  * @param body the body text for the comment
  */
  void setBody(std::string body);

  /**
  * @return the json object representing the comment
  */
  std::string getBody();

  json& get();

 private:
  json data;
};

#endif // COMMENT_H
