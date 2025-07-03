import React from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const MovieDetailsPage = ({ 
  selectedMovie, 
  showtimes, 
  theatres, 
  loading, 
  error, 
  onNavigate, 
  onSelectShowtime, 
  onRetry 
}) => {
  if (!selectedMovie) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No movie selected</p>
          <button
            onClick={() => onNavigate('home')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading showtimes..." />
      </div>
    );
  }

  // Debug logging
  console.log('theatres:', theatres);
  console.log('showtimes:', showtimes);

  const groupedShowtimes = showtimes.reduce((acc, showtime) => {
    const theatre = theatres.find(t => String(t.id).trim() === String(showtime.theatreId).trim());
    const theatreName = theatre ? theatre.name : 'Unknown Theatre';
    
    if (!acc[theatreName]) {
      acc[theatreName] = [];
    }
    acc[theatreName].push(showtime);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => onNavigate('home')}
          className="mb-6 text-red-600 hover:text-red-800 flex items-center"
        >
          ← Back to Movies
        </button>
        
        <ErrorMessage 
          message={error} 
          onRetry={onRetry}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <img 
              src={selectedMovie.posterUrl} 
              alt={selectedMovie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{selectedMovie.title}</h1>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 text-xl">⭐</span>
              <span className="text-gray-600 ml-2 text-lg">{selectedMovie.rating}/10</span>
              <span className="text-gray-400 ml-6">{selectedMovie.duration} minutes</span>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm ml-6">{selectedMovie.genre}</span>
            </div>
            
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">{selectedMovie.description}</p>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Showtime</h2>
            
            {Object.keys(groupedShowtimes).length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No showtimes available for this movie</p>
                <button
                  onClick={() => onNavigate('home')}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Browse Other Movies
                </button>
              </div>
            ) : (
              Object.entries(groupedShowtimes).map(([theatreName, theatreShowtimes]) => (
                <div key={theatreName} className="mb-6 bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{theatreName}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {theatreShowtimes.map((showtime) => (
                      <button
                        key={showtime.id}
                        onClick={() => onSelectShowtime(showtime)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-center"
                      >
                        <div className="font-semibold">
                          {new Date(showtime.showDate).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: true 
                          })}
                        </div>
                        <div className="text-sm">₹{showtime.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage; 