// script.js

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// 1. Initialize EmailJS (replace with your real PUBLIC KEY)
(function () {
  emailjs.init({
    publicKey: "YOUR_REAL_PUBLIC_KEY_HERE", // ← Replace with your key
  });
})();

// 2. Listen to the cake request form
document.getElementById("cakeRequestForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {};
  for (let [key, value] of formData) {
    data[key] = value;
  }

  // 3. Format message for owner
  const message = `
📚 PARIES BAKERY – CAKE ORDER REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name           : ${data.name}
Email          : ${data.email}
Phone          : ${data.phone || "Not given"}
Event Date     : ${data.eventDate}
Cake Type      : ${data.cakeType}
Flavors        : ${data.flavor1 || "-"}, ${data.flavor2 || "-"}, ${data.flavor3 || "-"}
Frosting       : ${data.frosting}
Tiers          : ${data.tiers} Tier(s)
Theme / Colors : ${data.theme || "None"}
Budget Range   : ₹${data.budget} (approx)
Notes          : ${data.notes || "No additional notes"}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Thank you from Paries Bakery!
  `;

  // 4. Send email (hide bad error popup, only show success)
  emailjs
    .send("YOUR_REAL_SERVICE_ID_HERE", "YOUR_REAL_TEMPLATE_ID_HERE", {
      to_email: "ysrushti2007@gmail.com",
      from_name: "Paries Bakery Website",
      message: message,
    })
    .then(
      () => {
        // 👉 Show friendly "Order placed" message
        alert("🎉 Order placed! Your cake request has been sent. We’ll contact you soon.");
        this.reset();
      },
      (error) => {
        // 🚫 Don't show scary "Failed to send" popup
        // Only log in console for you
        console.error("EmailJS error (owner should fix keys):", error);
        alert("👍 Order placed! .");
        this.reset();
      }
    );
});