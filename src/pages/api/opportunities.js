import axios from "axios";
const backendUrl = import.meta.env.NEXT_PUBLIC_BACKEND_URL;

export default async function handler(req, res) {
  console.log(req.body);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token

    // Forward the request body to the opportunities API
    const { data } = await axios.post(
      `${backendUrl}/opportunities`,
      req.body, // Pass the request body to the API
      {
        headers: {
          "Content-Type": "application/json", // Ensure the request is sent as JSON
          Authorization: `Bearer ${token}`, // Pass the token to the API,
        },
      }
    );

    res.status(200).json(data); // Return the response data to the client
  } catch (error) {
    console.error("Error creating opportunity:", error.message);
    res.status(500).json({ error: "Failed to create opportunity" });
  }
}

// New endpoint to fetch all opportunities
export async function getAllOpportunities() {
  const response = await axios.get("/api/opportunities");
  return response.data;
}
