function replaceArrayItem(items, replaceSelector, itemToReplaceWith) {
    function replaceTargetItem(currentItem) {
        return replaceSelector(currentItem)
            ? itemToReplaceWith
            : currentItem;
    }

    return items.map(replaceTargetItem);
}

export { replaceArrayItem };
