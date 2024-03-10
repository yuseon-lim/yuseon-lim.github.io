import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', 'b51'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '571'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'ac8'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'a39'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '8ad'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '39b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '27f'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'f98'),
    exact: true
  },
  {
    path: '/blog/2024/01/02/java-no-stacktrace',
    component: ComponentCreator('/blog/2024/01/02/java-no-stacktrace', 'a65'),
    exact: true
  },
  {
    path: '/blog/2024/01/29/first-opensearch-contribute-docker-compose',
    component: ComponentCreator('/blog/2024/01/29/first-opensearch-contribute-docker-compose', '608'),
    exact: true
  },
  {
    path: '/blog/2024/02/04/troubleshooting-express-no-response',
    component: ComponentCreator('/blog/2024/02/04/troubleshooting-express-no-response', 'cda'),
    exact: true
  },
  {
    path: '/blog/2024/02/13/2023-retrospect',
    component: ComponentCreator('/blog/2024/02/13/2023-retrospect', '7dd'),
    exact: true
  },
  {
    path: '/blog/2024/03/11/design-access-control-strategy',
    component: ComponentCreator('/blog/2024/03/11/design-access-control-strategy', 'f13'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '0ae'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '679'),
    exact: true
  },
  {
    path: '/blog/tags/design',
    component: ComponentCreator('/blog/tags/design', '1fe'),
    exact: true
  },
  {
    path: '/blog/tags/docker',
    component: ComponentCreator('/blog/tags/docker', '80b'),
    exact: true
  },
  {
    path: '/blog/tags/express',
    component: ComponentCreator('/blog/tags/express', '73e'),
    exact: true
  },
  {
    path: '/blog/tags/java',
    component: ComponentCreator('/blog/tags/java', '0fb'),
    exact: true
  },
  {
    path: '/blog/tags/nginx',
    component: ComponentCreator('/blog/tags/nginx', '3ab'),
    exact: true
  },
  {
    path: '/blog/tags/opensource-contributions',
    component: ComponentCreator('/blog/tags/opensource-contributions', '309'),
    exact: true
  },
  {
    path: '/blog/tags/retrospect',
    component: ComponentCreator('/blog/tags/retrospect', '4a6'),
    exact: true
  },
  {
    path: '/blog/tags/troubleshooting',
    component: ComponentCreator('/blog/tags/troubleshooting', '6fa'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '821'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '531'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
