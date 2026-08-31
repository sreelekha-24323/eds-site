export default async function decorate(block) {
  const jsonUrl = block.querySelector('a')?.href
    || block.textContent.trim();

  const response = await fetch(jsonUrl);
  const json = await response.json();

  const products = json.data;

  const pageSize = 20;
  let currentPage = 1;

  const container = document.createElement('div');
  const list = document.createElement('ul');
  const controls = document.createElement('div');

  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Previous';

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';

  controls.append(prevBtn, nextBtn);

  function renderPage(page) {
    list.innerHTML = '';

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const pageItems = products.slice(start, end);

    pageItems.forEach((product) => {
      const li = document.createElement('li');

      li.innerHTML = `
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>Price: ₹${product.price}</p>
      `;

      list.appendChild(li);
    });

    prevBtn.disabled = page === 1;
    nextBtn.disabled = end >= products.length;
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage * pageSize < products.length) {
      currentPage++;
      renderPage(currentPage);
    }
  });

  container.append(list, controls);

  block.innerHTML = '';
  block.append(container);

  renderPage(currentPage);
}