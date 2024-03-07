// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Expenses = () => {
//   const [budgets, setBudgets] = useState([]);

//   useEffect(() => {
//     const fetchBudgets = async () => {
//       try {
//         const response = await axios.get('/api/budgets/');
//         setBudgets(response.data);
//       } catch (error) {
//         console.error('Error fetching budgets:', error);
//       }
//     };

//     fetchBudgets();
//   }, []);

//   return (
//     <div>
//       <h2>Budget List</h2>
//       <ul>
//         {budgets.map((budget) => (
//           <li key={budget.id}>
//             <strong>{budget.name}</strong>: {budget.amount}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Expenses;
