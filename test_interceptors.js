api.interceptor.request.use((config => {
    const token = ls.get('token')
    if(token) {
        config.params['token'] = token
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

api.interceptor.response.use((response) => {
    return response
}, (error) => {
    if(error.response.status === 400 || error.response.status === 401) {
        store.dispatch('auth/logout', true).then( () => {
            router.push({name: 'login'}, () => {
                Vue.prototype.$toast.open({message: 'Veuillez vous reconnecter', type: 'is-danger'})
            })
        })
    }
    return Promise.reject(error)
})