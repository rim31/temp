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

  useEffect(() => {
    if (JSONData) {
      const filteredData = JSONData.filter((job) => {
        const isClosed = job.selection.status === "closed";
        const privateUntilDate = new Date(job.selection.privateUntil);
        const privateUntilFormatted = new Intl.DateTimeFormat("fr-FR").format(
          privateUntilDate
        );
        const selectedDateFormatted = new Intl.DateTimeFormat("fr-FR").format(
          new Date(selectedDate)
        );
        const hasObjective = job?.details?.objective?.length < 10;

        return (
          (!isClosable || isClosed) &&  
          (!isShortNotice || hasObjective) && 
          (!isFailing || privateUntilFormatted < selectedDateFormatted) 
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
