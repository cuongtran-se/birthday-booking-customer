"use client"
import { message } from 'antd';
import React from 'react'

interface MessageProviderProps {
    children: React.ReactNode
}
const MessageProvider: React.FC<MessageProviderProps> = ({children}) => {
    const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
    {contextHolder}
    {children}
    </>
  )
}

export default MessageProvider
