Feature: Ecommerce Validations

    Placing the Order on a Ecommerce Website 
    Scenario: Placing the Order
    Given a login to Ecommerce website with "kishorkumar1@gmail.com" and "Password@123"
    When Add "ZARA COAT 3" to Cart
    Then verify "ZARA COAT 3" is displayed to Cart
    When Enter valid details and place the Order
    Then Verify the Order in present in the OrderHistory
    