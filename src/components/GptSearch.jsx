import React from 'react'

import {BG_URL} from '../utilis/constant'
import GptMovieSuggestion from './GptMovieSuggestion';
import GptSearchBar from './GptSearchBar'


const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img className="h-screen object-cover" src={BG_URL} alt="logo" />
      </div>
      <div className="">
        <GptSearchBar/>
        <GptMovieSuggestion/>
      </div>
    </>
  );
};
export default GptSearch