import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [initialData, setInitialData] = useState(null);

  const openBookingModal = (serviceName = '', extraData = null) => {
    setSelectedService(serviceName);
    setInitialData(extraData);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedService('');
    setInitialData(null);
  };

  return (
    <BookingContext.Provider
      value={{
        isBookingModalOpen,
        selectedService,
        initialData,
        openBookingModal,
        closeBookingModal,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
