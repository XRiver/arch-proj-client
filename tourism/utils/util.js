const backUInfo2wxUInfo = function(backUInfo) {

    let sex = 1
    if(backUInfo.sex == '女') {
        sex = 0
    }

    return {
        uid:backUInfo.uid,
        openid:backUInfo.openid,
        realname:backUInfo.uname,
        school:backUInfo.school,
        avatarUrl:backUInfo.pictureurl,
        country:backUInfo.country,
        province:backUInfo.province,
        city:backUInfo.city,
        gender:sex,
        nickname:backUInfo.nickname,
        language:backUInfo.language
    }
}


const wxUInfo2backUInfo = function(wxUInfo) {
    let sex = '男'
    if(wxUInfo.gender == 0) {
        sex = '女'
    }
    
    return {
        uid:wxUInfo.uid,
        openid:wxUInfo.openid,
        uname:wxUInfo.realname,
        school:wxUInfo.school,
        pictureurl:wxUInfo.avatarUrl,
        sex:sex,
        nickname:wxUInfo.nickname,
        country:wxUInfo.country,
        province:wxUInfo.province,
        city:wxUInfo.city,
        language:wxUInfo.language
    }
}

const setAttrsTo = function (oldObj,newAttrs) {
    let ret = {}

    for (var attrname in oldObj) { ret[attrname] = oldObj[attrname]; }
    for (var attrname in newAttrs) { ret[attrname] = newAttrs[attrname]; }

    return ret;
}

export {
    backUInfo2wxUInfo,
    wxUInfo2backUInfo,
    setAttrsTo
}