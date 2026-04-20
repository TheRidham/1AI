import { db } from "@/lib/firebase";
import { Expert } from "@/types";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  Query,
  DocumentData,
} from "firebase/firestore";

/**
 * Fetch all experts from Firestore
 */
export async function getAllExperts(): Promise<Expert[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "experts"));
    const experts: Expert[] = [];

    querySnapshot.forEach((document) => {
      experts.push({
        id: document.id,
        ...document.data(),
      } as Expert);
    });

    return experts;
  } catch (error) {
    console.error("Error fetching experts:", error);
    throw error;
  }
}

/**
 * Fetch a single expert by ID
 */
export async function getExpertById(expertId: string): Promise<Expert | null> {
  try {
    const docRef = doc(db, "experts", expertId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Expert;
    }
    return null;
  } catch (error) {
    console.error("Error fetching expert:", error);
    throw error;
  }
}

/**
 * Search experts by domain
 */
export async function searchExpertsByDomain(domain: string): Promise<Expert[]> {
  try {
    const q = query(
      collection(db, "experts"),
      where("domains", "array-contains", domain)
    );
    const querySnapshot = await getDocs(q);
    const experts: Expert[] = [];

    querySnapshot.forEach((document) => {
      experts.push({
        id: document.id,
        ...document.data(),
      } as Expert);
    });

    return experts;
  } catch (error) {
    console.error("Error searching experts by domain:", error);
    throw error;
  }
}

/**
 * Search experts by skill
 */
export async function searchExpertsBySkill(skill: string): Promise<Expert[]> {
  try {
    const q = query(
      collection(db, "experts"),
      where("skills", "array-contains", skill)
    );
    const querySnapshot = await getDocs(q);
    const experts: Expert[] = [];

    querySnapshot.forEach((document) => {
      experts.push({
        id: document.id,
        ...document.data(),
      } as Expert);
    });

    return experts;
  } catch (error) {
    console.error("Error searching experts by skill:", error);
    throw error;
  }
}

/**
 * Filter experts by availability
 */
export async function getAvailableExperts(): Promise<Expert[]> {
  try {
    const q = query(
      collection(db, "experts"),
      where("available", "==", true)
    );
    const querySnapshot = await getDocs(q);
    const experts: Expert[] = [];

    querySnapshot.forEach((document) => {
      experts.push({
        id: document.id,
        ...document.data(),
      } as Expert);
    });

    return experts;
  } catch (error) {
    console.error("Error fetching available experts:", error);
    throw error;
  }
}

/**
 * Filter and search experts
 */
export async function searchExperts(filters: {
  domain?: string;
  skill?: string;
  available?: boolean;
  minRating?: number;
  maxHourlyRate?: number;
}): Promise<Expert[]> {
  try {
    let allExperts = await getAllExperts();

    // Filter by domain
    if (filters.domain) {
      allExperts = allExperts.filter((expert) =>
        expert.domains.includes(filters.domain!)
      );
    }

    // Filter by skill
    if (filters.skill) {
      allExperts = allExperts.filter((expert) =>
        expert.skills.includes(filters.skill!)
      );
    }

    // Filter by availability
    if (filters.available !== undefined) {
      allExperts = allExperts.filter(
        (expert) => expert.available === filters.available
      );
    }

    // Filter by minimum rating
    if (filters.minRating !== undefined) {
      allExperts = allExperts.filter(
        (expert) => expert.rating >= filters.minRating!
      );
    }

    // Filter by maximum hourly rate
    if (filters.maxHourlyRate !== undefined) {
      allExperts = allExperts.filter(
        (expert) => expert.hourlyRate <= filters.maxHourlyRate!
      );
    }

    // Sort by rating (highest first)
    allExperts.sort((a, b) => b.rating - a.rating);

    return allExperts;
  } catch (error) {
    console.error("Error searching experts:", error);
    throw error;
  }
}
