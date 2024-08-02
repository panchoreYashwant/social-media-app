# Social Media Application

This is a simple social media application where users can create posts, like/dislike posts, and follow/unfollow other users. The application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Ant Design for the frontend UI.

## Features

- User registration and login with JWT authentication
- Create, read, like, and dislike posts
- Follow and unfollow users
- Display a feed of posts with like and follow statuses
- Simple and user-friendly UI

## Technologies Used

- **Frontend:**
  - React.js
  - Ant Design
  - Axios
  - Session storage
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT (JSON Web Tokens)
- **Others:**
  - Nodemon for development

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/social-media-app.git
    cd social-media-app
    ```

2. **Install dependencies for both frontend and backend:**

    ```bash
    # Navigate to the backend directory and install dependencies
    cd backend
    npm install
    
    # Navigate to the frontend directory and install dependencies
    cd ../frontend
    npm install
    ```

3. **Set up environment variables:**
    ```
    I used direct in file.
    MONGODB_URI=mongodb://localhost:27017/social_media
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

4. **Start the development server:**

    ```bash
    # Start the backend server
    cd backend
    npm run dev
    
    # Start the frontend server in a separate terminal
    cd ../frontend
    npm start
    ```


## How to Use

1. **Register and Login:**
   - Navigate to the `/register` page to create a new account.
   - Navigate to the `/login` page to log in with an existing account.

2. **Create and View Posts:**
   - After logging in, you will be redirected to the homepage where you can create new posts and view the feed of posts.
   - You can like/dislike posts and follow/unfollow users directly from the feed.

3. **View User Profiles:**
   - Top right corn.
4. **Multiple User**
   Open http://localhost:3000/ in multiple tabs of your browser, or in incognito mode. Create a new account in each tab, then you can create multiple posts, like and follow other users, and see their posts.


## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgements

- [Ant Design](https://ant.design/)
- [Express.js](https://expressjs.com/)
- [React.js](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)

