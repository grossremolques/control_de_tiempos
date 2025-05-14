import GoogleSheet from "google-sheet-package";
export const ss_empleados = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_EMPLEADOS,
  rowHead: 1,
  nameSheet: "Registro",
});
export const ss_mecanizado = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_MECANIZADO,
  rowHead: 1,
  nameSheet: "Ordenes",
});
export const ss_corte = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_CORTE,
  rowHead: 1,
  nameSheet: "Ordenes",
});
export const ss_nesting = new GoogleSheet({
  sheetId: import.meta.env.VITE_SS_NESTING,
  rowHead: 1,
  nameSheet: "Ordenes",
});