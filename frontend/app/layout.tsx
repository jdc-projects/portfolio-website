// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'
import '@mantine/code-highlight/styles.css'

import { MantineProvider, MantineTheme, DEFAULT_THEME, ColorSchemeScript, Container, Center, Paper, Space, Divider } from '@mantine/core'
import Header, { navs } from 'components/Header'
import Footer from 'components/Footer'

const mantineTheme: MantineTheme = {
  ...DEFAULT_THEME,

  defaultRadius: 'md',

  components: {
    Container: {
      defaultProps: {
        m: 0,
        p: 0,
      },
    },
    Image: {
      defaultProps: {
        fit: "contain",
        h: "auto",
        radius: "md",
        fallbackSrc: "https://placehold.co/600x400?text=Placeholder",
      },
    },
    Space: {
      defaultProps: {
        h: 'md'
      },
    },
    Button: {
      defaultProps: {
        size: 'md'
      },
    },
  },
}

export const metadata = {
  title: 'Personal Website',
  description: 'A personal website built using Next.js',
}

const navs: navs = [
  {
    name: 'About',
    route: '/'
  },
  {
    name: 'Experience',
    route: '/experience'
  },
  {
    name: 'Projects',
    route: '/projects'
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="light" theme={mantineTheme} >
          <Container mih="100%" pos="relative" >
            <Space />
            <Header navs={navs} />
            <Space />
            <Divider />
            <Space />
            <Center >
              <Container w={1200} miw={1200} px='md' mx='xl' >
                <Space />
                {children}
                <Space />
              </Container>
            </Center>
            <Footer />
          </Container>
        </MantineProvider>
      </body>
    </html>
  )
}
