// Array to hold quote objects
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      document.getElementById('quoteDisplay').textContent = "No quotes available";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    document.getElementById('quoteDisplay').innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;
  }
  
  // Function to create and display the form for adding a new quote
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
  
    const quoteInput = document.createElement('input');
    quoteInput.setAttribute('id', 'newQuoteText');
    quoteInput.setAttribute('type', 'text');
    quoteInput.setAttribute('placeholder', 'Enter a new quote');
    formContainer.appendChild(quoteInput);
  
    const categoryInput = document.createElement('input');
    categoryInput.setAttribute('id', 'newQuoteCategory');
    categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('placeholder', 'Enter quote category');
    formContainer.appendChild(categoryInput);
  
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.addEventListener('click', addQuote);
    formContainer.appendChild(addButton);
  
    document.body.appendChild(formContainer);
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
    if (newQuoteText === '' || newQuoteCategory === '') {
      alert('Please enter both a quote and a category.');
      return;
    }
  
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
    // Clear the input fields after adding the quote
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  
    alert('Quote added successfully!');
  }
  
  // Event listener for showing a new random quote
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
    // Initial call to display a quote when the page loads
    showRandomQuote();
  
    // Create and display the form for adding new quotes
    createAddQuoteForm();
  });
  