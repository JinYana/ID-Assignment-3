# GameMart (ID Assignment 3 - S10206177 & S10203386)
## By Nur Hakimi B Mohd Yasman and Ng Jin Yang

In this project, we created an online shop by scratch, which comes with an account feature and a custom-made inventory - both supported by their own respective databases. Moreover, this website features minigames such as _Trivia_ and _The Price Is Right_, that offer the customers discounts based off whether they win or lose.

This project made great use of [RestDB](https://restdb.io) and localStorage functions to achieve the technical vision of this website, clearly seen in the API usage alongside storing user and order information for the website to use.

## **Design Process**

This website is aimed at consumers who need to shop at the supermarket. We wish to provide them with a convenient and fun way to shop and we believe that our website is the best way to do so via a user friendly website, which incorporates fun games in certain aspects of the website. The conveniency, alongside the technical accuracy and lack of social interaction can serve as large pulling factors towards using our website.

### User stories

- As a customer, I want to be able conveniently shop for items without leaving my house as well as earn discounts for my purchases.
- As a business owner, I want to use an efficient method to attract a large number of customers to visit my website and buy items.


## **Features**

### **Existing features**
Name | Description
------------ | -------------
Log-in function | Current users will have to input their username and password accurately to access the website
Sign-up function | New users will need to fill up a form to assign their (_unique_) username, password and e-mail to create an account
Navigation bar | Quick and easy navigation through the website
Responsive pages | The website is fully functional and displays all its elements properly in any device and browser
Sort-by-category function | Website will display items based on category input chosen by the user
Add-to-cart function | Users can add the items they want to purchase into a cart, which will be displayed in the checkout page
Checkout feature | Items will be displayed, and repeat orders of items will be compiled together. User information will automatically be filled in.
Trivia game | Using an online API, users will answer trivia questions and get discounts if they successfully answer
The Price is Right game | The website will display a random item from the shop inventory. The user has to guess the price in 5 seconds, and will get a discount if they guessed correctly/close to the original price.
Lottie animations | Provide the users with a fun and user friendly experience on the website

### **Features left to implement**
1. We can look to add more games to make the website more fun and interactive.
    * Click circles all over the screen. Circles will disappear in a set period of time, and are constantly moving. Get within a certain threshold (7/10?) to get discounts.
    * A maze game, making use of the user's mouse to escape the maze. Maze walls will instantly kill them, and they have to escape within a certain period of time.
1. Add a search for item feature, for specific items. 
    * Searching for 'toothpaste' will show all the items with the word 'toothpaste' in it.
1. Another database to store orders, solely for the outlet and delivery team to make use of.
    * Create code to supplement this feature, such as sending the information using AJAX.

## **Technologies Used**

### **Languages**
Name | Purpose
------------ | -------------
[HTML](https://html.spec.whatwg.org) | Used as a foundation for the elements displayed in the website.
[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) | used as a method of styling and attributing the elements in the HTML.
[Javascript](https://www.javascript.com) | used to make the website interactive.

### **Libraries**
Name | Purpose
------------ | -------------
[JQuery](https://jquery.com) | Used to simplify DOM manipulation
[Bootstrap](https://getbootstrap.com) | Used to simplify the design process, especially with its responsive grid functions and extensive prebuilt components.
[Lottie](https://lottiefiles.com) | Used to make website more lively and user friendly
[Google Fonts](https://fonts.google.com) | To style the text on our website

### **Tools**
Name | Purpose
------------ | -------------
[RestDB](https://restdb.io) | Used to store items that were displayed on the website as well as to store user accounts
[Open Trivia Database](https://opentdb.com/api_config.php) | Used to fetch trivia questions thate were to be displayed on the website

### **Framework**
Name | Purpose
------------ | -------------
[Bootstrap Checkout Example](https://getbootstrap.com/docs/4.0/examples/checkout/) | Used this template to layout the final checkout form


## **Testing**

1. Log-in form
    1. Go to index.html
    1. Try to submit empty form and ensure that an error message about the required fields (_Username **AND** Password_) appears.
    1. Try to submit the form with a username that does not exist/wrong password/wrong username and ensure that a fail animation appears.
    1. Try to submit the form with all inputs valid (such as Username: **Thomason** & Password: **abcdefg**) and ensure that a success animation appears, right before it redirects the user to the main page.

2. Sign-Up form:
    1. Go to index.html and click on '_Sign up now_'. Ensure a new form appears.
    1. Try to submit empty form and ensure that an error message about the required fields (_Username, Password **AND** E-mail_) appears.
    1. Try to submit the form with a username that already exists, and ensure that an error message appears stating the username already exists.
    1. Try to submit the form with an invalid input in the e-mail section, and ensure that an error message appears stating invalid input.
    1. Try to submit the form with all inputs valid and ensure that the page redirects the user to the main page.

3. Navigation bar:
   1. Click on all the Links on the nav-bar
   2. ensure that the links bring you to these pages:
       * GameMart logo ----> main.html
       * Home ----> main.html
       * Trivia ----> trivia.html
       * TPIR ----> priceisright.html
       * Cart Symbol ----> checkout.html
              

4. Responsive Pages:
   1. Right click on any page and click inspect element
   2. Select any device you wish to test the website on
   3. The page should change itself to fit the device's screen

5. Sort-by-category:
   1. Click on the select bar at the top on main.html
   2. Select the desired category
   3. Make sure all items displayed belongs to the category chosen
   
   

6. Add-to-cart function:
    1. Go to item.html via clicking on an item in main.html 
    1. Try to submit an empty input for quantity and ensure an error message shows up stating the minimum value is 1.
    1. Try to submit the form with a valid input and ensure that it redirects you to the main page.
    1. Check the checkout.html page to see if the item is present.
    1. Try to submit the form with the same item and check that the checkout presents the items as only one item and not two.

7. Checkout feature: 
   1. Go to checkout.html
   1. Ensure that if user hasn't added anything to cart, it displays zero items and the message 'There are currently no items in your cart'.
   1. If user has added items, ensure the total items tally up and items are displayed correctly. The sub-total, discount and total values must all be accurate.
   1. Try to delete one item from the cart and ensure that the page refreshes, only to re-display the updated cart with that previous item already removed.
   1. Try to submit the checkout form with all inputs empty, and ensure that validation message appears.
   1. Submit checkout form with all valid inputs, and ensure that a message appears saying "Your order has been submitted! Redirecting you to the main page...", before redirecting the user to main.html. Ensure the cart is empty afterwards, and discounts have been used up.
   

8. Trivia game:

   1. Right click on any page and click inspect element
   2. Look at the console and click on the array to see the correct answer for the question
   3. Submit the correct answer to the trivia form
   4. The website should return with a congratlations message and show how many discounts you have won
   5. Refresh the page
   6. Repeat steps 1 and 2
   7. Submit the wrong answer to the trivia form
   8. The website should return with a "Try Again Next Time" message

9. The Price is Right game:
    1. Click 'TPIR' on the navbar, ensure a loading animation is shown while waiting for the API to load.
    1. Once loaded, ensure the main page is shown, explaining the game.
    1. Click start.
    1. Ensure everything is in order and a countdown has begun, counting down from 5.
    1. Check the console to see the price.
    1. If input empty, player loses.
    1. If input is within $3 of correct price, player wins 5% off.
    1. If input is accurate, player wins 20% off.

10. Lottie animations:
    1. Ensure that there is no out of place animations and the animations don't freeze throughout the website.

## **Credits**

### **Content**
- All of the item descriptions and item prices were taken from [FairPrice](https://www.fairprice.com.sg).

### **Media**
- Most icons were taken from [FlatIcon](https://www.flaticon.com), specifically for the [website icon](https://www.flaticon.com/free-icon/shopping-store_3643763?term=shop&page=2&position=51&page=2&position=51&related_id=3643763&origin=search) and [checkout icon](https://www.flaticon.com/free-icon/shopping-cart_3144456?term=cart&page=1&position=9&page=1&position=9&related_id=3144456&origin=search).

- [Contribution guidelines for this project](.\Credit.txt)

- Animations were taken from [LottieFiles](https://lottiefiles.com).

### **Acknowledgements**

We received inspiration from the assignment brief, under e-commerce ideas.

    



