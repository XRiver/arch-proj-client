const config = require('../config.js')
const SyncHTTP = require('http.js').HTTP

const baseUrl = config.api_base_url
const syncHttp = new SyncHTTP()
const asyncHttp = null

const http = syncHttp

// 所有的params格式应当为： {data:{需传入参数}, success:参数为response body的回调函数}
const login = function(params) {
    http.request({
        url:`${baseUrl}/login/${params.data.openid}`,
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
        url:`${baseUrl}/attractions`,
        method:'GET',
        success:params.success
    })
}

const getAttractionById = function(params) {
    http.request({
        url:`${baseUrl}/attractions/${params.data.aid}`,
        method:'GET',
        success:params.success
    })
}

const createPlan = function(params) {
    http.request({
        url:`${baseUrl}/plan`,
        method:'POST',
        data:params.data,
        success:params.success
    })
}

const getPlanByOpenId = function(param) {
    http.request({
        url:`${baseUrl}/plan/openid/${params.data.openid}`,
        method:'GET',
        success:params.success
    })
}

const searchPlanByUname = function(params) {
    http.request({
        url:`${baseUrl}/plan/uname/${params.data.uname}`,
        method:'GET',
        success:params.success
    })
}

const searchPlanByAname = function(params) {
    http.request({
        url:`${baseUrl}/plan/attraction/${params.data.aname}`,
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

const getPlanApplicants = function(params) {
    http.request({
        url:`${baseUrl}/plan/apply/${params.data.pid}`,
        method:'GET',
        success:params.success
    })
}

const processApply = function(params) {
    http.request({
        url:`${baseUrl}/plan/apply`,
        method:'PUT',
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
  getPlanByOpenId,
  searchPlanByUname,
  searchPlanByAname,
  applyPlan,
  getPlanApplicants,
  processApply
}
