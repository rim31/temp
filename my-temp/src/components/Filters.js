import React, { useState } from "react";

export default function Filters(filteredData) {
  const currentDate = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="columns is-multiline">
      <div className="column is-3">
        <label className="checkbox">
          <input type="checkbox" />
          Failing tasks
        </label>
      </div>
      <div className="column is-3">
        <label className="checkbox">
          <input type="checkbox" />
          Short notice tasks
        </label>
      </div>
      <div className="column is-3">
        <label className="checkbox">
          <input type="checkbox" />
          Closable tasks
        </label>
      </div>
      <div className="column is-3">
        <div className="field">
          <label className="label is-small">Date</label>
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

/* <div className="field">
  <label className="label is-small">Small input</label>
  <div className="control has-icons-left has-icons-right">
    <input className="input is-small" type="email" placeholder="Normal" />
    <span className="icon is-small is-left">
      <i className="fa fa-calendar"></i>
    </span>
    <span className="icon is-small is-right">
      <i className="fas fa-check"></i>
    </span>
  </div>
</div> */
