import { createEl } from "./layout";

export class Level {
  constructor() {
    this.levelHtml = null;
  }

  setLevelHtml(newHtml) {
    this.levelHtml = newHtml;
  }

  getLevelHtml() {
    return this.levelHtml;
  }

  configurateLevelFromString(level, str) {
    const strArr = str.split(";");
    const resultEl = createEl("div");
    let tabs = 0;

    for (let i = 0; i < strArr.length; i += 1) {
      tabs -= 2;
      tabs = tabs < 0 ? 0 : tabs;
      if (strArr[i] === "") {
        continue;
      }
      let prev = null;
      let subSplit = strArr[i].split(">");

      for (let j = 0; j < subSplit.length; j += 1) {
        if (resultEl.classList[0]) {
          prev = resultEl.chindNodes[0];
        }
        tabs ++;
        if (subSplit[j].indexOf(",") > -1) {

          subSplit[j] = subSplit[j].split(",");
          for (let z = 0; z < subSplit[j].length; z += 1) {
            console.log(`subSplit[${j}][${z}] `, subSplit[j][z]);
            console.log("prev" , prev );
            this.configurateAllTags(resultEl, prev, subSplit[j][z], tabs - 1);
          }
        } else {
            console.log("alone ", subSplit[j]);
          this.configurateAllTags(resultEl, prev, subSplit[j],  tabs - 1);
        }
      }
    }
    resultEl.setAttribute("class", "showSpaces");
    console.log(resultEl);
    level.setLevelHtml(resultEl);
  }

  configurateAllTags(resultEl, prev, subSplit,  tabs) {
    const newEl = this.configurateTag(subSplit, tabs);
    if (resultEl) {
      if (resultEl.prev) {
       resultEl.prev.appendChild(newEl);
      } else {
        prev = resultEl;
        resultEl.appendChild(newEl);
      }
    } else {
      prev = newEl;
      resultEl = newEl;
    };
  }

  configurateTag(subSplit, it) {
    console.log("configurateTag", subSplit);
    subSplit = subSplit.split(".");
    const classes = subSplit.slice(1, subSplit.length);
    // находим id и тэг
    subSplit = subSplit[0].split("#");
    const id = subSplit[1];
    const tag = subSplit[0];

    console.log("tag", tag);
    const newEl = createEl(tag);
    newEl.innerText = "\t".repeat(it) + `<${tag}\n`;

    if (id) {
      newEl.innerText += " id = \"" + id + "\"";
      newEl.setAttribute("id", id);
    }

    if (classes.length) {
      newEl.innerText += " class = ";
    }
    // находим все классы
    for (let i = 0; i < classes.length; i += 1) {
      newEl.innerText += `"${classes[i]}"`;
      newEl.classList.add(classes[i]);
      if (i !== classes.length - 1) {
        newEl.innerText += " ";
      }
    }
    newEl.innerText += ">";
    newEl.setAttribute("class", "block");
    return newEl;
  }
}

export default Level;
