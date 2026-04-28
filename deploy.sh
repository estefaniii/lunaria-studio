#!/usr/bin/env bash
# Lunaria Studio — Deploy a Vercel
# Uso:
#   ./deploy.sh           → preview deploy
#   ./deploy.sh --prod    → producción

set -e

cd "$(dirname "$0")"

echo "✦ Lunaria Studio — desplegando a Vercel..."
echo ""

VERCEL="./node_modules/.bin/vercel"

if ! "$VERCEL" whoami > /dev/null 2>&1; then
  echo "→ Necesitas iniciar sesión en Vercel primero."
  echo "  Se abrirá una ventana de tu navegador para autorizar."
  echo ""
  "$VERCEL" login
fi

if [ "$1" == "--prod" ]; then
  echo "→ Desplegando a PRODUCCIÓN..."
  "$VERCEL" --prod --yes
else
  echo "→ Desplegando preview (no es prod aún)..."
  "$VERCEL" --yes
fi

echo ""
echo "✦ Listo. Si es la primera vez, ve al dashboard:"
echo "  https://vercel.com/dashboard"
