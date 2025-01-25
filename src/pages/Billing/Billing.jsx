import { Trash2 } from "lucide-react";

import { Card, CardContent } from "../../components/_Common/Card";

const Billing = () => {
  return (
    <div className="container px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Billing & Payments</h1>

      <p className="text-gray-500 mb-6">
        Please note that the same card will be used for any contract withdrawals
        to your account.
      </p>

      <div className="space-y-4">
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-[#1A1F71] rounded flex items-center justify-center">
                <span className="text-white font-bold">VISA</span>
              </div>
              <div>
                <p className="font-medium">Visa ending 2434</p>
                <p className="text-sm text-gray-500">Exp date 02/26</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button variant="link" className="text-primary">
                Set as Default
              </button>
              <button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-[#FF5F00] rounded flex items-center justify-center">
                <span className="text-white font-bold">MC</span>
              </div>
              <div>
                <p className="font-medium">Mastercard ending 3456</p>
                <p className="text-sm text-gray-500">Exp date 02/28</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button variant="link" className="text-primary">
                Set as Default
              </button>
              <button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="flex justify-center gap-4 mb-4">
                <div className="w-12 h-8 bg-[#1A1F71] rounded flex items-center justify-center">
                  <span className="text-white font-bold">VISA</span>
                </div>
                <div className="w-12 h-8 bg-[#FF5F00] rounded flex items-center justify-center">
                  <span className="text-white font-bold">MC</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Add a credit or debit card for payments and billing
              </h3>
              <p className="text-gray-500 mb-4">
                You will be redirected to a secure stripe portal for attaching
                your card.
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
