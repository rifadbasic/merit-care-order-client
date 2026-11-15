import { renderSheetInfo } from "./sheetInfo.js";

export function renderLayout() {
  document.querySelector("#app").innerHTML = `

    <!-- Header -->
    
<header class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
  <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5">

    <!-- Brand Logo & Name -->
    <a href="#" class="flex items-center gap-2.5">

      <!-- Logo -->
      <img
        src="/logo/merit-care.png"
        alt="Merit Care Logo"
        class="h-11 w-11 shrink-0 object-contain sm:h-14 sm:w-14"
      />

      <!-- Brand Name -->
      <div class="block leading-tight">

        <h1 class="text-xl font-extrabold tracking-tight text-blue-950 md:text-2xl">
          মেরিট কেয়ার
        </h1>

        <p class="mt-1 text-xs font-semibold tracking-wide text-green-600 md:text-sm">
          একাডেমি & পাবলিকেশন্স
        </p>

      </div>

    </a>

    <!-- Order Button -->
    <a
      href="#products"
      class="rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-md sm:px-5"
    >
      অর্ডার করুন
    </a>

  </nav>
</header>



    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-950 to-indigo-900 px-5 py-16 text-white">
      <div class="mx-auto max-w-7xl">

        <span class="text-orange-400">
          এসএসসি ২০২৭ বিশেষ সংস্করণ
        </span>

        <h1 class="mt-4 text-4xl font-bold md:text-6xl">
          আপনার A+ অর্জনের
          <span class="text-orange-400">যাত্রা শুরু হোক আজই।</span>
        </h1>

        <p class="mt-5 text-blue-100">
          এসএসসি ২০২৭ পরীক্ষার প্রস্তুতি হোক আরও সহজ, সুন্দর ও গোছানো।
        </p>

        <a href="#advertisement"
          class="mt-8 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold transition hover:bg-orange-600">
          আমাদের সম্পর্কে জানুন →
        </a>

      </div>
    </section>


    <!-- YouTube Advertisement Section -->
    <section id="advertisement" class="bg-white px-5 py-16">
      <div class="mx-auto max-w-5xl text-center">

        <p class="font-semibold uppercase tracking-widest text-orange-500">
          মেরিট কেয়ার একাডেমি
        </p>

        <h2 class="mt-3 text-3xl font-bold text-blue-950 md:text-4xl">
          আপনার সাফল্যই আমাদের অঙ্গীকার
        </h2>

        <p class="mt-4 text-slate-600">
          এসএসসি ২০২৭ পরীক্ষার প্রস্তুতির জন্য আমাদের বিশেষ আয়োজন দেখুন।
        </p>

        
        

<!-- Merit Care MP4 Video -->
<div class="mt-10 overflow-hidden rounded-2xl bg-black shadow-2xl">
  <video
    id="meritVideo"
    class="aspect-video w-full"
    autoplay
    loop
    playsinline
    controls
    preload="auto"
    volume="1"
  >
    <source
      src="https://res.cloudinary.com/nqebmywi/video/upload/v1794643970/_%E0%A6%9C%E0%A6%BF%E0%A6%AA%E0%A6%BF%E0%A6%8F_%E0%A7%AB_%E0%A6%AA%E0%A6%BE%E0%A6%93%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%B0_%E0%A6%B8%E0%A6%B9%E0%A6%9C_%E0%A6%89%E0%A6%AA%E0%A6%BE%E0%A6%AF%E0%A6%BC_%E0%A6%AE%E0%A7%87%E0%A6%B0%E0%A6%BF%E0%A6%9F_%E0%A6%95%E0%A7%87%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%B0_%E0%A6%B6%E0%A6%BF%E0%A6%9F____1080P_HD.mp4"
      type="video/mp4"
    />
    তোমার ব্রাউজার ভিডিও চালাতে পারছে না।
  </video>
</div>

<script>
  const meritVideo = document.getElementById("meritVideo");

  meritVideo.volume = 1;
  meritVideo.muted = false;

  meritVideo.play().catch(() => {
    console.log("Browser autoplay with sound blocked.");
  });
</script>



        <a
          href="#products"
          class="mt-8 inline-flex items-center justify-center rounded-xl bg-orange-500 px-10 py-4 text-lg font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl active:scale-95"
        >
          অর্ডার করতে এখানে ক্লিক করুন →
        </a>

        <p class="mt-4 text-sm text-slate-400">
          আপনার বিভাগের এসএসসি ২০২৭ প্যাকেজটি আজই বেছে নিন।
        </p>

      </div>
    </section>

    <!-- Merit Care Sheet Information -->
    ${renderSheetInfo()}

    <!-- Product Section -->
    <section id="products" class="bg-slate-50 px-5 py-16">
      <div class="mx-auto max-w-7xl">

        <div class="text-center">
          <p class="font-semibold text-orange-500">
            আমাদের প্রকাশনা
          </p>

          <h2 class="mt-3 text-3xl font-bold text-blue-950 md:text-4xl">
            এসএসসি ও দাখিল ২০২৭ এর শিট
          </h2>

          <p class="mt-4 text-slate-600">
            আপনার বিভাগের প্রয়োজনীয় শিটের প্যাকেজটি বেছে নিন।
          </p>
        </div>

        <!-- Product Cards -->
        <div id="productGrid"
          class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        </div>

      </div>
    </section>


    
<!-- Cart / Order Section -->
<section
  id="orderSection"
  class="hidden scroll-mt-24 bg-white px-5 py-16"
>
  <div class="mx-auto max-w-6xl">

    <!-- Section Header -->
    <div class="mb-10 text-center">
      <p class="font-semibold uppercase tracking-widest text-orange-500">
        অর্ডার সম্পন্ন করুন
      </p>

      <h2 class="mt-3 text-3xl font-bold text-blue-950 md:text-4xl">
        আপনার অর্ডারের বিবরণ
      </h2>

      <p class="mt-3 text-slate-500">
        আপনার পছন্দের পণ্যগুলো যাচাই করে অর্ডার সম্পন্ন করুন।
      </p>
    </div>

    <!-- Cart Card -->
    <div class="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm md:p-8">

      <!-- Cart Header -->
      <div class="flex items-center justify-between border-b border-slate-200 pb-4">
        <h3 class="text-xl font-bold text-blue-950">
          নির্বাচিত পণ্যসমূহ
        </h3>

        <span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
          <span id="orderCount">0</span> টি পণ্য
        </span>
      </div>

      <!-- Dynamic Cart Items -->
      <div id="orderItems" class="mt-5 space-y-4"></div>

      <!-- Order Summary -->
      <div class="mt-6 space-y-4 border-t border-slate-200 pt-5">

        <div class="flex justify-between text-sm">
          <span class="text-slate-600">পণ্যের মোট মূল্য</span>
          <span id="orderSubtotal" class="font-semibold">৳0</span>
        </div>

        <div class="flex justify-between text-sm">
          <span class="text-slate-600">ডেলিভারি চার্জ</span>
          <span id="orderDelivery" class="font-semibold">৳0</span>
        </div>

        <div class="flex justify-between border-t border-slate-200 pt-4 text-xl font-bold text-blue-950">
          <span>সর্বমোট</span>
          <span id="orderTotal">৳0</span>
        </div>

      </div>

      <!-- Checkout Button -->
      <button
        id="checkoutBtn"
        type="button"
        class="mt-7 w-full rounded-xl bg-orange-500 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl active:scale-[0.98]"
      >
        Checkout করুন →
      </button>

      <p class="mt-4 text-center text-xs text-slate-500">
        পরবর্তী ধাপে আপনার ডেলিভারি ও ব্যক্তিগত তথ্য প্রদান করুন।
      </p>

    </div>

  </div>
</section>



   

<!-- Premium Footer -->
<footer class="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 text-white">

  <!-- Decorative Background -->
  <div class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
  <div class="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"></div>

  <div class="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">

    <!-- Main Footer -->
    <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">

      <!-- Company Info -->
      <div>
        
       
          <!-- Footer Brand -->
          <div class="flex items-start gap-3">

            
            <!-- Footer Brand White Box -->
            <div class="inline-flex items-center gap-2 rounded-2xl bg-white p-2 shadow-lg">

              <!-- Logo -->
              <img
                src="/logo/merit-care.png"
                alt="Merit Care Logo"
                class="h-16 w-16 shrink-0 object-contain"
              />

              <!-- Brand Name -->
              <div class="flex flex-col items-start justify-center">

                <h3 class="text-xl font-extrabold tracking-wide text-blue-950">
                  মেরিট কেয়ার
                </h3>

                <p class="mt-1 text-sm font-semibold tracking-wide text-green-700">
                  একাডেমি & পাবলিকেশন্স
                </p>

              </div>

            </div>


            

          </div>


        <!-- Description -->
        <p class="mt-4 max-w-sm text-sm leading-7 text-slate-300">
          স্বপ্ন বিনির্মাণে দৃঢ় প্রত্যয়ী।
          শিক্ষার্থীদের মানসম্মত শিক্ষা ও
          সৃজনশীল শিক্ষাসামগ্রী পৌঁছে দেওয়াই আমাদের লক্ষ্য।
        </p>


        <!-- Social Links -->
        <div class="mt-5 flex flex-wrap gap-3">

          <a
            href="https://www.facebook.com/MeritCareAcademyAndPublications"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Page"
            class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-300 transition duration-300 hover:border-blue-400 hover:bg-blue-600 hover:text-white"
          >
            <i class="fa-brands fa-facebook-f"></i>
          </a>

          <a
            href="https://meritcareacademy.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Official Website"
            class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-300 transition duration-300 hover:border-blue-400 hover:bg-blue-600 hover:text-white"
          >
            <i class="fa-solid fa-globe"></i>
          </a>

          <a
            href="tel:01901379237"
            aria-label="Call Merit Care"
            class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-300 transition duration-300 hover:border-green-400 hover:bg-green-600 hover:text-white"
          >
            <i class="fa-solid fa-phone"></i>
          </a>

        </div>
      </div>

      <!-- Contact Information -->
      <div>
        <h4 class="mb-5 text-lg font-semibold text-white">
          Contact Information
        </h4>

        <div class="space-y-4">

          <!-- Phone -->
          <a
            href="tel:01901379237"
            class="group flex items-center gap-3 text-sm text-slate-300 transition hover:text-white"
          >
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-blue-300 transition group-hover:bg-green-600 group-hover:text-white">
              <i class="fa-solid fa-phone"></i>
            </span>

            <span>
              <span class="block text-xs text-slate-400">Call Us</span>
              <span class="mt-1 block font-medium">01901379237</span>
            </span>
          </a>

          <!-- Facebook -->
          <a
            href="https://www.facebook.com/MeritCareAcademyAndPublications"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-3 text-sm text-slate-300 transition hover:text-white"
          >
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-blue-300 transition group-hover:bg-blue-600 group-hover:text-white">
              <i class="fa-brands fa-facebook-f"></i>
            </span>

            <span>
              <span class="block text-xs text-slate-400">Facebook Page</span>
              <span class="mt-1 block font-medium">Merit Care Academy</span>
            </span>
          </a>

          <!-- Website -->
          <a
            href="https://meritcareacademy.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-3 text-sm text-slate-300 transition hover:text-white"
          >
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-blue-300 transition group-hover:bg-cyan-600 group-hover:text-white">
              <i class="fa-solid fa-globe"></i>
            </span>

            <span>
              <span class="block text-xs text-slate-400">Official Website</span>
              <span class="mt-1 block font-medium">meritcareacademy.com</span>
            </span>
          </a>

        </div>
      </div>

      <!-- Developer Information -->
      <div>
        <h4 class="mb-5 text-lg font-semibold text-white">
          Developer Information
        </h4>

        <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:border-cyan-400/30 hover:bg-white/[0.06]">

          <!-- Developer Badge -->
          <div class="flex items-center gap-3">

            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-blue-500/20">
              <i class="fa-solid fa-code text-lg"></i>
            </div>

            <div>
              <p class="text-xs text-slate-400">
                Designed & Developed By
              </p>

              <a
                href="https://my-portfolio-app-sepia.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-1 inline-block text-lg font-bold tracking-wide text-white transition hover:text-cyan-300"
              >
                rifadbasic
                <i class="fa-solid fa-arrow-up-right-from-square ml-1 text-xs"></i>
              </a>
            </div>

          </div>

          <!-- Designation -->
          <p class="mt-4 text-sm font-medium text-cyan-300">
            Full Stack Web Developer
          </p>

          <!-- Tech Stack -->
          <div class="mt-3 flex flex-wrap gap-2">

            <span class="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
              JavaScript
            </span>

            <span class="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
              React
            </span>

            <span class="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
              Node.js
            </span>

          </div>

          <!-- Portfolio & Facebook Links -->
<div class="mt-5 flex flex-wrap items-center gap-3">

  <!-- Portfolio Link -->
  <a
    href="https://my-portfolio-app-sepia.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-2 rounded-lg bg-cyan-500/10 px-4 py-2.5 text-xs font-semibold text-cyan-300 transition duration-300 hover:bg-cyan-500 hover:text-white"
  >
    View Portfolio
    <i class="fa-solid fa-arrow-right transition group-hover:translate-x-1"></i>
  </a>

  <!-- Facebook Link -->
  <a
    href="https://www.facebook.com/rk.jihab"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-2 rounded-lg bg-blue-500/10 px-4 py-2.5 text-xs font-semibold text-blue-300 transition duration-300 hover:bg-blue-600 hover:text-white"
  >
    <i class="fa-brands fa-facebook text-sm"></i>
    Facebook
    <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
  </a>

</div>

        </div>
      </div>

    </div>

    <!-- Bottom Copyright -->
    <div class="mt-12 border-t border-white/10 pt-6 text-center">

      <p class="text-xs leading-6 text-slate-400">
        © <span id="footerYear"></span>
        Merit Care Academy & Publications.
        All Rights Reserved.
      </p>

      <p class="mt-2 text-xs text-slate-500">
        Crafted with <span class="text-red-400">♥</span> by
        <a
          href="https://my-portfolio-app-sepia.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium text-slate-300 transition hover:text-cyan-300"
        >
          rifadbasic
        </a>
      </p>

    </div>

  </div>

</footer>



  `;
}
