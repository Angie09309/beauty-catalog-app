const imagenes = {
  labios: ["/img/labios1.png", "/img/labios2.png", "/img/labios3.png"],
  ojos: ["/img/ojos1.png", "/img/ojos2.png", "/img/ojos3.png"],
  rostro: ["/img/rostro1.png", "/img/rostro2.png", "/img/rostro3.png"],
  nail: ["/img/nail1.png", "/img/nail2.png", "/img/nail3.png"],
  placeholder: [
    "/img/placeholder1.png",
    "/img/placeholder2.png",
    "/img/placeholder3.png",
  ],
};

export function getFallbackImage(productType: string) {
  let grupoDeImagenes;

  if (productType === "lipstick" || productType === "lip_liner") {
    grupoDeImagenes = imagenes.labios;
  } else if (productType === "eyeliner" || productType === "mascara") {
    grupoDeImagenes = imagenes.ojos;
  } else if (productType === "nail_polish") {
    grupoDeImagenes = imagenes.nail;
  } else if (productType === "foundation") {
    grupoDeImagenes = imagenes.rostro;
  } else {
    grupoDeImagenes = imagenes.placeholder;
  }

  return grupoDeImagenes[Math.floor(Math.random() * grupoDeImagenes.length)];
}
