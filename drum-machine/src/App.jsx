
import { useEffect, useRef, useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [playState,setPlayState]=useState('')
  const [playAll,setPlayAll]=useState([])
  const powerRef=useRef(null)
  const volumeRef=useRef(0)
  const [disabledButton,setDisabledButton]=useState(false)

  const data=[
    {
      audio:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
      key:'Q',
      name:'Heater1',
      keyCode:81

    },
    {
      audio:'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
      key:'W',
       name:'Heater2',
       keyCode:87

    },
    {
      audio:'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
      key:'E',
       name:'Heater3',
        keyCode:69

    },
    {
      audio:'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
      key:'A',
       name:'Heater4',
        keyCode:65

    },
    {
      audio:'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
      key:'S',
       name:'Clap',
        keyCode:83

    },
    {
      audio:'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
      key:'D',
       name:'Open-HH',
        keyCode:68

    },
    {
      audio:"https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      key:'Z',
       name:'Kick-n-Hat',
        keyCode:90

    },
    {
      audio:'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
      key:'X',
       name:'Kick',
        keyCode:88

    },
    {
      audio:'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
      key:'C',
       name:'Closed-HH',
        keyCode:67

    }
  ]

  let currenTIndex=0

  let timeout 

  function playAllTones(){
   
    clearTimeout(timeout)
    

   
       if(currenTIndex<(playAll.length)){
        const currentAudio=playAll[currenTIndex]
       
         currentAudio.addEventListener("ended",()=>{
          currenTIndex=currenTIndex+1 
          playAllTones()
         })
         currentAudio.play()
         }
      
         if(currenTIndex===playAll.length){
          timeout=setTimeout(()=>{
           
            setDisabledButton(false)
            setPlayAll([])
            
       
          },3000)
      
         }


  }
  

  function playSoundWithkey(e){
    if(powerRef.current.checked===false){
      alert("power is off")
      return
    }
    
    const keyCodes=['Q','W','E','A','S','D','Z','X','C']
    if(keyCodes.includes(e.key.toUpperCase())){
   
     
      const audioElement=document.getElementById(e.key.toUpperCase())
      setPlayAll([...playAll,audioElement])

      console.log(playAll,'playAll')

      audioElement.play()
      audioElement.volume=volumeRef.current.value
      const documentElement=data.find(item=>item.key===e.key.toUpperCase())
      setPlayState(documentElement.name)
      const documentElementWithId=document.getElementById(documentElement.keyCode)
      documentElementWithId.classList.add('yellow')
      setTimeout(()=>{
        documentElementWithId.classList.remove('yellow')
      },200)

    }

  }
 
 

 

  useEffect(()=>{
    document.body.addEventListener("keydown",playSoundWithkey)

    return ()=>{
      document.body.removeEventListener("keydown",playSoundWithkey)
      
    }

  },[])






  const playSound=({audio,key,name,keyCode})=>{
    if(powerRef.current.checked===false){
      alert("power is off")
      return
    }
    const audioID=key
    const elementID=keyCode
    setPlayState(name)
    const audioElement=document.getElementById(audioID)
    setPlayAll([...playAll,audioElement])
    console.log(playAll,'playAll by click')
    
    audioElement.volume=volumeRef.current.value
    audioElement.play()
    const drumPadElement=document.getElementById(elementID)
    drumPadElement.classList.add('yellow')
    setTimeout(()=>{
      drumPadElement.classList.remove('yellow')

    },[200])

  }

 
  
 

  return (
   <div id='drum-machine'>
   <div className='all-drumpads'>
    {data.map((item,index)=>{
      return <div key={index}id={item.keyCode}className='drum-pad'onClick={()=>playSound(item)}>
        {item.key}
        <audio id={item.key} src={item.audio}className='clip' />
       
        </div>
    })}
 
   </div>
   <div className='other-elements'>
   <div id='display'>
    {playState} is playing

   </div>
   <div class="form-check form-switch power-div">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"ref={powerRef}/>
  <label class="form-check-label" for="flexSwitchCheckChecked">Power</label>
</div>
   <div id='range-selector'>
   <label for="customRange3" class="form-label">Adjust Volume</label>
<input type="range" class="form-range" min="0" max="1" step=".25" id="customRange3"ref={volumeRef}/>
   </div>
   <div >
    <button onClick={()=>{playAllTones();setDisabledButton(true)}}disabled={disabledButton}id='playAll'>Play All</button>
   </div>

   </div>
  
   </div>
  )
}

export default App
