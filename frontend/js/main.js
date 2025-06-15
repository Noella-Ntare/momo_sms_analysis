// Mock data for demonstration - Replace with actual API calls
let currentTransactions = [];
let filteredTransactions = [];
let currentPage = 1;
let itemsPerPage = 10;

document.addEventListener('DOMContentLoaded', function () {
    fetchTransactions();
    initializeEventListeners();
});

function fetchTransactions() {
    fetch('transactions.json')
        .then(response => response.json())
        .then(data => {
            currentTransactions = data;
            filteredTransactions = [...data];
            updateDashboard(); // this populates totals, charts, tables
        })
        .catch(error => {
            console.error("Error loading transactions:", error);
        });
}


// Global state
let charts = {};

// DOM elements
const elements = {
    totalTransactions: document.getElementById('totalTransactions'),
    totalAmount: document.getElementById('totalAmount'),
    searchInput: document.getElementById('searchInput'),
    transactionType: document.getElementById('transactionType'),
    dateFrom: document.getElementById('dateFrom'),
    dateTo: document.getElementById('dateTo'),
    minAmount: document.getElementById('minAmount'),
    maxAmount: document.getElementById('maxAmount'),
    applyFilters: document.getElementById('applyFilters'),
    clearFilters: document.getElementById('clearFilters'),
    transactionsTableBody: document.getElementById('transactionsTableBody'),
    paginationInfo: document.getElementById('paginationInfo'),
    pageNumbers: document.getElementById('pageNumbers'),
    prevPage: document.getElementById('prevPage'),
    nextPage: document.getElementById('nextPage'),
    transactionModal: document.getElementById('transactionModal'),
    modalBody: document.getElementById('modalBody'),
    closeModal: document.getElementById('closeModal'),
    loadingSpinner: document.getElementById('loadingSpinner')
};

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadTransactionData();
    hideLoading();
});

function initializeEventListeners() {
    // Filter controls
    elements.applyFilters.addEventListener('click', applyFilters);
    elements.clearFilters.addEventListener('click', clearFilters);
    elements.searchInput.addEventListener('input', debounce(applyFilters, 300));
    
    // Pagination
    elements.prevPage.addEventListener('click', () => changePage(currentPage - 1));
    elements.nextPage.addEventListener('click', () => changePage(currentPage + 1));
    
    // Modal controls
    elements.closeModal.addEventListener('click', closeModal);
    elements.transactionModal.addEventListener('click', function(e) {
        if (e.target === elements.transactionModal) {
            closeModal();
        }
    });
    
    // Chart toggles
    document.querySelectorAll('.chart-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const chartType = this.dataset.chart;
            const container = this.closest('.chart-container');
            const canvas = container.querySelector('canvas');
            
            // Update active state
            container.querySelectorAll('.chart-toggle').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart
            if (canvas.id === 'transactionTypeChart') {
                updateTransactionTypeChart(chartType);
            }
        });
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && elements.transactionModal.classList.contains('active')) {
            closeModal();
        }
    });
}

function showLoading() {
    elements.loadingSpinner.classList.remove('hidden');
}

function hideLoading() {
    elements.loadingSpinner.classList.add('hidden');
}

function loadTransactionData() {
    showLoading();

    fetch('data/cleaned_data.json')
        .then(response => response.json())
        .then(data => {
            currentTransactions = data;
            filteredTransactions = [...currentTransactions];
            updateDashboard();
            hideLoading();
        })
        .catch(error => {
            console.error('Error loading transaction data:', error);
            hideLoading();
        });
}

    
   
function generateMockData(count) {
    const types = ['incoming', 'payment', 'transfer', 'bank_deposit', 'airtime',]
}

