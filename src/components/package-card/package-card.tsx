import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import Image from "next/image";
import "./package-card.css";
import { Button, Flex, Typography } from "antd";
import { PackageDataResponse } from "@/dtos/response/package.response";
import { ModalForm } from "@ant-design/pro-components";
import { EyeOutlined } from "@ant-design/icons";
import PackageDetail from "../booking/PackageDetail";

export function PackageCard({ pkg }: { pkg: PackageDataResponse }) {
  return (
    <Card placeholder="" className="package-card border">
      <CardHeader placeholder="" className="h-64">
        <Image
          width={768}
          height={768}
          src={pkg?.packageImgUrl || ""}
          alt={pkg?.packageName}
          className="h-full w-full scale-[1.1] object-cover"
        />
      </CardHeader>
      <CardBody className="p-4 pb-6" placeholder="">
        <div className="flex items-center gap-2">
          <Typography.Title
            level={4}
            color="blue"
            className="mt-0 font-normal text-gray-500"
          >
            {pkg?.packageName}
          </Typography.Title>
        </div>
        <div>
          <Typography className="mb-6 font-normal !text-gray-500">
            {pkg?.packageDescription}
          </Typography>
        </div>

        <Flex gap={10}>
          <Button type="default" size="large" danger>
            {pkg?.pricing?.toLocaleString() + " VNĐ"}
          </Button>
          <ModalForm
          title="Chi tiết"
          trigger={
            <Button type="default" size="large">
              <EyeOutlined />
              Chi tiết
            </Button>
          }
          style={{ padding: 0 }}
          onFinish={async () => {
            return true
          }}
        >
          <PackageDetail packageInVenue={pkg} />
        </ModalForm>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default PackageCard;
