import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';

function TableHeader({labels}) {
    const header = labels.map(name => <td className=''>{name}</td>)

    return(
        <thead className='text-xl font-bold h-20'> 
            {header}
        </thead>
    )
}

function TableRow({pillData}) {
    const rows = pillData.map((pill) => (
        <tr className='p-32'>
            <td>{pill.name}</td>
            <td>{pill.amount}</td>
            <td>{pill.dosage}mg</td>
            <td>${pill.cost}</td>
        </tr>
    ))
    
    return(
        <>
            {rows}
        </>
    )
}

function MedForm({medData,setMedData, setMedRows}) {

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [dosage, setDosage] = useState('')
    const [cost, setCost] = useState('')
    const [formData, setFormData] = useState({})
    const [submitted, setSubmitted] = useState(false)
    
    if (submitted) {
        setName('')
        setAmount('')
        setDosage('')
        setCost('')
        setSubmitted(false)
        
    }

    return(
        <div className='mt-20 inline-block p-8'>
            <div className='block'>
                <p className='underline text-left pb-2'>Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='rounded-md p-2 bg-gray-800 block mb-8' type='text' placeholder='Name'></input>
            </div>
            <div className='block'>
                <p className='underline text-left pb-2'>Amount</p>
                <input onChange={(e) => setAmount(e.target.value)} value={amount} className='rounded-md p-2 bg-gray-800 block mb-8' type='text' placeholder='30'></input>
            </div>
            <div className='block'>
                <p className='underline text-left pb-2'>Dosage</p>
                <input onChange={(e) => setDosage(e.target.value)} value={dosage} className='rounded-md p-2 bg-gray-800 block mb-8' type='text' placeholder='500'></input>
            </div>
            <div className='block'>
                <p className='underline text-left pb-2'>Cost</p>
                <input onChange={(e) => setCost(e.target.value)} value={cost} className='rounded-md p-2 bg-gray-800 block mb-8' type='text' placeholder='5.99'></input>
            </div>
            <AddMedButton name={name} amount={amount} dosage={dosage} cost={cost} setMedData={setMedData} setMedRows={setMedRows} setSubmitted={setSubmitted}/>
        </div>
    )
}

function AddMedButton({ name, amount, dosage, cost, setMedData, setMedRows, setSubmitted}) {
    function handleClick() {
        setMedData({
            name: name,
            amount: amount,
            dosage: dosage,
            cost: cost
        })
        setMedRows(prevData => [...prevData, {
            name: name,
            amount: amount,
            dosage: dosage,
            cost: cost
        }])
        setSubmitted(true)
    }
    return(
        <>
            <button className='rounded-lg border-2 p-2' onClick={handleClick}>
                Add Medication
            </button>
        </>
    )
}
function MedTable({medRows}){
    
    return(
        <table className='w-1/2'>
            <TableHeader labels={["Name", "Amount", "Dosage", "Cost"]} />
            <TableRow className='' pillData={medRows}/>
        </table>
    )
}


function MyMeds() {
    const [medData, setMedData] = useState({})
    const [medRows, setMedRows] = useState([])
    console.log(medData)
    console.log(medRows)
    return(
        <>
            <h1 className='text-4xl'>My Medications</h1>
            <div className='flex-wrap content-center'>
                <MedTable medRows={medRows} medRows={medRows}/>
            </div>
            <div>
                <MedForm setMedRows={setMedRows} setMedData={setMedData}/>
                
            </div>
            
        </>
    )
}

function App() {
  return (
    <div className="App h-screen bg-gray-900">
      <div className='text-white p-10'>
          <MyMeds/>
      </div>
    </div>
  );
}

export default App;
