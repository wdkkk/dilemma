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
import ButtonList from "../ButtonList/ButtonList";

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

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
           <SVGSelector name={"bold"}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          // disabled={!editor.can().chain().focus().toggleItalic().run()}
          // className={editor.isActive("italic") ? "is-active" : ""}
        >
          <SVGSelector name={"italic"}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          // disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <SVGSelector name={"strike"}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          // disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          <SVGSelector name={"code"}/>
        </button>
        {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </button> */}
        
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          <SVGSelector name={"paragraph"}/>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          <SVGSelector name={"h1"}/>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          <SVGSelector name={"h2"}/>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          <SVGSelector name={"h3"}/>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          <SVGSelector name={"h4"}/>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          <SVGSelector name={"h5"}/>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          <SVGSelector name={"h6"}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <SVGSelector name={"bulletlist"}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <SVGSelector name={"orderedlist"}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <SVGSelector name={"codeblock"}/>
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <SVGSelector name={"horizontalrule"}/>
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <SVGSelector name={"undo"}/>
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <SVGSelector name={"redo"}/>
        </button>
        
      </div>

      <EditorContent className={"editor"} editor={editor} />
      <div></div>
      <ButtonList/>
    </div>
  );
};

export default Workspace;
