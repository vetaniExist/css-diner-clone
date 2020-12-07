import {
  Layout,

} from "./layout";
import Level from "./level";

import LocalStorageUtils from "./localStorageUtils"

export class RsCss {
  constructor() {
    this.layout = new Layout();
    this.levels = [];
    this.levelsInLocalStorage = null;
  }

  start() {
    this.layout.configurateLayout();
    this.initCssEditorEvents();
    this.constructLevels();

    this.layout.initLevelsField(this.levels);
  }

  initCssEditorEvents() {
    this.layout.getEditorEnterButton().addEventListener("click", () => {
      this.updateCssEditorInput();
    });

    this.layout.getEditorTextInput().addEventListener("keypress", (e) => {
      if (e.code === "Enter") {
        this.updateCssEditorInput();
      }
    });

    this.layout.getRestoreButton().addEventListener("click", () => {
      const levelsDiv = this.layout.getLevelsDivContent().childNodes;
      for (let i = 0; i < levelsDiv.length; i += 1) {
        levelsDiv[i].innerText = this.levels[i].getLevelName();
      }
      LocalStorageUtils.restoreLevelsInLocalStorage();
      levelsDiv[0].click();
    });
  }

  updateCssEditorInput() {
    const inputText = this.layout.getEditorTextInputValue();
    this.layout.setEditorTextInputValue("");
    let checkResult = this.checkWinCondition(inputText);
    if (checkResult[0]) {
      let levelName = this.layout.parseLevelNameFromButton();
      if (!this.layout.tryGetNextLevelButton()) {
        // it is win
        this.layout.addMarkLevelPasses();
        checkResult[2].forEach((el) => this.layout.addLevelPassAnimation(el));
        setTimeout(() => this.layout.activatePopup(), 315)
        console.log("you complete last level");
        LocalStorageUtils.setLevelInLocalStorage(levelName, "p");
        // add level passes counter
      } else {
        // add win animation
        this.layout.addMarkLevelPasses();
        checkResult[2].forEach((el) => this.layout.addLevelPassAnimation(el));
        setTimeout(() => this.layout.trySetNextCurrentLevelButton(), 315)
        LocalStorageUtils.setLevelInLocalStorage(levelName, "p");
      }
    } else {
      this.layout.setEditorBoxErrorAnimation();
    }
  }

  checkWinCondition(inputText) {
    const imageBox = this.layout.imageBoxContent.childNodes[0];
    let basicNodes = [...imageBox.childNodes];

    let clone = this.layout.imageBoxContent.childNodes[0].cloneNode(true);
    let nodes = [...clone.childNodes];

    let arrayOfElementsToFind = [];
    let arrayOfFindElements = [];

    for (let i = 0; i < basicNodes.length; i += 1) {
      basicNodes = basicNodes.concat(this.layout.parseNodeForChildren(basicNodes[i], true));
    }

    let iter = 0;
    for (let i = 0; i < nodes.length; i += 1) {
      nodes = nodes.concat(this.layout.parseNodeForChildren(nodes[i]));

      if (nodes[i] === Node.TEXT_NODE || nodes[i].tagName === "P" || nodes[i].className.includes("block-info")) {
        nodes[i].parentNode.removeChild(nodes[i]);
        iter += 1;
        continue;
      }
      const isFind = nodes[i].matches(inputText);

      if (this.checkItSelected(nodes[i])) {
        arrayOfElementsToFind.push(basicNodes[iter]);
      }
      if (isFind) {
        arrayOfFindElements.push(basicNodes[iter]);
      }
      iter += 1;
    }

    const isWin = this.compareArrays(arrayOfElementsToFind, arrayOfFindElements);
    return [isWin, arrayOfElementsToFind, arrayOfFindElements];
  }

  compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    return arr1.every((el, idx) => el === arr2[idx]);
  }

  checkItSelected(node) {
    return (node.className.indexOf("shouldBeSelected") > -1);
  }

  constructLevels() {
    LocalStorageUtils.initLevelsFromLocalStorage();

    // *
    this.createLevel("1", "plate.selected,plate.selected", "*", "Select all plates");
    // id #x
    this.createLevel("2", "plate,plate#second.selected", "#second", "Select second plate");
    // .class
    this.createLevel("3", "plate>apple.small.selected,apple", ".small", "Select small apple");

    this.createLevel("4", "plate,plate>lemon.selected,lemon.selected", "lemon", "Select all lemons");

    this.createLevel("5", "apple,plate>apple.selected,apple.selected", "plate apple", "Select all apples on plate");

    this.createLevel("6", "lemon.selected,plate>apple.selected,apple.selected", "lemon, apple", "select all fruits");

    this.createLevel("7", "apple,plate>apple.selected,lemon.selected;plate>lemon.selected;plate>apple.selected,apple.selected", "plate *", "select all fruits on all plates");

    this.createLevel("8", "plate,apple.selected,plate,apple.selected,apple", "plate + apple", "Select apple that's next to plates");

    this.createLevel("9", "apple,plate,apple.selected,plate,apple.selected,apple.selected", "plate ~ apple", "Select apple beside the plates");

    this.createLevel("10", "plate>apple.selected.small,apple.small,apple.small", "apple:first-child", "select first apple on plate");

    this.createLevel("11", "apple.small,apple.small,plate>apple.selected.small,apple.small,apple.small", "plate apple:first-child", "select first apple on plate");
  }
  createLevel(levelName, levelString, help, title) {
    const level = new Level(levelName);
    level.configurateLevelFromString(levelString);
    level.setHelp(help);
    level.setTitle(title);
    this.levels.push(level);
    LocalStorageUtils.trySetLevelPassesType(level);
  }
}

export default RsCss;