import React from 'react';

const BlogIndexSidebar = () => {
  return (
    <>
      <div className='categoryGroup'>
        <h4>other articles</h4>
        <ul>
          {['Health', 'Pets Treats', 'vet', 'Toys'].map((category) => (
            <li className='categoryGroup-item' key={category}>
              <a href='#' onClick={() => fetchNewsByCategory(category)}>
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BlogIndexSidebar;
