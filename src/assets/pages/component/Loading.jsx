import React from 'react';

function Loading({ isLoading }) {
  return (
    <div>
      {' '}
      <div className='loading' style={{ display: isLoading ? 'flex' : 'none' }}>
        <div className='d-flex justify-content-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
