import React from 'react';
import footprint from '/images/footprint.png';
import type1 from '/images/type1.png';
import type2 from '/images/type2.png';
import type3 from '/images/type3.png';

function IndexType() {
  return (
    <div>
      {/* <!-- types --> */}
      <section className='types'>
        <div className='container'>
          <h2 className='text-center'>
            <span>
              <img src={footprint} alt='footprint' />
            </span>
            Snacks
            <span>
              <img src={footprint} alt='footprint' />
            </span>
          </h2>

          <div className='row d-flex justify-content-around flex-wrap'>
            {/* <!-- type1 pre-order --> */}
            <div className='col-lg-4 col-md-6 col-12 card me-2 mb-2 border-0 shadow'>
              <div className='position-relative'>
                <a href='#' className='d-block'>
                  <img src={type1} className='card-img-top' alt='pre-order' />
                  <div className='card-img-overlay'>
                    <h4 className='card-title'>Pre-order</h4>
                  </div>
                </a>
                <div className='card-body'>
                  <ul className='text-dark list-unstyled'>
                    <li className='mb-2'>
                      <img src={footprint} alt='' />
                      Production begins post-order.{' '}
                      <img src={footprint} alt='' />
                    </li>
                    <li className='mb-2'>
                      <img src={footprint} alt='' />
                      waiting time is apprx. 3 days
                      <img src={footprint} alt='' />
                    </li>
                    <li>
                      <img src={footprint} alt='' />
                      it can be stored for two weeks
                      <img src={footprint} alt='' />
                    </li>
                  </ul>
                  <button href='./product.html' className='btn '>
                    More Detail
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- type2 in stock --> */}
            <div className='col-lg-4 col-md-6 col-12 card me-2 mb-2 text-white shadow'>
              <div>
                <a href='#' className='d-block type-card-hover'>
                  <img src={type2} className='card-img-top ' alt='in-stock' />
                  <div className='card-img-overlay'>
                    <h4 className='card-title card-text'>In-stock</h4>
                  </div>
                </a>
              </div>
              <div className='card-body'>
                <ul className='text-dark list-unstyled'>
                  <li className='mb-2'>
                    <img src={footprint} alt='' />
                    Fresh ingredients every day
                    <img src={footprint} alt='' />
                  </li>
                  <li className='mb-2'>
                    <img src={footprint} alt='' />
                    Handmade Limited production
                    <img src={footprint} alt='' />
                  </li>
                  <li>
                    <img src={footprint} alt='' />
                    Same-day delivery available
                    <img src={footprint} alt='' />
                  </li>
                </ul>
                <a href='./product.html' className='btn'>
                  More Detail
                </a>
              </div>
            </div>
            {/* <!-- type3 customise --> */}
            <div className='col-lg-4 col-md-6 col-12 card shadow text-white'>
              <a href='#' className='d-block type-card-hover'>
                <img src={type3} className='card-img-top ' alt='...' />
                <div className='card-img-overlay'>
                  <h4 className='card-title card-text'>Custom snacks</h4>
                </div>
              </a>

              <div className='card-body'>
                <ul className='text-dark list-unstyled'>
                  <li className='mb-2'>
                    <img src={footprint} alt='' />
                    According to preferences <img src={footprint} alt='' />
                  </li>
                  <li className='mb-2'>
                    <img src={footprint} alt='' />
                    Birthday celebration
                    <img src={footprint} alt='' />
                  </li>
                  <li>
                    <img src={footprint} alt='' />
                    Customized service
                    <img src={footprint} alt='' />
                  </li>
                </ul>
                <a href='./product.html' className='btn'>
                  More Detail
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- -------end of types------- --> */}
    </div>
  );
}

export default IndexType;
