/** @type { import('@storybook/react-vite').StorybookConfig } */

import { refs } from "./refs";

const config = {
  stories: ["../Introduction.mdx"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  refs,
  docs: {
    autodocs: "tag",
  },
};
export default config;
