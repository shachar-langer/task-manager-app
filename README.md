# Task Manager

A task manager application written with Node.js as instructed in Andrew Mead's "The Complete Node.js Develop Course" course.

## Getting Started

### MongoDB Server

This application requires a running MongoDB server. You can run a server locally or use an external server. It is recommended to use MongoDB's cloud solution called Atlas. It's maintained by MongoDB and has a free tier.

### Environment Variables

In order to run this application you'll need to set 4 environment variables -
* PORT - The app's connection port
* SENDGRID_API_KEY - An API key for SendGrid, an email delivery service
* JWT_SECRET - A JSON web token secret key
* MONGODB_URL - A full URL for a MongoDB database. For example: mongodb://127.0.0.1:27017/task-manager-api
