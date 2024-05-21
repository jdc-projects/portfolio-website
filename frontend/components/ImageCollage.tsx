import Image, { ImageProps } from 'components/Image'
import { Grid, GridCol } from '@mantine/core'

type ImageCollageProps = {
  imagesProps: Array<ImageProps>
}

export default function ImageCollage(props: ImageCollageProps) {
  const Images = props.imagesProps.map( imageProps => {
    return (
      <GridCol span={4} key={imageProps.alt} >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image {...imageProps} radius={0} />
      </GridCol>
    )
  })

  return (
    <Grid my={20} mx={20} justify='center' align='center' gutter={{ base: 30 }} >
      {Images}
    </Grid>
  )
}
