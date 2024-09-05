# Real-Time Chat Application

This project is a real-time chat application built using **Socket.IO**, **Express**, **MongoDB**, and **Mongoose**. It allows users to join different chat rooms, exchange messages in real-time, and stores chat records for each room, along with timestamps and usernames.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: Socket.IO-client, HTML, CSS
- **Database**: MongoDB with Mongoose
- **Real-Time Communication**: Socket.IO
- **Pagination**: Custom backend pagination with MongoDB


## Features

### 1. Real-Time Messaging
- **Socket.IO** is used for real-time, bidirectional communication between clients and the server.
- Messages are sent and received instantly within a chat room.

### 2. Room Selection
- Users can select a chat room to join by filling out a form with their **username** and the **room** they wish to join.
- Each user is directed to a unique chat room, where they can interact with others.

### 3. Message Storage
- Messages are stored in **MongoDB** using **Mongoose**.
- The backend maintains a separate record for each room’s chat, including:
  - **Username** of the sender
  - **Timestamp** for when the message was sent and received

### 4. Infinite Scrolling and Pagination
- **Infinite scrolling** has been implemented so users can load older messages as they scroll up.
- Messages are paginated on the backend to ensure smooth loading of chat history.

### 5. Real-Time Timestamps
- Messages are displayed with real-time **timestamps** showing when the message was sent or received, providing users with clear context for their conversations.

## Project Demonstration

A recording demonstrating the functionality of the chat application, including real-time messaging, room selection, and infinite scrolling, will be shared. The video will provide a full walkthrough of how the app works in a real-world scenario.

https://github.com/user-attachments/assets/bb8f88a0-3461-4a7f-a0a5-665e7d81b06e



## Installation and Setup

### Clone the Repository
```bash
git clone https://github.com/Prash766/Chat-App.git
cd realtime-chat-app
```
## Install Dependencies
```bash
npm install
```
## Set Up Environment Variables
Create a .env file with the following variables:
```bash
PORT=5000
MONGO_URI=your_mongo_connection_string
