import { createEl } from "./layout";

function createNode(newStr, tabs) {
  // split on classes;
  let str = newStr.split(".");
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
    } else {
      p.innerText += " class = \"";
      for (let i = 0; i < classes.length; i += 1) {
        if (classes[i] === "selected") {
          newEl.classList.add("shouldBeSelected");
          if (i === classes.length - 1) {
            const inText = newEl.innerText;
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

function parseTemplateString(str) {
  const splitedByBasicDelemeter = str.split(";");
  let tabsCounter = 0;
  const result = createNode("table", 0);

  let resultPrev = {
    curNode: null,
    prevNode: null,
  };
  let curNode = null;

  const arrayOfClosingTags = [];
  const arrayOfTags = [];

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
    } else {
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
  }
  //
  while (arrayOfTags.length) {
    const arrayOfTechnicalClasses = ["block", "shouldBeSelected"];
    const p = createEl("p");
    p.innerText = arrayOfClosingTags.pop();
    p.setAttribute("class", "block");
    const curTag = arrayOfTags.pop();
    curTag.appendChild(p);

    const curTagName = curTag.tagName.toLowerCase();
    if (curTagName !== "table") {
      const infoBlock = createEl("div");
      const infoContent = createEl("div");

      infoBlock.classList.add("block-info");
      infoContent.classList.add("block-info-content");
      infoContent.innerText = `<${curTagName}`;
      if (curTag.classList.length > 1) {
        const arrayOfClasses = [];
        for (let i = 0; i < curTag.classList.length; i += 1) {
          if (!arrayOfTechnicalClasses.includes(curTag.classList[i])) {
            arrayOfClasses.push(curTag.classList[i]);
          }
        }
        if (arrayOfClasses.length) {
          infoContent.innerText += " class =";
          for (let i = 0; i < arrayOfClasses.length; i += 1) {
            infoContent.innerText += arrayOfClasses[i];
          }
          infoContent.innerText += "\">";
        }
      } else {
        infoContent.innerText += ">";
      }
      infoContent.innerText += `</${curTagName}>`;

      infoBlock.appendChild(infoContent);
      curTag.appendChild(infoBlock);
    }
  }//
  return result;
}

export class Level {
  constructor(levelName) {
    this.levelHtml = null;
    this.levelName = levelName;
    this.help = null;
    this.passedType = null;
    this.title = null;
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

  setHelp(newHelp) {
    this.help = newHelp;
  }

  getHelp() {
    return this.help;
  }

  setPassedType(type) {
    // p = passed by own
    // h = passed with help
    // n = not passed
    if (type !== "p" || type !== "h") {
      this.passedType = "n";
    }
    this.passedType = type;
  }

  getPassedType() {
    return this.passedType;
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }

  getTitle() {
    return this.title;
  }

  configurateLevelFromString(str) {
    this.setLevelHtml(parseTemplateString(str));
  }
}

export default Level;
