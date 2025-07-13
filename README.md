# CFA Employee Portal

## How to Run and Debug

### Option 1: Using VS Code Run and Debug (Recommended)

1. **Open the Run and Debug panel** (Ctrl+Shift+D)
2. **Select a configuration** from the dropdown:
   - **"Launch with Node Server"** - Uses Node.js server (recommended)
   - **"Launch with Python Server"** - Uses Python HTTP server
   - **"Open File Directly"** - Opens the HTML file directly (may have CORS issues)
3. **Click the green play button** or press F5

### Option 2: Manual Server Start

1. **Open a terminal** in VS Code (Ctrl+Shift+`)
2. **Run one of these commands**:
   ```bash
   # Option A: Node.js server (recommended)
   node server.js
   
   # Option B: Python HTTP server
   python -m http.server 8080
   ```
3. **Open your browser** and go to `http://localhost:8080`

### Option 3: Use the Batch Files

1. **Double-click** `start-server.bat` for a menu-driven approach
2. **Or run** `start-server.ps1` in PowerShell

### Option 4: Using VS Code Tasks

1. **Open Command Palette** (Ctrl+Shift+P)
2. **Type** "Tasks: Run Task"
3. **Select** one of:
   - "Start Development Server" (Node.js)
   - "Start Simple Server" (Python)
   - "Open in Browser"

## Debugging JavaScript

- Set breakpoints in your JavaScript code by clicking in the gutter
- Use the browser's Developer Tools (F12) for additional debugging
- The VS Code debugger will work when using the "Launch with Node Server" configuration

## Troubleshooting

### PowerShell Execution Policy Error
If you get an execution policy error, run this in PowerShell as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port Already in Use
If port 8080 is already in use:
1. Change the port in `server.js` (line with `const PORT = process.env.PORT || 8080;`)
2. Update the launch configuration URLs in `.vscode/launch.json`

### CORS Issues
If you encounter CORS issues:
- Use the Node.js server instead of opening the file directly
- The server includes proper CORS headers

## Files Structure

- `index.html` - Main application file
- `server.js` - Node.js development server
- `.vscode/launch.json` - VS Code debug configurations
- `.vscode/tasks.json` - VS Code task definitions
- `start-server.bat` - Windows batch file to start server
- `start-server.ps1` - PowerShell script to start server
