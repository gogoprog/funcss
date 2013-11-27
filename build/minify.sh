#!/bin/sh
outfile=../release/funcss.min.js
mkdir -p ../release
yuicompressor ../src/funcss.js -o $outfile
echo "$outfile created."
