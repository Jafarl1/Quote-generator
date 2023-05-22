let quoteText = document.getElementById("quote");
let authorText = document.getElementById("author");
let saveButton = document.getElementById("saveButton");
let bookmark = document.getElementById("bookmark");
let newQuoteButton = document.getElementById("new-quote");
let savedModal = document.querySelector(".saved-modal");
let savedList = document.getElementById("saved-list");
let showSavedList = document.getElementById("show-saved-list");
let hideSavedList = document.getElementById("hide-saved-list");
let apiQuotes = [];
let savedQuotes = [];
let currentQuote = "";

const randomQuote = (allQuotes) => {
  const current = allQuotes[Math.floor(Math.random() * allQuotes.length)];
  current.text.length > 100
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  quoteText.textContent = current.text;
  authorText.textContent = current?.author ?? "Unknown";
  currentQuote = current;
};

(async function getQuotes() {
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
  if (savedQuotes.some((el) => el === currentQuote)) {
    bookmark.classList.add("fa-solid");
    bookmark.classList.remove("fa-regular");
  } else {
    bookmark.classList.add("fa-regular");
    bookmark.classList.remove("fa-solid");
  }
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
  if (savedQuotes.some((el) => el === saved)) {
    savedQuotes = savedQuotes.filter((el) => el !== saved);
  } else {
    savedQuotes.push(saved);
  }
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
