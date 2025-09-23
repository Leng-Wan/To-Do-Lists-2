export function closeInfoPanel(panel, listPanel) {
  panel.hidden = true;
  panel.textContent = "";
  if (listPanel) listPanel.hidden = false;
}
