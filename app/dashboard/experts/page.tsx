"use client";

import { useEffect, useState, useMemo } from "react";
import { Expert } from "@/types";
import { getAllExperts } from "@/lib/experts";
import { ExpertCard } from "@/components/experts/ExpertCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search, Loader2, AlertCircle } from "lucide-react";

const DOMAINS = [
  "Web Development",
  "Mobile Development",
  "Backend",
  "Frontend",
  "Full Stack",
  "DevOps",
  "Design",
  "UI/UX",
  "Cloud",
  "Infrastructure",
  "React",
];

const SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "JavaScript",
  "Tailwind CSS",
  "Firebase",
  "Next.js",
  "Docker",
  "AWS",
  "Kubernetes",
  "PostgreSQL",
];

export default function ExpertsPage() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<string>("all");
  const [showAvailable, setShowAvailable] = useState(false);
  const [minRating, setMinRating] = useState<string>("all");
  const [maxRate, setMaxRate] = useState<string>("all");

  // Fetch experts
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllExperts();
        setExperts(data);
      } catch (err) {
        console.error("Error fetching experts:", err);
        setError("Failed to load experts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  // Filter and search experts
  const filteredExperts = useMemo(() => {
    let result = experts;

    // Text search (name, title, bio, domains)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (expert) =>
          expert.name.toLowerCase().includes(query) ||
          expert.title.toLowerCase().includes(query) ||
          expert.bio.toLowerCase().includes(query) ||
          expert.domains.some((d) => d.toLowerCase().includes(query)) ||
          expert.skills.some((s) => s.toLowerCase().includes(query))
      );
    }

    // Domain filter
    if (selectedDomain && selectedDomain !== "all") {
      result = result.filter((expert) =>
        expert.domains.includes(selectedDomain)
      );
    }

    // Skill filter
    if (selectedSkill && selectedSkill !== "all") {
      result = result.filter((expert) =>
        expert.skills.includes(selectedSkill)
      );
    }

    // Availability filter
    if (showAvailable) {
      result = result.filter((expert) => expert.available);
    }

    // Rating filter
    if (minRating && minRating !== "all") {
      result = result.filter((expert) => expert.rating >= parseFloat(minRating));
    }

    // Hourly rate filter
    if (maxRate && maxRate !== "all") {
      result = result.filter((expert) => expert.hourlyRate <= parseInt(maxRate));
    }

    // Sort by rating (highest first)
    result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [
    experts,
    searchQuery,
    selectedDomain,
    selectedSkill,
    showAvailable,
    minRating,
    maxRate,
  ]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDomain("all");
    setSelectedSkill("all");
    setShowAvailable(false);
    setMinRating("all");
    setMaxRate("all");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-6">
            <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary" />
          </div>
          <p className="text-xl font-semibold text-foreground">Loading Experts</p>
          <p className="text-muted-foreground mt-2">
            Finding the best professionals for you...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 max-w-md bg-card border-border shadow-card">
          <div className="flex gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <AlertCircle className="h-8 w-8 text-destructive shrink-0" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1 text-lg">
                Error Loading Experts
              </h3>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Find Expert Professionals
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            Browse verified profiles, compare skills and rates, and connect with
            the right expert for your project.
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-5 border-border bg-card">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, skill, title, or domain"
              className="pl-12 py-5 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Domain Filter */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block uppercase tracking-wide">
                Domain
              </label>
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="w-full py-5">
                  <SelectValue placeholder="All domains" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All domains</SelectItem>
                  {DOMAINS.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Skill Filter */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block uppercase tracking-wide">
                Skill
              </label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger className="w-full py-5">
                  <SelectValue placeholder="All skills" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All skills</SelectItem>
                  {SKILLS.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Rating */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block uppercase tracking-wide">
                Rating
              </label>
              <Select value={minRating} onValueChange={setMinRating}>
                <SelectTrigger className="w-full py-5">
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any rating</SelectItem>
                  <SelectItem value="4">4★ and above</SelectItem>
                  <SelectItem value="4.5">4.5★ and above</SelectItem>
                  <SelectItem value="5">5★ only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Max Rate */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block uppercase tracking-wide">
                Max Rate/hr
              </label>
              <Select value={maxRate} onValueChange={setMaxRate}>
                <SelectTrigger className="w-full py-5">
                  <SelectValue placeholder="Any price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any price</SelectItem>
                  <SelectItem value="50">Up to $50</SelectItem>
                  <SelectItem value="75">Up to $75</SelectItem>
                  <SelectItem value="100">Up to $100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
            <Button
              variant="secondary"
              onClick={handleClearFilters}
              className="font-semibold py-5"
            >
              Clear All Filters
            </Button>
            <label className="flex items-center gap-3 cursor-pointer px-4 py-2 bg-muted/40 rounded-lg border border-border">
              <input
                type="checkbox"
                checked={showAvailable}
                onChange={(e) => setShowAvailable(e.target.checked)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm font-medium text-foreground">
                Available Only
              </span>
            </label>
          </div>
        </div>
      </Card>

      {/* Results Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 py-4 px-6 bg-card rounded-xl border border-border">
        <p className="font-semibold text-foreground">
          Showing {filteredExperts.length} expert
          {filteredExperts.length !== 1 ? "s" : ""}
        </p>
        {filteredExperts.length > 0 && (
          <p className="text-sm text-muted-foreground">
            Top rated by recent activity
          </p>
        )}
      </div>

      {/* Experts Grid */}
      {filteredExperts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      ) : (
        <Card className="p-16 text-center bg-card border-2 border-dashed border-border shadow-card">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-2">No Experts Found</h3>
            <p className="text-muted-foreground mb-6 text-lg">
              We could not find experts matching your criteria. Try adjusting
              your filters or search query.
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleClearFilters}
                className="w-full font-semibold"
              >
                Reset All Filters
              </Button>
              <p className="text-xs text-muted-foreground">
                Tip: Try removing domain, skill, or rating filters.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
