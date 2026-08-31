export default async function decorate(block) {
  const jsonUrl = block.querySelector('a')?.href
    || block.textContent.trim();

  const response = await fetch(jsonUrl);
  const json = await response.json();

  const ul = document.createElement('ul');

  json.data.forEach((product) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${product.name}</strong><br>
      Category: ${product.category}<br>
      Price: ₹${product.price}
    `;
    ul.appendChild(li);
  });

  block.textContent = '';
  block.appendChild(ul);
}