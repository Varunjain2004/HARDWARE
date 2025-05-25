<?php
require_once "customer_operations.php";

// Set headers for JSON response
header('Content-Type: application/json');

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];

// Process the request
switch($method) {
    case 'POST':
        // Add new customer
        $data = json_decode(file_get_contents('php://input'), true);
        
        if(isset($data['name']) && isset($data['email']) && isset($data['phone']) && isset($data['address'])) {
            $result = addCustomer($data['name'], $data['email'], $data['phone'], $data['address']);
            if($result) {
                echo json_encode(['success' => true, 'message' => 'Customer added successfully', 'customer_id' => $result]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to add customer']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        }
        break;
        
    case 'GET':
        // Get customers
        if(isset($_GET['id'])) {
            $customer = getCustomerById($_GET['id']);
            if($customer) {
                echo json_encode(['success' => true, 'data' => $customer]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Customer not found']);
            }
        } else {
            $customers = getAllCustomers();
            echo json_encode(['success' => true, 'data' => $customers]);
        }
        break;
        
    case 'PUT':
        // Update customer
        $data = json_decode(file_get_contents('php://input'), true);
        
        if(isset($data['customer_id']) && isset($data['name']) && isset($data['email']) && 
           isset($data['phone']) && isset($data['address'])) {
            $result = updateCustomer($data['customer_id'], $data['name'], $data['email'], 
                                   $data['phone'], $data['address']);
            if($result) {
                echo json_encode(['success' => true, 'message' => 'Customer updated successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to update customer']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        }
        break;
        
    case 'DELETE':
        // Delete customer
        if(isset($_GET['id'])) {
            $result = deleteCustomer($_GET['id']);
            if($result) {
                echo json_encode(['success' => true, 'message' => 'Customer deleted successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to delete customer']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Customer ID is required']);
        }
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => 'Invalid request method']);
        break;
}
?> 