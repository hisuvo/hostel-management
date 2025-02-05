## Hostel M.
## Project Overview:
The Hostel Management website is a digital platform designed to streamline hostel operations, including room allocation, resident management, and payment tracking. It provides an easy-to-use interface for both administrators and residents, ensuring efficient booking, real-time updates, and secure data management. The system helps in maintaining records, tracking occupancy, and managing payments seamlessly, making hostel administration hassle-free and organized.

## Bestro Boss:
<div>
  <img src="https://i.ibb.co.com/Xf0SCbWr/hostel-management.png"/>
</div>

##  Technologies
## Frontend:
- HTML, CSS, and JavaScript
- React.js (for building dynamic, responsive user interfaces)
- React-router-dom
- TailwindCSS (for styling and creating responsive layouts)
  
## Backend:
- Node.js (server-side JavaScript runtime)
- Express.js (web framework for building APIs)
  
## Database:
- MongoDB (NoSQL database for storing user data, orders, and menus)
- Payment Integration: Stripe 

## Authentication & Security:
- JWT (for user authentication and session management)
- Hosting & Deployment: Firebase or Vercel 

## Prerequisites:
Make sure you have the following installed on your system:
- Node.js (with npm)
- MongoDB (if running locally or you can use MongoDB Atlas)
- Git (for cloning the repository)

## Step-by-Step Guide:
1. Clone the Repository:
   - Clone the project repository from GitHub
     
             git clone https://github.com/hisuvo/hostel-management.git
             git clone https://github.com/hisuvo/hostel-management-server.git
     
2. Navigate to Project Folder:
   - Move into the project directory
     
            cd hostel-management

3. Install Frontend Dependencies:

   - Install the required dependencies:
 
            npm install

4. Install Backend Dependencies:
   - Navigate to the backend folder
     
            cd hostel-management-server

   - Install the required dependencies:
 
          npm install
     
5. Setup Environment Variables:
   - Create a .env file in the backend folder to store sensitive information like your MongoDB URI and Stripe
   - Example .env file:
     
           MONGO_URI=your_mongo_db_connection_string
           JWT_SECRET=your_jwt_secret
           STRIPE_SECRET_KEY=your_stripe_secret_key
     
6. Start MongoDB
    running MongoDB:
 
          mongod

 
   
## live project links :
 - https://food-share-surplus-reduction.web.app/


-----------------------------

## Admin usernameAnupom Datta

## Admin Email = anupom@gmail.com

## Admin Password = Ad@$24

## Client side Live link

- > https://hostel-management-9436b.web.app


## This website bullet points to feature

1.Student Authentication
2.Admin Dashboard
3.Meal Management
4.Food Reviews
5.Meal Liking System
6.Review Insights for Admins
7.Responsive UI
8.Search and Filter
9.Feedback System
10.Data Analytics for Admins
11.Two-Role Support (Admin and user)

## Uses NPM Package here

- react-tabs
- react-rating
- react-hook-form
- sweetalert2
- react-icon
- react-awesome-button
- react-stripe-js
- react-infinite-scroll-component
- react-fast-marquee
- react-datepicker

<!-- Done Page  -->

1. Home Page:

- Navbar
- Banner Section
- Meals by Category
  - Additional 1 Sections
  - Additional 2 Sections
  - Footer Section

2. Meal Detail Page:

- Displays meal details
- Like Button
- Meal Request Button
- Review Section

3. Meals Page
<!-- 4. Upcoming Page -->

4. Checkout Page (Private Route)
5. join use page (login/register)
6. User Dashboard

- User Profile
- Requested Meals
- My Reviews
- Payment History

8. Admin Dashboard

- Admin Profile:
- Manage Users
- add meal
- All Meals runing // Todo: update button
- All Reviews
- Serve Meals
    <!-- - Upcoming Meals -->
