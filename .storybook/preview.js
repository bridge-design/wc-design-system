import { html } from "lit";
import { setCustomElementsManifest } from "@storybook/web-components";

import customElementsManifest from "./public/custom-elements.json";

setCustomElementsManifest(customElementsManifest);

/** Parse manifest and extract all event names to load them into actions plugin */
const declaredEvents = customElementsManifest.modules.reduce((acc, mod) => {
  mod.declarations.forEach((d) => {
    const events = d.events?.length > 0 ? d.events.map((ev) => ev.name) : [];
    acc.push(...events);
  });
  return acc;
}, []);

export const parameters = {
  grid: { cellSize: 8 },
  actions: {
    handles: declaredEvents,
  },
  controls: {
    hideNoControlsWarning: true,
    expanded: true,
    exclude: /^data-/i,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  }
};