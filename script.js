import { creatingProject } from "./CapturingProjects/takingProjectTitle.js";
import { show } from "./renderProjects/showProjects.js";
import { showArchivedPj } from "./renderProjects/showArchivedProjects.js";
import { projectDetail } from "./editingProject/capturingProjectID.js";
import { initEditPanel } from "./editingProject/openEditPanel.js";

creatingProject();
show();
showArchivedPj();
projectDetail();
initEditPanel()
