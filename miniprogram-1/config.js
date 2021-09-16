/**
 * 小程序配置文件
 */

var host = "https://www.gugensoft.com/weishi"

var config = {

    // 下面的地址配合云端 Server 工作
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/open/login`,
    userInfoUrl: `${host}/open/info`,
    phoneUrl: `${host}/open/phone`,
    buyUrl: `${host}/mini/buy`

};

module.exports = config
