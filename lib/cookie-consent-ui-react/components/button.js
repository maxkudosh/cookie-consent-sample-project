function Button(props) {
    const buttonProps = {
        className: 'button',
        onClick: props.onClick
    };

    return React.createElement('button', buttonProps, props.text);
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export { Button };
