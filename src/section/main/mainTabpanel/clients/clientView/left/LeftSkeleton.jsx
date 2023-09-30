// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(() => ({
    flex: 1,
    borderRight: '1px solid #cfcfcf',
    gap: '16px',
    maxWidth: '350px',
    minWidth: '250px'
}));

//----------------------------------------------------------------

export default function LeftSkeleton() {
    return (
        <RootStyle/>
    );
}
