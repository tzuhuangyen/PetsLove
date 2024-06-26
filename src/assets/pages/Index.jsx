import React from 'react';
import IndexBanner from './component/IndexBanner';
import IndexAbout from './component/IndexAbout';
import IndexType from './component/IndexType';
import IndexReview from './component/IndexReview';
import IndexBlog from './component/IndexBlog';
import reviewers from '../../../public/db.json';

function Index() {
  return (
    <>
      <IndexBanner />
      <IndexAbout />
      <IndexType />
      <IndexReview slides={reviewers} />
      <IndexBlog />
    </>
  );
}
export default Index;
