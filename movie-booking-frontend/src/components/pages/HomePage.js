import React from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const HomePage = ({ movies, loading, error, onMovieSelect, onRetry }) => {
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading movies..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-red-900 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Book Your Movie Experience</h1>
          <p className="text-xl mb-8">Discover and book tickets for the latest movies</p>
          <div className="flex justify-center">
            <img 
              src="https://images.pexels.com/photos/375885/pexels-photo-375885.jpeg" 
              alt="Cinema" 
              className="rounded-lg shadow-2xl max-h-64 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Movies Section */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Now Showing</h2>
        
        <ErrorMessage 
          message={error} 
          onRetry={onRetry}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-105 transition-transform"
              onClick={() => onMovieSelect(movie)}
            >
              <img 
                src={movie.posterUrl} 
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{movie.title}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-gray-600 ml-1">{movie.rating}/10</span>
                  <span className="text-gray-400 ml-4">{movie.duration} min</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{movie.description}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">{movie.genre}</span>
                  <span className="text-gray-500">{movie.language}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 