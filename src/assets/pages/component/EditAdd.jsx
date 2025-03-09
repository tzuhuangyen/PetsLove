import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
const EditAdd = ({ isEditing, setIsEditing }) => {
  {
    /* 状态管理，编辑模式与非编辑模式切换 */
  }

  // 地址数据状态
  const [address, setAddress] = useState({
    name: 'John Doe',
    phone: '+36 702450319',
    address: 'main st 121',
    city: 'Budapest',
    zipCode: '1026',
    country: 'Hungary',
  });

  // 处理编辑按钮点击事件
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 处理表单提交事件
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false); // 提交后退出编辑模式
  };

  // 处理输入变化事件
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div>
      {isEditing ? (
        // 编辑模式：显示表单
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId='name'>
            <Form.Label>name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={address.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='phone'>
            <Form.Label>phone</Form.Label>
            <Form.Control
              type='text'
              name='phone'
              value={address.phone}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='address'>
            <Form.Label>address</Form.Label>
            <Form.Control
              type='text'
              name='address'
              value={address.address}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='city'>
            <Form.Label>city</Form.Label>
            <Form.Control
              type='text'
              name='city'
              value={address.city}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='zipCode'>
            <Form.Label>city</Form.Label>
            <Form.Control
              type='text'
              name='zipCode'
              value={address.zipCode}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='country'>
            <Form.Label>country</Form.Label>
            <Form.Control
              type='text'
              name='country'
              value={address.country}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='mt-2 '>
            Save
          </Button>
        </Form>
      ) : (
        // 展示模式：显示地址信息及编辑按钮
        <div className='address-info'>
          <p>{address.name}</p>
          <p>{address.phone}</p>
          <p>{address.address}</p>
          <p>{address.city}</p>
          <p>{address.country}</p>
          <p>{address.zipCode}</p>
          {/* <Button variant='link' className='edit-btn' onClick={handleEditClick}>
            editing
          </Button> */}
        </div>
      )}
    </div>
  );
};

export default EditAdd;
