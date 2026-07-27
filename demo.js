const ACCOUNTS = [
  { username: "bardiya", password: "Admin@1234", label: "مدیر" },
  { username: "sultan", password: "User@1234", label: "فروشنده" },
];

const SCREENS = [
  {
    id: "overview",
    title: "خانه",
    desc: "داشبورد و میان‌برهای ثبت محصول، فروش و ویرایش سفارش.",
    src: "screenshots/overview.png",
  },
  {
    id: "products",
    title: "محصولات",
    desc: "فهرست کالا با رنگ/سایز، بارکد و مدیریت موجودی.",
    src: "screenshots/products.png",
  },
  {
    id: "sell",
    title: "ثبت فروش",
    desc: "صندوق فروش با اسکن بارکد و صدور فاکتور.",
    src: "screenshots/sell.png",
  },
  {
    id: "warehouses",
    title: "انبارها",
    desc: "چندانباره، انتقال و توزیع موجودی.",
    src: "screenshots/warehouses.png",
  },
  {
    id: "reports",
    title: "گزارش‌ها",
    desc: "گزارش مالی و فروش با خروجی Excel/PDF.",
    src: "screenshots/reports.png",
  },
  {
    id: "settings",
    title: "تنظیمات",
    desc: "برندینگ فروشگاه و تنظیمات سامانه.",
    src: "screenshots/settings.png",
  },
  {
    id: "login",
    title: "ورود",
    desc: "ورود دو مرحله‌ای (رمز + OTP) — در دمو واقعی کد روی صفحه دیده می‌شود.",
    src: "screenshots/login.png",
  },
  {
    id: "mobile",
    title: "موبایل",
    desc: "نمای واکنش‌گرا برای استفاده روی گوشی.",
    src: "screenshots/overview-mobile.png",
    mobile: true,
  },
];

const gate = document.getElementById("gate");
const tour = document.getElementById("tour");
const form = document.getElementById("login-form");
const errorEl = document.getElementById("login-error");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const screenNav = document.getElementById("screen-nav");
const railList = document.getElementById("rail-list");
const screenTitle = document.getElementById("screen-title");
const screenDesc = document.getElementById("screen-desc");
const screenImg = document.getElementById("screen-img");
const frame = screenImg.closest(".frame");
const pagerLabel = document.getElementById("pager-label");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const logoutBtn = document.getElementById("logout");

let index = 0;

function findAccount(username, password) {
  const u = username.trim().toLowerCase();
  return ACCOUNTS.find((a) => a.username === u && a.password === password);
}

function enterTour() {
  gate.hidden = true;
  tour.hidden = false;
  showScreen(0);
  sessionStorage.setItem("mehrnegar-demo", "1");
}

function exitTour() {
  tour.hidden = true;
  gate.hidden = false;
  sessionStorage.removeItem("mehrnegar-demo");
  errorEl.hidden = true;
  form.reset();
}

function showScreen(i) {
  index = (i + SCREENS.length) % SCREENS.length;
  const s = SCREENS[index];
  screenTitle.textContent = s.title;
  screenDesc.textContent = s.desc;
  screenImg.src = s.src;
  screenImg.alt = s.title;
  frame.classList.toggle("mobile-frame", Boolean(s.mobile));
  pagerLabel.textContent = `${toFa(index + 1)} / ${toFa(SCREENS.length)}`;

  screenNav.querySelectorAll("button").forEach((btn, n) => {
    btn.classList.toggle("active", n === index);
  });
  railList.querySelectorAll("button").forEach((btn, n) => {
    btn.classList.toggle("active", n === index);
  });
}

function toFa(n) {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

function buildNav() {
  SCREENS.forEach((s, i) => {
    const top = document.createElement("button");
    top.type = "button";
    top.textContent = s.title;
    top.addEventListener("click", () => showScreen(i));
    screenNav.appendChild(top);

    const side = document.createElement("button");
    side.type = "button";
    side.textContent = s.title;
    side.addEventListener("click", () => showScreen(i));
    railList.appendChild(side);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (findAccount(usernameInput.value, passwordInput.value)) {
    errorEl.hidden = true;
    enterTour();
  } else {
    errorEl.hidden = false;
  }
});

document.querySelectorAll(".quick button").forEach((btn) => {
  btn.addEventListener("click", () => {
    usernameInput.value = btn.dataset.user;
    passwordInput.value = btn.dataset.pass;
    enterTour();
  });
});

prevBtn.addEventListener("click", () => showScreen(index - 1));
nextBtn.addEventListener("click", () => showScreen(index + 1));
logoutBtn.addEventListener("click", exitTour);

document.addEventListener("keydown", (e) => {
  if (tour.hidden) return;
  if (e.key === "ArrowLeft") showScreen(index + 1);
  if (e.key === "ArrowRight") showScreen(index - 1);
});

buildNav();

if (sessionStorage.getItem("mehrnegar-demo") === "1") {
  enterTour();
}
