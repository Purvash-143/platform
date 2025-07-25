let selectedAssets = {
  Infrastructure: null,
  Application: null,
  Monitoring: null
};

window.onload = function () {
  fetch('assets/catalog.json')
    .then(response => response.json())
    .then(data => renderDropdowns(data))
    .catch(error => console.error('Error loading catalog:', error));
};

function renderDropdowns(assets) {
  const infraSelect = document.getElementById('infrastructure-select');
  const appSelect = document.getElementById('application-select');
  const monitorSelect = document.getElementById('monitoring-select');

  // Clear existing options except the first
  infraSelect.length = 1;
  appSelect.length = 1;
  monitorSelect.length = 1;

  assets.forEach(asset => {
    const option = document.createElement('option');
    option.value = asset.id;
    option.textContent = asset.name;

    if (asset.category === "Infrastructure") infraSelect.appendChild(option);
    if (asset.category === "Application") appSelect.appendChild(option);
    if (asset.category === "Monitoring") monitorSelect.appendChild(option);
  });

  infraSelect.onchange = () => selectedAssets.Infrastructure = infraSelect.value;
  appSelect.onchange = () => selectedAssets.Application = appSelect.value;
  monitorSelect.onchange = () => selectedAssets.Monitoring = monitorSelect.value;
}

function triggerDeployment() {
  const selected = Object.values(selectedAssets).filter(Boolean);

  if (selected.length < 3) {
    alert("Please select one from each category before deploying.");
    return;
  }

  // Simulate API trigger
  alert("Selected Modules:\n" + JSON.stringify(selectedAssets, null, 2));
}
