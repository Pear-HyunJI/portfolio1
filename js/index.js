$(document).ready(function () {
  console.log("Document is ready");
  // Typing effect
  const typingTexts = ["프론트엔드 개발자입니다", "감사합니다"];
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
        textIndex = (textIndex + 1) % typingTexts.length; // switch to the next text
      }
      setTimeout(type, 1500);
    }
  }

  type();

  // Scrolling effect for slogan
  $(window).on("scroll", function () {
    console.log("Scrolling...");
    let windowHeight = $(window).height();
    let scrollTop = $(window).scrollTop();
    let sloganOffset = $("#slogan").offset().top;
    let sloganHeight = $("#slogan").outerHeight();

    console.log("scrollTop:", scrollTop);
    console.log("sloganOffset:", sloganOffset);
    console.log("windowHeight:", windowHeight);
    console.log("sloganHeight:", sloganHeight);

    if (scrollTop + windowHeight > sloganOffset + sloganHeight / 2) {
      $("#slogan .text-row.center").css("color", "black");
    }
    if (scrollTop + windowHeight > sloganOffset + (sloganHeight * 3) / 4) {
      $("#slogan .text-row.center").html(function (_, html) {
        return html.replace(
          /성장하는 개발자/,
          '<span class="highlight">성장하는 개발자</span>'
        );
      });
    }
  });

  // Card flip on click
  $(".project-card").on("click", function (e) {
    e.stopPropagation();
    const cardInner = $(this).find(".card-inner");
    cardInner.toggleClass("flipped");

    // 클릭할 때 transform 스타일 초기화
    if (cardInner.hasClass("flipped")) {
      cardInner.css("transform", "rotateY(180deg)");
    } else {
      cardInner.css("transform", "rotateY(0deg)");
    }
  });

  // Image enlargement
  $(".thumbnail").on("click", function (e) {
    e.stopPropagation();
    const src = $(this).attr("src");
    $("#modal-img").attr("src", src);
    $("#modal").css("display", "block");
  });

  $(".close").on("click", function () {
    $("#modal").css("display", "none");
  });

  // 커스텀 커서
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

  // Change cursor on hover
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

  // Horizontal scroll for projects
  $("#projects .timeline").on("wheel", function (e) {
    if (e.originalEvent.deltaY > 0) {
      $(this).scrollLeft($(this).scrollLeft() + 100);
    } else {
      $(this).scrollLeft($(this).scrollLeft() - 100);
    }
    e.preventDefault();
  });

  // Contact form submission
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

    // Paper plane animation
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

  // Add mousemove event for hover effect
  $(".project-card").mousemove(function (e) {
    const card = $(this).find(".card-inner");
    if (!card.hasClass("flipped")) {
      const cardWidth = card.width();
      const cardHeight = card.height();
      const centerX = card.offset().left + cardWidth / 2;
      const centerY = card.offset().top + cardHeight / 2;
      const mouseX = e.pageX - centerX;
      const mouseY = e.pageY - centerY;
      const rotateX = (mouseY / cardHeight) * 10; // 기울기 조정
      const rotateY = (mouseX / cardWidth) * -10; // 기울기 조정

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
});
