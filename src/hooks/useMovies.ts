import { useEffect, useState } from "react";
import { Movie } from "../config/entities/Movie";
import { FilmAdapter } from "../adapter/FilmAdapter";
import ResultMovie from "../config/entities/ResultMovie";

export const useMovies = () => {
  const [nowPlaying, setNowPlaying] = useState<ResultMovie>({
    total: 0,
    page: 1, 
    movies: <Movie[]>[],
  });
  const [loading, setLoading] = useState(false);

  const loadMovies = async () => {
    setLoading(true);
    const movies = await FilmAdapter.getMovies(FilmAdapter.ROUTES.nowPlaying, {
      total: nowPlaying.total,
      page: 1, 
    });
    if (movies != null) {
      setNowPlaying(movies);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMovies(); 
  }, []);

  return {
    nowPlaying,
    loading,
  };
};