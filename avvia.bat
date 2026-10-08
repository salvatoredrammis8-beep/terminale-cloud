@echo off
cd /d C:\Users\Salvatore\.config\opencode
start /min cmd /c "node server.js"
timeout /t 2 >nul
start http://localhost:3000
