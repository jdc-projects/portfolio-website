import { Suspense } from "react"
import { Flex, Container, Space } from "@mantine/core"
import Sidebar, { navs } from "components/Sidebar"
import { getExperiencesInfo, ExperienceInfo } from "utils/experience"
import Collapse from "components/Collapse"

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
    <>
      <Space visibleFrom='sm' />
      <Flex direction='column' align='center' >
        <Container hiddenFrom='sm' miw={200} maw={300} >
          <Suspense fallback={null} >
            <Collapse buttonText="Navigation" >
              <Sidebar navs={navs} />
              <Space/>
            </Collapse>
          </Suspense>
        </Container>
        <Container>
          <Flex direction='row' >
            <Container visibleFrom='sm' miw={200} maw={300} >
              <Sidebar navs={navs} />
            </Container>
            <Container w={900} >
              <Space visibleFrom="sm" h={5} />
              <Flex direction='row' >
                <Space visibleFrom="sm" w={20} />
                <Container w='100%' >
                  {children}
                </Container>
              </Flex>
            </Container>
          </Flex>
        </Container>
      </Flex>
    </>
  )
}

function sortExperiences(experiences: Array<ExperienceInfo>): Array<ExperienceInfo> {
  const sortedExperiences: Array<ExperienceInfo> = []

  experiences.forEach(experience => {
    let isSorted = false

    for (let i = 0; (i < sortedExperiences.length) && !isSorted; i++) {
      const experienceStartYear = experience.startYear as unknown as number
      const sortedExperienceStartYear = sortedExperiences[i].startYear as unknown as number
      const experienceEndYear = experience.endYear !== null ? experience.endYear as unknown as number : 10000
      const sortedExperienceEndYear = sortedExperiences[i].endYear !== null ? sortedExperiences[i].endYear as unknown as number : 10000

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
