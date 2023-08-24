import { Flex } from '@mantine/core'
import Image from 'components/Image'
import { Grid, GridCol } from 'components/Grid'

import Intro from './intro.mdx'
import WorkProfilePhoto from './work-profile-photo.jpg'

export default function Page() {
  return (
    <Grid>
      <GridCol span={7}>
        <Flex justify='left' direction='column' ><Intro /></Flex>
      </GridCol>
      <GridCol span={5}>
        <Image src={WorkProfilePhoto} alt="Work profile / professional style image of Jack" />
      </GridCol>
    </Grid>
  )
}
