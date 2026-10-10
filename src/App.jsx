import { useCallback, useState ,useEffect, useRef } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [length,setlength]= useState(8);
  const [number,setnumber]= useState(false);
  const [character,setcharacter]= useState(false);
  const [password,setpassword]= useState("");
  
  const passwordRef=useRef(null)

  const passwordgenerator=useCallback(()=>{
    let pass="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(number){
      str+="0123456789"
    }
    if(character){
      str+="@#$%^&*()!+_"
    }
    for(let i=1;i<=length;i++){
      let char= Math.floor(Math.random()*str.length);
      pass+=str.charAt(char);
    }
    setpassword(pass);
     
  },[length,number,character,setpassword])

  const clipboard =useCallback(
    () => {
      passwordRef.current?.select()
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)
    },
    [password]
  )
    
  

  useEffect(()=>{
  passwordgenerator()

  },[number,character,length,passwordgenerator])

   return (
    <>
     <div className='w-full max-w-[80vw] mx-auto shadow-md rounded-lg px-4 my-8 text-orange-400 bg-gray-700'>
      <h1 className='text-center text-white text-4xl mb-8'>password generator</h1>

      <div className="flex rounded-lg shadow mb-4">
  <input
    type="text"
    value={password}
    readOnly
    className="outline-none py-3 px-4 bg-white w-full rounded-l-lg text-orange-500 text-5xl"
    placeholder="password"
    ref={passwordRef}
  />

  <button
    onClick={clipboard}
    className="bg-blue-700 text-white px-6 py-2 rounded-r-lg shrink-0 cursor-pointer hover:bg-blue-800"
  >
    Copy
  </button>
</div >
      <div  className="flex itext-sm gap-19 mt-7">
      <div className='flex item-center gap-x-1'>
        <input
         type="range"
         min={6}
         max={100}
         value={length}
         className='cursor-pointer'
         onChange={(e)=>{ setlength(e.target.value)}}
         className='w-46 h-10'
         />
         <label className='text-2xl mx-4'>   length : {length}</label>

      </div>
      
      <div className="flex item-center gap-x-2">
        <input
         type="checkbox"
         id="vanshnumber"
         defaultChecked={number}
         onChange={()=>{setnumber((prev)=>!prev)}}
         className='w-6 h-6 '
         

          />
          <label htmlFor='vanshnumber' className='text-2xl'> number</label>
      </div>
      <div className="flex item-center gap-x-2 ">
        <input
         type="checkbox"
         id="saininumber"
         defaultChecked={character}
         onChange={()=>{setcharacter((prev)=>!prev)}}
         className='w-6 h-6'
         
         

          />
          <label htmlFor='vanshnumber' className='text-2xl'> character</label>
      </div>
        </div>
     </div>
    </>
  )
}

export default App
