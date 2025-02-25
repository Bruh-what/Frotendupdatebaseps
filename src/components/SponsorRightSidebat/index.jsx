import Annoucements from "../annoucements";
import FeatureSponsor from "../featureSponsors";
import imageOne from "../../assets/images/Rectangle 34624146.png";

const SponsorSidebar = () => {
  const featuresData = [
    {
      title: "FeatureSponsor",
      img: imageOne,
      name: "Can motosports",
      description: "A high impact brand in the cars and motorbike space.",
    },
  ];
  const announcementData = [
    {
      title: "Sponsorship trends",
      description: "A high impact brand in the cars and motorbike space.",
    },
    {
      title: "Sponsorship trends",
      description: "A high impact brand in the cars and motorbike space.",
    },
  ];
  return (
    <div className="bg-[#F9FAFB]  flex flex-col gap-4 pt-6">
      <FeatureSponsor featuresData={featuresData} />
      <Annoucements announcementData={announcementData} />
    </div>
  );
};
export default SponsorSidebar;
