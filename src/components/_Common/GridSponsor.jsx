import React from "react";

import Statcards from "./StatscardSponsor";
import { ProfileViews } from "./ProfileViews";
import MessagesContainer from "./MessagesContainer";
import OpportunitiesTable from "./OpportunitiesTable";
import ContractsTable from "./ContractsTable";

function GridSponsor() {
  return (
    <>
      <div className="px-4 flex font-bold mb-6">
        {" "}
        <h1>Hey, welcome back!</h1>
      </div>
      <div className="px-4 flex flex-col gap-3 mt-4 pb-6 w-full">
        <div className="flex flex-row gap-3 w-full">
          <Statcards />
          {/* profile views graph */}
          {/* <ProfileViews /> */}
          {/* Messages container */}
        </div>
        <div className="flex flex-row gap-3  ">
          <ProfileViews />
          <MessagesContainer />
          {/* Opportunities/contracts table */}

          {/* <OpportunitiesTable /> */}
        </div>
        <ContractsTable />
      </div>
    </>
  );
}

export default GridSponsor;
