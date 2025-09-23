import { renderInfoView } from "./renderInfoView.js";
import { renderEditView } from "./renderEditView.js";
import { wireCommonHandlers } from "./wireCommonHandlers.js";
import { wireInfoViewHandlers } from "./wireInfoViewHandlers.js";
import { wireEditViewHandlers } from "./wireEditViewHandlers.js";

export function renderPanel(context) {
  const { infoPanel, projectsPanel, state } = context;

  if (projectsPanel) projectsPanel.hidden = true;

  infoPanel.hidden = false;
  infoPanel.innerHTML = state.editing
    ? renderEditView({
        workingTitle: state.workingTitle,
        workingTasks: state.workingTasks,
        selectedTaskIds: state.selectedTaskIds,
      })
    : renderInfoView({
        workingTitle: state.workingTitle,
        workingTasks: state.workingTasks,
        selectedTaskIds: state.selectedTaskIds,
      });

  wireCommonHandlers(context);

  if (state.editing) {
    wireEditViewHandlers(context);
  } else {
    wireInfoViewHandlers(context);
  }
}
