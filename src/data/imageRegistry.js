export const STATIC_IMAGE_REGISTRY = {
  home: {
    slider: [
      "/images/hero.jpg",
      "/images/trading/products.jpg",
      "/images/physio/treatment.jpg",
    ],
    quoteBackground: "/images/quote-bg.jpg",
  },
  construction: {
    hero: "/infra.mp4",
    about: "/images/construction/site1.jpg",
    owner: "/images/construction/team.jpg",
    gallery: [
      "/images/construction/site1.jpg",
      "/images/construction/team.jpg",
      "/projects/completed/c1.jpeg",
    ],
    projectSliderCompleted: [
      "/projects/completed/c1.jpeg",
      "/projects/completed/c2.jpeg",
      "/projects/completed/c3.jpeg",
      "/projects/completed/c4.jpeg",
      "/projects/completed/c5.jpeg",
      "/projects/completed/c6.jpeg",
    ],
    projectSliderOngoing: [
      "/projects/completed/c4.jpeg",
      "/projects/completed/c5.jpeg",
      "/projects/completed/c6.jpeg",
    ],
    companyCard: "/images/construction/site1.jpg",
  },
  trading: {
    hero: "/images/trading/products.jpg",
    about: "/images/trading/materials.jpg",
    gallery: [
      "/images/trading/products.jpg",
      "/images/trading/materials.jpg",
      "/images/trading/products.jpg",
    ],
    companyCard: "/images/trading/products.jpg",
  },
  physio: {
    hero: "/images/physio/treatment.jpg",
    doctor: "/images/physio/doctor.jpg",
    gallery: [
      "/images/physio/doctor.jpg",
      "/images/physio/treatment.jpg",
      "/images/physio/doctor.jpg",
    ],
    companyCard: "/images/physio/doctor.jpg",
  },
  investment: {
    hero: "/images/investment/meeting.jpg",
    advisor: "/images/investment/advisor.jpg",
    gallery: [
      "/images/investment/advisor.jpg",
      "/images/investment/meeting.jpg",
      "/images/investment/advisor.jpg",
    ],
    companyCard: "/images/investment/advisor.jpg",
  },
};

export function getStaticImage(page, key, fallback = "") {
  return STATIC_IMAGE_REGISTRY[page]?.[key] || fallback;
}

export function getStaticSectionImages(page, section) {
  const value = STATIC_IMAGE_REGISTRY[page]?.[section];
  return Array.isArray(value) ? value : [];
}
