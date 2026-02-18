import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot } from "lexical";

const theme = {
  paragraph: "editor-paragraph",
};

export default function Editor({ onContentChange }) {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError(error) {
      console.error(error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            style={{
              border: "1px solid #ccc",
              minHeight: "120px",
              padding: "10px",
              borderRadius: "6px",
            }}
          />
        }
        placeholder={<div>Write your blog content...</div>}
      />
      <HistoryPlugin />
      <OnChangePlugin
        onChange={(editorState) => {
          editorState.read(() => {
            const text = $getRoot().getTextContent();
            onContentChange(text);
          });
        }}
      />
    </LexicalComposer>
  );
}
