import React from "react";
import { Card, CardContent } from "../_Common/Card";
import { Separator } from "../../components/_Common/Separator";

export const RightSideBar = () => {
  <div className="w-80 space-y-6">
    <div>
      <h2 className="text-xl font-semibold mb-4">Top Sponsors</h2>
      <Card>
        <CardContent className="p-4">
          <img
            src="/placeholder.svg?height=200&width=300"
            alt="Valvoline"
            width={300}
            height={200}
            className="w-full rounded-lg object-cover mb-3"
          />
          <h3 className="font-medium mb-2">Valvoline</h3>
          <p className="text-sm text-gray-500">
            A high impact brand in the cars and motorbike space.
          </p>
        </CardContent>
      </Card>
    </div>

    <div>
      <h2 className="text-xl font-semibold mb-4">Announcements</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium hover:text-blue-600 cursor-pointer">
            Sponsorship trends
          </h3>
          <p className="text-sm text-gray-500">
            A high impact brand in the cars and motorbike space.
          </p>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium hover:text-blue-600 cursor-pointer">
            Recent partnerships
          </h3>
          <p className="text-sm text-gray-500">
            A high impact brand in the cars and motorbike space.
          </p>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium hover:text-blue-600 cursor-pointer">
            Upcoming ProSponsor events
          </h3>
          <p className="text-sm text-gray-500">
            A high impact brand in the cars and motorbike space.
          </p>
        </div>
      </div>
    </div>
  </div>;
};
