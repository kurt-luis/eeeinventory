document.addEventListener('DOMContentLoaded', () => {
    const componentGrid = document.querySelector('.component-grid');
    const summaryHigh = document.getElementById('total-high');
    const summaryLow = document.getElementById('total-low');
    const summaryEmpty = document.getElementById('total-empty');
    
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const statusButtons = document.querySelectorAll('#statusButtons .btn');

    let currentStatusFilter = 'All';

    // Dynamic data
    const inventoryData = [
        // Resistors
        { id: 'res-220', type: 'Resistor', value: '220Ω', status: 'high' },
        { id: 'res-1k', type: 'Resistor', value: '1kΩ', status: 'low' },
        { id: 'res-3k3', type: 'Resistor', value: '3.3kΩ', status: 'empty' },
        { id: 'res-10k', type: 'Resistor', value: '10kΩ', status: 'high' },
        
        // Capacitors
        { id: 'cap-10u', type: 'Capacitor', value: '10µF', status: 'high' },
        { id: 'cap-100n', type: 'Capacitor', value: '100nF', status: 'low' },
        { id: 'cap-1m', type: 'Capacitor', value: '1mF', status: 'empty' },
        
        // Other Components
        { id: 'ic-555', type: 'IC', value: 'NE555 Timer', status: 'high' },
        { id: 'led-red', type: 'LED', value: 'Red 5mm', status: 'high' }
    ];

    renderComponents();
    updateSummary();
    
    function renderComponents() {
        componentGrid.innerHTML = '';
        
        inventoryData.forEach(comp => {
            const statusClass = `status-${comp.status}`;
            const bgClass = `bg-${comp.status}`;
            const labelText = comp.status.charAt(0).toUpperCase() + comp.status.slice(1);

            const cardHTML = `
                <div class="card component-card ${statusClass}" id="card-${comp.id}">
                    <div class="card-header">
                        <span class="comp-type">${comp.type}</span>
                        <span class="dot ${bgClass}" id="dot-${comp.id}"></span>
                    </div>
                    <div class="comp-value">${comp.value}</div>
                    <div class="comp-status-label" id="label-${comp.id}">${labelText}</div>
                </div>
            `;
            componentGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    function updateSummary() {
        const highCount = inventoryData.filter(c => c.status === 'high').length;
        const lowCount = inventoryData.filter(c => c.status === 'low').length;
        const emptyCount = inventoryData.filter(c => c.status === 'empty').length;

        summaryHigh.textContent = highCount;
        summaryLow.textContent = lowCount;
        summaryEmpty.textContent = emptyCount;
    }

    searchInput.addEventListener('input', filterComponents);
    categorySelect.addEventListener('change', filterComponents);

    statusButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            statusButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            currentStatusFilter = e.target.textContent.trim();
            filterComponents();
        });
    });

    function filterComponents() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value.toLowerCase();
        const renderedCards = document.querySelectorAll('.component-card'); 

        renderedCards.forEach(card => {
            const compType = card.querySelector('.comp-type').textContent.toLowerCase();
            const compValue = card.querySelector('.comp-value').textContent.toLowerCase();
            
            let cardStatus = 'All';
            if (card.classList.contains('status-high')) cardStatus = 'High';
            if (card.classList.contains('status-low')) cardStatus = 'Low';
            if (card.classList.contains('status-empty')) cardStatus = 'Empty';

            const matchesSearch = compType.includes(searchTerm) || compValue.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all categories' || compType === selectedCategory;
            const matchesStatus = currentStatusFilter === 'All' || cardStatus === currentStatusFilter;

            if (matchesSearch && matchesCategory && matchesStatus) {
                card.style.display = 'flex'; 
            } else {
                card.style.display = 'none'; 
            }
        });
    }
});