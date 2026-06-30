import { Flex, Text, Space } from "@mantine/core"
import ProjectCard from 'components/ProjectCard'
import { getProjectsInfo } from "utils/projects"

export default async function Page() {
  const projects = await getProjectsInfo();

  const projectCards = projects.map(project => {
    return project.hidden ? null : <ProjectCard projectInfo={project} key={project.route} />
  })

  return (
    <>
      <Text ta='center' >
        Take a look at some of my projects:
      </Text>
      <Space/>
      <Flex gap='lg' justify='center' align='center' direction='row' wrap='wrap' >
        {projectCards}
      </Flex>
      <Space/>
    </>
  )
}
