# Train Booking System

## Overview

This Train Booking System is a robust application built using Node.js and MongoDB. It facilitates user registration, ticket booking, ride management, and payment processing for train services. The system's architecture is modular, with each module representing a different entity within the system.

## Features

- **User Management**: Users can register, log in, and manage their profiles. Passwords are securely hashed, and user sessions are managed with JWT tokens.
- **Ticket Booking**: Users can book tickets for available rides, specifying origin and destination stations. The system ensures seat availability and handles seat assignments dynamically.
- **Ride Management**: Admins can manage train rides, including assigning trains to routes and tracking seat availability.
- **Payment Processing**: Secure payment processing for ticket purchases, supporting multiple payment methods and transaction statuses.
- **Security**: Users' sessions are managed using JWT, ensuring secure access to protected routes and resources.

## Technologies Used

- **Node.js**: The primary runtime environment for building the backend of the application.
- **Express**: A web application framework for Node.js, used to build the RESTful APIs.
- **MongoDB**: A NoSQL database used for storing user information, ride details, ticket bookings, and payment records.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a straightforward schema-based solution to model application data.
- **JWT (JSON Web Tokens)**: Used for requests authentication
- **bcrypt**: A library for hashing and salting user passwords to enhance security.
- **dotenv**: Used to load environment variables from a `.env` file, keeping sensitive information secure and organized.

## Testing

Testing was conducted using Jest and Postman.
