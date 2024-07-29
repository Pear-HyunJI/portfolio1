$(document).ready(function () {
  console.log("Document is ready");

  const typingTexts = [
    "최고의 사용자 경험을 추구합니다",
    "웹 성능 최적화를 중요시합니다",
    "새로운 기술을 탐구하는 것을 좋아합니다",
    "사용자 중심의 디자인을 추구합니다",
    "코드를 통해 문제를 해결합니다",
    "팀과의 협업을 소중히 여깁니다",
  ];

  let typingIndex = 0;
  let textIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = typingTexts[textIndex];
    let displayText = currentText.slice(0, typingIndex);
    $(".typing-effect").text(displayText);

    if (!isDeleting && typingIndex < currentText.length) {
      typingIndex++;
      setTimeout(type, 150);
    } else if (isDeleting && typingIndex > 0) {
      typingIndex--;
      setTimeout(type, 100);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        textIndex = (textIndex + 1) % typingTexts.length;
      }
      setTimeout(type, 1500);
    }
    console.log($(window).scrollTop());
    // 스타트 섹션이 지나면 네비게이션 변경
    if (
      $(window).scrollTop() + $(window).height() >
      $("#profile").offset().top
    ) {
      $("#menu").fadeIn();
      $("#menu2").fadeOut();
    } else {
      $("#menu").fadeOut();
      $("#menu2").fadeIn();
    }
  }

  type();

  $(".project-card").on("click", function (e) {
    e.stopPropagation();
    const cardInner = $(this).find(".card-inner");
    cardInner.toggleClass("flipped");

    if (cardInner.hasClass("flipped")) {
      cardInner.css("transform", "rotateY(180deg)");
      setTimeout(() => {
        $("#modal").css("display", "block");
      }, 600); // 카드가 플립된 후 모달 표시
    } else {
      cardInner.css("transform", "rotateY(0deg)");
    }
  });

  $(".open-modal").on("click", function (e) {
    e.stopPropagation();
    $("#modal").css("display", "block");
  });

  $(".close").on("click", function () {
    $("#modal").css("display", "none");
    $("#photo-modal").css("display", "none");
    // 모달을 닫을 때 카드를 원상태로 돌림
    $(".card-inner.flipped")
      .css("transform", "rotateY(0deg)")
      .removeClass("flipped");
  });

  let currentSlideIndex = 0;
  const slides = [];

  $(".slide").each(function (index) {
    const src = $(this).attr("src");
    slides.push(src);
    $(this).on("click", function (e) {
      e.stopPropagation();
      currentSlideIndex = index;
      $("#modal-img").attr("src", src);
      $("#photo-modal").css("display", "block");
    });
  });

  $(".thumbnail").on("click", function (e) {
    e.stopPropagation(); // 이벤트 전파 중단
    const $thumbnail = $(this);
    const index = $thumbnail.index();
    $(".slide").removeClass("active");
    $(".slide").eq(index).addClass("active");
    $(".thumbnail").removeClass("active");
    $thumbnail.addClass("active");
  });

  window.changeSlide = function (n) {
    currentSlideIndex = (currentSlideIndex + n + slides.length) % slides.length;
    $("#modal-img").attr("src", slides[currentSlideIndex]);
  };

  // Custom cursor logic
  $("html").append(
    '<div class="custom-cursor-outer"></div><div class="custom-cursor-inner"></div>'
  );
  const cursorOuter = document.querySelector(".custom-cursor-outer");
  const cursorInner = document.querySelector(".custom-cursor-inner");
  let mouseX = 0,
    mouseY = 0,
    cursorX = 0,
    cursorY = 0;

  function updateCursor(e) {
    mouseX = e.clientX + window.scrollX;
    mouseY = e.clientY + window.scrollY;
    cursorInner.style.left = `${mouseX}px`;
    cursorInner.style.top = `${mouseY}px`;
  }

  document.addEventListener("mousemove", updateCursor);
  document.addEventListener("scroll", () => {
    cursorOuter.style.top = `${window.scrollY}px`;
    cursorInner.style.top = `${window.scrollY}px`;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursorOuter.style.left = `${cursorX}px`;
    cursorOuter.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.addEventListener("mousedown", () => {
    cursorOuter.style.transform = "scale(0.8)";
    cursorInner.style.transform = "scale(0.8)";
  });

  document.addEventListener("mouseup", () => {
    cursorOuter.style.transform = "scale(1)";
    cursorInner.style.transform = "scale(1)";
  });

  $("a, button").hover(
    function () {
      cursorOuter.style.transform = "scale(1.5)";
      cursorInner.style.transform = "scale(0.5)";
    },
    function () {
      cursorOuter.style.transform = "scale(1)";
      cursorInner.style.transform = "scale(1)";
    }
  );

  $("#projects .timeline").on("wheel", function (e) {
    if (e.originalEvent.deltaY > 0) {
      $(this).scrollLeft($(this).scrollLeft() + 100);
    } else {
      $(this).scrollLeft($(this).scrollLeft() - 100);
    }
    e.preventDefault();
  });

  $("#contact-form").on("submit", function (e) {
    e.preventDefault();

    const name = $("#irum").val();
    const phone = $("#phone").val();
    const email = $("#email").val();
    const memo = $("#memo").val();
    const subject = "Contact Form Submission";
    const body = `성명: ${name}\n연락처: ${phone}\n이메일: ${email}\n메모: ${memo}`;

    const mailtoLink = `mailto:qo3764@naver.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const paperPlane = $("<div class='paper-plane'></div>");
    $("html").append(paperPlane);
    paperPlane.css({
      top: $(".btn").offset().top,
      left: $(".btn").offset().left,
    });
    paperPlane.animate(
      { top: "-=300px", left: "+=300px", opacity: 0 },
      2000,
      function () {
        paperPlane.remove();
        window.location.href = mailtoLink;
      }
    );
  });

  $(".project-card").mousemove(function (e) {
    const card = $(this).find(".card-inner");
    if (!card.hasClass("flipped")) {
      const cardWidth = card.width();
      const cardHeight = card.height();
      const centerX = card.offset().left + cardWidth / 2;
      const centerY = card.offset().top + cardHeight / 2;
      const mouseX = e.pageX - centerX;
      const mouseY = e.pageY - centerY;
      const rotateX = (mouseY / cardHeight) * 10;
      const rotateY = (mouseX / cardWidth) * -10;

      card.css({
        transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
      });
    }
  });

  $(".project-card").mouseleave(function () {
    const card = $(this).find(".card-inner");
    if (!card.hasClass("flipped")) {
      card.css({
        transform: `rotateY(0deg) rotateX(0deg)`,
      });
    }
  });

  // 메뉴 클릭 시 섹션으로 스크롤 이동
  $("#menu a, #menu2 a").on("click", function (e) {
    e.preventDefault();
    let target = $($(this).attr("href"));
    console.log("target", target);
    console.log("target-scroll", target.offset().top);
    target[0].scrollIntoView({ behavior: "smooth" });
  });

  // 현재 섹션에 따라 메뉴 업데이트
  const sections = document.querySelectorAll(".section");
  const options = {
    threshold: 0.5,
  };

  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $("#menu li.on").removeClass("on");
        $(`#menu a[href="#${entry.target.id}"]`).parent().addClass("on");
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // CSS 스크롤 스냅 추가
  document.documentElement.style.scrollSnapType = "y mandatory";
  $(".section").css("scrollSnapAlign", "start");
});
