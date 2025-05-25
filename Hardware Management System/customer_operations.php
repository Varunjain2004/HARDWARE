<?php
// Include the configuration file
require_once "config.php";

// Function to add a new customer
function addCustomer($name, $email, $phone, $address) {
    global $conn;
    
    $sql = "INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)";
    
    if($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $phone, $address);
        
        if(mysqli_stmt_execute($stmt)) {
            return mysqli_insert_id($conn);
        } else {
            return false;
        }
    }
    return false;
}

// Function to get all customers
function getAllCustomers() {
    global $conn;
    
    $sql = "SELECT * FROM customers ORDER BY created_at DESC";
    $result = mysqli_query($conn, $sql);
    
    $customers = array();
    while($row = mysqli_fetch_assoc($result)) {
        $customers[] = $row;
    }
    
    return $customers;
}

// Function to get a single customer by ID
function getCustomerById($customer_id) {
    global $conn;
    
    $sql = "SELECT * FROM customers WHERE customer_id = ?";
    
    if($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "i", $customer_id);
        
        if(mysqli_stmt_execute($stmt)) {
            $result = mysqli_stmt_get_result($stmt);
            return mysqli_fetch_assoc($result);
        }
    }
    return false;
}

// Function to update a customer
function updateCustomer($customer_id, $name, $email, $phone, $address) {
    global $conn;
    
    $sql = "UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE customer_id = ?";
    
    if($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "ssssi", $name, $email, $phone, $address, $customer_id);
        
        return mysqli_stmt_execute($stmt);
    }
    return false;
}

// Function to delete a customer
function deleteCustomer($customer_id) {
    global $conn;
    
    $sql = "DELETE FROM customers WHERE customer_id = ?";
    
    if($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "i", $customer_id);
        
        return mysqli_stmt_execute($stmt);
    }
    return false;
}
?> 