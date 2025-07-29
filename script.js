let selectedAssets = {};

// Fetch catalog.json and populate the dropdown
window.onload = () => {
  fetch("catalog.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load catalog.json");
      }
      return response.json();
    })
    .then(data => {
      const infraSelect = document.getElementById("infrastructure-select");
      data.forEach(asset => {
        if (asset.category === "Infrastructure") {
          const option = document.createElement("option");
          option.value = asset.id;
          option.textContent = asset.name;
          infraSelect.appendChild(option);
        }
      });

      infraSelect.addEventListener("change", (e) => {
        selectedAssets.Infrastructure = e.target.value;
      });
    })
    .catch(error => {
      console.error("Error loading catalog.json:", error);
      alert("❌ Could not load virtual machine options.");
    });
};

function triggerDeployment() {
  const vmType = selectedAssets.Infrastructure;

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
