"use client"
import { Button, Result } from 'antd'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

const FailPayment = () => {
  const router = useRouter()
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
        title={`Thanh toán thất bại`}
        extra={[
          <Button type="primary" key="ok" onClick={() => redirect('/booking-history')}>
            OK
          </Button>,
        ]}
      />
    </div>
  )
}

export default FailPayment
