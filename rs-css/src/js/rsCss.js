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
    let clone = this.layout.imageBoxContent.childNodes[0];
    let nodes =  [...clone.childNodes];

    let arrayOfElementsToFind = [];
    let arrayOfFindElements = [];

    for (let i = 0; i < nodes.length; i += 1) {
      nodes = nodes.concat(this.layout.parseNodeForChildren(nodes[i]));

      if (nodes[i] === Node.TEXT_NODE || nodes[i].tagName === "P" || nodes[i].tagName === "TABLE" || nodes[i].className.includes("block-info")) {
        // nodes[i].innerText = "";
        console.log("parent");
        console.log(nodes[i].parentNode);
        nodes[i].parentNode.removeChild(nodes[i]);
        continue;
      }

      const isFind = nodes[i].matches(inputText);
      console.log("смотрим");
      console.log(nodes[i]);

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
    console.log(clone);
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
    const level1 = new Level("1");
    level1.configurateLevelFromString(level1, "plate.selected,plate.selected");
    level1.setHelp("*");
    this.levels.push(level1);
    LocalStorageUtils.trySetLevelPassesType(level1);

    // id #x
    const level2 = new Level("2");
    level2.configurateLevelFromString(level2, "plate,plate#second.selected");
    level2.setHelp("#second");
    this.levels.push(level2);
    LocalStorageUtils.trySetLevelPassesType(level2);

    // .class
    const level3 = new Level("3");
    level3.configurateLevelFromString(level3, "plate>apple.small.selected,apple");
    level3.setHelp(".small");
    this.levels.push(level3);
    LocalStorageUtils.trySetLevelPassesType(level3);

    const level4 = new Level("4");
    level4.configurateLevelFromString(level4, "plate,plate>lemon.selected,lemon.selected");
    level4.setHelp("lemon");
    this.levels.push(level4);
    LocalStorageUtils.trySetLevelPassesType(level4);

    const level5 = new Level("5");
    level5.configurateLevelFromString(level5, "plate,apple.selected,plate,apple.selected,apple");
    level5.setHelp("plate + apple");
    this.levels.push(level5);
    LocalStorageUtils.trySetLevelPassesType(level5);

    const level6 = new Level("6");
    level6.configurateLevelFromString(level6, "apple,plate,apple.selected,plate,apple.selected,apple.selected");
    level6.setHelp("plate ~ apple");
    this.levels.push(level6);
    LocalStorageUtils.trySetLevelPassesType(level6);

    const level7 = new Level("7");
    level7.configurateLevelFromString(level7, "plate>apple,apple.selected");
    level7.setHelp("apple:nth-child(3)");// plate :last-child
    this.levels.push(level7);
    LocalStorageUtils.trySetLevelPassesType(level7);

    const level8 = new Level("8");
    level8.configurateLevelFromString(level8, "apple,apple.selected");
    level8.setHelp("apple:nth-child(3)");
    this.levels.push(level8);
    LocalStorageUtils.trySetLevelPassesType(level8);

    /* const level9 = new Level("9");
    this.levels.push(level9);

    const level10 = new Level("10");
    this.levels.push(level10);

    const level11 = new Level("11");
    this.levels.push(level11);

    const level12 = new Level("12");
    this.levels.push(level12);

    const level13 = new Level("13");
    this.levels.push(level13);

    const level14 = new Level("14");
    this.levels.push(level14);

    const level15 = new Level("15");
    this.levels.push(level15);

    const level16 = new Level("16");
    this.levels.push(level16);

    const level17 = new Level("17");
    this.levels.push(level17);

    const level18 = new Level("18");
    this.levels.push(level18);

    const level19 = new Level("19");
    this.levels.push(level19);

    const level20 = new Level("20");
    this.levels.push(level20); */
  }
}

export default RsCss;