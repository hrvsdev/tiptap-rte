import { storiesOf } from "@storybook/react";
import react, { useState } from "react";

import { Editor } from "../components/Editor/Editor";

const stories = storiesOf("app", module);

stories.add("editor", () => {
  const [HTML, setHTML] = useState();
  const [JSON, setJSON] = useState();

  return <Editor />;
});
