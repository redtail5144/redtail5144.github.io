/******************************
* @date 2019-10
* @author Austin Campbell
* @author Matthew Wilbern
*/

#include <nlohmann/json.hpp>

#include <string>

#include "Comment.h"

Comment::Comment(std::string author) {
  data["author"] = author;
}

void Comment::setBody(std::string body) {
  data["body"] = body;
}

std::string Comment::getBody() {
  return static_cast<std::string>(data["body"]);
}

json& Comment::get() {
  return data;
}
