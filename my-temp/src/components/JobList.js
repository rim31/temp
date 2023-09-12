import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);

  const handleSelect = (jobId) => {
    const isSelected = selectedJobs.includes(jobId);
    if (isSelected) {
      setSelectedJobs(selectedJobs.filter((id) => id !== jobId));
    } else {
      setSelectedJobs([...selectedJobs, jobId]);
    }
  };

  const handleValidate = () => {
    // Traitez les jobs sélectionnés (par exemple, envoyez-les au panier)
    console.log("Jobs sélectionnés :", selectedJobs);
    setFilteredJobs(
      filteredJobs.filter((job) => !selectedJobs.includes(job.id))
    );
  };
  useEffect(() => {
    // Mettre à jour filteredJobs lorsque jobs est modifié
    setFilteredJobs(jobs);
  }, [jobs]); // Déclencher cet effet chaque fois que jobs change
  return (
    <div>
      {filteredJobs?.length}
      <div className="columns is-multiline">
        {/* Utilisez la classe is-multiline pour permettre un retour à la ligne automatique */}
        {filteredJobs.map((job) => (
          <div className="column is-4" key={job.id}>
            {/* Utilisez la classe is-4 pour spécifier que chaque colonne occupe 4 unités sur 12 (pour créer une disposition en 3 colonnes sur grand écran) */}
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
