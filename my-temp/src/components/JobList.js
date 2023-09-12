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
    return jobs.slice(startIndex, endIndex);
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
  }, [jobs]);

  return (
    <div>
      <p>{filteredJobs?.length} offres</p>
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
        <div className="selected-jobs">
          <h2>Jobs sélectionnés : {selectedJobs?.length}</h2>
          <ul>
            {selectedJobs.map((jobId) => (
              <li key={jobId}>
                {filteredJobs.find((job) => job.id === jobId)?.title}
                <button onClick={() => handleSelect(jobId)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handleValidate}>Valider</button>
        </div>
      </div>
    </div>
  );
};

export default JobList;
