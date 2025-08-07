<?php
// Initialize response array
$response = array(
    'success' => false,
    'message' => ''
);

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
    $details = isset($_POST['details']) ? htmlspecialchars($_POST['details']) : '';
    
    // Get selected products (if any)
    $products = isset($_POST['products']) ? $_POST['products'] : array();
    $productsList = '';
    
    if (!empty($products)) {
        $productsList = "<strong>Products of Interest:</strong><br>";
        foreach ($products as $product) {
            // Ensure checkbox values are properly sanitized
            $productsList .= "- " . htmlspecialchars($product) . "<br>";
        }
    }
    
    // Log products for debugging
    error_log('Products selected: ' . print_r($products, true));
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($phone) || empty($products)) {
        $response['message'] = 'Please fill in all required fields';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Please enter a valid email address';
    } else {
        // Set email recipient
        $to = "info@prachingroup.com"; // Replace with your actual email
        
        // Set email subject
        $subject = "New Contact Form Submission from $name";
        
        // Build email content
        $email_content = "<html><body>";
        $email_content .= "<h2>New Contact Form Submission</h2>";
        $email_content .= "<p><strong>Name:</strong> $name</p>";
        $email_content .= "<p><strong>Email:</strong> $email</p>";
        $email_content .= "<p><strong>Phone:</strong> $phone</p>";
        $email_content .= "<p>$productsList</p>";
        
        if (!empty($details)) {
            $email_content .= "<p><strong>Additional Details:</strong><br>$details</p>";
        }
        
        $email_content .= "</body></html>";
        
        // Set email headers
        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        
        // Send email
        if (mail($to, $subject, $email_content, $headers)) {
            $response['success'] = true;
            $response['message'] = 'Thank you for your message. We will get back to you soon!';
            
            // Redirect back to the contact page with success message
            header("Location: index.html?status=success#contact");
            exit;
        } else {
            $response['message'] = 'Sorry, there was an error sending your message. Please try again later.';
            
            // Redirect back to the contact page with error message
            header("Location: index.html?status=error#contact");
            exit;
        }
    }
} else {
    // Not a POST request
    $response['message'] = 'Invalid request method';
    
    // Redirect back to the contact page
    header("Location: index.html#contact");
    exit;
}

// If we get here, something went wrong, return JSON response
header('Content-Type: application/json');
echo json_encode($response);