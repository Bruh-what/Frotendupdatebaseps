const UpgradeToPro = () => {
  return (
    <div className="max-h-fit flex flex-col justify-center gap-3 rounded-[18px] p-3  bg-gradient-to-b from-[#F6F6F6] via-[rgba(255,250,250,0.89)] to-transparent h-screen">
      <p className="text-[17.5px] font-[700]">Upgrade to Pro</p>
      <p className="text-[#9CA3AF] text-sm font-[500]">
        Invite 3 friends and get free access to the pro version.
      </p>
      <button className="bg-[#4F46E5] transition duration-300 hover:bg-[#4338CA] text-sm p-1.5 rounded-[46px] text-white">
        Upgrade
      </button>
    </div>
  );
};

export default UpgradeToPro;
