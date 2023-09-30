import {createAsyncThunk} from "@reduxjs/toolkit";

export const gridApi = (name) => {
    const template = (method) => {
        return createAsyncThunk(
            `${method}_${name}`,
            async ({path, record, params, callBack}, {rejectWithValue}) => {
                try {
                    if (method === 'get') {
                        // const {data} = await axios[method](url + path, {
                        //     headers: {'Authorization': verifySession()},
                        //     params: {...params}
                        // });
                        // if (callBack?.toast) {
                        //     callBack.toast()
                        // }

                        // return data;
                    } else {
                        // const {data} = await axios[method](url + path, {data: {...record}}, {headers: {'Authorization': verifySession()},  params: {...params}});
                        // return data;
                    }

                } catch (error) {
                    if (callBack?.error) {
                        return callBack.error()
                    }
                    return rejectWithValue(error.response.data);
                }
            })
    }
    return [template('get'), template('post'), template('put'), template('delete')];
}