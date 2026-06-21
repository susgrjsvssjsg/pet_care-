const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const copyAddressButton = document.querySelector("[data-copy-address]");
const copyNote = document.querySelector("[data-copy-note]");
const routeNote = document.querySelector("[data-route-note]");
const routeButtons = document.querySelectorAll("[data-route]");
const bookingForm = document.querySelector("[data-booking-form]");
const formNote = document.querySelector("[data-form-note]");
const carousel = document.querySelector("[data-carousel]");
const slides = document.querySelectorAll("[data-slide]");
const dots = document.querySelectorAll("[data-carousel-dot]");
const prevSlideButton = document.querySelector("[data-carousel-prev]");
const nextSlideButton = document.querySelector("[data-carousel-next]");
const reviewCarousel = document.querySelector("[data-review-carousel]");
const reviewTrack = document.querySelector("[data-review-track]");
const reviewSlides = document.querySelectorAll("[data-review-slide]");
const reviewDots = document.querySelectorAll("[data-review-dot]");
const reviewPrev = document.querySelector("[data-review-prev]");
const reviewNext = document.querySelector("[data-review-next]");

const address = "北京市通州区府东苑13号楼11门";
const routeMessages = {
  步行: "已为你标出门店，可从府东苑小区入口步行前往。",
  骑行: "骑行时建议先定位到府东苑13号楼，再按门牌找到11门。",
  打车: "打车可直接输入“梦佳宠物”。"
};

let activeSlide = 0;
let carouselTimer;
let activeReview = 0;
let reviewTimer;

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeSlide);
  });
}

function startCarousel() {
  window.clearInterval(carouselTimer);
  carouselTimer = window.setInterval(() => {
    showSlide(activeSlide + 1);
  }, 5200);
}

function closeNav() {
  nav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "打开导航");
}

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    closeNav();
  }
});

copyAddressButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(address);
    copyNote.textContent = "地址已复制，可以粘贴到地图 App 搜索。";
  } catch {
    copyNote.textContent = address;
  }
});

routeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    routeButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    routeNote.textContent = routeMessages[button.dataset.route];
  });
});

prevSlideButton.addEventListener("click", () => {
  showSlide(activeSlide - 1);
  startCarousel();
});

nextSlideButton.addEventListener("click", () => {
  showSlide(activeSlide + 1);
  startCarousel();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startCarousel();
  });
});

carousel.addEventListener("mouseenter", () => {
  window.clearInterval(carouselTimer);
});

carousel.addEventListener("mouseleave", startCarousel);

startCarousel();

function showReview(index) {
  activeReview = (index + reviewSlides.length) % reviewSlides.length;
  reviewTrack.style.transform = `translateX(-${activeReview * 100}%)`;
  reviewSlides.forEach((slide, slideIndex) => slide.setAttribute("aria-hidden", String(slideIndex !== activeReview)));
  reviewDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeReview);
    dot.toggleAttribute("aria-current", dotIndex === activeReview);
  });
}

function startReviewCarousel() {
  window.clearInterval(reviewTimer);
  reviewTimer = window.setInterval(() => showReview(activeReview + 1), 4800);
}

reviewPrev.addEventListener("click", () => { showReview(activeReview - 1); startReviewCarousel(); });
reviewNext.addEventListener("click", () => { showReview(activeReview + 1); startReviewCarousel(); });
reviewDots.forEach((dot, index) => dot.addEventListener("click", () => { showReview(index); startReviewCarousel(); }));
reviewCarousel.addEventListener("mouseenter", () => window.clearInterval(reviewTimer));
reviewCarousel.addEventListener("mouseleave", startReviewCarousel);
reviewCarousel.addEventListener("focusin", () => window.clearInterval(reviewTimer));
reviewCarousel.addEventListener("focusout", startReviewCarousel);
showReview(0);
startReviewCarousel();

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const pet = formData.get("pet");
  const service = formData.get("service");
  const phone = formData.get("phone");

  formNote.textContent = `${pet}的「${service}」需求已记录，我们会联系 ${phone} 确认到店时间。`;
  bookingForm.reset();
});
