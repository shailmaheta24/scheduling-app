import React, { useState } from 'react';
import './App.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['Morning Upstairs', 'Morning Down Stairs', 'Morning Parking Lot', 'Lunch A', 'Lunch B', 'Lunch C', 'Lunch D', 'Afternoon Up Stairs', 'Afternoon Down Stairs', 'Afternoon Parking Lot'];
const staffMembers = ['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7'];

const App = () => {
  const [schedule, setSchedule] = useState(
    Array.from({ length: days.length }, () =>
      Array.from({ length: timeSlots.length }, () => null)
    )
  );

  const [loadData] = useState([
    ['Y', 'Y', 'Y', 'Y', 'Y', 'YY'],
    ['Y', 'Y', 'Y', 'Y', 'Y', 'YY'],
    ['Y', 'Y', 'Y', 'Y', 'Y', 'YY'],
    ['Y', 'Y', 'Y', 'Y', 'Y', 'YY'],
    ['Y', 'Y', 'Y', 'Y', 'Y', 'YY'],
    ['Y', 'Y', 'Y', 'Y', 'Y', 'YY'],
    ['Y', 'Y', 'Y', 'Y', 'Y', 'YY'],
  ]);

  const handleStaffSelect = (dayIndex, timeSlotIndex, staff) => {
    setSchedule(prevSchedule => {
      const newSchedule = [...prevSchedule];
      newSchedule[dayIndex][timeSlotIndex] = staff;
      return newSchedule;
    });
  };

  const calculateTotals = () => {
    const totals = Array.from({ length: staffMembers.length }, () => 0);

    for (let i = 0; i < staffMembers.length; i++) {
      for (let j = 0; j < days.length; j++) {
        if (loadData[i][j] === 'Y') {
          totals[i]++;
        }
      }
    }

    return totals;
  };

  const totals = calculateTotals();

  const calculateWeeklyTotals = () => {
    const weeklyTotals = Array.from({ length: staffMembers.length }, () => 0);

    for (let i = 0; i < staffMembers.length; i++) {
      for (let j = 0; j < days.length; j++) {
        if (loadData[i][j] === 'Y' || loadData[i][j] === 'YY') {
          weeklyTotals[i]++;
        }
      }
    }

    return weeklyTotals;
  };

  const weeklyTotals = calculateWeeklyTotals();

  return (
    <div className="App">
      <h1>Schedule</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            {days.map(day => <th key={day}>{day}</th>)}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, slotIndex) => (
            <tr key={slot}>
              <td>{slot}</td>
              {schedule.map((daySchedule, dayIndex) => (
                <td key={dayIndex}>
                  <select
                    value={daySchedule[slotIndex] || ''}
                    onChange={(e) => handleStaffSelect(dayIndex, slotIndex, e.target.value)}
                  >
                    <option value="">Select</option>
                    {staffMembers.map((staff, index) => (
                      <option key={index} value={staff}>
                        {staff}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Load</h1>
      <table>
        <thead>
          <tr>
            <th>Staff Member</th>
            {days.map(day => <th key={day}>{day}</th>)}
            <th>Day Total</th>
            <th>Weekly Total</th>
          </tr>
        </thead>
        <tbody>
          {staffMembers.map((staffMember, index) => (
            <tr key={staffMember}>
              <td>{staffMember}</td>
              {loadData[index].map((slot, slotIndex) => (
                <td key={slotIndex}>{slot}</td>
              ))}
              <td>{totals[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
