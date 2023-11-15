#!/bin/bash

echo "Removing previously created 'dist' directory..."
rm -rf ./dist

echo "Start building the package..."
npm run build

if [ $? -eq 0 ]; then
  echo "Building process has finished successfully."

  git add . && git commit -m "$(date '+%Y-%m-%d %H:%M:%S')" && git push origin dev

  echo "Copying has finished."

  echo "Clean up has been done."

  cd ../dune-usage
  npm install git+ssh://git@github.com:mikeopatskyi/dune.git#dev
  echo "The package has been installed."

else
  echo "Building process has encountered an error. Aborting."
fi
