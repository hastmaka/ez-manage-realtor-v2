import {useState} from 'react';
import {ListItemIcon, Menu, MenuItem} from "@mui/material";
import {FilterAlt, /*North, South*/} from "@mui/icons-material";

const FilterMenu = (/*{ colDef: { field } }*/) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleCloseMenu = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    /*const handleSortAscending = () => {
        let newRows = [...customRows].sort((a, b) => a[field] - b[field]);
        setCustomRows(newRows);
        handleCloseMenu();
    };

    const handleSortDescending = () => {
        let newRows = [...customRows].sort((a, b) => b[field] - a[field]);
        setCustomRows(newRows);
        handleCloseMenu();
    };*/

    const handleFilter = () => {
        handleCloseMenu();
    };

    return (
        <>
            <div onClick={handleOpenMenu}> Filter </div>
            <Menu open={open} anchorEl={anchorEl} onClose={handleCloseMenu}>
                {/*<MenuItem onClick={handleSortAscending}>
                    <ListItemIcon>
                        <North />
                    </ListItemIcon>
                    Sort Ascending
                </MenuItem>
                <MenuItem onClick={handleSortDescending}>
                    <ListItemIcon>
                        <South />
                    </ListItemIcon>
                    Sort Descending
                </MenuItem>*/}
                <MenuItem onClick={handleFilter}>
                    <ListItemIcon>
                        <FilterAlt />
                    </ListItemIcon>
                    Filter
                </MenuItem>
            </Menu>
        </>
    );
};

export default FilterMenu;