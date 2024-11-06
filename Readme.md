# Backend API Documentation
[Live Demo](https://tech-backend-three.vercel.app/)

This is the backend of the application built with Express.js, TypeScript, Mongoose, and various validations for handling different routes and user actions.

## Project Setup

### Prerequisites

Make sure you have the following installed:
- Node.js (version 14.x or above)
- MongoDB (running locally or using a cloud database like MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bashputi/tech-tips-backend

Navigate to the project directory:

``` bash
cd your-project-name
```

Install dependencies:

``` bash
Copy code
npm install
```
Create a .env file in the root directory and set the required environment variables:

``` bash
PORT=use-yours
DB_URL=use-yoursw=majority&appName=Cluster0
BCRYPT_SALT_ROUND=10
ACCESS_TOKEN_SECRET=use-yours
ACCESS_REFRESH_SECRET=use-yours
NODE_ENV=use-yours
FRONTEND_URL=use-yours
EMAIL_USER=use-yours
EMAIL_PASS=use-yours
STORE_ID=use-yours
SIGNATURE_KEY=use-yours
PAYMENT_URL=use-yours
PAYMENT_TRANSACTION=use-yours
BACKEND_URL=use-yours
```

Run the development server:

```bash
npm start
```
Your API will be available at http://localhost:"your-port".

## Routes
- **Auth Routes (/auth)**
- POST /signup: Register a new user
- POST /signin: Sign in with existing credentials
- POST /forget_password: Request password reset
- POST /reset_password: Reset password using a token

Example Usage:
## Register a user:

```bash
1. POST /auth/signup
{
  "email": "user@example.com",
  "password": "password123"
}

2. User Routes (/user)
GET /: Get all users (Admin only)

GET /: Get a single user by userId
PATCH /: Update a user by userId
PATCH /user/follow/: userId
PATCH /follow/: Follow a user (Authenticated users only)
GET /follower/: Get a user's followers

```

Example Usage:
## Follow a user:
```bash
3. Post Routes (/post)
POST /create: Create a new post
GET /: Get all posts
GET /my-post: Get posts of the authenticated user (User/ Admin only)
GET /: Get a single post by postId
GET /category: Get posts by category
PATCH /update-post/: Update a post (User only)
DELETE /delete/: Delete a post (User only)
POST /comments/: Add a comment to a post (User/ Admin only)
PATCH /update-comments/: Update a comment (User/ Admin only)
DELETE /comment-delete/: Delete a comment (User/ Admin only)
PATCH /vote/: Upvote a post (User/ Admin only)
POST /payment/: Handle user payment
```

Example Usage:
## Create a post:

``` bash
POST /post/create
{
  "title": "Post Title",
  "content": "Post content goes here",
  "category": "Technology"
}
```

## Add a comment:

``` bash
POST /post/comments/:postId
{
  "comment": "This is a comment"
}

4. Payment Routes (/payment)
POST /payment/: Handle payments for a user
POST /confirmation: Confirm payment after user completes the transaction
``` 

Example Usage:
## Make a payment:

```bash
POST /payment/:userId
{
  "amount": 20
}
Payment confirmation:
```

## Middleware
- **Authentication Middleware (auth)**
Used in routes like PATCH /follow/:userId, POST /comments/:postId, POST /payment/:userId, and others that require authentication.

It verifies if the request is coming from an authenticated user, and checks if the user has the correct role (admin or user).

## Example Usage in a Route:
typescript
Copy code
UserRouter.patch("/follow/:userId", auth(user_role.user), UserCrontroller.follow);
Where user_role.user checks if the user is authenticated and has the correct role.

## Error Handling
All routes are equipped with error handling. If an error occurs, the API will return a proper error response with the status code and error message.

## License
- This project is licensed under the MIT License.

