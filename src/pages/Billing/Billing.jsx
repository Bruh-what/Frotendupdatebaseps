import { Trash2 } from "lucide-react";

import { Card, CardContent } from "../../components/_Common/Card";
import VisaLogo from "../../assets/visa.svg";
import mcLogo from "../../assets/cdt.svg";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";
const Billing = () => {
  const { role } = useAuth(); //get role
  const [stripeId, setStripeId] = useState("");
  const [userId, setUserId] = useState("");
  const [data, setData] = useState();
  const handleStripeId = (e) => {
    setStripeId(e.target.value);
  };
  const fetchData = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) throw new Error("No authenticated session");
      const userId = sessionData.session.user.id;
      setUserId(userId);

      const response = await PROSPONSER.get(
        `/athletes/profile/${sessionData.session.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionData.session.access_token}`,
          },
        }
      );
      setData(response.data);
      setStripeId(response?.data?.stripeAccountId || "");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container  py-8 px-[36px]">
      <h1 className="text-[32px] font-bold mb-6">Billing & Payments</h1>

      <p className="text-[#111827] text-[16px] font-medium mb-6">
        {role === "athlete"
          ? "Please Provide your Stripe ID"
          : "Please note that the same card will be used for any contract withdrawals to your account."}
      </p>

      {role === "athlete" ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Stripe Payment"
            className="border rounded-md p-2 w-96"
            value={stripeId}
            onChange={handleStripeId}
          />
          <button className="w-52 py-2 text-white font-medium hover:bg-[#585ae6] bg-[#6366F1] border border-none rounded-[20px]">
            Confirm
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="rounded-[20px] bg-[#F3F4F6] border border-gray-150 max-w-xl">
            <CardContent className="flex items-center justify-between  h-[90px]  rounded-[20px] ">
              <div className="flex items-center gap-4">
                <div>
                  <img src={VisaLogo} alt="Visa" className="w-18 h-14" />
                </div>
                <div>
                  <p className="font-medium">Visa ending 2434</p>
                  <p className="text-sm text-[#9CA3AF] font-medium">
                    Exp date 02/26
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  variant="link"
                  className="text-primary text-[#6366F1] font-[600]"
                >
                  Set as Default
                </button>
                <button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[20px] bg-[#F3F4F6] border border-gray-150 max-w-xl">
            <CardContent className="flex items-center justify-between  h-[90px]  rounded-[20px] ">
              <div className="flex items-center gap-4">
                <div>
                  <img src={mcLogo} alt="Visa" className="w-18 h-14" />
                </div>
                <div>
                  <p className="font-medium">Mastercard ending 3456</p>
                  <p className="text-sm text-[#9CA3AF] font-medium">
                    Exp date 02/28
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  variant="link"
                  className="text-primary  font-[600] text-[#6366F1]"
                >
                  Set as Default
                </button>
                <button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[20px]  bg-[#F3F4F6] border border-gray-150 max-w-xl py-2">
            <CardContent className="rounded-[20px]">
              <div className="text-center ">
                <div className="flex justify-center gap-4 mb-4">
                  <div>
                    <img src={VisaLogo} alt="Visa" className="w-14 h-10" />
                  </div>
                  <div>
                    <img src={mcLogo} alt="Visa" className="w-14 h-10" />
                  </div>
                </div>
                <h3 className="text-[24px] font-semibold mb-2 ">
                  Add a credit or debit card for <br /> payments and billing
                </h3>
                <p className="text-[#9CA3AF] mb-4">
                  You will be redirected to a secure stripe portal <br /> for
                  attaching your card.
                </p>
                <button class="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 rounded-full shadow-xs">
                  Add a card
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Billing;
