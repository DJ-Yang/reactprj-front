// axios를 사용하는 파일
import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:8000/api"

export default {
    // 안에 여러가지 오브젝트를 넣을 수 있다
    // 이번에는 함수를 넣어볼 생각이다.
    
    // 모든 글 불러오기
    getAllPosts() {
        return axios.get('/posts/')
    },

    // 글 작성하기
    createPost(data) {
        return axios.post('/posts/', data)
    },
}