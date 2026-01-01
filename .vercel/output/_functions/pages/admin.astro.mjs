/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CMSHcAcP.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_D11O9lQf.mjs';
export { renderers } from '../renderers.mjs';

const $$Admin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Administraci\xF3n" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex flex-col w-full max-w-screen-lg h-dvh"> ${renderComponent($$result2, "AdminPanel", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/pabcrz/Dev/Personal/wedding-front/src/components/AdminPanel", "client:component-export": "default" })} </main> ` })}`;
}, "/Users/pabcrz/Dev/Personal/wedding-front/src/pages/admin.astro", void 0);

const $$file = "/Users/pabcrz/Dev/Personal/wedding-front/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
