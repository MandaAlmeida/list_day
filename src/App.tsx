import { Outlet } from "react-router-dom";
import Header from "./components/header";

function App() {
  return (
    <div className="px-[100px] pt-[50px]">
      <Header />
      <main className="bg-gray-4 mt-10 rounded-lg h-[770px] p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
