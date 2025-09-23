export function wireInfoViewHandlers({ infoPanel, state, rerender }) {
  const editBtn = infoPanel.querySelector(".info-edit");
  if (!editBtn) return;

  editBtn.addEventListener("click", () => {
    state.editing = true;
    rerender();
  });
}
