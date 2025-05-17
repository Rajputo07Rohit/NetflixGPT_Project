import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utilis/constant'
import { useDispatch, useSelector } from 'react-redux'
import {  addPopularMovie } from "../utilis/Redux/moviesSlice"

 const usePopularMovie = () => {
   
    const dispatch = useDispatch();

  const popularMovies = useSelector(store => store.movies.popularMovies)
  
    const getNowPolularMovies = async () => {
  
      const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
      const json = await data.json();
    
      dispatch(addPopularMovie(json.results));
    }

    useEffect(() =>{
       !popularMovies && getNowPolularMovies();
      },[])
}

export default usePopularMovie;