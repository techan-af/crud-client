import React, { useEffect } from 'react'
import Popup from 'reactjs-popup';
import { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import axios from 'axios'
import emailjs from '@emailjs/browser'

const Table = () => {
    const mail = "techan9602@gmail.com"
    const publicKey = "5ua5dOyzVmJRKP8Hz"
    useEffect(()=>{
        emailjs.init(publicKey)
    }, [])
    const getData = async () => {
        try{
            const response = await axios.get("https://crudsbackend.onrender.com/data")
            return response;
        } catch(error){
            console.log("error: ", error);
        } finally{
            console.log("elemnts retrieved");
        }
    }
    const sendData = async () => {
        try{
            await axios.post("https://crudsbackend.onrender.com/send", {
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                hobbies: hobbies
            })
            await fetchData();
        } catch(error){
            console.log("error:", error);
        } finally{
            console.log("data sent");
        }
    }
    const deleteData = async (id) =>{
        try{
            await axios.post(`http://localhost:8000/delete/${id}`)
        } catch(error){
            console.log("error:", error);
        } finally{
            console.log("data deleted");
        }
    }
    const filterFunction = (id) => {
        if(id in recData._id){
            return id
        }
    }
    const fetchData = async () => {
        const gotData = await getData()
        await setRecData(gotData.data);
        console.log(recData);
    }
    const sendToMail = async (e) =>{
        e.preventDefault();
        const serviceId = "service_5gx82tv";
        const templateId = "template_xarzo4a";
        try {
            
            await emailjs.send(serviceId, templateId, {
            recipient: mail,
            message: checkArray
            });
            alert("email successfully sent check inbox");
        } catch(error){
            console.log("error", error);
        } finally{
            console.log("process done");
        }
    }

    useEffect(()=>{
        fetchData();
    }, [])
    const [recData, setRecData] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [hobbies, setHobbies] = useState("")
    const [check, setCheck] = useState(false)
    const [checkArray, setCheckArray] = useState([])

  return (
    <div>
    <section className="bg-slate-800 dark:bg-gray-900 p-3 sm:p-5 h-[100vh]">
    <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <Popup trigger={<button type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add Entry
                    </button>} modal nested>
                        {
                    close => (
                        <div className='modal rounded-md'>
                                <form action="#">
                                                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                                    <div>
                                                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type name" required="" onChange={(e)=> setName(e.target.value)} />
                                                    </div>
                                                    <div>
                                                        <label for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                                        <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Phone Number" required="" onChange={(e)=> setPhoneNumber(e.target.value)} />
                                                    </div>
                                                    <div>
                                                        <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                        <input type="text" name="email" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Email" required="" onChange={(e)=> setEmail(e.target.value)} />
                                                    </div>
                                                    <div>
                                                        <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hobby</label>
                                                        <input type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Hobby" required="" onChange={(e)=> setHobbies(e.target.value)} />
                                                    </div>
                                                    
                                                </div>
                                                
                                            </form>
                                <div className="flex justify-center m-5">
                                    <button id="defaultModalButton" data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button" onClick=
                                    {() => {
                                        close();
                                        sendData();
                                        }}>
                                    Create Entry
                                    </button>
                                </div>
                           
                        </div>
                    )
                }                        

                    </Popup>
                    <button type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" onClick={sendToMail}>
                        <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Send To Mail
                    </button>
                    
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">id</th>
                            <th scope="col" className="px-4 py-3">Name</th>
                            <th scope="col" className="px-4 py-3">Phone Number</th>
                            <th scope="col" className="px-4 py-3">Email</th>
                            <th scope="col" className="px-4 py-3">Hobbies</th>
                            <th scope="col" className="px-4 py-3">Select</th>
                            <th scope="col" className="px-4 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            recData.map((data)=>{
                                return(
                                <tr className="border-b dark:border-gray-700" key={data._id}>
                                    <td px-4 py-3>{data._id}</td>
                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.name}</th>
                                    <td className="px-4 py-3">{data.phoneNumber}</td>
                                    <td className="px-4 py-3">{data.email}</td>
                                    <td className="px-4 py-3">{data.hobbies}</td>
                                    <td className="px-4 py-3"><input type="checkbox" name="selected" id="selected" onChange={(event) =>{
                                                    const checker = event.target.checked;
                                                    setCheck(checker)
                                                    if(checker){
                                                        setCheckArray(oldArray => [...oldArray, {
                                                            id: data._id,
                                                            name: data.name,
                                                            phoneNumber: data.phoneNumber,
                                                            email: data.email,
                                                            hobbies: data.hobbies
                                                        }])
                                                    }
                                                }} /></td>
                                    <td className="px-4 py-3 flex items-center justify-end">    
                                        <div className="py-1">
                                            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={deleteData}>Delete</a>
                                        </div>
                                        <div className="py-1">
                                            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Update</a>
                                        </div>
                    
                                    </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            
        </div>
    </div>
    </section>
    </div>
  
  )
}

export default Table

