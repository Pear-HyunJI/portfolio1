document.addEventListener("DOMContentLoaded", function () {
  console.log("Document is ready");

  // 민들레 홀씨 생성
  const seedsContainer = document.querySelector(".seeds");
  const numSeeds = 100; // 홀씨 개수 조정

  for (let i = 0; i < numSeeds; i++) {
    const seed = document.createElement("div");
    seed.classList.add("seed");

    // 원형 배치
    const angle = (i / numSeeds) * Math.PI * 2;
    const radius = 50; // 반지름 조정
    const x = Math.cos(angle) * radius + radius;
    const y = Math.sin(angle) * radius + radius;

    seed.style.left = `${x}px`;
    seed.style.top = `${y}px`;
    seedsContainer.appendChild(seed);
  }

  // 홀씨 애니메이션
  document.addEventListener("mousemove", (e) => {
    const seeds = document.querySelectorAll(".seed");
    seeds.forEach((seed) => {
      const rect = seed.getBoundingClientRect();
      const seedX = rect.left + window.scrollX + rect.width / 2;
      const seedY = rect.top + window.scrollY + rect.height / 2;
      const distance = Math.sqrt(
        (seedX - e.clientX) ** 2 + (seedY - e.clientY) ** 2
      );

      if (distance < 100) {
        seed.style.animation = `float 5s infinite ease-in-out ${
          Math.random() * 2
        }s`;
      } else {
        seed.style.animation = "";
      }
    });
  });

  $(window).on("load", function () {
    $("#loading-screen").fadeOut(100);
  });
});
