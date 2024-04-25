"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllVenue } from "@/lib/features/action/venue.action";
import { useEffect } from "react";
import VenueCard from "@/components/venue-card";
import { Carousel, Typography } from "antd";
const { Title } = Typography;

export function VenueCards() {
  // ** Disptach API
  const dispatch = useAppDispatch();
  const venueList = useAppSelector((state) => state.venueReducer.venueList);
  const fetchAllVenue = async () => {
    await dispatch(getAllVenue()).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  useEffect(() => {
    fetchAllVenue();
  }, []);

  return (
    <section className="px-0">
      <div className="text-center">
        <Title level={1} color="blue-gray">
          Các Địa Điểm Nổi Bật
        </Title>
        <Title
          level={5}
          className="mx-auto w-full px-4 !text-gray-500 lg:w-6/12 lg:px-8"
        >
          Các địa điểm tổ chức tiệc sinh nhật với LoveKids thật hoành tráng
        </Title>
      </div>
      <div className="container mx-auto mt-10">
        <Carousel autoplay autoplaySpeed={2000}>
          {venueList.map((venue, idx) => (
            <VenueCard key={idx} venue={venue} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default VenueCards;
