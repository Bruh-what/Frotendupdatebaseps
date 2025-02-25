import React from "react";

const Annoucements = ({ announcementData }) => {
  return (
    <div>
      {announcementData ? (
        <h1 className="text-[24px] font-[600] pl-6 pr-6 pb-2">Announcements</h1>
      ) : (
        ""
      )}

      {announcementData?.map((items, index) => {
        return (
          <div
            key={index}
            className="pl-6 pr-6  pb-2 transition delay-50 ease-in hover:bg-black hover:cursor-pointer hover:text-[#F9FAFB]"
          >
            <h5 className="font-[500] mb-1">{items.title}</h5>
            <p className="text-[#9CA3AF] hover:text-yellow-50 font-[500]">
              {items.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Annoucements;
