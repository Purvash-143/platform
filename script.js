// Load VM options from catalog.json and populate the dropdown
window.onload = function () {
  fetch("catalog.json")
    .then(res => res.json())
    .then(data => {
      const infraSelect = document.getElementById("infrastructure-select");
      data.forEach(asset => {
        const option = document.createElement("option");
        option.value = asset.id;
        option.textContent = asset.name;
        infraSelect.appendChild(option);
      });
    })
    .catch(err => {
      console.error("❌ Error loading catalog.json:", err);
      alert("❌ Failed to load VM options.");
    });
};

// Trigger deployment on button click
function triggerDeployment() {
  const vmType = document.getElementById("infrastructure-select").value;

  if (!vmType) {
    alert("⚠️ Please select a Virtual Machine before deploying.");
    return;
  }

  const backendUrl = "https://deploy-backend-s2vu.onrender.com/trigger";

  fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ vm_type: vmType })
  })
    .then(response => {
      if (response.ok) {
        alert(`✅ Deployment triggered for: ${vmType}`);
      } else {
        return response.json().then(data => {
          console.error("❌ Backend error:", data);
          alert("❌ Deployment failed. See console for details.");
        });
      }
    })
    .catch(err => {
      console.error("❌ Network error:", err);
      alert("❌ Could not reach backend API.");
    });
}
