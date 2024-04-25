"use client"
import React from "react";
import { Button, Result } from "antd";

const PaymentSuccessPage = () => {
  // Hàm xử lý khi người dùng nhấn nút "OK" để trở về trang trước
  const handleOkButtonClick = () => {};

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
        title="Thanh toán VN PAY thành công!"
        extra={[
          <Button type="primary" key="ok">
            OK
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccessPage;
