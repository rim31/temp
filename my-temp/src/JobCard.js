import React, { useState } from "react";

export default function JobCard(job) {
  const { company } = job?.job;
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const toggleAdditionalInfo = () => {
    setShowAdditionalInfo(!showAdditionalInfo);
  };
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={job?.job?.company?.pictureURL}
            alt={job?.job?.company?.pictureURL}
          />
        </figure>
      </div>
      <div className="media-content">
        <p className="title is-4">{job?.job?.details?.jobType}</p>
        <p className="subtitle is-6">
          {job?.job?.company?.name}, {job?.job?.details?.postalCode}{" "}
          {job?.job?.details?.city}
        </p>
        <div className="content">
          <button
            className="button is-light"
            onClick={() => toggleAdditionalInfo()}
          >
            {showAdditionalInfo ? "Masquer détails" : "Afficher détails"}
          </button>
          {showAdditionalInfo && (
            <div>
              <p>{job?.job?.details?.objective}</p>
              <p>{job?.job?.details?.additionalInformations}</p>
            </div>
          )}
          <p></p>
          {/* Ajoutez d'autres informations si nécessaire */}
        </div>
      </div>
      <footer
        className="card-footer is-primary"
        onClick={() => console.log(job?.job?.id, job, company)}
      >
        <p className="card-footer-item">Postuler</p>
      </footer>
    </div>
  );
}
