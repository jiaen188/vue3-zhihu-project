import { createStore } from 'vuex'
import axios from 'axios'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}
export interface GlobalDataProps {
  colums: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const store = createStore<GlobalDataProps>({
  state: {
    colums: [],
    posts: [],
    user: { isLogin: true, name: 'jiaen', id: 1, columnId: 1 }
  },
  mutations: {
    login (state) {
      state.user = {
        ...state.user, isLogin: true, name: 'Gavin'
      }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.colums = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.colums = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      axios.get('/columns').then((res: { data: ColumnProps[] }) => {
        commit('fetchColumns', res.data)
      })
    },
    fetchColumn ({ commit }, cid) {
      axios.get(`/columns/${cid}`).then(res => {
        commit('fetchColumn', res.data)
      })
    },
    fetchPosts ({ commit }, cid) {
      axios.get(`/columns/${cid}/posts`).then(res => {
        commit('fetchPosts', res.data)
      })
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.colums.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  }
})

export default store
