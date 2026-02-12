#!/bin/bash

# Automated test script for cortex-kit

echo "🧪 Running cortex-kit tests..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Helper function for assertions
assert_file_exists() {
  if [ -f "$1" ]; then
    echo -e "${GREEN}✓${NC} File exists: $1"
    TESTS_PASSED=$((TESTS_PASSED + 1))
  else
    echo -e "${RED}✗${NC} File missing: $1"
    TESTS_FAILED=$((TESTS_FAILED + 1))
    return 1
  fi
}

assert_dir_exists() {
  if [ -d "$1" ]; then
    echo -e "${GREEN}✓${NC} Directory exists: $1"
    TESTS_PASSED=$((TESTS_PASSED + 1))
  else
    echo -e "${RED}✗${NC} Directory missing: $1"
    TESTS_FAILED=$((TESTS_FAILED + 1))
    return 1
  fi
}

assert_file_content() {
  if [ "$(cat "$1")" = "$2" ]; then
    echo -e "${GREEN}✓${NC} File content correct: $1"
    TESTS_PASSED=$((TESTS_PASSED + 1))
  else
    echo -e "${RED}✗${NC} File content incorrect: $1"
    echo "  Expected: $2"
    echo "  Got: $(cat "$1")"
    TESTS_FAILED=$((TESTS_FAILED + 1))
    return 1
  fi
}

# Test 1: Create new project
echo "Test 1: Creating new project..."
node bin/cli.js init test-output > /dev/null 2>&1

assert_file_exists "test-output/AGENTS.md"
assert_file_exists "test-output/CLAUDE.md"
assert_file_exists "test-output/README.md"
assert_dir_exists "test-output/docs"

# Test 2: Verify CLAUDE.md content
echo ""
echo "Test 2: Verifying CLAUDE.md points to AGENTS.md..."
assert_file_content "test-output/CLAUDE.md" "AGENTS.md"

# Test 3: Verify AGENTS.md has content
echo ""
echo "Test 3: Verifying AGENTS.md has content..."
if [ -s "test-output/AGENTS.md" ]; then
  echo -e "${GREEN}✓${NC} AGENTS.md is not empty"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "${RED}✗${NC} AGENTS.md is empty"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test 4: Verify AGENTS.md contains key sections
echo ""
echo "Test 4: Verifying AGENTS.md structure..."
if grep -q "Development Workflow" test-output/AGENTS.md; then
  echo -e "${GREEN}✓${NC} AGENTS.md contains 'Development Workflow'"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "${RED}✗${NC} AGENTS.md missing 'Development Workflow'"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi

if grep -q "Testing Requirements" test-output/AGENTS.md; then
  echo -e "${GREEN}✓${NC} AGENTS.md contains 'Testing Requirements'"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "${RED}✗${NC} AGENTS.md missing 'Testing Requirements'"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi

if grep -q "Code Quality Standards" test-output/AGENTS.md; then
  echo -e "${GREEN}✓${NC} AGENTS.md contains 'Code Quality Standards'"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "${RED}✗${NC} AGENTS.md missing 'Code Quality Standards'"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Clean up test 1-4
rm -rf test-output

# Test 5: Init in current directory
echo ""
echo "Test 5: Testing init in current directory..."
mkdir test-current
cd test-current
node ../bin/cli.js init . > /dev/null 2>&1

assert_file_exists "AGENTS.md"
assert_file_exists "CLAUDE.md"
assert_file_exists "README.md"
assert_dir_exists "docs"

cd ..
rm -rf test-current

# Test 6: Error handling - no command
echo ""
echo "Test 6: Testing error handling (no command)..."
if node bin/cli.js > /dev/null 2>&1; then
  echo -e "${RED}✗${NC} Should fail with no command"
  TESTS_FAILED=$((TESTS_FAILED + 1))
else
  echo -e "${GREEN}✓${NC} Correctly fails with no command"
  TESTS_PASSED=$((TESTS_PASSED + 1))
fi

# Test 7: Error handling - invalid command
echo ""
echo "Test 7: Testing error handling (invalid command)..."
if node bin/cli.js invalid-command > /dev/null 2>&1; then
  echo -e "${RED}✗${NC} Should fail with invalid command"
  TESTS_FAILED=$((TESTS_FAILED + 1))
else
  echo -e "${GREEN}✓${NC} Correctly fails with invalid command"
  TESTS_PASSED=$((TESTS_PASSED + 1))
fi

# Test 8: Enable command in fresh directory
echo ""
echo "Test 8: Testing enable command in fresh directory..."
mkdir test-enable
cd test-enable
node ../bin/cli.js enable > /dev/null 2>&1

assert_file_exists "AGENTS.md"
assert_file_exists "CLAUDE.md"
assert_file_exists "README.md"
assert_dir_exists "docs"

cd ..
rm -rf test-enable

# Test 9: Enable with existing README (should append)
echo ""
echo "Test 9: Testing enable with existing README.md..."
mkdir test-enable-readme
cd test-enable-readme
echo "# Existing Project" > README.md
node ../bin/cli.js enable > /dev/null 2>&1

if grep -q "Existing Project" README.md && grep -q "AI-Native Development" README.md; then
  echo -e "${GREEN}✓${NC} README.md appended correctly"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "${RED}✗${NC} README.md not appended correctly"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi

cd ..
rm -rf test-enable-readme

# Test 10: Enable with existing AGENTS.md (should skip)
echo ""
echo "Test 10: Testing enable skips existing AGENTS.md..."
mkdir test-enable-skip
cd test-enable-skip
echo "# Custom AGENTS" > AGENTS.md
node ../bin/cli.js enable > /dev/null 2>&1

if grep -q "Custom AGENTS" AGENTS.md && ! grep -q "Development Workflow" AGENTS.md; then
  echo -e "${GREEN}✓${NC} AGENTS.md preserved (not overwritten)"
  TESTS_PASSED=$((TESTS_PASSED + 1))
else
  echo -e "${RED}✗${NC} AGENTS.md was overwritten"
  TESTS_FAILED=$((TESTS_FAILED + 1))
fi

cd ..
rm -rf test-enable-skip

# Summary
echo ""
echo "================================="
echo "Test Results:"
echo "  Passed: $TESTS_PASSED"
echo "  Failed: $TESTS_FAILED"
echo "================================="

if [ $TESTS_FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ All tests passed!${NC}"
  exit 0
else
  echo -e "${RED}❌ Some tests failed${NC}"
  exit 1
fi
