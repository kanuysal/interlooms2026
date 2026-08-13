@echo off
title INTERLOOMS Astro Local Server (Port 3005)
echo ==================================================
echo   Starting INTERLOOMS Astro Local Server...
echo   Opening http://localhost:3005 in your browser...
echo ==================================================
echo.

start http://localhost:3005/
npm run dev

pause
