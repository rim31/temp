import React, { useState } from "react";

export default function JobCard(job) {
  const { company, shifts, details, selection } = job?.job;
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const toggleAdditionalInfo = () => {
    setShowAdditionalInfo(!showAdditionalInfo);
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    // timeZoneName: "short",
  };

  const date = new Date(selection?.privateUntil || new Date());
  const dateFormatted = new Intl.DateTimeFormat("fr-FR", options).format(date);
  const enoughApplicants = shifts ? details.applicants / shifts[0]?.slots : -1;
  console.log(dateFormatted);
  return (
    <div className="card">
      {/* <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={job?.job?.company?.pictureURL}
            alt={job?.job?.company?.pictureURL}
          />
        </figure>
      </div> */}
      <div className="media-content">
        <div class="media">
          <div class="media-left pt-2 pl-2">
            <figure class="image is-48x48">
              <img
                src={job?.job?.company?.pictureURL}
                alt={job?.job?.company?.pictureURL}
              />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{job?.job?.details?.jobType}</p>
            <p class="subtitle is-6">
              {job?.job?.company?.name}, {job?.job?.details?.postalCode}{" "}
              {job?.job?.details?.city}
            </p>
          </div>
        </div>

        <p>
          {enoughApplicants >= 0 && "✅ "}
          {details?.applicants} postulé(s) /{shifts ? shifts[0]?.slots : 0} pers
          requises ({shifts?.length} slots)
        </p>
        <div className="content">
          <button
            className="button is-light"
            onClick={() => toggleAdditionalInfo()}
          >
            {showAdditionalInfo ? "Masquer détails" : "Afficher détails"}
          </button>
          {showAdditionalInfo && (
            <div onClick={() => console.log(company, shifts, details)}>
              <p>OBJECTIF : {job?.job?.details?.objective}</p>
              <p>
                infos complémentaires :{" "}
                {job?.job?.details?.additionalInformations}
              </p>
              <p>
                Adresse : {job?.job?.details?.address},
                {job?.job?.details?.postalCode} {job?.job?.details?.city}
              </p>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img
                    src={job?.job?.company?.pictureURL}
                    alt={job?.job?.company?.pictureURL}
                  />
                </figure>
              </div>
            </div>
          )}
          <p>{dateFormatted}</p>
          {/* Ajoutez d'autres informations si nécessaire */}
        </div>
        {/* <time datetime="2016-1-1">{job?.job?.shifts[0]?.start}</time> */}
      </div>
      <footer
        className="card-footer has-background-light"
        onClick={() => console.log(job?.job?.id, job, company)}
      >
        <p className="card-footer-item">Selectionner</p>
      </footer>
    </div>
  );
}
