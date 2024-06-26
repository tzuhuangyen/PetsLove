import React from 'react';
import footprintImg from '/images/footprint.png'; // 使用相对路径引入图片
import aboutJC1 from '/images/aboutJC1.png';
import aboutJC2 from '/images/aboutJC2.jpg';
import aboutJC3 from '/images/aboutJC3.png';

function About() {
  return (
    <div>
      {/*<!-- about jc of mobile-->*/}
      <section className='about d-md-none'>
        <div className='container'>
          <h2>
            <span>
              <img src={footprintImg} alt='before footprintImg' />
            </span>
            About
            <span>
              <img src={footprintImg} alt='after footprintImg' />{' '}
            </span>
          </h2>
          <div className='card align-items-center text-center'>
            <img src={aboutJC1} className='card-img-top' alt='about' />
            <div className='card-body'>
              <h5 className='card-title'>Fresh</h5>
              <p className='card-text'>
                For the pet's health, we go to the fish market every early
                morning to purchase fresh ingredients and prepare fresh meals.{' '}
              </p>
            </div>
          </div>
          <div className='card align-items-center text-center'>
            <img src={aboutJC2} className='card-img-top' alt='about' />
            <div className='card-body'>
              <h5 className='card-title'>No preservatives</h5>
              <p className='card-text'>
                Preservative-free fresh food has extended the lifespan of our
                pets
              </p>
            </div>
          </div>
          <div className='card align-items-center text-center'>
            <img src={aboutJC3} className='card-img-top' alt='...' />
            <div className='card-body'>
              <h5 className='card-title'>Limited</h5>
              <p className='card-text'>
                . Fresh ingredients are combined with full-cycle
                high-temperature sterilization baking for over 12 hours. Limited
                quantities available!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*<!--about jc of md&lg -->*/}
      <div className='about-lg container d-none d-md-block'>
        <h2 className='text-center'>
          <span>
            <img src={footprintImg} alt='before' />
          </span>
          About
          <span>
            <img src={footprintImg} alt='' />
          </span>
        </h2>
        <ul className='card-bodys'>
          <li className='card-body about1'>
            <img className='aboutImg1' src={aboutJC1} alt='aboutJC1' />
            <h3 className='card-title'>Fresh</h3>
            <p className='card-text'>
              For the pet's health, we go to the market every early morning to
              purchase fresh ingredients and prepare fresh meals{' '}
            </p>
          </li>

          <li className='card-body about2'>
            <img className='aboutImg2' src={aboutJC2} alt='aboutJC2' />
            <h3 className='card-title'>No preservatives</h3>
            <p className='card-text'>
              Preservative-free fresh food has extended the lifespan of our
              pets!
            </p>
          </li>

          <li className='card-body about3'>
            <img className='aboutImg3' src={aboutJC3} alt='aboutJC3' />
            <h3 className='card-title'>Limited</h3>
            <p className='card-text'>
              Fresh ingredients are combined with full-cycle high-temperature
              sterilization baking for over 12 hours!
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;
