import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Project = () => {
    const location = useLocation();

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)

    const { project } = location.state;
    console.log(project);

    return (
        <main className='h-screen w-screen flex'>

            <section className="left relative flex flex-col h-full min-w-96 bg-slate-400">

                <header
                    className='flex justify-end p-2 px-3 w-full bg-slate-200'>
                    <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                        <i className="ri-group-fill"></i>
                    </button>
                </header>

                <div className="conversation-area flex-grow flex flex-col ">

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

                    <div className="input-field w-full flex">
                        <input type="text" placeholder='Enter message' className='bg-white p-2 flex-grow ' />
                        <button className=' px-5 bg-slate-950 text-white'>
                            <i className="ri-send-plane-fill"></i>
                        </button>
                    </div>

                </div>

                <div className={`sidePanel w-36 h-60 bg-slate-50 flex flex-col gap-2 absolute w-full h-full transition-all duration-200 ease-in-out ${isSidePanelOpen ? '-translate-x-0' : '-translate-x-full'}`}>
                    <header className='flex justify-end p-3 px-4 bg-slate-200 h-14'>
                        <button onClick={()=> setIsSidePanelOpen(!isSidePanelOpen)}>
                            <i class="ri-close-fill"></i>
                        </button>
                    </header>

                    <div className="users flex flex-col gap-2">

                        <div className="user flex gap-2 items-center hover:bg-slate-200 cursor-pointer p-2">

                            <div className='aspect-square rounded-full p-5 text-white bg-slate-600 w-fit h-fit ml-2 flex items-center justify-center'>
                                <i className="ri-user-fill absolute"></i>
                                </div>

                        <h1 className='font-semibold text-lg cursor-pointer'>userName</h1>


                        </div>

                    </div>
                    


                    <div className="users flex flex-col gap-2">

                        <div className="user flex gap-2 items-center hover:bg-slate-200 cursor-pointer p-2">

                            <div className='aspect-square rounded-full p-5 text-white bg-slate-600 w-fit h-fit ml-2 flex items-center justify-center'>
                                <i className="ri-user-fill absolute"></i>
                                </div>

                        <h1 className='font-semibold text-lg cursor-pointer'>userName</h1>


                        </div>

                    </div>



                </div>



            </section>

        </main>
    )
}

export default Project