// import Swiper JS
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/swiper";

const swiper = new Swiper(".carouselOne", {
  modules: [Navigation],
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
