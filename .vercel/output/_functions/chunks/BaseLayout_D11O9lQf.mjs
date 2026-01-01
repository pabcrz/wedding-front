import { c as createComponent, g as createAstro, i as addAttribute, l as renderHead, n as renderSlot, a as renderTemplate } from './astro/server_CMSHcAcP.mjs';
/* empty css                         */

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Nuestra boda"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/ayc.png"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/pabcrz/Dev/Personal/wedding-front/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
