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
    let nodes = [...this.layout.imageBoxContent.childNodes];

    let arrayOfElementsToFind = [];
    let arrayOfFindElements = [];

    for (let i = 0; i < nodes.length; i += 1) {
      nodes = nodes.concat(this.layout.parseNodeForChildren(nodes[i]));

      if (nodes[i] === Node.TEXT_NODE || nodes[i].tagName === "P" || nodes[i].tagName === "TABLE" || nodes[i].className.includes("block-info")) {
        continue;
      }

      const isFind = nodes[i].matches(inputText);

      if (this.checkItSelected(nodes[i])) {
        arrayOfElementsToFind.push(nodes[i]);
      }
      if (isFind) {
        arrayOfFindElements.push(nodes[i]);
      }
    }

    console.log("get this nodes");
    console.log(nodes);

    const isWin = this.compareArrays(arrayOfElementsToFind, arrayOfFindElements);
    console.log("arrayOfElementsToFind");
    console.log(arrayOfElementsToFind);
    console.log(arrayOfFindElements);
    console.log("you win? ", isWin);
    return [isWin,arrayOfElementsToFind, arrayOfFindElements];
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

    const level1 = new Level("1");
    level1.configurateLevelFromString(level1, "plate.selected");
    level1.setHelp("plate");
    this.levels.push(level1);
    LocalStorageUtils.trySetLevelPassesType(level1);

    const level2 = new Level("2");
    level2.configurateLevelFromString(level2, "plate.selected,plate.selected");
    level2.setHelp("plate");
    this.levels.push(level2);
    LocalStorageUtils.trySetLevelPassesType(level2);

    const level3  = new Level("3");
    level3.configurateLevelFromString(level3, "plate>apple.small.test33.selected.test1.test2,apple");
    level3.setHelp("apple.small");
    this.levels.push(level3);
    LocalStorageUtils.trySetLevelPassesType(level3);

    const level4  = new Level("4");
    level4.configurateLevelFromString(level4, "plate,plate>lemon.selected,lemon.selected");
    level4.setHelp("lemon");
    this.levels.push(level4);
    LocalStorageUtils.trySetLevelPassesType(level4);
  }
}

export default RsCss;