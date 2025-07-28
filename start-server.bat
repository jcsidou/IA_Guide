@echo off
echo Iniciando servidor local para o Guia de IA do MP...
echo.
echo O site estará disponível em: http://localhost:8000
echo Para parar o servidor, pressione Ctrl+C
echo.

cd /d "%~dp0"

if exist "C:\Python*\python.exe" (
    python -m http.server 8000
) else if exist "python" (
    python -m http.server 8000
) else if exist "python3" (
    python3 -m http.server 8000
) else (
    echo Python não encontrado. Tentando com Node.js...
    if exist "node" (
        npx http-server -p 8000
    ) else (
        echo Nem Python nem Node.js encontrados.
        echo Por favor, instale Python ou Node.js para executar o servidor local.
        echo.
        echo Alternativamente, você pode:
        echo 1. Instalar a extensão "Live Server" no VS Code
        echo 2. Usar qualquer outro servidor HTTP local
        echo.
        pause
    )
)
