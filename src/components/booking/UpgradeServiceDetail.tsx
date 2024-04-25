import { DataUpgradeDisplay } from "@/app/booking/[venueId]/page";
import { Card, Flex, Image, Space, Typography } from "antd";
import React from "react";

const UpgradeServiceDetail = ({
  dataUpgrade,
  totalPriceSerivce,
}: {
  dataUpgrade?: DataUpgradeDisplay[] | [];
  totalPriceSerivce?: number;
}) => {
  return (
    <Flex className="mt-5" justify="space-between" align="flex-start" gap={30}>
      <Space className="w-1/2" direction="vertical">
        {dataUpgrade?.map((item, index) => {
          return (
            <Card key={index} bodyStyle={{ padding: 15 }}>
              <Flex gap={20}>
                <Image
                  width={75}
                  height={75}
                  style={{ borderRadius: 5 }}
                  src={item?.service?.serviceImgUrl}
                />
                <div>
                  <div>
                    Tên dịch vụ: <strong>{item?.service?.serviceName}</strong>
                  </div>
                  <div>
                    Số lượng: <strong>{item?.count}</strong>
                  </div>
                  <div>
                    Giá:{" "}
                    <strong>
                      {(item?.service?.pricing * item?.count).toLocaleString(
                        "vi-VN",
                        { style: "currency", currency: "VND" },
                      )}
                    </strong>
                  </div>
                </div>
              </Flex>
            </Card>
          );
        })}
      </Space>
      <div className="w-1/2">
        <React.Fragment>
          <Flex align="center" justify="space-between" gap={10}>
            <Typography className="">Tổng cộng: </Typography>
            <Typography.Title style={{ margin: 0 }} level={4}>
              {totalPriceSerivce?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography.Title>
          </Flex>
        </React.Fragment>
      </div>
    </Flex>
  );
};

export default UpgradeServiceDetail;
