import "./App.css";
import Editor from "@draft-js-plugins/editor";
import { convertFromRaw, convertToRaw, EditorState, RichUtils } from "draft-js";
import createImagePlugin from "@draft-js-plugins/image";
import { useEffect, useRef, useState } from "react";
import "@draft-js-plugins/image/lib/plugin.css";
import { InlineStyleControls } from "./Components";
const imagePlugin = createImagePlugin();
function App() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef();
  useEffect(() => {}, []);
  function handleToolbar(type, payload) {
    if (type === "text") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, payload));
    }
    if (type === "image") {
      setEditorState(imagePlugin.addImage(editorState, payload));
    }
  }
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ border: "1px solid black" }}>
          <div className="toolbar">
            <InlineStyleControls
              editorState={editorState}
              onToggle={handleToolbar}
            />
          </div>
          <Editor
            ref={editor}
            editorState={editorState}
            onChange={setEditorState}
            plugins={[imagePlugin]}
          />
        </div>
      </div>
      <pre>
        {JSON.stringify(
          convertToRaw(editorState?.getCurrentContent()),
          null,
          2
        )}
      </pre>
    </div>
  );
}

export default App;
