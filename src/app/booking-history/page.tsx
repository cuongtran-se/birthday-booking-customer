"use client";
import { getAllBooking } from "@/lib/features/action/partyBooking.action";
import { getAllVenue } from "@/lib/features/action/venue.action";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Avatar,
  Card,
  Carousel,
  Empty,
  Flex,
  Image,
  Popover,
  Space,
  Typography,
} from "antd";
import Meta from "antd/lib/card/Meta";
import Link from "next/link";
import { useEffect } from "react";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const BookingHistory = () => {
  // ** Disptach API
  const dispatch = useAppDispatch();
  const venueList = useAppSelector((state) => state.venueReducer.venueList);
  const bookingList = useAppSelector(
    (state) => state.partyBookingReducer.bookingList,
  );

  const fetchAllVenue = async () => {
    await dispatch(getAllVenue()).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  const fetchAllBooking = async () => {
    await dispatch(getAllBooking()).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  const fetchInQueue = async () => {
    fetchAllBooking();
    fetchAllVenue();
  };

  useEffect(() => {
    fetchInQueue();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <div className="mx-auto max-w-5xl">
        <Typography.Title level={2}>Lịch sử đặt chỗ</Typography.Title>
        {/* <Carousel className="rounded-xl shadow" autoplay>
          {venueList.map((item, index) => (
            <div className="rounded-xl" style={{ overflow: "hidden" }}>
              <img
                src={item?.venueImgUrl ?? ""}
                alt="carousel image"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
            </div>
          ))}
        </Carousel> */}
        {bookingList && bookingList?.length > 0 ? (
          bookingList?.map((item, index) => (
            <Link href={`/booking-history/${item?.id}`}>
              <Card key={index} className="shadow-md" style={{ marginTop: 16 }}>
                <Flex align="center" justify="space-between">
                  <Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size={112}
                        src={item?.venueObject?.venueImgUrl}
                      />
                    }
                    title={`${item?.venueObject?.venueName} - ${item?.venueObject?.district}`}
                    description={
                      <Space direction="vertical" size={"middle"}>
                        <div>{`Thời gian: ${item?.slotInRoom?.slot?.timeStart} - ${item?.slotInRoom?.slot?.timeEnd}, ${item?.date}`}</div>
                        {item?.status === "PENDING" ? (
                          <div className="text-blue-300">Đang chờ xác nhận</div>
                        ) : item?.status === "CANCELLED" ? (
                          <div className="text-red-300">Đã huỷ</div>
                        ) : item?.status === "COMPLETED" ? (
                          <div className="text-green-300">Đã hoàn thành</div>
                        ) : (
                          <div className="text-orange-300">
                            Đã được xác nhận
                          </div>
                        )}
                      </Space>
                    }
                  />
                  <Typography.Title
                    style={{ alignSelf: "flex-end", margin: 0 }}
                    level={3}
                  >
                    {item?.totalPrice?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography.Title>
                </Flex>
              </Card>
            </Link>
          ))
        ) : (
          <Empty
            className="mt-10"
            description="Bạn hiện chưa có một booking nào"
          />
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
