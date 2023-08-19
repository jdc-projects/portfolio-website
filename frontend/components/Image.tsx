import NextImage from 'next/image'
import { Image as MantineImage, ImageProps as MantineImageProps } from '@mantine/core'

type ImageProps = MantineImageProps & {
  alt: string,
}

export default function Image(props: ImageProps) {
  return <MantineImage component={NextImage} {...props} />
}
