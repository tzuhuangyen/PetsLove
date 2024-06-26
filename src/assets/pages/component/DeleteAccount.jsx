import React from 'react';

const DeleteAccount = (props) => {
  const handleApplyDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        'http://localhost:8080/users/delete',
        config
      );
      console.log(response.data);
      alert('Your account has been deleted.');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  return (
    <div>
      {' '}
      <section className=' mb-5'>
        <div className='p-4' style={{ backgroundColor: '#faf0fd' }}>
          <h3 className='pt-4 mb-3'>Delete account</h3>

          <div className='mb-2'>
            {' '}
            NOTE: Account will NOT BE RECOVERABLE once deleted.
          </div>
          <button onClick={handleApplyDeleteAccount}>
            Apply to Delete My Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default DeleteAccount;
