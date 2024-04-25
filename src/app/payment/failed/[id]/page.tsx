"use client";
import { Button, Result } from "antd";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const FailPayment = ({ params }: { params: any }) => {
  const router = useRouter();

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
        status="error"
        title={`Thanh toán thất bại. Vui lòng thử lại!`}
        extra={[
          <Button type="primary" key="ok" onClick={handleOkButtonClick}>
            OK
          </Button>,
        ]}
      />
    </div>
  );
};

export default FailPayment;
