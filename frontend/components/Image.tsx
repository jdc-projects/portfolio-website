import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { Image as MantineImage, ImageProps as MantineImageProps } from '@mantine/core'
import sharp, { Metadata } from 'sharp'
import axios from 'axios'
import { assert } from 'console'

export type ImageProps = NextImageProps & MantineImageProps & {
  alt: string,
}

type Dimensions = {
  width: number | undefined,
  height: number | undefined,
}

export default async function Image(props: ImageProps) {
  const isFilePathImage = props.src.src !== undefined
  const isSvg = isFilePathImage ? props.src.src.endsWith('.svg') : false
  const dimensions : Dimensions = isFilePathImage ? {width: props.src.width, height: props.src.height} : await getImageDimensions(props.src)

  return (
    <MantineImage component={NextImage} {...dimensions}
      placeholder={isFilePathImage && !isSvg ? 'blur' : 'empty'}
      unoptimized {...props} />
  )
}

async function getImageDimensions(src: string): Promise<Dimensions> {
  let image: string | Buffer

  const isLocalPublicPath = (src.at(0) === '/')
  const isRemotePath = (src.slice(0, 4) === 'http')

  if (isLocalPublicPath) {
    image = 'public' + src
  } else {
    assert(isRemotePath)
    image = (await axios({ url: src, responseType: "arraybuffer" })).data as Buffer;
  }

  const metadata: Metadata = await sharp(image).metadata()

  return {
    width: metadata.width,
    height: metadata.height,
  }
}
