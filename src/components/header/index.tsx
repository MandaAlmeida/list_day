import { useLocation } from "react-router-dom";
import Button from "../button";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="flex justify-between">
      <div className="flex gap-4">
        <Button
          link="/"
          className={
            currentPath === "/"
              ? "bg-gray-3 text-white"
              : "bg-gray-1 text-gray-3"
          }
          title="Calendário"
        />
        <Button
          link="/anotacoes"
          title="Agenda"
          className={
            currentPath === "/anotacoes"
              ? "bg-gray-3 text-white"
              : "bg-gray-1 text-gray-3"
          }
        />
      </div>
      <Button
        link="/lista-do-dia"
        title="Lista do dia"
        className={
          currentPath === "/lista-do-dia"
            ? "bg-gray-3 text-white"
            : "bg-gray-1 text-gray-3"
        }
      />
    </header>
  );
}

export default Header;
