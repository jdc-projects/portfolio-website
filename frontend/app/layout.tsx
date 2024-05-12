// css files for Mantine packages must be imported here
import '@mantine/core/styles.css'
import '@mantine/code-highlight/styles.css'

// fix for the width of the page always being slightly greater than 100%
import './width-fix.css'

import { MantineProvider, ColorSchemeScript, Container, Space, Divider } from '@mantine/core'
import { Roboto_Flex } from 'next/font/google'
import DesktopHeader from 'components/DesktopHeader'
import type { navs } from 'components/DesktopHeader'
import MobileHeader from 'components/MobileHeader'
import Footer from 'components/Footer'

const font = Roboto_Flex({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Jack Chapman',
  description: "Jack Chapman's portfolio website.",
}

const navs: navs = [
  {
    name: 'Home',
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
    <html lang='en'>
      <head>
        <ColorSchemeScript defaultColorScheme='light' />
      </head>
      <body>
        <MantineProvider defaultColorScheme='light' theme={{
          fontFamily: font.style.fontFamily,

          defaultRadius: 'md',

          headings: {
            fontWeight: '400',
            fontFamily: font.style.fontFamily,
          },

          components: {
            Container: {
              defaultProps: {
                m: 0,
                p: 0,
                fluid: true,
              },
            },
            Image: {
              defaultProps: {
                fit: 'contain',
                h: 'auto',
                radius: 'md',
                fallbackSrc: 'https://placehold.co/600x400?text=Placeholder',
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
            ListItem: {
              defaultProps: {
                ml: 10,
                mr: 20,
              }
            }
          },
        }} >
          <Container mih='100%' pos='relative' >
            <Space />
            <header>
              <Container visibleFrom='sm' >
                <DesktopHeader navs={navs} />
              </Container>
              <Container hiddenFrom='sm' >
                <MobileHeader navs={navs} />
              </Container>
            </header>
            <Space />
            <Divider />
            <Space h='lg' />
            <Container px={20} >
              {children}
            </Container>
            <Space />
            <Footer />
          </Container>
        </MantineProvider>
      </body>
    </html>
  )
}
