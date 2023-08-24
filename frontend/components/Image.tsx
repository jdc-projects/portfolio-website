import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { Image as MantineImage, ImageProps as MantineImageProps } from '@mantine/core'
import sharp from 'sharp'

type ImageProps = NextImageProps & MantineImageProps & {
  alt: string,
}

type Dimensions = {
  width: number | undefined,
  height: number | undefined,
}

export default async function Image(props: ImageProps) {
  const dimensions : Dimensions = (props.src.src === undefined) ? await getImageDimensions(props.src) : {width: props.src.width, height: props.src.height}

  return <MantineImage component={NextImage} {...props} width={dimensions.width} height={dimensions.height} />
}

async function getImageDimensions(src: string) {
  let dimensions : Dimensions = {
    width: undefined,
    height: undefined,
  }

  const isLocalPublicPath = (src.at(0) === '/')

  if (isLocalPublicPath) {
    const filepath = 'public' + src
    const metadata = await sharp(filepath).metadata()

    dimensions = {
      width: metadata.width,
      height: metadata.height,
    }
  }

  return dimensions
}
