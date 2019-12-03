/************************
* @author Matthew Wilbern
* @date 2019-10
************************/

#ifndef INCLUDE_EXCEPTIONS_H_
#define INCLUDE_EXCEPTIONS_H_

#include <stdexcept>

/**
* exception thrown if you try to get a thing which is not actually there.
*/
class indexOutOfBoundsError: public std::runtime_error {
 public:
  /**
  * @param err the error message
  */
  explicit indexOutOfBoundsError(const char* err):
    std::runtime_error(err) {
  }
};

/**
* exception thrown upon malformed data input.
*/
class badInputError: public std::runtime_error {
 public:
  /**
  * @param err the error message
  */
  explicit badInputError(const char* err):
    std::runtime_error(err) {
  }
};



#endif // INCLUDE_EXCEPTIONS_H_
