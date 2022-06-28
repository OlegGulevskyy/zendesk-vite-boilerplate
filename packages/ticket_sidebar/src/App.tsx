import React from "react";
import logo from "./logo.svg";
import "./App.css";
import zafClient from "@app/zendesk/sdk";

function App() {
  const [assignee, setAssignee] = React.useState("");

  const setTicketAssignee = async () => {
    const { ticket } = await zafClient.get("ticket");
    setAssignee(ticket.assignee.user.name || "Someone awesome!");
  };

  React.useEffect(() => {
    setTicketAssignee();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello {assignee}!</p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
