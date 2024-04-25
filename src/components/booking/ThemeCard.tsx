import { ThemeInVenueDataResponse } from "@/dtos/response/theme.response";
import { imageUrlIfUndefined } from "@/utils/images";
import { EyeOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { Button, Card, Col, Flex, Image } from "antd";
import Meta from "antd/es/card/Meta";
import ThemeDetail from "./ThemeDetail";
import { BookingRequest } from "@/dtos/request/partyBooking.request";

const ThemeCard = ({
  themeInVenue,
  bookingData,
  setItem,
}: {
  themeInVenue: ThemeInVenueDataResponse;
  bookingData: BookingRequest | null;
  setItem: (themeInVenue: ThemeInVenueDataResponse) => void;
}) => {
  const { id, active, theme } = themeInVenue;

  return (
    <Col span={6}>
      {/* <Card
        hoverable
        style={{
          bottom: id === bookingData?.themeInVenueId ? 10 : 0,
          boxShadow:
            id === bookingData?.themeInVenueId
              ? "0 4px 8px rgba(153, 102, 255, 0.9)"
              : "unset",
        }}
        cover={
          <Image
            alt={theme?.themeName || "Chủ đề"}
            src={theme?.themeImgUrl || imageUrlIfUndefined}
            style={{
              width: "100%",
              height: 250,
              objectFit: "cover",
              // borderRadius: id === itemSelected ? 0 : 7,
            }}
          />
        }
      >
        <Meta
          title={theme?.themeName || "Chủ đề"}
          description={theme?.themeDescription || "Mô tar"}
        />
        <Flex gap={10} align="center" className="mt-3">
          <ModalForm
            title="Chi tiết"
            trigger={
              <Button type="default">
                <EyeOutlined />
                Chi tiết
              </Button>
            }
            style={{ padding: 0 }}
            onFinish={async () => {
              return true;
            }}
          >
            <ThemeDetail theme={theme} />
          </ModalForm>
          <Button
            type="primary"
            onClick={() => setItem(themeInVenue)}
            // className="mt-3"
          >
            {id === bookingData?.themeInVenueId ? "Đang chọn" : "Chọn"}
          </Button>
        </Flex>
      </Card> */}
    </Col>
  );
};

export default ThemeCard;
