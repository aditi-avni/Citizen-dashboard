document.addEventListener("DOMContentLoaded", () => {

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

  // UPLOAD & ANALYZE
  uploadBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
      alert("Please upload a file first");
      return;
    }

    statusText.innerText = "Analyzing...";
    summaryDiv.innerHTML = "";
    impactDiv.innerHTML = "";

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();
      console.log("DATA:", data);

      statusText.innerText = "Done ✅";

      // SUMMARY SECTION
      if (data.summary && Array.isArray(data.summary)) {
        data.summary.forEach(item => {
          const div = document.createElement("div");
          div.className = "summary-box";
          div.innerHTML = `<pre>${item}</pre>`;
          summaryDiv.appendChild(div);
        });
      } else {
        summaryDiv.innerHTML = "No summary returned.";
      }

      // IMPACT SECTION
      const impacts = [
        { title: "Students", text: "Impact analysis coming soon..." },
        { title: "Businesses", text: "Impact analysis coming soon..." },
        { title: "General Public", text: "Impact analysis coming soon..." }
      ];

      impacts.forEach(item => {
        const div = document.createElement("div");
        div.className = "impact-card";
        div.innerHTML = `<strong>${item.title}</strong><br/>${item.text}`;
        impactDiv.appendChild(div);
      });

    } catch (error) {
      console.error("ERROR:", error);
      statusText.innerText = "Backend error ❌";
    }
  });

});