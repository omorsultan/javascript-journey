# External Libraries, Modules & Data Normalization

## 1. What Are External Libraries?

**External Library** = code that is outside of our project.

Other developers write JavaScript code and publish it on the internet, so we can load it directly into our own project instead of writing everything ourselves.

```
Other developers → write JS code → put it on the Internet → we load it into our project
```

---

## 2. Loading an External Library

### Classic `<script>` Tag
```html
<script src="https://unpkg.com/supersimpledev@1.0.1/hello.js"></script>
```
Placed **above** our own project's script tag so the library loads first:
```html
<script type="module" src="scripts/checkout.js"></script>
```

### Example Library Reference (Lesson 15)

| Library | URL |
|---|---|
| Hello (classic) | `https://unpkg.com/supersimpledev@1.0.1/hello.js` |
| Hello (ESM) | `https://unpkg.com/supersimpledev@1.0.1/hello.esm.js` |
| DayJS (classic) | `https://unpkg.com/dayjs@1.11.10/dayjs.min.js` |
| DayJS (ESM) | `https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js` |

```js
function hello() {
  console.log('hello');
}
```

---

## 3. ES Modules (ESM)

**ESM = EcmaScript Module** — a version of a library built to work with JavaScript's `import`/`export` system.

```js
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';

hello(); // "hello"
```

Multiple libraries can be imported the same way:

```js
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

hello();

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'));
```

### Named Export vs. Default Export

| Type | Syntax | Import Syntax | Limit |
|---|---|---|---|
| **Named Export** | `export function hello() {...}` | `import { hello } from '...'` (curly braces) | Multiple per file |
| **Default Export** | `export default formatCurrency;` | `import formatCurrency from '...'` (no curly braces) | **Only 1 per file** |

```js
// money.js
export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}

export default formatCurrency;
```

```js
// checkout.js
import formatCurrency from './utils/money.js';
```

> **Note:** File paths need updating whenever files are moved between folders (e.g., moving scripts into a `scripts/` folder).

---

## 4. Minification

Libraries downloaded from the internet are often **minified** — compressed into unreadable, single-line code to reduce file size.

- Minified DayJS code still exposes a usable `dayjs()` function once imported.
- Minification doesn't change functionality, only readability/size.

---

## 5. Using DayJS for Delivery Dates

### Goal: Calculate a Delivery Date
1. Get today's date.
2. Do calculations (e.g., add 7 days).
3. Display the date in an easy-to-read format.

```js
const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'));
// → "Sunday, July 12"
```

### `.add()` Method
Returns a **cloned** DayJS object with time added — it does not mutate the original.

```js
const a = dayjs();
const b = a.add(7, 'day');
```

### Common `.format()` Tokens

| Format | Output | Description |
|---|---|---|
| `YY` | 18 | Two-digit year |
| `YYYY` | 2018 | Four-digit year |
| `M` | 1–12 | Month, no leading zero |
| `MM` | 01–12 | Month, 2 digits |
| `dd` | Su–Sa | Min name of day of week |
| `ddd` | Sun–Sat | Short name of day of week |
| `dddd` | Sunday–Saturday | Full name of day of week |
| `H` | 0–23 | Hour |

---

## 6. How to Find External Libraries

**Best Practice:** When something complex is needed, try to find an external library first — *before* writing the code from scratch.

**How to search:** Use Google with a descriptive query, e.g.:
```
javascript date library
```

---

## 7. Normalizing the Data

### The Problem
Storing full details (delivery time, price) directly inside each cart item **duplicates data** and makes updates error-prone:

```js
// ❌ Not normalized — duplicated data
cart = [{
  productId: 'e43638ce-6aa0...',
  quantity: 2,
  deliveryTime: '3 days',
  deliveryPrice: 499
}, {
  productId: '15b6fc6f-327a...',
  quantity: 1,
  deliveryTime: '3 days',
  deliveryPrice: 499
}]
```

### The Solution: Normalize
Store delivery options **once**, in a separate list, and reference them by ID from the cart:

```js
// deliveryOptions.js
const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];
```

```js
// ✅ Normalized — cart references delivery options by id
cart = [{
  productId: 'e43638ce-6aa0...',
  quantity: 2,
  deliveryOptionId: '1'
}, {
  productId: '15b6fc6f-327a...',
  quantity: 1,
  deliveryOptionId: '2'
}]
```

**Why normalize:**
- Single source of truth for shared data (delivery options).
- Update the option once (e.g., change price) — every referencing cart item reflects it automatically.

---

## 8. Generating Delivery Option HTML

### Steps
1. Loop through `deliveryOptions`.
2. For each option, generate the corresponding HTML.
3. Combine the HTML together.

```js
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option">
        <input type="radio" ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  });

  return html;
}
```

Only mark an option as `checked` if its `id` **matches** the `deliveryOptionId` saved on the cart item.

### Looking Up a Cart Item's Delivery Option

```js
const deliveryOptionId = cartItem.deliveryOptionId;
let deliveryOption;

deliveryOptions.forEach((option) => {
  if (option.id === deliveryOptionId) {
    deliveryOption = option;
  }
});

const today = dayjs();
const deliveryDate = today.add(
  deliveryOption.deliveryDays,
  'days'
);
const dateString = deliveryDate.format('dddd, MMMM D');
```

This lookup pattern is reusable anywhere a cart item's delivery option details are needed.

---

## 9. Common Pitfall

Forgetting to give a cart item a `deliveryOptionId` (e.g. old/mock cart data created before normalization) results in a runtime error when the code tries to look up delivery details:

```
Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'deliveryDays')
    at orderSummary.js:23:22
```

**Fix:** Ensure every cart item includes a valid `deliveryOptionId`, and that default/mock cart data (e.g. inside `if (!cart) { ... }` initialization blocks) is updated to match the normalized structure.

```js
if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}
```

---

## Summary

| Concept | Purpose |
|---|---|
| External library | Reusable code written by other developers, loaded via URL |
| ESM (`import`/`export`) | Modern module system for structuring/sharing code |
| Named export | Multiple exports per file, imported with `{ }` |
| Default export | One export per file, imported without `{ }` |
| Minification | Compressing library code for smaller file size |
| DayJS | External library for date calculations & formatting |
| Data normalization | Store shared data once; reference it by ID to avoid duplication |
| `deliveryOptionId` | Links a cart item to its full delivery option details |