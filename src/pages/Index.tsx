import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import TwoAnswers from "@/components/landing/TwoAnswers";
import Management from "@/components/landing/Management";
import HowItWorks from "@/components/landing/HowItWorks";
import WhyAndPersonas from "@/components/landing/WhyAndPersonas";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <TwoAnswers />
      <Management />
      <HowItWorks />
      <WhyAndPersonas />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
