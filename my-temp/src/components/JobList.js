import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Pagination from "./Pagination";

const JobList = ({ jobs }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);

  const jobsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const totalJobs = jobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const getJobsForPage = () => {
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    return filteredJobs.slice(startIndex, endIndex);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleSelect = (jobId) => {
    const isSelected = selectedJobs.includes(jobId);
    if (isSelected) {
      setSelectedJobs(selectedJobs.filter((id) => id !== jobId));
    } else {
      setSelectedJobs([...selectedJobs, jobId]);
    }
  };

  // Traitement des jobs sélectionnés (par exemple, envoyez-les au panier pour l'étape suivante)
  const handleValidate = () => {
    console.log("Jobs sélectionnés :", selectedJobs);
    setFilteredJobs(
      filteredJobs.filter((job) => !selectedJobs.includes(job.id))
    );
  };
  useEffect(() => {
    setFilteredJobs(jobs);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <p>{filteredJobs?.length} offres</p>
      {selectedJobs.length && (
        <div
          style={{ position: "fixed", top: 10, right: 10 }}
          className="is-flex-direction-column"
        >
          <button onClick={handleValidate} class="button is-light is-small">
            Valider
          </button>
          <p>{selectedJobs?.length} jobs sauvegardés</p>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
      <div className="columns is-multiline">
        {getJobsForPage().map((job) => (
          <div className="column is-4" key={job.id}>
            <JobCard
              job={job}
              isSelected={selectedJobs.includes(job.id)}
              onSelect={handleSelect}
            />
          </div>
        ))}
        {setSelectedJobs.length && (
          <div className="selected-jobs">
            <h2> BONUS KO Jobs sélectionnés : {selectedJobs?.length}</h2>
            <ul>
              {selectedJobs.map((jobId) => (
                <li key={jobId}>
                  {
                    filteredJobs.find((job) => job.id === jobId)?.details
                      ?.jobType
                  }
                  <button onClick={() => handleSelect(jobId)}>
                    ❌(bonus KO)
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={handleValidate} class="button is-primary">
              Valider
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
