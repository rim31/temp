import { useEffect, useState } from "react";
import "./App.css";
import JobCard from "./JobCard";

function App() {
  // const [jsonData, setJsonData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

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
      <h1 className="notification is-primary">Offres d'emploi</h1>
      <h1
        className="title"
        onClick={() => console.log("DEBUG ;-) ", filteredData)}
      >
        Offres d'emploi
      </h1>
      <div className="columns is-multiline">
        {/* Utilisez la classe is-multiline pour permettre un retour à la ligne automatique */}
        {filteredData.map((job) => (
          <div className="column is-4" key={job.id}>
            {/* Utilisez la classe is-4 pour spécifier que chaque colonne occupe 4 unités sur 12 (pour créer une disposition en 3 colonnes sur grand écran) */}
            <JobCard job={job} />
          </div>
        ))}
      </div>

      {/* {filteredData.map((job) => (
        <div className="column is-4" key={job.id}>
          <JobCard job={job} onClick={() => console.log("job", job)} />
        </div>
      ))} */}

      {filteredData ? (
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default App;
