// smooth scroll
document.querySelectorAll('nav a').forEach(link => {
link.addEventListener('click', e => {
    e.prenventDefaualt();
    const target =
document.querySelector(link.getAttribute('href'));
target.scrollIntoview({ behavior: 'smooth'});
});
        });

const form = document.getElementById("contact-form");
if (form) {
  const statusEl = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "Sending...";
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        form.reset();
        statusEl.textContent = "✅ Message sent! I'll get back to you soon.";
      } else {
        const data = await response.json().catch(() => ({}));
        if (data && data.errors) {
          statusEl.textContent = "❌ " + data.errors.map(e => e.message).join(", ");
        } else {
          statusEl.textContent = "❌ Something went wrong. Please try again.";
        }
      }
    } catch (err) {
      statusEl.textContent = "❌ Network error. Please check your connection.";
    } finally {
      submitBtn.disabled = false;
    }
  });
}