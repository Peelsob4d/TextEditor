const selectedField = document.querySelector('.Selected');
const textField = document.querySelector('.TextField');
const boldButton = document.querySelector('.Bold');

let selection;
let range;

function undoBold() {
  const text = document.createTextNode(selection.toString());
  range.deleteContents();
  textField.childNodes.forEach(
    (node) => node.innerText === '' && textField.removeChild(node),
  );
  range.insertNode(text);
}

function insertBold(tagString) {
  let tag = document.createElement(tagString);
  tag.textContent = selection.toString();
  range.deleteContents();
  range.insertNode(tag);
  textField.childNodes.forEach(
    (node) => node.innerText === '' && textField.removeChild(node),
  );
  selection.collapse(tag, 0);
  selection.extend(tag, 1);
}

document.addEventListener('selectionchange', (e) => {
  selection = document.getSelection();
  range = selection.getRangeAt(0);
  selectedField.innerHTML = selection.toString();
  console.log(selection);
});

boldButton.addEventListener('click', (e) => {
  const anchor = selection.anchorNode.tagName;
  const focus = selection.focusNode.tagName;
  const parent_anchor = selection.anchorNode.parentElement.tagName;
  const parent_focus = selection.focusNode.parentElement.tagName;
  const base = selection.baseNode.tagName;

  (anchor === 'B' && focus === 'B') ||
  (parent_anchor === 'B' && parent_focus === 'B')
    ? undoBold()
    : insertBold('b');
  ((anchor === 'B' && focus === 'B' && base !== 'B') ||
    (parent_anchor === 'B' && parent_focus === 'B' && base !== 'B')) &&
    insertBold('b');
});
