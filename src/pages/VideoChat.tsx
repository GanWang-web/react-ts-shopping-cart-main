import React, { useRef,MediaHTMLAttributes, useState, useEffect } from 'react'
import Draggable, {DraggableCore} from 'react-draggable'; 


export const VideoChat = ()=> {
  const userOne = useRef<HTMLVideoElement>(null)
  const nodeRef =useRef(null)

  const successFunc=(mediaStream: MediaProvider | null)=>{
    if(userOne.current){
      const video = userOne.current
      if('srcObject' in video){
        video.srcObject = mediaStream;
      }
      video.onloadedmetadata=()=>{
        video.play()
      }
    }
  }
  
  useEffect(()=>{
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(successFunc)
  },[])

  return (
    <Draggable
        nodeRef={nodeRef}
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        // position={null}
        grid={[25, 25]}
        scale={1}
        // onStart={handleStart}
        // onDrag={handleDrag}
        // onStop={handleStop}
        >
        <div ref={nodeRef}>
          <div className="handle">
            <video className='w-6 h-6 bg-black' ref={userOne}  >
            </video>
          </div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
  )
}