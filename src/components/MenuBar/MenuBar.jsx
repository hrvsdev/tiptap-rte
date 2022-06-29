import BoldIcon from "../../assets/Bold";
import ItalicIcon from "../../assets/Italic";
import UnderlineIcon from "../../assets/Underline";
import StrikethroughIcon from "../../assets/Strikethrough";
import ClearMarksIcon from "../../assets/ClearFormat";
import UndoIcon from "../../assets/Undo";
import RedoIcon from "../../assets/Redo";
import ClearNodeIcon from "../../assets/Normal";
import H1Icon from "../../assets/H1";
import H2Icon from "../../assets/H2";
import H3Icon from "../../assets/H3";
import H4Icon from "../../assets/H4";
import BlockquoteIcon from "../../assets/Blockquote";
import CodeIcon from "../../assets/Code";
import BulletListIcon from "../../assets/UnorderedList";
import OrderedListIcon from "../../assets/OrderedList";
import TaskListIcon from "../../assets/CheckList";
import AlignLeftIcon from "../../assets/AlignLeft";
import AlignCenterIcon from "../../assets/AlignCenter";
import AlignRightIcon from "../../assets/AlignRight";
import AlignJustifyIcon from "../../assets/AlignJustify";
import LinkIcon from "../../assets/Link";
import UnLinkIcon from "../../assets/Unlink";
import CheckIcon from "../../assets/Check";

import { useRef } from "react";
import prependHttp from "prepend-http";

import { Dropdown } from "../Dropdown/Dropdown";

export function MenuBar({ editor, dropdownRef }) {
  // Returning if there is no editor instance
  if (!editor) return null;

  const linkInputRef = useRef();

  const undo = {
    onClick: () => editor.chain().focus().undo().run(),
    disabled: !editor.can().undo(),
  };

  const redo = {
    onClick: () => editor.chain().focus().redo().run(),
    disabled: !editor.can().redo(),
  };

  const bold = {
    onClick: () => editor.chain().focus().toggleBold().run(),
    className: editor.isActive("bold") ? "is-active" : null,
  };

  const italic = {
    onClick: () => editor.chain().focus().toggleItalic().run(),
    className: editor.isActive("italic") ? "is-active" : null,
  };

  const underline = {
    onClick: () => editor.chain().focus().toggleUnderline().run(),
    className: editor.isActive("underline") ? "is-active" : null,
  };

  const strike = {
    onClick: () => editor.chain().focus().toggleStrike().run(),
    className: editor.isActive("strike") ? "is-active" : null,
  };

  const clearMarks = {
    onClick: () => editor.chain().focus().unsetAllMarks().run(),
  };

  const h1 = {
    onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    className: editor.isActive("heading", { level: 1 }) ? "is-active" : null,
  };

  const h2 = {
    onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    className: editor.isActive("heading", { level: 2 }) ? "is-active" : null,
  };

  const h3 = {
    onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    className: editor.isActive("heading", { level: 3 }) ? "is-active" : null,
  };

  const h4 = {
    onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    className: editor.isActive("heading", { level: 4 }) ? "is-active" : null,
  };

  const bulletList = {
    onClick: () => editor.chain().focus().toggleBulletList().run(),
    className: editor.isActive("bulletList") ? "is-active" : null,
  };

  const orderedList = {
    onClick: () => editor.chain().focus().toggleOrderedList().run(),
    className: editor.isActive("orderedList") ? "is-active" : null,
  };

  const taskList = {
    onClick: () => editor.chain().focus().toggleTaskList().run(),
    className: editor.isActive("taskList") ? "is-active" : null,
  };

  const inlineCode = {
    onClick: () => editor.chain().focus().toggleCode().run(),
    className: editor.isActive("code") ? "is-active" : null,
  };

  const codeBlock = {
    onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    className: editor.isActive("codeBlock") ? "is-active" : null,
  };

  const blockquote = {
    onClick: () => editor.chain().focus().toggleBlockquote().run(),
    className: editor.isActive("blockquote") ? "is-active" : null,
  };

  const clearNode = {
    onClick: () => editor.chain().focus().clearNodes().run(),
  };

  const alignLeft = {
    onClick: () => editor.chain().focus().setTextAlign("left").run(),
    className: editor.isActive({ textAlign: "left" }) ? "is-active" : null,
  };

  const alignCenter = {
    onClick: () => editor.chain().focus().setTextAlign("center").run(),
    className: editor.isActive({ textAlign: "center" }) ? "is-active" : null,
  };

  const alignRight = {
    onClick: () => editor.chain().focus().setTextAlign("right").run(),
    className: editor.isActive({ textAlign: "right" }) ? "is-active" : null,
  };

  const alignJustify = {
    onClick: () => editor.chain().focus().setTextAlign("justify").run(),
    className: editor.isActive({ textAlign: "justify" }) ? "is-active" : null,
  };

  const link = {
    className: editor.isActive("link") ? "is-active" : null,

    openDropdown: () => {
      linkInputRef.current.value = ""
      const previousUrl = editor.getAttributes("link").href;
      if (previousUrl) linkInputRef.current.value = previousUrl;
      toggleDropdown();
    },

    setLink: () => {
      const url = linkInputRef.current.value;
      if (!url) {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
      }
      if (url) {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: prependHttp(url) })
          .run();
      }
      toggleDropdown();
    },

    unsetLink: () => {
      editor.chain().focus().unsetLink().run();
      toggleDropdown();
    },
  };

  const toggleDropdown = () =>
    dropdownRef.current.classList.toggle("dropmenu-showed");

  return (
    <main className="menu-bar">
      <div className="block-wrapper">
        <button {...undo}>
          <UndoIcon />
        </button>
        <button {...redo}>
          <RedoIcon />
        </button>
      </div>

      <div className="block-wrapper">
        <button {...bold}>
          <BoldIcon />
        </button>
        <button {...italic}>
          <ItalicIcon />
        </button>
        <button {...underline}>
          <UnderlineIcon />
        </button>
        <button {...strike}>
          <StrikethroughIcon />
        </button>
        <button {...clearMarks}>
          <ClearMarksIcon />
        </button>
      </div>

      <div className="block-wrapper">
        <Dropdown
          btn={<LinkIcon />}
          btnClass={link.className}
          toggleDropdown={link.openDropdown}
          dropdownRef={dropdownRef}
        >
          <div className="linkmenu-wrapper">
            <input
              ref={linkInputRef}
              type="text"
              placeholder="Enter link"
              className="linkmenu-item"
            />
            <button className="linkmenu-item" onClick={link.unsetLink}>
              <UnLinkIcon />
            </button>
            <button className="is-active linkmenu-item" onClick={link.setLink}>
              <CheckIcon />
            </button>
          </div>
        </Dropdown>
      </div>

      <div className="block-wrapper">
        <button {...h1}>
          <H1Icon />
        </button>
        <button {...h2}>
          <H2Icon />
        </button>
        <button {...h3}>
          <H3Icon />
        </button>
        <button {...h4}>
          <H4Icon />
        </button>
      </div>

      <div className="block-wrapper">
        <button {...bulletList}>
          <BulletListIcon />
        </button>
        <button {...orderedList}>
          <OrderedListIcon />
        </button>
        <button {...taskList}>
          <TaskListIcon />
        </button>
      </div>

      <div className="block-wrapper">
        <button {...inlineCode}>
          <CodeIcon />
        </button>
        <button {...codeBlock}>
          <CodeIcon />
        </button>
        <button {...blockquote}>
          <BlockquoteIcon />
        </button>
        <button {...clearNode}>
          <ClearNodeIcon />
        </button>
      </div>

      <div className="block-wrapper">
        <button {...alignLeft}>
          <AlignLeftIcon />
        </button>
        <button {...alignCenter}>
          <AlignCenterIcon />
        </button>
        <button {...alignRight}>
          <AlignRightIcon />
        </button>
        <button {...alignJustify}>
          <AlignJustifyIcon />
        </button>
      </div>
    </main>
  );
}
