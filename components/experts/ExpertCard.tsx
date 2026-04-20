"use client";

import { Expert } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MessageSquare, Briefcase, Clock3, FolderKanban } from "lucide-react";
import Link from "next/link";

interface ExpertCardProps {
  expert: Expert;
}

export function ExpertCard({ expert }: ExpertCardProps) {
  const initials = expert.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const statusIndicator = expert.available ? (
    <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">
      <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
      <span className="text-xs font-semibold">Available</span>
    </div>
  ) : (
    <div className="flex items-center gap-2 bg-muted text-muted-foreground px-3 py-1.5 rounded-full border border-border">
      <div className="h-2 w-2 bg-muted-foreground rounded-full" />
      <span className="text-xs font-semibold">Unavailable</span>
    </div>
  );

  return (
    <Card className="overflow-hidden bg-card border-border p-5 flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card">
      <div className="flex items-start gap-2">
        <Avatar className="h-14 w-14 border border-border shadow-sm">
          <AvatarImage src={expert.avatar} alt={expert.name} />
          <AvatarFallback className="bg-muted text-foreground text-sm font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-base leading-tight text-foreground truncate">
            {expert.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
            {expert.title}
          </p>
          <div className="mt-2">{statusIndicator}</div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {expert.bio}
      </p>

      <div className="flex items-center gap-3 mb-4 text-sm">
        <div className="inline-flex items-center gap-1.5 text-foreground font-medium">
          <Star className="h-4 w-4 fill-primary text-primary" />
          {expert.rating}
        </div>
        <span className="text-muted-foreground">{expert.reviews} reviews</span>
        <span className="ml-auto text-foreground font-semibold">
          ${expert.hourlyRate}/hr
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-2 text-muted-foreground">
          <FolderKanban className="h-3.5 w-3.5" />
          {expert.completedProjects} projects
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-2 text-muted-foreground">
          <Clock3 className="h-3.5 w-3.5" />
          {expert.responseTime}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {expert.domains.slice(0, 2).map((domain, idx) => (
          <Badge key={idx} variant="secondary" className="text-xs font-medium">
            {domain}
          </Badge>
        ))}
        {expert.domains.length > 2 && (
          <Badge variant="secondary" className="text-xs font-medium">
            +{expert.domains.length - 2}
          </Badge>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-auto grid grid-cols-2 gap-2">
        <Link href={`/dashboard/experts/${expert.id}`} className="block">
          <Button className="w-full font-semibold">
            <Briefcase className="h-4 w-4 mr-2" />
            Profile
          </Button>
        </Link>
        <Button
          variant="outline"
          className="w-full font-medium"
          onClick={() => {
            console.log(`Chat with ${expert.name}`);
          }}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Send Message
        </Button>
      </div>
    </Card>
  );
}
