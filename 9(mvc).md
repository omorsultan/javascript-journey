# Making the Cart Interactive: Delivery Options & MVC Pattern

## 1. Overview

When a user clicks a delivery option, two things must happen:

1. **Update the data** — update `deliveryOptionId` in the cart.
2. **Update the page** — re-render the UI to reflect the change.

Since this involves modifying the cart, best practice is to put this logic inside the file that already manages all cart-related code (keeps cart logic centralized in one place).

---

## 2. Step 1: Update the Model (`updateDeliveryOption`)

**Steps:**
1. Loop through the cart and find the matching product.
2. Update that product's `deliveryOptionId`.

```js
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
```

---

## 3. Step 2: Wire Up Event Listeners

Add a `js-delivery-option` class to each delivery option element so it can be selected via the DOM, separate from any styling classes.

```html
<div class="delivery-option js-delivery-option"
     data-product-id="${matchingProduct.id}"
     data-delivery-option-id="${deliveryOption.id}">
  <input type="radio" ... />
</div>
```

### Getting the Values with Data Attributes

To know **which product** and **which delivery option** was clicked, use `data-*` attributes:

- `data-product-id` → matching product's ID
- `data-delivery-option-id` → selected delivery option's ID

```js
document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset; // shorthand property
      updateDeliveryOption(productId, deliveryOptionId);
    });
  });
```

> **Shorthand property tip:**
> ```js
> const productId = element.dataset.productId;
> const deliveryOptionId = element.dataset.deliveryOptionId;
> ```
> is equivalent to:
> ```js
> const { productId, deliveryOptionId } = element.dataset;
> ```

---

## 4. Step 3: Update the Page Automatically

### The Problem
Updating the DOM one element at a time is tedious and error-prone.

### The Solution
Instead of manually patching the page, **regenerate all the HTML** from the updated data whenever something changes.

**Approach:**
1. Wrap the HTML-generation logic in a reusable function.
2. After updating the data, call that function again to regenerate and re-render the page.

```js
function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.id === cartItem.deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    // ... build cartSummaryHTML
  });
}
```

### Tying It Together

```js
document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(); // re-render after data changes
    });
  });
```

**Key idea:** A function can call/re-run itself to regenerate HTML from the latest data — this is the foundation of the **MVC** pattern.

---

## 5. The MVC Pattern

**MVC = Model – View – Controller**

Splits code into three responsibilities:

| Part | Responsibility | Example |
|------|----------------|---------|
| **Model** | Saves and manages the data | `updateDeliveryOption()`, cart data file |
| **View** | Takes data and displays it on the page | `renderOrderSummary()` |
| **Controller** | Runs code in response to user interaction | Click event listeners (delivery options, delete link, etc.) |

```
   Model  ─────────▶  View
     ▲                  │
     │                  ▼
   Controller ◀─────────┘
```

**Flow:**
1. **Controller** updates the data (Model) in response to a user action.
2. **Controller** then calls the **View** to regenerate the HTML using the updated Model.
3. This guarantees: **the page always matches the data.**

### Example: Controller Code

```js
document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      // updates DOM / removes item container
    });
  });

document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId); // Model update
      renderOrderSummary(); // View regeneration
    });
  });
```

---

## 6. Notes on Project Structure

- **Model**: code inside the `data` folder — saves and manages cart data.
- **View**: code inside `checkout.js` (e.g., `renderOrderSummary`) — generates HTML from data.
- **Controller**: event listener code — responds to user interactions and coordinates Model + View updates.
- When reorganizing files into folders (e.g., moving scripts into a `scripts` folder), remember to **update import file paths** accordingly.

---

## Summary

| Concept | Purpose |
|---|---|
| `updateDeliveryOption()` | Model function — updates cart data |
| `data-*` attributes | Pass IDs from DOM elements to JS logic |
| `element.dataset` | Read data attributes (supports destructuring) |
| `renderOrderSummary()` | View function — regenerates HTML from data |
| Event listeners | Controller — trigger Model update + View re-render |
| MVC | Ensures the page **always reflects the current data** |