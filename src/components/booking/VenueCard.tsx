import "./VenueCard.css";
import { blue } from "@ant-design/colors";
import { Avatar, Card, Flex, Popover, Space, Tag, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { ClockCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { VenueDataResponse } from "@/dtos/response/venue.response";
import { BookingRequest } from "@/dtos/request/partyBooking.request";
const VenueCard = ({
  venue,
  bookingData,
  setItem,
}: {
  venue: VenueDataResponse;
  bookingData?: BookingRequest | null;
  setItem?: ({
    venue,
    slotInRoom,
  }: {
    venue: VenueDataResponse;
    slotInRoom: any;
  }) => void;
}) => {
  const {
    venueName,
    venueImgUrl,
    active,
    id,
    venueDescription,
    account,
    city,
    district,
    street,
    ward,
    roomList,
  } = venue;

  return (
    <Card className="shadow-md" style={{ marginTop: 16 }}>
      <Meta
        avatar={<Avatar shape="square" size={256} src={venueImgUrl} />}
        title={venueName}
        description={
          <Space direction="vertical">
            <div>Capacity: {"capacity"}</div>
            <div>Location: {"location"}</div>
            <div style={{ width: 700 }}>
              <Popover
                content={<div style={{ width: 900 }}>{venueDescription}</div>}
              >
                <Flex style={{ width: "100%" }} gap={3}>
                  <PlusCircleOutlined style={{ color: blue[5] }} />
                  <span className="text-blue-500">Description</span>
                </Flex>
              </Popover>
            </div>

            <Flex vertical gap={5}>
              <Typography.Title level={5}>Time Slots:</Typography.Title>
              <Space direction="horizontal">
                {roomList.map((slotInRoomId, index: number) =>
                  slotInRoomId?.active === true ? (
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
                        // setItem({ venue, slotInVenue });
                      }}
                      key={index}
                      icon={<ClockCircleOutlined />}
                      color={
                        slotInRoomId?.id === bookingData?.slotInRoomId
                          ? "gold-inverse"
                          : "cyan"
                      }
                      style={{ padding: "4px 6px" }}
                    >
                      {/* {slotInVenue?.slot?.timeStart.substring(0, 5)} -{" "}
                      {slotInVenue?.slot?.timeEnd.substring(0, 5)} */}
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

export default VenueCard;
