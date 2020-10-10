#!/bin/sh

git checkout master -- index.html
git checkout master -- oracles.js
git checkout master -- js/oracles-engine.js
git checkout master -- js/names.js
git checkout master -- js/harrypotter.js
git checkout master -- names.json

git status

git commit -a -m "new version"

git push origin gh-pages


