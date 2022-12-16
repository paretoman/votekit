/**
 * Use scaling for high DPI devices instead of multiplying every time inside draw calls
 * https://www.html5rocks.com/en/tutorials/canvas/hidpi/
 * @param context drawing context
 * @returns Number
 */
export default function getPixelRatio(context) {
    const backingStore = context.backingStorePixelRatio
          || context.webkitBackingStorePixelRatio
          || context.mozBackingStorePixelRatio
          || context.msBackingStorePixelRatio
          || context.oBackingStorePixelRatio
          || context.backingStorePixelRatio || 1

    return (window.devicePixelRatio || 1) / backingStore
}
