import {
  getCart,
  getCartCount,
  getCartTotal,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../state/cart.js";

// =================================
// DELIVERY CHARGE
// =================================

function getDeliveryCharge(district) {
  if (!district) return 0;

  return district === "ঢাকা" ? 80 : 120;
}

// =================================
// RENDER CART
// =================================

export function renderCart() {
  const orderItems = document.querySelector("#orderItems");
  const orderCount = document.querySelector("#orderCount");
  const orderSubtotal = document.querySelector("#orderSubtotal");
  const orderDelivery = document.querySelector("#orderDelivery");
  const orderTotal = document.querySelector("#orderTotal");
  const orderSection = document.querySelector("#orderSection");

  const districtSelect = document.querySelector(
    '#checkoutForm [name="district"]',
  );

  if (!orderItems || !orderSection) return;

  const cart = getCart();

  // Show / Hide Order Section
  if (cart.length > 0) {
    orderSection.classList.remove("hidden");
  } else {
    orderSection.classList.add("hidden");
  }

  if (orderCount) {
    orderCount.textContent = getCartCount();
  }

  // Render Products
  orderItems.innerHTML = cart.length
    ? cart
        .map(
          (item) => `
        <div class="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">

          <img
            src="${item.image}"
            alt="${item.name}"
            class="h-20 w-20 rounded-lg bg-slate-100 object-contain p-2"
          />

          <div class="min-w-0 flex-1">
            <h3 class="font-bold text-slate-800">
              ${item.name}
            </h3>

            <p class="mt-1 text-sm text-slate-500">
              ৳${item.price} × ${item.quantity}
            </p>

            <p class="mt-1 font-bold text-blue-600">
              ৳${Number(item.price) * Number(item.quantity)}
            </p>
          </div>

          <div class="flex items-center justify-between gap-4 sm:justify-end">

            <div class="flex items-center gap-3">
              <button
                type="button"
                data-decrease="${item.id}"
                aria-label="Decrease quantity"
                class="h-9 w-9 rounded-lg bg-slate-100 font-bold hover:bg-slate-200"
              >-</button>

              <span class="min-w-5 text-center font-semibold">
                ${item.quantity}
              </span>

              <button
                type="button"
                data-increase="${item.id}"
                aria-label="Increase quantity"
                class="h-9 w-9 rounded-lg bg-slate-100 font-bold hover:bg-slate-200"
              >+</button>
            </div>

            <button
              type="button"
              data-remove="${item.id}"
              class="text-sm font-semibold text-red-500 hover:text-red-700"
            >
              Remove
            </button>

          </div>
        </div>
      `,
        )
        .join("")
    : `
      <p class="rounded-xl bg-white py-8 text-center text-slate-500">
        Your order list is empty.
      </p>
    `;

  // Calculate Total
  const district = districtSelect?.value || "";

  const delivery = getDeliveryCharge(district);
  const subtotal = getCartTotal();
  const total = subtotal + delivery;

  if (orderSubtotal) {
    orderSubtotal.textContent = `৳${subtotal}`;
  }

  if (orderDelivery) {
    orderDelivery.textContent = `৳${delivery}`;
  }

  if (orderTotal) {
    orderTotal.textContent = `৳${total}`;
  }

  // Update Checkout Summary
  document.dispatchEvent(new Event("cart:updated"));
}

// =================================
// CART EVENTS
// =================================

export function setupCartEvents() {
  const orderItems = document.querySelector("#orderItems");

  if (!orderItems) return;

  if (orderItems.dataset.eventsAttached === "true") return;

  orderItems.dataset.eventsAttached = "true";

  orderItems.addEventListener("click", (event) => {
    const increase = event.target.closest("[data-increase]");
    const decrease = event.target.closest("[data-decrease]");
    const remove = event.target.closest("[data-remove]");

    if (increase) {
      increaseQuantity(increase.dataset.increase);
    }

    if (decrease) {
      decreaseQuantity(decrease.dataset.decrease);
    }

    if (remove) {
      removeFromCart(remove.dataset.remove);
    }

    renderCart();
  });
}
