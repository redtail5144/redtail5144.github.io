/******************************
* @date 2019-10
* @author Matthew Wilbern
*/

#ifndef SAVELOAD_H
#define SAVELOAD_H

#include <nlohmann/json.hpp>
#include <iostream>
#include <vector>
#include <string>
#include <cstdlib>
#include <fstream>
#include <sstream>
#include "Data.h"
#include "utily.h" // NOLINT begone with this style error it's the same as all the others
#include "Info.h"
#include "User.h"
#include "Issue.h"

using std::ofstream;
using std::ifstream;
using json = nlohmann::json;

namespace saveload {

/**
* @brief saves a file using JSON format.
* @param issues the issues to save with
* @param file the file path to be saved to
*/
static void save(json data, std::string file) {
  ofstream out;
  out.open(file);

  if (!out) {                                  // if failed to open file
    Info::ERR("Failed to open the save file for writing.");
    exit(1);
  }
  out << data.dump();                            // write to the file

  out.close();
}

/**
* @brief loads a JSON formatted file.
* @param file the file path to be loaded from
* @return the vector of issues
*/
static json load(std::string file) {
  json j;
  std::string f;
  std::stringstream buffer;

  ifstream in;
  in.open(file);            // open file for reading

  if (!in) {                // if it failed...
    Info::WARN("Save file did not exist.");
    j["issues"] = {};
    j["users"] = {};
    return j;            // return empty data
  }
  buffer << in.rdbuf();     // read buffer to stringstream
  in.close();

  f = buffer.str();         // convert stringstream to string

  try {
    j = json::parse(f);       // parse it
  } catch (std::exception& ex) {
    Info::ERR("Save file exists but we failed to parse it! "
              "Please check it for errors.");
    Info::ERR(ex.what());
    exit(1);
  } catch (...) {
    Info::ERR("Unexpected error occurred while loading.");
    exit(1);
  }

  // CALCULATE HIGHEST IDs
  int isMax = 0;
  int usMax = 0;
  for (int i = 0; i < j["issues"].size(); i++)
    if (j["issues"][i]["ID"] > isMax)
      isMax = j["issues"][i]["ID"];
  for (int i = 0; i < j["users"].size(); i++)
    if (j["users"][i]["ID"] > usMax)
      usMax = j["users"][i]["ID"];

  User::lastID = usMax;
  Issue::lastID = isMax;

  return j;
}
}; // namespace saveload

#endif // SAVELOAD_H
