#!/usr/bin/bash

if [ ! $1 ]; then
    echo "Error: you should pass version number"
else
    echo "[@a-a-game-studio/aa-schema-ci]: creating version"
    npm version $1

    echo "[@a-a-game-studio/aa-schema-ci]: pushing updates"
    git push

    echo "[@a-a-game-studio/aa-schema-ci]: publish updates"
    npm publish --access public --registry https://registry.npmjs.org
fi