import { imageUrlIfUndefined } from "@/utils/images";
import { EyeOutlined } from "@ant-design/icons";
import { ModalForm } from "@ant-design/pro-components";
import { Button, Card, Col, Flex, Image } from "antd";
import Meta from "antd/es/card/Meta";
import { PackageDataResponse } from "@/dtos/response/package.response";
import { BookingRequest } from "@/dtos/request/partyBooking.request";
import { SERVICE_ENUM } from "@/enums/service";
import PackageDetail from "./PackageDetail";

const PackageFoodCard = ({ pkg }: { pkg: PackageDataResponse }) => {
  const {
    id,
    active,
    packageDescription,
    packageImgUrl,
    packageName,
    packageServiceList,
    packageType,
    pricing,
    venue,
  } = pkg;

  return (
    packageType === SERVICE_ENUM.FOOD && (
      <Col span={6}>
        <Card
          hoverable
          style={{
            bottom: id === 111 ? 10 : 0,
            boxShadow:
              id === 111 ? "0 4px 8px rgba(153, 102, 255, 0.9)" : "unset",
          }}
          cover={
            <Image
              alt={packageName || "Chủ đề"}
              src={packageImgUrl || imageUrlIfUndefined}
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
            title={packageName || "Chủ đề"}
            description={`Giá: ${pricing} ` || "Giá"}
          />
          <Flex gap={10} align="center" className="mt-3">
            <ModalForm
              title="Chi tiết"
              trigger={
                <Button type="default" size="middle">
                  <EyeOutlined />
                  Chi tiết
                </Button>
              }
              style={{ padding: 0 }}
              onFinish={async () => {
                return true;
              }}
            >
              <PackageDetail packageInVenue={pkg} />
            </ModalForm>
          </Flex>
        </Card>
      </Col>
    )
  );
};

export default PackageFoodCard;
