// material
import {Stack} from "@mui/material";
import {styled} from '@mui/material/styles';

//----------------------------------------------------------------

const RootStyle = styled(Stack)(() => ({
    flex: 1,
    borderLeft: '1px solid #cfcfcf',
    margin: '0 auto',
    justifyContent: 'center',
    alignItems: 'center'
}));

//----------------------------------------------------------------

export default function Right() {
    return (
        <RootStyle>
            coming soon
        </RootStyle>
    );
}
