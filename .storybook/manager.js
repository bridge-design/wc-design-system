import { addons } from "@storybook/addons";
import { create } from "@storybook/theming";

const wcTheme = create({
  base: "light",
  brandTitle: "WC Design System",
})

addons.setConfig({
  theme: wcTheme,
});