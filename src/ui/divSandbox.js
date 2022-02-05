/**
 * Assemble a div containing all the components of a simulation sandbox.
 * @param {Menu} menu - Contains buttons for selecting options.
 * @param {Screen} screen - Contains a canvas for drawing.
 * @param {HTMLElement} svgUIDiv - Contains buttons and a drawing canvas.
 * @returns {HTMLElement} - A div containing the whole sandbox.
 */
export default function divSandbox(menu, screen, svgUIDiv) {
    const div = document.createElement('div')
    div.appendChild(menu.divMenu)
    div.appendChild(screen.canvas)
    div.appendChild(svgUIDiv)
    return div
}
