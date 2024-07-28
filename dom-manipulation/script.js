
// Initialize an empty array of quote objects
let quotes = [];

// Function to load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById('quoteDisplay').textContent = "No quotes available";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  document.getElementById('quoteDisplay').textContent = `${randomQuote.text} - ${randomQuote.category}`;

  // Save the last viewed quote in session storage
  sessionStorage.setItem('lastViewedQuote', `${randomQuote.text} - ${randomQuote.category}`);
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes(); // Save the updated quotes array to local storage
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
    alert("Quote added successfully!");
  } else {
    alert("Please enter both quote text and category.");
  }
}

// Function to create the form for adding new quotes
function createAddQuoteForm() {
  const formContainer = document.createElement('div');

  const quoteInput = document.createElement('input');
  quoteInput.id = 'newQuoteText';
  quoteInput.type = 'text';
  quoteInput.placeholder = 'Enter a new quote';
  formContainer.appendChild(quoteInput);

  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';
  formContainer.appendChild(categoryInput);

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// Function to display the last viewed quote from session storage
function showLastViewedQuote() {
  const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
  if (lastViewedQuote) {
    document.getElementById('quoteDisplay').textContent = lastViewedQuote;
  }
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', function () {
  loadQuotes(); // Load quotes from local storage
  showLastViewedQuote(); // Show the last viewed quote if available

  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  createAddQuoteForm(); // Create the form for adding new quotes
});
