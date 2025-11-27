document.getElementById("generateBtn").addEventListener("click", async () => {
  const goal = document.getElementById("goal").value;
  const level = document.getElementById("level").value;
  const weeks = document.getElementById("weeks").value;
  const equipment = document.getElementById("equipment").value;

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ goal, level, weeks, equipment })
  });

  const data = await res.json();
  document.getElementById("result").textContent = data.result || data.error;
});