import React from 'react'

const Massenger = ({children} : {children: React.ReactNode}) => {
  return (
    <div className="w-[1500px] h-[600px] mt-28 mb-28 rounded-2xl border-blue-500 bg-slate-600 border-2">
        {children}
        </div>
  )
}

export default Massenger