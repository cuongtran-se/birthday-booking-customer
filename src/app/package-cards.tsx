"use client";

import AllVenue from "@/components/all-venues";
import CourseCard, {
  PackageCard,
} from "@/components/package-card/package-card";
import { getAllPackage } from "@/lib/features/action/package.action";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Typography } from "antd";
import { useEffect } from "react";
const { Title } = Typography;

const COURSES = [
  {
    img: "/image/package-basic-1.png",
    tag: "Sức chứa: từ 1 - 30 người",
    title: "Gói tiệc sinh nhật BASIC 1",
    label: "2 triệu VNĐ",
    desc: "Gói BASIC bao gồm các dịch vụ trang trí, thức ăn, chươn trình ca nhạc,.....",
  },
  {
    img: "/image/package-basic-1.png",
    tag: "Sức chứa: từ 1 - 30 người",
    title: "Gói tiệc sinh nhật BASIC 2",
    label: "2 triệu VNĐ",
    desc: "Gói BASIC bao gồm các dịch vụ trang trí, thức ăn, chươn trình ca nhạc,.....",
  },
  {
    img: "/image/package-basic-1.png",
    tag: "Sức chứa: từ 1 - 30 người",
    title: "Gói tiệc sinh nhật BASIC 3",
    label: "2 triệu VNĐ",
    desc: "Gói BASIC bao gồm các dịch vụ trang trí, thức ăn, chươn trình ca nhạc,.....",
  },
  {
    img: "/image/package-basic-1.png",
    tag: "Sức chứa: từ 1 - 50 người",
    title: "Gói tiệc sinh nhật VIP 1",
    label: "5 triệu VNĐ",
    desc: "Gói VIP bao gồm các dịch vụ trang trí, thức ăn, chươn trình ca nhạc,.....",
  },
  {
    img: "/image/package-basic-1.png",
    tag: "Sức chứa: từ 1 - 50 người",
    title: "Gói tiệc sinh nhật VIP 2",
    label: "5 triệu VNĐ",
    desc: "Gói VIP bao gồm các dịch vụ trang trí, thức ăn, chươn trình ca nhạc,.....",
  },
  {
    img: "/image/package-basic-1.png",
    tag: "Sức chứa: từ 1 - 50 người",
    title: "Gói tiệc sinh nhật VIP 3",
    label: "5 triệu VNĐ",
    desc: "Gói VIP bao gồm các dịch vụ trang trí, thức ăn, chươn trình ca nhạc,.....",
  },
];

export function PackageCards() {
  // ** Disptach API
  const dispatch = useAppDispatch();
  const venueList = useAppSelector((state) => state.venueReducer.venueList);
  // const fetchAllPackage = async () => {
  //   await dispatch(getAllPackage()).then((res) => {
  //     console.log(JSON.stringify(res, null, 2));
  //   });
  // };

  // useEffect(() => {
  //   fetchAllPackage();
  // }, []);

  return (
    <section className="px-0">
      <div className="text-center">
        <Title level={1} color="blue-gray">
          Tổng hợp các gói dịch vụ bữa tiệc
        </Title>
        <Title
          level={5}
          className="mx-auto w-full px-4 !text-gray-500 lg:w-6/12 lg:px-8"
        >
          Các địa điểm cung cấp các gói dịch vu có sẵn của bữa tiệc, khách hàng
          được quyền nâng cấp thêm các dịch vụ{" "}
        </Title>
      </div>
      <div className="container mx-auto mt-12">
        <AllVenue venueList={venueList} />
      </div>
    </section>
  );
}

export default PackageCards;
