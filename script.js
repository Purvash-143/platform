function triggerDeployment() {
  const vmType = selectedAssets.Infrastructure;

  if (!vmType) {
    alert("⚠️ Please select a Virtual Machine before deploying.");
    return;
  }

  const token = "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"; // 🔐 For testing only – NEVER commit this
  const owner = "Purvash-143";
  const repo = "platform";

  const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/deploy.yml/dispatches`;

  fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`, // ✅ Use Bearer instead of token
      "Accept": "application/vnd.github+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ref: "main", // ✅ Ensure 'main' is your default branch
      inputs: {
        vm_type: vmType
      }
    })
  })
    .then(response => {
      if (response.status === 204) {
        alert(`✅ Deployment triggered for: ${vmType}`);
      } else {
        response.json().then(data => {
          console.error("❌ GitHub API error:", data);
          alert("❌ Deployment failed. See console for details.");
        });
      }
    })
    .catch(err => {
      console.error("❌ Network error:", err);
      alert("❌ Could not reach GitHub API.");
    });
}
