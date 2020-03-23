import axios from 'axios'
import config from '../configs/network'
import * as moment from 'moment'

const UserApi = config.BACKEND_URL + `/user`
const PostApi = config.BACKEND_URL + `/posts`
const ReportApi = config.BACKEND_URL + `/reports`

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

    return axios.get(PostApi + `/pages/${page}?_size=${limit}${query}`)

}

const getReport = (page, limit, query) => {
 
    if (!page) page = 1
    if (!limit) limit = 10

    if (query) query = "&" + query

    return axios.get(ReportApi + `/pages/${page}?_size=${limit}${query}`)
    
}

const acceptPost = (postId) => {
    return axios.put(ReportApi + `/${postId}`, {status: "active"})
}

const deletePost = (postId) => {
    return axios.delete(ReportApi + `/${postId}`)
}

const deleteUser = (userId) => {
    return axios.delete(UserApi + `/${userId}`)
}

const deleteReport = (reportId) => {
    return axios.delete(ReportApi + `/${reportId}`)
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

}