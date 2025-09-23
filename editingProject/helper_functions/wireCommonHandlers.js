import { closeInfoPanel } from "./closeInfoPanel.js";

export function wireCommonHandlers({ infoPanel, projectsPanel }) {
  const closeBtn = infoPanel.querySelector(".info-close");
  if (!closeBtn) return;

  closeBtn.addEventListener("click", () => {
    closeInfoPanel(infoPanel, projectsPanel);
  });
}
