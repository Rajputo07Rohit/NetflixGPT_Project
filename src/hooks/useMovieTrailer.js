import { useEffect } from "react";
import { API_OPTIONS } from "../utilis/constant";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utilis/Redux/moviesSlice";

const useMovieTrailer = (id) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    if (!id) return;

    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, [id]);
};

export default useMovieTrailer;
