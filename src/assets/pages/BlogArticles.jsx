import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dogImg1 from '/images/blog1.jpg';
import dogImg2 from '/images/blog2.jpg';
import dogImg3 from '/images/blog3.jpg';
import { FaSearch } from 'react-icons/fa';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { newsApiKey } from '../../../config';

function BlogArticles() {
  const { articleId } = useParams(); // 提取路由參數
  const [article, setArticle] = useState({}); // State for article
  const [keyword, setKeyword] = useState('');
  const [news, setNews] = useState([]);
  const NewsAPIBASE_URL = 'https://api.worldnewsapi.com';
  useEffect(() => {
    window.scrollTo(0, 0); // 在組件加載時滾動到頂部
  }, []);
  const getArticleById = (id) => {
    // 這是模擬的一個函數，你可以根據你的資料來源替換
    const articles = [
      {
        id: 'article1',
        title: 'Top 5 benefits of indestructible dog toys',
        content: `  <h4 class='mt-3 mb-3 lh-sm'>
                  We personally test every product featured in our review to provide
                  accurate recommendations. Smart Bark is supported by its audience.
                  When you purchase through links on our site, we may earn an
                  affiliate commission.
                </h4>
                 <p class='mb-2'>Darren Brownbill - Feb 05, 2024</p>
                <img class='mb-4 img-fluid' src='${dogImg1}' alt='dogImg1' />
                <p class='lh-base'>
                  Whether your pup chews through their toys out of boredom, or
                  they're simply just an aggressive chewer, you're likely getting
                  tired of having to replace their toys so often. If you've tried
                  everything to curb your canine's destructive habits – from
                  rewarding good behaviour and socialising them with other dogs to
                  making sure they've had plenty of exercise – but nothing is
                  working, there is still one solution left while you work on it…
                  Indestructible dog toys. Specially designed for tough chewers,
                  indestructible dog toys are especially difficult for dogs to
                  destroyand prevent them from shredding their toys to ribbons. Of
                  course, they won't solve your pup's destructive behaviour, but
                  they will keep you from having to repurchase their favourite toys
                  every couple of weeks. But how can your four-legged friend benefit
                  from tough dog toys? Here, our experts reveal all.
                </p>
                <br />
                
                  <ol>
                    <p>1. They're mentally stimulating</p>
                    <li class='lh-base'>
                  
                      Boredom is the leading cause of destructive behaviour in dogs.
                      Just like us, our canine companions need some form of mental
                      stimulation, not only to prevent boredom but to stay happy and
                      healthy, too! Indestructible dog toys provide endless
                      interactive play and problem-solving play opportunities – to
                      keep boredom at bay and minds sharp.
                    </li>
                    <br /><br />
                    <p>2. They promote physical exercise </p>
                    <li class='lh-base'>
                      Regular exercise is crucial for dogs, as it helps them sustain
                      a healthy weight and prevent obesity-related health
                      difficulties. Investing in tough dog toys is a great way to
                      keep your pooch active on the side of their daily walks, as
                      they strongly encourage active playtime sessions. Think
                      tug-of-war with a rope toy, for example. Providing your pup
                      with tough toys that can withstand lots of rough play is a
                      surefire way to ensure they're getting all the exercise they
                      need to stay healthy.
                    </li>
                    <br /><br />
                    <p>3. They support good oral hygiene </p>
                    <li class='lh-base'>
                      Keeping your furry friend's teeth clean is another vital
                      aspect of ensuring their health and happiness. Poor oral
                      hygiene can lead to gum disease and even tooth loss in dogs.
                      But many indestructible dog toys feature textured services
                      that help clean and massage the teeth and gums during
                      playtimes, to reduce plaque build-ups and maintain overall
                      dental well-being.
                    </li>
                    <br /> <br />
                    <p> 4. They last longer </p>
                    <li class='lh-base'>
                      In comparison to traditional dog toys, tough dog toys are made
                      from higher-quality, sturdier materials to withstand rough
                      play and aggressive chewing. Being so durable, these toys last
                      much longer – making them a much more cost-effective option in
                      the long run, seeing as you won't have to replace them as
                      often.
                    </li>
                    <br /> <br />
                    <p> 5. They're safer than traditional dog toys </p>
                    <li class='lh-base'>
                      Standard dog toys are easier for dogs to destroy and come with
                      an increased risk of choking and digestive blockages due to
                      small pieces being broken off, swallowed, and ingested. Being
                      made from higher quality, more durable materials, tough dog
                      toys are less susceptible to breaking apart, and ensure the
                      safety of your precious pooch during playtimes. Shop
                      high-quality indestructible dog toys at Pet Shop Online! Here
                      at Pet Shop Online, we stock a wide range of tough dog toys –
                      from tough rubber squeak balls and BBQ-flavoured rope toys, to
                      chew rings and super tough plush bears. So, you're bound to
                      find the perfect match for your pooch. From a range of
                      reputable UK petcare brands, all of our tough dog chew toys
                      are made from durable, non-toxic materials to ensure the
                      safest playtimes possible. Need help choosing the best
                      indestructible dog and puppy toys? We're here for you. Give
                      our friendly team a call today on 0161 728 4656 or email us at
                      shop@pet-shop-online.co.uk and we'll get back to you with our
                      expert recommendations!
                    </li>
                  </ol>
                
                <p class='mt-3'>
                  <a href='https://pet-shop-online.co.uk/blogs/news/top-5-benefits-of-indestructible-dog-toys'>
                    From pet-shop-online.co.uk
                  </a>
                </p>`,
      },
      {
        id: 'article2',
        title: '4 things to look out for when shopping for dog treats',
        content: `
          <p  class='mt-3 lh-base'>
    Darren BrownbillDec 04, 2023</p>
           <img class='mb-4 img-fluid' src='${dogImg2}' alt='dogImg2' />
          <p class='mt-3 lh-base'>If you're a dog owner, then you'll know that having a plentiful supply of treats is essential.
          Whether you use them for reward-based training, or simply as a snack to tide your dog over from breakfast to dinner, it's important to make sure that you're always stocked up.
          With so many different treats lining the pet shop shelves, it can be difficult to know which to pick up
          Of course, you want something tasty for your four-legged friend to enjoy, but you need something that won't cause them any harm, too. </p>
          <br/>
          
          <ol>
            <li> 
              <p class='fs-4'>1. Choose treats with no preservatives</p>
              <p class='lh-base'>Synthetic preservatives are often added to dog treats to extend their shelf life, but they could be harmful for your fur baby.
                  Three of the most common preservatives found in dog food include BHA (Butylated hydroxyanisole), BHT (Butylated hydroxytoluene) and propyl gallate.
                  These ingredients (and others) can lead to poor digestion, skin and coat issues, irregular bowel movements and many other health issues.
                  So, to keep your pooch happy and healthy, definitely steer clear of treats that contain harmful preservatives.</p>
             </li>
             <br/>
            <li> 
              <p class='fs-4'>2. Try to avoid rawhide</p>
              <p class='lh-base'>Bones are great for providing some much-needed mental stimulation for your pup.
                  But many of them are made from rawhide.
                  Whilst rawhide can be great for preventing plaque and tartar buildup, the risks outweigh the benefits by a mile and rawhide chews can be incredibly dangerous for our dogs.
                  Rawhide chews are meant to be eaten over time so that they break down into softer, more manageable pieces. 
                  However, if your pooch is a particularly aggressive chewer, they may be able to break off larger chunks, which poses risks of choking and blockages, as well as digestive irritation.
                  There are plenty of tasty alternatives for your pup to gnaw on, like pig ears or lamb trotters, that are sure to get their tails wagging.
    
              </p>
            </li> <br/>
            <li> 
               <p class='fs-4'>3. Steer clear of synthetic sweeteners</p>
               <p class='lh-base'>
               Synthetic sweeteners, like sorbitol, are also commonly found in dog treats, and they're used to enhance the taste.
              These can cause a myriad of health problems, including:
              <ul class='lh-base'>
                <li>* Obesity</li>
                <li>* Tooth decay</li>
                <li>* Allergies</li>
                <li>* Digestive problems (including stomach cramps, diarrhoea, vomiting and bloody stools)
                There are many dog treats on the market that contain all-natural ingredients, including naturally occuring sweeteners, that are just as delicious.</li>
              </ul>
               </p>
            </li>
             <br/>
            <li> 
               <p class='fs-4'>4. Check the salt content</p>
               <p class='lh-base'>Just like salt is necessary in our diets, it's also necessary in your dog's diet, too.
    
    But, as we know, too much salt can be harmful – leading, potentially, to high blood pressure, cardiovascular disease, strokes and more.
    
    Salt is naturally present in lots of the ingredients that are found in dog treats, but you should avoid treats with added salt to prevent any of these health problems from occurring – so make sure to have a quick check of the labels.
    
    If you buy treats made from high-quality natural ingredients, extra salt won't be needed to enhance the flavour, and your pooch can enjoy something tasty without the increased health risks.
    
     </p>
            </li>
          </ol>
           <p class='mt-3'>
                  <a href='https://pet-shop-online.co.uk/blogs/news/4-things-to-look-out-for-when-shopping-for-dog-treats'>
                    From pet-shop-online.co.uk
                  </a>
                </p>`,
      },
      {
        id: 'article3',
        title: '3 easy ways to have a pet-friendly Christmas',
        content: `
           <p  class='mt-3 lh-base'>Darren Brownbill Dec 04, 2023</p>
           <br/>
           <img class='mb-4 img-fluid' src='${dogImg3}' alt='dogImg3' />
           
           <p class='mt-3 lh-base'>With Halloween and Bonfire night done and dusted, it's time to start thinking about Christmas.
              Whether you're a Christmas fanatic or the C-word is banned in your home until – at least – the 1st of December, it definitely doesn't hurt to start thinking about your plans.
              Whatever they may be – be it the annual family gathering or a lazy day on the couch with a tub of Celebrations – you may be thinking of ways you can involve your pets.
              After all, they're a member of the family. So why should they have to miss out on all the festive fun?
              In this blog, our experts here at Pet Shop Online share some of our favourite ways you can make Christmas 2023 as pet-friendly as possible! 
           </p>
           <div class='mt-3 lh-base'> 
              <p class='fs-3'>Stick to pet-friendly treats</p>
              <p> We all like to indulge in festive treats over the holidays.<br/>
                  Let's face it, there's nothing like curling up with a cup of mulled wine or tucking into a mince pie (or two!).<br/>
                  But these delicacies aren't to be enjoyed by your pets, as they contain ingredients that are toxic for them and cause upset tummies and other, far more serious, problems. So, it's best to keep them well out of reach.<br/>
                  The roast dinner is one of the most important parts of the day, and it can be tempting to treat our pets to a plate of turkey and trimmings.<br/>
                  If your pet is a healthy weight, there's no harm in giving them a small portion, but you should steer clear of:<br/>
                  * Bones – bones are a huge choking hazard and can lead to a gut blockage.<br/>
                  * Onions, garlic, leeks and shallots – these foods are incredibly toxic for our pets, even in small quantities. Remember to steer clear of giving them any gravy, stuffing or any other trimmings that contain ingredients such as these.<br/><br/>
                  If you don't want your pet to feel left out, try making some tasty homemade treats they can enjoy instead! There are plenty of pet-friendly recipes online that they're sure to love!<br/>
                  If your pet does ingest any of your goodies, be sure to take them to a vet as soon as you can.</p>
           </div>
           <div class='mt-3 lh-base'> 
            <p class='fs-3'>Reconsider your decorations</p>
            <p>Fairy lights. Baubles. Tinsel.<br/>
              However you dress up your home for the festive period, it's important to be mindful of how your decorations could affect your pets.<br/>
              These items provide irresistible play opportunities for our four-legged friends, and if they get their paws on them, they can be pretty dangerous. Anything knocked off your tree can be swallowed or broken and trodden on – so remember to hang any lights or ornaments well out of their reach.<br/>
              If you usually have a fir or pine tree, make sure to sweep up any fallen needles and cut off access when they're left home alone, as they can be mildly toxic for your pets and pose yet another choking hazard.</p><br/>
           </div>
           <div class='mt-3 lh-base'>
            <p class='fs-3'>Set up a quiet, cosy space</p> 
            <p>For many of us, Christmas Day is one of the busiest of the year.<br/>
              With family and friends getting together and classic Christmas tunes playing at top volume, all the faces and noise can be pretty stressful for your pets.<br/>
              If you can, set up a space for them in a room far away from all the action, providing some of their favourite toys, a comfy bed and calming music to help them relax if they need to.<br/>
            </p>
           </div>
           
          <br/>
           <p class='mt-3'>
             <a href='https://pet-shop-online.co.uk/blogs/news/3-easy-ways-to-have-a-pet-friendly-christmas'>
                    From pet-shop-online.co.uk
             </a>
            </p>`,
      },
      // 其他文章...
    ];

    return articles.find((article) => article.id === id) || {};
  };
  // Fetch local article by ID
  useEffect(() => {
    const fetchedArticle = getArticleById(articleId);
    setArticle(fetchedArticle); // Set article state
    window.scrollTo(0, 0); // Scroll to top on mount
  }, [articleId]); // Dependency array with articleId

  // Fetch news based on keyword
  const fetchNewsByKeyword = async (event) => {
    event.preventDefault();
    try {
      const url = `${NewsAPIBASE_URL}/search-news?text=${keyword}&language=en`;
      const response = await axios.get(url, {
        headers: {
          'x-api-key': newsApiKey,
          'Content-Type': 'application/json',
        },
      });
      const articles = response.data.news.slice(0, 3);
      console.log('articles:', articles);
      setNews(articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleArticleClick = (item) => {
    setSelectedArticle(item); // Set the clicked article to be displayed
  };
  // helper function to truncate the summary text
  const truncateSummary = (summary) => {
    if (summary.length > 300) {
      return summary.slice(0, 250) + '...'; // Append ellipsis if truncated
    }
    return summary;
  };

  return (
    <>
      <Container fluid='md' className=' blogArticles'>
        <Form onSubmit={fetchNewsByKeyword} className=' d-flex w-100'>
          <InputGroup className='mb-3 mt-3'>
            <InputGroup.Text id='inputGroup-sizing-default'>
              Search news by keyword
            </InputGroup.Text>
            <Form.Control
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className='flex-grow-1'
            />
          </InputGroup>
          <Button type='submit' className='p-0'>
            {' '}
            <FaSearch />
          </Button>
        </Form>
        {/* api news display */}
        <h3>Result of Related News</h3>

        <Row>
          {news.length > 0 ? (
            news.map((item, index) => (
              <Col xs={12} md={6} lg={4} className='mb-4' key={index}>
                <Card className='shadow-sm d-flex flex-column h-100'>
                  <Card.Img
                    src={item.image || '/images/opss.jpg'}
                    className='img-fluid'
                    alt={item.title || 'Article Image'}
                  />
                  <Card.Body className='d-flex flex-column'>
                    <Card.Title>
                      {item.title || 'No title available'}
                    </Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>
                      <p>{item.author}</p>
                      <span>{item.publish_date || 'Unknown date'}</span>
                    </Card.Subtitle>
                    <Card.Text className='flex-grow-1'>
                      {truncateSummary(item.summary) || 'No summary available'}
                    </Card.Text>
                    <Button variant='primary' className='mt-auto'>
                      <a
                        href={item.url}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        See more
                      </a>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No news available</p>
          )}
        </Row>

        {/* main article area */}
        <Row className='mb-4'>
          <h1 className='mt-4 mb-4'>{article.title}</h1>
          <Col xs={12} md={9}>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BlogArticles;
