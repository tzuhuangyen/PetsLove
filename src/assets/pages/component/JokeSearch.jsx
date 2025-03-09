import React, { useState } from 'react';
import { Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { PiFishLight } from 'react-icons/pi';
import { MdPets } from 'react-icons/md';
import axios from 'axios';
import { jokesApiKey } from '../../../../config';

const JokeSearch = ({ setJokes }) => {
  const [keyword, setKeyword] = useState('');
  const [localJokes, setLocalJokes] = useState([]);
  const [fetchJokes, setFetchJokes] = useState([]);
  const jokesAPIBASE_URL = 'https://api.humorapi.com';

  // Fetch jokes based on keyword
  const fetchJokesByKeyword = async (event) => {
    event.preventDefault();
    try {
      const url = `${jokesAPIBASE_URL}/jokes/search?number=3&keywords=${keyword}&include-tags=animal`;

      const response = await axios.get(url, {
        headers: {
          'x-api-key': jokesApiKey,
          'Content-Type': 'application/json',
        },
      });
      const fetchedJokes = response.data.jokes;
      console.log('Jokes:', fetchedJokes);
      setFetchJokes(fetchedJokes);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  };

  return (
    <>
      {/* fetch search jokes */}
      <div>
        <Form
          onSubmit={fetchJokesByKeyword}
          className=' d-flex align-items-center justify-content-center'
        >
          <Row className='w-100'>
            <Col
              xs={12}
              md={10}
              className='d-flex justify-content-center align-items-center'
            >
              <InputGroup className='mb-3 mt-3'>
                <InputGroup.Text id='inputGroup-sizing-default'>
                  Search animal jokes by keyword
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
              >
                {' '}
                <FaSearch />
              </Button>
            </Col>
          </Row>
        </Form>
        {/* api jokes display */}
        <h3 className='mb-2'>Result of Related Jokes</h3>

        {fetchJokes.length > 0 ? (
          fetchJokes.map((item, index) => (
            <ul key={item.id} className='lh-base'>
              <PiFishLight />

              <li className='mb-2'>{item.joke}</li>
              <MdPets />
            </ul>
          ))
        ) : (
          <p>Not laugh today yet? search jokes now </p>
        )}
      </div>
    </>
  );
};

export default JokeSearch;
