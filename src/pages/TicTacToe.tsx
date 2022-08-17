import {  useState,useEffect } from "react"
import { Container } from "react-bootstrap"
import { Col, Row } from "react-bootstrap"

const winLayout=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [0,3,6],
  [1,4,7],
  [2,5,8]
]
const originalState = new Array(9).fill('')
export function TicTacToe() {
  const [original,setOriginal] = useState<string[]>(originalState)
  const [player,setPlayer] = useState('X')
  const handleClick=(indx:number)=>{
    setOriginal((prev)=>{
      const newLayout = [...prev]
      newLayout[indx] = player
      return newLayout
    })
    if(player==='X'){
      setPlayer('O')
    } else {
      setPlayer('X')
    }
  }

  useEffect(()=>{
    if(winLayout.find((i)=>original[i[0]] === original[i[1]] && original[i[1]]===original[i[2]] && original[i[2]]!=='')!==undefined){
      if(player ==='X'){
        alert(`O win`)
      } else {
        alert(`X win`)
      }
      setOriginal(originalState)
    }else if(!original.includes('')){
      alert(`No winner`)
      setOriginal(originalState)
    }
  },[original])

  return (
  <Container className="d-grid " style={{border:'2px solid black',height:'900px',width:'800px'}}>
    <Row>
      {
        original.slice(0,3).map((item,indx)=><Col className="" key={indx} style={{border:'2px solid black'}}>
        <span className="d-grid justify-content-center align-items-center" style={{height:'100%',width:"100%",fontSize:'40px'}} onClick={()=>handleClick(indx)}>{item}</span>
        </Col>)
      }
    </Row>
    <Row>
    {
      original.slice(3,6).map((item,indx)=><Col className="" key={indx} style={{border:'2px solid black'}}>
      <span className="d-grid justify-content-center align-items-center" style={{height:'100%',width:"100%",fontSize:'40px'}} onClick={()=>handleClick(indx+3)}>{item}</span>
      </Col>)
    }
    </Row>
    <Row>
    {
      original.slice(6,9).map((item,indx)=><Col key={indx} style={{height:'100%',width:"100%",border:'2px solid black'}}>
        <span className="d-grid justify-content-center align-items-center" style={{height:'100%',width:"100%",fontSize:'40px'}} onClick={()=>handleClick(indx+6)}>{item}</span>
      </Col>)
    }
    </Row>
  </Container>)
}
