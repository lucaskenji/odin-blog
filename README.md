# Project: Blog API
Made for The Odin Project.

## About
This project was made for a course of Node.js from The Odin Project. By working on this project, I could:
* Sharpen up my skills on the MERN(MongoDB, Express, React, Node.js) stack.
* Learn how to make a RESTish API and how to secure it using JWT
* Understand how CORS works
* Work with HTTP requests

## Getting Started
Follow these instructions to set up the project locally.

### Prerequisites
* npm
* Node.js

### Installation
1. Get a free Mongo database at [the official website](https://www.mongodb.com/cloud/atlas)
2. Clone the repo
3. Install dependencies with NPM

```
npm install
```

4. Set the environment variables necessary for this project to work. You can do this manually or using a module like [dotenv](https://www.npmjs.com/package/dotenv).
- `URLSTRING` is the connection string for your Mongo database.
- `JWT_KEY` is a string used as secret in JsonWebToken.
- `PORT` specifies the port the Express server will be listening on.

5. Run `npm start`.

## Preview

![Screenshot of a blog post](https://github.com/lucaskenji/odin-blog/blob/master/previews/screenshot.png)

## Acknowledgements
* The Odin Project
* Bootstrap
* JWT
* React Router
* Axios