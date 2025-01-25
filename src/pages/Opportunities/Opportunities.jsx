// import { useState } from "react";
// import { Search, Filter } from "lucide-react";
// import { Input } from "../../components/_Common/Input";
// import { Card, CardContent, CardFooter } from "../../components/_Common/Card";
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "../../components/_Common/Avatar";
// import { Badge } from "../../components/_Common/Badge";

// const opportunities = [
//   {
//     id: 1,
//     title: "Summer Motocross Championship",
//     image: "/placeholder.svg?height=200&width=300",
//     price: 5000,
//     duration: "3 months",
//     location: "California, USA",
//     sport: "Motocross",
//     athleteName: "James Murray",
//     athleteImage: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: 2,
//     title: "Winter Snowboarding Series",
//     image: "/placeholder.svg?height=200&width=300",
//     price: 7500,
//     duration: "4 months",
//     location: "Aspen, Colorado",
//     sport: "Snowboarding",
//     athleteName: "Sarah Johnson",
//     athleteImage: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: 3,
//     title: "City Marathon Sponsorship",
//     image: "/placeholder.svg?height=200&width=300",
//     price: 10000,
//     duration: "1 year",
//     location: "New York City, USA",
//     sport: "Running",
//     athleteName: "Michael Chen",
//     athleteImage: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: 4,
//     title: "Pro Surfing Tour",
//     image: "/placeholder.svg?height=200&width=300",
//     price: 8000,
//     duration: "6 months",
//     location: "Gold Coast, Australia",
//     sport: "Surfing",
//     athleteName: "Emma Wilson",
//     athleteImage: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: 5,
//     title: "European Soccer League",
//     image: "/placeholder.svg?height=200&width=300",
//     price: 15000,
//     duration: "9 months",
//     location: "Multiple Cities, Europe",
//     sport: "Soccer",
//     athleteName: "Luca Rossi",
//     athleteImage: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     id: 6,
//     title: "Extreme Mountain Biking Challenge",
//     image: "/placeholder.svg?height=200&width=300",
//     price: 6000,
//     duration: "2 months",
//     location: "Whistler, Canada",
//     sport: "Mountain Biking",
//     athleteName: "Alex Tremblay",
//     athleteImage: "/placeholder.svg?height=40&width=40",
//   },
// ];

// export default function OpportunitiesPage() {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredOpportunities = opportunities.filter(
//     (opp) =>
//       opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       opp.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       opp.location.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Sponsorship Opportunities</h1>
//         <a href="/opportunities/create">
//           <button className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs">
//             Create opportunity
//           </button>
//         </a>
//       </div>

//       <div className="flex items-center gap-4 mb-8">
//         <div className="relative flex-grow">
//           <Input
//             type="text"
//             placeholder="Search opportunities..."
//             className="pl-10"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//         </div>
//         <button className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs flex items-center gap-2">
//           <Filter className="h-4 w-4" />
//           Filters
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredOpportunities.map((opportunity) => (
//           <Card key={opportunity.id} className="overflow-hidden">
//             <img
//               src={opportunity.image}
//               alt={opportunity.title}
//               className="w-full h-48 object-cover"
//             />
//             <CardContent className="p-4">
//               <h2 className="text-xl font-semibold mb-2">
//                 {opportunity.title}
//               </h2>
//               <p className="text-gray-600 mb-2">{opportunity.location}</p>
//               <div className="flex items-center gap-2 mb-2">
//                 <Badge variant="secondary">{opportunity.sport}</Badge>
//                 <Badge variant="outline">{opportunity.duration}</Badge>
//               </div>
//               <p className="text-lg font-bold">
//                 ${opportunity.price.toLocaleString()}
//               </p>
//             </CardContent>
//             <CardFooter className="bg-gray-50 p-4 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Avatar>
//                   <AvatarImage src={opportunity.athleteImage} />
//                   <AvatarFallback>{opportunity.athleteName[0]}</AvatarFallback>
//                 </Avatar>
//                 <span className="text-sm font-medium">
//                   {opportunity.athleteName}
//                 </span>
//               </div>
//               <button className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs">
//                 View Details
//               </button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { Card, CardContent, CardFooter } from '../../components/_Common/Card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/_Common/Avatar';
import { Badge } from '../../components/_Common/Badge';
import { supabase } from '../../lib/supabaseClient';
import axios from 'axios';
import { PROSPONSER } from '../../https/config';

// Sample logged-in athlete's data (you'd replace this with actual authentication data)
const loggedInAthlete = {
  id: 1,
  name: 'James Murray',
  image: '/placeholder.svg?height=40&width=40',
};

const athleteOpportunities = [
  {
    id: 1,
    title: 'Motocross Magazine Editorial',
    image:
      'https://img.freepik.com/free-psd/sport-ad-template-poster_23-2148758030.jpg?t=st=1734336695~exp=1734340295~hmac=6d92549e97838d321212698624ad3faf1af45ab51d68cd7792d58861ca9c0301&w=740',
    price: 5000,
    duration: '3 months',
    location: 'California, USA',
    sport: 'Motocross',
    athleteName: 'James Murray',
    athleteImage: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    title: 'Winter Snowboarding Series',
    image:
      'https://img.freepik.com/free-photo/male-snowboarder-doing-tricks-air-ski-resort_651396-2164.jpg?t=st=1734336760~exp=1734340360~hmac=51735c9003f4888838b3cb7dd2264f0cd646189a7ec0c4e8394fe38c858d3db2&w=740',
    price: 7500,
    duration: '4 months',
    location: 'Aspen, Colorado',
    sport: 'Snowboarding',
    athleteName: 'James Murray',
    athleteImage: '/placeholder.svg?height=40&width=40',
  },
  // Add more opportunities as needed
];

export default function MyOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);

  // Simulating fetching athlete's opportunities (in a real app, you'd fetch data from an API)

  const fetchOpportunities = async () => {
    const { data, error } = await supabase.auth.getSession();
    const token = data.session.access_token;
    let userid = data.session.user.id;

    // Construct JSON object from formData
    const opportunityData = {
      athleteId: userid,
    };

    try {
      const response = await PROSPONSER.post(
        '/opportunities/getopportunities',
        opportunityData,
        {
          headers: {
            'Content-Type': 'application/json', // Set Content-Type to JSON
            Authorization: `Bearer ${token}`, // Include Supabase token
          },
        }
      );

      console.log('Opportunity created:', response.data);
      setOpportunities(response.data);
    } catch (error) {
      console.error('Error creating opportunity:', error);
      alert('Failed to create opportunity.');
    }
  };
  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold mb-6">
          My Sponsorship Opportunities
        </h1>
        <Link to="/CreateOpportunity">
          <button className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 rounded-full shadow-xs">
            Create Opportunity
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.length === 0 ? (
          <div className="col-span-3 text-center text-lg text-gray-600">
            You have no created opportunities yet. Create one to get started!
          </div>
        ) : (
          opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="overflow-hidden">
              {/* <img
                src={opportunity.image}
                alt={opportunity.title}
                className="w-full h-60 object-cover"
              /> */}
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {opportunity.title}
                </h2>
                <p className="text-gray-600 mb-2">{opportunity.location}</p>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{opportunity.sport}</Badge>
                  <Badge variant="outline">{opportunity.duration} Months</Badge>
                </div>
                <p className="text-lg font-bold">
                  ${opportunity.priceAsk.toLocaleString()}
                </p>
              </CardContent>
              <CardFooter className="bg-[#FEFEFE] p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={opportunity.athleteImage} />
                    <AvatarFallback>{opportunity.athleteName}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {opportunity.athleteName}
                  </span>
                </div>
                <Link to={`/opportunities/${opportunity.id}`}>
                  <button className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6  rounded-full shadow-xs">
                    View Details
                  </button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
