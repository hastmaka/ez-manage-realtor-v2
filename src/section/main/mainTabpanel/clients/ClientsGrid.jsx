import EzGrid from "../../../../Ez/grid/EzGrid.jsx";
import EzText from "../../../../Ez/text/EzText.jsx";
import EzStack from "../../../../Ez/stack/EzStack.jsx";
import {EzGridState} from "../../../../Ez/grid/EzGridState.jsx";
import ClientView from "./clientView/ClientView.jsx";
import ClientModel from "../../../../models/ClientModel.jsx";
import ClientForm from "./clientForm/ClientForm.jsx";

const CustomSelect = ({value, params}) => {
    const options = ['Done', 'Pending', 'Call', 'Note', 'Update'];

    // const handleChange = (event) => {
    //     debugger
    //     const updatedRows = params.api.getRowModels().map((row) => {
    //         if (row.id === params.id) {
    //             return { ...row, [params.field]: event.target.value };
    //         }
    //         return row;
    //     });
    //
    //     params.api.updateRows(updatedRows);
    // };

    return (
        <select
            style={{
                width: '100%',
                height: '100%',
                borderStyle: 'none'
            }}
            value={value}
            onChange={() => {}}
        >
            {options.map(option =>
                <option key={option} value={option}>{option}</option>
            )}
        </select>
    )
}

const columns = [
    {
        field: 'name',
        headerName: 'Full Name',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
            return <EzText text={`${params.row.name} ${params.row.last_name}`}/>
        }
    },
    {
        field: 'phone',
        headerName: 'Phone',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
            return <EzText text={params.value}/>
        }
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
            return <EzText text={params.value}/>
        }
    },
    {
        field: 'service',
        headerName: 'Service',
        width: 80,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
            return <EzText text={params.value.type}/>
        }
    },
    {
        field: 'bed',
        headerName: 'Bed',
        width: 80,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
            return (
                <EzStack direction='row' gap={1}>
                    {params.row.service.bed.map(item =>
                        <EzText key={item} text={item}/>
                    )}
                </EzStack>
            )
        }
    },
    {
        field: 'bath',
        headerName: 'Bath',
        width: 80,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
            return (
                <EzStack direction='row' gap={1}>
                    {params.row.service.bath.map(item =>
                        <EzText key={item} text={item}/>
                    )}
                </EzStack>
            )
        }
    },
    {
        field: 'zip',
        headerName: 'Zip',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
            return (
                <EzStack direction='row' gap={1}>
                    {params.row.service.zip.map(item =>
                        <EzText key={item} text={item}/>
                    )}
                </EzStack>
            )
        }
    },
    {
        field: 'price',
        headerName: 'Price',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => {
            return <EzText
                text={params.row.service.type === 'rent' ?
                    `$${params.row.service.price_from} - $${params.row.service.price_to}` :
                    `$${params.row.service.pre_approval}`
                }
            />
        }
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        editable: true,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
            return <EzText text={params.value}/>
        },
        renderEditCell: (params) => (
            <CustomSelect value={params.value} params={params}/>
        )
    }
]

const stateParams = {
    primaryId: 'id',
    // stateName: 'ClientsGridState',
    store: {
        // db: 'NOSQL',
        type: 'remote',
        model: ClientModel,
        rootProperty: 'data',
        limit: 10,
        api: {
            read: 'clients',
            create: 'clients',
            update: 'clients',
            delete: 'clients'
        }
    },
    columns
}


const ClientsGrid = () => {
    const state = EzGridState(stateParams);
    return (
        <EzGrid
            state={state}
            editComponent={<ClientView state={state}/>}
            addComponent={<ClientForm state={state}/>}
        />
    );
};

export default ClientsGrid;