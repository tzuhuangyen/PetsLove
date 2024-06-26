import React from 'react';
import dogImg from '/images/blog1.png';
import { Container, Row, Col, Card, Image, Nav } from 'react-bootstrap';
function BlogDetail() {
  return (
    <div>
      <Container fluid='md blogDetail'>
        <Row className='mb-4'>
          <h1 className='mt-4 mb-4'>test Blog-Detail </h1>
          <Col md={9}>
            <div>
              <Date></Date>
            </div>
            <h4 className='mt-3 mb-3'>
              We personally test every product featured in our review to provide
              accurate recommendations. Smart Bark is supported by its audience.
              When you purchase through links on our site, we may earn an
              affiliate commission.
            </h4>
            <img className='mb-3' src={dogImg} alt='' />
            <p className='lh-sm'>
              Whether your pup chews through their toys out of boredom, or
              they’re simply just an aggressive chewer, you’re likely getting
              tired of having to replace their toys so often. If you’ve tried
              everything to curb your canine's destructive habits – from
              rewarding good behaviour and socialising them with other dogs to
              making sure they’ve had plenty of exercise – but nothing is
              working, there is still one solution left while you work on it…
              Indestructible dog toys. Specially designed for tough chewers,
              indestructible dog toys are especially difficult for dogs to
              destroyand prevent them from shredding their toys to ribbons. Of
              course, they won’t solve your pup’s destructive behaviour, but
              they will keep you from having to repurchase their favourite toys
              every couple of weeks. But how can your four-legged friend benefit
              from tough dog toys? Here, our experts reveal all.
            </p>
            <br />
            <p className='lh-sm'>
              <ol>
                <li>
                  {' '}
                  1. They’re mentally stimulating Boredom is the leading cause
                  of destructive behaviour in dogs. Just like us, our canine
                  companions need some form of mental stimulation, not only to
                  prevent boredom but to stay happy and healthy, too!
                  Indestructible dog toys provide endless interactive play and
                  problem-solving play opportunities – to keep boredom at bay
                  and minds sharp.
                </li>{' '}
                <br />
                <li>
                  2. They promote physical exercise Regular exercise is crucial
                  for dogs, as it helps them sustain a healthy weight and
                  prevent obesity-related health difficulties. Investing in
                  tough dog toys is a great way to keep your pooch active on the
                  side of their daily walks, as they strongly encourage active
                  playtime sessions. Think tug-of-war with a rope toy, for
                  example. Providing your pup with tough toys that can withstand
                  lots of rough play is a surefire way to ensure they’re getting
                  all the exercise they need to stay healthy.{' '}
                </li>{' '}
                <br />
                <li>
                  3. They support good oral hygiene Keeping your furry friend’s
                  teeth clean is another vital aspect of ensuring their health
                  and happiness. Poor oral hygiene can lead to gum disease and
                  even tooth loss in dogs. But many indestructible dog toys
                  feature textured services that help clean and massage the
                  teeth and gums during playtimes, to reduce plaque build-ups
                  and maintain overall dental well-being.
                </li>{' '}
                <br />
                <li>
                  4. They last longer In comparison to traditional dog toys,
                  tough dog toys are made from higher-quality, sturdier
                  materials to withstand rough play and aggressive chewing.
                  Being so durable, these toys last much longer – making them a
                  much more cost-effective option in the long run, seeing as you
                  won’t have to replace them as often.{' '}
                </li>{' '}
                <br />
                <li>
                  5. They’re safer than traditional dog toys Standard dog toys
                  are easier for dogs to destroy and come with an increased risk
                  of choking and digestive blockages due to small pieces being
                  broken off, swallowed, and ingested. Being made from higher
                  quality, more durable materials, tough dog toys are less
                  susceptible to breaking apart, and ensure the safety of your
                  precious pooch during playtimes. Shop high-quality
                  indestructible dog toys at Pet Shop Online! Here at Pet Shop
                  Online, we stock a wide range of tough dog toys – from tough
                  rubber squeak balls and BBQ-flavoured rope toys, to chew rings
                  and super tough plush bears. So, you’re bound to find the
                  perfect match for your pooch. From a range of reputable UK
                  petcare brands, all of our tough dog chew toys are made from
                  durable, non-toxic materials to ensure the safest playtimes
                  possible. Need help choosing the best indestructible dog and
                  puppy toys? We’re here for you. Give our friendly team a call
                  today on 0161 728 4656 or email us at
                  shop@pet-shop-online.co.uk and we’ll get back to you with our
                  expert recommendations!
                </li>
              </ol>
            </p>
            <p className='mt-3'>
              <a href='https://pet-shop-online.co.uk/blogs/news/top-5-benefits-of-indestructible-dog-toys'>
                From pet-shop-online.co.uk
              </a>
            </p>
          </Col>
          <Col md={3}>
            <div class='categoryGroup'>
              <ul>
                <li className='categoryGroup-item'>
                  <a href='#'>Health</a>
                </li>
                <li className='categoryGroup-item'>
                  <a href='#'>Best Soft Bite Pets Treats</a>
                </li>
                <li className='categoryGroup-item'>
                  <a href='#'>Best Freeze-Dried Treats</a>
                </li>
                <li className='categoryGroup-item'>
                  <a href='#'>Toys</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <section className='mt-4 mb-4'>
          <h3 className='mb-3'>Recommended from Doctor... </h3>
          <ol>
            <li>
              <a href='#'> 1. Best Dog Treats Overall - Pooch & Mutt</a>
            </li>
            <li>
              {' '}
              <a href='#'> 2. Best Soft Bite Dog Treats - Forthglade</a>
            </li>
            <li>
              {' '}
              <a href='#'> 3. Best Freeze-Dried Treats - Incentives Pets</a>
            </li>
            <li>
              {' '}
              <a href='#'> 4. Best Low Calorie Treat Range - Soopa</a>
            </li>
            <li>
              {' '}
              <a href='#'> 5. Best 'Build Your Own Box' - Park Life</a>
            </li>
          </ol>
        </section>
        <Row className='mb-4'>
          <h3 className='mb-3'>Our Top Picks for Pets Treats</h3>
          <Col md={3}>
            <Card style={{ width: 300 }}>
              <Image
                src='https://fakeimg.pl/150x150/'
                className='card-img-top'
                alt='...'
              />
              <div className='card-body'>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </Card>
          </Col>{' '}
          <Col md={3}>
            <Card style={{ width: 300 }}>
              <Image
                src='https://fakeimg.pl/150x150/'
                className='card-img-top'
                alt='...'
              />
              <div className='card-body'>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </Card>
          </Col>{' '}
          <Col md={3}>
            <Card style={{ width: 300 }}>
              <Image
                src='https://fakeimg.pl/150x150/'
                className='card-img-top'
                alt='...'
              />
              <div className='card-body'>
                <p className='card-text'>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BlogDetail;
