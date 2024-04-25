"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { Row, Spin, Typography } from "antd";
import ThemeCard from "./ThemeCard";
import { ThemeInVenueDataResponse } from "@/dtos/response/theme.response";
import { BookingRequest } from "@/dtos/request/partyBooking.request";
import { BookingDataDisplay } from "@/app/booking/[venueId]/page";

const { Title } = Typography;

export function ThemeList({
  bookingData,
  setBookingData,
  bookingDataDisplay,
  setBookingDataDisplay,
}: {
  bookingData: BookingRequest | null;
  setBookingData: React.Dispatch<React.SetStateAction<BookingRequest | null>>;
  bookingDataDisplay: BookingDataDisplay | null;
  setBookingDataDisplay: React.Dispatch<
    React.SetStateAction<BookingDataDisplay | null>
  >;
}) {
  // ** Disptach API
  const dispatch = useAppDispatch();
  const themeInVenueList = useAppSelector(
    (state) => state.themeReducer.themeInVenueList,
  );
  const loading = useAppSelector((state) => state.themeReducer.loading);

  const setItem = (themeInVenue: ThemeInVenueDataResponse) => {
    setBookingData((prev) => ({ ...prev, themeInVenueId: themeInVenue?.id }));
    setBookingDataDisplay((prev) => ({ ...prev, themeInVenue }));
  };

  return (
    <Row gutter={[16, 16]}>
      <Spin
        spinning={loading}
        fullscreen
        tip="Đang chờ tải chủ đề của địa điểm này ..."
      />

      {themeInVenueList.map((theme: any, idx: number) => (
        <ThemeCard
          key={idx}
          themeInVenue={theme}
          bookingData={bookingData}
          setItem={setItem}
        />
      ))}
    </Row>
  );
}

export default ThemeList;
