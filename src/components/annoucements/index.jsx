import React from "react";

const Annoucements = () => {
  const data = [
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
    <div>
      <h1 className="text-[24px] font-[600] pl-6 pr-6 pb-3">Announcements</h1>
      {data.map((items, index) => {
        return (
          <div
            key={index}
            className="pl-6 pr-6 pt-2 pb-2 hover:bg-black hover:text-[#F9FAFB]"
          >
            <h5 className="font-[500] mb-1">{items.title}</h5>
            <p className="text-[#9CA3AF] font-[500]">{items.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Annoucements;
