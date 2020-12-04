export function createEl(elName) {
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

    this.cssEditorTextInput = createEl("input");
    this.cssEditorTextInfo = createEl("p");

    this.htmlEditorCaptions = createEl("div");
    this.htmlEditorContent = createEl("div");

    this.htmlEditorLineNumeric = createEl("div");
    this.htmlEditorText = createEl("div");

    this.rightMenuTitle = createEl("div");
    this.rightMenuLevels = createEl("div");
    //
    this.currentLevelButton = null;

    this.imageBoxTitle = createEl("div");
    this.imageBoxContent = createEl("div");
    this.imageBoxContentHover = null;

    this.popupDiv = createEl("div");
    this.deactivatePopup = null;
  }

  configurateLayout() {
    this.body.setAttribute("class", "main-bg");

    this.mainFlexBox.setAttribute("class", "flex main-box");
    this.gameFlexBox.setAttribute("class", "flex flex-wrap gameBox");
    this.rightMenuFlexBox.setAttribute("class", "flex flex-wrap rightMenuBox");

    this.imageBox.setAttribute("class", "flex flex-wrap imageBox");
    this.editorsBox.setAttribute("class", "flex editorsBox");

    this.configurateCssEditor();
    this.configurateHtmlEditor();

    this.configurateRightMenu();
    this.initImageBox();

    this.editorsBox.appendChild(this.cssEditorBox);
    this.editorsBox.appendChild(this.htmlEditorBox);

    this.gameFlexBox.appendChild(this.imageBox);
    this.gameFlexBox.appendChild(this.editorsBox);

    this.mainFlexBox.appendChild(this.gameFlexBox);
    this.mainFlexBox.appendChild(this.rightMenuFlexBox);

    this.body.appendChild(this.mainFlexBox);
    this.configuratePopup();
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
    this.addTextInCssEditor();
  }

  addTextInCssEditor() {
    this.cssEditorTextInput.setAttribute("class", "css_editor-input_field");
    this.cssEditorTextInput.setAttribute("type", "text");
    this.cssEditorTextInput.setAttribute("placeholder", "input your code here");

    this.cssEditorTextInfo.innerText = "{\n"
    + "*Styles would go here*"
    + "\n}";

    this.cssEditorText.appendChild(this.cssEditorTextInput);
    this.cssEditorText.appendChild(this.cssEditorTextInfo);
  }

  configurateHtmlEditor() {
    this.htmlEditorBox.setAttribute("class", "htmlEditorBox");

    this.htmlEditorCaptions.setAttribute("class", "flex cssEditorCaptions");
    this.htmlEditorContent.setAttribute("class", "flex cssEditorContent");

    this.htmlEditorLineNumeric.setAttribute("class", "flex flex-wrap editor-line_numeric");
    this.htmlEditorText.setAttribute("class", "editor-text-html showSpaces");

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
  }

  configurateRightMenu() {
    this.rightMenuTitle.setAttribute("class", "flex right_menu-title");
    this.rightMenuLevels.setAttribute("class", "flex flex-wrap right_menu-content");
    this.rightMenuTitle.innerText = "Levels";

    this.rightMenuFlexBox.appendChild(this.rightMenuTitle);
    this.rightMenuFlexBox.appendChild(this.rightMenuLevels);
  }

  initLevelsField(levels) {
    const levelNameFromStorage = localStorage.getItem("vetaniExist-rs_css-curr_lvl");
    console.log("loc stor find ");
    console.log(levelNameFromStorage);
    console.log(typeof levelNameFromStorage);
    console.log(typeof levels[1].getLevelName());
    for(let i = 0 ; i < levels.length; i += 1) {
      const levelButton = configurateButton(levels[i].getLevelName());
      levelButton.classList.add("button_level");
      this.rightMenuLevels.appendChild(levelButton);

      levelButton.addEventListener("click", () => {
        this.setHtmlEditorText(levels[i].getLevelHtml());
        this.configurateImageBoxContent(levels[i].getLevelHtml());
        if (this.currentLevelButton !== null) {
          this.currentLevelButton.classList.remove("button_level-active");
          this.currentLevelButton = levelButton;
          this.currentLevelButton.classList.add("button_level-active");
          localStorage.setItem("vetaniExist-rs_css-curr_lvl", levels[i].getLevelName());

        } else {
          this.currentLevelButton = levelButton;
          this.currentLevelButton.classList.add("button_level-active");
          localStorage.setItem("vetaniExist-rs_css-curr_lvl", levels[i].getLevelName());
        }
      });

      if (levelNameFromStorage && levelNameFromStorage === levels[i].getLevelName()) {
        levelButton.click();
      }
    }
  }

  initImageBox() {
    this.imageBoxTitle.setAttribute("class", "flex right_menu-title");
    this.setImageBoxTitle("test");

    this.imageBoxContent = createEl("div");
    this.imageBoxContent.setAttribute("class", "flex image_box-content");

    this.imageBox.appendChild(this.imageBoxTitle);
    this.imageBox.appendChild(this.imageBoxContent);
  }

  parseNodeForChildren(node) {
    let clone = node;
    console.log("clone" , clone);
    let nodes = [];
    for (let i = 0; i < clone.childNodes.length; i += 1) {
      const curNode = clone.childNodes[i];
      if (curNode.nodeType !== Node.TEXT_NODE) {
        nodes.push(curNode);
      } else {
        console.log("text");
        console.log(curNode.parentNode);
        console.log(curNode.classList)
        curNode.textContent = "";
      }
    }
    

    console.log("return");
    console.log(nodes);
    return nodes;
  }

  configurateImageBoxContent(htmlObject) {
    // обойдем все тэги принятого объекта
    console.log("configurateImageBoxContent");
    let clone = htmlObject.cloneNode(true);
    console.log("startClone");
    console.log(clone.cloneNode(true));
    console.log(clone);
    let nodes = [];

    let arrOfActivatableElements = ["PLATE", "TABLE", "LEMON", "APPLE"];
    nodes = nodes.concat(this.parseNodeForChildren(clone));

    console.log("работаем с клоном");
    console.log(clone.tagName);
    if (arrOfActivatableElements.includes(clone.tagName)) {
      clone.classList.add("active");
    }

    while (nodes.length) {
      let curNode = nodes.shift();
      if (![...curNode.classList].includes("block-info")) {
        nodes = nodes.concat(this.parseNodeForChildren(curNode));
        console.log("new nodes");
        console.log(nodes);
        console.log("curNode");
        console.log(curNode.tagName);
        if (arrOfActivatableElements.includes(curNode.tagName)) {
          console.log(curNode.tagName);
          curNode.classList.add("active");
          console.log(curNode);
        }

        curNode.addEventListener("mouseenter", () => {
          if (this.imageBoxContentHover) {
            this.imageBoxContentHover.classList.remove("active-data");
            this.imageBoxContentHover = curNode;
            this.imageBoxContentHover.classList.add("active-data");
            console.log("тутачки2");
            console.log(this.imageBoxContentHover);
          } else {
            this.imageBoxContentHover = curNode;
            this.imageBoxContentHover.classList.add("active-data");
            console.log("тутачки");
            console.log(this.imageBoxContentHover);
          }
        });
        curNode.addEventListener("mouseout", (event) => {
          this.imageBoxContentHover.classList.remove("active-data");
          this.imageBoxContentHover = event.relatedTarget ;
          this.imageBoxContentHover.classList.add("active-data");
          // curNode.classList.remove("active-data");
          // this.imageBoxContentHover = null;
        });
        // curNode.innerText = "";
      }

    }

    // console.log(clone);
    this.imageBoxContent.innerText = "";
    this.imageBoxContent.appendChild(clone);
  }

  setImageBoxTitle(str) {
    this.imageBoxTitle.innerText = str;
  }

  getEditorEnterButton() {
    return this.cssEditorEnterButton;
  }
  getEditorTextInput() {
    return  this.cssEditorTextInput;
  }

  getEditorTextInputValue() {
    return this.cssEditorTextInput.value;
  }

  setEditorTextInputValue(newVal) {
    this.cssEditorTextInput.value = newVal;
  }

  getCurrentLevelButton() {
    return this.currentLevelButton;
  }

  getEditorsBox() {
    return this.editorsBox;
  }

  setEditorBoxErrorAnimation() {
    this.editorsBox.classList.add("error");
    setTimeout(() => this.editorsBox.classList.remove("error") ,310);
  }

  addLevelPassAnimation(el) {
    el.classList.add("win");
    el.classList.remove("shouldBeSelected");
    // setTimeout(() => this.editorsBox.classList.remove("win") ,310);
  }

  tryGetNextLevelButton() {
    return this.getCurrentLevelButton().nextSibling ? 1 : 0; 
  }

  configuratePopup() {
    this.popupDiv.setAttribute("id", "popup_div");
    this.popupDiv.innerText = "YOUR WIN!";
  }
  
  activatePopup() {
    this.body.appendChild(this.popupDiv);

    this.deactivatePopup = this.deactivateFunc.bind(this);
    this.body.addEventListener("click", this.deactivatePopup, false);
  }

  deactivateFunc() {
    console.log("it is work");
    this.body.removeChild(this.popupDiv);
    this.body.removeEventListener("click",this.deactivatePopup, false);
  }

  trySetNextCurrentLevelButton() {
    console.log("test");
    this.currentLevelButton.nextSibling;
    console.log(this.currentLevelButton);
    console.log(this.currentLevelButton.nextSibling);
    console.log("test pass")
    if (this.getCurrentLevelButton().nextSibling) {
      this.currentLevelButton.classList.toggle("button_level-active");
      this.currentLevelButton = this.getCurrentLevelButton().nextSibling;
      console.log("we here, johny");
      console.log(this.currentLevelButton);
      this.currentLevelButton.click();
      return true;
    }
    return false;
  }

  setHtmlEditorText(newHtml) {
    this.htmlEditorText.innerText = "";
    console.log("newHtml");
    console.log(newHtml);
    console.log(typeof newHtml);
    let tmpStr = newHtml.textContent.slice();

    console.log(newHtml.textContent)
    console.log(tmpStr)
    this.htmlEditorText.innerText = "";
    const clone = newHtml.cloneNode(true);
    this.htmlEditorText.appendChild(clone);
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
