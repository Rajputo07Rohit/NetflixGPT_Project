import React from 'react'
import Header from './Header'
import useNowPlayingMovie from '../hooks/useNowPlayingMovie'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovie from '../hooks/usePopularMovie';
import useTrendingMovie from '../hooks/useTrendingMovie';


const Browse = () => {
 
  useNowPlayingMovie();
 usePopularMovie();
  useTrendingMovie();
  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
    </div>
  )
}

export default Browse