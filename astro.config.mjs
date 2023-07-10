import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify/functions";
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    })
  ]
});