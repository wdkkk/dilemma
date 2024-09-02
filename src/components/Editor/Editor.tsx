import { schema } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

const state = EditorState.create({ schema });
const view = new EditorView(document.body, {
  state,
  dispatchTransaction(transaction) {
    console.log(
      "Document size went from",
      transaction.before.content.size,
      "to",
      transaction.doc.content.size
    );
    const newState = view.state.apply(transaction);
    view.updateState(newState);
  },
});

const Editor = () => {
  return <div>Editor</div>;
};

export default Editor;
