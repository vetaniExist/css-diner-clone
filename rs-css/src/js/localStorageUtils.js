export class LocalStorageUtils {
  static initLevelsFromLocalStorage() {
    this.levelsInLocalStorage = JSON.parse((localStorage.getItem("vetaniExist-rs_css-levels")));
    if (!this.levelsInLocalStorage) {
      console.log("create local storage levels now");
      this.levelsInLocalStorage = {};
      localStorage.setItem("vetaniExist-rs_css-levels", this.levelsInLocalStorage);
    }
  }
  
  static findLevelInLocalStorage(levelName) {
    return this.levelsInLocalStorage[levelName];
  }

  static setLevelInLocalStorage(levelName, val) {
    console.log("setLevelInLocalStorage");
    console.log(this.levelsInLocalStorage[levelName]);
    let currentType = this.levelsInLocalStorage[levelName]; 
    if (currentType === "n" || !currentType) {
      this.levelsInLocalStorage[levelName] = val;
      console.log("ustanovka");
      console.log(this.levelsInLocalStorage);
      localStorage.setItem("vetaniExist-rs_css-levels", JSON.stringify(this.levelsInLocalStorage));
    }
  }

  static trySetLevelPassesType(level) {
    if (!this.findLevelInLocalStorage(level.getLevelName())) {
      level.setPassedType("n");
      this.setLevelInLocalStorage(level.getLevelName(), level.getPassedType());
      console.log("try2");
      console.log(this.findLevelInLocalStorage(level.getLevelName()));
    } else {
      level.setPassedType(this.findLevelInLocalStorage(level.getLevelName()));
    }
  }
}

export default LocalStorageUtils;