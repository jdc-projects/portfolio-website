import { Flex, Container } from "@mantine/core"
import { Grid, GridCol } from "components/Grid"
import Sidebar, { navs } from "components/Sidebar"
import { getExperiencesInfo, ExperienceInfo } from "utils/experience"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const experiences = sortExperiences(await getExperiencesInfo())

  const navs: navs = experiences.map(experience => {
    return {
      name: experience.title,
      route: experience.route,
      description: experience.company + ', ' + experience.startYear as unknown as string + '-' + (experience.endYear === null ? 'present' : experience.endYear as unknown as string)
    }
  })
  navs.unshift({
    name: 'Summary',
    route: '/experience',
  })

  return (
    <Grid>
      <GridCol span={4}>
        <Flex direction='column' >
          <Sidebar navs={navs} />
        </Flex>
      </GridCol>
      <GridCol span={8}>
        <Container ml={20} >
          {children}
        </Container>
      </GridCol>
    </Grid>
  )
}

function sortExperiences(experiences: Array<ExperienceInfo>): Array<ExperienceInfo> {
  const sortedExperiences: Array<ExperienceInfo> = []

  experiences.forEach(experience => {
    let isSorted = false

    // all of this is horrible, there has to be a nicer way to do this
    for (let i = 0; (i < sortedExperiences.length) && !isSorted; i++) {
      const sortedExperience = sortedExperiences[i]
      const experienceStartYear = experience.startYear as unknown as number
      const sortedExperienceStartYear = sortedExperience.startYear as unknown as number
      const experienceEndYear = experience.endYear !== null ? experience.endYear as unknown as number : 10000
      const sortedExperienceEndYear = sortedExperience.endYear !== null ? sortedExperience.endYear as unknown as number : 10000

      if (experienceEndYear > sortedExperienceEndYear) {
        sortedExperiences.splice(i, 0, experience)
        isSorted = true
      } else if (experienceEndYear === sortedExperienceEndYear) {
        // if we have nothing to differentiate them just put it here
        if (experienceStartYear >= sortedExperienceStartYear) {
          sortedExperiences.splice(i, 0, experience)
          isSorted = true
        }
      }
    }

    // if the experience hasn't been put in the sorted array by now, that means it needs to go at the end
    if (!isSorted) {
      sortedExperiences.push(experience)
    }
  })

  return sortedExperiences
}
