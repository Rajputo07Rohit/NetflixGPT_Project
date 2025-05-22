import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from  "../utilis/LanguageConstants"
import run from "../utilis/genAI";
import { API_OPTIONS } from "../utilis/constant";
import { addGptMovieResult } from "../utilis/Redux/gptSlice";



const GptSearchBar = () => {

  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

   const searchMovieTMDB = async (movie) => {

    const data = await fetch(
    'https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1&api_key='+import.meta.env.VITE_TMDB_API_KEY
      , API_OPTIONS);

      const json = await data.json()

      return json.results;
      
  }

  const handleGptSearchClick = async () => {
    const userQuery = searchText.current.value;
    console.log(userQuery);
  
    const prompt = `Act as a Movie Recommendation system and suggest some movies for the query: "${userQuery}". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Robot, Golmaal`;
  
    try {
      const movieList = await run(prompt);
      const geminiMovies = movieList.split(",");

     const promiseArray  = geminiMovies.map((movie) => searchMovieTMDB(movie));
       
     const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);
        
      dispatch(addGptMovieResult({moviesNames: geminiMovies,movieResult:tmdbResults}))

    } catch (error) {
      console.error("Gemini API Error:", error);
    } 
  };
  return (
    <div className="pt-[45%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9 bg-white"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-2 md:px-4 bg-red-700 text-white rounded-lg"
         onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
