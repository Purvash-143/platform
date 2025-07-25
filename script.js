let selectedAssets = [];

window.onload = function () {
  fetch('assets/catalog.json')
    .then(response => response.json())
    .then(data => renderCatalog(data))
    .catch(error => console.error('Error loading catalog:', error));
};

function renderCatalog(assets) {
  const container = document.getElementById('asset-container');

  assets.forEach(asset => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h2>${asset.name}</h2>
      <p><strong>Category:</strong> ${asset.category}</p>
      <p>${asset.description}</p>
      <label>
        <input type="checkbox" value="${asset.id}" onchange="toggleAsset('${asset.id}', this.checked)" />
        Select
      </label>
    `;

    container.appendChild(card);
  });
}

function toggleAsset(id, checked) {
  if (checked) {
    selectedAssets.push(id);
  } else {
    selectedAssets = selectedAssets.filter(asset => asset !== id);
  }
}

function triggerDeployment() {
  if (selectedAssets.length === 0) {
    alert('Please select at least one asset to deploy.');
    return;
  }

  // For now, just show the selected assets
  // Later this will call GitHub REST API to trigger Actions
  alert('Selected Assets: ' + selectedAssets.join(', '));
}
