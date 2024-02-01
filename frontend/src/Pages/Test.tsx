import { Button } from '@mui/material'
import React from 'react'
import { useAPI } from '../Actions/API/useAPI'
import { API_ROUTES, BASE_URL_HTTP } from '../Actions/API/Routes'

const Test = () => {


    const apis = useAPI()

  return (
    <div
    className="mt-[100px]"
    >

        <Button onClick={async () => {
            const res = apis.startChat === null ? {success: false, message: "unknown error", data: undefined} : await apis.startChat('1');

            console.log(res)
        }}
        variant="contained"
        >
            trigger
        </Button>


        {/* <img src={`${BASE_URL_HTTP}${API_ROUTES.getPfp.path.replace("$1", "sajad")}`}/> */}
    </div>
  )
}

export default Test