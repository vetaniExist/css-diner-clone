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
    this.layout.setHtmlEditorText(this.levels[0].getLevelHtml());
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
    const level = new Level();
    level.configurateLevelFromString(level, "div>apple.small>div,div>test;div;div#test>t2,div;te,te;div;div");
    this.levels.push(level);
  }
}

export default RsCss;