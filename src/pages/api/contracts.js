import axios from "axios";
const backendUrl = import.meta.env.NEXT_PUBLIC_BACKEND_URL;

export default async function handler(req, res) {
  try {
    const response = await axios.get(`${backendUrl}/contracts`);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contracts" });
  }
}
