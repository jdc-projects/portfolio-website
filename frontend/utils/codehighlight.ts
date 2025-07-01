"use client"

import { createShikiAdapter } from '@mantine/code-highlight'

async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: ['tsx', 'ts', 'js', 'scss', 'html', 'bash', 'json'],
    themes: [],
  });

  return shiki;
}

export const codeHighlightAdapter = createShikiAdapter(loadShiki);
