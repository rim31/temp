import { useEffect, useState } from "react";
import "./App.css";
// import Pagination from "./components/Pagination";
// import JobCard from "./JobCard";
import JobList from "./components/JobList";
import Filters from "./components/Filters";

function App() {
  // const [jsonData, setJsonData] = useState(null);
  const [JSONData, setJSONData] = useState();
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    // Charger le fichier JSON depuis le dossier public
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

  // const jobsPerPage = 20; // number og jobs per page
  // const [currentPage, setCurrentPage] = useState(1);

  // const totalJobs = JSONData.length;
  // const totalPages = Math.ceil(totalJobs / jobsPerPage);

  // /**
  //  * display the jobs of the current page
  //  * @returns
  //  */
  // const getJobsForPage = () => {
  //   const startIndex = (currentPage - 1) * jobsPerPage;
  //   const endIndex = startIndex + jobsPerPage;
  //   return JSONData.slice(startIndex, endIndex);
  // };

  // const goToPage = (page) => {
  //   setCurrentPage(page);
  // };

  const handleFilteredData = (filteredData) => {
    // Mettez à jour l'état du composant parent avec les données filtrées
    setFilteredData(filteredData);
  };

  return (
    <div className="App">
      <h1 className="notification is-primary">Feuille de Travail</h1>
      <h1 className="title">Offres d'emploi</h1>
      <Filters onFilter={handleFilteredData} jobs={filteredData} JSONData={JSONData}/>
      {/* <h2> ✅ : conditions remplis, ❌ : non remplis, ⏰ : date urgent</h2> */}
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      /> */}

      {/* Affiche les offres d'emploi pour la page actuelle */}
      {/* <JobList jobs={getJobsForPage()} /> */}
      {filteredData ? (
        <JobList jobs={filteredData} />
      ) : (
        <p>Chargement en cours...</p>
      )}
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      /> */}
    </div>
  );
}

export default App;
