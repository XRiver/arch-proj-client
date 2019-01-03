import {config} from 'config.js'
import {HTTP} from 'http.js'

const baseUrl = config.api_base_url
const syncHttp = HTTP()

const http = syncHttp

// 所有的params格式应当为： {data:{需传入参数}, success:参数为response body的回调函数}
const login = function(params) {
    http.request({
        url:`${baseUrl}/login?openid=${params.data.openid}`,
        method:'GET',
        success:params.success
    })
}

const register = function(params) {
    http.request({
        url:`${baseUrl}/signon`,
        method:'POST',
        data:params.data,
        success:params.success
    })
}

const getAttractions = function(params) {
    http.request({
        url:`${baseUrl}/attractions?type=all`,
        method:'GET',
        success:params.success
    })
}

const getAttractionById = function(params) {
    http.request({
        url:`${baseUrl}/attractions?type=single&aId=${params.data.aId}`,
        method:'GET',
        success:params.success
    })
}

const createPlan = function(params) {
    http.request({
        url:`${baseUrl}/createPlan`,
        method:'POST',
        data:params.data,
        success:params.success
    })
}

const searchPlanByAttractionName = function(params) {
    http.request({
        url:`${baseUrl}/plans?type=aName&aId=${params.data.aName}`,
        method:'GET',
        success:params.success
    })
}

const searchPlanByUserName = function(params) {
    http.request({
        url:`${baseUrl}/plans?type=uName&aId=${params.data.uName}`,
        method:'GET',
        success:params.success
    })
}

const joinPlan = function(params) {
    http.request({
        url:`${baseUrl}/joinPlan`,
        method:'POST',
        data:params.data,
        success:params.success
    })
}

module.export = {
    login,
    register,
    getAttractions,
    getAttractionById,
    createPlan,
    searchPlanByAttractionName,
    searchPlanByUserName,
    joinPlan
}
