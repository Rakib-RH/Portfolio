// Theme toggle (remembers choice)
const root = document.documentElement;
try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch {}
document.getElementById("theme").addEventListener("click", () => {
  const dark = getComputedStyle(root).getPropertyValue("--bg").trim() === "#0c111b";
  const next = dark ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
});

// Mobile menu
const menu = document.getElementById("menu");
const burger = document.getElementById("burger");
burger.addEventListener("click", () => {
  burger.setAttribute("aria-expanded", menu.classList.toggle("open"));
});
menu.addEventListener("click", e => {
  if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
});

// Typing effect
const roles = ["web applications.", "PHP & MySQL systems.", "ASP.NET projects.", "clean, responsive interfaces."];
const el = document.getElementById("typed");
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  el.textContent = roles[0];
} else {
  let r = 0, i = 0, del = false;
  (function tick() {
    const word = roles[r];
    el.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && i === 0) { del = false; r = (r + 1) % roles.length; }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  })();
}

// Highlight active nav link
const links = [...menu.querySelectorAll("a")];
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
  });
}, { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach(s => io.observe(s));

// Contact form opens the visitor's email app
const hint = document.getElementById("hint");
document.getElementById("send").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const msg = document.getElementById("msg").value.trim();
  if (!name || !msg) { hint.textContent = "Please enter your name and a message."; return; }
  const subject = encodeURIComponent("Portfolio message from " + name);
  location.href = `mailto:rakibhasan25.cse@gmail.com?subject=${subject}&body=${encodeURIComponent(msg)}`;
  hint.textContent = "Opening your email app...";
});

document.getElementById("year").textContent = new Date().getFullYear();