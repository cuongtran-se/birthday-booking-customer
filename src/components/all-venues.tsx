import { Empty, Flex, Spin } from "antd";
import React from "react";
import { VenueDataResponse } from "@/dtos/response/venue.response";
import VenueCard from "./VenueCard";

const AllVenue = ({ venueList }: { venueList: VenueDataResponse[] | [] }) => {
  return (
    <Flex className="container mx-auto" vertical>
      <Spin spinning={false} />
      {venueList && venueList?.length > 0 ? (
        venueList?.map((venue: VenueDataResponse, index: number) => (
          <VenueCard venue={venue} />
        ))
      ) : (
        <Empty description="Không có dữ liệu" />
      )}
    </Flex>
  );
};

export default AllVenue;
