
import {Route, Routes, useParams} from 'react-router-dom'


function Child() {
  const {id} = useParams();
  return (
    <>
    <h1 className="text-3xl font-bold underline">Hello world! {id}</h1>
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
