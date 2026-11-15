import { products } from "../data/products.js";
import { addToCart } from "../state/cart.js";
import { renderCart } from "./cart.js";

// =================================
// PRODUCT GRID
// =================================

export function renderProducts() {
  const productGrid = document.querySelector("#productGrid");

  if (!productGrid) return;

  productGrid.innerHTML = products
    .map(
      (product) => `
    <div class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">

      <!-- Product Image -->
      <div class="relative overflow-hidden bg-slate-100">
        <img
          src="${product.image}"
          alt="${product.name}"
          class="h-56 w-full object-contain p-5 transition duration-500 group-hover:scale-105"
        />

        <span class="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
          ${product.category}
        </span>
      </div>

      <!-- Product Content -->
      <div class="p-5">

        <h3 class="text-lg font-bold text-slate-800">
          ${product.name}
        </h3>

        <p class="mt-2 min-h-10 text-sm leading-6 text-slate-500">
          ${product.description}
        </p>

        <!-- Price -->
        <div class="mt-4">
          <span class="text-xl font-bold text-blue-600">
            ৳${Number(product.price).toLocaleString("en-BD")}
          </span>
        </div>

        <!-- Action Buttons -->
        <div class="mt-5 grid grid-cols-2 gap-3">

          <!-- View Details -->
          <button
            type="button"
            data-view="${product.id}"
            class="rounded-xl border border-blue-600 px-3 py-3 text-sm font-semibold text-blue-600 transition duration-300 hover:bg-blue-50 active:scale-95"
          >
            <i class="fa-solid fa-eye mr-1"></i>
            View Details
          </button>

          <!-- Add to Cart -->
          <button
            type="button"
            data-add="${product.id}"
            class="rounded-xl bg-blue-600 px-3 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-blue-700 active:scale-95"
          >
            <i class="fa-solid fa-cart-shopping mr-1"></i>
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  `,
    )
    .join("");

  setupProductEvents();
}

// =================================
// PRODUCT EVENTS
// =================================

function setupProductEvents() {
  const productGrid = document.querySelector("#productGrid");

  if (!productGrid) return;

  if (productGrid.dataset.eventsAttached === "true") return;

  productGrid.dataset.eventsAttached = "true";

  productGrid.addEventListener("click", (event) => {
    // View Details Button
    const viewButton = event.target.closest("[data-view]");

    if (viewButton) {
      const id = Number(viewButton.dataset.view);

      const product = products.find((item) => item.id === id);

      if (product) {
        showProductModal(product);
      }

      return;
    }

    // Add to Cart Button
    const addButton = event.target.closest("[data-add]");

    if (addButton) {
      const id = Number(addButton.dataset.add);

      const product = products.find((item) => item.id === id);

      if (!product) return;

      addProductToCart(product, addButton);
    }
  });
}

// =================================
// ADD PRODUCT TO CART
// =================================

function addProductToCart(product, button = null) {
  addToCart(product);

  // Update Order List
  renderCart();

  // Open Order Section
  const orderSection = document.querySelector("#orderSection");

  if (orderSection) {
    orderSection.classList.remove("hidden");

    setTimeout(() => {
      orderSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  // Button Feedback
  if (button) {
    const originalText = button.innerHTML;

    button.innerHTML = "✓ Added";

    button.disabled = true;

    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
    }, 800);
  }
}

// =================================
// PRODUCT DETAILS MODAL
// =================================

function showProductModal(product) {
  // Remove Previous Modal
  document.querySelector("#productDetailsModal")?.remove();

  // Create Modal
  const modal = document.createElement("div");

  modal.id = "productDetailsModal";

  modal.className = `
    fixed inset-0 z-[100] flex items-center justify-center
    bg-slate-950/70 p-4 backdrop-blur-sm
  `;

  modal.innerHTML = `
    <!-- Modal Box -->
    <div
      class="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl animate-[fadeIn_0.2s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="productModalTitle"
    >

      <!-- Modal Header -->
      <div class="flex items-start justify-between border-b border-slate-100 bg-gradient-to-r from-blue-950 to-indigo-900 px-5 py-5 text-white">

        <div class="pr-4">

          <span class="inline-block rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold">
            SSC 2027
          </span>

          <h2
            id="productModalTitle"
            class="mt-3 text-xl font-bold leading-7"
          >
            ${product.categoryBn}
          </h2>

          <p class="mt-1 text-sm text-blue-200">
            সম্পূর্ণ শিট প্যাকেজ
          </p>

        </div>

        <!-- Close Button -->
        <button
          type="button"
          data-close-modal
          aria-label="Close Modal"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-red-500"
        >
          &times;
        </button>

      </div>

      <!-- Modal Content -->
      <div class="overflow-y-auto px-5 py-5">

        <!-- Product Summary -->
        <div class="mb-5 flex items-center gap-4 rounded-xl bg-slate-50 p-4">

          <img
            src="${product.image}"
            alt="${product.categoryBn}"
            class="h-20 w-20 shrink-0 rounded-lg bg-white object-contain p-2"
          />

          <div>
            <h3 class="font-bold text-slate-800">
              ${product.name}
            </h3>

            <p class="mt-2 text-sm text-slate-500">
              ${product.description}
            </p>

            <p class="mt-2 text-lg font-bold text-blue-600">
              ৳${Number(product.price).toLocaleString("en-BD")}
            </p>
          </div>

        </div>

        <!-- Subject List Header -->
        <div class="mb-4 flex items-center justify-between">

          <h3 class="font-bold text-slate-800">
            প্যাকেজে যা যা থাকছে
          </h3>

          <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
            ${product.subjects.length} Subjects
          </span>

        </div>

        <!-- Subject List -->
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">

          ${product.subjects
            .map(
              (subject, index) => `
            <div class="flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-3 py-3 transition hover:border-blue-200 hover:bg-blue-50/50">

              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                ${String(index + 1).padStart(2, "0")}
              </span>

              <span class="text-sm font-medium text-slate-700">
                ${subject}
              </span>

            </div>
          `,
            )
            .join("")}

        </div>

        <!-- Notice -->
        <div class="mt-5 rounded-xl border border-orange-100 bg-orange-50 p-3 text-sm leading-6 text-orange-700">
          <i class="fa-solid fa-circle-info mr-1"></i>
          ${product.categoryBn} বিভাগের SSC 2027 সম্পূর্ণ প্যাকেজ।
        </div>

      </div>

      <!-- Modal Footer -->
      <div class="border-t border-slate-100 bg-white p-5">

        <button
          type="button"
          data-modal-add="${product.id}"
          class="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-4 font-bold text-white shadow-lg transition duration-300 hover:bg-orange-600 active:scale-[0.98]"
        >
          <i class="fa-solid fa-cart-shopping"></i>
          Add to Cart — ৳${Number(product.price).toLocaleString("en-BD")}
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(modal);

  // =================================
  // MODAL EVENTS
  // =================================

  // Close Button
  modal.querySelector("[data-close-modal]").addEventListener("click", () => {
    closeProductModal();
  });

  // Outside Click
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeProductModal();
    }
  });

  // Add to Cart From Modal
  modal.querySelector("[data-modal-add]").addEventListener("click", () => {
    addProductToCart(product);

    closeProductModal();
  });

  // ESC Key
  document.addEventListener("keydown", handleModalEscape);

  // Prevent Background Scroll
  document.body.style.overflow = "hidden";
}

// =================================
// CLOSE PRODUCT MODAL
// =================================

function closeProductModal() {
  document.querySelector("#productDetailsModal")?.remove();

  document.body.style.overflow = "";

  document.removeEventListener("keydown", handleModalEscape);
}

// =================================
// ESC KEY
// =================================

function handleModalEscape(event) {
  if (event.key === "Escape") {
    closeProductModal();
  }
}
