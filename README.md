# Forum App

This app is built with **Node**, **Mongo** and **React**, using **Apollo GraphQL** to allow for efficient query handling between the frontend and the backend.

Here is how to run the application:

- Run the command **yarn** in the root folder to install the backend dependencies 
- Run the command **cd client/ && yarn** to install the frontend  dependencies 
- Run the command **yarn start** in the root folder to concurrently start both the backend and the frontend

Here is how to use the application:

- Click on the **Register** menu button to sign up
- Add a couple of posts by using the **Post Form** in the home page
- Delete one of the posts by using the **Delete Post** button
- Like one of the posts by using the **Like Post** button
- Click on one of the posts to enter the **Post Details** page
- Add a couple of comments to the post by using the **Commment Form** in the post details page
- Delete one of the comment by using the **Delete Comment** button
- Notice the **Likes Count** instantly changing every time a post is liked
- Notice the **Comments Count**  instantly changing every time a post is commented on
- Click on the **Logout** menu button to sign out
- Click on the **Login** menu button to sign in
- Notice the backend **Validation** when trying to register or login with invalid credentials