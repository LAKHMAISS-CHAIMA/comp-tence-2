import axios from "axios";

const BRIEF_SERVICE_URL = "http://localhost:9200";

export const getBriefById = async (id) => {
  try {
    const res = await axios.get(`${BRIEF_SERVICE_URL}/briefs/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération du brief");
  }
};

export const getCompetencesByBrief = async (id) => {
  try {
    const res = await axios.get(`${BRIEF_SERVICE_URL}/briefs/${id}`);
    return res.data.competences; 
  } catch (error) {
    throw new Error("Erreur lors de la récupération des compétences");
  }
};
