// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "뉴뉴의 메모장",
  tagline: "뉴뉴의 메모장에 오신것을 환영합니다 ☺️",
  favicon: "img/favicon.ico",
  url: "https://devyuseon.github.io",
  baseUrl: "/",
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "devyuseon", // Usually your GitHub org/user name.
  projectName: "devyuseon.github.io", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          routeBasePath: "/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-47JM0E64J5",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/introduce.png",
      navbar: {
        title: "뉴뉴의 메모장",
        logo: {
          alt: "My Site Logo",
          src: "img/squirrel.png",
        },
        items: [
          // {
          //   type: "docSidebar",
          //   sidebarId: "tutorialSidebar",
          //   position: "left",
          //   label: "Tutorial",
          // },
          //{ to: "/blog", label: "Blog", position: "left" },
          { to: "/tags", label: "Tags", position: "left" },
          { to: "/archive", label: "Archive", position: "left" },

          // {
          //   href: "https://github.com/facebook/docusaurus",
          //   label: "GitHub",
          //   position: "right",
          // },
        ],
      },
      footer: {
        style: "dark",
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      sitemap: {
        changefreq: "daily",
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: [
          "java",
          "python",
          "javascript",
          "css",
          "docker",
          "git",
          "gradle",
          "http",
          "json",
          "mermaid",
          "nginx",
          "yaml",
          "bash",
        ],
      },
    }),
};

export default config;
