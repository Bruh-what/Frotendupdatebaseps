import { Trash2 } from "lucide-react";

import { Card, CardContent } from "../../components/_Common/Card";
import VisaLogo from "../../assets/visa.svg"; // Adjust path as needed
import mcLogo from "../../assets/cdt.svg"; // Adjust path as needed

const Billing = () => {
  return (
    <div className="container px-10 py-8 max-w-3xl">
      <h1 className="text-[32px] font-bold mb-6">Billing & Payments</h1>

      <p className="text-[#111827] text-[16px] font-medium mb-6">
        Please note that the same card will be used for any contract withdrawals
        to your account.
      </p>

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
                className="text-primary text-[#6366F1] font-[600]">
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
                className="text-primary  font-[600] text-[#6366F1]">
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
    </div>
  );
};

export default Billing;
