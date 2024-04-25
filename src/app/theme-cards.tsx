"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllTheme } from "@/lib/features/action/theme.action";
import { useEffect } from "react";
import ThemeCard from "@/components/theme-card";
import { Typography } from "antd";
const { Title } = Typography;

export function ThemeCards() {
  // ** Disptach API
  const dispatch = useAppDispatch();
  const themeList = useAppSelector((state) => state.themeReducer.themeList);
  const fetchAllTheme = async () => {
    await dispatch(getAllTheme()).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  useEffect(() => {
    fetchAllTheme();
  }, []);

  return (
    <section className="px-0">
      <div className="text-center">
        <Title level={1} color="blue-gray">
          Tổng hợp các chủ đề trang trí cho bữa tiệc
        </Title>
        <Title
          level={5}
          className="mx-auto w-full px-4 !text-gray-500 lg:w-6/12 lg:px-8"
        >
          Các địa điểm cung cấp dịch vụ trang trí có sẵn trong các gói bữa tiệc,
          khách hàng được quyền lựa chọn chủ đề theo sở thích của bé{" "}
        </Title>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
        {themeList?.map((theme, idx) => (
          <ThemeCard key={idx} theme={theme} />
        ))}
      </div>
    </section>
  );
}

export default ThemeCards;
