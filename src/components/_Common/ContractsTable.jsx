import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { PROSPONSER } from '../../https/config';

const ContractsTable = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const fetchContracts = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('No authenticated session');

      const response = await PROSPONSER.get('/contracts', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      // Filter contracts for current user (sponsor)
      const userContracts = response.data.filter(
        (contract) => contract.sponsorId === session.user.id
      );
      setContracts(userContracts);
    } catch (error) {
      console.error('Error fetching contracts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  if (loading) return <div>Loading contracts...</div>;

  return (
    <div className="col-span-12 space-y-4 mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recent Contracts</h2>
      </div>

      <div className="space-y-2">
        {contracts.map((contract) => (
          <div
            key={contract._id}
            className="flex items-center justify-between p-4 rounded-2xl bg-gray-50"
          >
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900">
                {contract.sport} Contract
              </h3>
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-500">
                  ${contract.totalPrice?.toLocaleString()}
                </p>
                <span className="text-sm text-gray-400">•</span>
                {/* <p className="text-sm text-gray-500">
                  Milestones: {contract.completedMilestones}/
                  {contract.totalMilestones}
                </p> */}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                  contract.status
                )}`}
              >
                {contract.status.charAt(0).toUpperCase() +
                  contract.status.slice(1)}
              </span>

              <Link
                to={`/contracts/${contract._id}`}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <Eye className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}

        {contracts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No contracts found
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractsTable;
