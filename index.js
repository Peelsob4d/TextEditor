const selectedField = document.querySelector('.Selected');
const textField = document.querySelector('.TextField');
const boldButton = document.querySelector('.Bold');
let selection;
let range;
document.addEventListener('selectionchange', (e) => {
  selection = document.getSelection();
  range = selection.getRangeAt(0);
  selectedField.innerHTML = selection.toString();
});
boldButton.addEventListener('click', (e) => {
  const anchor = selection.anchorNode.tagName;
  const focus = selection.focusNode.tagName;
  const parent_anchor = selection.anchorNode.parentElement.tagName;
  const parent_focus = selection.focusNode.parentElement.tagName;

  function insertBold() {
    let bold = document.createElement('b');
    bold.textContent = selection.toString();
    range.deleteContents();
    range.insertNode(bold);
    textField.childNodes.forEach(
      (node) => node.innerText === '' && textField.removeChild(node),
    );
    selection.collapse(bold, 0);
    selection.extend(bold, 1);
  }

  function undoBold() {
    const text = document.createTextNode(selection.toString());
    console.log(text);
    range.deleteContents();
    textField.childNodes.forEach(
      (node) => node.innerText === '' && textField.removeChild(node),
    );
    range.insertNode(text);
  }

  (anchor === 'B' && focus === 'B') ||
  (parent_anchor === 'B' && parent_focus === 'B')
    ? undoBold()
    : insertBold();
});
