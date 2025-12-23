@echo off
echo ============================================
echo  Push vers GitHub avec authentification
echo ============================================
echo.
echo IMPORTANT: Tu vas devoir t'authentifier avec ton compte nabs57
echo.
echo Option 1: Via navigateur (recommande)
echo Option 2: Via token personnel
echo.
choice /C 12 /M "Choisis ton option"

if errorlevel 2 goto token
if errorlevel 1 goto browser

:browser
echo.
echo Ouverture du navigateur pour authentification...
start https://github.com/settings/tokens/new?description=workout-tracker-deploy&scopes=repo
echo.
echo 1. Cree un token avec le scope 'repo'
echo 2. Copie le token genere
echo 3. Reviens ici et appuie sur une touche
pause
echo.
set /p TOKEN="Colle ton token ici: "
cd /d "%~dp0"
git push https://nabs57:%TOKEN%@github.com/nabs57/workout-tracker.git main
goto end

:token
echo.
set /p TOKEN="Entre ton token GitHub: "
cd /d "%~dp0"
git push https://nabs57:%TOKEN%@github.com/nabs57/workout-tracker.git main
goto end

:end
echo.
echo ============================================
if %errorlevel% equ 0 (
    echo  Code pousse avec succes sur GitHub!
    echo  Repo: https://github.com/nabs57/workout-tracker
) else (
    echo  Erreur lors du push. Verifie ton token.
)
echo ============================================
pause
