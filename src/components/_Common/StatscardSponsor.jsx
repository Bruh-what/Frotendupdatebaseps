import React, { useState, useEffect } from 'react';
import { FiFile, FiTrendingDown, FiTrendingUp } from 'react-icons/fi';
import { supabase } from '../../lib/supabaseClient';
import { PROSPONSER } from '../../https/config';

function Statcards() {
  const [activeContractsCount, setActiveContractsCount] = useState(0);
  const [pendingContractsCount, setPendingContractsCount] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        // Get session
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();
        if (sessionError) throw error;

        const token = sessionData.session.access_token;
        const userId = sessionData.session.user.id;

        // Fetch contracts
        const response = await PROSPONSER.get('/contracts', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter contracts where user is involved
        const userContracts = response.data.filter(
          (contract) =>
            contract.sponsorId === userId || contract.athleteId === userId
        );

        // Count pending contracts
        const pendingContracts = userContracts.filter(
          (contract) => contract.status.toLowerCase() === 'pending'
        );
        setPendingContractsCount(pendingContracts.length);

        // Calculate total spending from active contracts
        const activeContracts = userContracts.filter(
          (contract) => contract.status.toLowerCase() === 'active'
        );
        setActiveContractsCount(activeContracts.length);

        // Sum total price of active contracts
        const totalAmount = activeContracts.reduce(
          (sum, contract) => sum + (contract.totalPrice || 0),
          0
        );
        setTotalSpending(totalAmount);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, []);

  if (isLoading)
    return (
      <div className="container flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  if (isLoading) <div>loading...</div>;
  return (
    <>
      <Card
        title="Total spending"
        value={`$${totalSpending.toLocaleString()}`}
        pillText="2.75%"
        trend="up"
        // period="From Jan 1st - Jul 31st"
      />
      <Card
        title="Active contracts"
        value={activeContractsCount}
        pillText={`${
          activeContractsCount > 0 ? '+' : ''
        }${activeContractsCount}%`}
        trend={activeContractsCount > 0 ? 'up' : 'down'}
        // period="From Jan 1st - Jul 31st"
      />
      <Card
        title="Pending contracts"
        value={pendingContractsCount}
        pillText={`${
          pendingContractsCount > 0 ? '+' : ''
        }${pendingContractsCount}%`}
        trend={pendingContractsCount > 0 ? 'up' : 'down'}
        // period="Previous 365 days"
      />
    </>
  );
}

const Card = (props) => {
  const { title, value, pillText, trend, period } = props;

  return (
    <div className="border col-span-4 p-4 rounded-2xl shadow-[0px_0.2px_20px_0.2px_#edf2f7] w-1/3">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === 'up'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span>
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};

export default Statcards;
