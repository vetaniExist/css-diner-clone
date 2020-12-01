function createEl(elName) {
  try {
    return document.createElement(elName);
  } catch (err) {
    throw new Error("Error in createEl func. Trying to do ".concat(elName).concat(" html tag").concat(" Errr log: ")
      .concat(err));
  }
}

function configurateButton(newInnnerText) {
  const newButton = createEl("button");
  newButton.classList.add("basic_button");
  newButton.innerText = newInnnerText;
  return newButton;
}

export class Layout {
  constructor() {
    this.body = document.body;

    this.mainFlexBox = createEl("div");
    this.gameFlexBox = createEl("div");
    this.rightMenuFlexBox = createEl("div");

    this.imageBox = createEl("div");
    this.editorsBox = createEl("div");
    this.cssEditorBox = createEl("div");
    this.htmlEditorBox = createEl("div");

    this.cssEditorCaptions = createEl("div");
    this.cssEditorContent = createEl("div");

    this.cssEditorLineNumeric = createEl("div");
    this.cssEditorText = createEl("div");
    this.cssEditorEnter = createEl("div");
    this.cssEditorEnterButton = configurateButton("enter");

    this.htmlEditorCaptions = createEl("div");
    this.htmlEditorContent = createEl("div");

    this.htmlEditorLineNumeric = createEl("div");
    this.htmlEditorText = createEl("div");
  }

  configurateLayout() {
    this.body.setAttribute("class", "main-bg");

    this.mainFlexBox.setAttribute("class", "flex main-box");
    this.gameFlexBox.setAttribute("class", "flex flex-wrap gameBox");
    this.rightMenuFlexBox.setAttribute("class", "flex rightMenuBox");

    this.imageBox.setAttribute("class", "imageBox");
    this.editorsBox.setAttribute("class", "flex editorsBox");

    this.configurateCssEditor();
    this.configurateHtmlEditor();

    this.editorsBox.appendChild(this.cssEditorBox);
    this.editorsBox.appendChild(this.htmlEditorBox);

    this.gameFlexBox.appendChild(this.imageBox);
    this.gameFlexBox.appendChild(this.editorsBox);

    this.mainFlexBox.appendChild(this.gameFlexBox);
    this.mainFlexBox.appendChild(this.rightMenuFlexBox);

    this.body.appendChild(this.mainFlexBox);
  }

  configurateCssEditor() {
    this.cssEditorBox.setAttribute("class", "flex flex-wrap cssEditorBox");

    this.cssEditorCaptions.setAttribute("class", "flex cssEditorCaptions");
    this.cssEditorContent.setAttribute("class", "flex cssEditorContent");

    this.cssEditorLineNumeric.setAttribute("class", "flex flex-wrap editor-line_numeric");
    this.cssEditorText.setAttribute("class", "editor-text");
    this.cssEditorEnter.setAttribute("class", "flex editor-enter");

    this.cssEditorBox.appendChild(this.cssEditorCaptions);
    this.cssEditorBox.appendChild(this.cssEditorContent);

    this.cssEditorContent.appendChild(this.cssEditorLineNumeric);
    this.cssEditorContent.appendChild(this.cssEditorText);
    this.cssEditorContent.appendChild(this.cssEditorEnter);

    const cssText = createEl("span");
    const styleText = createEl("span");

    cssText.setAttribute("class", "editor-title");
    styleText.setAttribute("class", "editor-title");

    cssText.innerText = "CSS Editor";
    styleText.innerText = "style.css";

    this.cssEditorCaptions.appendChild(cssText);
    this.cssEditorCaptions.appendChild(styleText);

    this.fillLineNumeric(this.cssEditorLineNumeric);
    this.cssEditorEnter.appendChild(this.cssEditorEnterButton);
  }

  configurateHtmlEditor() {
    this.htmlEditorBox.setAttribute("class", "htmlEditorBox");

    this.htmlEditorCaptions.setAttribute("class", "flex cssEditorCaptions");
    this.htmlEditorContent.setAttribute("class", "flex cssEditorContent");

    this.htmlEditorLineNumeric.setAttribute("class", "flex flex-wrap editor-line_numeric");
    this.htmlEditorText.setAttribute("class", "editor-text-html");

    this.htmlEditorBox.appendChild(this.htmlEditorCaptions);
    this.htmlEditorBox.appendChild(this.htmlEditorContent);

    this.htmlEditorContent.appendChild(this.htmlEditorLineNumeric);
    this.htmlEditorContent.appendChild(this.htmlEditorText);

    const htmlText = createEl("span");
    const styleText = createEl("span");

    htmlText.setAttribute("class", "editor-title");
    styleText.setAttribute("class", "editor-title");

    htmlText.innerText = "HTML Viewer";
    styleText.innerText = "table.html";

    this.htmlEditorCaptions.appendChild(htmlText);
    this.htmlEditorCaptions.appendChild(styleText);

    this.fillLineNumeric(this.htmlEditorLineNumeric);

    this.htmlEditorText.innerText = "<div>\n</div>" ;
  }

  fillLineNumeric(line) {
    line.innerText = "";
    for (let i = 1; i <= 20; i += 1) {
      const span = createEl("span");
      span.innerText = i;
      span.setAttribute("class", "numeric");
      line.appendChild(span);
    }
  }
}

export default Layout;
