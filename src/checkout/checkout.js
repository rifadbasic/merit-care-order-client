import { getCart, clearCart } from "../state/cart.js";
import { saveOrderData } from "../utils/storage.js";
import { renderCart } from "../components/cart.js";

let divisionData = [];
let checkoutInitialized = false;
let advancePayment = null;

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
              <label class="mb-2 block text-sm font-medium">
                পেমেন্ট পদ্ধতি *
              </label>

              <select name="payment" required class="checkout-input">
                <option value="COD">ক্যাশ অন ডেলিভারি</option>
                <option value="Advance">অগ্রিম পেমেন্ট</option>
              </select>

              <!-- Advance Payment Methods -->
              <div id="advanceMethods" class="mt-4 hidden">
                <p class="mb-3 text-sm font-semibold text-slate-700">
                  অগ্রিম পেমেন্টের মাধ্যম নির্বাচন করুন
                </p>

                <div class="grid grid-cols-2 gap-3">

                  <!-- Nagad -->
                  <button
                    type="button"
                    data-payment-method="Nagad"
                    class="payment-method-btn rounded-xl border-2 border-slate-200 p-3 font-bold text-orange-600 transition hover:border-orange-500"
                  >
                    Nagad
                  </button>

                  <!-- Bank -->
                  <!--
                      Bank Payment - Temporarily Disabled

                      <button
                        type="button"
                        data-payment-method="Bank"
                        class="payment-method-btn rounded-xl border-2 border-slate-200 p-3 font-bold text-blue-900 transition hover:border-blue-700"
                      >
                        Bank
                      </button>

                      -->

                  <!--
                  bKash - আপাতত বন্ধ রাখা হয়েছে।
                  চালু করতে চাইলে এই button-এর comment তুলে দেবে।

                  <button
                    type="button"
                    data-payment-method="bKash"
                    class="payment-method-btn rounded-xl border-2 border-slate-200 p-3 font-bold text-pink-600"
                  >
                    bKash
                  </button>
                  -->

                  <!--
                  Rocket - আপাতত বন্ধ রাখা হয়েছে।
                  চালু করতে চাইলে এই button-এর comment তুলে দেবে।

                  <button
                    type="button"
                    data-payment-method="Rocket"
                    class="payment-method-btn rounded-xl border-2 border-slate-200 p-3 font-bold text-purple-600"
                  >
                    Rocket
                  </button>
                  -->

                </div>

                <p id="advancePaymentStatus" class="mt-3 text-sm text-slate-500">
                  এখনো কোনো পেমেন্ট মাধ্যম নির্বাচন করা হয়নি।
                </p>
              </div>
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

    <!-- Advance Payment Modal -->
    <div
      id="advancePaymentModal"
      class="fixed inset-0 z-[130] hidden items-center justify-center overflow-y-auto bg-black/60 p-4"
    >
      <div class="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

        <div class="mb-5 flex items-center justify-between border-b pb-4">
          <div>
            <h2 class="text-xl font-bold text-blue-950">
              Advance Payment
            </h2>
            <p class="mt-1 text-sm text-slate-500">
              পেমেন্টের তথ্য প্রদান করুন
            </p>
          </div>

          <button
            type="button"
            id="closeAdvancePayment"
            class="text-3xl text-slate-500 hover:text-red-500"
          >
            &times;
          </button>
        </div>

        <!-- Nagad Account Information -->
        <div id="nagadPaymentInfo" class="hidden">

          <div class="rounded-xl border border-orange-200 bg-orange-50 p-4">
            <p class="text-sm font-medium text-slate-600">
              আমাদের Nagad Account Number
            </p>

            <div class="mt-2 flex items-center justify-between gap-2">
              <h3 class="text-2xl font-bold text-orange-600">
                01901379237
              </h3>

              <button
                type="button"
                id="copyNagadNumber"
                class="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white"
              >
                Copy
              </button>
            </div>

            <p class="mt-3 text-sm text-slate-600">
              উপরের নম্বরে পেমেন্ট সম্পন্ন করে নিচের তথ্যগুলো পূরণ করুন।
            </p>
          </div>

          <div class="mt-5 space-y-4">

            <div>
              <label class="mb-2 block text-sm font-medium">
                Transaction ID *
              </label>

              <input
                id="nagadTransactionId"
                type="text"
                minlength="8"
                maxlength="8"
                pattern="[A-Za-z0-9]{8}"
                autocomplete="off"
                placeholder="8 Character Transaction ID"
                class="checkout-input"
              />
              <p class="mt-1 text-xs text-slate-500">
                Transaction ID অবশ্যই ৮ Character হতে হবে।
              </p>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium">
                যে নম্বর থেকে পেমেন্ট করেছেন *
              </label>

              <input
                id="nagadSenderNumber"
                type="tel"
                inputmode="numeric"
                minlength="11"
                maxlength="11"
                pattern="01[3-9][0-9]{8}"
                placeholder="01XXXXXXXXX"
                autocomplete="tel"
                class="checkout-input"
              />
              <p class="mt-1 text-xs text-slate-500">
                বাংলাদেশের বৈধ ১১ ডিজিটের মোবাইল নম্বর দিন।
              </p>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium">
                Advance Amount (৳) *
              </label>

              <input
                id="nagadAmount"
                type="number"
                min="1"
                step="1"
                placeholder="অগ্রিম টাকার পরিমাণ"
                class="checkout-input"
              />
            </div>

          </div>
        </div>

        <!-- Bank Account Information -->
        <div id="bankPaymentInfo" class="hidden">

          <div class="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p class="text-sm text-slate-600">
              Bank Name
            </p>

            <h3 class="mt-1 text-lg font-bold text-blue-950">
              Islami Bank Bangladesh PLC
            </h3>

            <p class="mt-3 text-sm text-slate-600">
              Account Number
            </p>

            <h3 class="mt-1 text-xl font-bold text-blue-950">
              <!-- এখানে পরে Bank Account Number বসাবে -->
              [Account Number Pending]
            </h3>

            <p class="mt-3 text-sm text-slate-600">
              উপরের ব্যাংক অ্যাকাউন্টে টাকা জমা/ট্রান্সফার করে নিচের তথ্যগুলো পূরণ করুন।
            </p>
          </div>

          <div class="mt-5 space-y-4">

            <div>
              <label class="mb-2 block text-sm font-medium">
                আপনার Bank Name *
              </label>

              <input
                id="senderBankName"
                type="text"
                placeholder="আপনার ব্যাংকের নাম"
                class="checkout-input"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium">
                আপনার Bank Account Number *
              </label>

              <input
                id="senderBankAccount"
                type="text"
                placeholder="আপনার ব্যাংক অ্যাকাউন্ট নম্বর"
                class="checkout-input"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium">
                Advance Amount (৳) *
              </label>

              <input
                id="bankAmount"
                type="number"
                min="1"
                step="1"
                placeholder="অগ্রিম টাকার পরিমাণ"
                class="checkout-input"
              />
            </div>

          </div>
        </div>

        <button
          type="button"
          id="confirmAdvancePayment"
          class="mt-6 w-full rounded-xl bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600"
        >
          পেমেন্টের তথ্য নিশ্চিত করুন
        </button>

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

  return district.trim() === "ঢাকা সিটি" ? 80 : 120;
}

// =================================
// BANGLADESH MOBILE OPERATOR CHECK
// =================================

function getBangladeshOperator(phone) {
  const prefix = phone.substring(0, 3);

  const operators = {
    "013": "Grameenphone",
    "014": "Banglalink",
    "015": "Teletalk",
    "016": "Airtel",
    "017": "Grameenphone",
    "018": "Robi",
    "019": "Banglalink",
  };

  if (!/^01[3-9]\d{8}$/.test(phone)) {
    return null;
  }

  return operators[prefix] || null;
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
  // =================================
  // ADVANCE PAYMENT SYSTEM
  // =================================

  const paymentSelect = form.querySelector('[name="payment"]');

  const advanceMethods = document.querySelector("#advanceMethods");
  const advancePaymentModal = document.querySelector("#advancePaymentModal");

  const nagadPaymentInfo = document.querySelector("#nagadPaymentInfo");
  const bankPaymentInfo = document.querySelector("#bankPaymentInfo");

  const advancePaymentStatus = document.querySelector("#advancePaymentStatus");

  let selectedPaymentMethod = "";

  // Show / Hide Advance Methods
  paymentSelect.addEventListener("change", () => {
    const isAdvance = paymentSelect.value === "Advance";

    advanceMethods.classList.toggle("hidden", !isAdvance);

    if (!isAdvance) {
      advancePayment = null;
      selectedPaymentMethod = "";

      advancePaymentStatus.textContent =
        "এখনো কোনো পেমেন্ট মাধ্যম নির্বাচন করা হয়নি।";
    }
  });

  // Open Payment Modal
  document.querySelectorAll("[data-payment-method]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedPaymentMethod = button.dataset.paymentMethod;

      nagadPaymentInfo.classList.toggle(
        "hidden",
        selectedPaymentMethod !== "Nagad",
      );

      bankPaymentInfo.classList.toggle(
        "hidden",
        selectedPaymentMethod !== "Bank",
      );

      advancePaymentModal.classList.remove("hidden");
      advancePaymentModal.classList.add("flex");
    });
  });

  // Close Payment Modal
  function closeAdvancePaymentModal() {
    advancePaymentModal.classList.add("hidden");
    advancePaymentModal.classList.remove("flex");
  }

  document
    .querySelector("#closeAdvancePayment")
    ?.addEventListener("click", closeAdvancePaymentModal);

  // Copy Nagad Number
  document.querySelector("#copyNagadNumber")?.addEventListener("click", () => {
    navigator.clipboard.writeText("01901379237");
    alert("Nagad নম্বর কপি হয়েছে!");
  });

  // Confirm Payment Details
  document
    .querySelector("#confirmAdvancePayment")
    ?.addEventListener("click", () => {
      let paymentDetails = {};

      if (selectedPaymentMethod === "Nagad") {
        const transactionId = document
          .querySelector("#nagadTransactionId")
          .value.trim();

        const senderNumber = document
          .querySelector("#nagadSenderNumber")
          .value.trim();

        const amount = Number(document.querySelector("#nagadAmount").value);

        // Validate Transaction ID
        if (!/^[A-Za-z0-9]{8}$/.test(transactionId)) {
          alert("Nagad Transaction ID অবশ্যই ৮ Character হতে হবে।");
          return;
        }

        // Validate Mobile Number
        const operator = getBangladeshOperator(senderNumber);

        if (!operator) {
          alert(
            "সঠিক বাংলাদেশি মোবাইল নম্বর দিন।\n\n" +
              "উদাহরণ: 013XXXXXXXX, 017XXXXXXXX",
          );
          return;
        }

        // Validate Advance Amount
        const cart = getCart();

        const subtotal = cart.reduce(
          (sum, item) => sum + Number(item.price) * Number(item.quantity),
          0,
        );

        const district = document.querySelector(
          '#checkoutForm [name="district"]',
        ).value;

        const total = subtotal + getDeliveryCharge(district);

        if (!Number.isInteger(amount) || amount <= 0 || amount > total) {
          alert(`Advance Amount অবশ্যই ১ থেকে ৳${total} এর মধ্যে হতে হবে।`);
          return;
        }

        paymentDetails = {
          method: "Nagad",
          transactionId: transactionId.toUpperCase(),
          senderNumber,
          senderOperator: operator,
          amount,
        };
      } else if (selectedPaymentMethod === "Bank") {
        const senderBankName = document
          .querySelector("#senderBankName")
          .value.trim();

        const senderBankAccount = document
          .querySelector("#senderBankAccount")
          .value.trim();

        const amount = Number(document.querySelector("#bankAmount").value);

        if (
          !senderBankName ||
          !senderBankAccount ||
          !Number.isInteger(amount) ||
          amount <= 0
        ) {
          alert("Bank Name, Account Number ও Advance Amount পূরণ করুন।");
          return;
        }

        paymentDetails = {
          method: "Bank",
          senderBankName,
          senderBankAccount,
          amount,
        };
      } else {
        alert("সঠিক পেমেন্ট মাধ্যম নির্বাচন করুন।");
        return;
      }

      advancePayment = paymentDetails;

      advancePaymentStatus.textContent =
        paymentDetails.method === "Nagad"
          ? `Nagad (${paymentDetails.senderOperator}) — ${paymentDetails.senderNumber} — ৳${paymentDetails.amount}`
          : `${paymentDetails.method} নির্বাচন করা হয়েছে — ৳${paymentDetails.amount}`;

      closeAdvancePaymentModal();
    });

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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cart = getCart();

    if (!cart.length) {
      alert("আপনার কার্টে কোনো পণ্য নেই!");
      return;
    }

    if (!form.reportValidity()) return;

    if (formDataPaymentIsAdvance() && !advancePayment) {
      alert("অগ্রিম পেমেন্টের মাধ্যম নির্বাচন করে তথ্য পূরণ করুন।");
      return;
    }

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

      const paymentDetails =
        customer.payment === "Advance" ? advancePayment : null;

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

        advancePayment: paymentDetails,
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
        orderId: result.orderId || orderId,
        customer,
        products,
        subtotal,
        delivery,
        total,

        advancePayment: paymentDetails,

        advanceAmount: result.advanceAmount ?? (paymentDetails?.amount || 0),

        dueAmount:
          result.dueAmount ??
          (customer.payment === "Advance"
            ? total - Number(paymentDetails?.amount || 0)
            : total),

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

      advancePayment = null;

      selectedPaymentMethod = "";

      advanceMethods.classList.add("hidden");

      advancePaymentStatus.textContent =
        "এখনো কোনো পেমেন্ট মাধ্যম নির্বাচন করা হয়নি।";

      document.querySelector("#nagadTransactionId").value = "";
      document.querySelector("#nagadSenderNumber").value = "";
      document.querySelector("#nagadAmount").value = "";

      document.querySelector("#senderBankName").value = "";
      document.querySelector("#senderBankAccount").value = "";
      document.querySelector("#bankAmount").value = "";

      closeAdvancePaymentModal();

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

function formDataPaymentIsAdvance() {
  return (
    document.querySelector('#checkoutForm [name="payment"]')?.value ===
    "Advance"
  );
}
