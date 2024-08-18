import { ReactNode } from 'react'
import s from './TaskDisplayButton.module.scss'

type Props = {
    children: ReactNode
}

type ButtonState = "default" | "selected"

const buttonType:ButtonState = "default"




const TaskDisplayButton = (props: Props) => {
  return (
    <div className = {`${buttonType === "default" ? s.default : s.selected}`}> 
        {props.children} 
    </div>
  )
}

export default TaskDisplayButton