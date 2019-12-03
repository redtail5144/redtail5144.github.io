CXX_9=g++9.1
CXX=g++ -std=c++11
CXXFLAGS= -g -fprofile-arcs -ftest-coverage

LINKFLAGS = -lrestbed -lpthread
LINKFLAGS_TEST = -lgtest

SRC_DIR_SERVER = src/server
SRC_DIR_CLIENT = src/client
SRC_DIR_SERVICE = src/service

SRC_INCLUDE_SERVICE = include/service
SRC_INCLUDE_SERVER = include/server

SRC_TEST = test

TEST_DIR = test

TEST_JSON = testSaveLoadIssues.json

SERVICE_INCLUDE = -I include/service
SERVER_INCLUDE = -I include/server

GCOV_9 = gcov9.1
GCOV = gcov
LCOV = lcov
COVERAGE_RESULTS = results.coverage
COVERAGE_DIR = coverage

STATIC_ANALYSIS = cppcheck

STYLE_CHECK = cpplint.py

PROGRAM_SERVER = whapServer
PROGRAM_CLIENT = whapClient
PROGRAM_TEST = testWhap

.PHONY: all
all: $(PROGRAM_SERVER) $(PROGRAM_CLIENT) $(PROGRAM_TEST) coverage docs static style

# default rule for compiling .cc to .o
%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

.PHONY: clean
clean:
	rm -rf *~ $(SRC)/*.o $(TEST_SRC)/*.o *.gcov *.gcda *.gcno \
	$(COVERAGE_RESULTS) \
	$(PROGRAM_SERVER) \
	$(PROGRAM_TEST) \
	$(PROGRAM_CLIENT) \
	$(COVERAGE_DIR) \
	doxygen/html \
	obj bin \
	$(TEST_JSON) \

server: $(PROGRAM_SERVER)

client: $(PROGRAM_CLIENT)

runServer: server
	./${PROGRAM_SERVER} &

stopServer:
	kill -9 ${PROGRAM_SERVER}

$(PROGRAM_SERVER): $(SRC_DIR_SERVER) $(SRC_DIR_SERVICE)
	$(CXX_9) $(CXXFLAGS) -o $(PROGRAM_SERVER) $(SERVICE_INCLUDE) $(SERVER_INCLUDE) \
	$(SRC_DIR_SERVER)/*.cpp $(SRC_DIR_SERVICE)/*.cpp $(LINKFLAGS)

$(PROGRAM_CLIENT):
	google-chrome data/index.html & #Launch the client website in the bg

$(PROGRAM_TEST): $(TEST_DIR) $(SRC_DIR_SERVICE)
	$(CXX) $(CXXFLAGS) -o $(PROGRAM_TEST) $(SERVICE_INCLUDE) $(SERVER_INCLUDE) \
	$(TEST_DIR)/*.cpp $(SRC_DIR_SERVICE)/*.cpp $(LINKFLAGS_TEST)

tests: $(PROGRAM_TEST)
	$(PROGRAM_TEST)

memcheck: $(PROGRAM_TEST)
	valgrind --tool=memcheck --leak-check=yes $(PROGRAM_TEST)

coverage: $(PROGRAM_TEST)
	$(PROGRAM_TEST)
	# Determine code coverage
	$(LCOV) --capture --gcov-tool $(GCOV) --directory . --output-file $(COVERAGE_RESULTS)
	# only show coverage for source code (no libs)
	$(LCOV) --extract $(COVERAGE_RESULTS) "*/src/*" -o $(COVERAGE_RESULTS)
	#generate HTML reports
	genhtml $(COVERAGE_RESULTS) --output-directory $(COVERAGE_DIR)
	#Remove all of the generated files from gcov
	rm -f *.gc*

static: ${SRC_DIR_SERVER} ${SRC_DIR_CLIENT} ${SRC_DIR_SERVICE} ${TEST_DIR}
	${STATIC_ANALYSIS} --verbose --enable=all ${SRC_DIR_SERVER} ${SRC_DIR_CLIENT} ${SRC_DIR_SERVICE} ${TEST_DIR} ${SRC_INCLUDE} --suppress=missingInclude

style: ${SRC_DIR_SERVICE} ${SRC_INCLUDE}
	${STYLE_CHECK} $(SRC_INCLUDE_SERVICE)/*.h $(SRC_INCLUDE_SERVER)/*.h $(SRC_DIR_SERVICE)/*.cpp $(SRC_DIR_CLIENT)/*.cpp $(SRC_DIR_SERVER)/*.cpp $(SRC_TEST)/*.cpp

docs:	${SRC_INCLUDE_SERVICE} ${SRC_INCLUDE_SERVER}
	doxygen docs/code/doxyfile
