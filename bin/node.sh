#!/bin/bash - 
#===============================================================================
#
#          FILE: node.sh
# 
#         USAGE: ./node.sh 
# 
#   DESCRIPTION: 
# 
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: YOUR NAME (), 
#  ORGANIZATION: 
#       CREATED: 08/13/2019 20:22
#      REVISION:  ---
#===============================================================================

set -o nounset                              # Treat unset variables as an error
last=$(echo "${@: -1}")

if  echo "$last" | grep -q '-' ;
then
    echo "No Folder Specified"
    exit 1
fi
cd $(echo "$last")

while getopts "gt" opt; do
  case ${opt} in
    g ) # process option a
        git init
        ;;
    j ) # process option t
     JAVASCRIPT=true
        ;;
  t )
      JAVASCRIPT=false

    * ) echo "Usage: cmd [-h] [-t]"
      ;;
  esac
done


if $JAVASCRIPT;
then
    cp ../templates/javascript/package.json $(echo "$(pwd)/$last")
else

    cp ../templates/typescript/package.json $(echo "$(pwd)/$last")
fi
