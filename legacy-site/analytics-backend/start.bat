@echo off
echo.
echo ========================================
echo   Portfolio Analytics Backend
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js found: 
node --version
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed.
    echo.
    pause
    exit /b 1
)

echo [OK] npm found:
npm --version
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] Installing dependencies...
    echo.
    call npm install
    echo.
)

echo ========================================
echo   Starting Analytics Server
echo ========================================
echo.
echo Dashboard: http://localhost:3001/dashboard
echo API: http://localhost:3001/api
echo.
echo Press Ctrl+C to stop the server
echo.

npm start

