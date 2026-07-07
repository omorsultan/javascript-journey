# Payment Summary: File Splitting, Reusable Functions & Currency Formatting

## 1. Splitting Code into Separate Files

As `checkout.js` grows, it becomes hard to manage. Best practice: **split responsibilities into separate files.**

```
scripts/
└── checkout/
    ├── orderSummary.js      // renders the cart items section
    └── paymentSummary.js    // renders the order totals section
```

### Updating `checkout.js`

```js
import { renderOrderSummary } from './checkout/orderSummary.js';

renderOrderSummary();
```

> **Reminder:** whenever files move into new folders, all relative import paths (`./`, `../`) must be updated to match the new structure.

### Example Import Block (`orderSummary.js`)

```js
import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
```

---

## 2. The Main Idea of JavaScript (Recap)

Every interactive feature follows the same 3-step structure:

| Step | Description |
|---|---|
| **1. Save the data (Model)** | Store and manage state (e.g., cart, products) |
| **2. Generate the HTML (View)** | Turn data into visual markup |
| **3. Make it interactive (Controller)** | Respond to user actions and update Model + View |

---

## 3. Building `paymentSummary.js`

Wrap all logic inside a function so the HTML can be **regenerated** whenever the cart changes.

```js
export function renderPaymentSummary() {
  // Steps:
  // 1. Loop through the cart
  // 2. For each product: price * quantity
  // 3. Add everything together

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">$42.75</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$4.99</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$47.74</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$4.77</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$52.51</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
}
```

**Target UI (Order Summary panel):**

| Line | Value |
|---|---|
| Items (3) | $42.75 |
| Shipping & handling | $4.99 |
| Total before tax | $47.74 |
| Estimated tax (10%) | $4.77 |
| **Order total** | **$52.51** |

---

## 4. Cart Data & `localStorage`

The cart persists using `localStorage`, parsed back into an array on load.

```js
export let cart = JSON.parse(localStorage.getItem('cart'));

console.log('it is cart', cart);

if (!cart) { // integrate delivery options with normalization
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1,
    deliveryOptionId: '3'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 5,
    deliveryOptionId: '2'
  }];
}
```

**To reset the cart during testing** (browser console):
```js
localStorage.removeItem('cart');
```

---

## 5. Reusable Lookup Function: `getProduct()`

Looking up a product by ID appears in multiple places (order summary, payment summary). Extract it into a **reusable, exported function** to avoid duplication.

### Before (inline lookup, duplicated logic)
```js
let matchingProduct;

products.forEach((product) => {
  if (product.id === productId) {
    matchingProduct = product;
  }
});
```

### After (`data/products.js`)
```js
export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}
```

### Usage
```js
import { getProduct } from '../../data/products.js';

const matchingProduct = getProduct(productId);
```

**Benefit:** Any file needing a product by ID can import and reuse this single function instead of rewriting the loop.

---

## 6. Currency Formatting & Rounding Bug

### The Problem with `.toFixed()`

`.toFixed()` alone can produce **incorrect rounding** due to floating-point precision issues:

```
6.005.toFixed(2)  →  '6.00'   ❌ (should round to 6.01)
7.005.toFixed(2)  →  '7.00'   ❌ (should round to 7.01)
```

### The Fix: Round with `Math.round()` First

```js
// utils/money.js
export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}
```

Rounding the **cents value** before dividing avoids floating-point rounding errors and produces accurate currency strings.

---

## 7. Next Step: Interactivity

The only interactive element remaining in this section is the **"Place your order"** button — to be wired up with a click event listener in a later step.

| Element | Class | Behavior |
|---|---|---|
| Place your order button | `.place-order-button` | Triggers order placement logic on click |

---

## Summary

| Concept | Purpose |
|---|---|
| File splitting | Keep `orderSummary.js` and `paymentSummary.js` separate for maintainability |
| Import path updates | Required whenever files move between folders |
| `renderPaymentSummary()` | Generates the order totals section (View) |
| `localStorage` cart | Persists cart data across page reloads |
| `getProduct(productId)` | Reusable, exported lookup function — avoids duplicated search logic |
| `Math.round()` before `.toFixed()` | Fixes floating-point rounding errors in currency display |
| Place your order button | Next interactive feature to implement (Controller) |