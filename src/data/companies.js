import { getStaticImage } from "./imageRegistry";

export const companies = [
  {
    id: "infra-projects",
    image: getStaticImage("construction", "companyCard"),
  },
  {
    id: "trading",
    image: getStaticImage("trading", "companyCard"),
  },
  {
    id: "investment",
    image: getStaticImage("investment", "companyCard"),
  },
  {
    id: "physio",
    image: getStaticImage("physio", "companyCard"),
  },
];
