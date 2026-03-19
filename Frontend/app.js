const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const statusText = document.getElementById("status");

const summaryDiv = document.getElementById("summary");
const impactDiv = document.getElementById("impact");

// TAB SWITCH
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// UPLOAD
uploadBtn.addEventListener("click", async () => {
  const file = fileInput.files[0];

  if (!file) {
    alert("Upload a file first 😭");
    return;
  }

  statusText.innerText = "Analyzing...";
  summaryDiv.innerHTML = "";
  impactDiv.innerHTML = "";

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    statusText.innerText = "Done ✅";

    // SUMMARY
    data.summary.forEach(item => {
      const div = document.createElement("div");
      div.className = "summary-box";
      div.innerHTML = `<pre>${item}</pre>`;
      summaryDiv.appendChild(div);
    });

    // IMPACT (placeholder)
    ["Students", "Businesses", "General Public"].forEach(type => {
      const div = document.createElement("div");
      div.className = "impact-card";
      div.innerHTML = `<strong>${type}</strong><br/>Impact analysis coming soon...`;
      impactDiv.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    statusText.innerText = "Backend error ❌";
  }
});