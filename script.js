const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const saveButton = document.getElementById("saveButton");
const bookmark = document.getElementById("bookmark");
const newQuoteButton = document.getElementById("new-quote");
const savedModal = document.querySelector(".saved-modal");
const savedList = document.getElementById("saved-list");
const showSavedList = document.getElementById("show-saved-list");
const hideSavedList = document.getElementById("hide-saved-list");
const loader = document.getElementById("loader");
let apiQuotes = [];
let savedQuotes = [];
let currentQuote = "";

const loading = (boolean) =>
  boolean
    ? ((loader.hidden = false), (quoteContainer.hidden = true))
    : ((loader.hidden = true), (quoteContainer.hidden = false));

const randomQuote = (allQuotes) => {
  loading(true);
  const current = allQuotes[Math.floor(Math.random() * allQuotes.length)];
  current.text.length > 100
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  quoteText.textContent = current.text;
  authorText.textContent = current?.author ?? "Unknown";
  currentQuote = current;
  loading(false);
};

(async function getQuotes() {
  loading(true);
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    data.forEach((el) => (el.saved = false));
    apiQuotes = data;
    randomQuote(apiQuotes);
  } catch (error) {
    console.error("Error:", error);
  }
})();

function toggleBookmarkButton() {
  savedQuotes.some((el) => el === currentQuote)
    ? (bookmark.classList.add("fa-solid"),
      bookmark.classList.remove("fa-regular"))
    : (bookmark.classList.add("fa-regular"),
      bookmark.classList.remove("fa-solid"));

  handleSavedList();
}

function handleSavedList() {
  savedList.innerHTML = "";
  savedQuotes.forEach((el) => {
    savedList.innerHTML += `
            <div class="saved-quote">
                <p> ${el.text} </p>
                <br>
                <small style="font-style: italic"> ${el.author} </small>
            </div>
        `;
  });
}

saveButton.addEventListener("click", () => {
  let saved = apiQuotes.find((el) => el === currentQuote);

  savedQuotes.some((el) => el === saved)
    ? (savedQuotes = savedQuotes.filter((el) => el !== saved))
    : savedQuotes.push(saved);

  toggleBookmarkButton();
});

newQuoteButton.addEventListener("click", () => {
  randomQuote(apiQuotes);
  toggleBookmarkButton();
});

showSavedList.addEventListener("click", () => {
  savedModal.classList.toggle("show-list");
});

hideSavedList.addEventListener("click", () => {
  savedModal.classList.remove("show-list");
});
