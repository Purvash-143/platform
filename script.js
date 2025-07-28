function triggerDeployment() {
  const vmType = selectedAssets.Infrastructure;

  if (!vmType) {
    alert("Please select a Virtual Machine before deploying.");
    return;
  }

  const token = "A"; // 🔐 Replace this with your GitHub PAT (for testing only)
  const owner = "Purvash-143";
  const repo = "platform"; // Replace with your repo name

  fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/deploy.yml/dispatches`, {
    method: "POST",
    headers: {
      "Authorization": `token ${token}`,
      "Accept": "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ref: "main", // Or "master", depending on your branch
      inputs: {
        vm_type: vmType
      }
    })
  })
  .then(response => {
    if (response.status === 204) {
      alert(`✅ Deployment triggered for: ${vmType}`);
    } else {
      return response.json().then(data => {
        console.error("GitHub API Error:", data);
        alert("❌ Failed to trigger deployment. See console.");
      });
    }
  })
  .catch(err => {
    console.error("Network Error:", err);
    alert("❌ Could not reach GitHub API.");
  });
}
