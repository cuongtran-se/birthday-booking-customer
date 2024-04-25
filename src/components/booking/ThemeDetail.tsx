import { ThemeDataResponse } from '@/dtos/response/theme.response'
import { Card, Image, Typography } from 'antd'
import React from 'react'
const { Meta } = Card

const ThemeDetail = ({ theme }: { theme?: ThemeDataResponse }) => {
  return (
    <>
      <Image alt='example' src={theme?.themeImgUrl} width={'100%'} height={350} style={{ objectFit: 'cover' }} />
      <Typography.Title level={3}>{theme?.themeName}</Typography.Title>
      <Typography.Title level={5}>{theme?.themeDescription}</Typography.Title>

    </>
  )
}

export default ThemeDetail
