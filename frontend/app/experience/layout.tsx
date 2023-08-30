import { Flex, Container } from "@mantine/core"
import { Grid, GridCol } from "components/Grid"
import Sidebar, { navs } from "components/Sidebar"
import { getExperiencesInfo } from "utils/experience"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const experiences = await getExperiencesInfo()

  const navs: navs = (await getExperiencesInfo()).map(experience => {
    return {
      name: experience.title,
      route: experience.route,
    }
  })
  navs.unshift({
    name: 'Summary',
    route: '/experience',
  })

  return (
    <Grid>
      <GridCol span={3}>
        <Flex direction='column' >
          <Sidebar navs={navs} />
        </Flex>
      </GridCol>
      <GridCol span={9}>
        <Container ml={20} >
          {children}
        </Container>
      </GridCol>
    </Grid>
  )
}
