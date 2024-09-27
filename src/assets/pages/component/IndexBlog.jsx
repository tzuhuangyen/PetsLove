import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import footprint from '/images/footprint.png';
import article1 from '/images/article1.png';
import blog1 from '/images/blog1.jpg';
import blog2 from '/images/blog2.jpg';
import blog3 from '/images/blog3.jpg';
import article3 from '/images/article3.png';
import { Container, Row, Col, Card, Image, Nav, Button } from 'react-bootstrap';
import { newsApiKey } from '../../../../config';

function IndexBlog() {
  const [news, setNews] = useState([]);
  // NewsAPI 的基本 URL
  const NewsAPIBASE_URL = 'https://api.worldnewsapi.com';

  // 定義獲取新聞的函數
  // useEffect(() => {
  //   // 替換為你的 NewsAPI API Key

  //   // 定義獲取新聞的函數
  //   async function fetchNews() {
  //     try {
  //       const catUrl = `${NewsAPIBASE_URL}/search-news?text=cat&language=en`;
  //       // const dogUrl = `${NewsAPIBASE_URL}?q=dog&apiKey=${newsApiKey}`;
  //       console.log('Cat URL:', catUrl);
  //       // console.log(dogUrl);
  //       // 同時發送兩個不同的請求
  //       // const [catResponse, dogResponse] = await Promise.all([
  //       //   axios.get(catUrl),
  //       //   axios.get(dogUrl),
  //       // ]);
  //       // 獲取貓的新聞
  //       const response = await axios.get(catUrl, {
  //         headers: {
  //           'x-api-key': newsApiKey,
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       console.log('API Key:', newsApiKey);
  //       console.log('Cat URL:', catUrl);

  //       const catNews = response.data.news;

  //       // 獲取每個請求的新聞數據
  //       // const catNews = catResponse.data.articles;
  //       // const dogNews = dogResponse.data.articles;

  //       // 組合貓和狗的新聞數據並設置到 state 中
  //       // setNews([...catNews.slice(0, 3), ...dogNews.slice(0, 3)]);
  //       // 將獲取的新聞數據設置到 state 中
  //       setNews(catNews.slice(0, 3)); // 只取前三條新聞

  //       console.log(catNews);
  //     } catch (error) {
  //       console.error('Error fetching news:', error);
  //     }
  //   }

  //   // 執行獲取新聞的函數
  //   fetchNews();
  // }, []); // 空依賴列表表示僅在組件首次渲染時執行

  return (
    <>
      {/* <section className='indexBlog'>
        <div className='container pb-4'>
          <h2 className='text-center pt-md-8'>
            <span>
              <img src={footprint} alt='footprint' />
            </span>
            Some helpful tips
            <span>
              <img src={footprint} alt='footprint' />
            </span>
          </h2>

          {news.length > 0 ? (
            news.map((item, id) => (
              <div className='card' key={id}>
                <div className='row d-flex flex-column flex-md-row'>
                  <div className='col-md-4 col-12'>
                    <img
                      src={item.image || 'placeholder-image-url'}
                      className='card-img-top'
                      alt={item.title ? `articles${item.title}` : 'news-image'}
                    />{' '}
                  </div>
                  <div className='col-md-8 col-12'>
                    <div className='card-body'>
                      <span className='card-text text-muted'>
                        {item.publish_date || 'Unknown date'}
                      </span>
                      <h4 className='card-title'>
                        {item.title || 'No title available'}
                      </h4>
                      <p className='card-text'>
                        {item.summary || 'No summary available'}
                      </p>
                      <p className='card-text'>
                        <p className='lh-sm'>
                          {item.text
                            ? item.text.slice(0, 170) + '...'
                            : 'No content available'}
                        </p>
                        <br />
                        <p className='text-muted'>
                          {item.author || 'Unknown date'}-{' '}
                          {item.source_country || 'Unknown country'}
                        </p>{' '}
                      </p>{' '}
                      <Nav.Link
                        className='text-end mt-2'
                        href={item.url || '#'}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Button className='readMoreBtn text-end p-2'>
                          {' '}
                          Read More{' '}
                        </Button>
                      </Nav.Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No news available</p>
          )}
        </div>
      </section> */}
      <section className='indexBlog mt-4  d-md-block pb-md-8'>
        <div className='container pb-4'>
          <h2 className='text-center pt-md-8'>
            <span>
              <img src={footprint} alt='footprint' />
            </span>
            Some helpful tips
            <span>
              <img src={footprint} alt='footprint' />
            </span>
          </h2>
          <div className='card shadow-sm p-3 mb-5 bg-body rounded'>
            <div className='row'>
              <div className='col-md-4 col-12'>
                <img src={blog1} className='img-fluid' alt='blog1' />
              </div>
              <div className='col-md-8 col-12'>
                <div className='card-body'>
                  <span className='card-text text-muted'>
                    Darren BrownbillFeb 05, 2024
                  </span>
                  <h5 className='card-title'>
                    Top 5 benefits of indestructible dog toys
                  </h5>

                  <p className='card-text mb-1'>
                    <small className='text-muted'>#dogs #toys</small>
                  </p>
                  <p className='card-text lh-sm'>
                    Whether your pup chews through their toys out of boredom, or
                    they’re simply just an aggressive chewer, you’re likely
                    getting tired of having to replace their toys so often. If
                    you’ve tried everything to curb your canine's destructive
                    habits …
                  </p>

                  <Nav.Link
                    className='text-end mt-2'
                    eventKey={2}
                    as={Link}
                    to='/blog/articles/article1'
                  >
                    <Button className='readMoreBtn p-2'> Read More</Button>
                  </Nav.Link>
                </div>
              </div>
            </div>
          </div>
          <div className='card shadow-sm p-3 mb-5 bg-body rounded'>
            <div className='row'>
              <div className='col-md-4  col-12'>
                <img src={blog2} className='img-fluid' alt='blog2' />
              </div>
              <div className='col-md-8  col-12'>
                <div className='card-body'>
                  <span className='card-text text-muted'>
                    {' '}
                    Darren Brownbill-Dec 04, 2023
                  </span>
                  <h5 className='card-title'>
                    4 things to look out for when shopping for dog treats
                  </h5>

                  <p className='card-text'>
                    <small className='text-muted'>#treats </small>
                  </p>
                  <p className='card-text lh-sm'>
                    If you’re a dog owner, then you’ll know that having a
                    plentiful supply of treats is essential. Whether you use
                    them for reward-based training, or simply as a snack to tide
                    your dog over from breakfast to dinner, it’s important to
                    make sure that you’re always stocked up.
                  </p>
                  <Nav.Link
                    className='text-end mt-2'
                    eventKey={2}
                    as={Link}
                    to='/blog/articles/article2'
                  >
                    <Button className='readMoreBtn p-2'> Read More</Button>
                  </Nav.Link>
                </div>
              </div>
            </div>
          </div>
          <div className='card shadow-sm p-3 mb-5 bg-body rounded'>
            <div className='row'>
              <div className='col-md-4  col-12'>
                <img src={blog3} className='img-fluid' alt='article3' />
              </div>
              <div className='col-md-8  col-12'>
                <div className='card-body'>
                  <span className='card-text text-muted'>
                    {' '}
                    Darren Brownbill Nov 10, 2023
                  </span>
                  <h5 className='card-title'>
                    3 easy ways to have a pet-friendly Christmas
                  </h5>

                  <p className='card-text'>
                    <small className='text-muted'>
                      {' '}
                      #Christmas #pet-friendly{' '}
                    </small>
                  </p>
                  <p className='card-text'>
                    With Halloween and Bonfire night done and dusted, it’s time
                    to start thinking about Christmas. Whether you’re a
                    Christmas fanatic or the C-word is banned in your home until
                    – at least – the 1st of December, it definitely doesn’t hurt
                    to start thinking about your plans.{' '}
                  </p>

                  <Nav.Link
                    className='text-end mt-2'
                    eventKey={2}
                    as={Link}
                    to='/blog/articles/article3'
                  >
                    <Button className='readMoreBtn p-2'> Read More</Button>
                  </Nav.Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default IndexBlog;
