import React, { Suspense } from 'react'
import { BarLoader } from "react-spinners"

const Layout = ({children}) => {
  return (
    <div className='px-5'>
      <div className='mb-5 text-center'>
        <h1 className='text-6xl font-bold gradient-title'>
          AI Powered Industry Insights
        </h1>
      </div>

        <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="gray"/>}>
        {children}
        </Suspense>
        
      
    </div>
  )
}

export default Layout
