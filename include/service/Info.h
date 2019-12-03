/******************************
* @date 2019-10
* @author Matthew Wilbern
*/

#ifndef INFO_H
#define INFO_H

#include <nlohmann/json.hpp>
#include <iostream>
#include <string>
#include <map>

using nlohmann::json;

namespace Info {
static const char red[] = "\u001b[31m";
static const char green[] = "\u001b[32m";
static const char yellow[] = "\u001b[33m";
static const char blue[] = "\u001b[34m";
static const char magenta[] = "\u001b[35m";
static const char cyan[] = "\u001b[36m";
static const char white[] = "\u001b[37m";
static const char reset[] = "\u001b[0m";

static const char bgblack[] = "\u001b[40;1m";
static const char bgred[] = "\u001b[41;1m";
static const char bggreen[] = "\u001b[42;1m";
static const char bgyellow[] = "\u001b[43;1m";
static const char bgblue[] = "\u001b[44;1m";
static const char bgmagenta[] = "\u001b[45;1m";
static const char bgcyan[] = "\u001b[46;1m";
static const char bgreset[] = "\u001b[47;1m";

static void INFO(std::string out) {
  std::cout << "[INFO] " << out << std::endl;
}

static void WARN(std::string out) {
  std::cout << bgreset << "[" << bgyellow << "WARN" << bgreset << "] "
            << out << reset << std::endl;
}

static void ERR(std::string out) {
  std::cout << bgreset <<  "[" << bgred << "ERR " << bgreset << "] "
            << out << reset << std::endl;
}

static void POST(std::string from, std::string to, std::string out, json& j) { // NOLINT
  std::cout << "[" << blue << "POST" << reset << "] "
            << red << from << " > " << to << reset << ": "
            << out << std::endl;

  std::cout << "[" << cyan << "POST JSON" << reset <<"]" << std::endl
            << "  " << j.dump() << std::endl;
}

static void DEL(std::string from, std::string to) { // NOLINT
  std::cout << "[" << red << "DEL " << reset << "]"
            << red << from << " > " << to << reset << std::endl;
}

static void GET(std::string from, std::string to, std::string out) {
  std::cout << "["
            << cyan
            << "GET "
            << reset
            << "] "
            << red
            << from
            << " > "
            << to
            << ": "
            << reset
            << out
            << std::endl;
}

static void PUT(std::string from, std::string to, std::string out, json& j) { // NOLINT
  std::cout << "[" << magenta << "PUT " << reset << "] "
            << red << from << " > " << to << reset << ": " << out << std::endl;

  std::cout << "[" << cyan << "POST JSON" << reset << "]" << std::endl
            << "  " << j.dump() << std::endl;
}

static void OPT(std::string loc, std::string to) {
  std::cout << "[" << magenta << "OPT " << reset << "] Options request from "
            << red << loc << " > " << to << reset << std::endl;
}

static void RESP(int code, std::string out) {
  std::cout << "[" << green << "RESP" << reset << "] [";
  if (code >= 400)
    std::cout << red;
  else
    std::cout << cyan;
  std::cout << code << reset << "] " << out << std::endl;
}

static void RESP(int code, json jonathon, std::multimap<std::string, std::string>& mult) { // NOLINT
  std::cout << "[" << green << "RESP" << reset << "] [";
  if (code >= 400)
    std::cout << red;
  else
    std::cout << cyan;
  std::cout << code << reset << "]\n";

  std::cout << "[" << blue << "RESPONSE JSON" << reset << "]\n";
  std::cout << "  " << jonathon.dump() << std::endl;

  std::cout << "[" << blue << "RESPONSE HEADERS" << reset << "]" << std::endl;
  for (std::multimap<std::string, std::string>::iterator itr = mult.begin();
        itr != mult.end(); ) {
    /* ... process *itr ... */

    std::cout << "  "
              << blue
              <<
              (*itr).first
              << ": "
              << reset
              << (*itr).second
              << std::endl;

    /* Now, go skip to the first entry with a new key. */
    std::multimap<std::string, std::string>::iterator curr = itr;
    while (itr != mult.end() && itr->first == curr->first)
      ++itr;
  }
}
} // namespace Info

#endif // INFO_H
