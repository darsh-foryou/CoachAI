import React from 'react'

const MainLayout = ({children}) => {
  return (
    //redirect to onboarding 
    <div className='container mx-auto mt-24 mb-20'>
      {children}
    </div>
  )
}

export default MainLayout
