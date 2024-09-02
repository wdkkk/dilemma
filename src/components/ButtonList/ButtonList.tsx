import SVGSelector from '../../assets/SVGSelector'
import {buttons} from './buttonsData'
import StarterKit from "@tiptap/starter-kit";
import s from './ButtonList.module.scss'

import { Editor, extensions, useEditor } from '@tiptap/react';
import { tasksSlice } from '../../reducers/tasks';


type Button = {
  name : string;
  function: (editor: Editor | null) => void;
}


const extensions = [StarterKit];
const ButtonList = () => {
  
  console.log(buttons)
  return (
      buttons.map((btn : Button) => {
        <button onClick={() => btn.function(editor)}>
          <SVGSelector name={btn.name}/>
        </button>
      })

  )
}

export default ButtonList
