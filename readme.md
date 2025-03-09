(PetsLove website)[[https://tzuhuangyen.github.io/PetsLove/](https://tzuhuangyen.github.io/PetsLove/)]

PetsLove is a web application built with React, Node.js, and Express that allows users to browse and purchase pet products online. It features user authentication, a shopping cart, and various alert notifications using the SweetAlert2 library.

## Features

User registration and login
Browse and search for pet products
Add products to the shopping cart
Checkout process (not implemented yet)
User profile management (update password, etc.)
Alert notifications for various actions (adding to cart, removing from cart, successful login/logout, etc.)

## Technologies Used

React
Node.js
Express
MongoDB (or another database)
Vite (build tool)
SweetAlert2 (for alert notifications)

## Installation

1. Clone the repository: git clone https://github.com/tzuhuangyen/PetsLove.git
2. Install dependencies for the server: cd server && npm install
3. Install dependencies for the client: cd ../client && npm install

## Configuration

1. Create a .env file in the server directory and add your environment variables (e.g., database connection string, port number).
2. Update the VITE_BACKEND_URL variable in the client/config.js file to point to your server's URL.

## Running the Application

1. Start the server: cd server && npm start
2. Start the client: cd ../client && npm run dev
3. Open your browser and navigate to http://localhost:3000 (or the appropriate URL based on your configuration).

## Building for Production

1. Build the client: cd client && npm run build
2. The production-ready files will be generated in the client/dist directory.

## Contributing

Contributions are welcome! Please follow the standard GitHub workflow:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Commit your changes
4. Push to your forked repository
5. Submit a pull request

## License

This project is licensed under the MIT License.
