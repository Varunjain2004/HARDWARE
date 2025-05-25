// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
}

// Login functionality
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication (replace with proper authentication in production)
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials');
        }
    });
}

// Logout functionality
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    });
}

// Dashboard functionality
function updateDashboard() {
    const totalCustomers = document.getElementById('totalCustomers');
    const totalProducts = document.getElementById('totalProducts');
    const totalSales = document.getElementById('totalSales');
    const recentActivities = document.getElementById('recentActivities');

    if (totalCustomers && totalProducts && totalSales && recentActivities) {
        // Get data from localStorage
        const customers = JSON.parse(localStorage.getItem('customers') || '[]');
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const payments = JSON.parse(localStorage.getItem('payments') || '[]');

        // Update statistics
        totalCustomers.textContent = customers.length;
        totalProducts.textContent = products.length;
        
        const totalSalesAmount = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
        totalSales.textContent = `$${totalSalesAmount.toFixed(2)}`;

        // Update recent activities
        const recentPayments = payments.slice(-5).reverse();
        recentActivities.innerHTML = recentPayments.map(payment => `
            <tr>
                <td>${payment.date}</td>
                <td>Payment Received</td>
                <td>$${payment.amount} from ${payment.customer}</td>
            </tr>
        `).join('');
    }
}

// Customer Management
function initCustomerManagement() {
    const addCustomerBtn = document.getElementById('addCustomerBtn');
    const customerForm = document.getElementById('customerForm');
    const customerFormElement = document.getElementById('customerFormElement');
    const cancelCustomerBtn = document.getElementById('cancelCustomerBtn');
    const customersList = document.getElementById('customersList');
    const customerSearch = document.getElementById('customerSearch');

    if (addCustomerBtn && customerForm) {
        addCustomerBtn.addEventListener('click', () => {
            customerForm.style.display = 'block';
            customerFormElement.reset();
        });

        cancelCustomerBtn.addEventListener('click', () => {
            customerForm.style.display = 'none';
        });

        customerFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const customer = {
                id: Date.now(),
                name: document.getElementById('customerName').value,
                email: document.getElementById('customerEmail').value,
                phone: document.getElementById('customerPhone').value,
                address: document.getElementById('customerAddress').value
            };

            const customers = JSON.parse(localStorage.getItem('customers') || '[]');
            customers.push(customer);
            localStorage.setItem('customers', JSON.stringify(customers));

            customerForm.style.display = 'none';
            updateCustomersList();
        });
    }

    function updateCustomersList() {
        if (customersList) {
            const customers = JSON.parse(localStorage.getItem('customers') || '[]');
            const searchTerm = customerSearch ? customerSearch.value.toLowerCase() : '';

            const filteredCustomers = customers.filter(customer =>
                customer.name.toLowerCase().includes(searchTerm) ||
                customer.email.toLowerCase().includes(searchTerm)
            );

            customersList.innerHTML = filteredCustomers.map(customer => `
                <tr>
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.address}</td>
                    <td>
                        <button class="btn btn-secondary" onclick="editCustomer(${customer.id})">Edit</button>
                        <button class="btn btn-secondary" onclick="deleteCustomer(${customer.id})">Delete</button>
                    </td>
                </tr>
            `).join('');
        }
    }

    if (customerSearch) {
        customerSearch.addEventListener('input', updateCustomersList);
    }

    updateCustomersList();
}

// Product Management
function initProductManagement() {
    const addProductBtn = document.getElementById('addProductBtn');
    const productForm = document.getElementById('productForm');
    const productFormElement = document.getElementById('productFormElement');
    const cancelProductBtn = document.getElementById('cancelProductBtn');
    const productsList = document.getElementById('productsList');
    const productSearch = document.getElementById('productSearch');

    if (addProductBtn && productForm) {
        addProductBtn.addEventListener('click', () => {
            productForm.style.display = 'block';
            productFormElement.reset();
        });

        cancelProductBtn.addEventListener('click', () => {
            productForm.style.display = 'none';
        });

        productFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const product = {
                id: Date.now(),
                name: document.getElementById('productName').value,
                category: document.getElementById('productCategory').value,
                price: document.getElementById('productPrice').value,
                stock: document.getElementById('productStock').value,
                description: document.getElementById('productDescription').value
            };

            const products = JSON.parse(localStorage.getItem('products') || '[]');
            products.push(product);
            localStorage.setItem('products', JSON.stringify(products));

            productForm.style.display = 'none';
            updateProductsList();
        });
    }

    function updateProductsList() {
        if (productsList) {
            const products = JSON.parse(localStorage.getItem('products') || '[]');
            const searchTerm = productSearch ? productSearch.value.toLowerCase() : '';

            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );

            productsList.innerHTML = filteredProducts.map(product => `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>$${product.price}</td>
                    <td>${product.stock}</td>
                    <td>${product.description}</td>
                    <td>
                        <button class="btn btn-secondary" onclick="editProduct(${product.id})">Edit</button>
                        <button class="btn btn-secondary" onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                </tr>
            `).join('');
        }
    }

    if (productSearch) {
        productSearch.addEventListener('input', updateProductsList);
    }

    updateProductsList();
}

// Payment Management
function initPaymentManagement() {
    const addPaymentBtn = document.getElementById('addPaymentBtn');
    const paymentForm = document.getElementById('paymentForm');
    const paymentFormElement = document.getElementById('paymentFormElement');
    const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');
    const paymentsList = document.getElementById('paymentsList');
    const paymentSearch = document.getElementById('paymentSearch');
    const paymentCustomer = document.getElementById('paymentCustomer');

    // Populate customer dropdown
    if (paymentCustomer) {
        const customers = JSON.parse(localStorage.getItem('customers') || '[]');
        paymentCustomer.innerHTML = customers.map(customer =>
            `<option value="${customer.name}">${customer.name}</option>`
        ).join('');
    }

    if (addPaymentBtn && paymentForm) {
        addPaymentBtn.addEventListener('click', () => {
            paymentForm.style.display = 'block';
            paymentFormElement.reset();
        });

        cancelPaymentBtn.addEventListener('click', () => {
            paymentForm.style.display = 'none';
        });

        paymentFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const payment = {
                id: Date.now(),
                date: document.getElementById('paymentDate').value,
                customer: document.getElementById('paymentCustomer').value,
                amount: document.getElementById('paymentAmount').value,
                method: document.getElementById('paymentMethod').value,
                notes: document.getElementById('paymentNotes').value
            };

            const payments = JSON.parse(localStorage.getItem('payments') || '[]');
            payments.push(payment);
            localStorage.setItem('payments', JSON.stringify(payments));

            paymentForm.style.display = 'none';
            updatePaymentsList();
            updateDashboard();
        });
    }

    function updatePaymentsList() {
        if (paymentsList) {
            const payments = JSON.parse(localStorage.getItem('payments') || '[]');
            const searchTerm = paymentSearch ? paymentSearch.value.toLowerCase() : '';

            const filteredPayments = payments.filter(payment =>
                payment.customer.toLowerCase().includes(searchTerm) ||
                payment.amount.toString().includes(searchTerm)
            );

            paymentsList.innerHTML = filteredPayments.map(payment => `
                <tr>
                    <td>${payment.date}</td>
                    <td>${payment.customer}</td>
                    <td>$${payment.amount}</td>
                    <td>${payment.method}</td>
                    <td>${payment.notes}</td>
                    <td>
                        <button class="btn btn-secondary" onclick="deletePayment(${payment.id})">Delete</button>
                    </td>
                </tr>
            `).join('');
        }
    }

    if (paymentSearch) {
        paymentSearch.addEventListener('input', updatePaymentsList);
    }

    updatePaymentsList();
}

// Delete functions
function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        const customers = JSON.parse(localStorage.getItem('customers') || '[]');
        const updatedCustomers = customers.filter(customer => customer.id !== id);
        localStorage.setItem('customers', JSON.stringify(updatedCustomers));
        updateCustomersList();
        updateDashboard();
    }
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const updatedProducts = products.filter(product => product.id !== id);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        updateProductsList();
        updateDashboard();
    }
}

function deletePayment(id) {
    if (confirm('Are you sure you want to delete this payment?')) {
        const payments = JSON.parse(localStorage.getItem('payments') || '[]');
        const updatedPayments = payments.filter(payment => payment.id !== id);
        localStorage.setItem('payments', JSON.stringify(updatedPayments));
        updatePaymentsList();
        updateDashboard();
    }
}

// Edit functions
function editCustomer(id) {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const customer = customers.find(c => c.id === id);
    if (customer) {
        document.getElementById('customerName').value = customer.name;
        document.getElementById('customerEmail').value = customer.email;
        document.getElementById('customerPhone').value = customer.phone;
        document.getElementById('customerAddress').value = customer.address;
        document.getElementById('customerForm').style.display = 'block';
        // Store the ID for updating
        document.getElementById('customerForm').dataset.editId = id;
    }
}

function editProduct(id) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productForm').style.display = 'block';
        // Store the ID for updating
        document.getElementById('productForm').dataset.editId = id;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    updateDashboard();
    initCustomerManagement();
    initProductManagement();
    initPaymentManagement();
}); 