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
    
    let nodes = [...this.layout.imageBoxContent.childNodes];

    ////
    let counterOfElementsToFind = 0;
    ////
    let counterOfFindElements = 0;

    for (let i = 0; i < nodes.length; i += 1) {
      nodes = nodes.concat(this.layout.parseNodeForChildren(nodes[i]));
      const isFind = nodes[i].matches(inputText);

      counterOfElementsToFind += this.checkItSelected(nodes[i]);
      if (isFind) {
        counterOfFindElements += this.checkItSelected(nodes[i]);
      }
    }
    console.log("shound find: ", counterOfElementsToFind);
    console.log("find: ", counterOfFindElements);
    console.log("you win? ", counterOfElementsToFind === counterOfFindElements);
  }

  checkItSelected(node) {
    return +(node.className.indexOf("shouldBeSelected") > -1);
  }

  constructLevels() {
    const level1 = new Level("1");
    level1.configurateLevelFromString(level1, "div>apple.small>div,div>test,newtest;div;;div#test>t2,div;te,te;div>hoba>hoba2>test;div,div;div;div");
    this.levels.push(level1);

    const level2 = new Level("2");
    level2.configurateLevelFromString(level2, "div>orange");
    this.levels.push(level2);

    const level3  = new Level("3");
    level3.configurateLevelFromString(level3, "plate>apple.small,apple");
    this.levels.push(level3);

    const level4  = new Level("4");
    level4.configurateLevelFromString(level4, "plate,plate>lemon.selected,lemon.selected");
    this.levels.push(level4);
  }
}

export default RsCss;