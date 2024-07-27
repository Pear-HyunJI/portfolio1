document.addEventListener("DOMContentLoaded", function () {
  console.log("Document is ready");

  // 민들레 홀씨 생성
  const seedsContainer = document.querySelector(".seeds");
  const numSeeds = 200; // 홀씨 개수 조정 (더 많고 빽빽하게)

  for (let i = 0; i < numSeeds; i++) {
    const seedGroup = document.createElement("div");
    seedGroup.classList.add("seed-group");

    const seed1 = document.createElement("div");
    seed1.classList.add("seed", "seed1");
    seed1.style.left = "-10px"; // 위치 조정
    seed1.style.top = "-10px";

    const seed2 = document.createElement("div");
    seed2.classList.add("seed", "seed2");
    seed2.style.left = "20px";
    seed2.style.top = "20px";

    seedGroup.appendChild(seed1);
    seedGroup.appendChild(seed2);

    // 원형 배치
    const angle = (i / numSeeds) * Math.PI * 2;
    const radius = 80; // 반지름 조정 (더 빽빽하게)

    const x = Math.cos(angle) * radius + radius;
    const y = Math.sin(angle) * radius + radius;

    seedGroup.style.left = `${x}px`;
    seedGroup.style.top = `${y}px`;
    seedsContainer.appendChild(seedGroup);
  }

  // 홀씨 애니메이션
  document.addEventListener("mousemove", (e) => {
    const seeds = document.querySelectorAll(".seed-group");
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

  // $(window).on("load", function () {
  //   $("#loading-screen").fadeOut(100);
  // });
});
