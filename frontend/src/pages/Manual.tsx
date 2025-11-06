import Navbar from "@/components/Navbar";
import NavigationStack from "@/components/NavigationStack";
import data from "../data/pathId.json";
import { useParams } from "react-router-dom";

interface StudentProps {
  path: string;
  id: number;
}

const Manual = () => {
  const { path } = useParams();
  const newData: StudentProps[] = JSON.parse(JSON.stringify(data));

  const item = data.find((item) => item.path === path);

  return (
    <>
      <Navbar />
      <NavigationStack role_id={item.id} />
    </>
  );
};

export default Manual;
