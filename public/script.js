(() => {
  const root = document.documentElement;
  const requested = new URLSearchParams(window.location.search).get("concept");
  const concept = requested === "signal" ? "signal" : "bench";
  root.dataset.concept = concept;

  const concepts = {
    bench: {
      eyebrow: "Sub + Abd · garage-built",
      firstLine: "Built in our garage.",
      secondLine: "Balanced for your game.",
      lead: "We match the CPU, GPU, board, power and cooling around what you play—and what you can spend.",
      alt: "A carefully laid out gaming PC on a warmly lit garage workbench, with components ready to be matched into a complete build.",
      image: "/assets/pcbuilds-bench.webp",
      themeColor: "#121311"
    },
    signal: {
      eyebrow: "PCBuilds · full-system matching",
      firstLine: "Every part should",
      secondLine: "play as one.",
      lead: "From processor to power supply, we plan the whole system around the games, the budget and the upgrades that make sense.",
      alt: "A cool-toned PC build with motherboard, graphics card, fans and power supply aligned along luminous connecting paths in a precision studio.",
      image: "/assets/pcbuilds-signal.webp",
      themeColor: "#12263a"
    }
  };

  const active = concepts[concept];
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };
  setText("hero-eyebrow", active.eyebrow);
  setText("hero-line-one", active.firstLine);
  setText("hero-line-two", active.secondLine);
  setText("hero-lead", active.lead);

  const heroImage = document.getElementById("hero-image");
  if (heroImage) {
    heroImage.src = active.image;
    heroImage.alt = active.alt;
  }
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = active.themeColor;
  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("main-navigation");
  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    };
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navigation.classList.toggle("is-open", !isOpen);
    });
    navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    root.classList.add("nav-ready");
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = Array.from(document.querySelectorAll("[data-reveal]"));
  document.querySelectorAll("[data-stagger]").forEach((group) => {
    Array.from(group.children).forEach((child, index) => {
      if (child.hasAttribute("data-reveal")) child.style.setProperty("--delay", `${Math.min(index * 65, 260)}ms`);
    });
  });

  if (!reduceMotion && "IntersectionObserver" in window && reveals.length) {
    root.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    reveals.forEach((element) => observer.observe(element));

    const traceObserver = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-active");
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    document.querySelectorAll(".hero__orbit, .match-line").forEach((element) => traceObserver.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add("is-visible"));
  }

  const announcement = document.getElementById("concept-announcement");
  if (announcement && requested === "signal") announcement.textContent = "Signal Match design direction preview loaded.";
})();
