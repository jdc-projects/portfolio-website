"use client"

import { createShikiAdapter } from '@mantine/code-highlight'

async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: [
      'js',
    ],
    themes: [],
  });

  return shiki;
}

export const codeHighlightAdapter = createShikiAdapter(loadShiki);
