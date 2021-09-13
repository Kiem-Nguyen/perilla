import axios from "@/api";

export default {
    namespaced: true,
    mutations: {
        setByProp(state, data) {
            Object.keys(data).forEach((prop) => {
                const value = data[prop];
                state[prop] = value;
            });
        },
    },
    state: {
        queryUrl: "",
        payload: {},
    },
    getters: {},
    actions: {
        
        getApi: ({
            state
        }) => new Promise((resolve, reject) => {
            return axios.get(state.queryUrl)
                .then((res) => {
                    const data = res.data;
                    resolve(data);
                })
                .catch(err => reject(err));
        }),

        postApi: ({
            state
        }) => new Promise((resolve, reject) => {
            return axios.post(state.queryUrl, state.payload)
                .then((res) => {
                    const data = res.data;
                    resolve(data);
                })
                .catch(err => reject(err));
        }),

        putApi: ({
            state
        }) => new Promise((resolve, reject) => {
            return axios.put(state.queryUrl, state.payload)
                .then((res) => {
                    const data = res.data;
                    resolve(data);
                })
                .catch(err => reject(err));
        }),

        deleteApi: ({
            state
        }) => new Promise((resolve, reject) => {
            return axios.delete(state.queryUrl)
                .then((res) => {
                    const data = res.data;
                    resolve(data);
                })
                .catch(err => reject(err));
        }),
        
    },
};