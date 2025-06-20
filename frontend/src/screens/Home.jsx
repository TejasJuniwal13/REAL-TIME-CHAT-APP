import React, { useContext } from 'react'
import { UserContext } from '../context/user.context'

const Home = () => {
  const { user } = useContext(UserContext)

  return (
    <h1 class="text-3xl font-bold underline text-sky-700 hover:text-sky-500">
      Welcome Home {JSON.stringify(user)}
    </h1>
  )
}

export default Home
