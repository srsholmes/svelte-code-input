import type highlightjs from 'highlight.js';
import type Prism from 'prismjs';

export type Props = {
  prismJS?: typeof Prism;
  highlightjs?: typeof highlightjs;
  value: string;
  language: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  autoHeight?: boolean;
};
