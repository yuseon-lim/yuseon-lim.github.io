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
    path: '/archive',
    component: ComponentCreator('/archive', '623'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '821'),
    exact: true
  },
  {
    path: '/migration-to-docusaurus',
    component: ComponentCreator('/migration-to-docusaurus', '0ac'),
    exact: true
  },
  {
    path: '/tags',
    component: ComponentCreator('/tags', '0a8'),
    exact: true
  },
  {
    path: '/tags/hello',
    component: ComponentCreator('/tags/hello', '6dd'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '3d3'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
