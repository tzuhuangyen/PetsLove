// swal.js
import Swal from 'sweetalert2';

const BASE_URL = '/PetsLove';

//Shop.jsx
export const showAddToCartAlert = (productName) => {
  Swal.fire({
    position: 'top-end',
    title: 'Success!',
    text: `${productName} has been added to your cart.`,
    icon: 'success',
    showConfirmButton: false,
    timer: 1000,
  });
};
// Alert for removing a product from the cart
export const showRemoveFromCartAlert = (productName) => {
  Swal.fire({
    title: 'Removed!',
    text: `${productName} has been removed from your cart.`,
    icon: 'warning',
    confirmButtonText: 'OK',
  });
};
// Confirmation alert before an important action
export const showConfirmationAlert = (actionDescription, actionCallback) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to proceed with ${actionDescription}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      actionCallback();
    }
  });
};

//signup
export const showSignUpAlert = (username) => {
  Swal.fire({
    title: 'Congratulations!Registration Successful',
    text: `Welcome ${username} Your account has been created successfully.`,
    icon: 'success',
    confirmButtonText: 'OK',
  });
};

export const showSignUpErrorAlert = (username) => {
  Swal.fire({
    title: 'Username already exists',
    text: "Let's go to Login",
    icon: 'info',
    html: `
    <a href="${BASE_URL}/users/login" style="color:white; text-decoration:none; display:inline-block; padding:10px 20px; background-color:#3085d6; border-radius:5px;">Login</a>
  `,

    footer: `
    
    <a href="${BASE_URL}/users/forgotPsw">click here if you forgot password</a>
  `,
    showConfirmButton: false, // Hide the default confirm button
  });
};

//login
export const showLoginAlert = () => {
  Swal.fire({
    position: 'center',
    title: 'User logged in successfully',
    text: `Welcome Back!`,
    icon: 'success',
    showConfirmButton: false,
    timer: 3000,
  });
};
//showLoginErrorAlert: Invalid password
export const showLoginErrorAlert = (username) => {
  Swal.fire({
    position: 'center',
    title: 'Invalid password',
    text: `try again?`,
    icon: 'error',
    html: `
    <a href=/users/login style="color:white; text-decoration:none; display:inline-block; padding:10px 20px; background-color:#3085d6; border-radius:5px;">Login again</a>
  `,

    footer: `
    
    <a href=PetsLove/users/users/forgotPsw">click here if you forgot password</a>
  `,
    showConfirmButton: false, // Hide the default confirm button
  });
};
//showLoginErrorAlert":Username not found
export const showLoginUsernameErrorAlert = (username) => {
  Swal.fire({
    position: 'center',
    title: 'Username not found',

    icon: 'error',
    html: `
    <a href=PetsLove/users/signup" style="color:white; text-decoration:none; display:inline-block; padding:10px 20px; background-color:#3085d6; border-radius:5px;">Login again</a>
  `,

    footer: `
    
    <a href=PetsLove/users/signup">click here to sign up</a>
  `,
    showConfirmButton: false, // Hide the default confirm button
  });
};
//logout
export const showLogoutAlert = () => {
  Swal.fire({
    position: 'center',
    title: 'User logged out successfully',
    text: `See you soon!`,
    icon: 'success',
    showConfirmButton: false,
    timer: 3000,
  });
};

//updatePsw
export const showUpdatePswAlert = () => {
  // On success:
  Swal.fire({
    title: 'Success!',
    text: 'Your password has been updated.',
    icon: 'success',
    confirmButtonText: 'OK',
  });
};

export const showUpdatePswErrorAlert = () => {
  // On success:
  Swal.fire({
    title: 'Error!',
    text: 'Your password has not been updated.',
    icon: 'error',
    confirmButtonText: 'OK',
  });
};
