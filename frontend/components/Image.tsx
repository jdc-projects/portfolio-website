import NextImage, { StaticImageData } from 'next/image'
import { Image as MantineImage } from '@mantine/core'

type ImageProps = {
  src: string | StaticImageData,
  alt: string,
  title?: string | undefined,
  width?: string | number | undefined,
}

export default function Image(props: ImageProps) {
  return <MantineImage component={NextImage} src={props.src} alt={props.alt} title={props.title} w={props.width} fallbackSrc="https://placehold.co/600x400?text=Placeholder" />
}
