import axios from "axios";

export const fetchAndKill = async (url: string) => {
  const { data } = await axios.get(url);

  console.log(data);

  process.exit(0);
};
