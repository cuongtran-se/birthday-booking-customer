"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { Row, Spin, Typography } from "antd";
import PackageCard from "./PackageCard";
import { PackageDataResponse } from "@/dtos/response/package.response";
import { BookingRequest } from "@/dtos/request/partyBooking.request";
import { BookingDataDisplay } from "@/app/booking/[venueId]/page";

const { Title } = Typography;

export function PackageFoodList({
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
  const packageDecorList = useAppSelector(
    (state) => state.packageReducer.packageDecorList,
  );
  const packageFoodList = useAppSelector(
    (state) => state.packageReducer.packageFoodList,
  );
  const loading = useAppSelector((state) => state.packageReducer.loading);

  const setItem = (_package: PackageDataResponse) => {
    setBookingData((prev) => ({ ...prev, packageFoodId: _package?.id }));
    setBookingDataDisplay((prev) => ({ ...prev, packageFood: _package }));
  };

  return (
    <Row gutter={[16, 16]}>
      <Spin
        spinning={loading}
        fullscreen
        tip="Đang chờ tải gói dịch vụ của địa điểm này ..."
      />

      {packageFoodList.map((pkg: PackageDataResponse, idx: number) => (
        <PackageCard
          key={idx}
          pkg={pkg}
          bookingData={bookingData}
          setItem={setItem}
        />
      ))}
    </Row>
  );
}

export default PackageFoodList;
