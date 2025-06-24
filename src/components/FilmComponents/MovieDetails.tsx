  import { useState, useEffect } from 'react';
  import { getMovieDetails } from '../../api/films';

  interface MovieDetailsProps {
    filmId: string;
    isOpen: boolean;
    onClose: () => void;
  }

  interface MovieData {
    film_category: [{ category: { name: string } }];
    title: string;
    description: string;
    release_year: number;
    length: number;
    replacement_cost: string;
    rating: string;
    language_film_language_idTolanguage: {
      name: string;
    };
  }

  const MovieDetails: React.FC<MovieDetailsProps> = ({ filmId, isOpen }) => {
    const [movieData, setMovieData] = useState<MovieData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
      const fetchMovieDetails = async () => {
        try {
          setLoading(true);
          const data = await getMovieDetails(filmId);
          setMovieData(data);
          console.log('Fetched movie data:', data);
        } catch (err) {
          setError('Failed to fetch movie details');
          console.error('Error fetching movie details:', err);
        } finally {
          setLoading(false);
        }
      };

      if (filmId && isOpen) {
        fetchMovieDetails();
      }
    }, [filmId, isOpen]);

    const content = loading ? (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    ) : error ? (
      <div className="p-8 text-red-600 text-center font-medium">{error}</div>
    ) : movieData ? (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">{movieData.title}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{movieData.description}</p>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div className="space-y-2">
            <p className="flex items-center">
              <span className="font-semibold text-gray-700 min-w-[140px]">Release Year:</span>
              <span className="text-gray-600">{movieData.release_year}</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold text-gray-700 min-w-[140px]">Length:</span>
              <span className="text-gray-600">{movieData.length} minutes</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold text-gray-700 min-w-[140px]">Replacement Cost:</span>
              <span className="text-gray-600">${movieData.replacement_cost}</span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center">
              <span className="font-semibold text-gray-700 min-w-[140px]">Rating:</span>
              <span className="text-gray-600">{movieData.rating}</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold text-gray-700 min-w-[140px]">Language:</span>
              <span className="text-gray-600">{movieData.language_film_language_idTolanguage.name}</span>
            </p>
            <p className="flex items-center">
              <span className="font-semibold text-gray-700 min-w-[140px]">Category:</span>
              <span className="text-gray-600">{movieData.film_category[0].category.name}</span>
            </p>
          </div>
        </div>
      </div>
    ) : (
      <div className="p-8 text-gray-500 text-center">No movie data available</div>
    );

    return content;
  }

  export default MovieDetails;