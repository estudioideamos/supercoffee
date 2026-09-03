import PageMotion from "@/components/PageMotion";
import PremiumExperience from "@/components/PremiumExperience";
import PremiumFooter from "@/components/PremiumFooter";
import PremiumGallery from "@/components/PremiumGallery";
import PremiumHeader from "@/components/PremiumHeader";
import PremiumMenu from "@/components/PremiumMenu";
import PremiumVisit from "@/components/PremiumVisit";

export default function Home() {
  return (
    <>
      <PageMotion />
      <PremiumHeader />
      <main>
        <PremiumExperience />
        <PremiumMenu />
        <PremiumGallery />
        <PremiumVisit />
      </main>
      <PremiumFooter />
    </>
  );
}
