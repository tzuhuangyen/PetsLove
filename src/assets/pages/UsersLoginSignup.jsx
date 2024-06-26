import React from 'react';
// import Login from './Login';
import SignUp from './SignUp';
// import Member from './Member';
function UsersLoginSignup() {
  return (
    <div>
      <div
        className='container-fluid'
        style={{ height: '100vh', backgroundColor: '#faf0fd' }}
      >
        <h2 className='text-center mt-5 pt-5'>Users</h2>
        <SignUp />
        <div className='row'>
          <div className='col-lg-6'></div>
          <div className='col-lg-6'>
            <SignUp />
          </div>
        </div>
      </div>
      {/* <Member /> */}
    </div>
  );
}

export default UsersLoginSignup;
