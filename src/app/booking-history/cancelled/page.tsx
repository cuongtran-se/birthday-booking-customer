"use client";

import { Button, Result } from "antd";
import React from "react";

const Cancelled = () => {
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
        title={`Thanh toán thất bại! Bữa tiệc này đã Bị huỷ`}
        extra={[
          <Button type="primary" key="ok" onClick={() => null}>
            OK
          </Button>,
        ]}
      />
    </div>
  );
};

export default Cancelled;
