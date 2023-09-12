import React, { useState } from "react";

export default function JobCard({ job, onSelect }) {
  const { company, shifts, details, selection } = job;
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [selectJobCard, setSelectJobCard] = useState(false);

  const toggleSelection = () => {
    onSelect(job.id);
    setSelectJobCard(!selectJobCard);
  };

  const toggleAdditionalInfo = () => {
    setShowAdditionalInfo(!showAdditionalInfo);
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const date = new Date(selection?.privateUntil || new Date());
  const dateFormatted = new Intl.DateTimeFormat("fr-FR", options).format(date);
  const enoughApplicants = shifts ? details.applicants / shifts[0]?.slots : -1;

  return (
    <div className="card">
      <div
        className={
          selectJobCard
            ? "media-content has-background-primary-light"
            : "media-content "
        }
      >
        <div className="media">
          <div className="media-left pt-2 pl-2">
            <figure className="image is-48x48">
              <img src={company?.pictureURL} alt={company?.pictureURL} />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{details?.jobType}</p>
            <p className="subtitle is-6">{dateFormatted}</p>
          </div>
        </div>

        <p>
          {enoughApplicants >= 0 && "✅ "}
          {details?.applicants} postulé(s) /{shifts ? shifts[0]?.slots : 0} pers
          requises ({shifts?.length} slots)
        </p>
        <div className="content">
          <button className="button is-light" onClick={toggleAdditionalInfo}>
            {showAdditionalInfo ? "Masquer détails" : "Afficher détails"}
          </button>
          {showAdditionalInfo && (
            <div onClick={() => console.log(company, shifts, details)}>
              <p>OBJECTIF : {details?.objective}</p>
              <p>infos complémentaires : {details?.additionalInformations}</p>
              <p>
                Adresse : {details?.address}, {details?.postalCode}{" "}
                {details?.city}
              </p>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={company?.pictureURL} alt={company?.pictureURL} />
                </figure>
              </div>
            </div>
          )}
          <p className="subtitle is-6">
            {company?.name}, {details?.postalCode} {details?.city}
          </p>
        </div>
      </div>
      <footer className="card-footer has-background-light">
        <p className="card-footer-item" onClick={toggleSelection}>
          {selectJobCard ? "Selectioné ✔️" : "Selectionner"}
        </p>
      </footer>
    </div>
  );
}
