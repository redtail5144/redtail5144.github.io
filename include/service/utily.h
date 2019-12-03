/******************************
* @date 2019-10
* @author Matthew Wilbern
*/

#ifndef UTILY_H
#define UTILY_H

#include <nlohmann/json.hpp>
#include <string>
#include <vector>

#include "Issue.h"
#include "Info.h"

using nlohmann::json;


namespace utily {
  static void fixJson(std::string* in) {
    char c = in->at(0);
    char d = 'a';
    if (c == '{')
      d = '}';
    else if (c == '[')
      d = ']';
    else if (c == '"')
      d = '"';
    else if (c == '\'')
      d = '\'';

    for (int i = in->size() - 1; i >= 0; i--)
      if (in->back() != d)
        in->pop_back();
      else
        return;
  }
}; // namespace utily

#endif // UTILY_H
