import React from 'react'
import StopForm  from "../components/stopPageComponent/stopForm";
import StopList from "../components/stopPageComponent/stopList";

const StopPage = () => {
  return (
    <div className='stop-page'>
        <h1>This is stop page</h1>
        <StopForm />
        <StopList />
    </div>
  )
}

export default StopPage;