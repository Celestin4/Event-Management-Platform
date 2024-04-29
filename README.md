# Event Management Platform - Internship Assessment

## Link to hosted version of intergrated website

Link: `https://eventpulse.netlify.app/` 

## Note: Hosted version is bit slow because it hosted on free servers.

You can also follow the step mentioned in Project Setup section below


## Project Overview

This project is an Event Management Platform developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to browse upcoming events, book tickets, manage bookings, and provides administrators with a dashboard for event management.

## Testing credentials for a hosted version:

***Admin: ***  
"email": "admin@example.com",
  "password": "Test1234",

***Normal user***
"email": "testinguser@example.com",
  "password": "Test1234",


## Features Implemented

### Event Listing and Details:
- Display a list of upcoming events with essential details like title, date, location, image and ticket availability.

### Booking Tickets:
- Users can select the number of tickets they wish to book for an event and complete a simple booking process.

### User Dashboard:
- Users have access to a dashboard where they can view their booked events and cancel bookings if needed.

### Admin Dashboard:
- Administrators can manage events, including creating, editing, and deleting events.
- Admins also have access to view all bookings and manage them, such as canceling bookings and viewing attendee details.

### Basic Styling and UI/UX:
- A simple and clean design using Tailwind CSS ensures a consistent look and feel across the platform.
- Focus is on usability and intuitive navigation to enhance the user experience.

### Error Handling and Validation:
- Basic error handling and validation for user inputs (e.g., form submissions) are implemented.
- Informative error messages guide users in case of invalid actions.

## How to use our website

1. **Normal User:**
1. ***Step 1:**
-If you have account , click login in navigation bar to go login page. input your credentials and login
-if you don't have account, please clcik signup in navigation bar and go to signup page. Input your credentilas and regiter

2. ***Step 2***: 
-Click on one of event and see its details and be abale to book a ticket by pressing Book ticket button

3. ***Step 3:***
-Click My Bookings in navaiagtion bar, to see all of ticket you have booked and be able to cancel what you dont want.


1. **Admin:**
When you login with admin account you will be able to access dashboard where he can perform the following: 

                    - Creating an event
                    -Deleting an event 
                    -Cancelling event
                    -Cancel ticket for an attendee who booked a ticket for an event
                    -Updating event details
                    -View event attendees (Who booked tictet to that event)


## Project Setup

Follow these steps to set up the project on your local machine:

1. **Clone the Repository:**

2. **Navigate to the Project Directory:**

3. **Install Dependencies:**

4. **Set Up MongoDB:**
- Make sure you have MongoDB installed and running locally.
- Create a new database named `event_management`.

5. **Environment Variables:**
- Create a `.env` file in the `server` directory.
- Add environment variables for MongoDB connection URI, JWT secret, etc.

6. **Start the Server and Client:**

7. **Access the Application:**
- The client will be running on `http://localhost:3000`.
- The server will be running on `http://localhost:5000`.

7. **User role: Admin or user:**
- When you create a user, has defalut role of user, you will be required ot change it in database when you want him to have admininstrative reole



