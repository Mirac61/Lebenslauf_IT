// Dunkel-/Hellmodus-Umschaltung beim Laden
// Theme-Umschaltung (ohne localStorage für die Übung)
(() => {
  const knopf = document.getElementById("themaKnopf");
  const root = document.documentElement;
  const dunkel = matchMedia("(prefers-color-scheme: dark)").matches;
  const start = dunkel ? "dark" : "light";

  root.setAttribute("data-theme", start);
  if (knopf) knopf.textContent = start === "dark" ? "🔆" : "🌓";

  knopf?.addEventListener("click", () => {
    const neu = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", neu);
    knopf.textContent = neu === "dark" ? "🔆" : "🌓";
  });
})();

// Abschnitte ein-/ausblenden
document.querySelectorAll("[data-toggle]").forEach(btn => {

  // sucht das Element, auf das der data-toggle-Selektor des Buttons zeigt
  const target = document.querySelector(btn.getAttribute("data-toggle"));

  if (!target) return;
  btn.addEventListener("click", () => {
    const hidden = target.classList.toggle("versteckt");
    btn.setAttribute("aria-expanded", !hidden);
    btn.textContent = hidden ? "Einblenden" : "Ausblenden";
  });
});

// Projekte filtern
const filter = document.getElementById("projektFilter");

 filter?.addEventListener("input", e => {

  const term = e.target.value.toLowerCase(); // Eingabetext in Kleinbuchstaben holen

   // Geht alle Projekte durch und zeigt nur die an, deren Tags den Suchbegriff enthalten
  document.querySelectorAll(".projekt").forEach(p => {
    const tags = (p.dataset.tags || "").toLowerCase();
    p.style.display = tags.includes(term) ? "block" : "none";
  });

});