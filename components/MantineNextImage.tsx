'use client'

import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { Image as MantineImage, ImageProps as MantineImageProps } from '@mantine/core'

export default function MantineNextImage(props: NextImageProps & MantineImageProps) {
  return <MantineImage component={NextImage} {...props} />
}
