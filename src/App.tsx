
import {Route, Routes, useParams} from 'react-router-dom'
import {Button} from '@mui/material'
import React from 'react';


function Child() {
  const {id} = useParams();
  const [underline, setUnderline] = React.useState<string>('underline')
  return (
    <>
    <h1 className={`text-3xl font-bold ${underline}`}>Hello world! {id}</h1>
    <Button onClick={() => {
      if (underline === "underline") setUnderline("")
      else setUnderline("underline");
    }}
    variant='contained'
    >CLICK ME</Button>
    </>
  )
} 
function App() {

  return (
    <div className="flex flex-col justify-center items-center" >
      <Routes>

        <Route path='/:id' element={<Child/>}/>
      </Routes>
      
    </div>
  );

}

export default App;
