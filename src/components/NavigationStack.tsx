import data from "../data/roleStack.json";
import data_2 from "../data/roles.json";
import { Link } from "react-router-dom";

interface RolesStack {
  id: number;
  sections: string[];
  description: string[];
}

interface Roles {
  id: number;
  title: string;
  icon: string;
}

const NavigationStack = ({ role_id }) => {
  const newData: RolesStack[] = JSON.parse(JSON.stringify(data));
  const newData_2: Roles[] = JSON.parse(JSON.stringify(data_2));

  return (
    <section className="relative min-h-[100vh] flex-col items-center justify-center overflow-hidden  pt-40">
      <img src={newData_2[role_id].icon} className="absolute opacity-10 z-1" />
      <p className="text-xl md:text-xl text-muted-foreground text-center pt-20 pb-10">
        Odaberite područje koje Vas zanima:
      </p>
      <div className="flex flex-col justify-center items-center w-full gap-4">
        {newData[role_id].sections.map((sec, ind) => (
          <Link
            to={`/student/${sec}`}
            key={`${ind}`}
            className="w-full md:w-[60%] bg-white"
          >
            <div className="w-full flex flex-col md:flex-row text-center items-center gap-4 bg-white p-6 rounded-2xl shadow-soft hover:shadow-medium border border-border hover:text-blue-600">
              <h3 className="font-semibold text-lg mb-2">
                {sec.toUpperCase()}
              </h3>{" "}
              <p className="mb-2">- {newData[role_id].description[ind]}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NavigationStack;
