#!/bin/sh
git=$(which git);
#$git push origin master
file="src/Emayk/Ics/Config/version";
#git describe --abbrev=0 > src/Emayk/Ics/Config/version
git describe  > src/Emayk/Ics/Config/version