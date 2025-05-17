import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utilis/constant'
import { useDispatch, useSelector } from 'react-redux'
import {  addTrendingMovie } from "../utilis/Redux/moviesSlice"

 const useTrendingMovie = () => {
   
    const dispatch = useDispatch();


    const trendingMovies = useSelector(store => store.movies.trendingMovies)
  
  
    const getTrendingMovie = async () => {
  
      const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
      const json = await data.json();
    
      dispatch(addTrendingMovie(json.results));
    }

    useEffect(() =>{
       !trendingMovies && getTrendingMovie();
      },[])
}

export default useTrendingMovie;