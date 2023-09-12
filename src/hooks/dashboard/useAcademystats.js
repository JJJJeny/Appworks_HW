import useSWRFetch from "../useSWRFetch";

const reorganizeData = (data) => {
  const reorganizedData = {};

  // Iterate over the keys of the original data
  Object.keys(data).forEach((key) => {
    // Define your custom mapping logic here
    let newLabel = "其他";

    // Example: If key contains "Information Management", change it to "College of Management"
    if (key.includes("心理所一般組") ||
      key.includes("物理學系") ||
      key.includes("心理學系") ||
      key.includes("數學系") ||
      key.includes("電機工程學系") ||
      key.includes("生物機電工程學系") ||
      key.includes("材料科學與工程學系") ||
      key.includes("工程科學及海洋工程學系") ||
      key.includes("醫學工程學系") ||
      key.includes("生醫電資所") ||
      key.includes("資訊工程研究所")) {
      newLabel = "理工學院";
    } else if (key.includes("創新領域學士學位學程")) {
      newLabel = "創新學院";
    } else if (key.includes("經濟學系") ||
      key.includes("科際整合法律學研究所") ||
      key.includes("經濟系")) {
      newLabel = "社科學院";
    } else if (key.includes("工商管理學系 科技管理組") ||
      key.includes("工商管理學系") ||
      key.includes("會計學系") ||
      key.includes("國際企業學系") ||
      key.includes("資訊管理學系")) {
      newLabel = "管理學院";
    }

    // Aggregate values based on the newLabel
    if (!reorganizedData[newLabel]) {
      reorganizedData[newLabel] = 0;
    }

    reorganizedData[newLabel] += data[key];
  });

  return reorganizedData;
};



const useAcademystats = () => {
  const { data } = useSWRFetch("https://api.projectszero.tech/getAcademyStats");
  const reorganizedData = data && reorganizeData(data);
  return {
    labels: data && Object.keys(reorganizedData),
    values: data && Object.values(reorganizedData)
  };
};

export default useAcademystats;
