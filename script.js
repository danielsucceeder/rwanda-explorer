/* =========================================================
   Rwanda Explorer — script.js
   Simple vanilla JavaScript for the prototype:
   1. Mobile navigation toggle
   2. Smooth scroll buttons
   3. Attraction "Learn More" modal
   4. Basic translation demo
   ========================================================= */

/* ---------- 1. MOBILE NAVIGATION TOGGLE ---------- */
// Shows/hides the menu links when the hamburger icon is clicked (small screens).
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", function () {
  navLinks.classList.toggle("open");

  // Update the button state for accessibility
  const isOpen = navLinks.classList.contains("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// Close the menu after clicking a link (so it doesn't stay open on mobile).
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------- 2. SMOOTH SCROLL BUTTONS (HERO) ---------- */
// The two hero buttons scroll to their matching sections.
document.querySelectorAll("[data-scroll]").forEach(function (button) {
  button.addEventListener("click", function () {
    const target = document.getElementById(button.dataset.scroll);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ---------- 3. ATTRACTION "LEARN MORE" MODAL ---------- */
// Each card button stores extra info in data-title / data-text attributes.
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".learn-more").forEach(function (btn) {
  btn.addEventListener("click", function () {
    modalTitle.textContent = btn.dataset.title;
    modalText.textContent = btn.dataset.info;
    modalOverlay.classList.add("open");
  });
});

// Close the modal with the X button or by clicking outside of it.
function closeModal() {
  modalOverlay.classList.remove("open");
}

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", function (event) {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

/* ---------- 4. BASIC TRANSLATION DEMO ---------- */
// NOTE: This is NOT a real translation engine.
// It is a small dictionary of predefined phrases for demonstration only.

const dictionary = {
  en: {
    "hello": "Muraho",
    "thank you": "Murakoze",
    "where is the hotel?": "Hoteli iri he?",
    "how are you?": "Uri gute?",
    "goodbye": "Mwirire neza",
    "yes": "Yego",
    "no": "Oya"
  },
  rw: {
    "muraho": "Hello",
    "murakoze": "Thank you",
    "hoteli iri he?": "Where is the hotel?",
    "uri gute?": "How are you?",
    "mwirire neza": "Goodbye",
    "yego": "Yes",
    "oya": "No"
  },
  fr: {
    "hello": "Bonjour",
    "thank you": "Merci",
    "where is the hotel?": "Où est l'hôtel?",
    "how are you?": "Comment allez-vous?",
    "goodbye": "Au revoir",
    "yes": "Oui",
    "no": "Non"
  }
};

// The dictionary above is always English <-> Kinyarwanda <-> French,
// so we can translate in both directions using the same entries.
const translateBtn = document.getElementById("translateBtn");
const sourceText = document.getElementById("sourceText");
const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");
const resultBox = document.getElementById("resultBox");

function showResult(message, isEmpty) {
  resultBox.textContent = message;
  resultBox.classList.toggle("empty", !!isEmpty);
}

translateBtn.addEventListener("click", function () {
  const text = sourceText.value.trim();

  // Ask the user for input if the box is empty.
  if (text === "") {
    showResult("Please enter some text to translate.", true);
    return;
  }

  const from = sourceLang.value;
  const to = targetLang.value;

  // Same language selected — nothing to translate.
  if (from === to) {
    showResult("Please choose two different languages.", true);
    return;
  }

  const table = dictionary[from];
  const result = table ? table[text.toLowerCase()] : undefined;

  if (result) {
    showResult(result, false);
  } else {
    // Simple user feedback when no translation is available.
    showResult(
      "Sorry, no translation found in this demo. Try: \"Hello\", \"Thank you\", or \"Where is the hotel?\"",
      true
    );
  }
});
