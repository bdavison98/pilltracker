import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react'


const url = 'https://api.jsonbin.io/b/6281f81a38be296761070d9c/2'

function App() {
    const a = ['a', 'b', 'c']


    return (
        <div className="App h-screen bg-gray-900">
            <div className='p-24 h-full text-white p-10'>
                <MyMeds />
            </div>
        </div>
    );
}
export default App;


function MyMeds() {
    const [rows, setRows] = useState()
    const [loading, setLoading] = useState(false)
    const [addMed, setAddMed] = useState(false)


    async function fetchData() {

        const response = await fetch(url)

        if (!response.ok) {
            const e = `Error: ${response.status}`
            throw new Error(e)
        }
        const medications = await response.json()
        return medications
    }

    useEffect(() => {
        try {

            fetchData().then(medication => setRows(medication))

        } catch (e) {
            console.log(e)
        }

    }, [])
    
    return (
        <>
            <h1 className='text-4xl text-left'>My Medications</h1>
            <div className='flex-wrap content-center mt-16 mb-10'>
                {rows && rows.length > 0 && <MedTable rows={rows} setRows={setRows} />}
                {rows.length <= 0 && <><p>Looking empty in here...</p></>}
            </div>
            <div className=''>
                <button className='rounded-lg border-2 p-2 block' onClick={() => setAddMed(!addMed)}>
                    {addMed ? 'Close' : 'New Medication'}
                </button>
                {addMed && <MedForm rows={rows} setRows={setRows} />}
            </div>

        </>
    )
}

function MedTable({ rows, setRows }) {

    // delete(): rows, i => setSetRows(row[i].remove)

    function handleRowDel(id) {
        setRows(rows.filter(pill => pill.id !== id))
    }

    const meds = rows.map((pill) => (
        <tr key={pill.id} className='p-32 text-center'>
            <td className='bg-gray-800' key={pill.id}>{pill.name}</td>
            <td className='bg-gray-800' key={pill.id}>{pill.amount}</td>
            <td className='bg-gray-800' key={pill.id}>{pill.dosage}</td>
            <td className='bg-gray-800' key={pill.id}>${pill.cost}</td>
            <td className='bg-gray-800' key={pill.id}>
                <td className=''>
                    <button className='ml-16 pr-2 text-2xl'>{pill.actions.edit}</button>
                </td>
                <td>
                    <button className='text-2xl' onClick={() => handleRowDel(pill.id)}>{pill.actions.delete}</button>
                </td>
            </td>

        </tr>
    ))


    return (
        <table className='rounded-t-lg'>
            <TableHeader labels={['name', 'amount', 'dosage', 'cost', 'actions']} />
            {meds}
        </table>

    )
}


function TableHeader({ labels }) {
    const header = labels.map(name => <td className='text-center h-12 bg-gray-600 w-screen pl-4 pr-4'>{name}</td>)

    return (
        <thead className='text-xl font-bold'>
            {header}
        </thead>
    )
}

function MedForm({ rows, setRows }) {

    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [dosage, setDosage] = useState('')
    const [cost, setCost] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [count, setCount] = useState(rows.length+1)

    if (submitted) {
        setName('')
        setAmount('')
        setDosage('')
        setCost('')
        setSubmitted(false)

    }

    return (
        <div className='mt-2 inline-block p-8 border rounded-lg'>
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
            <SubmitMedButton name={name} amount={amount} dosage={dosage} cost={cost} setRows={setRows} setSubmitted={setSubmitted} count={count} setCount={setCount} />
        </div>
    )
}

function SubmitMedButton({ name, amount, dosage, cost, setRows, setSubmitted, count, setCount }) {
    function handleClick() {
        setRows(prevData => [...prevData, {
            id: count,
            name: name,
            amount: amount,
            dosage: dosage,
            cost: cost,
            actions: {
                edit: '✏️',
                delete: '🚮'
            }
        }])
        setCount(count + 1)
        setSubmitted(true)
    }
    return (
        <>
            <button className='rounded-lg border-2 p-2' onClick={handleClick}>
                Submit
            </button>
        </>
    )
}

