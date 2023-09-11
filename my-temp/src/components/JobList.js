import React from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs }) => {
  return (
    <div className="columns is-multiline">
      {/* Utilisez la classe is-multiline pour permettre un retour à la ligne automatique */}
      {jobs.map((job) => (
        <div className="column is-4" key={job.id}>
          {/* Utilisez la classe is-4 pour spécifier que chaque colonne occupe 4 unités sur 12 (pour créer une disposition en 3 colonnes sur grand écran) */}
          <JobCard job={job} />
        </div>
      ))}
    </div>
  );
};

export default JobList;
