export default {
  useAddonAnimations: false,
  addonAnimationSettings: null,

  load(options = {}) {
     // ❗️ Any more options, and we should probably iterate over Object.getOwnProperties(this)
     // filtering out functions, and set values accordingly
     this.useAddonAnimations = !!options.useAddonAnimations;
     this.addonAnimationSettings = options.addonAnimationSettings || {};
  }
}
