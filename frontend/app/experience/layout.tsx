import { Flex } from "@mantine/core"
import { Grid, GridCol } from "components/Grid"
import Anchor from "components/Anchor"
import { getExperiencesInfo } from "utils/experience"

export default async function Layout({ children }: { children: React.ReactNode }) {
  let experienceMenu = (await getExperiencesInfo()).map(experience => {
    return <Anchor href={experience.route} key={experience.name} >{experience.title}</Anchor>
  })

  return (
    <>
      <Grid>
        <GridCol span={3}>
          <Flex direction='column' >
            <Anchor href='/experience' >Summary</Anchor>
            {experienceMenu}
          </Flex>
        </GridCol>
        <GridCol span={9}>
          {children}
        </GridCol>
      </Grid>
    </>
  )
}
