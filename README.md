# Basic Slot Machine - Ritesh Kumar Parag

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

## Some Test Case Scenario

- Handling with keyboard events is done.(listening from 1 to 7)
- Pressing any key from 1 to 7 will give a preset win on corresponding payline.
- E.g. - Key "1": Win on payline 1, Key "2": Win on payline 2, and so on till Key "7"


### Client-Side Functionality
* Loader
* Spin Button
* ReelGrid
* Sending request to the server and handling the response.
* Win messages with updated balance from server response.
* Cheats to trigger wins

### Server-Side Functionality
* processing requests sent by client.
* Sending Init response with the balance, reel and default reel stops.
* Sending Spin response with random reel stops from the reel and with win amount as per the symbols
* Sending Cheat response with selected cheat reel stops from the reel and with win amount as per the symbols


## Tech Used
* TypeScript
* Node.js 
* PIXI.js
* esbuild
* lodash
* express Js for server
