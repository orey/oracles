#!/bin/sh

git checkout master -- index.html
git checkout master -- index-local.html
git checkout master -- oracles.js
git checkout master -- js/oracles-engine.js
git checkout master -- js/names.js
git checkout master -- js/harrypotter.js
git checkout master -- names.json
git checkout master -- favicon.ico
git checkout master -- styles.css

git status

get add *

git commit -a -m "new version"

git push origin gh-pages

git checkout master

