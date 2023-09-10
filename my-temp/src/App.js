import { useEffect, useState } from "react";
import "./App.css";
// import JobCard from "./JobCard";
import JobList from "./JobList";

function App() {
  // const [jsonData, setJsonData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Charger le fichier JSON depuis le dossier public
    fetch("/tasks.json")
      .then((response) => response.json())
      .then((data) => setFilteredData(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des données :", error)
      );
  }, []);

  const jobsPerPage = 20; // number og jobs per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalJobs = filteredData.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

 /**
  * display the jobs of the current page
  * @returns 
  */
  const getJobsForPage = () => {
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <h1 className="notification is-primary" onClick={() => console.log("DEBUG ;-) ", filteredData)}>Offres d'emploi</h1>
      <h1
        className="title"
        onClick={() => console.log("DEBUG ;-) ", filteredData)}
      >
        Offres d'emploi
      </h1>
      {/* Affiche les offres d'emploi pour la page actuelle */}
      <div className="pagination">
        <button
          className="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Page précédente
        </button>
        {currentPage} / {totalPages} pages
        <button
          className="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Page suivante
        </button>
      </div>
      <JobList jobs={getJobsForPage()} />
      {/* REPETITION pu in component */}
      <div className="pagination">
        <button
          className="button"
          onClick={(prev) => goToPage(prev - 1)}
          disabled={currentPage === 1}
        >
          Page précédente
        </button>
        <button
          className="button"
          onClick={(prev) => goToPage(prev + 1)}
          disabled={currentPage === totalPages}
        >
          Page suivante
        </button>
      </div>
      {/* Utilisez la classe is-multiline pour permettre un retour à la ligne automatique */}
      {/* Utilisez la classe is-4 pour spécifier que chaque colonne occupe 4 unités sur 12 (pour créer une disposition en 3 colonnes sur grand écran) */}
      {/* <div className="columns is-multiline">
        {filteredData.map((job) => (
          <div className="column is-4" key={job.id}>
            <JobCard job={job} />
          </div>
        ))}
      </div> */}
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
