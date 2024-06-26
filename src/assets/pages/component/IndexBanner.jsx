import React from 'react';
import footprintImg from '/images/footprint.png'; // 使用相对路径引入图片
import bannerDog from '/images/bannerDog.png';
import bannerDogFrameOrange from '/images/bannerDogFrameOrange.png';
import bannerDogFrame from '/images/bannerDogFrame.png';
import bannerCatFame from '/images/bannerCatFame.png';
import bannercat from '/images/bannercat.png';
function Banner() {
  return (
    <div>
      {' '}
      <section className='banner container-fluid '>
        <div className='container position-relative'>
          {/* <!-- slogan --> */}
          <div className='slogan d-none d-md-block'>
            <div>
              <p className='animate__animated animate__slideInRight animate__slower'>
                100% nature・No preservatives
              </p>
              <h2>Homemade</h2>
              <span> Limited Quantity</span>

              <span>
                <img src={footprintImg} alt='footprint' />
                The Best choose
              </span>
            </div>
            {/* <!-- big foot print --> */}
            <div className='d-sm-none d-lg-block'>
              <span className='footprintBig footprintBig1 position-absolute'>
                <img src={footprintImg} alt='footprint' />
              </span>
              <span className='footprintBig footprintBig2 position-absolute'>
                <img src={footprintImg} alt='footprint' />
              </span>
            </div>
          </div>

          {/* <!-- dog picture --> */}
          <div>
            <img
              className='bannerDogFrameOrange position-absolute'
              src={bannerDogFrameOrange}
              alt=''
            />
            <img
              className='bannerDog position-absolute'
              src={bannerDog}
              alt='bannerDog'
            />
            <img
              className='bannerDogWhiteFrame position-absolute'
              src={bannerDogFrame}
              alt=''
            />
          </div>
          {/* <!-- cat picture --> */}
          <div>
            <img
              className='bannerCatFrame position-absolute'
              src={bannerCatFame}
              alt='bannerCatFrame'
            />
            <img
              className='bannerCat position-absolute'
              src={bannercat}
              alt='bannercat'
            />
          </div>
          {/* <!-- footprint --> */}
          <div>
            <span>
              <img
                className='footprint footprint1 d-md-none position-absolute'
                src={footprintImg}
                alt='footprint'
              />
            </span>
            <span>
              <img
                className='footprint footprint2 d-md-none position-absolute'
                src={footprintImg}
                alt='footprint'
              />
            </span>
            <span className='d-none d-md-block'>
              <img
                className='footprint footprint3 rotate d-md-none position-absolute'
                src={footprintImg}
                alt='footprint'
              />
            </span>
            <span className='d-none d-md-block'>
              <img
                className='footprint footprint4 rotate position-absolute animate__delay-5s animate__animated animate__flash'
                src={footprintImg}
                alt='footprint'
              />
            </span>
            <span className='d-none d-md-block'>
              <img
                className='footprint footprint5 rotate position-absolute animate__delay-4s animate__animated animate__flash'
                src={footprintImg}
                alt='footprint'
              />
            </span>
            <span className='d-none d-md-block'>
              <img
                className='footprint footprint6 rotate position-absolute animate__delay-3s animate__animated animate__flash'
                src={footprintImg}
                alt='footprint'
              />
            </span>
          </div>
        </div>
      </section>
      {/* <!-- banner of mobil slogan --> */}
      <section className='slogan-sm d-sm-block d-md-none'>
        <div className='slogan container'>
          <div>
            <p>100% Natural・No preservatives</p>
            <h2>pets snack</h2>
            <span>
              <img src={footprintImg} alt='' />
              Handcrafted in limited quantities.
            </span>
            <span>
              <img src={footprintImg} alt='' />
              Specially formulated for picky pets
            </span>
            <span>
              <img src={footprintImg} alt='' />
              <img src={footprintImg} alt='' />
              only the best for pets
              <img src={footprintImg} alt='' />
            </span>
          </div>
          {/* <!-- big foot print --> */}
          <div className='d-none d-lg-block'>
            <span className='footprintBig footprintBig1 position-absolute'>
              <img src={footprintImg} alt='' />
            </span>
            <span className='footprintBig footprintBig2 position-absolute'>
              <img src={footprintImg} alt='' />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
