<?php
session_start();
require_once 'config.php';
require_once 'customer_operations.php';

// Check if user is logged in
if (!isset($_SESSION['isLoggedIn'])) {
    header('Location: index.html');
    exit();
}

// Get customer ID from URL
$customer_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

// Delete customer
if ($customer_id > 0) {
    if (deleteCustomer($customer_id)) {
        header('Location: customers.php?success=2');
    } else {
        header('Location: customers.php?error=1');
    }
} else {
    header('Location: customers.php');
}
exit();
?> 