import Left from "./left/Left.jsx";
import Center from "./center/Center.jsx";
// import LeftSkeleton from "./left/LeftSkeleton.jsx";
// import CenterSkeleton from "./center/CenterSkeleton.jsx";
import PropTypes from "prop-types";
import EzStack from "../../../../../Ez/stack/EzStack.jsx";

export default function ClientView({state}) {
    return (
        <EzStack
            sx={{
                width: '95vw'
            }}
        >
            <EzStack
                sx={{
                    minHeight: '90vh',
                    width: '100%',
                    borderRadius: '4px',
                    backgroundColor: '#ffffff',
                    flexDirection: 'row'
                }}
            >
                {/*<Container>*/}
                    <Left state={state}/>
                    <Center state={state}/>
                    {/*<Right/>*/}
                {/*</Container>*/}
            </EzStack>
        </EzStack>
    );
}

ClientView.propTypes = {
    state: PropTypes.object.isRequired
}