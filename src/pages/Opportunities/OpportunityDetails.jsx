import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Trash2, ArrowLeft } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Delete Opportunity
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Are you sure you want to delete this opportunity? This action cannot
          be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function OpportunityDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { opportunity } = location.state || {};
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!opportunity) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No opportunity data found</p>
      </div>
    );
  }

  const formatDate = (dateString) =>
    format(new Date(dateString), "dd MMM yyyy");

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const { data: sessionData } = await supabase.auth.getSession();

      await PROSPONSER.delete(`/opportunities/${opportunity._id}`, {
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });

      navigate("/opportunities", { replace: true });
    } catch (error) {
      console.error("Error deleting opportunity:", error);
    } finally {
      setIsDeleting(false);
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {opportunity.title}
                </h1>
                <p className="text-gray-600">{opportunity.athleteName}</p>
              </div>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  opportunity.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {opportunity.isActive ? "Active" : "Closed"}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {opportunity.sport}
              </span>
              <span className="text-2xl font-bold text-gray-900">
                ${opportunity.priceAsk?.toLocaleString()}
              </span>
              <span className="text-gray-500">
                {opportunity.duration} months
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-1">
                  Location
                </h2>
                <p className="text-gray-900">{opportunity.location}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-1">
                  Created
                </h2>
                <p className="text-gray-900">
                  {formatDate(opportunity.createdAt)}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-1">
                  Last Updated
                </h2>
                <p className="text-gray-900">
                  {formatDate(opportunity.updatedAt)}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-gray-600 whitespace-pre-line">
                {opportunity.description}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Benefits
              </h2>
              <p className="text-gray-600 whitespace-pre-line">
                {opportunity.benefits}
              </p>
            </div>

            {/* <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Opportunity ID: </span>
                  <span className="font-mono text-gray-900">
                    {opportunity._id}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Athlete ID: </span>
                  <span className="font-mono text-gray-900">
                    {opportunity.athleteId}
                  </span>
                </div>
              </div>
            </div> */}

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center px-6 py-2 gap-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="inline-flex items-center px-6 py-2 gap-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Opportunity
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
