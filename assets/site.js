(function () {
  var links = document.querySelectorAll(".main-nav a");
  var page = window.location.pathname.split("/").pop() || "index.html";
  links.forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });

  var carousel = document.querySelector("[data-carousel]");
  if (!carousel) {
    return;
  }

  var slides = Array.prototype.slice.call(carousel.querySelectorAll(".slide"));
  var dots = Array.prototype.slice.call(carousel.querySelectorAll(".carousel-dots button"));
  var previous = carousel.querySelector("[data-carousel-prev]");
  var next = carousel.querySelector("[data-carousel-next]");
  var index = 0;
  var timer;

  function setSlide(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach(function (slide, slideIndex) {
      slide.classList.toggle("is-active", slideIndex === index);
      slide.setAttribute("aria-hidden", slideIndex === index ? "false" : "true");
    });
    dots.forEach(function (dot, dotIndex) {
      dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
    });
  }

  function restart() {
    window.clearInterval(timer);
    timer = window.setInterval(function () {
      setSlide(index + 1);
    }, 5600);
  }

  if (previous) {
    previous.addEventListener("click", function () {
      setSlide(index - 1);
      restart();
    });
  }

  if (next) {
    next.addEventListener("click", function () {
      setSlide(index + 1);
      restart();
    });
  }

  dots.forEach(function (dot, dotIndex) {
    dot.addEventListener("click", function () {
      setSlide(dotIndex);
      restart();
    });
  });

  setSlide(0);
  restart();
})();
