class Slider {
  constructor(config) {
    this.config = config;
  }
  mergeSettings() {
    // deep merge possible
    const defaults = {
      wrapperClass: "slider",
      slideClass: "slide",
      innerClass: "slider",
      speed: 8000,
      auto: false,
      next: "next",
      prev: "prev",
    };
    const userSettings = this.config;
    this.sliderSettings = { ...defaults, ...userSettings };
  }
  handleArrowClick(event) {
    const el = event.target;
    const slides = document.querySelectorAll(".slide");
    const slideCount = slides.length - 1;
    if (el.classList.contains("next")) {
      slides.forEach((elem, idx) => {
        if (parseInt(elem.dataset.slideNum) === slideCount) {
          elem.style.order = 1;
          elem.dataset.slideNum = 0;
        } else {
          elem.style.order = parseInt(elem.dataset.slideNum) + 2;
          elem.dataset.slideNum = parseInt(elem.dataset.slideNum) + 1;
        }
      });
    }
    if (el.classList.contains("prev")) {
      slides.forEach((elem, idx) => {
        if (parseInt(elem.dataset.slideNum) === 0) {
          elem.style.order = slideCount + 1;
          elem.dataset.slideNum = slideCount;
        } else {
          elem.style.order = parseInt(elem.dataset.slideNum);
          elem.dataset.slideNum = parseInt(elem.dataset.slideNum) - 1;
        }
      });
    }
  }
  renderNav() {
    // insert and modify DOM elements here
    const nav = `<div class="slider-nav">
                        <div class="nav prev">${this.sliderSettings.prev}</div>
                        <div class="nav next">${this.sliderSettings.next}</div>
                    </div>`;
    const container = document.querySelector(
      `.${this.sliderSettings.wrapperClass}`
    );
    container.insertAdjacentHTML("beforeend", nav);
    document
      .querySelector(".prev")
      .addEventListener("click", this.handleArrowClick);
    document
      .querySelector(".next")
      .addEventListener("click", this.handleArrowClick);
  }
  renderSlides() {
    const slides = document.querySelectorAll(
      `.${this.sliderSettings.slideClass}`
    );

    slides.forEach((el, idx) => {
      el.setAttribute("data-slide-num", idx);
      el.style.transform = "translateX(-100%)";
      el.style.order = parseInt(el.dataset.slideNum) + 1;
    });
  }
  handleTimedSlide() {
    if (this.sliderSettings.auto) {
      setInterval(() => {
        const slides = document.querySelectorAll(".slide");
        const slideCount = slides.length - 1;
        slides.forEach((elem, idx) => {
          if (parseInt(elem.dataset.slideNum) === slideCount) {
            elem.style.order = 1;
            elem.dataset.slideNum = 0;
          } else {
            elem.style.order = parseInt(elem.dataset.slideNum) + 2;
            elem.dataset.slideNum = parseInt(elem.dataset.slideNum) + 1;
          }
        });
      }, this.sliderSettings.speed);
    }
  }
  getConfig() {
    return this.sliderSettings;
  }
  init() {
    this.mergeSettings();
    this.renderNav();
    this.renderSlides();
    this.handleTimedSlide();
  }
}

export default Slider;
