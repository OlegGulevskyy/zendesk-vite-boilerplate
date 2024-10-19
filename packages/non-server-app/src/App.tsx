import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useZaf } from "./hooks/use-zaf";

function App() {
  const [count, setCount] = useState(0);
  const { zafClient } = useZaf();
  const [ticketId, setTicketId] = useState<number>(0);

  useEffect(() => {
    zafClient?.get("ticket").then((data) => {
      setTicketId(data["ticket"].id);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-4">
      <div className="flex flex-row gap-4">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p className="mx-auto font-bold text-zinc-700">Ticket ID: {ticketId}</p>
      <div className="flex flex-col">
        <button
          className="bg-indigo-300 p-2 rounded-md mx-auto"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;
