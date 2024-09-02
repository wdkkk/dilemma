import { Editor } from "@tiptap/react";

type Button = {
    name : string;
    function: (editor: Editor | null) => void;
}


export const buttons : Button[] = [
    {
        name: "bold",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().toggleBold().run()
            }
        }
    },
    {
        name: "italic",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().toggleItalic().run()
            }
        }
    },
    {
        name: "strike",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().toggleStrike().run()
            }
        }
    },
    {
        name: "code",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().toggleCode().run()
            }
        }
    },
    {
        name: "paragraph",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().setParagraph().run()
            }
        }
    },
    {
        name: "h1",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
        }
    },
    {
        name: "h3",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
        }
    },
    {
        name: "h2",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
        }
    },
    {
        name: "h4",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
        }
    },
    {
        name: "h5",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
        }
    },
    {
        name: "h6",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
        }
    },
    {
        name: "bulletlist",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().toggleBulletList().run()
            }
        }
    },
    {
        name: "orderedlist",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().toggleOrderedList().run()
            }
        }
    },
    {
        name: "codeblock",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().toggleCodeBlock().run()
            }
        }
    },
    {
        name: "horizontalrule",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().setHorizontalRule().run()
            }
        }
    },
    {
        name: "undo",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().undo().run()
            }
        }
    },
    {
        name: "redo",
        function: (editor: Editor | null ) => {
            if (editor !== null){
                editor.chain().focus().redo().run()
            }
        }
    },


]
