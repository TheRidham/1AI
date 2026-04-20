"use client";

import { Expert } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  MessageSquare,
  Send,
  Briefcase,
  Clock,
  Award,
  ExternalLink,
  Globe,
} from "lucide-react";

interface ExpertProfileProps {
  expert: Expert;
  onChat?: (expertId: string) => void;
  onProposal?: (expertId: string) => void;
}

export function ExpertProfile({
  expert,
  onChat,
  onProposal,
}: ExpertProfileProps) {
  const initials = expert.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-8 border-border bg-gradient-card shadow-card">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <Avatar className="h-20 w-20 border border-border shadow-sm">
            <AvatarImage src={expert.avatar} alt={expert.name} />
            <AvatarFallback className="bg-muted text-foreground text-2xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {expert.name}
            </h1>
            <p className="mt-1 text-base md:text-lg text-muted-foreground">
              {expert.title}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Star className="h-4 w-4 fill-primary text-primary" />
                {expert.rating} ({expert.reviews} reviews)
              </div>
              <span className="text-sm text-muted-foreground">${expert.hourlyRate}/hr</span>
              {expert.available ? (
                <Badge className="bg-primary/10 text-primary border border-primary/20">
                  Available Now
                </Badge>
              ) : (
                <Badge variant="secondary">Unavailable</Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="space-y-6">
          <Card className="p-6 border-border bg-card shadow-card">
            <h2 className="text-xl font-semibold text-foreground mb-3">About</h2>
            <p className="text-muted-foreground leading-relaxed">{expert.bio}</p>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-5 border-border bg-card">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Award className="h-4 w-4" /> Experience
              </div>
              <p className="text-xl font-semibold text-foreground">{expert.experience}</p>
            </Card>
            <Card className="p-5 border-border bg-card">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4" /> Response Time
              </div>
              <p className="text-xl font-semibold text-foreground">{expert.responseTime}</p>
            </Card>
          </div>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Domains of Expertise</h2>
            <div className="flex flex-wrap gap-2.5">
              {expert.domains.map((domain, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm font-medium">
                  {domain}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-border bg-card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Technical Skills</h2>
            <div className="flex flex-wrap gap-2.5">
              {expert.skills.map((skill, idx) => (
                <Badge key={idx} className="text-sm font-medium">{skill}</Badge>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4 lg:sticky lg:top-6">
          <Card className="p-4 border-border bg-card shadow-card space-y-2">
            <Button size="lg" className="w-full font-semibold" onClick={() => onChat?.(expert.id)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Start Chat
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full font-semibold"
              onClick={() => onProposal?.(expert.id)}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Proposal
            </Button>
          </Card>

          <Card className="p-5 border-border bg-card">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Snapshot
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Projects</span>
                <span className="font-medium text-foreground">{expert.completedProjects}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Hourly Rate</span>
                <span className="font-medium text-foreground">${expert.hourlyRate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Rating</span>
                <span className="font-medium text-foreground">{expert.rating}</span>
              </div>
            </div>
          </Card>

          {expert.socialLinks &&
            Object.values(expert.socialLinks).some((link) => link) && (
              <Card className="p-5 border-border bg-card">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                  Connect
                </h3>
                <div className="space-y-2">
                  {expert.socialLinks.github && (
                    <a
                      href={expert.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-between gap-2 px-3 py-2 bg-muted hover:bg-accent rounded-md font-medium text-foreground transition-colors border border-border"
                    >
                      <span className="inline-flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" /> GitHub
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {expert.socialLinks.linkedin && (
                    <a
                      href={expert.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-between gap-2 px-3 py-2 bg-muted hover:bg-accent rounded-md font-medium text-foreground transition-colors border border-border"
                    >
                      <span className="inline-flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" /> LinkedIn
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {expert.socialLinks.portfolio && (
                    <a
                      href={expert.socialLinks.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-between gap-2 px-3 py-2 bg-muted hover:bg-accent rounded-md font-medium text-foreground transition-colors border border-border"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Globe className="h-4 w-4" /> Portfolio
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </Card>
            )}

          <Card className="p-5 border-border bg-card">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Contact
            </h3>
            <p className="text-foreground font-medium break-all">{expert.email}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
