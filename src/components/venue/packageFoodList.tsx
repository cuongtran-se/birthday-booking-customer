"use client";;
import { Row, Typography } from "antd";
import { PackageDataResponse } from "@/dtos/response/package.response";
import PackageFoodCard from "./PackageFoodCard";

const { Title } = Typography;

export function PackageFoodList({
  packageFoodList,
}: {
  packageFoodList: PackageDataResponse[];
}) {
  return (
    <Row gutter={[16, 16]}>
      {packageFoodList.map((pkg: PackageDataResponse, idx: number) => (
        <PackageFoodCard key={idx} pkg={pkg} />
      ))}
    </Row>
  );
}

export default PackageFoodList;
