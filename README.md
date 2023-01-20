# care4pets-MERN-Project-



## Table of contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Technology](#technology)
- [Features](#features)
- [Run&nbsp;Backend](#runbackend)
- [Run&nbsp;Client&nbsp;Side](#runclientside)


## Introduction

A  web platform to provide expert guidance to people for taking care of physical and mental wellbeing of their pets, built using React, Node js, Express js, and MongoDb.

NOTE: Please read the RUN section before opening an issue.
>Warning: care4pets is still in development, constantly being optimized and isn't still stable enough to be used in production environments
## Demo

![This is an image](/Screenshot (11).png)

care4pets is an online platform for people who are not familiar with pets and don't know how to take care of their pets.Here they can buy subscription plan according to their need,and then they will be provided with an expert for taking care of their pets.The expert will help them to maintain the diet and workout of their pets.They  can clear all their query about pet caring with the expert.



## Technology

The application is built with:

- React.js
- Redux
- Node.js
- MongoDB
- Express
- Tailwind
- Socket.IO
- Nodemailer
- Stripe


## Features

- SignUp, and log in With the JWT token, OTP verification
- Admin Page, Block User, approve expert
- Create, Edit, Delete Plan
- Live Chat, Integrated with Socket I/O
- Watch videos of their expert
- Payment using stripe 


## Run&nbsp;Backend

To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:

- MONGO_URI : This is the MongoDB Connection Url (string).

- JWT_SECRET : This is the JWT SECRET ID (string).

- BASE_URL: This is the Base URL of Website (string).

- PORT: Specify the port Number

- Also you need to insert admin username and password in database eg:{username:"admin",password:"12345"}

After you've set these environmental variables in the .env file at the root of the project, and intsall node modules using npm install

Now you can run npm start in the terminal and the application should work.


## Run&nbsp;Client&nbsp;Side

intsall node modules using npm install

Now you can run npm run dev in the terminal and the Client Side should start working.

## Copyright

Copyright 2023 © [Zonin-SB](https://github.com/Zonin-SB)
