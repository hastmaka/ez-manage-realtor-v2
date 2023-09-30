import EzStack from "../../../Ez/stack/EzStack.jsx";
import Burger from "../../../components/burger/Burger.jsx";
import {useSelector} from "react-redux";
import EzText from "../../../Ez/text/EzText.jsx";

const MainToolBar = () => {
    const {burger} = useSelector(state => state.general)
    // debugger
    return (
        <EzStack direction='row' alignItems='center' sx={{height: '60px'}}>
            <EzStack
                justifyContent='center'
                alignItems='center'
                sx={{
                    width: burger.toggle ? '50px' : '200px',
                    transition: 'all 200ms',
                    backgroundColor: '#e2e2e2',
                    height: '100%'
                }}
            >
                <EzText
                    sx={{
                        fontSize: '16px'
                    }}
                    text={`RY&L`}
                />
            </EzStack>
            <EzStack
                direction='row'
                alignItems='center'
                sx={{backgroundColor: 'rgb(50, 63, 77)', height: '100%'}}
                flex={1}
            >
                <EzStack flex='1'><Burger/></EzStack>
                <EzStack sx={{width: '200px'}}></EzStack>
            </EzStack>
        </EzStack>
    );
};

export default MainToolBar;