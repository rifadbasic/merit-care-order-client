import { getCart, clearCart } from "../state/cart.js";
import { saveOrderData } from "../utils/storage.js";
import { renderCart } from "../components/cart.js";

let divisionData = [];
let checkoutInitialized = false;

// =================================
// CHECKOUT MODAL HTML
// =================================

export async function renderCheckoutModal() {
  if (document.querySelector("#checkoutModal")) return;

  const modalHTML = `
    <div
      id="checkoutModal"
      class="fixed inset-0 z-[110] hidden items-center justify-center overflow-y-auto bg-black/50 p-4"
    >
      <div class="my-auto w-full max-w-5xl rounded-2xl bg-white p-5 shadow-2xl md:p-8">

        <!-- Header -->
        <div class="flex items-center justify-between border-b pb-4">
          <div>
            <h2 class="text-2xl font-bold text-blue-950">Checkout</h2>
            <p class="mt-1 text-sm text-slate-500">Complete your order</p>
          </div>

          <button
            id="closeCheckout"
            type="button"
            class="text-3xl text-slate-500 hover:text-red-500"
          >&times;</button>
        </div>

        <form id="checkoutForm" class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

          <!-- Customer Information -->
          <div class="space-y-4">
            <h3 class="border-b pb-3 font-bold text-blue-950">
              গ্রাহকের তথ্য
            </h3>

            <div>
              <label class="mb-2 block text-sm font-medium">শিক্ষার্থীর নাম *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="আপনার নাম লিখুন"
                class="checkout-input"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium">মোবাইল নম্বর *</label>
              <input
                type="tel"
                name="phone"
                required
                pattern="01[3-9][0-9]{8}"
                maxlength="11"
                placeholder="01XXXXXXXXX"
                class="checkout-input"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium">বিভাগ *</label>
              <select name="division" required class="checkout-input">
                <option value="">বিভাগ নির্বাচন করুন</option>
              </select>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium">জেলা / এলাকা *</label>
              <select name="district" required disabled class="checkout-input">
                <option value="">প্রথমে বিভাগ নির্বাচন করুন</option>
              </select>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium">উপজেলা / থানা *</label>
              <select name="upazila" required disabled class="checkout-input">
                <option value="">প্রথমে জেলা নির্বাচন করুন</option>
              </select>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium">সম্পূর্ণ ঠিকানা *</label>
              <textarea
                name="address"
                required
                rows="3"
                placeholder="বাড়ি নম্বর, রোড, এলাকা ইত্যাদি লিখুন"
                class="checkout-input resize-none"
              ></textarea>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium">পেমেন্ট পদ্ধতি *</label>
              <select name="payment" required class="checkout-input">
                <option value="COD">ক্যাশ অন ডেলিভারি</option>
                <option value="Advance">অগ্রিম পেমেন্ট</option>
              </select>
            </div>
          </div>

          <!-- Order Summary -->
          <div>
            <h3 class="border-b pb-3 font-bold text-blue-950">
              নির্বাচিত পণ্যসমূহ
            </h3>

            <div id="checkoutProducts" class="mt-4 space-y-3"></div>

            <div class="mt-5 space-y-3 border-t pt-4 text-sm">
              <div class="flex justify-between">
                <span>পণ্যের মোট মূল্য</span>
                <span id="checkoutSubtotal">৳0</span>
              </div>

              <div class="flex justify-between">
                <span>ডেলিভারি চার্জ</span>
                <span id="checkoutDelivery">৳0</span>
              </div>

              <div class="flex justify-between border-t pt-3 text-lg font-bold text-blue-950">
                <span>সর্বমোট</span>
                <span id="checkoutTotal">৳0</span>
              </div>
            </div>

            <button
              type="submit"
              class="mt-6 w-full rounded-xl bg-orange-500 py-4 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              অর্ডার নিশ্চিত করুন →
            </button>

            <p class="mt-3 text-center text-xs text-slate-500">
              আপনার অর্ডারের তথ্য নিরাপদে সংরক্ষণ করা হবে।
            </p>
          </div>

        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  await loadLocationData();
}

// =================================
// LOAD LOCATION JSON
// =================================

async function loadLocationData() {
  const divisionSelect = document.querySelector(
    '#checkoutForm [name="division"]',
  );

  const response = await fetch("/data/BDdistrict.json");

  if (!response.ok) {
    throw new Error("BDdistrict.json load failed");
  }

  divisionData = await response.json();

  divisionSelect.innerHTML = `
    <option value="">বিভাগ নির্বাচন করুন</option>
    ${divisionData
      .map(
        (item) => `
      <option value="${item.division}">${item.division}</option>
    `,
      )
      .join("")}
  `;
}

// =================================
// DELIVERY CHARGE
// =================================

function getDeliveryCharge(district) {
  if (!district) return 0;

  // ঢাকা সিটি = ৮০ টাকা
  // অন্যান্য জেলা / এলাকা = ১২০ টাকা
  return district === "ঢাকা" ? 80 : 120;
}

// =================================
// UPDATE CHECKOUT SUMMARY
// =================================

function updateCheckoutSummary() {
  const productsContainer = document.querySelector("#checkoutProducts");
  const subtotalElement = document.querySelector("#checkoutSubtotal");
  const deliveryElement = document.querySelector("#checkoutDelivery");
  const totalElement = document.querySelector("#checkoutTotal");

  if (!productsContainer) return;

  const cart = getCart();

  const district =
    document.querySelector('#checkoutForm [name="district"]')?.value || "";

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0,
  );

  const delivery = getDeliveryCharge(district);
  const total = subtotal + delivery;

  productsContainer.innerHTML = cart.length
    ? cart
        .map(
          (item) => `
        <div class="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
          <img
            src="${item.image}"
            alt="${item.name}"
            class="h-16 w-16 rounded-lg bg-slate-100 object-contain p-1"
          />

          <div class="min-w-0 flex-1">
            <h4 class="font-semibold text-slate-800">${item.name}</h4>
            <p class="mt-1 text-sm text-slate-500">
              ৳${Number(item.price)} × ${Number(item.quantity)}
            </p>
            <p class="font-bold text-blue-600">
              ৳${Number(item.price) * Number(item.quantity)}
            </p>
          </div>
        </div>
      `,
        )
        .join("")
    : `
      <p class="rounded-xl bg-slate-50 p-5 text-center text-slate-500">
        আপনার কার্টে কোনো পণ্য নেই।
      </p>
    `;

  if (subtotalElement) subtotalElement.textContent = `৳${subtotal}`;
  if (deliveryElement) deliveryElement.textContent = `৳${delivery}`;
  if (totalElement) totalElement.textContent = `৳${total}`;
}

// =================================
// OPEN CHECKOUT
// =================================

export async function openCheckoutModal() {
  await renderCheckoutModal();

  const modal = document.querySelector("#checkoutModal");

  if (!modal) return;

  updateCheckoutSummary();

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

// =================================
// CLOSE CHECKOUT
// =================================

function closeCheckoutModal() {
  const modal = document.querySelector("#checkoutModal");

  if (!modal) return;

  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// =================================
// SETUP CHECKOUT
// =================================

export function setupCheckout(SERVER_URL) {
  if (checkoutInitialized) return;

  const form = document.querySelector("#checkoutForm");
  const modal = document.querySelector("#checkoutModal");

  if (!form || !modal) {
    console.error("Checkout elements not found!");
    return;
  }

  const divisionSelect = form.querySelector('[name="division"]');
  const districtSelect = form.querySelector('[name="district"]');
  const thanaSelect = form.querySelector('[name="upazila"]');
  const submitButton = form.querySelector('[type="submit"]');

  checkoutInitialized = true;

  // Checkout button
  document.addEventListener("click", (event) => {
    const button = event.target.closest("#checkoutBtn");

    if (!button) return;

    event.preventDefault();
    openCheckoutModal();
  });

  // Close button
  document
    .querySelector("#closeCheckout")
    ?.addEventListener("click", closeCheckoutModal);

  // Click outside modal
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeCheckoutModal();
    }
  });

  // Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCheckoutModal();
    }
  });

  // =================================
  // DIVISION → DISTRICT
  // =================================

  divisionSelect.addEventListener("change", () => {
    const selectedDivision = divisionSelect.value;

    const division = divisionData.find(
      (item) => item.division === selectedDivision,
    );

    districtSelect.innerHTML = `
      <option value="">জেলা নির্বাচন করুন</option>
    `;

    thanaSelect.innerHTML = `
      <option value="">প্রথমে জেলা নির্বাচন করুন</option>
    `;

    districtSelect.disabled = true;
    thanaSelect.disabled = true;

    if (!division) {
      updateCheckoutSummary();
      renderCart();
      return;
    }

    const districts = division.districts || [];

    if (selectedDivision === "ঢাকা") {
      const city = districts.filter((item) => item.areaType === "city");

      const outside = districts.filter((item) => item.areaType !== "city");

      if (city.length) {
        districtSelect.insertAdjacentHTML(
          "beforeend",
          `
         
            ${city
              .map(
                (item) => `
              <option value="${item.district}">
                ${item.district}
              </option>
            `,
              )
              .join("")}
         
        `,
        );
      }

      if (outside.length) {
        districtSelect.insertAdjacentHTML(
          "beforeend",
          `
        
            ${outside
              .map(
                (item) => `
              <option value="${item.district}">
                ${item.district}
              </option>
            `,
              )
              .join("")}
         
        `,
        );
      }
    } else {
      districtSelect.insertAdjacentHTML(
        "beforeend",
        `
        
          ${districts
            .map(
              (item) => `
            <option value="${item.district}">
              ${item.district}
            
          `,
            )
            .join("")}
        </optgroup>
      `,
      );
    }

    districtSelect.disabled = false;

    updateCheckoutSummary();
    renderCart();
  });

  // =================================
  // DISTRICT → THANA
  // =================================

  districtSelect.addEventListener("change", () => {
    const selectedDistrict = districtSelect.value;

    thanaSelect.innerHTML = `
      <option value="">থানা / উপজেলা নির্বাচন করুন</option>
    `;

    thanaSelect.disabled = true;

    const division = divisionData.find(
      (item) => item.division === divisionSelect.value,
    );

    const district = division?.districts?.find(
      (item) => item.district === selectedDistrict,
    );

    if (district?.thanas?.length) {
      thanaSelect.insertAdjacentHTML(
        "beforeend",
        district.thanas
          .map(
            (thana) => `
          <option value="${thana}">${thana}</option>
        `,
          )
          .join(""),
      );

      thanaSelect.disabled = false;
    }

    updateCheckoutSummary();
    renderCart();
  });

  // =================================
  // CART UPDATE EVENT
  // =================================

  document.addEventListener("cart:updated", updateCheckoutSummary);

  // =================================
  // ORDER SUBMIT
  // =================================

  // =================================
  // ORDER SUBMIT
  // =================================

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cart = getCart();

    if (!cart.length) {
      alert("আপনার কার্টে কোনো পণ্য নেই!");
      return;
    }

    if (!form.reportValidity()) return;

    if (!SERVER_URL) {
      alert("Backend API URL পাওয়া যায়নি। .env ফাইল চেক করুন।");
      return;
    }

    const originalText = submitButton.textContent;

    try {
      submitButton.disabled = true;
      submitButton.textContent = "অর্ডার প্রসেস হচ্ছে...";

      // Customer Information
      const formData = new FormData(form);

      const customer = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        division: formData.get("division"),
        district: formData.get("district"),
        upazila: formData.get("upazila"),
        address: formData.get("address"),
        payment: formData.get("payment"),
      };

      // Generate Order ID
      const orderId = `MCA-${Date.now()}`;

      // Product Information
      const products = cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
      }));

      // Calculate Subtotal
      const subtotal = cart.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0,
      );

      // Delivery Charge
      const delivery = getDeliveryCharge(customer.district);

      // Total
      const total = subtotal + delivery;

      // Complete Order Data
      const orderData = {
        orderId,
        customer,
        products,
        subtotal,
        delivery,
        total,
      };

      console.log("Sending Order Data:", orderData);

      // Send Request
      const response = await fetch(SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      // Read Backend Response
      const responseText = await response.text();

      let result;

      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Backend returned invalid response: ${responseText.slice(0, 300)}`,
        );
      }

      console.log("Backend Response:", result);

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || result.error || `Server Error: ${response.status}`,
        );
      }

      // Complete Order Object
      const order = {
        ...result,
        orderId,
        customer,
        products,
        subtotal,
        delivery,
        total,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };

      // Save Order
      saveOrderData(order);

      // Clear Cart
      clearCart();
      renderCart();

      // Reset Form
      form.reset();

      districtSelect.innerHTML = `
        <option value="">প্রথমে বিভাগ নির্বাচন করুন</option>
      `;
      districtSelect.disabled = true;

      thanaSelect.innerHTML = `
        <option value="">প্রথমে জেলা নির্বাচন করুন</option>
      `;
      thanaSelect.disabled = true;

      // Update Summary
      updateCheckoutSummary();

      // Close Checkout
      closeCheckoutModal();

      // Show Success Modal
      document.dispatchEvent(
        new CustomEvent("order:success", {
          detail: { order },
        }),
      );

      console.log("Order Submitted Successfully:", order);
    } catch (error) {
      console.error("Order Submit Error:", error);

      alert(error.message);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });

  updateCheckoutSummary();

  console.log("Checkout Initialized Successfully!");
}
