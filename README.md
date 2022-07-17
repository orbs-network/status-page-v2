# Status Page V2

Web based status page for Orbs Network (for V2). 

## Dev environment

* Make sure [Node.js](https://nodejs.org/) is installed (min 12.14.0).

  * Install with `brew install node`, check version with `node -v`.

* [VSCode](https://code.visualstudio.com/) is recommended as IDE.

  * Recommended extensions [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Prettier - code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

* This project contain a backend server and frontend server. To develop and test the frontend the backend must be also running and both servers need to agree on the port (default 8081).

### Backend Server

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
  A browser window will automatically open http://localhost:8081/json (the port is configuarble, but note that it need to match the frontend for devlopment).

  * Other Option to build and run
  ```
  npm run build
  npm run start
  open http://localhost:8081/json
  ```

* Built code will be inside `./dist`.


### Frontend Server

* go to the front end root directory & install it

  ```
  cd src/status-page-client
  npm install
  ```
  * note if you change the port in the backend update the package.json `proxy` field accordingly.

* Build

  ```
  npm run build
  ```

* Run
  ```
  npm run start
  ```
  
## Deploy (Heroku)

* Install the heroku cli [https://devcenter.heroku.com/articles/heroku-command-line][heroku CLI]


* Add heroku as a remote for git (Only once)
  ```
  npm run gitAddRemoteHeroku
  ```
  
* Deploy
  Please note, the best practice is to deploy to heroku while you are in a clean master branch enviroment. So develop in your branch, create PR, merge to master, pull master and only then deploy to heroku.
  ```
  npm run deployHeroku
  ```

## Enviroument Variables

  * PORT 
    * Output port for accessing backend server (http://domain:8081/json) 
    * Default is considered to be 8081
    
  * NETWORK_TYPE
    * Decides the flavour of the server accept only two value `pubilic` and `private`.
  
  * NETWORK_NODE_ENDPOINTS
    * A comma separated list of protocol + domain/ips (for example https://0xcore.orbs.com,http://34.227.204.75) that can be used to discover the nework. The server tries them one after the other. First one that answers is used.
  
  * SLACK_TOKEN, SLACK_CHANNEL
    * Optional
    * Token & Channel Name for a slack enviroment to allow sending alerts.
    * If token and channel exist, every `POLL_INTERVAL_SECONDS` the current state is comapre with previous and if any new field turned "Red" it will also send an alert.

  * DISCORD_URL
    * Optional
    * Discord webhook url to allow sending alerts.
    * If exists, every `POLL_INTERVAL_SECONDS` the current state is comapre with previous and if any new field turned "Red" it will also send an alert.

  * POLL_INTERVAL_SECONDS
    * Optional.
    * Time to wait between server checks. This is the heartbeat of the backend server.
    * Default is 5 minutes.
  
  * STATUS_STALE_TIME_SECONDS
    * Optional
    * If the information from any source (any of the servers queried to gather infomation) is older than this number consider that information as stale and notify system.
    * Default is 15 minutes
  
  * ROOT_NODE_STALE_WARN_TIME_SECONDS, ROOT_NODE_STALE_ERROR_TIME_SECONDS
    * Optional
    * For the root node (the one we use to discover the network) there is special case and we have time for warning and time for error
    * Defaults are 1 hour and 12 hours, respectively
  
  * VC_EXPIRATION_WARN_DAYS
    * Optional.
    * Creates a warning if a VC subscription time is less than this number of days before expiration.
    * Default is 30 days.
  
  * VC_NAME_OVERRIDE
    * Optional
    * Allows to a simple override for VC-names in the UI. This field is a stringified JSON object with keys matching VC Ids exacly and the desired name. Wrong field here may crash the server.
    * Default is empty.
    * Example `{"100":"Original","1000004":"Core Canary"}`

  * PING_URL_ENDPOINTS
    * Optional
    * Comma seperated full URLs (for example: https://staking.orbs.network/)
    * Allows to a simple http(s) call to test if this URL are responding in a timely manner (default 3000 millis).

  * PING_URL_TIMEOUT_MILLIS
    * Optional
    * Comma seperated timeouts in milliseconds. If supplied must match PING_URL_ENDPOINTS in size.
    * Change default timeout for ping URLs.

  * SSL_HOSTS
    * Optional
    * Comma seperated host names (for example 0xcore.orbs.com).
    * Checks the validity of the certificate of the hosts and warns 7 days before they are expired.

  * Ethereum Related
    In public network that is connected to Ethereum supply an ethereum endpoint to allow reading the related statuses.
    * ETHEREUM_ENDPOINT
      * Provider url for accessing Ethereum. It is optional if not supplied all the Ethereum checks will be skipped.
      * If left empty other fields will be ignored.
      * For example. `https://mainnet.infura.io/v3/<your key here>`
    * MATIC_ENDPOINT
        * Provider url for accessing Polygon. It is optional if not supplied all the Polygon checks will be skipped.
        * If left empty other fields will be ignored.
        * For example. `https://polygon-mainnet.g.alchemy.com/v2/<your key here>`
    * MAX_TIME_SECONDS_SINCE_LAST_EVENT
      * Optional.
      * The staking address undelying the Ethereum economy of your network. The time component is to allow checking the livness of your network if no event happened in the last amount of time then there might be a problem on the Ethereum side.
      * Overrides the address for staking address.
      * Default time is 1 day.  

## Specific ports configuration
Some guardians expose custom ports (instead of the default port 80).
In such cases, add the corresponding mapping to **_portsMapping_** under `/src/config.ts`
```
{ip: port}
```

[heroku CLI]: https://devcenter.heroku.com/articles/heroku-command-line


## Monitoring and data api
- ```/schdule/update```
  - shows current version and pending updates per service
  - [example link](http://status.orbs.network/schedule/update)
- ```/schdule/recovery```
  - shows next recovery sorted by next execution
  - [example link](http://status.orbs.network/schedule/recovery)
- ```/svc_data_by_node?service={service_name}&columns={field1,field2}...```
  - return columns from a service status page in csv format 
  - [example link](https://status.orbs.network/svc_data_by_node?service=boyar&columns=Payload.Metrics.MemoryUsedPercent,Payload.SystemDocker.ServerVersion)
  
## filterIgnoredServiceErrors
- Boyar cpu error is filter out in this function
- Boyar Memory threshold was set to > 85% duw to non swap