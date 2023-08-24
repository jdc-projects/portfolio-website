import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { Image as MantineImage, ImageProps as MantineImageProps } from '@mantine/core'
import sharp, { Metadata } from 'sharp'
import axios from 'axios'

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

async function getImageDimensions(src: string): Promise<Dimensions> {
  let image: any = undefined

  const isLocalPublicPath = (src.at(0) === '/')
  const isRemotePath = (src.slice(0, 4) === 'http')

  if (isLocalPublicPath) {
    image = 'public' + src
  } else if (isRemotePath) {
    image = (await axios({ url: src, responseType: "arraybuffer" })).data as Buffer;
  }

  const metadata: Metadata = await sharp(image).metadata()

  return {
    width: metadata.width,
    height: metadata.height,
  }
}
