import LSU from "./localStorageUtils";
import logoRSS from "../assets/images/rs_school_js.svg";
import Linking from "./Linking";

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

export function parseNodeForChildren(node, shouldSafe) {
  const clone = node;
  const nodes = [];

  for (let i = 0; i < clone.childNodes.length; i += 1) {
    const curNode = clone.childNodes[i];
    if (curNode.nodeType !== Node.TEXT_NODE) {
      nodes.push(curNode);
    } else if (!shouldSafe) {
      const classes = [...curNode.parentNode.classList];
      if (!classes.includes("block-info-content")) {
        curNode.textContent = "";
      }
    }
  }
  return nodes;
}

function getChildWithPTag(node) {
  let nodes = [];
  const pTagNodes = [];
  nodes = nodes.concat(parseNodeForChildren(node, true));
  for (let i = 0; i < nodes.length; i += 1) {
    if (nodes[i].tagName === "P") {
      pTagNodes.push(nodes[i]);
    }
  }
  return pTagNodes;
}

function getAllNodes(node) {
  let nodes = [];
  nodes = parseNodeForChildren(node);
  for (let i = 0; i < nodes.length; i += 1) {
    const curNode = nodes[i];
    nodes = nodes.concat(parseNodeForChildren(curNode, true));
  }
  return nodes;
}

export function addLevelPassAnimation(el) {
  el.classList.add("win");
  el.classList.remove("shouldBeSelected");
}

function fillLineNumeric(line) {
  line.innerText = "";// eslint-disable-line no-param-reassign
  for (let i = 1; i <= 20; i += 1) {
    const span = createEl("span");
    span.innerText = i;
    span.setAttribute("class", "numeric");
    line.appendChild(span);
  }
}

export class Layout {
  constructor() {
    this.body = document.body;

    this.mainFlexBox = createEl("div");
    this.gameFlexBox = createEl("div");
    this.rightMenuFlexBox = createEl("div");
    this.footer = createEl("footer");

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
    this.cssEditorHelpButton = configurateButton("help");

    this.cssEditorTextInput = createEl("input");
    this.cssEditorTextInfo = createEl("p");

    this.htmlEditorCaptions = createEl("div");
    this.htmlEditorContent = createEl("div");

    this.htmlEditorLineNumeric = createEl("div");
    this.htmlEditorText = createEl("div");

    this.rightMenuTitle = createEl("div");
    this.rightMenuContent = createEl("div");
    this.rightMenuFunctionalButtons = createEl("div");
    this.rightMenuFunctuonalButtonRestore = configurateButton("Restore");
    this.rightMenuLevels = createEl("div");
    //
    this.currentLevelButton = null;

    this.imageBoxTitle = createEl("div");
    this.imageBoxContent = createEl("div");
    this.linkBetweenImageContentAndHtmlEditorContent = [];
    this.imageBoxContentHover = null;
    this.htmlEditorContentHover = null;

    this.popupDiv = createEl("div");
    this.deactivatePopup = null;

    this.helpText = null;
    this.helpHandler = null;
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
    this.configurateFooter();
    this.configuratePopup();
  }

  configurateFooter() {
    this.footer.setAttribute("class", "flex");

    const authorLink = createEl("a");
    authorLink.setAttribute("href", "https://github.com/vetaniExist");
    authorLink.setAttribute("class", "link text");
    authorLink.text = "author";

    const yearOfCreation = createEl("span");
    yearOfCreation.setAttribute("class", "text");
    yearOfCreation.textContent = "2020";

    const logoLink = createEl("a");
    logoLink.setAttribute("href", "https://rs.school/js/");
    logoLink.setAttribute("class", "link logoLink");

    const logo = createEl("img");
    logo.src = logoRSS;

    logoLink.appendChild(logo);

    this.footer.appendChild(authorLink);
    this.footer.appendChild(yearOfCreation);
    this.footer.appendChild(logoLink);
    this.body.appendChild(this.footer);
  }

  configurateCssEditor() {
    this.cssEditorBox.setAttribute("class", "flex flex-wrap cssEditorBox");

    this.cssEditorCaptions.setAttribute("class", "flex cssEditorCaptions");
    this.cssEditorContent.setAttribute("class", "flex cssEditorContent");

    this.cssEditorLineNumeric.setAttribute("class", "flex flex-wrap editor-line_numeric");
    this.cssEditorText.setAttribute("class", "editor-text");
    this.cssEditorEnter.setAttribute("class", "flex flex-wrap editor-enter");

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

    fillLineNumeric(this.cssEditorLineNumeric);
    this.cssEditorEnter.appendChild(this.cssEditorEnterButton);
    this.cssEditorEnter.appendChild(this.cssEditorHelpButton);
    this.addTextInCssEditor();
    this.activateHelpButton();
  }

  parseLevelNameFromButton() {
    let curButtonTextContent = this.getCurrentLevelButton().textContent;
    if (curButtonTextContent.indexOf("✔") !== -1) {
      curButtonTextContent = curButtonTextContent.substring(0, curButtonTextContent.length - 1);
    } else if (curButtonTextContent.indexOf("🗸") !== -1) {
      curButtonTextContent = curButtonTextContent.substring(0, curButtonTextContent.length - 2);
    }
    return curButtonTextContent;
  }

  activateHelpButton() {
    this.cssEditorHelpButton.addEventListener("click", () => {
      if (this.helpHandler) {
        clearInterval(this.helpHandler);
      }
      this.cssEditorTextInput.value = "";

      const charHelpTextArray = this.helpText.split("");
      let iter = 0;
      this.addMarkLevelPassesWithHelp();

      LSU.setLevelInLocalStorage(this.parseLevelNameFromButton(this.currentLevelButton), "h");
      this.cssEditorTextInput.focus();
      this.helpHandler = setInterval(() => {
        if (iter >= charHelpTextArray.length) {
          clearInterval(this.helpHandler);
          return;
        }
        this.cssEditorTextInput.value += charHelpTextArray[iter];
        iter += 1;
        this.cssEditorTextInput.setSelectionRange(iter, iter);
      }, 300);
    });
  }

  addMarkLevelPasses(curLevelButton) {
    let curLevelBtn;
    if (curLevelButton) {
      curLevelBtn = curLevelButton;
    } else {
      curLevelBtn = this.currentLevelButton;
    }

    if (curLevelBtn.innerText.indexOf("✔") === -1 && curLevelBtn.innerText.indexOf("🗸") === -1) {
      const span = createEl("span");
      span.textContent = "✔";
      span.setAttribute("class", "green");

      curLevelBtn.appendChild(span);
    }
  }

  addMarkLevelPassesWithHelp(curLevelButton) {
    let curLevelBtn;
    if (curLevelButton) {
      curLevelBtn = curLevelButton;
    } else {
      curLevelBtn = this.currentLevelButton;
    }

    if (curLevelBtn.innerText.indexOf("✔") === -1 && curLevelBtn.innerText.indexOf("🗸") === -1) {
      const span = createEl("span");
      span.textContent = "🗸";
      span.setAttribute("class", "blue");
      curLevelBtn.appendChild(span);
    }
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

    fillLineNumeric(this.htmlEditorLineNumeric);
  }

  configurateRightMenu() {
    this.rightMenuContent.setAttribute("class", "flex flex-wrap right_menu-content");

    this.rightMenuTitle.setAttribute("class", "flex right_menu-title");
    this.rightMenuTitle.innerText = "Levels";

    this.rightMenuFunctionalButtons.setAttribute("class", "flex flex-wrap right_menu-functional_buttons");
    this.rightMenuLevels.setAttribute("class", "flex flex-wrap right_menu-levels");

    this.rightMenuFunctionalButtons.appendChild(this.rightMenuFunctuonalButtonRestore);
    this.rightMenuFunctuonalButtonRestore.classList.add("button_level");

    this.rightMenuContent.appendChild(this.rightMenuFunctionalButtons);
    this.rightMenuContent.appendChild(this.rightMenuLevels);

    this.rightMenuFlexBox.appendChild(this.rightMenuTitle);
    this.rightMenuFlexBox.appendChild(this.rightMenuContent);
  }

  initLevelsField(levels) {
    const levelNameFromStorage = localStorage.getItem("vetaniExist-rs_css-curr_lvl");
    for (let i = 0; i < levels.length; i += 1) {
      const levelButton = configurateButton(levels[i].getLevelName());

      levelButton.classList.add("button_level");
      this.rightMenuLevels.appendChild(levelButton);

      const levelInLocalStorage = LSU.findLevelInLocalStorage(levels[i].getLevelName());
      if (levelInLocalStorage === "p") {
        this.addMarkLevelPasses(levelButton);
      } else if (levelInLocalStorage === "h") {
        this.addMarkLevelPassesWithHelp(levelButton);
      }

      levelButton.addEventListener("click", () => {
        this.setHtmlEditorText(levels[i].getLevelHtml());
        this.configurateImageBoxContent(levels[i].getLevelHtml());
        this.setImageBoxTitle(levels[i].getTitle());
        if (this.currentLevelButton !== null) {
          this.currentLevelButton.classList.remove("button_level-active");
          this.currentLevelButton = levelButton;
          this.currentLevelButton.classList.add("button_level-active");
          this.helpText = levels[i].getHelp();
          localStorage.setItem("vetaniExist-rs_css-curr_lvl", levels[i].getLevelName());
        } else {
          this.currentLevelButton = levelButton;
          this.currentLevelButton.classList.add("button_level-active");
          this.helpText = levels[i].getHelp();
          localStorage.setItem("vetaniExist-rs_css-curr_lvl", levels[i].getLevelName());
        }
      });

      if (levelNameFromStorage && levelNameFromStorage === levels[i].getLevelName()) {
        levelButton.click();
      } else if (!levelNameFromStorage && i === 0) {
        levelButton.click();
      }
    }
  }

  initImageBox() {
    this.imageBoxTitle.setAttribute("class", "flex right_menu-title");

    this.imageBoxContent = createEl("div");
    this.imageBoxContent.setAttribute("class", "flex image_box-content");

    this.imageBox.appendChild(this.imageBoxTitle);
    this.imageBox.appendChild(this.imageBoxContent);
  }

  configurateImageBoxContent(htmlObject) {
    const clone = htmlObject.cloneNode(true);
    const htmlEditor = getAllNodes(this.getHtmlEditorInnerCode());
    let nodes = [];

    const arrOfActivatableElements = ["PLATE", "TABLE", "LEMON", "APPLE"];
    nodes = nodes.concat(parseNodeForChildren(clone));

    if (arrOfActivatableElements.includes(clone.tagName)) {
      clone.classList.add("active");
    }
    let idx = 0;
    while (nodes.length) {
      const curNode = nodes.shift();
      nodes = nodes.concat(parseNodeForChildren(curNode));

      if (![...curNode.classList].includes("block-info")) {
        if (arrOfActivatableElements.includes(curNode.tagName)) {
          curNode.classList.add("active");
          const curNodeInHtmlEditor = htmlEditor[idx];

          const linking = new Linking(curNode, curNodeInHtmlEditor);
          const pTags = getChildWithPTag(curNodeInHtmlEditor);
          this.linkBetweenImageContentAndHtmlEditorContent.push(linking);
          let htmlFullLinking = new Linking(curNodeInHtmlEditor, curNodeInHtmlEditor);
          this.linkBetweenImageContentAndHtmlEditorContent.push(htmlFullLinking);

          for (let i = 0; i < pTags.length; i += 1) {
            htmlFullLinking = new Linking(curNode, pTags[i]);
            this.linkBetweenImageContentAndHtmlEditorContent.push(htmlFullLinking);
          }

          curNode.addEventListener("mouseenter", () => {
            this.imageHoverOn(curNode, curNodeInHtmlEditor);
          });
          curNode.addEventListener("mouseout", (event) => {
            this.imageHoverOut(event, curNodeInHtmlEditor, true, false);
          });

          curNodeInHtmlEditor.addEventListener("mouseenter",
            () => { this.imageHoverOn(curNode, curNodeInHtmlEditor); });

          curNodeInHtmlEditor.addEventListener("mouseout", (event) => {
            this.imageHoverOut(event, curNodeInHtmlEditor, false, true);
          });
        }
      }
      idx += 1;
    }

    this.imageBoxContent.innerText = "";
    this.imageBoxContent.appendChild(clone);
  }

  getLinking(key) {
    for (let i = 0; i < this.linkBetweenImageContentAndHtmlEditorContent.length; i += 1) {
      if (this.linkBetweenImageContentAndHtmlEditorContent[i].key === key) {
        return this.linkBetweenImageContentAndHtmlEditorContent[i].val;
      }
    }
    return null;
  }

  getLinkingByVal(val) {
    for (let i = 0; i < this.linkBetweenImageContentAndHtmlEditorContent.length; i += 1) {
      if (this.linkBetweenImageContentAndHtmlEditorContent[i].val === val) {
        return this.linkBetweenImageContentAndHtmlEditorContent[i].key;
      }
    }
    return null;
  }

  imageHoverOn(curNode, curNodeInHtmlEditor) {
    if (this.imageBoxContentHover) {
      this.imageBoxContentHover.classList.remove("active-data");
      this.imageBoxContentHover.classList.remove("shadow");
      this.imageBoxContentHover = curNode;
      this.imageBoxContentHover.classList.add("active-data");
      this.imageBoxContentHover.classList.add("shadow");
    } else if (curNode.classList.contains("active")) {
      this.imageBoxContentHover = curNode;
      this.imageBoxContentHover.classList.add("active-data");
      this.imageBoxContentHover.classList.add("shadow");
    }

    curNodeInHtmlEditor.classList.add("white");
    for (let i = 0; i < curNodeInHtmlEditor.childNodes.length; i += 1) {
      curNodeInHtmlEditor.childNodes[i].classList.add("white");
    }
  }

  imageHoverOut(event, curNodeInHtmlEditor, isDirectCurLinking, isDirectImageBoxContentHover) {
    curNodeInHtmlEditor.classList.remove("white");
    for (let i = 0; i < curNodeInHtmlEditor.childNodes.length; i += 1) {
      curNodeInHtmlEditor.childNodes[i].classList.remove("white");
    }
    if (this.imageBoxContentHover) {
      this.imageBoxContentHover.classList.remove("active-data");
      this.imageBoxContentHover.classList.remove("shadow");
    }

    let curLink;
    if (isDirectCurLinking) {
      curLink = this.getLinking(event.relatedTarget);
    } else {
      curLink = this.getLinkingByVal(event.relatedTarget);
    }

    if (isDirectImageBoxContentHover) {
      this.imageBoxContentHover = (curLink);
    } else {
      this.imageBoxContentHover = this.getLinkingByVal(curLink);
    }

    if (curLink !== null) {
      curNodeInHtmlEditor = this.getLinking(curLink); // eslint-disable-line no-param-reassign
      curNodeInHtmlEditor.classList.add("white");
      for (let i = 0; i < curNodeInHtmlEditor.childNodes.length; i += 1) {
        curNodeInHtmlEditor.childNodes[i].classList.add("white");
      }

      this.imageBoxContentHover.classList.add("active-data");
      this.imageBoxContentHover.classList.add("shadow");
    }
  }

  getImageEditorInnerCode() {
    return this.imageBoxContent.childNodes[0];
  }

  getHtmlEditorInnerCode() {
    return this.htmlEditorText.childNodes[0];
  }

  setImageBoxTitle(str) {
    this.imageBoxTitle.innerText = str;
  }

  getEditorEnterButton() {
    return this.cssEditorEnterButton;
  }

  getEditorHelpButton() {
    return this.cssEditorHelpButton;
  }

  getRestoreButton() {
    return this.rightMenuFunctuonalButtonRestore;
  }

  getLevelsDivContent() {
    return this.rightMenuLevels;
  }

  getEditorTextInput() {
    return this.cssEditorTextInput;
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
    setTimeout(() => this.editorsBox.classList.remove("error"), 310);
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
    this.body.removeChild(this.popupDiv);
    this.body.removeEventListener("click", this.deactivatePopup, false);
  }

  trySetNextCurrentLevelButton() {
    if (this.getCurrentLevelButton().nextSibling) {
      this.currentLevelButton.classList.toggle("button_level-active");
      this.currentLevelButton = this.getCurrentLevelButton().nextSibling;

      this.currentLevelButton.click();
      return true;
    }
    return false;
  }

  setHtmlEditorText(newHtml) {
    this.htmlEditorText.innerText = "";
    const clone = newHtml.cloneNode(true);
    this.htmlEditorText.appendChild(clone);
  }
}

export default Layout;
