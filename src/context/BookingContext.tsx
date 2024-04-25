"use client";
import { ServiceDataResponse } from "@/dtos/response/service.response";
import { VenueDataResponse } from "@/dtos/response/venue.response";
import React, { createContext, useState, useContext, FC } from "react";

interface DataUpgrade {
  serviceId: number;
  count: number;
}
interface BookingRequest {
  kidName?: string;
  kidDOB?: string;
  email?: string;
  phone?: string;
  themeInVenueId?: number;
  packageInVenueId?: number;
  slotInVenueId?: number;
  dataUpgrade?: DataUpgrade[] | [];
  date?: string;
}

// Tạo context và kiểu cho context
interface BookingContextType {
  bookingData: BookingRequest | null;
  setBookingData: React.Dispatch<React.SetStateAction<BookingRequest | null>>;
  venue: VenueDataResponse | null;
  setVenue: React.Dispatch<React.SetStateAction<VenueDataResponse | null>>;
  services: { service: ServiceDataResponse; count: number }[] | [];
  setServices: React.Dispatch<
    React.SetStateAction<{ service: ServiceDataResponse; count: number }[] | []>
  >;
  dataUpgrade: { serviceId: number; count: number }[] | [];
  setDataUpgrade: React.Dispatch<
    React.SetStateAction<{ serviceId: number; count: number }[] | []>
  >;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Tạo custom hook để sử dụng context
export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};

// Tạo Provider component
export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookingData, setBookingData] = useState<BookingRequest | null>(null);
  const [services, setServices] = useState<
    { service: ServiceDataResponse; count: number }[] | []
  >([]);
  const [dataUpgrade, setDataUpgrade] = useState<
    { serviceId: number; count: number }[] | []
  >([]);
  const [venue, setVenue] = useState<VenueDataResponse | null>(null);
  // Các hàm hoặc trạng thái khác có thể được thêm vào đây

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setBookingData,
        services,
        setServices,
        dataUpgrade,
        setDataUpgrade,
        venue,
        setVenue,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
