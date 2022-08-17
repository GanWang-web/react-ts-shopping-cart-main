import React from 'react'
import {SmallChart} from '../components/SmallChart'
type Props = {}
type IArr = {label: string,data:{count:number}[]}[]

const newDataSetArray = [
  {label:'overall score',data:[{count:0},{count:0},{count:0},{count:1}]},
  {label:'People',data:[{count:0},{count:0},{count:0},{count:1}]},
  {label:'VM',data:[{count:1},{count:0},{count:1},{count:1},{count:0}]},
  {label:'Product',data:[{count:0},{count:1},{count:0},{count:1}]},
  {label:'Standard',data:[{count:1},{count:0},{count:0},{count:1}]},
]
const setData=<T extends IArr>(newDataSetArray:T):T=>{
  let newData = []
  for(let i=0;i<newDataSetArray.length;i++){
    let firstNumIndex:number
    let lastNumIndex:number
    const {data} = newDataSetArray[i]
    for(let k in data){
      if(data[k].count>0){
        firstNumIndex = Number(k)
        break;
      }
    }
    for(let k=data.length-1;k>0;k--){
      if(data[k].count>0){
        lastNumIndex=k
        break;
      }
    }
    newData = data.map((item,index)=>{
      if(index>=firstNumIndex&&index<=lastNumIndex){
        return item
      } else {
        return undefined
      }
    })
    newDataSetArray[i].data = JSON.parse(JSON.stringify(newData))
  }
  console.log();
  return newDataSetArray
}

console.log(setData(newDataSetArray))


export default function Chart({}: Props) {
  return (
    <div>
      <SmallChart/>
    </div>
  )
}