# release 1.0 - Oaxaca Restaurant Application

## Overview

The release 1.0 version introduces the basic Graphical User Interface (GUI) for the Restaurant application from the customer side and log in page for the waiters' side.

## Additions

### GUI Components for Customer side

#### 1. 'Home' Page

Improved layout for better user experience.

#### 2. 'About Us' Page

Updated content for clarity and relevance.

#### 3. 'Menu' Page

Implemented functionality to add items to the cart.
Added a cart feature displaying cart items which will then lead to checkout page.

#### 4. 'Contact Us' Page

Updated contact details content for the better communication with the restaurant.

### GUI Components for Waiter side

#### 1. 'Log in' Page

Added login functionality specifically for waiters.

#### 2. 'Active Orders' Page

Waiter side page displaying current orders upon waiter login which will later be Dashboard for waiters.

## Bug fixes and improvements

Resolved various bugs and made overall enhancements for smoother operation.

## Performance

Implemented optimizations to enhance system performance.

## Testing

The release has undergone a testing to ensure API routes work properly over the whole application using a API testing tool called Postman.

---

# release 2.0 - Implementation of Role based login, Cart function, and Waiter side pages

## Overview

The release 2.0 version introduces waiter's view with the upgraded Graphical User Interface (GUI) for the Restaurant application and Log in authentication. Cart feature has also been implemented and connected in order for the waiter to get access to what customer ordered.

## Additions

### GUI Components for Customer side

#### 1. 'Cart' Pop Up

Cart pop up is implemented to view order summary after the customer has added items to the basket. Cart pop up will be displayed with items, total amount spent in it once you click the basket.

#### 2. 'Log in' Page

Log in page is implemented for waiter to display waiter dashboard after successfully logged in. Only staff members are allowed to log in. Customers do not need any account to order.

### GUI Components for Waiter side

#### 1. 'Log in' Page

Added login functionality specifically for waiters which will take you to waiter dashboard after successfully logged in.

#### 2. 'Cancelled Orders' Page

Waiter side page displaying current orders upon waiter login which will later be Dashboard for waiters.

#### 3. 'Tables' Page

Implemented Tables view for the waiter side to see which tables are available. There are 20 tables in total.

#### 4. 'Table Ordering' Pages

Ordering more items including the checkout on one side is implemented for each table. If table 1 orders something, when you click table 1, it will take you to table1 page where the waiter can order more for table 1 and order summary is displayed.

## Bug fixes and improvements

#### 1. 'Active Orders' Page

Added Delivered and Cancel buttons on each order. When you click Cancel, it will be removed from Active orders page and will show up in Cancelled Orders Page.

## Performance

Refactored both frontend and backend for code quality. Implemented optimizations to enhance system performance.

## Testing

The release has undergone a testing to ensure API routes work properly over the whole application using a API testing tool called Postman.

---

# release 3.0 - Implementation of Admin View, Kitchen View, Real Time order updates, Payment and Order Confirmation

## Overview

The release 3.0 version is very much closer to the complete version to the Oaxaca Restaurant Application which introduces Kitchen view and Admin view. All kitchen, waiter, customer side and database has all been connected. Updates changes in real time.

## Additions

### GUI Components for Customer side

#### 1. 'Assistance Pop up'

There will be an assistance button at the rightmost part of navigation bar, where customers can notify waiters that they are in need of help. It asks the customer for table number and reason.

#### 1. 'Payment Page'

Once the customer sends order, it will take the customer to payment page and will ask card details. Once the card details is submitted successfully, it will show an alert box for order confirmation. After you pay, the items ordered will be cleared and the table will become available for the next customer.

### GUI Components for Kitchen side

#### 1. 'Orders page'

When customer orders, the order will be sent to kitchen as well.
Each order includes Ready button to notify waiters that the order is ready.

### GUI Components for Waiter side

#### 1. 'Order History' Page

This page provides two modes: Completed Orders mode to view all completed orders and Cancelled Orders mode to see all cancelled orders with toggle.

#### 2. 'Assitance' Page

When customer notifys waiter to come, all the assistance requests will be shown in Assistance page, with a button Request Answered. Then the request will be removed since it is completed.

### GUI Components for Admin side

Admin role has access to all waiter pages and data management.

#### 1. 'User Management' Page

You will be able to create, edit, delete users which has directly been connected to the users table in database.
When you click +New button, it will show a pop up for the admin to input the details of newly added user.

#### 2. 'Category Management' Page

You will be able to create, edit, delete categories which has directly been connected to the category table in database.
When you click +New button, it will show a pop up for the admin to input the information of new category.

#### 3. 'Menu Management' Page

You will be able to create, edit, delete menu items which has directly been connected to the menu table in database.
When you click +New button, it will show a pop up for the admin to input the information of new menu item.

## Bug fixes and improvements

#### 1. 'Active Orders' Page

Added Order status, Delivered and Cancel buttons on each order.
Order status will be PROCESSING and Delivered button is disabled once the order is received. Once READY is clicked from kitchen side, Order status will become READY and Delivered button is now accessible.  
When you click Delivered, it will be removed from Active orders page and will show up in Completed Orders mode of Order History Page.

#### 2. 'Log out' button

Log out button is implemented. Once it is clicked, it will log the user out and go back to the log in page.

#### 3. 'Table Number' Page

This page is dynamic page for each table from Tables page. Ordering for the customer as a waiter is also implemented.
When you click T1, it will take you to the page with menu on the left and checkout on the right.

- Once you choose menu items, it will show up on the right side in order summary or checkout. You will be able to add or remove using + - buttons. The total amount will be updated real time.
- On the checkout side, there will be Order button to order newly selected items, Pay button and Print button. When Pay is clicked, a pop up asking for the amount paid will show up. Once you have paid, the items ordered will be cleared and table will become available on Tables page.

## Performance

Real time updating system is implemented in order to see the updates without manually refreshing after each change.
Refactored both frontend and backend for code quality. Implemented optimizations to enhance system performance.

## Testing

The release has undergone a testing to ensure API routes work properly over the whole application using a API testing tool called Postman.

---

# release 4.0 - A Complete Version of Oaxaca Restaurant Application

## Overview

The release 4.0 version is ready to go into the real world. All customer side, waiter side, and kitchen side have been implemented, upgraded for the better UI and functionalities.

## Bug fixes and improvements

Some bugs from the backend and database have been fixed.

## Performance

Since code quality is taken care of to be compact, effective, and easily understandable aligning naming conventions, performance has been improved.

## Testing

The release has undergone a testing to ensure API routes work properly over the whole application using a API testing tool called Postman.
