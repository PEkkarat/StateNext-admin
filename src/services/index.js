import axios from 'axios'
import config from '../configs/network'
import * as moment from 'moment'
import socketIOClient from 'socket.io-client'

const UserApi = config.BACKEND_URL + `/user`
const PostApi = config.BACKEND_URL + `/posts`
const ReportApi = config.BACKEND_URL + `/reports`
const AdminApi = config.BACKEND_URL + `/admin`
const NotificationApi = config.BACKEND_URL + `/notification`

let socket = socketIOClient(config.BACKEND_URL, {
    reconnection: true
})

socket.on('connect', ()=>{
    console.log("connected");
    
})

const getSummary = async() => {

    let twoMonthAgo = moment().subtract(2, 'months').toISOString()
    let monthAgo = moment().subtract(1, 'months').toISOString()
    let twoWeenAgo = moment().subtract(2, 'weeks').toISOString()
    let now = moment().toISOString()

    const AllUser = axios.get(UserApi + `/count`)
    const UserCurMonth = axios.get(UserApi + `/count?createdAt=$date=${monthAgo},${now}`)
    const UserPrevMonth = axios.get(UserApi + `/count?createdAt=$date=${twoMonthAgo},${now}`)

    const PostCurMonth = axios.get(PostApi + `/count?createdAt=$date=${monthAgo},${now}`)
    const PostPrevMonth = axios.get(PostApi + `/count?createdAt=$date=${twoMonthAgo},${now}`)

    const Report = axios.get(ReportApi + `/count`)

    const PromiseNewUser = getUser()

    const UserCurPage = axios.get(UserApi + `/report?createdAt=$date=${twoWeenAgo},`)

    const TopPost = axios.get(PostApi + `/report`)

    let [
        allUser,
        userCurMonth,
        userPrevMonth,
        postCurMonth,
        postPrevMonth,
        report,
        newUser,
        userCurPage,
        topPost
    ] = await Promise.all([
        AllUser,
        UserCurMonth,
        UserPrevMonth,
        PostCurMonth,
        PostPrevMonth,
        Report,
        PromiseNewUser,
        UserCurPage,
        TopPost
    ])

    let userCurrentMonth = userCurMonth.data
    let postCurrentMonth = postCurMonth.data
    let reportData = report.data

    return {

        user: {
            count: userCurrentMonth.count,
            diff: userCurrentMonth.count - userPrevMonth.data.count,
            max: allUser.data.count
        },
        post: {
            count: postCurrentMonth.count,
            diff: postCurrentMonth.count - postPrevMonth.data.count
        },

        report: reportData,

        notification: {
            count: reportData.count + postCurrentMonth.count
        },

        newUser: newUser.data,

        acquisition: userCurPage.data,

        top_post: topPost.data

    }

}

const getUser = (page, limit, query) => {

    if (!page) page = 1
    if (!limit) limit = 5

    if (query) query = "&" + query

    return axios.get(UserApi + `/pages/${page}?_size=${limit}${query}`)

}

const getPost = (page, limit, query) => {

    if (!page) page = 1
    if (!limit) limit = 10

    if (query) query = "&" + query

    return axios.get(PostApi + `/pages/${page}?_size=${limit}${query}&_populate=product user`)

}

const getReport = (page, limit, query) => {
 
    if (!page) page = 1
    if (!limit) limit = 10

    if (query) query = "&" + query

    return axios.get(ReportApi + `/pages/${page}?_size=${limit}${query}&_populate=post user`)
    
}

const acceptPost = (postId) => {
    return axios.put(PostApi + `/${postId}`, {status: "active"})
}

const deletePost = (postId) => {
    return axios.delete(PostApi + `/${postId}`)
}

const deleteUser = (userId) => {
    return axios.delete(UserApi + `/${userId}`)
}

const deleteReport = (reportId) => {
    return axios.delete(ReportApi + `/${reportId}`)
}

const login = (username, password) => {
    return axios.post(AdminApi + `/login`, {username, password})
}

const logout = () => {
    return axios.post(AdminApi + `/logout`)
}

const getAdmins = () => {
    return axios.get(AdminApi + `/`)
}

const createAdmin = (username, password) => {
    // create as root
    return axios.post(AdminApi , {username, password, role:"5e55d6791de8513784846349"})
}

const deleteAdmin = (id) => {
    return axios.delete(AdminApi + `/${id}`)
}

const getMe = () => {
    return axios.get(AdminApi + `/me` )
}

const boardcastPost = (postId) => {
    socket.emit("send-notification-post", {post:postId}, (res) => console.log(res) )
}

export default {
  
    getSummary,
    getUser,
    getPost,
    getReport,
    acceptPost,
    deletePost,
    deleteUser,
    deleteReport,
    login,
    logout,
    getAdmins,
    createAdmin,
    deleteAdmin,
    getMe,
    boardcastPost

}