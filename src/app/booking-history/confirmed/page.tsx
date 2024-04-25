"use client";
import { Button, Result } from "antd";
import React from "react";

const Confirmed = () => {
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
        title={`Thanh toán thất bại! Bữa tiệc này đã được Xác nhận`}
        extra={[
          <Button type="primary" key="ok" onClick={() => null}>
            OK
          </Button>,
        ]}
      />
    </div>
  );
};

export default Confirmed;
