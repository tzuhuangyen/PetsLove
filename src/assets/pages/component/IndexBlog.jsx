import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import footprint from '/images/footprint.png';
import article1 from '/images/article1.png';
import article2 from '/images/article2.png';
import article3 from '/images/article3.png';
import { Container, Row, Col, Card, Image, Nav, Button } from 'react-bootstrap';

function IndexBlog() {
  const [news, setNews] = useState([]);

  // 定義獲取新聞的函數
  useEffect(() => {
    // 替換為你的 NewsAPI API Key
    const API_KEY = 'fc8d3ea8a138460188f4a03db447a8f3';
    // NewsAPI 的基本 URL
    const BASE_URL = 'https://newsapi.org/v2/everything';

    // 定義獲取新聞的函數
    async function fetchNews(query) {
      try {
        // 同時發送兩個不同的請求
        const [catResponse, dogResponse] = await Promise.all([
          axios.get(
            `${BASE_URL}?q=cat&from=2020-05-19&sortBy=popularity&apiKey=${API_KEY}`
          ),
          axios.get(
            `${BASE_URL}?q=dog&from=2020-05-19&sortBy=popularity&apiKey=${API_KEY}`
          ),
        ]);

        // 獲取每個請求的新聞數據
        const catNews = catResponse.data.articles;
        const dogNews = dogResponse.data.articles;

        // 組合貓和狗的新聞數據並設置到 state 中
        console.log(news);
        setNews([...catNews.slice(0, 3), ...dogNews.slice(0, 3)]);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }

    // 執行獲取新聞的函數
    fetchNews();
  }, []); // 空依賴列表表示僅在組件首次渲染時執行

  return (
    <div className='indexBlog'>
      {/* {news.map((articles, index) => (
        <div key={index} className='card type-card-hover'>
          <img
            src={articles.urlToImage}
            className='card-img-top'
            alt={`articles${index}`}
          />
          <div className='card-body'>
            <span className='card-text text-muted'>{articles.publishedAt}</span>
            <span className='card-text text-muted'>{articles.author}</span>
            <h5 className='card-title'>{articles.title}</h5>
            <p className='card-text'>{articles.description}</p>
            <p className='card-text'>
              <small className='text-muted'>{articles.source.name}</small>
            </p>
          </div>
        </div>
      ))} */}
      {/* <!-- -------mobile of knowPets start ------- --> */}
      <section className='knowPets mt-8 d-md-none'>
        <div className='container'>
          <h2 className='text-center pt-5 '>
            <span>
              <img src={footprint} alt='footprint' />
            </span>
            News
            <span>
              <img src={footprint} alt='footprint' />
            </span>
          </h2>

          <div className='card type-card-hover'>
            <img src={article1} className='card-img-top' alt='article1' />
            <div className='card-body'>
              <span className='card-text text-muted'> 2022-08-21 </span>
              <h5 className='card-title'>
                謠言破解！
                <br />
                毛孩其實可以吃豬肉！
              </h5>

              <p className='card-text'>
                <small className='text-muted'>#健康 #謠言破解</small>
              </p>
            </div>
          </div>
          <div className='card type-card-hover'>
            <img src={article2} className='card-img-top' alt='article2' />
            <div className='card-body'>
              <span className='card-text text-muted'> 2023-09-12 </span>
              <h5 className='card-title'>
                謠言破解！
                <br />
                毛孩其實可以吃豬肉！
              </h5>

              <p className='card-text'>
                <small className='text-muted'>#健康 #謠言破解</small>
              </p>
            </div>
          </div>
          <div className='card type-card-hover'>
            <img src={article3} className='card-img-top' alt='article3' />
            <div className='card-body'>
              <span className='card-text text-muted'> 2023-09-21 </span>
              <h5 className='card-title'>
                謠言破解！
                <br />
                毛孩其實可以吃豬肉！
              </h5>

              <p className='card-text'>
                <small className='text-muted'>#健康 #謠言破解</small>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end mobile of know pets --> */}

      {/* <!-- start lg of know pets --> */}
      <section className='indexBlog-lg mt-4 d-none d-md-block pb-md-8'>
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
              <div className='col-md-4'>
                <img src={article1} alt='article1' />
              </div>
              <div className='col-md-8'>
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
                    to='/blog/blogDetail'
                  >
                    <Button className='readMoreBtn p-2'> Read More</Button>
                  </Nav.Link>
                </div>
              </div>
            </div>
          </div>
          <div className='card shadow-sm p-3 mb-5 bg-body rounded'>
            <div className='row'>
              <div className='col-md-4'>
                <img src={article2} alt='article2' />
              </div>
              <div className='col-md-8'>
                <div className='card-body'>
                  <span className='card-text text-muted'>
                    {' '}
                    Darren BrownbillDec 04, 2023
                  </span>
                  <h5 className='card-title'>
                    4 things to look out for when shopping for dog treats
                  </h5>

                  <p className='card-text'>
                    <small className='text-muted'>#treats </small>
                  </p>
                  <p className='card-text'>
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
                    to='/blog/blogDetail'
                  >
                    <Button className='readMoreBtn p-2'> Read More</Button>
                  </Nav.Link>
                </div>
              </div>
            </div>
          </div>
          <div className='card shadow-sm p-3 mb-5 bg-body rounded'>
            <div className='row'>
              <div className='col-md-4'>
                <img src={article3} alt='article3' />
              </div>
              <div className='col-md-8'>
                <div className='card-body'>
                  <span className='card-text text-muted'>
                    {' '}
                    Darren Brownbill Nov 10, 2023
                  </span>
                  <h5 className='card-title'>
                    3 easy ways to have a pet-friendly Christmas
                  </h5>

                  <p className='card-text'>
                    <small className='text-muted'>#Halloween </small>
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
                    to='/blog/blogDetail'
                  >
                    <Button className='readMoreBtn p-2'> Read More</Button>
                  </Nav.Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end lg of know pets --> */}
    </div>
  );
}

export default IndexBlog;
