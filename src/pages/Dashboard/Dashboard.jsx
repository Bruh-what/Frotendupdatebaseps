import React from "react";
import Grid from "../../components/_Common/Grid";
import GridSponsor from "../../components/_Common/GridSponsor";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { role } = useAuth();
  return (
    <>
      <div className="bg-white w-full p-4 mt-4">
        {/* <Topbar /> */}
        {role === "athlete" ? <Grid /> : <GridSponsor />}
      </div>
    </>
  );
};

export default Dashboard;
