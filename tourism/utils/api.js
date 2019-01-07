const config = require('../config.js')
const SyncHTTP = require('http.js').HTTP

const baseUrl = config.api_base_url
const syncHttp = new SyncHTTP()
const asyncHttp = null

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
        url:`${baseUrl}/register`,
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
        url:`${baseUrl}/attractions?type=single&aid=${params.data.aid}`,
        method:'GET',
        success:params.success
    })
}

const createPlan = function(params) {
    http.request({
        url:`${baseUrl}/plan/create`,
        method:'POST',
        data:params.data,
        success:params.success
    })
}

const searchPlanByAttractionName = function(params) {
    http.request({
        url:`${baseUrl}/plans?type=aname&aname=${params.data.aname}`,
        method:'GET',
        success:params.success
    })
}

const searchPlanByUserName = function(params) {
    http.request({
        url:`${baseUrl}/plans?type=uname&uname=${params.data.uname}`,
        method:'GET',
        success:params.success
    })
}

const applyPlan = function(params) {
    http.request({
        url:`${baseUrl}/plan/apply`,
        method:'POST',
        data:params.data,
        success:params.success
    })
}

export {
  login,
  register,
  getAttractions,
  getAttractionById,
  createPlan,
  searchPlanByAttractionName,
  searchPlanByUserName,
  joinPlan
}
