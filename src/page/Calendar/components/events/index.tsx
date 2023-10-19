import { Plus } from "phosphor-react";
import AddEvents from "./components/AddEvents";
import { useState } from "react";
import ListEvents from "./components/ListEvents";

interface EventsProps {
  diaSem: string;
  Date: string;
}

function Events(props: EventsProps) {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  };

  const { diaSem, Date } = props;
  return (
    <section className="w-[38%] font-font-family relative">
      <section className="flex items-center justify-between mt-14 px-10 capitalize">
        <h4 className="text-3xl font-medium text-white">{diaSem}</h4>
        <span className="text-base text-gray-3">{Date}</span>
      </section>
      <section>
        <ListEvents />
      </section>
      <section className="flex absolute bottom-0 right-0 w-full items-end justify-end">
        <section className={active ? "flex" : "hidden"}>
          <AddEvents onClick={handleActive} />
        </section>
        <button
          type="button"
          aria-label="Active Add Event"
          className="border-2 border-gray-3 rounded-full w-[40px] h-[40px] flex items-center justify-center opacity-50  hover:opacity-100"
          onClick={handleActive}
        >
          <Plus size={20} color="#7b829a" weight="bold" />
        </button>
      </section>
    </section>
  );
}

export default Events;
