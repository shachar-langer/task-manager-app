# Task Manager

A task manager application written with Node.js. Use REST API to to sign up, edit your profile and manage your tasks.

## Demo

Connect to http://langer-task-manager.herokuapp.com for a working live server.

## Prerequisites

### MongoDB Server

This application requires a running MongoDB server. You can run a server locally or use an external server. It is recommended to use MongoDB's cloud solution called Atlas. It's maintained by MongoDB and has a free tier.

### Environment Variables

In order to run this application you'll need to set 4 environment variables -
* PORT - The app's connection port
* SENDGRID_API_KEY - An API key for SendGrid, an email delivery service
* JWT_SECRET - A JSON web token secret key
* MONGODB_URL - A full URL for a MongoDB database. For example: mongodb://127.0.0.1:27017/task-manager-api

## Installation

Clone this repo and in the project directory run `yarn install` to install all the dependencies.

## Usage

In the project directory run `yarn run start` to start the application. You should now be able to access it from `http://127.0.0.1:<PORT>/`. The PORT is the port you configured as an environment variable.

## REST API

[Click here](https://documenter.getpostman.com/view/9810196/SWEB2vqy?version=latest) for the full REST API documentation.

## Tests

In the project directory run `yarn run test`.

## Credits

This application was written as part of Andrew Mead's "The Complete Node.js Develop Course" course.