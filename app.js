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