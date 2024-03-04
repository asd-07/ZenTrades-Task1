// Fetch the JSON data from the API
fetch('https://s3.amazonaws.com/open-to-cors/assignment.json')
.then(response => {
  if (!response.ok) {
    throw new Error('HTTP error! status: ' + response.status);
  }
  return response.json();
})
.then(data => {
  // Convert the products object to an array of objects
  const products = Object.keys(data.products).map(id => {
    return { id, ...data.products[id] };
  });

  // Sort the products based on descending popularity
  products.sort((a, b) => b.popularity - a.popularity);

  // Get the products container
  const productsContainer = document.getElementById('products');

  // Display the products
  products.forEach(product => {
    // Create a new div element for the product
    const productDiv = document.createElement('div');
    productDiv.className = 'product';

    // Create a new h2 element for the title
    const title = document.createElement('h2');
    title.textContent = 'Title: ' + product.title;
    productDiv.appendChild(title);

    // Create a new p element for the price
    const price = document.createElement('p');
    price.textContent = 'Price: ' + product.price;
    productDiv.appendChild(price);

    // Add the product div to the products container
    productsContainer.appendChild(productDiv);
  });
})
.catch(error => {
  console.error('Error: ' + error);
});