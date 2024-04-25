import React from "react";
import VenueCard from "./VenueCard";
import { Empty, Flex, Spin } from "antd";
import { VenueDataResponse } from "@/dtos/response/venue.response";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { BookingRequest } from "@/dtos/request/partyBooking.request";
import { SlotInRoomDataResponse } from "@/dtos/response/slot.response";

const VenueList = ({
  venueList,
  bookingData,
  setBookingData,
  setVenue,
  bookingDataDisplay,
  setBookingDataDisplay,
}: {
  venueList: VenueDataResponse[] | [];
  bookingData: BookingRequest | null;
  setBookingData: React.Dispatch<React.SetStateAction<BookingRequest | null>>;
  setVenue: React.Dispatch<React.SetStateAction<VenueDataResponse | null>>;
  bookingDataDisplay: any | null;
  setBookingDataDisplay: React.Dispatch<React.SetStateAction<any | null>>;
}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.venueReducer.loading);

  const setItem = ({
    venue,
    slotInRoom,
  }: {
    venue: VenueDataResponse;
    slotInRoom: SlotInRoomDataResponse;
  }) => {
    setVenue(venue);
    setBookingData((prev) => ({ ...prev, slotInRoomId: slotInRoom?.id }));
    setBookingDataDisplay((prev: any) => ({ ...prev, slotInRoom }));
  };

  return (
    <Flex className="container mx-auto" vertical>
      <Spin spinning={loading} />
      {venueList && venueList?.length > 0 ? (
        venueList?.map((venue: any, index: number) => (
          <VenueCard
            key={index}
            venue={venue}
            setItem={setItem}
            bookingData={bookingData}
          />
        ))
      ) : (
        <Empty description="Không có dữ liệu" />
      )}
    </Flex>
  );
};

export default VenueList;
