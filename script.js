/**
 * الوكيل لتجارة السيارات — El Wakeel for Car Trade
 * Main JavaScript | script.js
 * Features: Dynamic Cars API Integration (https://el-wakeel-backend.vercel.app/api/cars),
 *           Multilingual (AR/EN), Smooth Scroll, Animations,
 *           Tabs, Lead Form → WhatsApp, Interactive Filter System, Navbar, Car Modal Gallery
 */

'use strict';

/* ============================
   GLOBAL STATE & API CONFIG
   ============================ */
const API_CARS_URL = 'https://el-wakeel-backend.vercel.app/api/cars';
const API_LEADS_URL = 'https://el-wakeel-backend.vercel.app/api/leads';
let fetchedCarsList = [];

// Fallback Cars Database (17 Cars from Backend API)
const FALLBACK_CARS = [
  {
    "_id": "6aadb0fe1cb934a9128ffa32",
    "name": "Cherry Tiggo 7",
    "category": "ملاكي",
    "speed": "وسط",
    "description": "تبدأ اعلى فئة من 1,070,000",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789767934/el-wakeel/cars/w3plgxelpfiaka0vlgzc.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789767930/el-wakeel/cars/ropynlwv1vjwmllfp4kw.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789767928/el-wakeel/cars/ta75ivepnbg1guwdy61n.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789767935/el-wakeel/cars/hnm0gpyo8swdougaieqt.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789767936/el-wakeel/cars/dtspijbgliaqycotjmaa.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789767937/el-wakeel/cars/fcugsswnkzcrjf5i0obp.jpg"
    ]
  },
  {
    "_id": "6aadb40a1cb934a9128ffa33",
    "name": "Chery Tiggo 4 Pro",
    "category": "ملاكي",
    "speed": "وسط",
    "description": "تبدأ من 900,000 وحتى 1,000,000",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789768707/el-wakeel/cars/xxccvrlehgc4es4yrkvg.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789768711/el-wakeel/cars/jbu4qgpnrqhcghd4lkyc.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789768714/el-wakeel/cars/bmwzvmf0uwvecif3uffm.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789768715/el-wakeel/cars/r9opgkfcdqjljtvm7v34.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789768716/el-wakeel/cars/tiemec7uhxi4taed9u0w.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789768717/el-wakeel/cars/bpvkcwwqfx9fvzdudjud.jpg"
    ]
  },
  {
    "_id": "6aadb5861cb934a9128ffa34",
    "name": "Foton Wonder",
    "category": "نقل",
    "speed": "وسط",
    "description": "تبدأ من 566,000 | سقف عالي 1630 | Kyc بضايع 660",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789769088/el-wakeel/cars/ep9f4co9hsotthddmrjh.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789769092/el-wakeel/cars/vtkrdygjytof9zzfjcch.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789769096/el-wakeel/cars/puu5zdiq0c6zwb3hay2i.png"
    ]
  },
  {
    "_id": "6aadbf92701aaae0189951b1",
    "name": "JAC JS2",
    "category": "ملاكي",
    "speed": "بطيء",
    "description": "تبدأ من 800,000",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789771653/el-wakeel/cars/m1rtaqcn4qxlyfmbrsng.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789771655/el-wakeel/cars/hem7nkkfuwnwoj3ls2f3.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789771658/el-wakeel/cars/olo8cioludujtziy775n.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789771663/el-wakeel/cars/ougco4mmrioxocozbput.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789771669/el-wakeel/cars/an8evjztcfykulglki9m.png"
    ]
  },
  {
    "_id": "6aadc0fa701aaae0189951b3",
    "name": "JAC JS4",
    "category": "ملاكي",
    "speed": "بطيء",
    "description": "للاستفسار يرجى التواصل",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772013/el-wakeel/cars/qh6rzqsycwlhvpicrhso.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772018/el-wakeel/cars/tbwsnuvqicheje9qdy1x.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772022/el-wakeel/cars/wdccgfgsy6s0agh3n1a1.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772024/el-wakeel/cars/a0lzdfdqujoflmt6fnxi.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772025/el-wakeel/cars/pw59b88fe3p15jpvjqmj.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772026/el-wakeel/cars/tkfapyq9d7pmhv2q4dvl.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772027/el-wakeel/cars/mdmbchbzr44xdgcfl4tw.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772028/el-wakeel/cars/pmoakd3caskfhutm9uut.jpg"
    ]
  },
  {
    "_id": "6aadc1dc701aaae0189951b4",
    "name": "Jetour Dashing",
    "category": "ملاكي",
    "speed": "سريع",
    "description": "تبدأ من 1,390,000",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772245/el-wakeel/cars/u7cgkwhg0x5bvwmvhaym.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772248/el-wakeel/cars/lapblblwl0fjgyufsyzu.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772251/el-wakeel/cars/ggnxrivtxukz87tnbxqk.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772255/el-wakeel/cars/izhugnblgte6avouejqw.png"
    ]
  },
  {
    "_id": "6aadc33b701aaae0189951b5",
    "name": "Jetour X70 Plus",
    "category": "ملاكي",
    "speed": "سريع",
    "description": "موديل 2027 | 1500 Turbo | 6DCT Wet | 180hp | Fuel Tank 57L | 6 Air Bags | 360 view | Auto Rain Sensor | Rear parking sensor | R18 | 4-way power Adjustable Driver seat | 4-way power Adjustable passenger seat",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772588/el-wakeel/cars/pfqvgt9sirgbh1huzull.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772593/el-wakeel/cars/wpj2n4bixxigabhfehrj.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772597/el-wakeel/cars/gjpmdotp5z349wkqqwor.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772602/el-wakeel/cars/mkiip1uiliurtpkj6wui.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789772606/el-wakeel/cars/kc8ytxydnnbbkawkjvwa.png"
    ]
  },
  {
    "_id": "6aadcda8701aaae0189951b6",
    "name": "JMC New Boarding",
    "category": "نقل",
    "speed": "سريع",
    "description": "وحش الاسفلت | موديل 2027 | كاملة مكيفة | 2800 ديزل",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775264/el-wakeel/cars/oquskmibx1fck0gcnqw7.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775270/el-wakeel/cars/nbnsbisrnro7lrheb7vu.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775274/el-wakeel/cars/rhqkrgqercg7ydrn3y69.png"
    ]
  },
  {
    "_id": "6aadce42701aaae0189951b7",
    "name": "Kaiyi X3 Pro",
    "category": "ملاكي",
    "speed": "بطيء",
    "description": "تبدأ من 930,000",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775421/el-wakeel/cars/cpduqcp4qbl9lzjasqxi.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775423/el-wakeel/cars/rhcrjnlmegxrgjnxiosu.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775426/el-wakeel/cars/uwj6yd2grf4huevuj0tk.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775428/el-wakeel/cars/b6ivxkmbmykdlxrq5awf.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775428/el-wakeel/cars/znrdgxi8jjte4zucwsuy.jpg"
    ]
  },
  {
    "_id": "6aadcf2d701aaae0189951b8",
    "name": "King Long",
    "category": "ميكروباص",
    "speed": "سريع",
    "description": "تبدأ من 990,000",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775647/el-wakeel/cars/xcjfacbqlxh7y4sue7wa.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775650/el-wakeel/cars/pzzhzhq3cfwe4z7qw37f.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775654/el-wakeel/cars/l3ln3jrpsos1pabl6lkk.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775659/el-wakeel/cars/iib6joyl39kzaookqzfr.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775664/el-wakeel/cars/lmufomsmsujfvvrnv2hz.png"
    ]
  },
  {
    "_id": "6aadcf87701aaae0189951b9",
    "name": "MG ONE",
    "category": "ملاكي",
    "speed": "سريع",
    "description": "تبدأ من 1,410,000",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775743/el-wakeel/cars/xnaww8var0vu2wo9jkjv.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775747/el-wakeel/cars/ph8a4b02qcg7jlwvaqfn.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775751/el-wakeel/cars/uocrz69zae4lh2e2hbb2.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775752/el-wakeel/cars/igro6huvg6zdp0nkjgtw.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775752/el-wakeel/cars/bekjlsqiojuxv68aclgd.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775753/el-wakeel/cars/rcptwk3ntqki8pihu0pe.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775754/el-wakeel/cars/p62dte1nczngcpsqblca.jpg"
    ]
  },
  {
    "_id": "6aadcfdb701aaae0189951ba",
    "name": "MG RX5 Plus",
    "category": "ملاكي",
    "speed": "وسط",
    "description": "تبدأ من 1,450,000",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775821/el-wakeel/cars/fygqsbe2z2qoymbxetwe.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775824/el-wakeel/cars/y3jqgngrbngmtkydlja7.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775829/el-wakeel/cars/alhnxettcg3e8d3h9xcq.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775834/el-wakeel/cars/ifxjvqlu2ps4rnxepvrg.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775838/el-wakeel/cars/bhlz8bnusjxknxs62umd.png"
    ]
  },
  {
    "_id": "6aadd020701aaae0189951bb",
    "name": "MG ZS",
    "category": "ملاكي",
    "speed": "سريع",
    "description": "تبدأ من 1,170,000",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775889/el-wakeel/cars/lbvcv2f3bt9jjmcfjwjr.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775893/el-wakeel/cars/bk4ypfjnqzge0yzivcdu.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775898/el-wakeel/cars/ufbylb37kzr8vjytoq9b.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775903/el-wakeel/cars/ws9rb4tbmcvdt1groarc.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789775907/el-wakeel/cars/mdhvjhyo3lkarjf6jwxl.png"
    ]
  },
  {
    "_id": "6aadd1d6701aaae0189951bc",
    "name": "JAC 5.5 tons",
    "category": "نقل",
    "speed": "بطيء",
    "description": "تبدأ من 1,150,000",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789776335/el-wakeel/cars/izpkhufhv28sl1bd0cmb.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789776339/el-wakeel/cars/peoqmgskphz4bj03t3cs.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789776344/el-wakeel/cars/idox8kimouas73epmkdn.png"
    ]
  },
  {
    "_id": "6aadd22f701aaae0189951bd",
    "name": "JAC 3 tons",
    "category": "نقل",
    "speed": "بطيء",
    "description": "تبدأ من 920,000",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789776426/el-wakeel/cars/yk8b4zecdtt8nwtzdlan.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789776429/el-wakeel/cars/hxkibjhb5qf3epvq9hk9.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789776433/el-wakeel/cars/oix8bmpl0ryq7fsydnys.png"
    ]
  },
  {
    "_id": "6aadd293701aaae0189951be",
    "name": "Nissan Magnite",
    "category": "ملاكي",
    "speed": "سريع",
    "description": "Two tone | موديل 2027 | Turbo 1000 | 6 Air bags | Abs | Rear parking sensor | 360 view",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789776519/el-wakeel/cars/mczgpb0ysajhzppblx47.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789776521/el-wakeel/cars/ttsyzw8mox5chxexkz8t.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789776524/el-wakeel/cars/aroyugaitwpc5p51w9wf.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789776528/el-wakeel/cars/re61gi8yjded0u8kejzj.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789776534/el-wakeel/cars/pfrjndyaomffk7e0jyl6.png"
    ]
  },
  {
    "_id": "6aadd3cc701aaae0189951bf",
    "name": "Cherry Karry Q22B",
    "category": "نقل",
    "speed": "بطيء",
    "description": "للاستفسار يرجى التواصل",
    "images": [
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789776837/el-wakeel/cars/lpybpyo0rrkr4xpdi85j.jpg",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789776841/el-wakeel/cars/rqccibpgfiafn9ad4q7i.png",
      "https://res.cloudinary.com/ww3gequp/image/upload/v1789776846/el-wakeel/cars/s7ptlyx9kunqwemqhhux.png"
    ]
  }
];

/* Helper to deduce brand from car name */
function getCarBrand(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('mg')) return 'MG';
  if (n.includes('chery') || n.includes('cherry')) return 'Chery';
  if (n.includes('jetour')) return 'Jetour';
  if (n.includes('jac')) return 'JAC';
  if (n.includes('jmc')) return 'JMC';
  if (n.includes('foton')) return 'Foton';
  if (n.includes('kaiyi')) return 'Kaiyi';
  if (n.includes('nissan')) return 'Nissan';
  if (n.includes('king long')) return 'King Long';
  return name ? name.split(' ')[0] : 'الوكيل';
}

/* Helper to map Category text to Tab Panel Key */
function getCategoryKey(cat) {
  if (!cat) return 'malaki';
  if (cat.includes('ملاكي')) return 'malaki';
  if (cat.includes('نقل')) return 'naql';
  if (cat.includes('ميكروباص')) return 'micro';
  return 'malaki';
}

/* Create Slide HTML for Car Card */
function createCarSlideHTML(car) {
  const brand = getCarBrand(car.name);
  const categoryKey = getCategoryKey(car.category);
  const mainImage = (car.images && car.images.length > 0) ? car.images[0] : 'images/logo/logo.png';
  const speedText = car.speed ? `سرعة ${car.speed}` : 'كفاءة عالية';
  const desc = car.description ? car.description : '';
  const carId = car._id || car.name;

  return `
    <div class="swiper-slide">
      <div class="car-card animate-on-scroll visible" data-id="${carId}" data-brand="${brand}" data-category="${categoryKey}">
        <div class="car-img-wrap" onclick="openCarModal('${carId}')">
          <span class="car-category-badge">${car.category || 'ملاكي'}</span>
          <span class="car-speed-tag"><i class="ph-fill ph-lightning"></i> ${speedText}</span>
          <img src="${mainImage}" alt="${car.name}" loading="lazy" onload="this.classList.add('img-loaded'); if (this.parentElement) this.parentElement.classList.add('has-loaded');" />
          <div class="car-overlay">
            <button class="car-overlay-btn">
              <i class="ph-bold ph-eye"></i>
              <span>عرض التفاصيل</span>
            </button>
          </div>
        </div>
        <div class="car-card-body">
          <div>
            <div class="car-brand-sub">${brand}</div>
            <h3 class="car-card-title">${car.name}</h3>
            <div class="car-specs-row">
              <span class="spec-pill"><i class="ph-fill ph-tag"></i> <span>${car.category || 'سيارة'}</span></span>
              <span class="spec-pill"><i class="ph-fill ph-gauge"></i> <span>السرعة: ${car.speed || 'وسط'}</span></span>
              <span class="spec-pill"><i class="ph-fill ph-shield-check"></i> <span>ضمان الوكيل</span></span>
            </div>
            ${desc ? `<p class="car-card-desc-snippet">${desc}</p>` : ''}
          </div>
          <div class="car-card-footer">
            <div class="car-price-info">
              <span class="price-lbl">نظام السداد:</span>
              <span class="price-val">كاش / تقسيط</span>
            </div>
            <button class="btn-car-inquire" onclick="inquireCar('${car.name.replace(/'/g, "\\'")}')">
              <i class="ph-bold ph-paper-plane-tilt"></i>
              <span>طلب استفسار / حجز</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* Render Skeleton Loader Placeholders */
function renderSkeletonLoaders() {
  const skeletonCardHTML = `
    <div class="swiper-slide">
      <div class="car-card skeleton-card">
        <div class="car-img-wrap skeleton-img-wrap">
          <div class="skeleton-shimmer"></div>
        </div>
        <div class="car-card-body">
          <div class="skeleton-line skeleton-title"></div>
          <div class="skeleton-line skeleton-subtitle"></div>
          <div class="skeleton-specs-row">
            <div class="skeleton-pill"></div>
            <div class="skeleton-pill"></div>
          </div>
          <div class="skeleton-line skeleton-btn"></div>
        </div>
      </div>
    </div>
  `;
  const skeletonSlides = Array(4).fill(skeletonCardHTML).join('');

  const wrappers = document.querySelectorAll('.fleet-swiper .swiper-wrapper');
  wrappers.forEach(w => {
    if (w) w.innerHTML = skeletonSlides;
  });
}

/* ============================
   DOM READY
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initThemeToggle();
  initNavbar();
  initScrollProgress();
  initHamburger();
  initSmoothScroll();
  initScrollAnimations();
  initLeadForm();
  initNavActiveLinks();
  initHeroFilter();
  initCarModal();

  // Show Skeleton Loaders immediately while API is fetching
  if (document.querySelector('.fleet-swiper')) {
    renderSkeletonLoaders();
    initFleetSliders();
  }

  // Fetch cars dynamically from Backend API
  fetchAndRenderCars();
});

/* ============================
   API FETCH & CAR RENDERER
   ============================ */
async function fetchAndRenderCars() {
  try {
    const response = await fetch(API_CARS_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    if (data && data.success && Array.isArray(data.cars) && data.cars.length > 0) {
      fetchedCarsList = data.cars;
    } else {
      fetchedCarsList = FALLBACK_CARS;
    }
  } catch (error) {
    console.warn('API Fetch failed, utilizing fallback cars dataset:', error);
    fetchedCarsList = FALLBACK_CARS;
  }

  renderAllPanels(fetchedCarsList);
  initUrlCategorySync();
}

function renderAllPanels(cars) {
  const panelAllWrapper = document.querySelector('#panel-all .swiper-wrapper');
  const panelMalakiWrapper = document.querySelector('#panel-malaki .swiper-wrapper');
  const panelNaqlWrapper = document.querySelector('#panel-naql .swiper-wrapper');
  const panelMicroWrapper = document.querySelector('#panel-micro .swiper-wrapper');

  const malakiCars = cars.filter(c => (c.category || '').includes('ملاكي'));
  const naqlCars = cars.filter(c => (c.category || '').includes('نقل'));
  const microCars = cars.filter(c => (c.category || '').includes('ميكروباص'));

  if (panelAllWrapper) {
    panelAllWrapper.innerHTML = cars.map(createCarSlideHTML).join('');
    delete panelAllWrapper.dataset.originalHtml;
  }
  if (panelMalakiWrapper) {
    panelMalakiWrapper.innerHTML = malakiCars.map(createCarSlideHTML).join('');
    delete panelMalakiWrapper.dataset.originalHtml;
  }
  if (panelNaqlWrapper) {
    panelNaqlWrapper.innerHTML = naqlCars.map(createCarSlideHTML).join('');
    delete panelNaqlWrapper.dataset.originalHtml;
  }
  if (panelMicroWrapper) {
    panelMicroWrapper.innerHTML = microCars.map(createCarSlideHTML).join('');
    delete panelMicroWrapper.dataset.originalHtml;
  }

  // Initialize or update Swipers with newly injected API slides
  initFleetSliders();
}

/* ============================
   THEME TOGGLE SYSTEM (LIGHT / DARK)
   ============================ */
function updateNavLogo(isDark) {
  const lightLogos = document.querySelectorAll('.logo-light');
  const darkLogos = document.querySelectorAll('.logo-dark');
  lightLogos.forEach(el => el.style.display = isDark ? 'none' : 'block');
  darkLogos.forEach(el => el.style.display = isDark ? 'block' : 'none');
}

function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const toggleIcon = document.getElementById('theme-toggle-icon');

  const storedTheme = localStorage.getItem('elwakeel-theme');
  const isInitialDark = storedTheme === 'dark';
  if (isInitialDark) {
    document.body.classList.add('dark-mode');
    if (toggleIcon) toggleIcon.className = 'ph-bold ph-sun';
  } else {
    document.body.classList.remove('dark-mode');
    if (toggleIcon) toggleIcon.className = 'ph-bold ph-moon-stars';
  }
  updateNavLogo(isInitialDark);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('elwakeel-theme', isDark ? 'dark' : 'light');
      if (toggleIcon) {
        toggleIcon.className = isDark ? 'ph-bold ph-sun' : 'ph-bold ph-moon-stars';
      }
      updateNavLogo(isDark);
    });
  }
}

/* ============================
   YEAR
   ============================ */
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================
   PROGRESS BAR
   ============================ */
function initScrollProgress() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ============================
   NAVBAR — scroll effect
   ============================ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ============================
   ACTIVE NAV LINKS (Intersection)
   ============================ */
function initNavActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ============================
   HAMBURGER / MOBILE MENU
   ============================ */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
}

function closeMobile() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.remove('open');
  if (btn) { btn.classList.remove('open'); btn.setAttribute('aria-expanded', false); }
  document.body.style.overflow = '';
}

/* ============================
   SMOOTH SCROLL
   ============================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('navbar')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============================
   SCROLL ANIMATIONS
   ============================ */
function initScrollAnimations() {
  const els = document.querySelectorAll('.animate-on-scroll');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ============================
   FLEET TABS & SWIPER SLIDER SYSTEM
   ============================ */
let activeFleetTab = 'all';
let fleetSwipers = {};

function getMinSlidesForControls() {
  const w = window.innerWidth;
  if (w < 576) return 1;
  if (w < 840) return 2;
  if (w < 1100) return 3;
  return 4;
}

function updatePanelSliderControls(panelKey) {
  const swiperEl = document.querySelector(`.fleet-swiper-${panelKey}`);
  if (!swiperEl) return;

  const outerWrap = swiperEl.closest('.fleet-slider-outer');
  if (!outerWrap) return;

  const prevBtn = outerWrap.querySelector('.fleet-prev-btn');
  const nextBtn = outerWrap.querySelector('.fleet-next-btn');
  const paginationEl = swiperEl.querySelector('.fleet-swiper-pagination');

  const visibleSlides = Array.from(swiperEl.querySelectorAll('.swiper-slide')).filter(slide => {
    return slide.style.display !== 'none';
  });

  const count = visibleSlides.length;
  const minRequired = getMinSlidesForControls();
  const showControls = count > minRequired;

  if (prevBtn) prevBtn.style.display = showControls ? 'flex' : 'none';
  if (nextBtn) nextBtn.style.display = showControls ? 'flex' : 'none';
  if (paginationEl) paginationEl.style.display = showControls ? 'block' : 'none';
}

function initFleetSliders() {
  if (typeof Swiper === 'undefined') return;

  Object.keys(fleetSwipers).forEach(key => {
    if (fleetSwipers[key] && typeof fleetSwipers[key].destroy === 'function') {
      fleetSwipers[key].destroy(true, true);
    }
  });
  fleetSwipers = {};

  const panels = ['all', 'malaki', 'naql', 'micro'];
  const minRequired = getMinSlidesForControls();

  panels.forEach(panelKey => {
    const swiperEl = document.querySelector(`.fleet-swiper-${panelKey}`);
    if (!swiperEl) return;

    const wrapper = swiperEl.querySelector('.swiper-wrapper');
    if (!wrapper) return;

    const slides = Array.from(wrapper.querySelectorAll('.swiper-slide'));
    const totalCount = slides.length;
    const hasSlider = totalCount > minRequired;

    const outerWrap = swiperEl.closest('.fleet-slider-outer');
    const prevBtn = outerWrap ? outerWrap.querySelector('.fleet-prev-btn') : null;
    const nextBtn = outerWrap ? outerWrap.querySelector('.fleet-next-btn') : null;
    const paginationEl = swiperEl.querySelector('.fleet-swiper-pagination');

    if (!hasSlider) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (paginationEl) paginationEl.style.display = 'none';
    } else {
      if (prevBtn) prevBtn.style.display = 'flex';
      if (nextBtn) nextBtn.style.display = 'flex';
      if (paginationEl) paginationEl.style.display = 'block';
    }

    fleetSwipers[panelKey] = new Swiper(swiperEl, {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 14,
      loop: false,
      grabCursor: hasSlider,
      speed: 550,
      autoplay: hasSlider ? {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      } : false,
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      pagination: {
        el: paginationEl,
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints: {
        576: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 14 },
        840: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 16 },
        1100: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 16 }
      }
    });

    updatePanelSliderControls(panelKey);
  });
}

window.addEventListener('resize', () => {
  if (typeof activeFleetTab !== 'undefined' && activeFleetTab) {
    updatePanelSliderControls(activeFleetTab);
  }
});

/* ============================
   URL PARAMETER SYNCHRONIZATION
   ============================ */
function initUrlCategorySync() {
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get('category');

  if (categoryParam) {
    const decodedCategory = decodeURIComponent(categoryParam).trim();
    let targetTab = 'all';

    if (decodedCategory.includes('ملاكي') || decodedCategory.toLowerCase() === 'malaki') {
      targetTab = 'malaki';
    } else if (decodedCategory.includes('نقل') || decodedCategory.toLowerCase() === 'naql') {
      targetTab = 'naql';
    } else if (decodedCategory.includes('ميكروباص') || decodedCategory.toLowerCase() === 'micro') {
      targetTab = 'micro';
    } else if (decodedCategory.includes('الكل') || decodedCategory.toLowerCase() === 'all') {
      targetTab = 'all';
    }

    switchTab(targetTab, false);
  }
}

function updateCategoryUrl(tabId) {
  if (!window.history || !window.history.pushState) return;

  const url = new URL(window.location.href);
  const categoryMap = {
    'malaki': 'ملاكي',
    'naql': 'نقل',
    'micro': 'ميكروباص',
    'all': 'الكل'
  };

  const catValue = categoryMap[tabId];
  if (catValue && catValue !== 'الكل') {
    url.searchParams.set('category', catValue);
  } else {
    url.searchParams.delete('category');
  }

  window.history.pushState({ path: url.href }, '', url.href);
}

window.addEventListener('popstate', () => {
  initUrlCategorySync();
});

function switchTab(tabId, updateUrl = true) {
  activeFleetTab = tabId;

  document.querySelectorAll('.fleet-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });

  const activeBtn = document.getElementById(`tab-${tabId}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-selected', 'true');
  }

  document.querySelectorAll('.car-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  const selectedPanel = document.getElementById(`panel-${tabId}`);
  if (selectedPanel) {
    selectedPanel.classList.add('active');
  }

  if (fleetSwipers[tabId]) {
    fleetSwipers[tabId].update();
    fleetSwipers[tabId].slideTo(0, 0);
  }

  updatePanelSliderControls(tabId);
  filterFleetCars();

  if (updateUrl) {
    updateCategoryUrl(tabId);
  }
}

function resetFleetSearch() {
  const input = document.getElementById('fleet-search-input');
  if (input) {
    input.value = '';
    filterFleetCars();
    input.focus();
  }
}

/* Real-time Fleet Search Filter */
function filterFleetCars() {
  const searchInput = document.getElementById('fleet-search-input');
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

  const activePanel = document.querySelector('.car-panel.active');
  if (!activePanel) return;

  const outerSlider = activePanel.querySelector('.fleet-slider-outer');
  const slides = activePanel.querySelectorAll('.swiper-slide');
  let matchCount = 0;

  slides.forEach(slide => {
    const carName = slide.querySelector('.car-card-title')?.textContent || '';
    const brand = slide.querySelector('.car-card')?.getAttribute('data-brand') || '';
    const category = slide.querySelector('.car-card')?.getAttribute('data-category') || '';
    const desc = slide.querySelector('.car-card-desc-snippet')?.textContent || '';

    const matches = !query ||
      carName.toLowerCase().includes(query) ||
      brand.toLowerCase().includes(query) ||
      category.toLowerCase().includes(query) ||
      desc.toLowerCase().includes(query);

    if (matches) {
      slide.style.display = '';
      matchCount++;
    } else {
      slide.style.display = 'none';
    }
  });

  // Handle Empty Search State
  let emptyStateEl = activePanel.querySelector('.fleet-empty-state');
  if (matchCount === 0 && query) {
    if (outerSlider) outerSlider.style.display = 'none';
    if (!emptyStateEl) {
      emptyStateEl = document.createElement('div');
      emptyStateEl.className = 'fleet-empty-state';
      emptyStateEl.innerHTML = `
        <div class="empty-icon-box">
          <i class="ph-bold ph-magnifying-glass-slash"></i>
        </div>
        <h3 class="empty-title">لم نجد سيارات تطابق بحثك</h3>
        <p class="empty-desc">
          تأكد من كتابة اسم الموديل أو الماركة بشكل صحيح، أو اضغط أدناه لعرض جميع السيارات المتاحة
        </p>
        <button type="button" class="btn btn-primary empty-reset-btn" onclick="resetFleetSearch()">
          <i class="ph-bold ph-arrow-counter-clockwise"></i>
          <span>إعادة عرض جميع السيارات</span>
        </button>
      `;
      activePanel.appendChild(emptyStateEl);
    } else {
      emptyStateEl.style.display = 'flex';
    }
  } else {
    if (outerSlider) outerSlider.style.display = '';
    if (emptyStateEl) emptyStateEl.style.display = 'none';
  }

  if (fleetSwipers[activeFleetTab]) {
    fleetSwipers[activeFleetTab].update();
    fleetSwipers[activeFleetTab].slideTo(0, 0);
  }

  updatePanelSliderControls(activeFleetTab);
}

/* ============================
   HERO FILTER SYSTEM
   ============================ */
function initHeroFilter() {
  const searchBtn = document.getElementById('hero-search-btn');
  if (!searchBtn) return;

  searchBtn.addEventListener('click', () => {
    const brand = document.getElementById('filter-brand')?.value || 'all';
    const category = document.getElementById('filter-category')?.value || 'all';

    if (category !== 'all') {
      switchTab(category);
    }

    if (brand !== 'all') {
      filterByBrand(brand, false);
    }

    const fleetSection = document.getElementById('fleet');
    if (fleetSection) {
      const navH = document.getElementById('navbar')?.offsetHeight || 80;
      const top = fleetSection.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
}

function filterByBrand(brandName, autoScroll = true) {
  document.querySelectorAll('.car-panel').forEach(panel => {
    panel.querySelectorAll('.car-card').forEach(card => {
      const cardBrand = card.getAttribute('data-brand') || '';
      if (cardBrand.toLowerCase().includes(brandName.toLowerCase())) {
        card.style.display = 'flex';
        card.classList.add('visible');
      } else {
        card.style.display = 'none';
      }
    });
  });

  if (autoScroll) {
    const fleetSection = document.getElementById('fleet');
    if (fleetSection) {
      const navH = document.getElementById('navbar')?.offsetHeight || 80;
      const top = fleetSection.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}

/* ============================
/* ============================
   INQUIRE CAR (Auto-Select & Scroll)
   ============================ */
function inquireCar(modelName) {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const navH = document.getElementById('navbar')?.offsetHeight || 80;
    const top = contactSection.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
    if (modelName) {
      const modelInput = document.getElementById('f-model');
      if (modelInput) {
        modelInput.value = modelName;
      }
      const detailsInput = document.getElementById('f-details') || document.getElementById('f-notes');
      if (detailsInput && !detailsInput.value) {
        detailsInput.value = `استفسار عن سيارة: ${modelName}`;
      }
    }
    setTimeout(() => {
      document.getElementById('f-name')?.focus();
    }, 450);
  } else {
    window.location.href = `cars.html#contact`;
  }
}

/* ============================
   WHATSAPP OPENER
   ============================ */
function openWhatsApp(model) {
  const msg = `مرحباً، أنا مهتم بـ ${model} — أرجو التواصل معي للاستفسار عن السعر والتفاصيل.`;
  const url = `https://wa.me/201273000048?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/* ============================
   CAR MODAL / DETAIL GALLERY
   ============================ */
let activeCarSlides = [];
let activeCarIndex = 0;
let activeCarName = '';

function initCarModal() {
  const modal = document.getElementById('car-modal');
  if (!modal) return;

  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', closeCarModal);
  });

  document.getElementById('car-modal-prev')?.addEventListener('click', () => {
    if (!activeCarSlides.length) return;
    activeCarIndex = (activeCarIndex - 1 + activeCarSlides.length) % activeCarSlides.length;
    renderCarSlide();
  });

  document.getElementById('car-modal-next')?.addEventListener('click', () => {
    if (!activeCarSlides.length) return;
    activeCarIndex = (activeCarIndex + 1) % activeCarSlides.length;
    renderCarSlide();
  });

  document.getElementById('car-modal-whatsapp')?.addEventListener('click', () => {
    if (activeCarName) openWhatsApp(activeCarName);
  });
}

function openCarModal(carIdentifier) {
  const modal = document.getElementById('car-modal');
  if (!modal) return;

  const car = fetchedCarsList.find(c => c._id === carIdentifier || c.name === carIdentifier) ||
    FALLBACK_CARS.find(c => c._id === carIdentifier || c.name === carIdentifier) ||
    FALLBACK_CARS[0];

  activeCarName = car.name;
  activeCarSlides = Array.isArray(car.images) && car.images.length > 0 ? car.images : ['images/logo/logo.png'];
  activeCarIndex = 0;

  const title = document.getElementById('car-modal-title');
  const brand = document.getElementById('car-modal-brand');
  const description = document.getElementById('car-modal-description');
  const pills = document.getElementById('car-modal-pills');
  const specs = document.getElementById('car-modal-specs');

  title.textContent = car.name;
  brand.textContent = getCarBrand(car.name);
  description.textContent = car.description || 'تواصل معنا للاستفسار عن السيارة وشروط السداد المتاحة.';

  pills.innerHTML = `
    <span>${car.category || 'السيارة'}</span>
    <span>السرعة: ${car.speed || 'وسط'}</span>
    <span>كاش / تقسيط</span>
  `;

  specs.innerHTML = `
    <div class="spec-item">
      <span class="spec-label">موديل السيارة</span>
      <span class="spec-value">${car.name}</span>
    </div>
    <div class="spec-item">
      <span class="spec-label">الفئة</span>
      <span class="spec-value">${car.category || 'ملاكي'}</span>
    </div>
    <div class="spec-item">
      <span class="spec-label">السرعة / الأداء</span>
      <span class="spec-value">${car.speed || 'وسط'}</span>
    </div>
    <div class="spec-item">
      <span class="spec-label">معرض الصور</span>
      <span class="spec-value">${activeCarSlides.length} صور متوفرة</span>
    </div>
  `;

  renderCarSlide();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function renderCarSlide() {
  const main = document.getElementById('car-modal-main-image');
  const thumbs = document.getElementById('car-modal-thumbs');
  if (!main || !thumbs) return;

  if (!activeCarSlides.length) return;

  main.src = activeCarSlides[activeCarIndex];
  main.alt = `${activeCarName} - صورة ${activeCarIndex + 1}`;

  thumbs.innerHTML = activeCarSlides.map((src, idx) => `
    <button type="button" class="car-modal-thumb ${idx === activeCarIndex ? 'active' : ''}" data-index="${idx}" aria-label="عرض الصورة ${idx + 1}">
      <img src="${src}" alt="${activeCarName} ${idx + 1}" />
    </button>
  `).join('');

  thumbs.querySelectorAll('.car-modal-thumb').forEach(button => {
    button.addEventListener('click', () => {
      activeCarIndex = Number(button.dataset.index || 0);
      renderCarSlide();
    });
  });

  const activeThumb = thumbs.querySelector('.car-modal-thumb.active');
  if (activeThumb) {
    activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

function closeCarModal() {
  const modal = document.getElementById('car-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ============================
   TOAST NOTIFICATION SYSTEM
   ============================ */
function showToast(message, type = 'info', title = '', actionUrl = null, actionText = '') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconClass = 'ph-fill ph-info';
  let defaultTitle = 'تنبيه';
  if (type === 'success') {
    iconClass = 'ph-fill ph-check-circle';
    defaultTitle = 'تم بنجاح!';
  } else if (type === 'error') {
    iconClass = 'ph-fill ph-warning-circle';
    defaultTitle = 'تنبيه';
  }

  const toastTitle = title || defaultTitle;
  let actionHTML = '';
  if (actionUrl && actionText) {
    actionHTML = `
      <a href="${actionUrl}" target="_blank" rel="noopener noreferrer" class="toast-action-btn">
        <i class="ph-bold ph-whatsapp-logo"></i> ${actionText}
      </a>
    `;
  }

  toast.innerHTML = `
    <div class="toast-icon"><i class="${iconClass}"></i></div>
    <div class="toast-content">
      <div class="toast-title">${toastTitle}</div>
      <div class="toast-msg">${message}</div>
      ${actionHTML}
    </div>
    <button class="toast-close" aria-label="إغلاق"><i class="ph-bold ph-x"></i></button>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  const dismiss = () => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 350);
  };

  toast.querySelector('.toast-close')?.addEventListener('click', dismiss);
  setTimeout(dismiss, actionUrl ? 9000 : 5000);
}

/* ============================
   LEAD FORM SUBMISSION & API INTEGRATION
   ============================ */
function initLeadForm() {
  const form = document.getElementById('lead-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name = document.getElementById('f-name')?.value.trim() || '';
    const phone = document.getElementById('f-phone')?.value.trim() || '';
    const category = document.getElementById('f-category')?.value || '';
    const model = document.getElementById('f-model')?.value.trim() || '';
    const payment = form.querySelector('input[name="payment"]:checked')?.value || '';
    const details = document.getElementById('f-details')?.value.trim() || document.getElementById('f-notes')?.value.trim() || '';

    if (!name) {
      shakeField('f-name');
      showToast('يرجى كتابة الاسم', 'error', 'حقل مطلوب');
      return showFieldError('f-name', 'الاسم مطلوب');
    }
    if (!phone || phone.length < 8) {
      shakeField('f-phone');
      showToast('يرجى كتابة رقم هاتف صحيح', 'error', 'رقم غير صحيح');
      return showFieldError('f-phone', 'رقم الهاتف غير صحيح');
    }
    if (!category) {
      shakeField('f-category');
      showToast('يرجى اختيار الفئة المهتم بها', 'error', 'اختر الفئة');
      return showFieldError('f-category', 'اختر الفئة');
    }
    if (!payment) {
      return showToast(
        'من فضلك اختر نظام الشراء (كاش أم تقسيط)',
        'error',
        'نظام الشراء'
      );
    }

    const submitBtn = document.getElementById('form-submit-btn');
    const submitBtnSpan = submitBtn ? submitBtn.querySelector('span') : null;
    const originalBtnText = submitBtnSpan ? submitBtnSpan.textContent : 'ارسال';

    if (submitBtn) {
      submitBtn.disabled = true;
      if (submitBtnSpan) submitBtnSpan.textContent = 'جاري الإرسال...';
    }

    const isCash = (payment === 'كاش' || payment === 'cash');

    const categoryMap = {
      'ملاكي': 'Passenger Cars',
      'نقل': 'Transport',
      'ميكروباص': 'Microbus',
      'غير محدد': 'Not Specified'
    };
    const finalCategory = categoryMap[category] || category || 'Passenger Cars';

    const payload = {
      name: name,
      phone: phone,
      category: finalCategory,
      model: model || 'غير محدد',
      cash: isCash,
      details: details || (isCash ? 'Interested in cash purchase' : 'Interested in installment')
    };

    // Helper to attempt multiple fetch strategies (handles file:// CORS preflight restrictions)
    const result = await (async function sendLeadData(dataObj) {
      const jsonStr = JSON.stringify(dataObj);
      const url = API_LEADS_URL;

      // Strategy 1: Standard application/json
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: jsonStr
        });
        if (res.ok) {
          const resData = await res.json().catch(() => ({ success: true }));
          return { ok: true, data: resData };
        }
      } catch (err1) {
        console.warn('Strategy 1 (application/json) failed, trying preflight-bypass header:', err1);
      }

      // Strategy 2: text/plain (bypasses CORS preflight OPTIONS check on file:// origin)
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: jsonStr
        });
        if (res.ok) {
          const resData = await res.json().catch(() => ({ success: true }));
          return { ok: true, data: resData };
        }
      } catch (err2) {
        console.warn('Strategy 2 (text/plain) failed:', err2);
      }

      // Strategy 3: x-www-form-urlencoded
      try {
        const params = new URLSearchParams();
        for (const k in dataObj) { params.append(k, dataObj[k]); }
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString()
        });
        if (res.ok) {
          const resData = await res.json().catch(() => ({ success: true }));
          return { ok: true, data: resData };
        }
      } catch (err3) {
        console.warn('Strategy 3 (form-urlencoded) failed:', err3);
      }

      return { ok: false };
    })(payload);

    try {
      if (result.ok && result.data) {
        showToast(
          'تم إرسال استفسارك بنجاح وسنتواصل معك قريباً!',
          'success',
          'تم الإرسال بنجاح'
        );
        showFormSuccess();
      } else {
        throw new Error('All connection strategies failed');
      }
    } catch (error) {
      console.warn('API Lead submission error:', error);

      const waMsg = `🚗 *استفسار جديد — الوكيل لتجارة السيارات*\nالاسم: ${name}\nالهاتف: ${phone}\nالفئة: ${category}\nالموديل: ${model || 'غير محدد'}\nنوع الشراء: ${isCash ? 'كاش' : 'تقسيط'}\nملاحظات: ${details || 'لا يوجد'}`;

      const waUrl = `https://wa.me/201273000048?text=${encodeURIComponent(waMsg)}`;

      showToast(
        'تعذر الاتصال المباشر بالسيرفر من الملف المحلي. يمكنك الإرسال بنقرة واحدة عبر الواتساب:',
        'error',
        'تنبيه الاتصال',
        waUrl,
        'إرسال عبر الواتساب الآن'
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        if (submitBtnSpan) submitBtnSpan.textContent = originalBtnText;
      }
    }
  });
}

function shakeField(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => el.style.animation = '', 500);
}

function showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = '#e31b23';
  el.focus();
  el.addEventListener('input', () => {
    el.style.borderColor = '';
  }, { once: true });
}

function showFormSuccess() {
  const form = document.getElementById('lead-form');
  const success = document.getElementById('form-success');
  if (!form || !success) return;
  form.style.display = 'none';
  success.style.display = 'block';
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ============================
   SHAKE ANIMATION (inline inject)
   ============================ */
(function injectShake() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-8px); }
      40%       { transform: translateX(8px); }
      60%       { transform: translateX(-6px); }
      80%       { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(style);
})();

/* ============================
   KEYBOARD ACCESSIBILITY
   ============================ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeMobile();
    closeCarModal();
  }
});

/* ============================
   SMART EMAIL HANDLER
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
  const emailBtn = document.getElementById('contact-email');
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        e.preventDefault();
        window.location.href = 'mailto:elwakeel.motors@gmail.com';
      }
    });
  }
});