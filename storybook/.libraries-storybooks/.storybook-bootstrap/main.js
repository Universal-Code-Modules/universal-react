/** @type { import('@storybook/react-vite').StorybookConfig } */

import path from "node:path";

const config = {
  stories: ["../../src/components/bootstrap/*.stories.@(js|jsx|mjs|ts|tsx)"],
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
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    // Ensures that the cache directory does not conflict with other frameworks
    config.cacheDir = path.join(__dirname, './.vite-bootstrap')
    return config;
  },
};
export default config;
