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
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          Code
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          Paragraph
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          H4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          H5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          Blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </button>
        {/* <button
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "is-active"
              : ""
          }
        >
          Purple
        </button> */}
      </div>

      <EditorContent className={"editor"} editor={editor} />
      <div></div>
    </div>
  );
};

export default Workspace;
