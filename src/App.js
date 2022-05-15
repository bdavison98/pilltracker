import logo from './logo.svg';
import './App.css';
import React from 'react';

function TableHeader({labels}) {
    const header = labels.map(name => <td>{name}</td>)

    return(
        <thead> 
            {header}
        </thead>
    )
}

function TableRow({pillData}) {
    const row = pillData.map((pill) => (
        <tr>
            <td>{pill.name}</td>
            <td>{pill.amount}</td>
            <td>{pill.dosage}mg</td>
            <td>${pill.cost}</td>
        </tr>
    ))
    
    return(
        <>
            {row}
        </>
    )
}

function MedTable(){
    
    return(
        <>
            <TableHeader labels={["Name", "Amount", "Dosage", "Cost"]} />
            <TableRow pillData={[{name: "Tylenol", amount:30, dosage:500, cost:5.99}]}/>
        </>
    )
}


function MyMeds() {
    return(
        <>
            <MedTable/>
        </>
    )
}

function App() {
  return (
    <div className="App">
      <MyMeds></MyMeds>
    </div>
  );
}

export default App;
