# Basic Slot Machine 

# Prerequisites

- Install [npm](https://www.npmjs.com/) version >16.9.1

# Getting Started

- Install dependencies

```
npm install
```

- Build and run the project

```
npm run dev
```

Navigate to `http://localhost:3000`

### Client-Side Functionality
* Loader.
* Spin Button.
* ReelGrid.
* Sending request to the server and handling the response.
* Win Presentaitons with updated balance from server response.

### Server-Side Functionality
* processing requests sent by client.
* Sending Init response with the balance, reel and default reel stops.
* Sending Spin response with random reel stops from the reel and with win amount as per the symbols


## Tech Used
* TypeScript
* Node.js 
* PIXI.js
* esbuild
* lodash
* express Js for server
