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