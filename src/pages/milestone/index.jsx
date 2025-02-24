import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const MilestoneManager = () => {
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      title: "Project Start",
      description: "Initial project funding and kickoff.",
      amount: 7250,
      status: "Active & Funded",
      submitted: false,
    },
  ]);

  const [earnings, setEarnings] = useState({
    received: 0,
    funded: 7250,
    projectPrice: 14500,
  });

  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    amount: 0,
  });

  const [showForm, setShowForm] = useState(false);

  // Add new milestone
  const addMilestone = () => {
    if (
      newMilestone.title &&
      newMilestone.description &&
      newMilestone.amount > 0
    ) {
      const newMilestoneData = {
        id: milestones.length + 1,
        title: newMilestone.title,
        description: newMilestone.description,
        amount: parseFloat(newMilestone.amount),
        status: "Pending",
        submitted: false,
      };

      setMilestones([...milestones, newMilestoneData]);
      setEarnings((prev) => ({
        ...prev,
        funded: prev.funded + newMilestoneData.amount,
      }));

      // Reset form
      setNewMilestone({ title: "", description: "", amount: 0 });
      setShowForm(false);
    }
  };

  // Submit work for review
  const submitForReview = (id) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: "Work Submitted", submitted: true } : m
      )
    );
  };

  // Submit revision
  const submitRevision = (id) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: "Revision Submitted" } : m
      )
    );
  };

  return (
    <div className="w-[900px] max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Milestone Timeline</h2>

      <div className="border-l-4 border-green-500 pl-6 space-y-6">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="relative">
            <div className="absolute left-[-38px] top-[-5px] w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-full">
              {index + 1}
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{milestone.title}</h3>
                <span className="text-sm px-2 py-1 bg-green-200 text-green-800 rounded">
                  {milestone.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{milestone.description}</p>
              <p className="text-lg font-semibold">
                ${milestone.amount.toFixed(2)}
              </p>

              {milestone.status === "Active & Funded" &&
                !milestone.submitted && (
                  <button
                    onClick={() => submitForReview(milestone.id)}
                    className="mt-2 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Submit for Review
                  </button>
                )}

              {milestone.status === "Work Submitted" && (
                <div className="mt-2 p-2 bg-yellow-100 text-yellow-700 rounded">
                  Work submitted for review
                  <p className="text-sm">6 days ago</p>
                  <button
                    onClick={() => submitRevision(milestone.id)}
                    className="mt-2 py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Submit Revision
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {milestones.length < 4 && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 text-green-600 font-medium hover:text-green-800"
          >
            <FaPlusCircle className="text-green-500 text-2xl" /> Propose New
            Milestone
          </button>
        )}

        {showForm && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-medium">New Milestone</h3>
            <input
              type="text"
              placeholder="Milestone Title"
              value={newMilestone.title}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, title: e.target.value })
              }
              className="w-full mt-2 p-2 border rounded"
            />
            <textarea
              placeholder="Milestone Description"
              value={newMilestone.description}
              onChange={(e) =>
                setNewMilestone({
                  ...newMilestone,
                  description: e.target.value,
                })
              }
              className="w-full mt-2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Amount ($)"
              value={newMilestone.amount}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, amount: e.target.value })
              }
              className="w-full mt-2 p-2 border rounded"
            />
            <div className="flex gap-4 mt-2">
              <button
                onClick={addMilestone}
                className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add Milestone
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold">Earnings</h3>
        <div className="relative h-2 bg-gray-300 rounded-full">
          <div
            className="absolute top-0 left-0 h-2 bg-green-500 rounded-full"
            style={{
              width: `${(earnings.funded / earnings.projectPrice) * 100}%`,
            }}
          />
        </div>
        <p className="mt-2 text-sm">
          <span className="font-semibold">Received:</span> $
          {earnings.received.toFixed(2)}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Funded (Escrow):</span> $
          {earnings.funded.toFixed(2)}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Project Price:</span> $
          {earnings.projectPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default MilestoneManager;
