import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utilis/constant'
import { useDispatch } from 'react-redux'
import { addNowPlayingMovies } from "../utilis/Redux/moviesSlice"

 const useNowPlayingMovie = () => {
   
    const dispatch = useDispatch();

  
  
    const getNowPlayingMovies = async () => {
  
      const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
      const json = await data.json();
    
      dispatch(addNowPlayingMovies(json.results));
    }

    useEffect(() =>{
        getNowPlayingMovies();
      },[])
}

export default useNowPlayingMovie;