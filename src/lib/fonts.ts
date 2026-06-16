import { Bricolage_Grotesque, DM_Sans } from "next/font/google";

// Bricolage Grotesque → titulares (variable --font-bricolage). Grotesca
// contemporánea con carácter: identidad moderna y cercana, distinta a una
// serif editorial.
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
});

// DM Sans → cuerpo (variable --font-dmsans). Geométrica humanista, muy legible
// y amable; pareja limpia para la grotesca de los titulares.
export const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dmsans",
  weight: ["300", "400", "500", "600", "700"],
});

// Clase combinada para aplicar en <html>
export const fontVariables = `${bricolage.variable} ${dmSans.variable}`;
