import React from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const BookingsPage = ({ 
  bookings, 
  movies, 
  showtimes, 
  loading, 
  error, 
  onNavigate, 
  onRetry,
  onCancelBooking 
}) => {
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading bookings..." />
      </div>
    );
  }

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const result = await onCancelBooking(bookingId);
      if (result.success) {
        alert('Booking cancelled successfully!');
      } else {
        alert(result.error || 'Failed to cancel booking');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Bookings</h1>
        
        <ErrorMessage 
          message={error} 
          onRetry={onRetry}
        />
        
        {bookings.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">No bookings found</p>
            <button
              onClick={() => onNavigate('home')}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const movie = movies.find(m => {
                const showtime = showtimes.find(s => s.id === booking.showtimeId);
                return showtime && m.id === showtime.movieId;
              });
              
              return (
                <div key={booking.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {movie ? movie.title : 'Movie'}
                      </h3>
                      <p className="text-gray-600 mb-1">
                        Booking ID: {booking.id}
                      </p>
                      <p className="text-gray-600 mb-1">
                        Seats: {booking.seats.map(s => `${s.row}${s.number}`).join(', ')}
                      </p>
                      <p className="text-gray-600 mb-1">
                        Booking Date: {new Date(booking.bookingDate).toLocaleString()}
                      </p>
                      <p className={`font-semibold ${booking.status === 'confirmed' ? 'text-green-600' : booking.status === 'cancelled' ? 'text-red-600' : 'text-yellow-600'}`}>
                        Status: {booking.status}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-gray-800 mb-2">
                        ₹{booking.totalAmount}
                      </p>
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage; 