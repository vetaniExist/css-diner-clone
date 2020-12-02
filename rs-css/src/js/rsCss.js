import { 
  Layout,
  createEl

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
    // this.layout.setHtmlEditorText(this.levels[0].getLevelHtml());

    this.layout.initLevelsField(this.levels);
  }

  initCssEditorEvents() {
    this.layout.getEditorEnterButton().addEventListener("click", () => {
      console.log(this.layout.getEditorTextInputValue());
      this.layout.setEditorTextInputValue("");
    });

    this.layout.getEditorTextInput().addEventListener("keypress", (e) => {
      if (e.code === "Enter") {
        console.log(this.layout.getEditorTextInputValue());
        this.layout.setEditorTextInputValue("");
      }
    });
  }

  constructLevels() {
    const level1 = new Level("1");
    level1.configurateLevelFromString(level1, "div>apple.small>div,div>test,newtest;div;;div#test>t2,div;te,te;div>hoba>hoba2>test;div,div;div;div");
    this.levels.push(level1);

    const level2 = new Level("2");
    level2.configurateLevelFromString(level2, "div>orange");
    this.levels.push(level2);

    const level3  = new Level("3");
    level3.configurateLevelFromString(level3, "div>apple.small,apple");
    this.levels.push(level3);
  }
}

export default RsCss;