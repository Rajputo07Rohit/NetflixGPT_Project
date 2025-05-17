import React from 'react'
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestion = () => {

  const {movieResult, moviesNames} = useSelector(store => store.gpt);
     
  if(!moviesNames) return null;

  return (
    <div className='p-4 m-4  text-white bg-black/85 '>
      <div>
        {moviesNames.map((movieName , index) =>    
         <MovieList 
         key={movieName} 
         title={movieName} 
         movies= {movieResult[index]}
         />
      )}
      </div>
    </div>
  )
}

export default GptMovieSuggestion;