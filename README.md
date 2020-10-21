# Status Page V2

Web based status page for Orbs Network (for V2).

## Dev environment

* Make sure [Node.js](https://nodejs.org/) is installed (min 12.14.0).

  * Install with `brew install node`, check version with `node -v`.

* [VSCode](https://code.visualstudio.com/) is recommended as IDE.

  * Recommended extensions [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Prettier - code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

* Run in terminal in root project directory:

  ```
  npm install
  ```

* Create enviroment variables.
Quickest way is to copy the `.env.example` into `.env` and fill out all mandatory fields. Currently to use the ORBS mainnet the only thing you need is to add an infura api-key. If you run a private ORBS network, replace the NETWORK_TYPE & NETWORK_NODE_ENDPOINTS, and can remove all the Ethereum section.

* Run server in developer mode (rebuilds and restarts server on every file change):

  ```
  npm run dev
  ```

## Build

* Run in terminal in root project directory:

  ```
  npm run build
  ```

* Built code will be inside `./dist`.

  * Run it with: 
  
  ```
  npm start
  open http://localhost/json
  ```
  
## Deploy (Heroku)

* Install the heroku cli [https://devcenter.heroku.com/articles/heroku-command-line][heroku CLI]


* Add heroku as a remote for git (Only once)
  ```
  npm run gitAddRemoteHeroku
  ```
  
* Deploy
  ```
  npm run deployHeroku
  ```
  
  


[heroku CLI]: https://devcenter.heroku.com/articles/heroku-command-line