Write-Host "Starting CFA Employee Portal Server..." -ForegroundColor Green
Write-Host ""
Write-Host "Choose your preferred server:" -ForegroundColor Yellow
Write-Host "1. Node.js server (recommended)"
Write-Host "2. Python HTTP server"
Write-Host "3. Open file directly in browser"
Write-Host ""

$choice = Read-Host "Enter your choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host "Starting Node.js server on http://localhost:8080" -ForegroundColor Green
        Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
        node server.js
    }
    "2" {
        Write-Host "Starting Python HTTP server on http://localhost:8080" -ForegroundColor Green
        Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
        python -m http.server 8080
    }
    "3" {
        Write-Host "Opening index.html directly in browser..." -ForegroundColor Green
        Start-Process "index.html"
    }
    default {
        Write-Host "Invalid choice. Starting Node.js server by default..." -ForegroundColor Red
        node server.js
    }
}

Read-Host "Press Enter to continue..."
