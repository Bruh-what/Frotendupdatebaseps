import Annoucements from "../annoucements";
import FeatureSponsor from "../featureSponsors";

const SponsorSidebar = () => {
  return (
    <div className="bg-[#F9FAFB]  flex flex-col gap-4 pt-6">
      <FeatureSponsor />
      <Annoucements />
    </div>
  );
};
export default SponsorSidebar;
