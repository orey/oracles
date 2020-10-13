#!/bin/sh
git add *
git commit -a -m "new stuff"
git push origin master
git checkout gh-pages
