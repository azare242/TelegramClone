
import {Route, Routes, useParams, useNavigate} from 'react-router-dom'
import {Button} from '@mui/material'
import React from 'react';


function Child() {
  const {id} = useParams();
  const navigate = useNavigate();
  // navigate('/1');
  return (
    <>
    <h1 className={`text-3xl font-bold underline`}>Hello world! {id}</h1>
    <Button onClick={() => {
      navigate(`/${parseInt(id ? id : '0') + 1}`)
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
