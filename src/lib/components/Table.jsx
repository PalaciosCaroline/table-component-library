import React, { useState } from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import './table.css';

export default function Table({ data, columns }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (key, sortOrder) => {
    setSortKey(key);
    setSortOrder(sortOrder);
  };

  const sortDates = (a, b) => {
    const dateRegex = /^\d{2}([./-])\d{2}\1\d{4}$/;
    const isDate = dateRegex.test(a[sortKey]) && dateRegex.test(b[sortKey]);
    if (isDate) {
      const delimiter = dateRegex.exec(a[sortKey])[1];
      const [dayA, monthA, yearA] = a[sortKey].split(delimiter).map((x) => parseInt(x, 10));
      const [dayB, monthB, yearB] = b[sortKey].split(delimiter).map((x) => parseInt(x, 10));
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      if (dateA < dateB) return sortOrder === 'asc' ? -1 : 1;
      if (dateA > dateB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    } else {
      if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    }
  };

  const renderHeader = () => {
    return (
      <thead>
        <tr>
          {columnData.map(({ label, property, selectedBtnSort }) => (
            <th key={property}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ display: 'block', textAlign:'center'}}>{label}</p>
                <div>
                  <button
                    type="button"
                    onClick={() => handleSort(property, 'asc')}
                    style={{ marginLeft: '8px' , width: '50px',display: 'inline-block'}}
                    className={selectedBtnSort && sortOrder === 'asc' ? 'selectedBtnSort' : ''}
                  >
                    <FaSortUp  style={{ height:'1.4rem', width: '1.4rem',verticalAlign: 'center' }} />
                  </button>
                
                  <button
                    type="button"
                    onClick={() => handleSort(property, 'desc')}
                    style={{ marginLeft: '8px', width: '50px',display: 'block', marginTop: '8px'}}
                    className={selectedBtnSort && sortOrder === 'desc' ? 'selectedBtnSort' : ''}
                  >
                    <FaSortDown style={{ height:'1.4rem', width: '1.4rem',verticalAlign: 'center' }} />
                  </button>
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderBody = () => {
    let sortedData = data;
    if (sortKey !== null) {
      sortedData = data.slice().sort((a, b) => {
        if (typeof sortedData[0][sortKey] === 'string' && sortedData[0][sortKey].match(/^\d{2}([./-])\d{2}\1\d{4}$/)) {
          return sortDates(a, b);
        } else {
          if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
          if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        }
      });
    }

    return (
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            {columns.map(({ property }) => (
              <td key={`cell-${index}-${property}`}>{item[property]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  const columnData = columns.map(({ label, property }) => ({
    label,
    property,
    selectedBtnSort: sortKey === property,
  }));

  return (
    <table>
      {renderHeader(columnData)}
      {renderBody()}
    </table>
  );
}