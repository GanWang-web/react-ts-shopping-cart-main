import { clearAllListeners } from '@reduxjs/toolkit';
import  {  useEffect, useState,useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const getRandomCoordinates:()=>number[]=() => {
  let min = 5;
  let max = 95;
  let x = Math.floor((Math.random()*(max-min+5)+min)/5)*5;
  let y =  Math.floor((Math.random()*(max-min+5)+min)/5)*5;

  return [x,y]
}


export function SnakeGame() {
  const [show, setShow] = useState(true);
  const [food,setFood]=useState(getRandomCoordinates())
  const [speed,setSpeed]=useState(200)
  const [direction,setDirection] = useState('ArrowRight')
  const directionRef = useRef<string|null>(null)
  directionRef.current = direction
  
  const [snakeDots,setSnakeDots] = useState([[0,0],[5,0]])
  const [pause,setPause] = useState(true)

  const moveSnake = () => {
    console.log(direction)

    const dots = JSON.parse(JSON.stringify(snakeDots));
    let head = dots[dots.length - 1];
    switch (direction) {
      case 'ArrowRight':
        head = [head[0] + 5, head[1]];
        break;
      case 'ArrowLeft':
        head = [head[0] - 5, head[1]];
        break;
      case 'ArrowDown':
        head = [head[0], head[1] + 5];
        break;
      case 'ArrowUp':
        head = [head[0], head[1] - 5];
        break;
    }
    dots.push(head);
    dots.shift();
    setSnakeDots(dots)
  }
  const checkIfOutOfBorders:()=>void=()=> {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      console.log('checkIfOutOfBorders', head[0],head[1])
      onGameOver();
    }
  }
  const enlargeSnake=()=> {
    let newSnake = snakeDots;
    newSnake.unshift([])
    setSnakeDots(newSnake)
  }
  
  const increaseSpeed:()=>void=()=> {
    if (speed > 10) {
      setSpeed(speed - 10)
    }
  }
  const checkIfEat=()=> {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(getRandomCoordinates())
      console.log('吃到了:',food)
      enlargeSnake();
      increaseSpeed();
    }
  }

  const onGameOver=()=> {
    alert(`Game Over. Snake length is ${snakeDots.length}`);
    setSnakeDots([[0,0],[5,0]])
    setDirection('ArrowRight')
    setSpeed(200)
    setPause(true)
  }

  const checkIfCollapsed=()=> {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.pop();
    snake.pop();
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
      console.log('checkIfCollapsed')
      onGameOver();
      }
    })
  }

  addEventListener('keydown',(event:KeyboardEvent)=>{
    console.log('点击事件：',event.code)
    if(['ArrowRight','ArrowLeft','ArrowDown','ArrowUp'].includes(event.code)){
      console.log(directionRef.current)
      console.log(direction)
      if(event.code===direction){
        return
      } else if(directionRef.current==='ArrowUp'&&event.code==='ArrowDown'){
        return
      }else if(directionRef.current==='ArrowDown'&&event.code==='ArrowUp'){
        return
      } else if(directionRef.current==='ArrowRight'&&event.code==='ArrowLeft'){
        return
      }else if(directionRef.current==='ArrowLeft'&&event.code==='ArrowRight'){
        return
      }

      setDirection(event.code)
      console.log('点击事件里的action:',direction)
      console.log('点击事件里的directionRef.current:',directionRef.current)
    } else if(event.code==='Space'){
      setPause(!pause)
    }
  })

  useEffect(()=>{
    const timer = setInterval(moveSnake, speed);
    if(pause){
      clearInterval(timer)
    } else {
      checkIfOutOfBorders()
      checkIfCollapsed();
      checkIfEat();
    }
    return ()=>{
      clearAllListeners()
      clearInterval(timer)
    }
  },[snakeDots,pause])

return (
    <Modal
    show={show}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    onHide={() => setShow(false)}
  >
    <Modal.Header closeButton>
      <Modal.Title className="d-flex justify-content-around gap-5" id="contained-modal-title-vcenter">
        <span>apples:{snakeDots.length-2}</span>
        {
          pause?<Button variant="danger" size="lg" onClick={()=>setPause(!pause)}>Start</Button>:<Button size="lg" onClick={()=>setPause(!pause)}>Pause</Button>
        }
      </Modal.Title>
    </Modal.Header>
    <Modal.Body style={{width:'800px',height:'800px'}}>
      {
        snakeDots.map((dot,i)=>{
          return(
            <span key={i} style={{position:'absolute',width:'5%',height:'5%',backgroundColor:"#000",zIndex:'2',left:`${dot[0]}%`,top:`${dot[1]}%`}}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          )
        })
      }
      <img src='/imgs/apple-svgrepo-com.svg' style={{position:'absolute',height:'5%',width:'5%',zIndex:'1',left:`${food[0]}%`,top:`${food[1]}%`}} />
    </Modal.Body>
  </Modal>
)}
