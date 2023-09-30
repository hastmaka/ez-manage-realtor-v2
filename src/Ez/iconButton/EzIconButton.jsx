import React from "react";
import classes from "./EzIconButton.module.scss";
import * as icons from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/**
 * disabled - self-explanatory
 * btn - in case you want only the icon or the iconButton
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{readonly color?: *, readonly sx?: *, readonly icon?: *, readonly disabled?: *, readonly iconSx?: *, readonly className?: *, readonly btn?: *}> & React.RefAttributes<unknown>>}
 */

const EzIconButton = React.forwardRef(({disabled, sx, color, icon, iconSx, className, btn, ...rest}, ref) => {
    const selectedIcon = icons[icon];
    return (
        <>
            {btn ?
                <button
                    ref={ref}
                    className={`${classes['icon-button']} ${disabled ? classes['disabled'] : ''} ${className}}`}
                    style={{...sx}}
                    {...rest}
                >
                    <FontAwesomeIcon icon={selectedIcon} style={{fontSize: '20px', color, ...iconSx}}/>
                </button>
                :
                <FontAwesomeIcon ref={ref} icon={selectedIcon} style={{fontSize: '20px', color, ...iconSx}} {...rest}/>
            }
        </>

    );
})

EzIconButton.displayName = 'EzIconButton'

export default EzIconButton;

EzIconButton.propTypes = {
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    color: PropTypes.string,
    iconSx: PropTypes.object,
    sx: PropTypes.object,
    btn: PropTypes.bool
}
