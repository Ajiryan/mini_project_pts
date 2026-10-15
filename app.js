// Konfigurasi REST API (Dataset Products - Digit X = 0)
const API_URL = 'https://dummyjson.com/products?limit=100';

// Global State
let allProducts = [];
let filteredProducts = [];

// Elemen DOM State UI
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');

// Elemen DOM Kontrol & Output Utama
const categoryFilter = document.getElementById('categoryFilter');
const priceSort = document.getElementById('priceSort');
const productsGrid = document.getElementById('productsGrid');

// Elemen DOM Analisis Data (Statistik)
const statAvgPrice = document.getElementById('statAvgPrice');
const statMaxPrice = document.getElementById('statMaxPrice');
const statTotalCategories = document.getElementById('statTotalCategories');

// Elemen DOM Form Catatan
const noteForm = document.getElementById('noteForm');
const productSelect = document.getElementById('productSelect');
const userNote = document.getElementById('userNote');
const productSelectError = document.getElementById('productSelectError');
const userNoteError = document.getElementById('userNoteError');
const charCount = document.getElementById('charCount');
const formAlert = document.getElementById('formAlert');

// Elemen DOM Challenge (Light/Dark Mode - C = 0)
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

// Menginisialisasi Tema saat Halaman Selesai Dimuat
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();
});

// Membaca Preferensi Tema dari localStorage
function initTheme() {
  const savedTheme = localStorage.getItem('app-theme') || 'light';
  applyTheme(savedTheme);
}

// Menerapkan Atribut Tema ke Elemen HTML
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Light Mode';
    themeToggleBtn.setAttribute('aria-label', 'Beralih ke Mode Terang');
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Dark Mode';
    themeToggleBtn.setAttribute('aria-label', 'Beralih ke Mode Gelap');
  }
}

// Mengubah Tema dan Menyimpan ke localStorage
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('app-theme', newTheme);
}

// Mengambil Data Produk dari REST API menggunakan Fetch API
async function loadProducts() {
  try {
    showLoading();
    
    const response = await fetch(API_URL);
    
    // Memeriksa Status HTTP Response
    if (!response.ok) {
      throw new Error(`Gagal terhubung ke server (HTTP ${response.status})`);
    }
    
    const data = await response.json();
    allProducts = data.products || [];
    filteredProducts = [...allProducts];
    
    populateCategories(allProducts);
    populateProductDropdown(allProducts);
    renderProducts(filteredProducts);
    calculateStatistics(filteredProducts);
    
    showContent();
  } catch (error) {
    showError(error.message);
  }
}

// Pengelolaan State Tampilan UI (Loading, Error, & Content)
function showLoading() {
  loadingState.classList.remove('hidden');
  errorState.classList.add('hidden');
  productsGrid.classList.add('hidden');
}

function showError(message) {
  loadingState.classList.add('hidden');
  errorState.classList.remove('hidden');
  productsGrid.classList.add('hidden');
  errorMessage.textContent = message;
}

function showContent() {
  loadingState.classList.add('hidden');
  errorState.classList.add('hidden');
  productsGrid.classList.remove('hidden');
}

// Render Daftar Produk ke Grid DOM
function renderProducts(products) {
  productsGrid.innerHTML = '';
  
  if (products.length === 0) {
    productsGrid.innerHTML = '<p class="no-data">Tidak ada produk yang sesuai dengan filter.</p>';
    return;
  }

  products.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.tabIndex = 0;
    
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(product.price);

    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
      </div>
      <div class="product-body">
        <span class="product-badge">${product.category}</span>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${formattedPrice}</span>
          <span class="product-rating">⭐ ${product.rating}</span>
        </div>
      </div>
    `;
    
    productsGrid.appendChild(card);
  });
}

// Mengisi Dropdown Kategori Secara Dinamis dari Data API
function populateCategories(products) {
  const categories = [...new Set(products.map(p => p.category))];
  
  categoryFilter.innerHTML = '<option value="all">Semua Kategori</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });
}

// Mengisi Dropdown Form Pilihan Produk
function populateProductDropdown(products) {
  productSelect.innerHTML = '<option value="">-- Pilih Produk --</option>';
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.title;
    productSelect.appendChild(option);
  });
}

// Memproses Penyaringan dan Pengurutan Data
function handleFilterAndSort() {
  const selectedCategory = categoryFilter.value;
  const selectedSort = priceSort.value;

  if (selectedCategory === 'all') {
    filteredProducts = [...allProducts];
  } else {
    filteredProducts = allProducts.filter(p => p.category === selectedCategory);
  }

  if (selectedSort === 'low-to-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === 'high-to-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  renderProducts(filteredProducts);
  calculateStatistics(filteredProducts);
}

// Menghitung Ringkasan Statistik Produk
function calculateStatistics(products) {
  if (products.length === 0) {
    statAvgPrice.textContent = 'USD $0';
    statMaxPrice.textContent = '-';
    statTotalCategories.textContent = '0 Kategori';
    return;
  }

  const totalPrice = products.reduce((acc, curr) => acc + curr.price, 0);
  const avgPrice = totalPrice / products.length;

  const maxPriceProduct = products.reduce((prev, current) => {
    return (prev.price > current.price) ? prev : current;
  });

  const uniqueCategories = new Set(products.map(p => p.category)).size;

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(val);

  statAvgPrice.textContent = formatCurrency(avgPrice);
  statMaxPrice.textContent = `${maxPriceProduct.title} (${formatCurrency(maxPriceProduct.price)})`;
  statTotalCategories.textContent = `${uniqueCategories} Kategori`;
}

