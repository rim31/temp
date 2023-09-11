import React, { useState } from "react";

export default function Filters(filteredData) {
  const currentDate = new Date(Date.UTC(2022, 11, 20)); //new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="columns is-multiline has-background-light">
      <div className="column is-3">
        <label className="checkbox">
          <input type="checkbox" />
          Failing tasks ❌
        </label>
      </div>
      <div className="column is-3">
        <label className="checkbox">
          <input type="checkbox" />
          Short notice tasks ⏰
        </label>
      </div>
      <div className="column is-3">
        <label className="checkbox">
          <input type="checkbox" />
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
