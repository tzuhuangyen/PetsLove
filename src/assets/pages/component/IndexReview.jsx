import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// import '../../../node_modules/swiper/swiper-bundle.min.css';
import footprint from '/images/footprint.png';
import reviewers from '../../../../public/db.json';
function IndexReview({ reviewer }) {
  return (
    <>
      <section className='review mb-4 mb-md-5'>
        <div className='container position-relative'>
          <h2 className='text-center mb-4 mt-md-8'>
            <span>
              <img src={footprint} alt='before' />
            </span>
            Review
            <span>
              <img src={footprint} alt='' />{' '}
            </span>
          </h2>
          {/* <!-- 輪播set --> */}
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide changed')}
            onSwiper={(swiper) => console.log(swiper)}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            // navigation={{
            //   prevEl: '.swiper-button-prev',
            //   nextEl: '.swiper-button-next',
            // }}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            effect='fade'
            className='swiper reviewSwiper'
          >
            {reviewers.map((reviewer) => (
              <SwiperSlide key={reviewer.id} className='swiper-slide'>
                <div className='row d-flex'>
                  {/* <!-- 評價 --> */}
                  <div className='col-12 col-md-6 d-flex flex-column p-0'>
                    <div className='card mt-7 mb-1 mx-3 mx-md-0 my-md-0 py-md-4 ps-md-8'>
                      <div className='card-body review-cardBody'>
                        {/* <!-- 頭像 --> */}
                        <img
                          src={reviewer.img_url}
                          className='text-center reviewPetPic'
                          alt={reviewer.name}
                        />
                        <h5 className='card-title fs-5 mb-0'>
                          {reviewer.name} {reviewer.age} yo
                        </h5>
                        <div className='ratings mb-md-3'>
                          <div className='empty_star'>★★★★★</div>
                          <div className='full_star'>★★★★★</div>
                        </div>

                        <p className='card-text'>{reviewer.review}</p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- -product info --> */}
                  <div className='col-12 col-md-6 d-flex flex-column p-0 mb-6'>
                    <div className='card pe-md-8 mt-2 text-center'>
                      <a href='#' className='review-card-hover'>
                        <img
                          src={reviewer.productImg}
                          className='card-img-top reviewFoodPic'
                          alt='productImg'
                        />
                      </a>

                      <div className='card-body'>
                        <h5 className='card-title m-0'>
                          {reviewer.productName}
                        </h5>
                        <div className='w-100 text-center'></div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <!-- swiper-control左右按鈕和 pagination --> */}
          <div className='swiper-control'>
            {/* <span className='swiper-button-prev  me-4'></span> */}
            <div className='swiper-pagination swiper-pagination-bullets gap-2'></div>
            {/* <span className='swiper-button-next  ms-4'></span> */}
          </div>
        </div>
      </section>

      {/* <!-- -------end phone of review------- --> */}
    </>
  );
}

export default IndexReview;
