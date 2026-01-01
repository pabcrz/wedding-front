/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CMSHcAcP.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_D11O9lQf.mjs';
import { c as createSvgComponent, i as info } from '../chunks/runtime_DARPP1Kj.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_DttF2zZX.mjs';
export { renderers } from '../renderers.mjs';

const bg = new Proxy({"src":"/_astro/bg-assist.BIqFEQLl.png","width":1365,"height":240,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/pabcrz/Dev/Personal/wedding-front/public/images/bg-assist.png";
							}
							
							return target[name];
						}
					});

const mobile = new Proxy({"src":"/_astro/bg-assist-mobile-2.DYfepToP.png","width":748,"height":240,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/pabcrz/Dev/Personal/wedding-front/public/images/bg-assist-mobile-2.png";
							}
							
							return target[name];
						}
					});

const ring = createSvgComponent({"meta":{"src":"/_astro/ring.BxnKWWgO.svg","width":357,"height":359,"format":"svg"},"attributes":{"preserveAspectRatio":"xMidYMid meet","viewBox":"462.9 206.2 357.0 359.2","zoomAndPan":"magnify","style":"fill: rgb(0, 0, 0);","original_string_length":"1846"},"children":"\n  <g style=\"fill: rgb(191, 82, 19);\">\n    <g id=\"__id133_s98s4ieian\">\n      <path d=\"M819.9025,384.64374L819.9025,384.64374C819.9025,483.21576,739.9939,563.12427,641.422,563.12427L641.422,563.12427C542.8499,563.12427,462.94147,483.21564,462.94147,384.64374L462.94147,384.64374C462.94147,286.07166,542.8499,206.16318,641.422,206.16318L641.422,206.16318C739.9939,206.16318,819.9025,286.07166,819.9025,384.64374L819.9025,384.64374 M816.3781,384.64374L816.3781,384.64374C816.3781,288.0181,738.04736,209.6876,641.422,209.6876L641.422,209.6876C544.7964,209.6876,466.46588,288.0181,466.46588,384.64374L466.46588,384.64374C466.46588,481.26917,544.7964,559.59985,641.422,559.59985L641.422,559.59985C738.04736,559.59985,816.3781,481.2693,816.3781,384.64374 Z\" style=\"fill: inherit;\" />\n    </g>\n    <g id=\"__id134_s98s4ieian\">\n      <path d=\"M808.14703,390.59894L808.14703,390.59894C808.14703,487.04547,733.4919,565.3723,641.22974,565.3723L641.22974,565.3723C548.96765,565.3723,474.3125,487.04547,474.3125,390.59894L474.3125,390.59894C474.3125,294.15228,548.96765,215.82555,641.22974,215.82555L641.22974,215.82555C733.4919,215.82555,808.14703,294.1523,808.14703,390.59894L808.14703,390.59894 M804.6226,390.59894L804.6226,390.59894C804.6226,295.94263,731.3929,219.34998,641.22974,219.34998L641.22974,219.34998C551.06665,219.34998,477.8369,295.94263,477.8369,390.59894L477.8369,390.59894C477.8369,485.2552,551.06665,561.84784,641.22974,561.84784L641.22974,561.84784C731.3929,561.84784,804.6226,485.2552,804.6226,390.59894 Z\" style=\"fill: inherit;\" />\n    </g>\n  </g>\n"});

const $$ConfirmarAsistencia = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Confirmar Asistencia" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex flex-col w-full h-dvh items-center"> <section class="w-full flex justify-center items-center relative"> <div class="rounded-full absolute bg-white flex flex-col justify-center size-48"> ${renderComponent($$result2, "Image", $$Image, { "src": ring, "alt": "ring", "class": "w-full absolute" })} ${renderComponent($$result2, "Image", $$Image, { "src": info, "alt": "info" })} </div> ${renderComponent($$result2, "Image", $$Image, { "src": bg, "alt": "foto de Arely y Carlos", "class": "object-cover min-h-60 hidden md:block" })} ${renderComponent($$result2, "Image", $$Image, { "src": mobile, "alt": "foto de Arely y Carlos", "class": "object-cover min-h-60 md:hidden" })} </section> <section class="p-4 w-full md:max-w-screen-md h-full flex flex-col"> <h1 class="text-center text-3xl pt-2 text-secondaryFont">
Confirmar Asistencia
</h1> <p class="text-lg p-4 text-center">
Este día es especial para nosotros, y más aún si tú estás presente. Por
        eso, te pedimos que confirmes tu asistencia antes del
<strong> 15 de Septiembre.</strong> </p> ${renderComponent($$result2, "Guests", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/pabcrz/Dev/Personal/wedding-front/src/components/Guests", "client:component-export": "default" })} </section> </main> ` })}`;
}, "/Users/pabcrz/Dev/Personal/wedding-front/src/pages/confirmar-asistencia.astro", void 0);

const $$file = "/Users/pabcrz/Dev/Personal/wedding-front/src/pages/confirmar-asistencia.astro";
const $$url = "/confirmar-asistencia";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$ConfirmarAsistencia,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
