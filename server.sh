# set nvm
NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# install package
nvm use 12
if [ ! -d "./node_modules" ]; then
  npm install
fi

# run server
PRIVATE_KEY='1234!@#$qwer' node -e "require(\"./index.js\").server()"