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

  parseTemplateString(str) {
    console.log("parseTemplateString");
    console.log(str);

    const splitedByBasicDelemeter = str.split(";");
    let tabsCounter = 0;
    const result = this.createNode("div");
    let resultPrev = {
      curNode: null,
      prevNode: null,
    };
    let curNode = null;

    for (let z = 0; z < splitedByBasicDelemeter.length; z += 1) {
      tabsCounter = tabsCounter - 1 < 0 ? 0 : tabsCounter - 1;
      if (z > 0) {
        resultPrev = resultPrev.prevNode;
      }

      if (splitedByBasicDelemeter[z] === "") {
        tabsCounter = tabsCounter - 1 < 0 ? 0 : tabsCounter - 1;
        resultPrev = resultPrev.prevNode;
        continue;
      }
      //console.log(splitedByBasicDelemeter[z]);
      const splitedByDeepLevels = splitedByBasicDelemeter[z].split(">");

      let currentDeep;
      for (let i = 0; i < splitedByDeepLevels.length; i += 1) {
        // console.log("  ".repeat(i) +  splitedByDeepLevels[i]);
        const splitedInSingleLevel = splitedByDeepLevels[i].split(",");


        for (let j = 0; j < splitedInSingleLevel.length; j += 1) {
          curNode = this.createNode(splitedInSingleLevel[j], tabsCounter); 
          // currentDeep.appendChild(curNode);
          // console.log("  ".repeat(tabsCounter) + splitedInSingleLevel[j] + j + i);
          // console.log(curNode);

          // зашли в цикл добавили ноды первого уровня в result, поставили указатель resultPrev на эту ноду
          // console.log(i, j);
          // console.log(splitedByDeepLevels.length, splitedInSingleLevel.length);
          if (tabsCounter === 0 ) {
            //console.log("  ".repeat(tabsCounter) + splitedInSingleLevel[j] + j + i);
            result.appendChild(curNode);
            resultPrev.curNode = curNode;
            resultPrev.prevNode = curNode;
          } else {
            resultPrev.curNode.appendChild(curNode);
          }
        }
       
        if (i !== splitedByDeepLevels.length - 1) {
          tabsCounter += 1;
          // prevNode = resultPrev;
          const newResult = {
            curNode: curNode,
            prevNode: resultPrev,
          }
          resultPrev = newResult;
          //resultPrev.prevNode = curNode;
          // resultPrev.curNode = curNode;

        }

      }
    }
    console.log("result");
    console.log(result);
    console.log("\n\n\n\n\n\n");
    console.log("\n\n\n\n\n\n");
    return result;
  }

  createNode(str, tabs) {
    // split on classes;
    str = str.split(".");
    const classes = str.slice(1, str.length);

    // find id and tag 
    str = str[0].split("#");
    const id = str[1];
    const tag = str[0];

    const newEl = createEl(tag);
    // newEl.innerText = `<${tag}`;
    newEl.innerText = "\t".repeat(tabs) + `<${tag}\n`;
    if (id) {
      newEl.innerText += " id = \"" + id + "\"";
      newEl.setAttribute("id", id);
    }

    if (classes.length) {
      newEl.innerText += " class = ";
      for (let i = 0; i < classes.length; i += 1) {
        newEl.innerText += `"${classes[i]}"`;
        newEl.classList.add(classes[i]);
        if (i !== classes.length - 1) {
          newEl.innerText += " ";
        }
      }
    }
    newEl.innerText += ">";
    newEl.setAttribute("class", "block");
    return newEl;

  }

  configurateLevelFromString(level, str) {
    level.setLevelHtml(this.parseTemplateString(str));
  }
}

export default Level;
