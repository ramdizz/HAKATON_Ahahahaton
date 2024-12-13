// Получаем элементы DOM
const priceInput = document.getElementById("price-input");
const listEl = document.getElementById("cards-container");
const categoryButtons = document.querySelectorAll(".category__buttons");
const searchBar = document.getElementById("search-bar-input");

let products = []; // Храним загруженные продукты

// Функция для получения данных
async function fetchProducts() {
  try {
    const response = await fetch("./products.json");
    products = await response.json();
    displayProducts(products); // Отображаем все продукты при первой загрузке
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
}

// Фильтрация продуктов по критериям
function filterProducts(maxPrice, category, searchTerm) {
  return products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesPrice = product.price <= maxPrice;
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearchTerm;
  });
}

// Ограничение количества отображаемых товаров
function paginateProducts(products, limit = 6) {
  return products.slice(0, limit);
}

// Отображение продуктов
function displayProducts(productsToDisplay) {
  listEl.innerHTML = ""; // Очищаем контейнер перед добавлением
  productsToDisplay.forEach((product) => {
    listEl.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card">
            <a href="${product.url}"><img src="${product.urlphoto}" alt="" class="card__image"/></a>
            <h4 class="card__title">${product.name}</h4>
            <p>${product.price} рублей</p>
        </div>
      `
    );
  });
}

// Обработчик изменения фильтров
function handleFiltersChange() {
  const maxPrice = parseFloat(priceInput.value) || Infinity;
  const selectedCategory =
    document.querySelector(".category__buttons.active")?.dataset.category ||
    "all";
  const searchTerm = searchBar.value.trim();

  const filteredProducts = filterProducts(
    maxPrice,
    selectedCategory,
    searchTerm
  );
  const paginatedProducts = paginateProducts(filteredProducts, 444);
  displayProducts(paginatedProducts);
}

// Обработчик кликов по категориям
function handleCategoryClick(event) {
  if (event.target.classList.contains("category__buttons")) {
    // Убираем активный класс у всех кнопок
    categoryButtons.forEach((button) => button.classList.remove("active"));
    // Добавляем активный класс на текущую кнопку
    event.target.classList.add("active");
    handleFiltersChange(); // Перезапускаем фильтрацию
  }
}

// Подписываемся на события кликов по кнопкам категорий
categoryButtons.forEach((button) =>
  button.addEventListener("click", handleCategoryClick)
);

// Подписываемся на событие изменения ввода цены и поиска
priceInput.addEventListener("input", handleFiltersChange);
searchBar.addEventListener("input", handleFiltersChange);

// Инициализация (первая загрузка данных)
fetchProducts();
