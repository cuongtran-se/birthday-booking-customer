"use client"
import React from "react";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

const PaymentSuccessPage = ({ params }: { params: any }) => {
  const router = useRouter();
  // Hàm xử lý khi người dùng nhấn nút "OK" để trở về trang trước
  const handleOkButtonClick = () => {
    router.push(`/booking-history/${params?.id}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 500,
      }}
    >
      <Result
        status="success"
        title={`Thanh toán thành công cho booking ID "${params?.id}" qua cổng VN PAY`}
        extra={[
          <Button type="primary" key="ok" onClick={handleOkButtonClick}>
            OK
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccessPage;
