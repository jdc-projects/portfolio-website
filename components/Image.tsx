import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { ImageProps as MantineImageProps } from '@mantine/core'
import MantineNextImage from 'components/MantineNextImage'
import sharp, { Metadata } from 'sharp'
import axios from 'axios'
import tunnel from 'tunnel'

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
    <MantineNextImage {...dimensions}
      placeholder={isFilePathImage && !isSvg ? 'blur' : 'empty'}
      unoptimized {...props} />
  )
}

async function getImageDimensions(src: string): Promise<Dimensions> {
  let image: string | Buffer

  const isLocalPublicPath = src.startsWith('/')

  if (isLocalPublicPath) {
    image = 'public' + src
  } else {
    try {
      const axiosConfig: any = { responseType: 'arraybuffer' }
      const proxyUrl = process.env.HTTP_PROXY || process.env.http_proxy
      if (proxyUrl) {
        const url = new URL(proxyUrl)
        axiosConfig.httpsAgent = tunnel.httpsOverHttp({
          proxy: { host: url.hostname, port: Number(url.port) }
        })
      }
      const response = await axios.get(src, axiosConfig)
      image = response.data as Buffer
    } catch (err) {
      if (process.env.NODE_ENV === 'production') {
        return { width: 600, height: 400 }
      }
      throw err
    }
  }

  const metadata: Metadata = await sharp(image).metadata()

  return {
    width: metadata.width,
    height: metadata.height,
  }
}
