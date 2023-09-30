// material
import {styled} from "@mui/material/styles";
import {Stack} from "@mui/material";

//------------------------------------------------------------

const RootStyle = styled(Stack)(() => ({
    flex: 2,
    backgroundColor: theme => theme.palette.parentBg
}));

//------------------------------------------------------------

export default function CenterSkeleton() {
    return (
        <RootStyle/>
    );
}