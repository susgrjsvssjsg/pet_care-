"use client";

import { useEffect, useState } from "react";

const address = "北京市通州区府东苑13号楼11门";
const mapHref =
  "https://uri.amap.com/search?keyword=%E5%8C%97%E4%BA%AC%E5%B8%82%E9%80%9A%E5%B7%9E%E5%8C%BA%E5%BA%9C%E4%B8%9C%E8%8B%9113%E5%8F%B7%E6%A5%BC11%E9%97%A8";

const routeMessages = {
  步行: "已为你标出门店，可从府东苑小区入口步行前往。",
  骑行: "骑行时建议先定位到府东苑13号楼，再按门牌找到11门。",
  打车: "打车可直接输入“梦佳宠物”。"
};

const slides = [
  {
    src: "/assets/interior/interior-01-bath.png",
    alt: "梦佳宠物店内洗护区，小型犬在现代洗护池中接受温和清洁",
    title: "温和沐浴区"
  },
  {
    src: "/assets/interior/interior-02-dry.png",
    alt: "梦佳宠物吹干护理区，护理师为蓬松狗狗吹干梳毛",
    title: "低噪吹干护理"
  },
  {
    src: "/assets/interior/interior-03-trim.png",
    alt: "梦佳宠物造型修剪区，护理师在美容台上为狗狗修剪造型",
    title: "精致造型修剪"
  },
  {
    src: "/assets/interior/interior-04-cat.png",
    alt: "梦佳宠物猫咪护理角，护理师为长毛猫轻柔梳毛",
    title: "猫咪安静护理"
  },
  {
    src: "/assets/interior/interior-05-brush.png",
    alt: "梦佳宠物深层梳毛区，护理师为中型犬做浮毛梳理",
    title: "深层梳毛护理"
  },
  {
    src: "/assets/interior/interior-06-reception.png",
    alt: "梦佳宠物接待区，主人带宠物到店咨询，后方可见洗护空间",
    title: "接待与等候区"
  }
];

const reviews = [
  {
    quote: "第一次带豆包来洗护，护理师先耐心问了皮肤情况和生活习惯。洗完毛发特别蓬松，脚底和指甲也处理得很细致。",
    name: "豆包妈妈",
    pet: "比熊 · 精致洗护",
    avatar: "豆"
  },
  {
    quote: "我家猫胆子很小，之前洗澡会一直紧张。这次特意安排了安静时段，整个过程节奏很慢，回家后状态也很放松。",
    name: "糯米家长",
    pet: "布偶猫 · 温和洗护",
    avatar: "糯"
  },
  {
    quote: "修剪前会先沟通想要的长度，还结合团子的毛量调整了脸型。造型清爽又好打理，家里人都说像换了一只小狗。",
    name: "团子爸爸",
    pet: "泰迪 · 造型修剪",
    avatar: "团"
  },
  {
    quote: "店里明亮干净，工具和洗护台都收拾得很整齐。护理中还会同步毛孩子的情况，第一次来就觉得很安心。",
    name: "可乐妈妈",
    pet: "柯基 · 基础护理",
    avatar: "可"
  },
  {
    quote: "金毛换毛期掉毛特别厉害，做完深层梳毛后清爽了很多。护理师还教了日常梳毛方法，专业又实用。",
    name: "七喜家长",
    pet: "金毛 · 深层梳毛",
    avatar: "喜"
  },
  {
    quote: "预约回复很快，到店基本不用等。洗护后耳朵、眼周这些小细节都处理得很干净，已经连续来过三次了。",
    name: "小满妈妈",
    pet: "雪纳瑞 · 洗护修剪",
    avatar: "满"
  }
];

function formatVisitTime(value) {
  if (!value) return "稍后";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function MapIllustration() {
  return (
    <svg viewBox="0 0 760 620" role="img" aria-labelledby="map-title map-desc">
      <title id="map-title">梦佳宠物导航地图</title>
      <desc id="map-desc">
        地图标注北京市通州区府东苑13号楼11门，周边包含东石公园、新城商厦和次渠嘉园。
      </desc>
      <rect className="map-bg" x="0" y="0" width="760" height="620" rx="36" />
      <path className="park park-one" d="M64 24h244l36 128-86 84-156-26-74-88z" />
      <path className="park park-two" d="M470 40h220l42 160-68 94-210-34-48-116z" />
      <path className="park park-three" d="M482 378h202l46 96-82 92-188-12-64-84z" />
      <path className="water" d="M145 0c18 96-12 138 2 212 15 82 68 126 44 212-20 74-86 96-64 196" />
      <path className="road road-main" d="M18 172c122 42 224 58 346 32 114-24 218-20 378 16" />
      <path className="road road-main" d="M42 510c112-118 228-182 356-246 102-50 206-110 318-218" />
      <path className="road road-mid" d="M92 332h198c94 0 138 48 220 54l204 16" />
      <path className="road road-mid" d="M330 24l-16 160 26 146-26 224" />
      <path className="road road-mid" d="M520 0l48 120-34 160 70 302" />
      <path className="road road-small" d="M106 434l164-2 74-98 136-2 134-94" />
      <path className="road road-small" d="M180 98l98 82 86 90 164 22" />
      <path className="road road-small" d="M60 252l124 80 80 148 66 102" />
      <path className="route" d="M122 458c88-78 160-110 236-126 50-10 82-34 128-80" />

      <g className="landmark landmark-park" transform="translate(132 102)">
        <circle r="28" />
        <text x="42" y="8">东石公园</text>
      </g>
      <g className="landmark landmark-mall" transform="translate(96 414)">
        <rect x="-24" y="-24" width="48" height="48" rx="14" />
        <text x="40" y="8">新城商厦</text>
      </g>
      <g className="landmark landmark-home" transform="translate(548 430)">
        <circle r="25" />
        <text x="40" y="8">次渠嘉园</text>
      </g>

      <g className="shop-marker" transform="translate(392 284)">
        <path d="M0-88c58 0 96 40 96 92 0 66-96 142-96 142S-96 70-96 4c0-52 38-92 96-92z" />
        <circle className="marker-core" cx="0" cy="-8" r="42" />
        <text x="0" y="8">M</text>
      </g>

      <g className="label-card shop-label" transform="translate(272 378)">
        <rect width="250" height="82" rx="18" />
        <text x="22" y="35">梦佳宠物</text>
        <text className="label-small" x="22" y="62">府东苑13号楼11门</text>
      </g>
      <g className="label-card route-label" transform="translate(84 478)">
        <rect width="152" height="54" rx="18" />
        <text x="20" y="34">到这去</text>
      </g>

      <path className="doodle doodle-one" d="M626 92l22 20-24 18 24 18-24 18" />
      <path className="doodle doodle-two" d="M72 270c24-30 54 30 78 0s54 30 78 0" />
      <circle className="confetti confetti-a" cx="642" cy="330" r="12" />
      <circle className="confetti confetti-b" cx="242" cy="70" r="10" />
      <rect className="confetti confetti-c" x="614" y="520" width="28" height="28" rx="6" />
      <path className="confetti confetti-d" d="M64 82l28-18 8 34z" />
    </svg>
  );
}

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [copyNote, setCopyNote] = useState("");
  const [routeMode, setRouteMode] = useState("步行");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [isReviewPaused, setIsReviewPaused] = useState(false);
  const [formNote, setFormNote] = useState("");

  useEffect(() => {
    document.body.classList.toggle("nav-open", navOpen);
    return () => document.body.classList.remove("nav-open");
  }, [navOpen]);

  useEffect(() => {
    if (isCarouselPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [isCarouselPaused]);

  useEffect(() => {
    if (isReviewPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [isReviewPaused]);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address);
      setCopyNote("地址已复制，可以粘贴到地图 App 搜索。");
    } catch {
      setCopyNote(address);
    }
  }

  function submitBooking(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const pet = formData.get("pet");
    const service = formData.get("service");
    const contactName = formData.get("contactName");
    const phone = formData.get("phone");
    const visitTime = formatVisitTime(formData.get("visitTime"));

    setFormNote(`${contactName}，${pet}的「${service}」需求已记录，期望${visitTime}到店，我们会联系 ${phone} 确认。`);
    event.currentTarget.reset();
  }

  function closeNav() {
    setNavOpen(false);
  }

  function changeSlide(nextIndex) {
    setActiveSlide((nextIndex + slides.length) % slides.length);
  }

  return (
    <>
      <header className="site-header" data-header>
        <a className="brand" href="#top" aria-label="梦佳宠物首页" onClick={closeNav}>
          <span className="brand-mark" aria-hidden="true">M</span>
          <span>
            <strong>梦佳宠物</strong>
            <small>Pet Grooming & Care</small>
          </span>
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-label={navOpen ? "关闭导航" : "打开导航"}
          aria-expanded={navOpen}
          onClick={() => setNavOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <nav className={`site-nav ${navOpen ? "is-open" : ""}`} data-nav>
          <a href="#map" onClick={closeNav}>导航地图</a>
          <a href="#interior" onClick={closeNav}>店内实景</a>
          <a href="#services" onClick={closeNav}>洗护服务</a>
          <a href="#reviews" onClick={closeNav}>客户评价</a>
          <a href="#visit" onClick={closeNav}>到店信息</a>
          <a className="nav-cta" href="#booking" onClick={closeNav}>预约咨询</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="memphis-shape shape-dot" aria-hidden="true" />
          <div className="memphis-shape shape-zigzag" aria-hidden="true" />
          <div className="memphis-shape shape-pill" aria-hidden="true" />

          <div className="hero-copy">
            <p className="eyebrow">Neo Memphis Navigation</p>
            <h1 id="hero-title">梦佳宠物</h1>
            <p className="hero-text">营业时间09:00-20:30，建议提前预约到店。</p>
            <div className="hero-actions">
              <a className="button primary" href={mapHref} target="_blank" rel="noreferrer">
                打开地图导航
              </a>
              <button className="button secondary" type="button" onClick={copyAddress}>
                复制地址
              </button>
            </div>
            <p className="copy-note" aria-live="polite">{copyNote}</p>

            <section className="booking hero-booking" id="booking" aria-labelledby="booking-title">
              <div className="section-heading">
                <p className="eyebrow">Book Now</p>
                <h2 id="booking-title">预约前先留个联系方式</h2>
              </div>
              <form className="booking-form" onSubmit={submitBooking}>
                <label>
                  <span>宠物类型</span>
                  <select name="pet" required defaultValue="">
                    <option value="">请选择</option>
                    <option>狗狗</option>
                    <option>猫咪</option>
                    <option>多只宠物</option>
                  </select>
                </label>
                <label>
                  <span>服务需求</span>
                  <select name="service" required defaultValue="">
                    <option value="">请选择</option>
                    <option>洗澡护理</option>
                    <option>洗护加修剪</option>
                    <option>猫咪洗护</option>
                    <option>到店咨询</option>
                  </select>
                </label>
                <label>
                  <span>期望到店时间</span>
                  <input name="visitTime" type="datetime-local" required />
                </label>
                <label>
                  <span>联系人姓名/称呼</span>
                  <input name="contactName" type="text" placeholder="例如：王女士" required />
                </label>
                <label>
                  <span>联系电话</span>
                  <input name="phone" type="tel" placeholder="请输入手机号" required />
                </label>
                <button className="button primary" type="submit">提交预约</button>
              </form>
              <p className="form-note" aria-live="polite">{formNote}</p>
            </section>

            <dl className="store-facts" aria-label="门店信息">
              <div>
                <dt>营业</dt>
                <dd>09:00-20:30</dd>
              </div>
              <div>
                <dt>服务</dt>
                <dd>洗护 · 修剪</dd>
              </div>
              <div>
                <dt>适合</dt>
                <dd>猫咪 · 小中型犬</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section interior" id="interior" aria-labelledby="interior-title">
          <div className="section-heading">
            <p className="eyebrow">Interior Gallery</p>
            <h2 id="interior-title">店内实景</h2>
            <p>统一的洗护空间、独立设备和明亮动线，让猫狗护理更安心。</p>
          </div>

          <div
            className="carousel"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <div className="carousel-viewport">
              {slides.map((slide, index) => (
                <figure
                  className={`carousel-slide ${activeSlide === index ? "is-active" : ""}`}
                  key={slide.src}
                >
                  <img src={slide.src} alt={slide.alt} />
                  <figcaption>{slide.title}</figcaption>
                </figure>
              ))}
            </div>

            <div className="carousel-controls">
              <button type="button" aria-label="上一张店内实景图" onClick={() => changeSlide(activeSlide - 1)}>
                ‹
              </button>
              <div className="carousel-dots" aria-label="店内实景图切换">
                {slides.map((slide, index) => (
                  <button
                    className={activeSlide === index ? "is-active" : ""}
                    type="button"
                    aria-label={`查看第${index + 1}张`}
                    key={slide.src}
                    onClick={() => changeSlide(index)}
                  />
                ))}
              </div>
              <button type="button" aria-label="下一张店内实景图" onClick={() => changeSlide(activeSlide + 1)}>
                ›
              </button>
            </div>
          </div>
        </section>

        <section className="section services" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">Grooming Menu</p>
            <h2 id="services-title">洗澡、修剪、护理，轻松安排</h2>
          </div>

          <div className="service-grid">
            <article className="service-card yellow">
              <span>01</span>
              <h3>狗狗精致洗护</h3>
              <p>沐浴、吹干、梳毛、指甲和脚底毛护理，一次清爽到位。</p>
            </article>
            <article className="service-card blue">
              <span>02</span>
              <h3>猫咪温和洗护</h3>
              <p>低噪慢节奏操作，减少陌生环境刺激，更适合胆小猫。</p>
            </article>
            <article className="service-card pink">
              <span>03</span>
              <h3>造型修剪</h3>
              <p>按毛量、季节和日常打理习惯设计清爽好看的造型。</p>
            </article>
          </div>
        </section>

        <section className="section reviews" id="reviews" aria-labelledby="reviews-title">
          <div className="reviews-heading">
            <div className="section-heading">
              <p className="eyebrow">Happy Customers</p>
              <h2 id="reviews-title">毛孩子开心，家长更放心</h2>
              <p>每一次认真反馈，都是我们把洗护细节做得更好的动力。</p>
            </div>
            <div className="review-score" aria-label="客户综合评分5分">
              <strong>5.0</strong>
              <span aria-hidden="true">★★★★★</span>
              <small>客户体验分享</small>
            </div>
          </div>

          <div
            className="review-carousel"
            onMouseEnter={() => setIsReviewPaused(true)}
            onMouseLeave={() => setIsReviewPaused(false)}
            onFocus={() => setIsReviewPaused(true)}
            onBlur={() => setIsReviewPaused(false)}
            aria-roledescription="轮播"
            aria-label="客户评价"
          >
            <div className="review-viewport">
              <div className="review-track" style={{ transform: `translateX(-${activeReview * 100}%)` }}>
                {reviews.map((review, index) => (
                  <article className="review-card" key={review.name} aria-hidden={activeReview !== index}>
                    <span className="review-quote" aria-hidden="true">“</span>
                    <div>
                      <div className="review-stars" aria-label="5星评价">★★★★★</div>
                      <blockquote>{review.quote}</blockquote>
                      <div className="review-author">
                        <span className="review-avatar" aria-hidden="true">{review.avatar}</span>
                        <p><strong>{review.name}</strong><small>{review.pet}</small></p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="review-controls">
              <button type="button" aria-label="上一条评价" onClick={() => setActiveReview((activeReview - 1 + reviews.length) % reviews.length)}>‹</button>
              <div className="review-dots" aria-label="选择客户评价">
                {reviews.map((review, index) => (
                  <button
                    className={activeReview === index ? "is-active" : ""}
                    type="button"
                    aria-label={`查看第${index + 1}条评价`}
                    aria-current={activeReview === index ? "true" : undefined}
                    key={review.name}
                    onClick={() => setActiveReview(index)}
                  />
                ))}
              </div>
              <button type="button" aria-label="下一条评价" onClick={() => setActiveReview((activeReview + 1) % reviews.length)}>›</button>
            </div>
          </div>
        </section>

        <section className="section visit" id="visit" aria-labelledby="visit-title">
          <div className="visit-panel">
            <div>
              <p className="eyebrow">Store Info</p>
              <h2 id="visit-title">到店信息</h2>
              <p>门店名：梦佳宠物</p>
              <p>营业时间：09:00-20:30</p>
              <p>导航：查看页面末尾地图绿色门店标记</p>
            </div>
            <div className="visit-badges" aria-label="门店亮点">
              <span>独立洗护台</span>
              <span>工具消毒</span>
              <span>猫狗分时段</span>
              <span>附近可停车</span>
            </div>
          </div>
        </section>

        <section className="section map-section" id="map" aria-labelledby="map-section-title">
          <div className="section-heading">
            <p className="eyebrow">Navigation Map</p>
            <h2 id="map-section-title">导航地图</h2>
          </div>

          <div className="map-card" aria-label="梦佳宠物附近的新孟菲斯风格导航地图">
            <div className="map-toolbar">
              <span>附近导航</span>
              <strong>绿色标记为门店</strong>
            </div>

            <div className="neo-map">
              <MapIllustration />
            </div>

            <div className="map-tabs" aria-label="导航方式">
              {Object.keys(routeMessages).map((mode) => (
                <button
                  className={routeMode === mode ? "is-active" : ""}
                  type="button"
                  key={mode}
                  onClick={() => setRouteMode(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
            <p className="route-note">{routeMessages[routeMode]}</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 梦佳宠物 · 温柔洗护，漂亮回家</p>
      </footer>
    </>
  );
}
