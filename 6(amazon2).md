# JavaScript Amazon Project — Cart Functionality (Part 2)

## 1. Implementing the "Add to Cart" Button

### Step 1: Locate the button placeholder
```html
<button class="add-to-cart-button
button-primary">
  Add to Cart  <!--now we will
  implement add to cart button
  here -->
</button>
</div>`; // ekhane paste korbo
// tab press kore indexing thik
```

### Step 2: Add a JS hook class
```html
<button class="add-to-cart-button
button-primary js-add-to-cart">
  Add to Cart  <!--now we will
  implement add to cart button
  here -->
</button>
</div>`; // ekhane paste korbo
// tab press kore indexing thik
```

### Step 3: Select all buttons and loop
```js
document.querySelectorAll('.js-add-to-cart')
  .forEach
  // All use korchi and forEach loop
```

### Step 4: Attach a click event listener to each button
```js
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => { // add to cart holo ekta
  // button tai erokom naming. click er jonno event listener
    button.addEventListener('click', () => { // we want
    // to run another function when click
      console.log('Added product'); // for checking
    });
  });
```

---

## 2. Modeling the Cart as Data

- Think of a **cart** as basically just a **list**.
- Inside this list: **the product** we want to buy and **the quantity/number** of that product.

### In JavaScript
```js
const cart = [
  {
    product: 'Basketball',
    quantity: 1
  },
  {
    product: 'T-shirt',
    quantity: 2
  }
];
```

### File organization
```
data/
├── cart.js
└── products.js
```

---

## 3. The Core Problem: "How do we know which product to add?"

```js
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {

    });
  });

cart.push({
  productName: 'Basketball',
  quantity: 1
});
```

The button click works, but we need a way to identify **which specific product** was clicked — this is solved using **Data Attributes**.

---

## 4. Data Attributes

### What is a Data Attribute?
- It is just **another HTML attribute**.
- It allows us to **attach any information to an element**.

### Syntax for a Data Attribute
- Is just an HTML attribute.
- Has to **start with `"data-"`**.
- Then give it **any name** (written in **kebab-case**).

```html
data-product-name="${product.name}">
```

### Applying it to the Add to Cart button
```html
<button
  class="add-to-cart-button
  button-primary js-add-to-cart"
  data-product-name="${product.
  name}">
  Add to Cart  <!--now we will
  implement add to cart button
  here -->
</button>
</div>`; // ekhane paste korbo
```

### Adding more data attributes
```html
data-product-image="${product.image}"
data-product-price="${product.priceCents}"
```

### Verifying in DevTools (Elements tab)
```html
<div class="added-to-cart">
  <img src="images/icons/checkmark.png">
  Added
</div>
<button class="add-to-cart-button button-primary js-add-to-c
art" data-product-name="Black and Gray Athletic Cotton Socks
- 6 Pairs"> ... </button>
```

---

## 5. Reading Data Attributes — `.dataset`

- The **`.dataset` property** basically gives us **all the data attributes attached to a button**.

```js
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      console.log(button.dataset);
    });
  });
```

**Console output:**
```
DOMStringMap {productName: 'Black and Gray Athletic Cotton Socks - 6 Pairs'}
  productName: "Black and Gray Athletic Cotton Socks - 6 Pairs"
  [[Prototype]]: DOMStringMap
```

> **Note:** notice that the attribute name gets **converted from `data-product-name` (kebab-case) → `productName` (camelCase)** automatically.

### Accessing a specific data value
```js
console.log(button.dataset.productName);
```

---

## 6. Pushing the Selected Product into the Cart

```js
button.addEventListener('click', () => {
  const productName = button.dataset.productName;

  cart.push({
    productName: productName,
    quantity: 1
  });

  console.log(cart);
});
```

**Console output after multiple clicks:**
```
(4) [{...}, {...}, {...}, {...}]
  0: {productName: 'Black and Gray Athletic Cotton Socks - 6 Pairs', quantity: 1}
  1: {productName: 'Intermediate Size Basketball', quantity: 1}
  2: {productName: 'Adults Plain Cotton T-Shirt - 2 Pack', quantity: 1}
  3: {productName: 'Adults Plain Cotton T-Shirt - 2 Pack', quantity: 1}
  length: 4
```

⚠ **Problem:** clicking "Add to Cart" on the same product twice adds **two separate entries** instead of increasing the quantity.

---

## 7. Preventing Duplicate Entries — Update Quantity Logic

### Steps
1. **Check if the product is already in the cart.**
2. **If it is in the cart, increase the quantity.**
3. **If it's not in the cart, add it to the cart.**

### Implementation
```js
// ------ update quantity only-------//
let matchingItem;

cart.forEach((item) => {
  if (productName === item.productName) {
    matchingItem = item;
  }
});

if (matchingItem) {
  matchingItem.quantity += 1;
} else {
  cart.push({
    productName: productName,
    quantity: 1
  });
}
console.log(cart);
```

**Result after clicking the same product 4 times:**
```
[{...}]
  0: {productName: 'Intermediate Size Basketball', quantity: 4}
  length: 1
```

---

## 8. Fixing Ambiguous Product Names — Using `productId`

- Two different products can have the **same name** (e.g., two "Intermediate Size Basketball" listings with different prices/ratings), so matching by **name** is unreliable.
- **To fix this:**
  - Give each product an **`id`**.
  - This `id` should be **unique**.

### Updated cart push using `productId`
```js
matchingItem.quantity += 1;
}
else {
  cart.push({
    productId: productId, // use productId
    instead of productName
    quantity: 1
  });
}
```

### Updated file structure
```
AmazonProject/
├── backend/
├── data/
│   ├── cart.js
│   └── products.js
└── scripts/
```

### `cart.js`
```js
const cart = [];
```

### Loading scripts in order (`amazon.html`)
```html
<script src="data/cart.js"></script>
<script src="data/products.js"></script>
<!--it will run one by one 1st load data then go-->
<script src="scripts/amazon.js"></script>
```

---

## 9. Checkout Page — Order Summary

Example checkout summary generated from the cart:

```
Cart: 3

Checkout (3 items)
Review your order

Order Summary
Items (3):             $42.75
Shipping & handling:    $4.99
--------------------------------
Total before tax:      $47.74
Estimated tax (10%):    $4.77
--------------------------------
Order total:           $52.51

[ Place your order ]
```

### Steps to calculate & display cart quantity
1. **Calculate the quantity.**
2. **Put the quantity on the page.**

---

## 10. Calculating & Displaying Total Cart Quantity

```js
let cartQuantity = 0;
cart.forEach((item) => {
  cartQuantity += item.quantity;
});
```

### Target HTML element (cart icon in header)
```html
<img class="cart-icon" src="images/icons/cart-icon.svg">
<div class="cart-quantity js-cart-quantity">0</div>
<div class="cart-text">Cart</div>
```

- The `js-cart-quantity` class is used as the **JS hook** to update the displayed number dynamically.

---

## Quick Reference

| Concept | Key Point |
|---|---|
| Add-to-cart button | Give it a `js-` class hook (e.g., `js-add-to-cart`) for JS targeting |
| Data Attribute | HTML attribute starting with `data-`, written in kebab-case |
| Reading data attributes | `element.dataset.propertyName` (auto camelCase conversion) |
| Cart data structure | Array of objects: `{ productId/productName, quantity }` |
| Avoid duplicate entries | Check if product exists in cart → increase quantity; else push new entry |
| Unique identification | Use a unique `productId` instead of `productName` (names can repeat) |
| Total cart quantity | Loop through cart, sum all `item.quantity` values |
| Display quantity | Use a `js-cart-quantity` hook and set its `innerHTML`/text to the total |