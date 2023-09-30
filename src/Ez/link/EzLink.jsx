import classes from './EzLink.module.scss';

export default function EzLink({text, fontSize, onClick, ...rest}) {
    return (
        <span
            style={{
                fontSize: fontSize || '12px'
            }}
            onClick={onClick}
            className={classes['link']}
            {...rest}
        >
            {text}
        </span>
    );
}