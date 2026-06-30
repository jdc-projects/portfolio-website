import { Suspense } from "react"
import { Flex, Container, Space } from "@mantine/core"
import Sidebar, { navs } from "components/Sidebar"
import { getExperiencesInfo, ExperienceInfo } from "utils/experience"
import MobileSidebar from "components/MobileSidebar"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const experiences = sortExperiences(await getExperiencesInfo())

  const navs: navs = experiences.map(experience => {
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
    }

    return {
      name: experience.title,
      route: experience.route,
      description: experience.company + ', ' + experience.startDate.toLocaleDateString('en-UK', dateFormatOptions) + ' - ' + (!(experience.endDate) ? 'Present' : (experience.endDate.toLocaleDateString('en-UK', dateFormatOptions)))
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
            <MobileSidebar navs={navs} />
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
  experiences.sort((a, b) => {
    if (!(b.endDate)) {
      return 1
    } else if (!(a.endDate)) {
      return -1
    } else if (b.endDate.getTime() !== a.endDate.getTime()){
      return b.endDate.getTime() - a.endDate.getTime()
    } else {
      return b.startDate.getTime() - a.startDate.getTime()
    }
  })

  return experiences
}
