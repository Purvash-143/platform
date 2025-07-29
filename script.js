function triggerDeployment() {
  const vmType = selectedAssets.Infrastructure;

  if (!vmType) {
    alert("⚠️ Please select a Virtual Machine before deploying.");
    return;
  }

  // Replace with your actual Render backend URL
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
