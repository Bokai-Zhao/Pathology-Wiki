import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'Pathology-Wiki',
  tagline: 'An agent-extensible knowledge base for computational pathology',
  favicon: 'img/favicon.ico',

  // GitHub Pages deployment
  url: 'https://bokai-zhao.github.io',
  baseUrl: '/Pathology-Wiki/',
  organizationName: 'Bokai-Zhao',
  projectName: 'Pathology-Wiki',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'content',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/social-card.png',
    navbar: {
      title: 'Pathology-Wiki',
      items: [
        {to: '/', label: 'Home', position: 'left'},
        {to: '/articles/technical/uni-2024', label: 'Articles', position: 'left'},
        {to: '/methods', label: 'Methods', position: 'left'},
        {to: '/tools/openslide', label: 'Tools', position: 'left'},
        {to: '/datasets/panda', label: 'Datasets', position: 'left'},
        {to: '/benchmarks', label: 'Benchmarks', position: 'left'},
        {to: '/skills', label: 'Skills', position: 'left'},
        {to: '/graph', label: 'Graph', position: 'left'},
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Pathology-Wiki ${new Date().getFullYear()} · Maintained with Claude Code.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
