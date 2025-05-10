import React from 'react'
import Header from './Header'
import useNowPlayingMovie from '../hooks/useNowPlayingMovie'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovie from '../hooks/usePopularMovie';
import useTrendingMovie from '../hooks/useTrendingMovie';
import GptSearch from './GPtSearch';
import { useSelector } from 'react-redux';


const Browse = () => {

   const showGptSearch = useSelector(store => store.gpt.showGptSearch)
  
 
  useNowPlayingMovie();
 usePopularMovie();
  useTrendingMovie();
  return (
    <div>
      <Header/>
      {showGptSearch ? (
           <GptSearch/>
      ) : (
        <>
              <MainContainer/>
              <SecondaryContainer/>
        </>
      )}
    </div>
  )
}

export default Browse