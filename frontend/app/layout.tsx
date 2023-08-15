// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import Header, { navs } from '../components/Header';
import Footer from '../components/Footer';

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
    name: 'Test',
    route: '/test/'
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Header navs={navs} />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
