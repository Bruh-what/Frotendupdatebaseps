import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  'pk_test_51LjBQzKeLdFxPBi2uHADEOwCnkprErXbvyVhTna5BUIENMwxCSsXumf9L5tiPe9zaRw7zd8JOK7b0OingfEPXesf00CzGOoxQC'
); // Use your Stripe test public key

const FundAthleteForm = ({ user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    try {
      // Step 1: Create Payment Method
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: { email: user.email },
      });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }
      console.log(paymentMethod);

      // Log the required details instead of calling API
      console.log('Payment Method ID:', paymentMethod.id);
      console.log('Sponsor ID:', user.id);
      console.log('Athlete ID:', 'athlete456');
      console.log('Amount:', amount);
      console.log('Currency:', 'GBP');
      console.log('Email:', user.email);
      console.log('Token:', user.token);

      alert('Check console for logged details!');
    } catch (err) {
      console.error('Error:', err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Fund Athlete'}
      </button>
    </form>
  );
};

const dummyUser = {
  id: 'user123',
  email: 'testuser@example.com',
  token: 'dummy-jwt-token',
};

const FundAthlete = () => (
  <Elements stripe={stripePromise}>
    <FundAthleteForm user={dummyUser} />
  </Elements>
);

export default FundAthlete;
