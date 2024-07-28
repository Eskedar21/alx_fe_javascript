const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Using posts as a placeholder

let quotes = JSON.parse(localStorage.getItem('quotes')) || [];
const categoryFilter = document.getElementById('categoryFilter');

document.addEventListener('DOMContentLoaded', function () {
  loadQuotes();
  populateCategories();
  createAddQuoteForm();
  filterQuotes();

  const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
  categoryFilter.value = lastSelectedCategory;
  filterQuotes();

  document.getElementById('newQuote').addEventListener('click', showRandomQuote);

  // Periodically sync data with server
  setInterval(syncQuotes, 60000); // Sync every minute
});

function loadQuotes() {
  if (quotes.length === 0) {
    document.getElementById('quoteDisplay').textContent = "No quotes available";
    return;
  }
  showRandomQuote();
}

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  document.getElementById('quoteDisplay').textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}

function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes();
    populateCategories();
    filterQuotes();
    alert('Quote added successfully!');
    postQuoteToServer({ text: quoteText, category: quoteCategory }); // Post new quote to the server
  } else {
    alert('Both text and category are required to add a quote.');
  }
}

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function populateCategories() {
  const categories = [...new Set(quotes.map(quote => quote.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem('lastSelectedCategory', selectedCategory);

  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    document.getElementById('quoteDisplay').textContent = "No quotes available";
  } else {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    document.getElementById('quoteDisplay').textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
  }
}

function createAddQuoteForm() {
  const formContainer = document.createElement('div');

  const quoteTextInput = document.createElement('input');
  quoteTextInput.id = 'newQuoteText';
  quoteTextInput.type = 'text';
  quoteTextInput.placeholder = 'Enter a new quote';

  const quoteCategoryInput = document.createElement('input');
  quoteCategoryInput.id = 'newQuoteCategory';
  quoteCategoryInput.type = 'text';
  quoteCategoryInput.placeholder = 'Enter quote category';

  const addQuoteButton = document.createElement('button');
  addQuoteButton.textContent = 'Add Quote';
  addQuoteButton.onclick = addQuote;

  formContainer.appendChild(quoteTextInput);
  formContainer.appendChild(quoteCategoryInput);
  formContainer.appendChild(addQuoteButton);

  document.body.appendChild(formContainer);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    filterQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

function exportToJsonFile() {
  const json = JSON.stringify(quotes, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function fetchQuotesFromServer() {
  try {
    const response = await fetch(apiUrl);
    const serverQuotes = await response.json();

    // Simulate quotes structure from server
    const formattedQuotes = serverQuotes.map(post => ({
      text: post.title,
      category: 'Server'
    }));

    return formattedQuotes;
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
    return [];
  }
}

async function postQuoteToServer(quote) {
  try {
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quote)
    });
  } catch (error) {
    console.error('Error posting quote to server:', error);
  }
}

async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();

  // Conflict resolution: Server data takes precedence
  quotes = serverQuotes;
  saveQuotes();
  populateCategories();
  filterQuotes();
  showNotification('Quotes synced with server!');
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.bottom = '10px';
  notification.style.right = '10px';
  notification.style.padding = '10px';
  notification.style.backgroundColor = 'green';
  notification.style.color = 'white';
  notification.style.borderRadius = '5px';

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}
