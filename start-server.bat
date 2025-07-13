@echo off
echo Starting CFA Employee Portal Server...
echo.
echo Choose your preferred server:
echo 1. Node.js server (recommended)
echo 2. Python HTTP server
echo 3. Open file directly in browser
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo Starting Node.js server on http://localhost:8080
    node server.js
) else if "%choice%"=="2" (
    echo Starting Python HTTP server on http://localhost:8080
    python -m http.server 8080
) else if "%choice%"=="3" (
    echo Opening index.html directly in browser...
    start index.html
) else (
    echo Invalid choice. Starting Node.js server by default...
    node server.js
)

pause
