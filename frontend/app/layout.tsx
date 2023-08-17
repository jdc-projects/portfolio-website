// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider, ColorSchemeScript, Container, Center, Paper } from '@mantine/core';
import Header, { navs } from '../components/Header';
import Footer from '../components/Footer';

const mantineTheme = {
  components: {
    Image: {
      defaultProps: {
        fit: "contain",
        h: "auto",
        radius: "md",
      }
    },
    Paper: {
      defaultProps: {
        shadow: "md",
        p: "md",
        w: 1000,
      }
    },
  }
}

export const metadata = {
  title: 'Personal Website',
  description: 'A personal website built using Next.js',
};

const navs: navs = [
  {
    name: 'Home',
    route: '/'
  },
  {
    name: 'About',
    route: '/about/'
  },
  {
    name: 'Experience',
    route: '/experience/'
  },
  {
    name: 'Projects',
    route: '/projects/'
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={mantineTheme}>
          <Container mih="100%" pos="relative" >
            <Header navs={navs} />
            <Center >
              <Paper >
                {children}
              </Paper>
            </Center>
            <Footer />
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
