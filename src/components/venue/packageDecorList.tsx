"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { Row, Spin, Typography } from "antd";
import { PackageDataResponse } from "@/dtos/response/package.response";
import { BookingRequest } from "@/dtos/request/partyBooking.request";
import { BookingDataDisplay } from "@/app/booking/[venueId]/page";
import PackageCard from "./PackageDecorCard";

const { Title } = Typography;

export function PackageDecorList({
  packageDecorList,
}: {
  packageDecorList: PackageDataResponse[];
}) {
  return (
    <Row gutter={[16, 16]}>
      {packageDecorList.map((pkg: PackageDataResponse, idx: number) => (
        <PackageCard
          key={idx}
          pkg={pkg}
        />
      ))}
    </Row>
  );
}

export default PackageDecorList;
