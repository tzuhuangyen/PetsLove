import React from 'react';

const BlogIndexSidebar = () => {
  // Function to navigate to the appropriate search URL based on the category
  const fetchNewsByCategory = (category) => {
    const url = `https://www.dailypaws.com/search?q=${category.toLowerCase()}`;
    window.open(url, '_blank');
  };
  return (
    <>
      <div className='categoryGroup'>
        <p className='mb-1 fs-4'>Other articles</p>
        <ul className='d-flex flex-column flex-md-wrap w-100'>
          {['Cat', 'Dog', 'Puppy', 'Kitty', 'Treat'].map((category) => (
            <li className='categoryGroup-item mt-0' key={category}>
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
