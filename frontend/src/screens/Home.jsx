import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/user.context'
import axiosInstance from '../config/axios.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const { user } = useContext(UserContext)
  const [isModalOpen, setisModalOpen] = useState(false);
  const [projectName, setprojectName] = useState([]);
  const [project,setProject] = useState([]);

  const navigate = useNavigate();

function createProject(e) {
    e.preventDefault();
     console.log({ projectName })

    axiosInstance.post('/projects/create', {
            name: projectName,
        })
            .then((res) => {
                console.log(res)
                setIsModalOpen(false)
            })
            .catch((error) => {
                console.log(error)
            })

  }


  useEffect(()=>{
    const fetchProject = async ()=>{
      try {
        const res = await axiosInstance.get('/projects/all');
        console.log(res.data.projects);
        setProject(res.data.projects);
        
      } catch (error) {
        console.log(error)
      }
    }

    fetchProject();

  },[])


  return (
    <main className='p-4'>
      <div className="projects flex flex-wrap gap-3">
        <button

          onClick={() => setisModalOpen(true)}
          className="project p-4 border border-slate-300 rounded -md">
          <i className="ri-link ml-2">New Project</i>
        </button>

{
  project.map((prjt)=>(

    <div onClick={()=>{navigate('/project',{

      state:{project}
      
    })}} key={prjt._id} id={prjt._id} className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 hover:bg-slate-200">
      <h2 className='font-semibold'>{prjt.name}</h2>      
      <div className='flex gap-1'>
        <p><small><i className="ri-user-line p-2 font"></i> Collaborator :</small>
        </p>
        {prjt.users.length}
      </div>

    </div>
  ))
}

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur	 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-xl mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  onChange={(e) => { setprojectName(e.target.value) }}
                  value={projectName}
                  type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              <div className="flex justify-end">
                <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}


    </main>
  )
}

export default Home
