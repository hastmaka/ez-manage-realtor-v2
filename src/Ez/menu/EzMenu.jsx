import classes from './EzMenu.module.scss';
import {useEffect, useRef} from "react";
import { createPortal } from 'react-dom';
import PropTypes from "prop-types";

export default function EzMenu({items, open, onClose, anchorEl}) {
    const menuRef = useRef(null)

    useEffect(() => {
        const handleClick = (event) => {
            if (open && !menuRef.current.contains(event.target) && !anchorEl.contains(event.target)) {
                onClose({ openMenu: false });
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [open, onClose, anchorEl]);

    const {top, left} = anchorEl.getBoundingClientRect()

    return (
        open ? createPortal(
            <div
                ref={menuRef}
                className={classes['menu']}
                style={{
                    top: `${top + 35}px`,
                    left: `${left - 60}px`,
                }}
            >
                {items.map((item) =>
                    <div
                        className={classes['menu-list']}
                        key={item.id}
                        {...item.functionality}
                    >
                        {item.text}
                    </div>
                )}
            </div>,
            document.body
        ): null
    );
}

EzMenu.propTypes = {
    items: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    anchorEl: PropTypes.object.isRequired
}