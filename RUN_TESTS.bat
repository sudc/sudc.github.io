@echo off
REM ############################################################################
REM TripSaver Test Suite Runner (Windows)
REM Runs all frontend and backend tests with detailed reporting
REM ############################################################################

setlocal enabledelayedexpansion

echo.
echo ============================================================
echo         TripSaver Comprehensive Test Suite
echo              December 24, 2025
echo ============================================================
echo.

set "TESTS_PASSED=0"
set "TESTS_FAILED=0"

REM ############################################################################
REM PHASE 1: Frontend Tests (Angular)
REM ############################################################################

echo.
echo ============================================================
echo PHASE 1: Frontend Tests (Angular)
echo ============================================================
echo.

cd /d "%~dp0"

echo Installing dependencies (if needed)...
call npm install --legacy-peer-deps >nul 2>&1

echo Running Angular Tests...
echo.

call npm test -- --watch=false --code-coverage --browsers=ChromeHeadless >test-results-frontend.log 2>&1

if !errorlevel! equ 0 (
    echo [PASS] Frontend Tests PASSED
    set /a TESTS_PASSED+=1
) else (
    echo [FAIL] Frontend Tests FAILED
    set /a TESTS_FAILED+=1
    echo Check test-results-frontend.log for details
)

echo.
echo ============================================================
echo.

REM ############################################################################
REM PHASE 2: Backend Tests (Node.js)
REM ############################################################################

echo.
echo ============================================================
echo PHASE 2: Backend Tests (Node.js/Jest)
echo ============================================================
echo.

cd /d "%~dp0backend"

echo Installing backend dependencies (if needed)...
call npm install >nul 2>&1

echo Running Backend Tests...
echo.

call npm test >"..\test-results-backend.log" 2>&1

if !errorlevel! equ 0 (
    echo [PASS] Backend Tests PASSED
    set /a TESTS_PASSED+=1
) else (
    echo [FAIL] Backend Tests FAILED
    set /a TESTS_FAILED+=1
    echo Check ..\test-results-backend.log for details
)

echo.
echo ============================================================
echo.

cd /d "%~dp0"

REM ############################################################################
REM Test Summary Report
REM ############################################################################

echo.
echo ============================================================
echo                 TEST SUMMARY REPORT
echo ============================================================
echo.

set /a TOTAL_TESTS=%TESTS_PASSED% + %TESTS_FAILED%

echo Total Test Suites Run: !TOTAL_TESTS!
echo Passed: %TESTS_PASSED%
echo Failed: %TESTS_FAILED%
echo.

if !TESTS_FAILED! equ 0 (
    echo ============================================================
    echo         ^|^| ALL TESTS PASSED SUCCESSFULLY! ^|^|
    echo ============================================================
    exit /b 0
) else (
    echo ============================================================
    echo       ^|^| SOME TESTS FAILED - SEE DETAILS BELOW ^|^|
    echo ============================================================
    echo.
    echo Test Results Saved In:
    echo   - test-results-frontend.log
    echo   - test-results-backend.log
    echo.
    exit /b 1
)
