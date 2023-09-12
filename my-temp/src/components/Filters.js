import React, { useEffect, useState } from "react";

export default function Filters({ onFilter, jobs, JSONData }) {
  const defaultDate = new Date("01/02/2022").toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [isFailing, setIsFailing] = useState(false);
  const [isShortNotice, setIsShortNotice] = useState(false);
  const [isClosable, setIsClosable] = useState(false);
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // const handleFiltering = () => {
  //   // Appliquez votre logique de filtrage ici pour obtenir les données filtrées
  //   const filteredData = jobs.filter((job) => {
  //     const isClosed = job.selection.status === 'closed';
  //     const isPrivateUntilBeforeDate = job.selection.privateUntil < selectedDate;
  //     const hasObjective = job.details.objective !== '';

  //     return (
  //       (!isFailing || isClosed) && // Filtre isFailing
  //       (!isShortNotice || isPrivateUntilBeforeDate) && // Filtre isShortNotice
  //       (!isClosable || hasObjective) // Filtre isClosable
  //     );
  //   });

  //   // Utilisez la fonction de rappel pour retourner les données filtrées au parent
  //   onFilter(filteredData);
  // };

  useEffect(() => {
    if (JSONData) {
      // Appliquez votre logique de filtrage ici pour obtenir les données filtrées
      const filteredData = JSONData.filter((job) => {
        const isClosed = job.selection.status === "closed";
        const isPrivateUntilBeforeDate =
          job.selection.privateUntil < selectedDate;
        const hasObjective = job?.details?.objective?.length < 10;

        return (
          (!isClosable || isClosed) && // Filtre isFailing
          (!isShortNotice || hasObjective) && // Filtre isShortNotice
          (!isFailing || isPrivateUntilBeforeDate) // Filtre isClosable
        );
      });
      onFilter(filteredData);
    }
  }, [
    jobs,
    isFailing,
    isShortNotice,
    isClosable,
    onFilter,
    selectedDate,
    JSONData,
  ]);
  return (
    <div className="columns is-multiline has-background-light">
      <div className="column is-3">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={isFailing}
            onClick={() => setIsFailing(!isFailing)}
          />
          Failing tasks ❌
        </label>
      </div>
      <div className="column is-3">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={isShortNotice}
            onClick={() => setIsShortNotice(!isShortNotice)}
          />
          Short notice tasks ⏰
        </label>
      </div>
      <div className="column is-3">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={isClosable}
            onClick={() => setIsClosable(!isClosable)}
          />
          Closable tasks ✅
        </label>
      </div>
      <div className="column is-3">
        <div className="field">
          {/* <label className="label is-small">Date</label> */}
          <div className="control has-icons-left has-icons-right">
            <input
              type="date"
              className="input is-small"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
