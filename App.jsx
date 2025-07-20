import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
const [length,setLength]= useState(8)
const[number,setNumber]=useState(false);
const[char,setChar] = useState(false);
const[password,setpassword]=useState("");

//ref hook 
const passwordRef = useRef(null);

// password generator function
const passwordGenerator = useCallback(()=>{
  let pass =""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (number) str += "0123456789"
  if (char)  str += "!@#$%^&*-_+=[]{}~`"
  for (let index = 1; index <=length; index++) {
    let i = Math.floor(Math.random()*str.length + 1)
    pass+= str.charAt(i);
  }
  setpassword(pass);
},[length,number,char,setpassword])
// copy password
const copytoClip =useCallback(()=>{
  window.navigator.clipboard.writeText(password)
},[password]);

// kab kab run hoga
useEffect(()=>{passwordGenerator()},[length,number,char,passwordGenerator])

  return (
    <>
  <div className='h-40 max-w-[90%] w-[80%]  p-2 bg-gray-700 rounded-xl flex items-center gap-2 flex-wrap justify-center flex-col'>
    <div>
      <input type="text" name="passwordValue"
      readOnly value={password} ref={passwordRef} placeholder='password' className='bg-gray-100 font-black  text-black max-w-[70%] rounded-2xl p-1 text-center ring-3 ring-black ' />
      <label htmlFor="passwordValue" className='bg-red-500 text-md font-bold rounded mx-2 p-1 hover:ring-red-900 hover:ring-3' onClick={copytoClip}>COPY </label>
    </div>
    <div className='flex items-center justify-center gap-1'>
      <input type="range" name="lengthRange" min={0} max={20} value={length} onChange={(e)=>{setLength(e.target.value)}} />
      <label htmlFor="lengthRange"> length: {length} </label>
    </div>
    <div className='flex items-center justify-center gap-2'>
      <input type="checkbox"
      defaultChecked={number} 
      onChange={() => {
          setNumber((prev) => !prev )}} id="numAllow" />
      <label htmlFor="numAllow">number</label>
      <input type="checkbox"
      defaultChecked={char}
      onChange={() => {
                  setChar((prev) => !prev )
              }} id="charAllow"
       />
      <label htmlFor="numAllow">character</label>
      </div>

 </div>
  </>
  )
}

export default App
