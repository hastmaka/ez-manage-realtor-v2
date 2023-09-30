// import classes from './Dashboard.module.scss';

import EzStack from "../../../../Ez/stack/EzStack.jsx";
import ChildWrapper from "../../../../components/ChildWrapper/ChildWrapper.jsx";

export default function Dashboard() {
    return (
        <EzStack direction='row' gap={1}>
            <EzStack gap={1} sx={{flexGrow: 1}}>
                <EzStack direction='row' flex='1' gap={1}>
                    <ChildWrapper flex='1'>Total Revenue</ChildWrapper>
                    <ChildWrapper flex='1'>Customers</ChildWrapper>
                </EzStack>
                <EzStack direction='row' flex='1' gap={1}>
                    <ChildWrapper flex='1'>Top Products</ChildWrapper>
                    <ChildWrapper flex='1'>Stats Overview</ChildWrapper>
                </EzStack>
            </EzStack>

            <EzStack gap={1} sx={{width: '240px', height: 'calc(100vh - 80px)'}}>
                <ChildWrapper sx={{flex: 1}}>notification</ChildWrapper>
                <ChildWrapper sx={{flex: 1}}>daily activities</ChildWrapper>
                <ChildWrapper sx={{flex: 1}}>notes</ChildWrapper>
            </EzStack>
        </EzStack>
    );
}