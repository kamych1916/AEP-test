export const state = () => ({
    role: null,
})

export const getters = {
   get_role(state){
       console.log('state.role -> ', state.role)
       if (state.role != null){
        return state.role
       }
       else{
        return "[Неизвестно]"
       }       
   }
}

export const mutations = {
    update_role(state, role){
        state.role = role
    }
}

export const actions = {
    async store_new_role({commit}, role){ 
        commit('update_role', role)
    }
}
