import "./App.css";
import Clients from "./models/Clients";
import ClientForm from "./models/ClientForm";

function App() {
  return (
    <div className="App">
      <h1>Humanz Home Assignmant</h1>

      <ClientForm></ClientForm>
      <Clients></Clients>
    </div>
  );
}

export default App;
