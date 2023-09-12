import { useEffect, useState } from "react";
import "./App.css";
import JobList from "./components/JobList";
import Filters from "./components/Filters";

function App() {
  const [JSONData, setJSONData] = useState();
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    fetch("/tasks.json")
      .then((response) => response.json())
      .then((data) => {
        setJSONData(data);
        setFilteredData(data);
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des données :", error)
      );
  }, []);

  const handleFilteredData = (filteredData) => {
    setFilteredData(filteredData);
  };

  return (
    <div className="App">
      <h1 className="notification is-primary">Feuille de Travail</h1>
      <h1 className="title">Offres d'emploi</h1>
      <Filters onFilter={handleFilteredData} jobs={filteredData} JSONData={JSONData}/>
      {filteredData ? (
        <JobList jobs={filteredData} />
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default App;
