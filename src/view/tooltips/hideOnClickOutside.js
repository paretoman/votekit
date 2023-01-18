export default function hideOnClickOutside(element, hide) {
    const isVisible = (elem) => !!elem
        && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)

    const outsideClickListener = (event) => {
        if (!element.contains(event.target) && isVisible(element)) {
            // or use: event.target.closest(selector) === null
            const success = hide()
            // eslint-disable-next-line no-use-before-define
            if (success) removeClickListener()
        }
    }

    const removeClickListener = () => {
        document.removeEventListener('mousedown', outsideClickListener)
        document.removeEventListener('touchstart', outsideClickListener)
    }

    document.addEventListener('mousedown', outsideClickListener)
    document.addEventListener('touchstart', outsideClickListener)
}
