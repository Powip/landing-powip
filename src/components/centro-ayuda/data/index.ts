import raw from './help-content.json';
import type { Chapter, HelpData } from '../types';

export const HELP_DATA = raw as unknown as HelpData;

export const CAL_LINK = HELP_DATA.cal;
export const WA_LINK = HELP_DATA.wa;
export const WA_PHONE = HELP_DATA.wa.match(/wa\.me\/(\d+)/)?.[1] ?? '';

export const WA_NEED_OPTIONS = [
  'Tengo una duda sobre cómo usar un módulo',
  'Tengo un problema técnico',
  'Consulta sobre mi plan o facturación',
  'Quiero activar o configurar una integración',
  'Otro',
];

// Capturas de pantalla reales en public/centro-de-ayuda/screenshots/,
// verificadas una por una contra su contenido (los archivos llegaron
// nombrados shot-01..shot-27, sin relación fija con la clave del paso).
const SCREENSHOT_FILES: Record<string, string> = {
  proveedores: 'shot-01.jpg',
  reg_check: 'shot-02.jpg',
  ped_camino: 'shot-03.jpg',
  ped_desp: 'shot-04.jpg',
  fin_modal: 'shot-05.jpg',
  liq: 'shot-06.jpg',
  reg_prod: 'shot-07.jpg',
  crear_prod: 'shot-08.jpg',
  integraciones: 'shot-09.jpg',
  config: 'shot-10.jpg',
  compra_prod: 'shot-11.jpg',
  guia_plan: 'shot-12.jpg',
  reg_form: 'shot-13.jpg',
  guia_rastreo: 'shot-14.jpg',
  inventario: 'shot-15.jpg',
  compra_new: 'shot-16.jpg',
  compras: 'shot-17.jpg',
  ped_hist: 'shot-18.jpg',
  tiendas: 'shot-19.jpg',
  ventas: 'shot-20.jpg',
  cc_mov: 'shot-21.jpg',
  guia_act: 'shot-22.jpg',
  packs: 'shot-23.jpg',
  cc_cod: 'shot-24.jpg',
  fin_pagos: 'shot-25.jpg',
  sunat_cert: 'shot-26.jpg',
  sunat: 'shot-27.jpg',
};

export const SCREENSHOTS: Record<string, string> = Object.fromEntries(
  Object.entries(SCREENSHOT_FILES).map(([key, file]) => [key, `/centro-de-ayuda/screenshots/${file}`])
);

// Tutoriales reales del canal de YouTube de POWIP, uno por módulo (los que
// todavía no tienen video muestran el placeholder "en edición").
export const MODULE_VIDEOS: Record<string, string> = {
  'primeros-pasos': 'ID1zqVFgpEk',
  'google-sheets': 'ASVHHmTLa_o',
  'ventas-panel': 'SR2PfogeYlg',
  'registrar-venta': 'SR2PfogeYlg',
  'op-pedidos': 'N6cSeuDkU5s',
  'op-liquidaciones': 'Q5pnD5T-PtU',
  'prod-inventario': 'bdZguLoS87U',
  'cc-gestion-cod': 'D9wv_SuiV_Y',
  'fin-pagos': 'CfGhrsu-xbM',
  'fin-facturacion': 'MuDwjgBvWEY',
  'packs-promos': 'r1OtlJmbAEQ',
};

export const HOME_VIDEO_ID = 'juySjzhIt4k';

export const QUICK_PAGES: Record<string, string> = {
  empieza: 'Empieza aquí',
  flujo: 'Mapa del flujo del pedido',
  estados: 'Estados y qué hacer',
  glosario: 'Glosario',
  novedades: 'Novedades',
};

export const MODULE_ORDER: string[] = HELP_DATA.chapters.flatMap((c) => c.mods);

export function chapterOf(moduleId: string): Chapter | undefined {
  return HELP_DATA.chapters.find((c) => c.mods.includes(moduleId));
}

export function chapterName(chapterId: string): string {
  return HELP_DATA.chapters.find((c) => c.id === chapterId)?.name ?? '';
}

export function moduleSearchText(moduleId: string): string {
  const m = HELP_DATA.modules[moduleId];
  if (!m) return '';
  return [
    m.title,
    m.one,
    m.para ?? '',
    ...m.steps.map((s) => `${s.t} ${s.d}`),
    ...(m.tips ?? []),
    ...(m.faq ?? []).map((f) => `${f.q} ${f.a}`),
  ]
    .join(' ')
    .toLowerCase();
}
