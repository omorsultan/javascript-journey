# Building the Checkout Page — Cart Functionality Notes

Notes from the "Amazon Project" tutorial covering how the checkout page is built: rendering cart items, calculating totals, handling delivery options, deleting products, and persisting the cart with `localStorage`.

---

## 1. Navigating to the Checkout Page

- Clicking the **cart icon** in the top right of the homepage navigates to the checkout page.
- The cart icon works via a standard HTML **link element** (`<a>`), which uses the `href` attribute to define the destination:

```html
<a href="https://youtube.com">...</a>
```

- Clicking the link element takes you to whatever URL is inside `href`.

---

## 2. Checkout Page Structure

The checkout page (`checkout.html`) is linked to its own script:

```html
<script type="module" src="scripts/checkout.js"></script>
```

The page has two main sections:

| Section | Purpose |
|---|---|
| **Cart section** (left) | Shows the products currently in the cart |
| **Payment/Order Summary** (right) | Calculates and displays the cost of the order |

---

## 3. Cart Data & Normalization

### Starting point
```js
export const cart = [];
```

Some default values are added to make development easier.

### Why the cart doesn't store full product details

Instead of duplicating each product's image, name, and price directly inside the cart array, the cart only stores:
- `productId`
- `quantity`

```js
export const cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
}];
```

**Why?** The full product details (image, name, price, ratings, etc.) already live in the `products` array (`products.js`). Saving them again in `cart.js` would mean **duplicating the same data in two places** — a technique to avoid, generally called **normalizing the data**.

Instead, we just save the product's **ID** in the cart, and use that ID to **look up** the full product info inside the `products` array whenever we need it.

### Looking up product details from an ID

```js
import { cart } from '../data/cart.js';
import { products } from '../data/products.js';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  // matchingProduct now has image, name, price, etc.
});
```

---

## 4. Rendering Cart Items (HTML Generation)

For each cart item, checkout.js generates the `cart-item-container` HTML using JavaScript template strings, pulling values from `matchingProduct`:

```html
<img class="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg">
...
<div class="product-price">
  $${(matchingProduct.priceCents / 100).toFixed(2)}
</div>
```

---

## 5. Sharing Code Between Files with Utils/Modules

The `formatCurrency` logic (converting price in cents to a dollar string) was needed in **both** `amazon.js` (homepage) and `checkout.js`. Rather than repeating the code, it was extracted into a **shared module**.

### Steps
1. Create a `utils` folder for shared/reusable functions.
2. Create `money.js` inside `utils` (utils can be split by type, e.g. money-related utils vs others).

```js
// scripts/utils/money.js
export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}
```

3. Import and use it wherever needed:

```js
import { formatCurrency } from './utils/money.js';

// usage
`$${formatCurrency(product.priceCents)}`
```

This avoids repeating the same logic between `amazon.js` and `checkout.js`.

---

## 6. Delivery Options — Radio Buttons

Delivery options use `<input type="radio">`. The **key rule**: inputs sharing the same `name` attribute allow only **one** to be selected at a time.

```html
<input type="radio" name="name1">
```

- Since each product needs its **own independent** delivery choice, each product's radio group needs a **unique `name`**, otherwise selecting an option for one product would deselect the option for another.

```html
<!-- Product 1 group -->
<input type="radio" name="name1">
<input type="radio" name="name1">
<input type="radio" name="name1">

<!-- Product 2 group -->
<input type="radio" name="name222">
<input type="radio" name="name222">
<input type="radio" name="name222">
```

To make each group unique dynamically, the product's ID is used as part of the `name`:

```html
<input
  type="radio"
  class="delivery-option-input"
  name="delivery-option-${matchingProduct.id}">
```

---

## 7. Deleting a Product from the Cart

### Goal
1. Remove the product from the `cart` array.
2. Update the HTML to reflect the change.

### Step 1 — Identify which product to delete

Delete links are tagged with a special class and carry the product's ID in a `data-*` attribute:

```js
document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
    });
  });
```

### Step 2 — Remove the item from the array

Three common ways to delete from a JS array:

**Delete by index (most common):**
```js
const arr = ['a', 'b', 'c', 'd'];
arr.splice(1, 1); // Remove 1 element at index 1
console.log(arr); // ['a', 'c', 'd']
```

**Delete by value:**
```js
const arr = ['a', 'b', 'c', 'd'];
const index = arr.indexOf('c');
if (index !== -1) {
  arr.splice(index, 1);
}
console.log(arr); // ['a', 'b', 'd']
```

**Delete an object from an array (used for the cart):**
```js
const cart = [
  { productId: '1', quantity: 2 },
  { productId: '2', quantity: 1 }
];
const productIdToDelete = '2';
const index = cart.findIndex(item => item.productId === productIdToDelete);
if (index !== -1) {
  cart.splice(index, 1);
}
console.log(cart);
```

### Final `removeFromCart` function

```js
export function removeFromCart(deleteId) {
  const index = cart.findIndex(item => item.productId === deleteId);

  if (index !== -1) {
    cart.splice(index, 1);
  }
}
```

### Step 3 — Update the HTML (Remove the Element from the DOM)

Every element retrieved from the DOM has a `.remove()` method:

```js
const button = document.querySelector('button');
button.remove();
```

**Identifying which container to remove:** Each `cart-item-container` gets a special class containing the product ID, e.g.:

```html
<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
```

Then, on delete:

```js
document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
    });
  });
```

---

## 8. Persisting the Cart with `localStorage`

Whenever the cart is updated (item added or removed), it needs to be **saved to `localStorage`** so it persists across page reloads.

> ⚠️ `localStorage` can only store **strings**. To store an array/object like `cart`, convert it with `JSON.stringify()`.

```js
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
```

### Calling `saveToStorage()` after every cart mutation

```js
export function addToCart(productId) {
  // ... existing logic to add/update item ...
  else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }
  saveToStorage();
}

export function removeFromCart(deleteId) {
  const index = cart.findIndex(item => item.productId === deleteId);

  if (index !== -1) {
    cart.splice(index, 1);
  }
  saveToStorage();
}
```

---

## Summary of Key Concepts

| Concept | Why it matters |
|---|---|
| **Data normalization** | Avoids duplicating product data between `cart` and `products` arrays — cart only stores `productId` + `quantity` |
| **Utils/modules** | Shared logic (e.g. `formatCurrency`) lives in one place and is imported wherever needed |
| **Unique radio `name` per product** | Ensures each product's delivery option selection is independent |
| **`data-*` attributes** | Used to pass IDs (product ID, delete ID) from HTML elements into JS event handlers |
| **`array.findIndex()` + `splice()`** | Standard pattern for removing an object from an array by matching a property |
| **`element.remove()`** | Removes a DOM element directly, without needing to touch its parent |
| **`localStorage` + `JSON.stringify`** | Persists cart data across page reloads (strings only, so objects/arrays must be serialized) |