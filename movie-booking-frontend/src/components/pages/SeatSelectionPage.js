import React from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const SeatSelectionPage = ({ 
  selectedMovie, 
  selectedShowtime, 
  seats, 
  selectedSeats, 
  loading, 
  error, 
  onNavigate, 
  onToggleSeat, 
  onBookTickets, 
  onRetry 
}) => {
  if (!selectedMovie || !selectedShowtime) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No movie or showtime selected</p>
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
        <LoadingSpinner size="xl" text="Loading seats..." />
      </div>
    );
  }

  const rows = [...new Set(seats.map(seat => seat.row))].sort();
  const seatsPerRow = Math.max(...seats.map(seat => seat.number));
  
  const getSeat = (row, number) => {
    return seats.find(seat => seat.row === row && seat.number === number);
  };

  const isSeatSelected = (seat) => {
    return selectedSeats.some(s => s.row === seat.row && s.number === seat.number);
  };

  const handleBookTickets = async () => {
    const result = await onBookTickets();
    if (result.success) {
      alert(`Booking confirmed! Total: ₹${result.totalAmount}`);
      onNavigate('bookings');
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => onNavigate('movie-details')}
          className="mb-6 text-red-600 hover:text-red-800 flex items-center"
        >
          ← Back to Showtimes
        </button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Select Your Seats</h1>
          <p className="text-gray-600">
            {selectedMovie.title} • {new Date(selectedShowtime.showDate).toLocaleString()}
          </p>
        </div>

        <ErrorMessage 
          message={error} 
          onRetry={onRetry}
        />

        {/* Screen */}
        <div className="text-center mb-8">
          <div className="bg-gray-300 mx-auto py-2 px-8 rounded-t-full max-w-md">
            <span className="text-gray-600 font-semibold">SCREEN</span>
          </div>
        </div>

        {/* Seat Map */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          <div className="space-y-4">
            {rows.map(row => (
              <div key={row} className="flex justify-center items-center space-x-2">
                <span className="w-8 text-center font-semibold text-gray-600">{row}</span>
                {Array.from({ length: seatsPerRow }, (_, index) => {
                  const seatNumber = index + 1;
                  const seat = getSeat(row, seatNumber);
                  const isSelected = seat && isSeatSelected(seat);
                  
                  if (!seat) {
                    return <div key={seatNumber} className="w-8 h-8"></div>;
                  }

                  return (
                    <button
                      key={`${row}${seatNumber}`}
                      onClick={() => onToggleSeat(seat)}
                      disabled={seat.status === 'booked'}
                      className={`w-8 h-8 rounded-md text-xs font-semibold transition-colors ${
                        seat.status === 'booked'
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : isSelected
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-8 mt-8 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
              <span>Booked</span>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        {selectedSeats.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
            <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Selected Seats:</span>
                <span>{selectedSeats.map(s => `${s.row}${s.number}`).join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span>Price per ticket:</span>
                <span>₹{selectedShowtime.price}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total Amount:</span>
                <span>₹{selectedSeats.length * selectedShowtime.price}</span>
              </div>
            </div>
            <button
              onClick={handleBookTickets}
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Booking...' : 'Book Now'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatSelectionPage; 