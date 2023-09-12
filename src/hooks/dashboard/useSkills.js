import axios from "axios";
import { useState, useEffect } from "react";

const useSkills = (studentId) => {
  const [skills, setSkills] = useState({
    labels: [
      "UIUX",
      "backend",
      "business analysis",
      "design thinking",
      "frontend"
    ],
    values: [0, 0, 0, 0, 0]
  });

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`https://api.projectszero.tech/skills/${studentId}`);
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills data:", error);
    }
  };

  useEffect(() => {
    fetchData(studentId);
  }, [studentId]);

  // Add a loading check and return loading state if skills are null
  if (!skills) {
    return {
      labels: [],
      values: [],
    };
  }

  return {
    labels: Object.keys(skills),
    values: [
      skills.UIUX,
      skills.backend,
      skills["business analysis"],
      skills["design thinking"],
      skills.frontend,
    ],
  };
};

export default useSkills;

