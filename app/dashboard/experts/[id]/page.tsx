"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Expert } from "@/types";
import { getExpertById } from "@/lib/experts";
import { ExpertProfile } from "@/components/experts/ExpertProfile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  AlertCircle,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function ExpertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const expertId = params.id as string;

  const [expert, setExpert] = useState<Expert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [proposalDialogOpen, setProposalDialogOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [proposalData, setProposalData] = useState({
    projectTitle: "",
    description: "",
    budget: "",
    timeline: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch expert
  useEffect(() => {
    const fetchExpert = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getExpertById(expertId);
        if (data) {
          setExpert(data);
        } else {
          setError("Expert not found");
        }
      } catch (err) {
        console.error("Error fetching expert:", err);
        setError("Failed to load expert details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (expertId) {
      fetchExpert();
    }
  }, [expertId]);

  // Handle chat
  const handleChat = async (id: string) => {
    if (!chatMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }

    try {
      setSubmitting(true);
      // TODO: Implement chat functionality - send message to backend
      console.log(`Chat with expert ${id}:`, chatMessage);

      toast.success("Message sent! The expert will respond soon.");
      setChatMessage("");
      setChatDialogOpen(false);
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle proposal
  const handleProposal = async (id: string) => {
    if (
      !proposalData.projectTitle.trim() ||
      !proposalData.description.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      // TODO: Implement proposal functionality - send proposal to backend
      console.log(`Proposal for expert ${id}:`, proposalData);

      toast.success("Proposal sent! The expert will review it shortly.");
      setProposalData({
        projectTitle: "",
        description: "",
        budget: "",
        timeline: "",
      });
      setProposalDialogOpen(false);
    } catch (err) {
      console.error("Error sending proposal:", err);
      toast.error("Failed to send proposal. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading expert profile...</p>
        </div>
      </div>
    );
  }

  if (error || !expert) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Card className="p-8 bg-red-50 border-red-200">
          <div className="flex gap-3">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error</h3>
              <p className="text-red-700">
                {error || "Failed to load expert details."}
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Experts
      </Button>

      {/* Expert Profile Component */}
      <ExpertProfile
        expert={expert}
        onChat={() => setChatDialogOpen(true)}
        onProposal={() => setProposalDialogOpen(true)}
      />

      {/* Chat Dialog */}
      <Dialog open={chatDialogOpen} onOpenChange={setChatDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start Chat with {expert.name}</DialogTitle>
            <DialogDescription>
              Send a message to discuss your project
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Tell the expert about your project..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <Button
              onClick={() => handleChat(expert.id)}
              disabled={submitting || !chatMessage.trim()}
              className="w-full"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Proposal Dialog */}
      <Dialog open={proposalDialogOpen} onOpenChange={setProposalDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Proposal to {expert.name}</DialogTitle>
            <DialogDescription>
              Describe your project and propose terms
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectTitle">Project Title *</Label>
              <Input
                id="projectTitle"
                placeholder="e.g., Build React Dashboard"
                value={proposalData.projectTitle}
                onChange={(e) =>
                  setProposalData({
                    ...proposalData,
                    projectTitle: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your project, requirements, and goals..."
                value={proposalData.description}
                onChange={(e) =>
                  setProposalData({
                    ...proposalData,
                    description: e.target.value,
                  })
                }
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (Optional)</Label>
                <Input
                  id="budget"
                  placeholder="e.g., $5,000"
                  value={proposalData.budget}
                  onChange={(e) =>
                    setProposalData({
                      ...proposalData,
                      budget: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline (Optional)</Label>
                <Input
                  id="timeline"
                  placeholder="e.g., 2 weeks"
                  value={proposalData.timeline}
                  onChange={(e) =>
                    setProposalData({
                      ...proposalData,
                      timeline: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <Button
              onClick={() => handleProposal(expert.id)}
              disabled={
                submitting ||
                !proposalData.projectTitle.trim() ||
                !proposalData.description.trim()
              }
              className="w-full"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Send Proposal
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
