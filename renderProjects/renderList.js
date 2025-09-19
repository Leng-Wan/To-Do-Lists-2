// A tiny reusable renderer to avoid duplication between lists
// Usage:
// renderList({
//   containerSelector: '.renderProjects',
//   items: getProjects(),
//   emptyText: 'No projects yet',
//   actions: [
//     { text: 'Edit', className: 'edit' },
//     { text: 'Delete', className: 'delete' },
//     { text: 'Done', className: 'done' },
//   ],
// });

export function renderList({ containerSelector, items, emptyText, actions }) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.hidden = false;
  container.textContent = '';

  if (!items || items.length === 0) {
    container.textContent = emptyText || 'Nothing here';
    return;
  }

  const frag = document.createDocumentFragment();

  items.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('eachProject');
    itemDiv.dataset.id = item.id;

    const number = document.createElement('span');
    number.textContent = index + 1;

    const title = document.createElement('p');
    title.textContent = item.title;

    const actionsDiv = document.createElement('div');
    (actions || []).forEach((btn) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = btn.text;
      if (btn.className) b.classList.add(btn.className);
      // Always set an action so the router can handle clicks
      b.dataset.action = btn.action || btn.className || (btn.text || '').toLowerCase();
      actionsDiv.appendChild(b);
    });

    itemDiv.appendChild(number);
    itemDiv.appendChild(title);
    itemDiv.appendChild(actionsDiv);
    frag.appendChild(itemDiv);
  });

  container.appendChild(frag);
}

// Small helper to show one panel and hide another
export function togglePanels({ showSelector, hideSelector }) {
  const showEl = document.querySelector(showSelector);
  const hideEl = document.querySelector(hideSelector);
  if (hideEl) hideEl.hidden = true;
  if (showEl) showEl.hidden = false;
}
