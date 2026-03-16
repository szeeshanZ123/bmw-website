
document.querySelectorAll(".nav-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const links = document.querySelector(".nav-links");
    if (links) links.classList.toggle("open");
  });
});


const engineAudio = document.getElementById("engine-audio");
if (engineAudio) {
  document.querySelectorAll("button[data-audio]").forEach((btn) => {
    btn.addEventListener("click", () => {
      engineAudio.src = btn.dataset.audio;
      engineAudio.currentTime = 0;
      engineAudio.play();
    });
  });
}


document.querySelectorAll("form").forEach((f) => {
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Form submitted successfully.");
    f.reset();
  });
});


function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach((box) => {
    const rect = box.getBoundingClientRect();
    if (rect.top < window.innerHeight - 120) {
      box.classList.add("active");
    }
  });
}
window.addEventListener("load", revealOnScroll);
window.addEventListener("scroll", revealOnScroll);


document.querySelectorAll(".accordion").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".accordion").forEach((b) => {
      if (b !== btn) {
        b.classList.remove("active");
        b.nextElementSibling.style.maxHeight = null;
        b.nextElementSibling.classList.remove("open");
      }
    });

    btn.classList.toggle("active");
    const panel = btn.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      panel.classList.remove("open");
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.classList.add("open");
    }
  });
});


document.querySelectorAll(".buy-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const panel = btn.closest(".panel");
    let selectedColor = "Standard White"; 
    let selectedRim = "Standard Alloys"; 

    if (panel) {
      const activeColorBtn = panel.querySelector(".color-btn.selected");
      if (activeColorBtn) selectedColor = activeColorBtn.dataset.color;

      const rimSelect = panel.querySelector(".rim-select");
      if (rimSelect) selectedRim = rimSelect.value;
    }

    localStorage.setItem("invoice_car", btn.dataset.car);
    localStorage.setItem("invoice_price", btn.dataset.price);
    localStorage.setItem("invoice_price_raw", btn.dataset.priceRaw || "0");
    localStorage.setItem("invoice_color", selectedColor);
    localStorage.setItem("invoice_rims", selectedRim);
    localStorage.setItem("invoice_date", new Date().toLocaleDateString());
    localStorage.setItem(
      "invoice_number",
      "BMW-" + Math.floor(100000 + Math.random() * 900000)
    );
    window.location.href = "invoice.html";
  });
});


const searchInput = document.getElementById("modelSearch");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    document.querySelectorAll(".model-item").forEach((item) => {
      const btn = item.querySelector(".accordion");
      if (!btn) return;
      const title = btn.textContent.toLowerCase();

      if (title.includes(value) || value === "") {
        item.style.removeProperty("display");
      } else {
        item.style.display = "none";
      }
    });
  });
}


const toggle = document.getElementById("themeToggle");
if (toggle) {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.body.classList.add("light");
    toggle.textContent = "☀️";
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    toggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-image");
const thumbs = document.querySelectorAll(".lightbox-thumb");
let currentIndex = 0;

if (lightbox && lbImg && thumbs.length) {
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      currentIndex = index;
      showImage();
      lightbox.classList.add("show");
    });
  });

  function showImage() {
    lbImg.src = thumbs[currentIndex].src;
  }

  function changeImage(step) {
    currentIndex = (currentIndex + step + thumbs.length) % thumbs.length;
    showImage();
  }

  document.querySelector(".lightbox-close").onclick = () =>
    lightbox.classList.remove("show");

  document.querySelector(".lightbox-prev").onclick = () => changeImage(-1);
  document.querySelector(".lightbox-next").onclick = () => changeImage(1);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("show");
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;
    if (e.key === "ArrowRight") changeImage(1);
    if (e.key === "ArrowLeft") changeImage(-1);
    if (e.key === "Escape") lightbox.classList.remove("show");
  });
}


const backBtn = document.getElementById("backToTop");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


document.querySelectorAll(".model-filters button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.filter;

    document
      .querySelectorAll(".model-filters button")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".model-item").forEach((item) => {
      if (type === "all" || item.dataset.type === type) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});


function initCarConfigurator() {
  const panels = document.querySelectorAll(".panel");

  panels.forEach((panel) => {
    if (panel.querySelector(".configurator")) return;
    const configDiv = document.createElement("div");
    configDiv.className = "configurator";
    configDiv.innerHTML = `
      <h4>Customize Your BMW</h4>
      

      <div class="config-row">
        <span>Exterior:</span>
        <div class="color-options">
          <div class="color-btn selected" style="background:#f8f9fa" data-color="Alpine White" title="Alpine White"></div>
          <div class="color-btn" style="background:#000000" data-color="Black Sapphire" title="Black Sapphire"></div>
          <div class="color-btn" style="background:#1c508a" data-color="Portimao Blue" title="Portimao Blue"></div>
          <div class="color-btn" style="background:#d32f2f" data-color="Toronto Red" title="Toronto Red"></div>
          <div class="color-btn" style="background:#707070" data-color="Brooklyn Grey" title="Brooklyn Grey"></div>
        </div>
      </div>


      <div class="config-row">
        <span>Wheels:</span>
        <select class="rim-select">
          <option value="Standard Alloys">Standard Alloys</option>
          <option value="M Sport Double-Spoke">M Sport Double-Spoke</option>
          <option value="Performance Black Matt">Performance Black Matt</option>
          <option value="Carbon Fiber Wheels">Carbon Fiber M-Performance</option>
        </select>
      </div>
    `;
    const buyBtn = panel.querySelector(".buy-btn");
    if (buyBtn) {
      panel.insertBefore(configDiv, buyBtn.previousElementSibling); 
    } else {
      panel.appendChild(configDiv);
    }
    const cups = configDiv.querySelectorAll(".color-btn");
    cups.forEach((cup) => {
      cup.addEventListener("click", () => {
        cups.forEach((c) => c.classList.remove("selected"));
        cup.classList.add("selected");
      });
    });
  });
}
document.addEventListener("DOMContentLoaded", initCarConfigurator);
