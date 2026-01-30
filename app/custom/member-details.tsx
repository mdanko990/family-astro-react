import { MouseEventHandler, useState } from "react"

interface MemberDetailsProps {
  close: MouseEventHandler<HTMLButtonElement>
}

export default function MemberDetails({ close }: MemberDetailsProps) {
  const [isAlive, setIsAlive] = useState(true)
  const [addBaptismDay , setAddBaptismDay] = useState(false)
  const [addFuneralDay, setAddFuneralDay] = useState(false)

  return <div className='h-full w-100 shadow-xl flex flex-col p-3 gap-2'>
    <div className="flex">
      <h3>Surname name</h3>
      <button className="ml-auto" type="button" onClick={close}>close</button>
    </div>
    <a href="#" className="text-xs">See more information</a>
    <input placeholder="name"/>
    <input placeholder="patronym"/>
    <input placeholder="surname"/>
    <input placeholder="birthday"/>
    <input placeholder="birth place"/>
    <div>
      <input type="checkbox" id="isAlive" name="addBaptismDay" checked={addBaptismDay} onChange={()=>setAddBaptismDay(!addBaptismDay)}/>
      <label htmlFor="addBaptismDay">Add baptism day</label>
    </div>
    {addBaptismDay && <input placeholder="addBaptismDay"/>}
    <div>
      <input type="checkbox" id="isAlive" name="isAlive" checked={isAlive} onChange={()=>setIsAlive(!isAlive)}/>
      <label htmlFor="isAlive">is alive</label>
    </div>
    {!isAlive && <>
    <input placeholder="deathday"/>
    <input placeholder="death place"/>
    <div>
      <input type="checkbox" id="isAlive" name="addFuneralDay" checked={addFuneralDay} onChange={()=>setAddFuneralDay(!addFuneralDay)}/>
      <label htmlFor="addFuneralDay">Add funeral day</label>
    </div>
    {addFuneralDay && <input placeholder="addFuneralDay"/>}
    </>
    }
    <div>
      <p>Save updates</p>
      <p>Delete this member</p>
    </div>
  </div>
}