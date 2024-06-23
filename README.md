# Book Review Application

Welcome to the Book Review Full Stack MERN Application! This repository contains the source code for a web application built using the MERN stack (MongoDB, Express.js, React, and Node.js).

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
-[Notes For Evaluators](#notes-for-evaluators)

## Introduction

This Project was created as a part of assignment task for gushwork, https://gist.github.com/punit1108/9b2058682fcb62952ed9fed0572445d5

## Features

- User authentication and authorization
- RESTful API endpoints
- Front-end built with React and Ant Design
- Database integration with MongoDB
- Environment configuration with dotenv


## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js
- npm
- MongoDB

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/AkashShukla09/BookReviewApplication
    ```

2. Install dependencies for both the server and client:

    ```bash
    # Install server-side dependencies
    cd server-side
    npm install

    # Install client-side dependencies
    cd ../client-side
    npm install
    ```

## Configuration

For simplicity of project setup, I have pushed `.env` as well.

## Running the Application

1. Start the server:

    ```bash
    cd server-side
    npm start
    ```

2. Start the client:

    ```bash
    cd ../client-side
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3002/login` incase React app doesnot open it automatically. 

## Project Structure

```
mern-application/
│
├── client/           # React front-end code
│   ├── public/
│   └── src/
│       ├── components/
│       ├── App.js
│       ├── index.js
│       └── ...
│
├── server/           # Express.js back-end code
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── index.js
│   ├── .env
│   └── ...
│
├── .gitignore
└── README.md
```

## Notes For Evaluators

I have **Implemented all the funtionalities** in the assignment **including the optional.** 

**Things I have missed:** A page to check the faviroute books of an user. Though the API works perfectly fine.

I have also added Postman API collection JSON in the root folder which can be used to **verify all API endpoints in one click** via importing it into Postman. 
