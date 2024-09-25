import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import footprint from '/images/footprint.png';
import article1 from '/images/article1.png';
import article2 from '/images/article2.png';
import article3 from '/images/article3.png';
import { Container, Row, Col, Card, Image, Nav, Button } from 'react-bootstrap';
import { newsApiKey } from '../../../../config';
import { mockNews } from '../../../../mockData';
function IndexBlog() {
  const [news, setNews] = useState([]);
  // NewsAPI 的基本 URL
  const NewsAPIBASE_URL = 'https://api.worldnewsapi.com';

  // 定義獲取新聞的函數
  useEffect(() => {
    // 替換為你的 NewsAPI API Key

    // 定義獲取新聞的函數
    async function fetchNews() {
      try {
        const catUrl = `${NewsAPIBASE_URL}/search-news?text=cat&language=en`;
        // const dogUrl = `${NewsAPIBASE_URL}?q=dog&apiKey=${newsApiKey}`;
        console.log('Cat URL:', catUrl);
        // console.log(dogUrl);
        // 同時發送兩個不同的請求
        // const [catResponse, dogResponse] = await Promise.all([
        //   axios.get(catUrl),
        //   axios.get(dogUrl),
        // ]);
        // 獲取貓的新聞
        const response = await axios.get(catUrl, {
          headers: {
            'x-api-key': newsApiKey,
            'Content-Type': 'application/json',
          },
        });

        console.log('API Key:', newsApiKey);
        console.log('Cat URL:', catUrl);

        const catNews = response.data.news;

        // 獲取每個請求的新聞數據
        // const catNews = catResponse.data.articles;
        // const dogNews = dogResponse.data.articles;

        // 組合貓和狗的新聞數據並設置到 state 中
        // setNews([...catNews.slice(0, 3), ...dogNews.slice(0, 3)]);
        // 將獲取的新聞數據設置到 state 中
        setNews(catNews.slice(0, 3)); // 只取前三條新聞

        console.log(catNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }

    // 執行獲取新聞的函數
    fetchNews();
  }, []); // 空依賴列表表示僅在組件首次渲染時執行

  return (
    <section className='indexBlog'>
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
    </section>
  );
}
export default IndexBlog;
