import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import debounce from 'lodash.debounce';

//component search box component
export default function SearchBox({ initData, setProductTypes }) {
  //search
  const [text, setText] = useState('');
  const inputRef = useRef(null); // Create a ref for the input element

  // search handler
  const handleInputChange = (event) => {
    setText(event.target.value);
  };
  // Perform the search based on the current text
  const performSearch = useCallback(() => {
    if (text.length >= 2) {
      const searchProducts = initData.filter(
        (product) =>
          product.productName.toLowerCase().includes(text.toLowerCase()) ||
          product.type.toLowerCase().includes(text.toLowerCase())
      );
      setProductTypes(searchProducts);
    }
  }, [text, initData, setProductTypes]);

  // Click handler for the search button
  const handleSearchClick = () => {
    performSearch();
    setText(''); // Clear the search input
  };

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce(() => {
      performSearch();
    }, 300),
    [performSearch]
  );

  // useEffect to handle debounced search
  useEffect(() => {
    debouncedSearch();
    // Clean up debounce when component is unmounted or text changes
    return () => debouncedSearch.cancel();
  }, [text, debouncedSearch]);

  // useEffect hook to maintain input focus
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <form className='mb-3 searchForm d-flex'>
        <label htmlFor='search' className='visually-hidden'></label>
        <input
          ref={inputRef} // Attach the ref to the input element
          id='search'
          type='search'
          className='form-control'
          value={text}
          onChange={handleInputChange}
          placeholder='Search for products'
        />
        <button className='searchBtn' type='button' onClick={handleSearchClick}>
          <FaSearch />
        </button>
      </form>
    </>
  );
}
