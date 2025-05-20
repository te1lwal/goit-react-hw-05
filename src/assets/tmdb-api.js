import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_KEY = import.meta.env.VITE_THEMOVIEDB_ACCESS_KEY;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_KEY}`,
  },
});

// Trending Movies
export const getTrendingMovies = async () => {
  try {
    const response = await axiosInstance.get('/trending/movie/day');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

// Movies
export const searchMovies = async query => {
  try {
    const response = await axiosInstance.get('/search/movie', {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Movies Details
export const getMovieDetails = async movieId => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Movies Cast
export const getMovieCast = async movieId => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error('Error fetching movie cast:', error);
    throw error;
  }
};

// Movies Reviews
export const getMovieReviews = async movieId => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
};

// Image Url
export const getImageUrl = (imagePath, size = 'w500') => {
  return imagePath ? `https://image.tmdb.org/t/p/${size}${imagePath}` : '';
};