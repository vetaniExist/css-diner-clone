import { 
  Layout,

} from "./layout";
import Level from "./level";

export class RsCss {
  constructor() {
    this.layout = new Layout();
    this.levels = [];
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
      // if (!this.layout.trySetNextCurrentLevelButton()){
      if (!this.layout.tryGetNextLevelButton()) {
        // it is win
        checkResult[2].forEach((el) => this.layout.addLevelPassAnimation(el));
        setTimeout(() => this.layout.activatePopup(), 315)
        // this.layout.activatePopup();
        console.log("you complete last level");

        // add level passes counter

      } else {
        // add win animation
        checkResult[2].forEach((el) => this.layout.addLevelPassAnimation(el));
        setTimeout(() => this.layout.trySetNextCurrentLevelButton(), 315)
      }
    } else {
      this.layout.setEditorBoxErrorAnimation();
    }
  }

  checkWinCondition(inputText) {
    // rewrite it, array of finding by this input tag should be equals to array Of selected els, not length
    let nodes = [...this.layout.imageBoxContent.childNodes];

    let arrayOfElementsToFind = [];
    let arrayOfFindElements = [];

    for (let i = 0; i < nodes.length; i += 1) {
      console.log("node tag name",nodes[i].tagName);
      nodes = nodes.concat(this.layout.parseNodeForChildren(nodes[i]));

      if (nodes[i] === Node.TEXT_NODE || nodes[i].tagName === "P" || nodes[i].tagName === "TABLE") {
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
    const level1 = new Level("1");
    level1.configurateLevelFromString(level1, "div>apple.small>div,div>test,newtest;div;;div#test>t2,div;te,te;div>hoba>hoba2>test;div,div;div;div");
    this.levels.push(level1);

    const level2 = new Level("2");
    level2.configurateLevelFromString(level2, "plate.selected,plate.selected");
    this.levels.push(level2);

    const level3  = new Level("3");
    level3.configurateLevelFromString(level3, "plate>apple.small.test33.selected.test1.test2,apple");
    this.levels.push(level3);

    const level4  = new Level("4");
    level4.configurateLevelFromString(level4, "plate,plate>lemon.selected,lemon.selected");
    this.levels.push(level4);
  }
}

export default RsCss;