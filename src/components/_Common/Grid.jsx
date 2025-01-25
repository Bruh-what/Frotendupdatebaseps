import React from 'react';

import Statcards from './Statcards';
import { ProfileViews } from './ProfileViews';
import MessagesContainer from './MessagesContainer';
import OpportunitiesTable from './OpportunitiesTable';

function Grid() {
  return (
    <>
      <div className="px-4 text-2xl font-bold mb-6">
        {' '}
        <h1>Hey, welcome back!</h1>
      </div>
      <div className="px-4 flex gap-6 mt-4 flex-col pb-6">
        <Statcards />
        {/* profile views graph */}
        <div className="flex w-full gap-3">
          <ProfileViews />
          {/* Messages container */}
          <MessagesContainer />
          {/* Opportunities/contracts table */}
        </div>

        <OpportunitiesTable />
      </div>
    </>
  );
}

export default Grid;
