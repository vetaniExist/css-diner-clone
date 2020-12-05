import { createEl } from "./layout";

function createNode(str, tabs) {
  // split on classes;
  str = str.split(".");
  const classes = str.slice(1, str.length);

  // find id and tag
  str = str[0].split("#");
  const id = str[1];
  const tag = str[0];

  const newEl = createEl(tag);
  const p = createEl("p");
  p.setAttribute("class", "block");
  p.innerText = "\t".repeat(tabs).concat(`<${tag}\n`);
  newEl.appendChild(p);
  if (id) {
    p.innerText += " id = \"".concat(id).concat("\"");
    newEl.setAttribute("id", id);
  }

  if (classes.length) {
    if (classes.length === 1 && classes[0] === "selected") {
      newEl.classList.add("shouldBeSelected");
    }
    else {
      p.innerText += " class = \"";
      for (let i = 0; i < classes.length; i += 1) {
        if ( classes[i] === "selected") {
          newEl.classList.add("shouldBeSelected");
          if ( i === classes.length - 1) {
            let inText = newEl.innerText;
            p.innerText = inText.substring(0, inText.length - 1);
          }
        } else {
          p.innerText += `${classes[i]}`;
          newEl.classList.add(classes[i]);
          if (i !== classes.length - 1) {
            p.innerText += " ";
          }
        }
      }
      p.innerText += "\"";
    }
  }
  p.innerText += ">";
  newEl.classList.add("block");
  return newEl;
}

function createCloseTag(str, tabs) {
  const tag = str.split(".")[0].split("#")[0];
  return "\t".repeat(tabs).concat(`</${tag}>`);
}

export class Level {
  constructor(levelName) {
    this.levelHtml = null;
    this.levelName = levelName;
  }

  setLevelName(newLevelName) {
    this.levelName = newLevelName;
  }

  getLevelName() {
    return this.levelName;
  }

  setLevelHtml(newHtml) {
    this.levelHtml = newHtml;
  }

  getLevelHtml() {
    return this.levelHtml;
  }

  parseTemplateString(str) {
    const splitedByBasicDelemeter = str.split(";");
    let tabsCounter = 0;
    const result = createNode("table", 0);

    let resultPrev = {
      curNode: null,
      prevNode: null,
    };
    let curNode = null;
    
    let arrayOfClosingTags = [];
    let arrayOfTags = [];

    arrayOfClosingTags.push("</table>");
    arrayOfTags.push(result);

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
      const splitedByDeepLevels = splitedByBasicDelemeter[z].split(">");

      for (let i = 0; i < splitedByDeepLevels.length; i += 1) {
        const splitedInSingleLevel = splitedByDeepLevels[i].split(",");

        for (let j = 0; j < splitedInSingleLevel.length; j += 1) {
          curNode = createNode(splitedInSingleLevel[j], tabsCounter);

          arrayOfClosingTags.push(createCloseTag(splitedInSingleLevel[j], tabsCounter));
          arrayOfTags.push(curNode);

          if (tabsCounter === 0) {
            result.appendChild(curNode);
            resultPrev.curNode = curNode;
            resultPrev.prevNode = curNode;
          } else {
            resultPrev.curNode.appendChild(curNode);
          }
        }
        if (i !== splitedByDeepLevels.length - 1) {
          tabsCounter += 1;
          const newResult = {
            curNode,
            prevNode: resultPrev,
          };
          resultPrev = newResult;
        }
      }
    }
    // 
    while (arrayOfTags.length) {
      const p = createEl("p");
      p.innerText = arrayOfClosingTags.pop();
      p.setAttribute("class", "block");
      let curTag = arrayOfTags.pop();
      curTag.appendChild(p);

      const curTagName = curTag.tagName.toLowerCase();
      if (curTagName !== "table") {
        const infoBlock = createEl("div");
        const infoContent = createEl("div");
  
        infoBlock.classList.add("block-info");
        infoContent.classList.add("block-info-content");
        infoContent.innerText = `<${curTagName}></${curTagName}>`;
      
        infoBlock.appendChild(infoContent);
        curTag.appendChild(infoBlock);
      }

    }// 
    return result;
  }

  configurateLevelFromString(level, str) {
    level.setLevelHtml(this.parseTemplateString(str));
  }
}

export default Level;
