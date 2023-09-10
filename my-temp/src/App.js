import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // const [jsonData, setJsonData] = useState(null);
  const [filteredData, setFilteredData] = useState({});


  useEffect(() => {
    // Charger le fichier JSON depuis le dossier public
    fetch("/tasks.json")
      .then((response) => response.json())
      .then((data) => setFilteredData(data))
      .catch((error) =>
        console.error("Erreur lors du chargement du JSON :", error)
      );
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <h1>click</h1>
      <h1 className="title" onClick={() => console.log(filteredData)}>
        OHHHH
      </h1>
      <div className="notification is-primary">
        Ceci est une notification Bulma.
      </div>
      <h1>Données JSON depuis /public</h1>
      {filteredData ? (
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default App;
