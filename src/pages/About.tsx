import { ChangeEvent, FormEvent, useState } from "react"



export function About() {

  const [selected,setSelected] = useState<string[]>([])
  const allValue=['apple','orange','mango','durian','pineapple']
  const [show,setShow] = useState(false)

  const handleOnchange=(e: ChangeEvent<HTMLSelectElement>)=>{
    const {value}=e.target
    if(value==='all'){
        if(allValue.length ===selected.length){
          handleReset()
        } else {
          setSelected([...allValue])
        }
      } else if(!selected.includes(value)){
        setSelected([...selected,value])
      } else{
        setSelected(selected.filter(item=>item!==value))
      }
    }
    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
      const name = (e.currentTarget.elements[0] as HTMLInputElement).value
      const selection = (e.currentTarget.elements[1] as HTMLInputElement).value
      e.preventDefault()
      alert(`username:${name} chosed:${JSON.stringify(selected)}`)
      setSelected([])
    }

    const handleReset=()=>{
      setSelected([])
    }

  return (
  <div>
    {
      JSON.stringify(selected)
    }
    <form onSubmit={handleSubmit} className=''>
      <div>
        <label htmlFor="username">username</label>
        <input type='text' id="username"/>
      </div>
      <div>
        <label htmlFor="identity">identity</label>
        <input type='text' id="identity"/>
      </div>
      <div style={{display:'block',}}>
        <label htmlFor="selection">selection</label>
        <select multiple={true} style={{height:`${show?'123px':'22px'}`,overflow:'hidden',}} onClick={(e:any)=>handleOnchange(e)}>
          <option value='all'>all </option>
          <option value='apple'>apple</option>
          <option value='orange'>orange</option>
          <option value='mango'>mango</option>
          <option value='durian'>durian</option>
          <option value='pineapple'>pineapple</option>
        </select>
        <select onClick={()=>setShow(!show)} style={{backgroundColor:'white',position:'absolute',borderLeft:'0px',transform:'translateX(-21px)',height:'20px',borderBottom:'0px',}}>
        </select>
      </div>
      <button onClick={handleReset} type='reset'>reset</button>
      <button type='submit'>submit</button>
    </form>
  </div>)
}
