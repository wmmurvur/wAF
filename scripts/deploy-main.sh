#!/bin/sh
# Rebuilds the site and puts the result on the main branch.
# main holds only the finished site (what Hostinger serves); the code lives on source.
# Run from a clean checkout of source:  npm run deploy
# Optional: DEPLOY_TRAILER="..." adds trailer lines to the main commit message.
set -e
[ "$(git branch --show-current)" = "source" ] || { echo "deploy: run this on the source branch"; exit 1; }
[ -z "$(git status --porcelain)" ] || { echo "deploy: commit or stash your changes first"; exit 1; }

npm run build
VER=$(node -p "require('./package.json').version")
SHA=$(git rev-parse --short HEAD)
WT=$(mktemp -d)
MSG=$(mktemp)

git fetch -q origin main
git worktree add -q -B main "$WT" origin/main
git -C "$WT" rm -rq --ignore-unmatch .
cp -R dist/. "$WT"/
sed -e "s/{{VERSION}}/$VER/g" -e "s/{{SOURCE}}/$SHA/g" scripts/main-README.md > "$WT/README.md"
git -C "$WT" add -A

printf 'site %s, built from source %s\n' "$VER" "$SHA" > "$MSG"
[ -n "$DEPLOY_TRAILER" ] && printf '\n%s\n' "$DEPLOY_TRAILER" >> "$MSG"
git -C "$WT" commit -q -F "$MSG"
git -C "$WT" push -q origin main
git worktree remove --force "$WT"
rm -f "$MSG"
echo "deploy: main now holds site $VER (source $SHA)"
