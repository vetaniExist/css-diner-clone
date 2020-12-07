export class LocalStorageUtils {
  static initLevelsFromLocalStorage() {
    this.levelsInLocalStorage = JSON.parse((localStorage.getItem("vetaniExist-rs_css-levels")));
    if (!this.levelsInLocalStorage) {
      this.levelsInLocalStorage = {};
      localStorage.setItem("vetaniExist-rs_css-levels", this.levelsInLocalStorage);
    }
  }
  
  static findLevelInLocalStorage(levelName) {
    return this.levelsInLocalStorage[levelName];
  }

  static setLevelInLocalStorage(levelName, val) {
    let currentType = this.levelsInLocalStorage[levelName]; 
    if (currentType === "n" || !currentType) {
      this.levelsInLocalStorage[levelName] = val;
      localStorage.setItem("vetaniExist-rs_css-levels", JSON.stringify(this.levelsInLocalStorage));
    }
  }

  static trySetLevelPassesType(level) {
    if (!this.findLevelInLocalStorage(level.getLevelName())) {
      level.setPassedType("n");
      this.setLevelInLocalStorage(level.getLevelName(), level.getPassedType());
    } else {
      level.setPassedType(this.findLevelInLocalStorage(level.getLevelName()));
    }
  }

  static restoreLevelsInLocalStorage() {
    for (let key in this.levelsInLocalStorage) {
      this.levelsInLocalStorage[key] = "n";
    }
    localStorage.setItem("vetaniExist-rs_css-levels", JSON.stringify(this.levelsInLocalStorage));
  }
}

export default LocalStorageUtils;