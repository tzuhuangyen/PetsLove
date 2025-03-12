import React from 'react';
import { GiDuck, GiChickenOven } from 'react-icons/gi';
import { LuBeef } from 'react-icons/lu';
//component filter component

export default function FilterCategory({ setProductTypes, initData }) {
  //handle filter by order type click
  const handleFilters = (type) => {
    if (initData && initData.length > 0) {
      let filteredTypes;

      if (type !== '') {
        filteredTypes = initData.filter(
          (productType) =>
            productType.order === type || productType.type === type
        );
        setProductTypes(filteredTypes.sort((a, b) => b.price - a.price));
      } else {
        // 如果类型为空，则重置为初始数据
        setProductTypes(initData); // 重置为所有商品
      }
    }
  };
  //handle sort by price
  const handleSortPrice = (sortOrder) => {
    console.log(`Selected sort order: ${sortOrder}`);

    let sortedProducts = [...initData]; // Check the selected sort order and sort the products accordingly
    if (sortOrder === 'asc') {
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOrder === 'desc') {
      sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    console.log(`Sorted Products: `, sortedProducts);

    // Update the productTypes state with the sorted products
    setProductTypes(sortedProducts);
  };

  return (
    <>
      <div className='filterbtns mb-4 '>
        <ul className='typeBtns categoryGroup mb-4'>
          <li
            className='categoryGroup-item'
            id='reset'
            onClick={() => handleFilters('')}
          >
            All products
          </li>
          <li
            className='categoryGroup-item'
            id='filter-preOrder'
            onClick={() => handleFilters('pre-order')}
          >
            pre-order
          </li>
          <li
            id='filter-inStock'
            className='categoryGroup-item '
            onClick={() => handleFilters('in-stock')}
          >
            in-stock
          </li>
          <li
            className='categoryGroup-item'
            id='filter-customized'
            onClick={() => handleFilters('customize')}
          >
            customize
          </li>
          <li
            className='categoryGroup-item'
            id='filter-chicken'
            onClick={() => handleFilters('Chicken')}
          >
            <GiChickenOven />
            chicken
          </li>
          <li
            className='categoryGroup-item'
            id='filter-beef'
            onClick={() => handleFilters('Beef')}
          >
            <LuBeef />
            beef
          </li>
          <li
            className='categoryGroup-item'
            id='filter-duck'
            onClick={() => handleFilters('Duck')}
          >
            <GiDuck />
            Duck
          </li>
        </ul>
        {/* Sort dropdown */}
        <div className=' sortBtn mb-4'>
          <label htmlFor='sortSelect'>Sort:</label>
          <select
            id='sortSelect'
            className='filterSelect'
            onChange={(e) => handleSortPrice(e.target.value)}
          >
            <option value=''>Select Sort Order</option>

            <option value='desc'>High to Low</option>
            <option value='asc'>Low to High</option>
          </select>
        </div>
      </div>
    </>
  );
}
