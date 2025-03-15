import React, { useEffect } from 'react'
import { io } from "socket.io-client"
const socket = io("http://localhost:3000")

export default function App() {
  useEffect(() => {
   socket.on("msg", (data) => {
    console.log(data)
   })
 },[])
  return (
    <div >Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, qui.</div>
  )
}
