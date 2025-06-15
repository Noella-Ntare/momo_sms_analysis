// Mock data for demonstration - Replace with actual API calls
const MOCK_TRANSACTIONS = [
    {
        id: "123456",
        type: "incoming",
        amount: 5000,
        date: "2024-01-01T10:00:00",
        description: "You have received 5000 RWF from John Doe",
        sender: "John Doe",
        fee: 0
    },
    {
        id: "789012",
        type: "payment",
        amount: -1500,
        date: "2024-01-02T14:30:00",
        description: "Your payment of 1500 RWF to Jane Smith has been completed",
        recipient: "Jane Smith",
        fee: 25
    },
    {
        id: "345678",
        type: "airtime",
        amount: -3000,
        date: "2024-01-03T16:00:00",
        description: "Your payment of 3000 RWF to Airtime has been completed",
        fee: 50
    },
    {
        id: "456789",
        type: "withdrawal",
        amount: -20000,
        date: "2024-01-04T12:00:00",
        description: "You have withdrawn 20000 RWF via agent: Jane Doe",
        agent: "Jane Doe (250123456789)",
        fee: 100
    },
    {
        id: "567890",
        type: "bundle",
        amount: -2000,
        date: "2024-01-05T09:00:00",
        description: "You have purchased an internet bundle of 1GB for 2000 RWF",
        bundle_type: "1GB Internet",
        validity: "30 days",
        fee: 0
    }
];

// Global state
let currentTransactions = [...MOCK_TRANSACTIONS];
let filteredTransactions = [...MOCK_TRANSACTIONS];
let currentPage = 1;
let itemsPerPage = 10;
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

