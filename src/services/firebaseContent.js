import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, hasFirebaseConfig } from "../firebase/firebaseApp";

export const PROJECT_CATEGORIES = ["construction", "trading", "physio", "investment", "other"];
export const PROJECT_SECTIONS = ["slider", "projects", "homepage"];

/*
  Example Firestore security rules:

  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      function isAdmin() {
        return request.auth != null && request.auth.token.email == "<admin-email>";
      }

      match /quotes/{document=**} {
        allow read: if true;
        allow write: if isAdmin();
      }

      match /projects/{document=**} {
        allow read: if true;
        allow write: if isAdmin();
      }
    }
  }
*/

function assertFirestore() {
  if (!hasFirebaseConfig || !db) {
    throw new Error("Firebase is not configured. Add REACT_APP_FIREBASE_* variables and restart the app.");
  }
  return db;
}

function logFirebaseError(scope, error) {
  console.error(`[Firebase:${scope}]`, error);
}

function getSortableDateValue(value) {
  if (!value) return 0;
  const date = typeof value.toDate === "function" ? value.toDate() : value;
  const time = date instanceof Date ? date.getTime() : new Date(date).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function formatTimestamp(value) {
  if (!value) return "";
  const date = typeof value.toDate === "function" ? value.toDate() : value;
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function normalizeQuote(data) {
  const text = data.text || data.text_en || "";
  return {
    ...data,
    text,
    active: data.active === true,
    createdAtLabel: formatTimestamp(data.createdAt || data.date),
  };
}

function inferProjectCategory(data) {
  if (PROJECT_CATEGORIES.includes(data.category)) {
    return data.category;
  }

  const source = `${data.category || ""} ${data.title || ""} ${data.imageUrl || ""}`.toLowerCase();
  if (source.includes("physio") || source.includes("/physio/")) return "physio";
  if (source.includes("investment") || source.includes("/investment/")) return "investment";
  if (source.includes("trading") || source.includes("/trading/")) return "trading";
  if (
    source.includes("construction") ||
    source.includes("infra") ||
    source.includes("/construction/") ||
    source.includes("/projects/")
  ) {
    return "construction";
  }
  return "other";
}

function inferProjectSection(data) {
  if (PROJECT_SECTIONS.includes(data.section)) {
    return data.section;
  }

  const source = `${data.section || ""} ${data.imageUrl || ""}`.toLowerCase();
  if (source.includes("homepage")) return "homepage";
  if (source.includes("slider") || source.includes("/projects/")) return "slider";
  return "projects";
}

function normalizeProject(id, data) {
  return {
    id,
    ...data,
    category: inferProjectCategory(data),
    section: inferProjectSection(data),
    visible: data.visible !== false,
    createdAtLabel: formatTimestamp(data.createdAt),
  };
}

function sortProjects(items) {
  return [...items].sort((left, right) => getSortableDateValue(right.createdAt) - getSortableDateValue(left.createdAt));
}

function filterProjects(items, { category, section, visibleOnly = true } = {}) {
  return items.filter((item) => {
    if (visibleOnly && item.visible === false) return false;
    if (category && item.category !== category) return false;
    if (section && item.section !== section) return false;
    return true;
  });
}

export async function getLatestQuote() {
  const quotesRef = collection(assertFirestore(), "quotes");

  const pickLatestQuote = (docs, filterActiveOnly = false) => {
    const items = docs.map((item) => ({
      id: item.id,
      ...normalizeQuote(item.data()),
    }));
    const filtered = filterActiveOnly ? items.filter((item) => item.active) : items;
    const sorted = [...filtered].sort(
      (left, right) => getSortableDateValue(right.createdAt || right.date) - getSortableDateValue(left.createdAt || left.date)
    );
    return sorted[0] || null;
  };

  try {
    const snapshot = await getDocs(
      query(quotesRef, where("active", "==", true), orderBy("createdAt", "desc"), limit(1))
    );
    console.log("Fetched quotes:", snapshot.docs.map((docItem) => docItem.data()));

    if (!snapshot.empty) {
      return pickLatestQuote(snapshot.docs, true);
    }
  } catch (error) {
    logFirebaseError("getLatestQuote:activeOrdered", error);
  }

  try {
    const snapshot = await getDocs(query(quotesRef, where("active", "==", true), limit(10)));
    console.log("Fetched quotes:", snapshot.docs.map((docItem) => docItem.data()));

    if (!snapshot.empty) {
      return pickLatestQuote(snapshot.docs, true);
    }
  } catch (error) {
    logFirebaseError("getLatestQuote:activeFallback", error);
  }

  try {
    const snapshot = await getDocs(query(quotesRef, orderBy("createdAt", "desc"), limit(1)));
    console.log("Fetched quotes:", snapshot.docs.map((docItem) => docItem.data()));

    if (!snapshot.empty) {
      return pickLatestQuote(snapshot.docs);
    }
    return null;
  } catch (error) {
    logFirebaseError("getLatestQuote:latestFallback", error);
    throw error;
  }
}

export async function getAllQuotes() {
  const quotesRef = collection(assertFirestore(), "quotes");
  const sortQuotes = (items) =>
    [...items].sort(
      (left, right) => getSortableDateValue(right.createdAt || right.date) - getSortableDateValue(left.createdAt || left.date)
    );

  try {
    const snapshot = await getDocs(query(quotesRef, orderBy("createdAt", "desc")));
    console.log("Fetched quotes:", snapshot.docs.map((docItem) => docItem.data()));
    return sortQuotes(snapshot.docs.map((item) => ({
      id: item.id,
      ...normalizeQuote(item.data()),
    })));
  } catch (error) {
    logFirebaseError("getAllQuotes:ordered", error);

    try {
      const snapshot = await getDocs(quotesRef);
      console.log("Fetched quotes:", snapshot.docs.map((docItem) => docItem.data()));
      return sortQuotes(snapshot.docs.map((item) => ({
        id: item.id,
        ...normalizeQuote(item.data()),
      })));
    } catch (fallbackError) {
      logFirebaseError("getAllQuotes:fallback", fallbackError);
      throw fallbackError;
    }
  }
}

export async function addQuote(payload) {
  try {
    const firestore = assertFirestore();
    const quotesRef = collection(firestore, "quotes");
    const activeQuotesQuery = query(quotesRef, where("active", "==", true));
    const activeSnapshot = await getDocs(activeQuotesQuery);

    for (const docItem of activeSnapshot.docs) {
      await updateDoc(docItem.ref, { active: false });
    }

    const result = await addDoc(quotesRef, {
      text: payload.text,
      createdAt: serverTimestamp(),
      active: true,
    });

    console.log("Quote saved:", result);
    return result;
  } catch (error) {
    logFirebaseError("addQuote", error);
    throw error;
  }
}

export async function deleteQuoteById(id) {
  try {
    return deleteDoc(doc(assertFirestore(), "quotes", id));
  } catch (error) {
    logFirebaseError("deleteQuoteById", error);
    throw error;
  }
}

export async function addProject(payload) {
  try {
    const projectsRef = collection(assertFirestore(), "projects");
    return addDoc(projectsRef, {
      title: payload.title,
      imageUrl: payload.imageUrl,
      category: payload.category,
      section: payload.section,
      visible: true,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    logFirebaseError("addProject", error);
    throw error;
  }
}

export async function createOrder(payload) {
  try {
    const ordersRef = collection(assertFirestore(), "orders");
    return addDoc(ordersRef, {
      ...payload,
      createdAt: new Date(),
    });
  } catch (error) {
    logFirebaseError("createOrder", error);
    throw error;
  }
}

export async function getProjectsByCategory(category, { visibleOnly = true } = {}) {
  try {
    const projectsRef = collection(assertFirestore(), "projects");
    const snapshot = await getDocs(projectsRef);
    const items = snapshot.docs.map((item) => normalizeProject(item.id, item.data()));
    return sortProjects(filterProjects(items, { category, visibleOnly }));
  } catch (error) {
    logFirebaseError("getProjectsByCategory", error);
    throw error;
  }
}

export async function getSectionImages(section, { category, visibleOnly = true } = {}) {
  try {
    const projectsRef = collection(assertFirestore(), "projects");
    const snapshot = await getDocs(projectsRef);
    const items = snapshot.docs.map((item) => normalizeProject(item.id, item.data()));
    return sortProjects(filterProjects(items, { category, section, visibleOnly }));
  } catch (error) {
    logFirebaseError("getSectionImages", error);
    throw error;
  }
}

export async function getImagesByCategory(category, { section, visibleOnly = true } = {}) {
  return getSectionImages(section, { category, visibleOnly });
}

export async function getSliderImages(category, { visibleOnly = true } = {}) {
  return getSectionImages("slider", { category, visibleOnly });
}

export function subscribeProjectsByCategory(category, onNext, onError, { visibleOnly = true } = {}) {
  try {
    const projectsRef = collection(assertFirestore(), "projects");
    return onSnapshot(
      query(projectsRef),
      (snapshot) => {
        const items = sortProjects(
          filterProjects(
            snapshot.docs.map((item) => normalizeProject(item.id, item.data())),
            { category, visibleOnly }
          )
        );
        onNext(items);
      },
      (error) => {
        logFirebaseError("subscribeProjectsByCategory", error);
        if (typeof onError === "function") {
          onError(error);
        }
      }
    );
  } catch (error) {
    logFirebaseError("subscribeProjectsByCategory:setup", error);
    if (typeof onError === "function") {
      onError(error);
    }
    return () => {};
  }
}

export function subscribeSectionImages(section, onNext, onError, { category, visibleOnly = true } = {}) {
  try {
    const projectsRef = collection(assertFirestore(), "projects");
    return onSnapshot(
      query(projectsRef),
      (snapshot) => {
        const items = sortProjects(
          filterProjects(
            snapshot.docs.map((item) => normalizeProject(item.id, item.data())),
            { category, section, visibleOnly }
          )
        );
        onNext(items);
      },
      (error) => {
        logFirebaseError("subscribeSectionImages", error);
        if (typeof onError === "function") {
          onError(error);
        }
      }
    );
  } catch (error) {
    logFirebaseError("subscribeSectionImages:setup", error);
    if (typeof onError === "function") {
      onError(error);
    }
    return () => {};
  }
}

export function subscribeSliderImages(category, onNext, onError, { visibleOnly = true } = {}) {
  return subscribeSectionImages("slider", onNext, onError, { category, visibleOnly });
}

export async function getAllProjects() {
  try {
    const projectsRef = collection(assertFirestore(), "projects");
    const snapshot = await getDocs(projectsRef);
    return sortProjects(snapshot.docs.map((item) => normalizeProject(item.id, item.data())));
  } catch (error) {
    logFirebaseError("getAllProjects", error);
    throw error;
  }
}

export async function deleteProjectById(id) {
  try {
    return deleteDoc(doc(assertFirestore(), "projects", id));
  } catch (error) {
    logFirebaseError("deleteProjectById", error);
    throw error;
  }
}

export async function setProjectVisibility(id, visible) {
  try {
    return updateDoc(doc(assertFirestore(), "projects", id), { visible });
  } catch (error) {
    logFirebaseError("setProjectVisibility", error);
    throw error;
  }
}
