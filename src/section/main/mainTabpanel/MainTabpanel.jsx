import EzTabpanel from "../../../Ez/tabpanel/EzTabpanel.jsx";
import {getModules} from "../../../helper/index.js";

const MainTabpanel = () => {
    const tabs = getModules()

    let {hash} = window.location,
        reference,
        tabIndex;

    if (hash) {
        reference = hash.split('#')[1];
        tabIndex = tabs.filter(tab => tab.reference === reference)[0]?.id || 0;
    }

    if (!tabIndex) {
        window.location.hash = tabs[0].reference;
    }

    return (
        <EzTabpanel
            tabs={tabs}
            orientation='vertical'
            tabIndex={tabIndex? tabIndex - 1 : 0}
            heightGap={60}
            onTabClick={(tab) => window.location.hash = tab.reference}
            main
        />
    );
};

export default MainTabpanel;