import { insertMeta } from "./meta";
import { titles, changeTitle } from "./titles";
import { theme, setupTheme, switchTheme } from "./theme";
import { setIcon, stylePages, computeNavPositions } from "./styling";

setupTheme();

// Style
document.addEventListener("DOMContentLoaded", function (event) {
  insertMeta();
  setIcon();
  changeTitle();
  stylePages();
  computeNavPositions();
});
