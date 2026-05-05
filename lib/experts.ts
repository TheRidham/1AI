import { db } from "@/lib/firebase";
import { Expert, AISolution } from "@/types";
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

// Recommendation types
export interface MatchBreakdown {
  semanticScore: number;
  skillScore: number;
  ratingScore: number;
  recencyScore: number;
}

export interface RecommendationResult {
  expert: Expert;
  rankingScore: number;
  finalScore: number;
  confidence: number; // descriptive confidence 0..1, not used to penalize score in V1
  breakdown: MatchBreakdown;
}

function tokenize(text = ""): string[] {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function jaccardSimilarity(a: string, b: string) {
  const A = new Set(tokenize(a));
  const B = new Set(tokenize(b));
  if (A.size === 0 || B.size === 0) return 0;
  let inter = 0;
  for (const v of A) if (B.has(v)) inter++;
  return inter / (A.size + B.size - inter);
}

function computeSkillScore(expertSkills: string[] = [], requiredSkills: string[] = []) {
  if (!requiredSkills.length) return 0;
  const expertSet = new Set(expertSkills.map((s) => s.toLowerCase()));
  const matched = requiredSkills.filter((s) => expertSet.has(s.toLowerCase())).length;
  const matchedRatio = matched / requiredSkills.length;
  // V1: simple ratio (0..1)
  return matchedRatio;
}

function computeDomainScore(expertDomains: string[] = [], domain?: string) {
  if (!domain) return 0;
  return expertDomains.map((d) => d.toLowerCase()).includes(domain.toLowerCase()) ? 1 : 0;
}

function computeToolsScore(expertSkills: string[] = [], tools: { name: string }[] = []) {
  if (!tools.length) return 0;
  const expertSet = new Set(expertSkills.map((s) => s.toLowerCase()));
  const matched = tools.filter((t) => expertSet.has(t.name.toLowerCase())).length;
  return matched / tools.length;
}

function computeRecencyScore(lastRelevant?: string | Date, completedProjects = 0) {
  if (!lastRelevant) {
    // fallback: use completedProjects as proxy
    return Math.min(1, completedProjects / 5);
  }
  const last = typeof lastRelevant === "string" ? new Date(lastRelevant) : lastRelevant;
  const months = (Date.now() - last.getTime()) / (1000 * 60 * 60 * 24 * 30);
  if (months <= 6) return 1;
  if (months <= 18) return 0.6;
  return 0.3;
}

function computeConfidence(expert: Expert, matchedSkillRatio: number) {
  const projectsFactor = Math.min(1, (expert.completedProjects || 0) / 3);
  // const embeddingCoverage = (expert as any).embeddings ? 1 : 0;
  const profileCompleteness = (() => {
    let score = 0;
    if (expert.bio) score += 0.3;
    if (expert.domains && expert.domains.length) score += 0.2;
    if (expert.skills && expert.skills.length) score += 0.2;
    if (expert.completedProjects) score += 0.3;
    return Math.min(1, score);
  })();

  // V1: 50% projects, 35% profile, 15% skill match (no embeddings in Phase 1)
  return Math.max(
    0,
    0.5 * projectsFactor + 0.35 * profileCompleteness + 0.15 * matchedSkillRatio
  );
}

/**
 * Recommend experts for a given workflow.
 * - Modular helpers so logic can be replaced with embeddings later.
 */
export async function recommendExpertsForWorkflow(
  workflow: AISolution,
  filters?: {
    maxHourlyRate?: number;
    minRating?: number;
    available?: boolean;
  },
  options?: { topN?: number; explorationFrac?: number }
): Promise<RecommendationResult[]> {
  const topN = options?.topN ?? 10;
  // V1: keep options simple

  const allExperts = await getAllExperts();

  // Apply lightweight filters first
  let candidates = allExperts.filter((e) => {
    if (filters?.maxHourlyRate !== undefined && e.hourlyRate > filters.maxHourlyRate) return false;
    if (filters?.minRating !== undefined && e.rating < filters.minRating) return false;
    if (filters?.available !== undefined && e.available !== filters.available) return false;
    return true;
  });

  const workflowText = `${workflow.intent} ${workflow.requiredSkills.join(" ")} ${workflow.tools
    .map((t) => t.name)
    .join(" ")}`;

  const results: RecommendationResult[] = candidates.map((expert) => {
    const semanticScore = jaccardSimilarity(workflowText, `${expert.title} ${expert.bio} ${expert.skills.join(" ")}`);
    const skillScore = computeSkillScore(expert.skills || [], workflow.requiredSkills || []);
    const ratingScore = (expert.rating || 0) / 5;
    const recencyScore = computeRecencyScore((expert as any).lastRelevantProjectAt, expert.completedProjects || 0);

    // V1 weights: 50% semantic, 25% skills, 15% rating, 10% recency
    const finalScore = 0.5 * semanticScore + 0.25 * skillScore + 0.15 * ratingScore + 0.1 * recencyScore;

    // Confidence: descriptive only, not gating (V1: no embeddings)
    const matchedSkillRatio = workflow.requiredSkills.length
      ? (workflow.requiredSkills.filter((s) => (expert.skills || []).map((x) => x.toLowerCase()).includes(s.toLowerCase())).length || 0) / workflow.requiredSkills.length
      : 0;
    const confidence = computeConfidence(expert, matchedSkillRatio);

    const rankingScore = finalScore;

    return {
      expert,
      rankingScore,
      finalScore,
      confidence,
      breakdown: {
        semanticScore,
        skillScore,
        ratingScore,
        recencyScore,
      },
    } as RecommendationResult;
  });

  // Sort by rankingScore desc
  results.sort((a, b) => b.rankingScore - a.rankingScore);

  // Return topN
  return results.slice(0, topN);
}
