// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'
import '@mantine/code-highlight/styles.css'

import { MantineProvider, ColorSchemeScript, Container, Center, Space, Divider } from '@mantine/core'
import { Roboto } from 'next/font/google'
import Header, { navs } from 'components/Header'
import Footer from 'components/Footer'

const font = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
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
          },
        }} >
          <Container mih='100%' pos='relative' >
            <Space />
            <Header navs={navs} />
            <Space />
            <Divider />
            <Space />
            <Center >
              <Container px='md' mx='xl' >
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
