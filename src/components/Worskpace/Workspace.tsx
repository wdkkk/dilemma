import StarterKit from "@tiptap/starter-kit";

import s from "./Workspace.module.scss";
import "./Workspace.scss";

import { State } from "../../types";

import { useEditor, EditorContent } from "@tiptap/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { store } from "../../store/store";
import { tasksSlice } from "../../reducers/tasks";

import { Task } from "../../types";
import SVGSelector from "../../assets/SVGSelector";

import { buttons } from "../../constants/buttonsData";

type AppDispatch = typeof store.dispatch;

const Workspace = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  let id;

  if (params.id === undefined) id = -1;
  else id = parseInt(params.id);

  const [textareaPlaceholder, setTextareaPlaceholder] = useState<string>("");

  const task: Task = useSelector((state: State) => {
    const temp: Task[] = state.tasks.tasks.filter((task) => task.id === id);

    if (temp[0]) {
      return temp[0];
    } else {
      navigate("/");
      return { id: -1, title: "", content: "" };
    }
  });

  const changeTaskTitle = (newTitle: string) => {
    if (newTitle !== "") {
      const obj = {
        id,
        title: newTitle,
      };

      dispatch(tasksSlice.actions.changeTaskTitle(obj));
    } else {
      setTextareaPlaceholder("untitled");

      const obj = {
        id,
        title: "untitled",
      };

      dispatch(tasksSlice.actions.changeTaskTitle(obj));
    }
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: task.content,
    onUpdate({ editor }) {
      const obj = {
        id,
        content: editor.getHTML(),
      };

      dispatch(tasksSlice.actions.changeTaskContent(obj));
    },
  });

  useEffect(() => {
    if (editor !== null) {
      editor.commands.setContent(task.content);
    }
  }, [params.id]);

  useEffect(() => {
    if (task.title === "untitled") setTextareaPlaceholder("untitled");
  }, [task.title]);

  if (!editor) {
    return null;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.titleWrapper}>
        <textarea
          value={task.title === "untitled" ? "" : task.title}
          placeholder={textareaPlaceholder}
          onChange={(e) => changeTaskTitle(e.target.value)}
        ></textarea>
      </div>

      <div className={s.buttonGroup}>
        {buttons.map((btn) => (
          <button key={btn.name} onClick={() => btn.function(editor)}>
            <SVGSelector name={btn.name} />
          </button>
        ))}
      </div>

      <EditorContent className={"editor"} editor={editor} />
      <div></div>
    </div>
  );
};

export default Workspace;
