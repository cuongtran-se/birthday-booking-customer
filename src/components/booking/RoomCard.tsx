"use client";
import { blue } from "@ant-design/colors";
import {
  Avatar,
  Card,
  Flex,
  Image,
  Popover,
  Space,
  Tag,
  Typography,
} from "antd";
import Meta from "antd/es/card/Meta";
import { ClockCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { VenueDataResponse } from "@/dtos/response/venue.response";
import { RoomDataResponse } from "@/dtos/response/room.response";
import { BookingDataDisplay } from "@/app/booking/[venueId]/page";
import { BookingRequest } from "@/dtos/request/partyBooking.request";
const RoomCard = ({
  room,
  bookingData,
  setBookingData,
  bookingDataDisplay,
  setBookingDataDisplay,
}: {
  room: RoomDataResponse;
  bookingData?: BookingRequest | null;
  setBookingData: React.Dispatch<React.SetStateAction<BookingRequest | null>>;
  bookingDataDisplay?: BookingDataDisplay | null;
  setBookingDataDisplay: React.Dispatch<
    React.SetStateAction<BookingDataDisplay | null>
  >;
}) => {
  const {
    active,
    capacity,
    createAt,
    deleteAt,
    id,
    pricing,
    roomImgUrl,
    roomName,
    slotInRoomList,
    updateAt,
    venueInfo,
  } = room;

  const { street, ward, district, city } = venueInfo;

  return (
    <Card className="shadow-md" style={{ marginTop: 16 }}>
      <Meta
        avatar={
          <Image
            style={{ width: 256, height: 256, borderRadius: 10 }}
            src={roomImgUrl}
          />
        }
        title={
          <Typography.Title level={2} style={{ margin: 0, letterSpacing: 2 }}>
            {roomName}
          </Typography.Title>
        }
        description={
          <Space direction="vertical">
            <div>Sức chứa: {capacity}</div>
            <div>Địa chỉ: {`${street}, ${ward}, ${district}, ${city}`}</div>
            <div style={{ width: 700 }}>
              <Popover content={<div style={{ width: 900 }}>{roomName}</div>}>
                <Flex style={{ width: "100%" }} gap={3}>
                  <PlusCircleOutlined style={{ color: blue[5] }} />
                  <span className="text-blue-500">Description</span>
                </Flex>
              </Popover>
            </div>

            <Flex vertical gap={5}>
              <Typography.Title level={5}>Time Slots:</Typography.Title>
              <Space direction="horizontal">
                {slotInRoomList.map((slotInRoom, index: number) =>
                  slotInRoom?.status === true ? (
                    <Tag
                      key={index}
                      icon={<ClockCircleOutlined />}
                      color="error"
                      style={{ padding: "4px 6px" }}
                    >
                      In Use
                    </Tag>
                  ) : (
                    <Tag
                      onClick={() => {
                        setBookingData((prev) => ({
                          ...prev,
                          slotInRoomId: slotInRoom?.id,
                        }));
                        setBookingDataDisplay((prev) => ({
                          ...prev,
                          room,
                          slotInRoom,
                          venue: venueInfo,
                        }));
                      }}
                      key={index}
                      
                      icon={<ClockCircleOutlined />}
                      color={
                        slotInRoom?.id === bookingData?.slotInRoomId
                          ? "gold-inverse"
                          : "cyan"
                      }
                      style={{ padding: "4px 6px" }}
                    >
                      {slotInRoom?.slot?.timeStart.substring(0, 5)} -{" "}
                      {slotInRoom?.slot?.timeEnd.substring(0, 5)}
                    </Tag>
                  ),
                )}
              </Space>
            </Flex>
          </Space>
        }
      />
    </Card>
  );
};

export default RoomCard;
