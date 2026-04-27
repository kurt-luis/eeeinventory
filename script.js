document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const statusButtons = document.querySelectorAll('#statusButtons .btn');
    const componentCards = document.querySelectorAll('.component-card');

    let currentStatusFilter = 'All';

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

        componentCards.forEach(card => {
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