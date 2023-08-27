import { Flex } from '@mantine/core'
import Image from 'components/Image'
import { Grid, GridCol } from 'components/Grid'
import { join } from 'path'
import ReactMarkdown from 'react-markdown'
import { defaultComponents } from 'utils/markdown'
import { fixLocalPath } from 'utils/filepath'
import { readLocalFile } from 'utils/markdown'

import WorkProfilePhoto from './work-profile-photo.jpg'

export default async function Page() {
  const intro = (await readLocalFile(fixLocalPath(join(__dirname, 'intro.md')))).content

  return (
    <Grid>
      <GridCol span={7}>
        <Flex justify='left' direction='column' ><ReactMarkdown components={defaultComponents} >{intro}</ReactMarkdown></Flex>
      </GridCol>
      <GridCol span={5}>
        <Image src={WorkProfilePhoto} alt="Work profile / professional style image of Jack" />
      </GridCol>
    </Grid>
  )
}
