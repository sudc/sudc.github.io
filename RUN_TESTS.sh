#!/bin/bash

##############################################################################
# TripSaver Test Suite Runner
# Runs all frontend and backend tests with detailed reporting
##############################################################################

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         TripSaver Comprehensive Test Suite                    ║"
echo "║              December 24, 2025                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results tracking
TESTS_PASSED=0
TESTS_FAILED=0
FAILED_TESTS=()

##############################################################################
# PHASE 1: Frontend Tests (Angular)
##############################################################################

echo -e "${BLUE}▶ PHASE 1: Frontend Tests (Angular)${NC}"
echo "─────────────────────────────────────────────────────────────────"
echo ""

cd "$(dirname "$0")"

echo "📦 Installing dependencies (if needed)..."
npm install --legacy-peer-deps > /dev/null 2>&1 || true

echo -e "${YELLOW}Running Angular Tests...${NC}"
echo ""

# Run tests with detailed output
npm test -- --watch=false --code-coverage --browsers=ChromeHeadless 2>&1 | tee test-results-frontend.log

# Check if tests passed
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend Tests PASSED${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}❌ Frontend Tests FAILED${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
    FAILED_TESTS+=("Frontend Tests")
fi

echo ""
echo "─────────────────────────────────────────────────────────────────"
echo ""

##############################################################################
# PHASE 2: Backend Tests (Node.js)
##############################################################################

echo -e "${BLUE}▶ PHASE 2: Backend Tests (Node.js/Jest)${NC}"
echo "─────────────────────────────────────────────────────────────────"
echo ""

cd backend

echo "📦 Installing backend dependencies (if needed)..."
npm install > /dev/null 2>&1 || true

echo -e "${YELLOW}Running Backend Tests...${NC}"
echo ""

# Run backend tests
npm test 2>&1 | tee ../test-results-backend.log

# Check if tests passed
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend Tests PASSED${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}❌ Backend Tests FAILED${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
    FAILED_TESTS+=("Backend Tests")
fi

echo ""
echo "─────────────────────────────────────────────────────────────────"
echo ""

cd ..

##############################################################################
# Test Summary Report
##############################################################################

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    TEST SUMMARY REPORT                         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo "Total Test Suites Run: $((TESTS_PASSED + TESTS_FAILED))"
echo -e "Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Failed: ${RED}$TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║          🎉 ALL TESTS PASSED SUCCESSFULLY! 🎉                  ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
    exit 0
else
    echo -e "${RED}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║            ❌ SOME TESTS FAILED - SEE DETAILS BELOW            ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Failed Test Suites:"
    for test in "${FAILED_TESTS[@]}"; do
        echo -e "  ${RED}✗${NC} $test"
    done
    exit 1
fi
