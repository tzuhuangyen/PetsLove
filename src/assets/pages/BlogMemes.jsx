import React, { useState } from 'react';
import axios from 'axios';

import { memesApiKey } from '../../../config';
import {
  Col,
  Row,
  Container,
  Form,
  InputGroup,
  Card,
  Button,
} from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const BlogMemes = () => {
  const [memes, setMemes] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1); // State for the current page
  const [hasMore, setHasMore] = useState(true); // To control whether there are more memes to load
  const memesAPIBASE_URL = 'https://api.humorapi.com';
  // Fetch memes based on keyword
  const fetchMemesByKeyword = async (event, pageNumber = 1) => {
    if (event) {
      event.preventDefault();
    }
    try {
      const url = `${memesAPIBASE_URL}/memes/search?number=3&keywords=${keyword}&include-tags=animal`;

      const response = await axios.get(url, {
        headers: {
          'x-api-key': memesApiKey,
          'Content-Type': 'application/json',
        },
      });
      const articles = response.data.memes.slice(0, 3);
      console.log('memes:', articles);
      setMemes(articles);
      setHasMore(articles.length > 0);
    } catch (error) {
      console.error('Error fetching memes:', error);
    }
  };

  // Function to load next page of memes

  return (
    <>
      {' '}
      <Container>
        <h3>memes of animals</h3>
        <Form
          onSubmit={(e) => fetchMemesByKeyword(e, 1)}
          className=' d-flex w-100 align-items-center justify-content-center'
        >
          <InputGroup className='mb-3 mt-3'>
            <InputGroup.Text id='inputGroup-sizing-default'>
              Search animal memes by keyword
            </InputGroup.Text>
            <Form.Control
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className='flex-grow-1'
            />
          </InputGroup>
          <Button
            type='submit'
            className='p-2 d-flex align-items-center justify-content-center'
            style={{ width: '40px', height: '40px' }}
          >
            {' '}
            <FaSearch />
          </Button>
        </Form>

        <Row>
          {memes.map((meme) => (
            <Col xs={12} md={6} key={meme.id} className='mb-4'>
              <Card className='w-100'>
                <Card.Img
                  variant='top'
                  src={meme.url}
                  alt='memes'
                  className='rounded'
                />
                <Card.Body>
                  <Card.Text>{meme.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default BlogMemes;
