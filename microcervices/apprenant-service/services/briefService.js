import axios from "axios";

const BRIEF_SERVICE_URL = process.env.BRIEF_SERVICE_URL || 'http://localhost:3000';

export const getBriefById = async (id) => {
  try {
    const res = await axios.get(`${BRIEF_SERVICE_URL}/briefs/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération du brief");
  }
};

export async function getCompetencesByBriefId(briefId) {
  try {
    const response = await axios.get(`${BRIEF_SERVICE_URL}/briefs/${briefId}/competences`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Erreur Brief-Service (${error.response.status}): ${error.response.data?.error || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Aucune réponse du Brief-Service');
    } else {
      throw new Error('Erreur lors de la requête Brief-Service: ' + error.message);
    }
  }
}
