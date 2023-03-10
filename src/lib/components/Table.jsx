import React, { useState } from 'react';
import { sortDates } from './sortDates';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import './table.css';

export default function Table({ data, columns }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (key, sortOrder) => {
    setSortKey(key);
    setSortOrder(sortOrder);
  };

  const renderHeader = () => {
    return (
      <thead className='thead'>
        <tr className='tr'>
          {columnData.map(({ label, property, selectedBtnSort }) => (
            <th key={property} className='th'>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p className='label'>{label}</p>
                <div>
                  <button
                    type="button"
                    onClick={() => handleSort(property, 'asc')}
                    className={`btnForSort ${selectedBtnSort && sortOrder === 'asc' ? 'selectedBtnSort' : ''}`}
                  >
                    <FaSortUp className='btnSortIcon' />
                  </button>
                
                  <button
                    type="button"
                    onClick={() => handleSort(property, 'desc')}
                    className={`btnForSort ${selectedBtnSort && sortOrder === 'desc' ? 'selectedBtnSort' : ''}`}
                  >
                    <FaSortDown className='btnSortIcon' />
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
          return sortDates(a, b, sortKey, sortOrder);
        } else {
          if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
          if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        }
      });
    }

    return (
      <tbody className='tbody'>
        {sortedData.map((item, index) => (
          <tr key={index} className='tr'>
            {columns.map(({ property }) => (
              <td key={`cell-${index}-${property}`} className='td'>{item[property]}</td>
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
    <table className='table'>
      {renderHeader(columnData)}
      {renderBody()}
    </table>
  );
}