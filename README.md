# ArtSphere - Full-Stack Forum Application

**Author:** Aimee Elizondo

## Live Application Links
- **Frontend (Vercel):** https://forum-app-two-omega.vercel.app/
- **Backend API (Render):** https://forum-app-sbln.onrender.com/

*(Note: The backend is hosted on Render's free tier, which goes to sleep after 15 minutes of inactivity. The first request may take 30-50 seconds to wake the server.)*

## Overview
ArtSphere is a full-stack Single Page Application (SPA) built using a 3-tier architecture. It allows users to register, log in, and access a forum dashboard organized by art categories (Painting, Digital Art, Sculpture, Photography). The application features secure user authentication using JSON Web Tokens (JWT) and securely hashed passwords.

## Technologies Used
**Frontend (Presentation Layer)**
- React
- React Router (for SPA navigation)
- Axios (for HTTP requests)
- Custom CSS3 (Flexbox, responsive design)

**Backend (Application Layer)**
- Node.js
- Express.js
- JSON Web Token (JWT) for authentication
- bcryptjs for password hashing
- CORS

**Database (Data Layer)**
- MongoDB Atlas (Cloud Database)
- Mongoose (ODM)

**Deployment**
- Frontend: Vercel
- Backend: Render

## How to Use
1. Navigate to the live frontend URL.
2. Click "Register" to create a new account. Passwords must be at least 8 characters long and contain a number.
3. Once registered, log in with your credentials.
4. You will be directed to the Dashboard, where you can view the forum categories on the left sidebar.

## Ideas for Future Improvement
1. **Add a "Create Question" Form:** The current dashboard displays categories, but lacks a form for users to actually post new questions to the database.
2. **Category Filtering:** Currently, clicking a category shows an empty state. This could be upgraded to fetch and display specific questions matching the chosen category from the backend API.
3. **User Profiles & Avatars:** Add a settings page where users can upload an avatar and write a short bio.
4. **Rich Text Editor:** Allow users to format their questions and answers using bold, italics, and code blocks.

## Local Installation Instructions
To run this project locally:
1. Clone the repository: `git clone https://github.com/LoremIpsumIamyourFather/forum-app.git`
2. **Backend Setup:**
   - Navigate to the `server` folder: `cd server`
   - Install dependencies: `npm install`
   - Create a `.env` file with `MONGO_URI` and `JWT_SECRET`
   - Start the server: `node server.js`
3. **Frontend Setup:**
   - Open a new terminal and navigate to the `client` folder: `cd client`
   - Install dependencies: `npm install`
   - Start the React app: `npm start`