#!/bin/sh
git=$(which git);
file="src/Emayk/Ics/Config/version";
#git describe --abbrev=0 > src/Emayk/Ics/Config/version
git describe  > src/Emayk/Ics/Config/version