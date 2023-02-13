import React from 'react';
import {
  HomeFooterPage,
  HomePage,
  HomePage2,
  HomePage3,
  HomePage4,
  HomePage5,
  UserNav,
} from '../Components';

function Home() {
  return (
    <div>
      <UserNav />
      <HomePage />
      <HomePage2 />
      <HomePage3 />
      <HomePage4 />
      <HomePage5 />
      <HomeFooterPage />
    </div>
  );
}

export default Home;
