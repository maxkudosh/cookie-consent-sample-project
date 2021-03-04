function List(props) {
    const listItems = props.items.map(item => {
        const renderedItem = props.itemRenderer(item);
        const itemKey = props.keySelector(item);
        const listItem = React.createElement('li', {
            className: 'list__item',
            key: itemKey
        }, renderedItem);

        return listItem;
    });

    return React.createElement('ul', { className: 'list' }, ...listItems);
}

List.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    keySelector: PropTypes.func.isRequired,
    itemRenderer: PropTypes.func.isRequired
};

export { List };
