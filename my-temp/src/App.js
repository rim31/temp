import { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./components/Pagination";
// import JobCard from "./JobCard";
import JobList from "./components/JobList";
import Filters from "./components/Filters";

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
      <h1
        className="notification is-primary"
        onClick={() => console.log("DEBUG ;-) ", filteredData)}
      >
        Offres d'emploi
      </h1>
      <h1
        className="title"
        onClick={() => console.log("DEBUG ;-) ", filteredData)}
      >
        Offres d'emploi
      </h1>
      <Filters filteredData={filteredData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
      {/* Affiche les offres d'emploi pour la page actuelle */}
      <JobList jobs={getJobsForPage()} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
      {filteredData ? (
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default App;
