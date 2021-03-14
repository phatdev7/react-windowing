# react-windowing

React-windowing works by only rendering part of a large data set (just enough to fill the viewport). This helps address some common performance bottlenecks:

It reduces the amount of work (and time) required to render the initial view and to process updates.
It reduces the memory footprint by avoiding over-allocation of DOM nodes.

## Install

Clone project by running `git clone https://github.com/tanphat195/react-windowing.git` or `git@github.com:tanphat195/react-windowing.git`

## Available Scripts

In the project directory, you can run:

### `npm install` or `yarn install`

Download the dependencies in node_modules

### `npm run start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
