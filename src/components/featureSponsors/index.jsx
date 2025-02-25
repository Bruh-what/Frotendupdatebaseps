import React from "react";
import imageOne from "../../assets/images/Rectangle 34624146.png";
const FeatureSponsor = ({ featuresData }) => {
  return (
    <>
      {featuresData?.map((items, index) => {
        return (
          <div key={index} className="p-6">
            <h1 className="text-[24px] font-[600] pt-4 pb-4">{items.title}</h1>
            <div>
              <img src={items.img} alt="" />
            </div>
            <div className="pt-4">
              <h6 className="text-[#111827] font-[600]">{items.name}</h6>
              <p className="text-[#9CA3AF] font-[500]">{items.description}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FeatureSponsor;
