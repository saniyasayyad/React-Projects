import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
function Github() {

    const data = useLoaderData();

//     const[data, setData] =  useState([]);
//     useEffect(() => {
    
//     fetch('https://api.github.com/users/saniyasayyad')
    
//     .then(response => response.json()
//     .then(data => {
//         console.log(data);
//         setData(data)
//     })
// )
//     }, [])

    return (
       
        <div className="flex  items-center text-center m-4 bg-gray-600 text-white p-4 text-xl gap-4">
        <img  className="border" src={data.avatar_url} alt="Git picture" width={150} />
        Github Followers: {data.followers}
        </div>
      
    )
}
export default Github

export const githubInfoLoader = async () =>{
  const response = await fetch('https://api.github.com/users/saniyasayyad')
  return response.json()
}