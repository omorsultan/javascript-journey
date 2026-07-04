# JavaScript Modules

## 1. What Are Modules?

**Modules = a better way to organize our code.**

### The old way (multiple `<script>` tags)
```html
<script src="data/cart.js"></script>
<script src="data/products.js"></script>
<script src="scripts/amazon.js"></script>
</body>
</html>
```

With this approach:
1. **Combine all the files together into 1 big file.**
2. **Run all the code.**

⚠ **This can cause naming conflicts.**

---

## 2. The Naming Conflict Problem

```js
// cart.js
const cart = [];
```

> **We can't use `'cart'` in any other files** — since everything is combined and run together, a variable named `cart` elsewhere would clash with this one.

---

## 3. What a Module Actually Is

A **module** basically **contains a variable inside a file**.

```
┌────────────┐
│    cart    │
└────────────┘
   cart.js
```

### Create a Module
1. **Create a file.**
2. **Don't load the file with `<script>`.**

Any variables we create inside the file **will be contained inside the file** (not accessible globally).

---

## 4. Getting a Variable Out of a File

### Steps
1. **Add `type="module"` attribute.**
2. **Export** the variable.
3. **Import** the variable where needed.

### Step 1 — Add `type="module"` to the script tag
```html
</div>
<script src="data/products.js"></script>
<script type="module" src="scripts/amazon.js"></script>
```

> The **`type="module"` attribute** lets this file **get variables out of other files.**

For example, we want to access the `cart` variable outside of `cart.js`. To do that, in front of the variable we type the word **`export`**.

### Step 2 — Export the variable
```js
export const cart = [];
```

### Step 3 — Import syntax
```js
import { // name of the var we want

}
```

### Step 4 — Import `cart` in another file
```js
import { cart } from '../data/cart.js';
```

---

## 5. Understanding the Import Path

Breaking down `'../data/cart.js'`:

- We are in the **`scripts`** folder.
- We need to **get out of it** and into the **`data`** folder.
- To go **out of the current folder** that this file is in, we type **`..`** (dot dot).
  - `..` basically represents **the folder outside of this current folder** — i.e., the parent folder.
- Then we type a **forward slash `/`** to go outside of the `scripts` folder.
- Then we go **into the `data` folder**, so we type **`data`**.

**Result:** `../data/cart.js`

---

## 6. Best Practices for Modules

1. **Put all imports at the top of the file.**
2. **We need to use Live Server** (modules require running via a local server, not opening the file directly).

---

## 7. Benefits of Modules

### Benefit 1 — Helps us avoid naming conflicts
```js
// amazon.js
import { cart } from '../data/cart.js';

const cart = []; // ❌ this will again create a naming conflict
```

**Fix — rename on import:**
```js
import { cart as myCart } from '../data/cart.js';

const cart = [];
```
> This basically takes the input and **renames it to `myCart`**.

### Benefit 2 — Don't have to worry about order of files

**Before modules** — script tags had to be in a specific order (had to load `cart.js` first because we need the `cart` variable):
```html
<script src="data/cart.js"></script>
<script src="data/products.js"></script>
<script src="scripts/amazon.js"></script>
```

```js
// cart.js
const cart = [];
```

**With modules**, the entry point handles dependency resolution automatically:
```html
<script type="module" src="scripts/amazon.js"></script>
```
> This is the **entry point**.

---

## 8. Splitting Code into Functions (Refactoring)

### The problem
When we click the "Add to Cart" button, we're running a lot of code at once:
- Code that **adds the product to the cart**
- Code that **calculates the quantity and updates the page**

**Best practice in programming:** when we have a lot of code that does different things, it's better to **split it up into smaller functions** to make the code easier to read.

Since this part of the code takes the **product ID** and adds it to the cart, it makes sense to **split this into its own function**.

### Creating the `addToCart` function
```js
//---------- create another function for readability--- //
function addToCart(){

  let matchingItem;

  cart.forEach((item)=>{
   if(productId === item.productId){
     matchingItem = item;
   }
  })

  if(matchingItem){
   matchingItem.quantity +=1;
  }
  else{
   cart.push ({
     productId: productId, // use productId instead of productName
     quantity : 1
   });
  }
};
```

### Calling it — the bug
```js
document.querySelectorAll('.js-add-to-cart')
  .forEach((button)=>{
    button.addEventListener('click',()=>{
      const productId = button.dataset.productId;

      addToCart(); // call function // but not working

      let cartQuantity = 0;
      cart.forEach((item)=>{
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = `${cartQuantity}`;
      console.log(cart);
  });
});
```

**Error:**
```
Uncaught ReferenceError: productId is not defined
  at addToCart (amazon.js:124:20)
  at HTMLButtonElement.<anonymous> (amazon.js:137:7)
```

### The fix — pass `productId` as a parameter
```js
addToCart(productId); // call function // now working
```

```js
function addToCart(productId){

}
```

---

## 9. Splitting the Quantity-Update Code Too

We also put the **cart-quantity update logic** into its own function.

```js
function updateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((item)=>{
    cartQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = `${cartQuantity}`;
  console.log(cart);
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button)=>{
    button.addEventListener('click',()=>{
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
  });
});
```

---

## 10. Moving Functions to the Right File

Scroll up to the `addToCart` function — this code **manages our cart**, so it's actually a **best practice** to move this function into `cart.js`, because `cart.js` contains all the code related to the cart.

> **Best practice:** Group related code together into its own file.

### `data/cart.js`
```js
export const cart = [];

export function addToCart(productId){

  let matchingItem;
  // ... rest of the logic
}
```

### `scripts/amazon.js`
```js
import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
```

- Both `cart` and `addToCart` are exported from `cart.js` and imported together into `amazon.js`.

---

## 11. Importing Everything with `import * as`

An alternative import syntax: **`import * as`** — imports **everything** from a file and groups it together inside one object.

```js
import * as cartModule from '../data/cart.js';

cartModule.cart
cartModule.addToCart('id');
```

- `updateCartQuantity` handles **updating the web page**, rather than managing the cart itself, so this function stays inside `amazon.js` for now.

---

## Quick Reference

| Concept | Key Point |
|---|---|
| Module | A file whose variables stay contained inside it unless exported |
| Enable modules | Add `type="module"` to the `<script>` tag |
| Export a variable/function | `export const cart = [];` / `export function addToCart(){}` |
| Import specific items | `import { cart, addToCart } from '../data/cart.js';` |
| Import & rename | `import { cart as myCart } from '../data/cart.js';` |
| Import everything | `import * as cartModule from '../data/cart.js';` |
| Relative path `..` | Go up one folder (out of the current folder) |
| Naming conflicts | Solved by modules — each file has its own scope |
| File order | Modules resolve imports automatically — no manual script ordering needed |
| Requires | Live Server (modules don't work via direct file open) |
| Refactoring principle | Split large code blocks into smaller, focused functions |
| File organization | Group related code (e.g., cart logic) into its own file (`cart.js`) |