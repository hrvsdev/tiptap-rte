import {  useRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

import {MenuBar} from "../MenuBar/MenuBar";

import "../../styles/index.css"
import "../../styles/styles.css"

export function Editor({ readOnly, value, setHTML, setJSON }) {

  const dropdownRef = useRef();

  const editor = useEditor({
    onUpdate: ({ editor }) => {
      setHTML && setHTML(editor.getHTML());
      setJSON && setJSON(editor.getJSON());
    },

    onFocus: () => {
      dropdownRef.current.classList.remove("dropmenu-showed");
    },

    content: value,

    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list",
          },
        },
      }),
      Underline,
      TaskList,
      TaskItem,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: "Wordify your thoughts ...",
      }),
      TextAlign.configure({
        types: ["paragraph", "heading"],
      }),
    ],
  });

  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    editor.setEditable(!readOnly);
  }, [readOnly, editor]);

  return (
    <>
      {!readOnly && <MenuBar editor={editor} dropdownRef={dropdownRef} />}
      <EditorContent editor={editor} />
    </>
  );
}
