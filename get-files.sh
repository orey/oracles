#!/bin/sh

git checkout master -- index.html
git checkout master -- webworker.html
git checkout master -- oracles.js
git checkout master -- rpg/oracles-engine.js
git checkout master -- rpg/names.js
git checkout master -- rpg/harrypotter.js
git checkout master -- favicon.ico
git checkout master -- styles.css
git checkout master -- db/db.js
git checkout master -- ui/eventbus.js
git checkout master -- ui/npccomponent.htpl
git checkout master -- ui/npccomponent.js
git checkout master -- ui/templatengine.js
git checkout master -- ui/template-worker.js

git status

git add *

git commit -a -m "new version"

git push origin gh-pages

git checkout master

