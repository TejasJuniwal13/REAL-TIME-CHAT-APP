import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axiosInstance from '../config/axios.js';


const Project = () => {

    const { state } = useLocation();
    const project = state?.projects;
    console.log('We are in project ', project)


    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectUserId] = useState([]);
    const [users, setUsers] = useState([]);
    const [projectUsers, setProjectUsers] = useState([])



    const handleUserClick = (id) => {
        setSelectUserId(prevSelectUserId => {
            const newSelectUserId = new Set(prevSelectUserId);
            if (newSelectUserId.has(id)) {
                newSelectUserId.delete(id);
            } else {
                newSelectUserId.add(id);
            }
            console.log(Array(newSelectUserId))
            return newSelectUserId
        })
    }


    function addCollaborators() {

        axiosInstance.put('/projects/add-user', {
            projectId: project._id,
            users: Array.from(selectedUserId)
        }).then((res) => {
            console.log(res.data);
            setIsModalOpen(false);
        }).catch((err) => {
            console.log(err);
        })

    }



    useEffect(() => {


        axiosInstance.get(`/projects/get-project/${project._id}`).then((res) => {
            console.log('data of users');
            console.log(res.data.project.users);
            const user = res.data.project.users
            setProjectUsers(user);
        }).catch((err) => {
            console.log(err);
        })




        const userData = async () => {
            const response = await axiosInstance.get('/user/all')

            try {
                console.log(response);
                setUsers(response.data.user)
            } catch (error) {
                console.log(error);
            }

        }

        userData();

    }, [])



    return (
        <main className='h-screen w-screen flex '>

            <section className="left relative flex flex-col h-full min-w-96 bg-slate-400">

                {/* header  of the section */}
                <header
                    className='flex justify-between p-2 px-3 w-full bg-slate-200'>

                    <button onClick={() => setIsModalOpen(!isModalOpen)} className='flex items-center gap-1'>
                        <i className="ri-add-fill"></i>
                        <p>Add Collaborator</p>
                    </button>

                    <button onClick={()=> setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                        <i className="ri-group-fill"></i>
                    </button>
                </header>


                {/* conversation area  */}
                <div className="conversation-area flex-grow flex flex-col ">


                    {/* message boxes of users */}
                    <div className="message-box flex-grow flex flex-col gap-1 ">

                        <div className=" m-1 message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                            <small className='opacity-65 text-xs'>example@gmail.com</small>
                            <p className='text-sm' >Lorem50</p>
                        </div>

                        <div className="ml-auto m-1 message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                            <small className='opacity-65 text-xs'>example@gmail.com</small>
                            <p className='text-sm' >Lorem50</p>
                        </div>

                    </div>

                    {/* input field  */}
                    <div className="input-field w-full flex">
                        <input type="text" placeholder='Enter message' className='bg-white p-2 flex-grow ' />
                        <button className=' px-5 bg-slate-950 text-white'>
                            <i className="ri-send-plane-fill"></i>
                        </button>
                    </div>


                </div>


                {/* side panel  */}
                <div className={`sidePanel w-36 h-60 bg-slate-50 flex flex-col gap-2 absolute w-full h-full transition-all duration-200 ease-in-out ${isSidePanelOpen ? '-translate-x-0' : '-translate-x-full'}`}>

                    {/* side panel header  */}
                    <header className='flex justify-end p-3 px-4 bg-slate-200 h-14'>
                        <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
                            <i className="ri-close-fill"></i>
                        </button>
                    </header>


                    {/* side panel users name  */}
                    <div className="users flex flex-col gap-2">


                        {/* user template  */}
                        {
                            projectUsers.map((user) => (
                                <div key={user._id} className="user flex gap-2 items-center hover:bg-slate-200 cursor-pointer p-2">

                                    <div className='aspect-square rounded-full p-5 text-white bg-slate-600 w-fit h-fit ml-2 flex items-center justify-center'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>

                                    <h1 className='font-semibold text-lg cursor-pointer'>{user.email}</h1>

                                </div>
                            ))
                        }


                        {/* orignal user template  */}

                        {/* <div className="user flex gap-2 items-center hover:bg-slate-200 cursor-pointer p-2">

                            <div className='aspect-square rounded-full p-5 text-white bg-slate-600 w-fit h-fit ml-2 flex items-center justify-center'>
                                <i className="ri-user-fill absolute"></i>
                                </div>

                        <h1 className='font-semibold text-lg cursor-pointer'>userName</h1>

                        </div> */}


                    </div>



                </div>


            </section>


            {/* add collaborator modal */}

            {isModalOpen && (
                <div className='fixed inset-0 bg-blur bg-opacity-50 flex items-center justify-center'>
                    <div className='bg-slate-300 p-4 rounded-md w-96 max-w-full relative '>
                        <header className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className='p-2'>
                                <i className="ri-close-fill"></i>
                            </button>
                        </header>
                        <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">

                            {users.map(user => (
                                <div key={user._id} className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-slate-200' : ''} p-2 flex gap-2 items-center`} onClick={() => { handleUserClick(user._id) }}>
                                    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                                </div>
                            ))}
                        </div>

                        <button onClick={addCollaborators} className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
                            Add Collaborators
                        </button>

                    </div>
                </div>
            )}


        </main>
    )
}

export default Project