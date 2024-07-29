---
# Project Name - Claw Assignment- Task 1

## Note
There are still one issue on frontend which is cookie and token when it is requesting BE , token and sessionId is not coming in request , gave already a  much time on this assignment , so i will suggest run locally , it doesnt have any issues  

## Project Overview

**TODO-APP** is a project that aims to create todo , update todo , delete todo , get sessions . Whether it's a web application, API service, or a different type of software.

## API Documentation 
```
https://documenter.getpostman.com/view/24036000/2sA3kaDedE
```
## Deployed BE 
```
https://claw-assignment-task-1.onrender.com/

```
## Deployed FE 
 
```
https://claw-assignment-task-1.vercel.app/

```

## Setup Instructions

Follow these steps to set up and run the project locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Saurabh-Taylor/claw-assignment-task-1.git
   ```

2. **Install Dependencies:**
   For frontend:
   ```bash
   cd client
   npm install
   ```

   For backend:
   ```bash
   cd server
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.l8ckwzs.mongodb.net/todo-assignment
   SUPABASE_URL=""
   SUPABASE_ANON_KEY=""
   FE_URL=""
   ```

4. **Start the Application:**
   To run the backend server:
   ```bash
   cd backend
   npm run dev 
   ```

   To run the frontend application:
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the Application:**
   Open your browser and navigate to `http://localhost:5173` for the frontend. The backend will be available at `http://localhost:3000` (or your configured port).

## Technologies Used

- **Frontend:**
  - **React:** A JavaScript library for building user interfaces.
  - **Redux:** A state management library.
  - **Tailwind CSS:** A utility-first CSS framework for styling.
  - **Daisy UI:** A components Library.
  - **Tanstack query:** For Data Fetching or data caching.
  - **react-hot-toast:** For Displaying the message


- **Backend:**
  - **Node.js:** JavaScript runtime for server-side operations.
  - **Express.js:** Web framework for Node.js.
  - **MongoDB:** NoSQL database for storing data.
  - **Supabase:** For user Authentication


## API Endpoints



## Challenges and Solutions

1. **Cross-Origin Resource Sharing (CORS):**
   - **Challenge:** Configuring CORS for both development and production environments.
   - **Solution:** Configured CORS settings to allow specific origins and handle cookies securely in production.

2. **State Management in React:**
   - **Challenge:** Managing complex state across components.
   - **Solution:** Used Redux for state management and implemented `redux-persist` to keep the authentication state across page reloads.

## Future Improvements

1. **Enhanced Security:**
   - Implement additional security measures such as rate limiting, IP whitelisting, and more robust input validation.

2. **User Profiles:**
   - Add functionality for users to manage and update their profiles.

3. **Unit and Integration Tests:**
   - Increase test coverage to ensure the reliability and stability of the application.



---

