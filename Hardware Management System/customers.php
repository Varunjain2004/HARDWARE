<?php
session_start();
require_once 'config.php';
require_once 'customer_operations.php';

// Check if user is logged in
if (!isset($_SESSION['isLoggedIn'])) {
    header('Location: index.html');
    exit();
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $email = $_POST['email'] ?? ''; // Optional field

    if (addCustomer($name, $email, $phone, $address)) {
        $success_message = "Customer added successfully!";
    } else {
        $error_message = "Failed to add customer. Please try again.";
    }
}

// Get all customers
$customers = getAllCustomers();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Hardware Store - Customers</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            display: flex;
            min-height: 100vh;
        }
        .sidebar {
            width: 200px;
            background-color: #333;
            color: white;
            padding: 20px;
        }
        .sidebar a {
            color: white;
            text-decoration: none;
            display: block;
            padding: 10px;
            margin: 5px 0;
        }
        .sidebar a:hover {
            background-color: #555;
        }
        .main-content {
            flex: 1;
            padding: 20px;
        }
        .form-container {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .input-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }
        th {
            background-color: #f5f5f5;
        }
        .logout-btn {
            background-color: #ff4444;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 20px;
        }
        .message {
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        .success {
            background-color: #dff0d8;
            color: #3c763d;
        }
        .error {
            background-color: #f2dede;
            color: #a94442;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="sidebar">
            <h2>Menu</h2>
            <a href="dashboard.php">Dashboard</a>
            <a href="customers.php">Customers</a>
            <a href="products.php">Products</a>
            <a href="payments.php">Payments</a>
            <a href="logout.php" class="logout-btn">Logout</a>
        </div>
        <div class="main-content">
            <h2>Customer Management</h2>
            
            <?php if (isset($success_message)): ?>
                <div class="message success"><?php echo $success_message; ?></div>
            <?php endif; ?>
            
            <?php if (isset($error_message)): ?>
                <div class="message error"><?php echo $error_message; ?></div>
            <?php endif; ?>

            <div class="form-container">
                <h3>Add New Customer</h3>
                <form method="POST" action="customers.php">
                    <div class="input-group">
                        <label>Name:</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="input-group">
                        <label>Email:</label>
                        <input type="email" name="email">
                    </div>
                    <div class="input-group">
                        <label>Phone:</label>
                        <input type="tel" name="phone" required>
                    </div>
                    <div class="input-group">
                        <label>Address:</label>
                        <input type="text" name="address" required>
                    </div>
                    <button type="submit">Add Customer</button>
                </form>
            </div>

            <h3>Customer List</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($customers as $customer): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($customer['customer_id']); ?></td>
                        <td><?php echo htmlspecialchars($customer['name']); ?></td>
                        <td><?php echo htmlspecialchars($customer['email']); ?></td>
                        <td><?php echo htmlspecialchars($customer['phone']); ?></td>
                        <td><?php echo htmlspecialchars($customer['address']); ?></td>
                        <td>
                            <a href="edit_customer.php?id=<?php echo $customer['customer_id']; ?>">Edit</a>
                            <a href="delete_customer.php?id=<?php echo $customer['customer_id']; ?>" 
                               onclick="return confirm('Are you sure you want to delete this customer?')">Delete</a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html> 