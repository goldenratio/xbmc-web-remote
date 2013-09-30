#!/bin/sh

BASEDIR=$(dirname $0)
nodeLocation=$BASEDIR"/data/bin/node"
jsLoc=$BASEDIR"/data/xbmc_remote.js"

$nodeLocation --harmony $jsLoc

