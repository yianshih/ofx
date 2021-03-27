/**
 * Non-public global class to handle the "default" Overlay instance to global use
 */
class WarningManager {
  _defaultOverlay = null
  register(_ref: any) {
    if (!this._defaultOverlay && "_id" in _ref) {
      this._defaultOverlay = _ref
    }
  }
  unregister(_ref: any) {
    //@ts-ignore
    if (!!this._defaultOverlay && this._defaultOverlay._id === _ref._id) {
      this._defaultOverlay = null
    }
  }
  getDefault() {
    return this._defaultOverlay
  }
}

export default new WarningManager()
