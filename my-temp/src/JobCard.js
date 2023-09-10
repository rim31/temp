import React from "react";

export default function JobCard(job) {
  const { company } = job?.job;

  return (
    <div
      className="card"
      onClick={() => {
        console.log("job, job.job, job?.job?.company?.pictureURL", company);
      }}
    >
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            src={job?.job?.company?.pictureURL}
            alt={job?.job?.company?.pictureURL}
          />
        </figure>
      </div>
      <div className="media-content">
        <p class="title is-4">{job?.job?.details?.jobType}</p>
        <p class="subtitle is-6">{job?.job?.company?.name}</p>
        <div className="content">
          <p>{job?.job?.details?.objective}</p>
          <p>{job?.job?.details?.additionalInformations}</p>
          <p>
            {job?.job?.details?.postalCode} {job?.job?.details?.city}
          </p>
          {/* Ajoutez d'autres informations si nécessaire */}
        </div>
      </div>
      <footer className="card-footer">
        <a href="rim31.github.io" className="card-footer-item">
          Postuler
        </a>
      </footer>
    </div>
  );
}
