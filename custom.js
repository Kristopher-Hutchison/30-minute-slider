import Slider from "./slider";

const slider = new Slider({
  wrapperClass: "slider-wrap",
  slideClass: "slide",
  speed: 4000,
  auto: true,
  next: "&rtrif;",
  prev: "&ltrif;",
});
slider.init();
