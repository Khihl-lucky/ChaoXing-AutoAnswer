// ==UserScript==
// @name                AI学习通助手（DeepSeek + Kimi）
// @version             2.1.0
// @description         支持DeepSeek/Kimi双模型的学习通自动答题助手，图片题目自动截图识别，用户自行填写API密钥免费使用
// @author              Khihl & Claude
// @originalAuthor      Ne-21
// @match               *://*.chaoxing.com/*
// @match               *://*.edu.cn/*
// @match               *://groupweb.chaoxing.com/*
// @connect             api.deepseek.com
// @connect             api.moonshot.cn
// @connect             zhibo.chaoxing.com
// @connect             chaoxing.com
// @connect             groupweb.chaoxing.com
// @run-at              document-end
// @grant               unsafeWindow
// @grant               GM_xmlhttpRequest
// @grant               GM_setValue
// @grant               GM_getValue
// @grant               GM_info
// @grant               GM_getResourceText
// @require             https://gptjs.808860.xyz/libs/TyprMd5.js
// @require             https://gptjs.808860.xyz/libs/sweetalert2-11.1.0.all.min.js
// @require             https://gptjs.808860.xyz/libs/jquery-3.7.1.min.js
// @require             https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js
// @resource            Table https://gptjs.808860.xyz/libs/table.json
// @icon                data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHJva2Utd2lkdGg9IjEuNSIgY2xhc3M9ImgtNiB3LTYiIHJvbGU9ImltZyI+PHRpdGxlPkNoYXRHUFQ8L3RpdGxlPjx0ZXh0IHg9Ii05OTk5IiB5PSItOTk5OSI+Q2hhdEdQVDwvdGV4dD48cGF0aCBkPSJNMzcuNTMyNCAxNi44NzA3QzM3Ljk4MDggMTUuNTI0MSAzOC4xMzYzIDE0LjA5NzQgMzcuOTg4NiAxMi42ODU5QzM3Ljg0MDkgMTEuMjc0NCAzNy4zOTM0IDkuOTEwNzYgMzYuNjc2IDguNjg2MjJDMzUuNjEyNiA2LjgzNDA0IDMzLjk4ODIgNS4zNjc2IDMyLjAzNzMgNC40OTg1QzMwLjA4NjQgMy42Mjk0MSAyNy45MDk4IDMuNDAyNTkgMjUuODIxNSAzLjg1MDc4QzI0Ljg3OTYgMi43ODkzIDIzLjcyMTkgMS45NDEyNSAyMi40MjU3IDEuMzYzNDFDMjEuMTI5NSAwLjc4NTU3NSAxOS43MjQ5IDAuNDkxMjY5IDE4LjMwNTggMC41MDAxOTdDMTYuMTcwOCAwLjQ5NTA0NCAxNC4wODkzIDEuMTY4MDMgMTIuMzYxNCAyLjQyMjE0QzEwLjYzMzUgMy42NzYyNCA5LjM0ODUzIDUuNDQ2NjYgOC42OTE3IDcuNDc4MTVDNy4zMDA4NSA3Ljc2Mjg2IDUuOTg2ODYgOC4zNDE0IDQuODM3NyA5LjE3NTA1QzMuNjg4NTQgMTAuMDA4NyAyLjczMDczIDExLjA3ODIgMi4wMjgzOSAxMi4zMTJDMC45NTY0NjQgMTQuMTU5MSAwLjQ5ODkwNSAxNi4yOTg4IDAuNzIxNjk4IDE4LjQyMjhDMC45NDQ0OTIgMjAuNTQ2NyAxLjgzNjEyIDIyLjU0NDkgMy4yNjggMjQuMTI5M0MyLjgxOTY2IDI1LjQ3NTkgMi42NjQxMyAyNi45MDI2IDIuODExODIgMjguMzE0MUMyLjk1OTUxIDI5LjcyNTYgMy40MDcwMSAzMS4wODkyIDQuMTI0MzcgMzIuMzEzOEM1LjE4NzkxIDM0LjE2NTkgNi44MTIzIDM1LjYzMjIgOC43NjMyMSAzNi41MDEzQzEwLjcxNDEgMzcuMzcwNCAxMi44OTA3IDM3LjU5NzMgMTQuOTc4OSAzNy4xNDkyQzE1LjkyMDggMzguMjEwNyAxNy4wNzg2IDM5LjA1ODcgMTguMzc0NyAzOS42MzY2QzE5LjY3MDkgNDAuMjE0NCAyMS4wNzU1IDQwLjUwODcgMjIuNDk0NiA0MC40OTk4QzI0LjYzMDcgNDAuNTA1NCAyNi43MTMzIDM5LjgzMjEgMjguNDQxOCAzOC41NzcyQzMwLjE3MDQgMzcuMzIyMyAzMS40NTU2IDM1LjU1MDYgMzIuMTExOSAzMy41MTc5QzMzLjUwMjcgMzMuMjMzMiAzNC44MTY3IDMyLjY1NDcgMzUuOTY1OSAzMS44MjFDMzcuMTE1IDMwLjk4NzQgMzguMDcyOCAyOS45MTc4IDM4Ljc3NTIgMjguNjg0QzM5Ljg0NTggMjYuODM3MSA0MC4zMDIzIDI0LjY5NzkgNDAuMDc4OSAyMi41NzQ4QzM5Ljg1NTYgMjAuNDUxNyAzOC45NjM5IDE4LjQ1NDQgMzcuNTMyNCAxNi44NzA3Wk0yMi40OTc4IDM3Ljg4NDlDMjAuNzQ0MyAzNy44ODc0IDE5LjA0NTkgMzcuMjczMyAxNy42OTk0IDM2LjE1MDFDMTcuNzYwMSAzNi4xMTcgMTcuODY2NiAzNi4wNTg2IDE3LjkzNiAzNi4wMTYxTDI1LjkwMDQgMzEuNDE1NkMyNi4xMDAzIDMxLjMwMTkgMjYuMjY2MyAzMS4xMzcgMjYuMzgxMyAzMC45Mzc4QzI2LjQ5NjQgMzAuNzM4NiAyNi41NTYzIDMwLjUxMjQgMjYuNTU0OSAzMC4yODI1VjE5LjA1NDJMMjkuOTIxMyAyMC45OThDMjkuOTM4OSAyMS4wMDY4IDI5Ljk1NDEgMjEuMDE5OCAyOS45NjU2IDIxLjAzNTlDMjkuOTc3IDIxLjA1MiAyOS45ODQyIDIxLjA3MDcgMjkuOTg2NyAyMS4wOTAyVjMwLjM4ODlDMjkuOTg0MiAzMi4zNzUgMjkuMTk0NiAzNC4yNzkxIDI3Ljc5MDkgMzUuNjg0MUMyNi4zODcyIDM3LjA4OTIgMjQuNDgzOCAzNy44ODA2IDIyLjQ5NzggMzcuODg0OVpNNi4zOTIyNyAzMS4wMDY0QzUuNTEzOTcgMjkuNDg4OCA1LjE5NzQyIDI3LjcxMDcgNS40OTgwNCAyNS45ODMyQzUuNTU3MTggMjYuMDE4NyA1LjY2MDQ4IDI2LjA4MTggNS43MzQ2MSAyNi4xMjQ0TDEzLjY5OSAzMC43MjQ4QzEzLjg5NzUgMzAuODQwOCAxNC4xMjMzIDMwLjkwMiAxNC4zNTMyIDMwLjkwMkMxNC41ODMgMzAuOTAyIDE0LjgwODggMzAuODQwOCAxNS4wMDczIDMwLjcyNDhMMjQuNzMxIDI1LjExMDNWMjguOTk3OUMyNC43MzIxIDI5LjAxNzcgMjQuNzI4MyAyOS4wMzc2IDI0LjcxOTkgMjkuMDU1NkMyNC43MTE1IDI5LjA3MzYgMjQuNjk4OCAyOS4wODkzIDI0LjY4MjkgMjkuMTAxMkwxNi42MzE3IDMzLjc0OTdDMTQuOTA5NiAzNC43NDE2IDEyLjg2NDMgMzUuMDA5NyAxMC45NDQ3IDM0LjQ5NTRDOS4wMjUwNiAzMy45ODExIDcuMzg3ODUgMzIuNzI2MyA2LjM5MjI3IDMxLjAwNjRaTTQuMjk3MDcgMTMuNjE5NEM1LjE3MTU2IDEyLjA5OTggNi41NTI3OSAxMC45MzY0IDguMTk4ODUgMTAuMzMyN0M4LjE5ODg1IDEwLjQwMTMgOC4xOTQ5MSAxMC41MjI4IDguMTk0OTEgMTAuNjA3MVYxOS44MDhDOC4xOTM1MSAyMC4wMzc4IDguMjUzMzQgMjAuMjYzOCA4LjM2ODIzIDIwLjQ2MjlDOC40ODMxMiAyMC42NjE5IDguNjQ4OTMgMjAuODI2NyA4Ljg0ODYzIDIwLjk0MDRMMTguNTcyMyAyNi41NTQyTDE1LjIwNiAyOC40OTc5QzE1LjE4OTQgMjguNTA4OSAxNS4xNzAzIDI4LjUxNTUgMTUuMTUwNSAyOC41MTczQzE1LjEzMDcgMjguNTE5MSAxNS4xMTA3IDI4LjUxNiAxNS4wOTI0IDI4LjUwODJMNy4wNDA0NiAyMy44NTU3QzUuMzIxMzUgMjIuODYwMSA0LjA2NzE2IDIxLjIyMzUgMy41NTI4OSAxOS4zMDQ2QzMuMDM4NjIgMTcuMzg1OCAzLjMwNjI0IDE1LjM0MTMgNC4yOTcwNyAxMy42MTk0Wk0zMS45NTUgMjAuMDU1NkwyMi4yMzEyIDE0LjQ0MTFMMjUuNTk3NiAxMi40OTgxQzI1LjYxNDIgMTIuNDg3MiAyNS42MzMzIDEyLjQ4MDUgMjUuNjUzMSAxMi40Nzg3QzI1LjY3MjkgMTIuNDc2OSAyNS42OTI4IDEyLjQ4MDEgMjUuNzExMSAxMi40ODc5TDMzLjc2MzEgMTcuMTM2NEMzNC45OTY3IDE3Ljg0OSAzNi4wMDE3IDE4Ljg5ODIgMzYuNjYwNiAyMC4xNjEzQzM3LjMxOTQgMjEuNDI0NCAzNy42MDQ3IDIyLjg0OSAzNy40ODMyIDI0LjI2ODRDMzcuMzYxNyAyNS42ODc4IDM2LjgzODIgMjcuMDQzMiAzNS45NzQzIDI4LjE3NTlDMzUuMTEwMyAyOS4zMDg2IDMzLjk0MTUgMzAuMTcxNyAzMi42MDQ3IDMwLjY2NDFDMzIuNjA0NyAzMC41OTQ3IDMyLjYwNDcgMzAuNDczMyAzMi42MDQ3IDMwLjM4ODlWMjEuMTg4QzMyLjYwNjYgMjAuOTU4NiAzMi41NDc0IDIwLjczMjggMzIuNDMzMiAyMC41MzM4QzMyLjMxOSAyMC4zMzQ4IDMyLjE1NCAyMC4xNjk4IDMxLjk1NSAyMC4wNTU2Wk0zNS4zMDU1IDE1LjAxMjhDMzUuMjQ2NCAxNC45NzY1IDM1LjE0MzEgMTQuOTE0MiAzNS4wNjkgMTQuODcxN0wyNy4xMDQ1IDEwLjI3MTJDMjYuOTA2IDEwLjE1NTQgMjYuNjgwMyAxMC4wOTQzIDI2LjQ1MDQgMTAuMDk0M0MyNi4yMjA2IDEwLjA5NDMgMjUuOTk0OCAxMC4xNTU0IDI1Ljc5NjMgMTAuMjcxMkwxNi4wNzI2IDE1Ljg4NThWMTEuOTk4MkMxNi4wNzE1IDExLjk3ODMgMTYuMDc1MyAxMS45NTg1IDE2LjA4MzcgMTEuOTQwNUMxNi4wOTIxIDExLjkyMjUgMTYuMTA0OCAxMS45MDY4IDE2LjEyMDcgMTEuODk0OUwyNC4xNzE5IDcuMjUwMjVDMjUuNDA1MyA2LjUzOTAzIDI2LjgxNTggNi4xOTM3NiAyOC4yMzgzIDYuMjU0ODJDMjkuNjYwOCA2LjMxNTg5IDMxLjAzNjQgNi43ODA3NyAzMi4yMDQ0IDcuNTk1MDhDMzMuMzcyMyA4LjQwOTM5IDM0LjI4NDIgOS41Mzk0NSAzNC44MzM0IDEwLjg1MzFDMzUuMzgyNiAxMi4xNjY3IDM1LjU0NjQgMTMuNjA5NSAzNS4zMDU1IDE1LjAxMjhaTTE0LjI0MjQgMjEuOTQxOUwxMC44NzUyIDE5Ljk5ODFDMTAuODU3NiAxOS45ODkzIDEwLjg0MjMgMTkuOTc2MyAxMC44MzA5IDE5Ljk2MDJDMTAuODE5NSAxOS45NDQxIDEwLjgxMjIgMTkuOTI1NCAxMC44MDk4IDE5LjkwNThWMTAuNjA3MUMxMC44MTA3IDkuMTgyOTUgMTEuMjE3MyA3Ljc4ODQ4IDExLjk4MTkgNi41ODY5NkMxMi43NDY2IDUuMzg1NDQgMTMuODM3NyA0LjQyNjU5IDE1LjEyNzUgMy44MjI2NEMxNi40MTczIDMuMjE4NjkgMTcuODUyNCAyLjk5NDY0IDE5LjI2NDkgMy4xNzY3QzIwLjY3NzUgMy4zNTg3NiAyMi4wMDg5IDMuOTM5NDEgMjMuMTAzNCA0Ljg1MDY3QzIzLjA0MjcgNC44ODM3OSAyMi45MzcgNC45NDIxNSAyMi44NjY4IDQuOTg0NzNMMTQuOTAyNCA5LjU4NTE3QzE0LjcwMjUgOS42OTg3OCAxNC41MzY2IDkuODYzNTYgMTQuNDIxNSAxMC4wNjI2QzE0LjMwNjUgMTAuMjYxNiAxNC4yNDY2IDEwLjQ4NzcgMTQuMjQ3OSAxMC43MTc1TDE0LjI0MjQgMjEuOTQxOVpNMTYuMDcxIDE3Ljk5OTFMMjAuNDAxOCAxNS40OTc4TDI0LjczMjUgMTcuOTk3NVYyMi45OTg1TDIwLjQwMTggMjUuNDk4M0wxNi4wNzEgMjIuOTk4NVYxNy45OTkxWiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg+PC9zdmc+
// @homepage            https://github.com/Khihl/deepseek-xuexitong
// ==/UserScript==


/*********************************自定义配置区******************************************************** */
var setting = {
    // ===== DeepSeek API 配置 =====
    deepseekApiKey: '',   // DeepSeek API密钥，请在浮窗设置中填写或直接在此处填写
    deepseekBaseUrl: 'https://api.deepseek.com',  // DeepSeek API地址
    deepseekModel: 'deepseek-v4-pro',             // 模型名称: deepseek-v4-flash(快速) / deepseek-v4-pro(强力)

    showBox: 1,     // 显示脚本浮窗，0为关闭，1为开启，不建议关闭
    maskImg: 1,     // 显示皮卡丘，0为关闭，1为开启，默认开启，无实质作用，只是为了减少睿智问题

    task: 1,        // 只处理任务点任务，0为关闭，1为开启，默认开启

    video: 1,       // 处理视频，0为关闭，1为开启
    audio: 1,       // 处理音频，0为关闭，1为开启
    rate: 1,        // 视频/音频倍速，默认 1（正常），可在浮窗设置中调整（1/1.25/1.5/2）
    review: 0,      // 复习模式，0为关闭，1为开启可以补挂视频时长

    work: 1,        // 测验自动处理，0为关闭，1为开启，开启将会处理测验，关闭会跳过测验
    time: 2500,     // 答题时间间隔，默认5s=5000
    reqIntervalTime: 0, // 搜题（AI）请求最小间隔(秒)。0 为不节流；高并发可设 1~3 秒，避免被服务端限流
    sub: 1,         // 测验自动提交，0为关闭,1为开启，当没答案时测验将不会提交，如需提交请设置force：1
    force: 0,       // 测验强制提交，0为关闭，1为开启，开启此功能将会强制提交测验（无论作答与否）
    decrypt: 1,     // 字体解密，0为关闭，1为开启，推荐开启，方法来自wyn665817大佬
    redo: 0,        // 重做模式，0为关闭，1为开启，开启后不跳过已答题，重新AI作答覆盖旧答案
    fuzzyMatch: 1,  // 相似度匹配，0为关闭，1为开启，开启后当精确匹配失败时使用相似度匹配选择最接近的选项

    examTurn: 0,     // 考试自动跳转下一题，0为关闭，1为开启
    examTurnTime: 0, // 考试自动跳转下一题随机间隔时间(3-7s)之间，0为关闭，1为开启
    goodStudent: 1,  // 好学生模式,不自动选择答案,仅将单选题和多选题的ABCD加粗
    alterTitle: 1,  //修改题目,将AI回复的答案插入题目中,不建议关闭,AI回复不能完全匹配答案,题目显示答案供手动选择

    autoLogin: 0,   // 自动登录，0为关闭，1为开启，开启此功能请配置登陆配置项
    phone: '',      // 登录配置项：登录手机号/超星号
    password: '',   // 登录配置项：登录密码

    // ===== Kimi API 配置（图片题目自动使用） =====
    kimiApiKey: '',   // Kimi API 密钥，从 platform.moonshot.cn 获取
    kimiBaseUrl: 'https://api.moonshot.cn/v1',  // Kimi API 地址
    kimiModel: 'kimi-k2.6'                      // Kimi 模型（支持图片理解）
}
/************************************************************************************************** */
/*
  ╔══════════════════════════════════════════════════════════════╗
  ║          AI学习通助手 v2.1.0 (DeepSeek + Kimi)              ║
  ╠══════════════════════════════════════════════════════════════╣
  ║  原作者:    Ne-21                                           ║
  ║  开发者:    Khihl & Claude (AI-Assisted)                    ║
  ║  更新:      2026-06-07 · Liquid Glass UI v3.0                ║
  ║                                                             ║
  ║  DeepSeek(纯文本) + Kimi(图片多模态) 双模型智能分流          ║
  ║  文档/PPT模拟翻阅 · 讨论区AI自动回复 · 视频弹题处理          ║
  ║  智能防卡死 · 任务跳过 · DOM状态实时刷新                     ║
  ╚══════════════════════════════════════════════════════════════╝
*/
/************************************************************************************************** */


var _w = unsafeWindow,
    _l = location,
    _d = _w.document,
    $ = _w.jQuery || top.jQuery,
    md5 = md5 || window.md5,
    UE = _w.UE,
    Swal = Swal || window.Swal;

// DeepSeek API 配置读取（优先从 GM_getValue 读取（跨域共享），否则从 localStorage 读取，最后使用 setting 中的默认值）
function getDeepSeekApiKey() {
    return GM_getValue('deepseekApiKey', '') || localStorage.getItem('GPTJsSetting.deepseekApiKey') || setting.deepseekApiKey || '';
}
function getDeepSeekBaseUrl() {
    return GM_getValue('deepseekBaseUrl', '') || localStorage.getItem('GPTJsSetting.deepseekBaseUrl') || setting.deepseekBaseUrl || 'https://api.deepseek.com';
}
function getDeepSeekModel() {
    return GM_getValue('deepseekModel', '') || localStorage.getItem('GPTJsSetting.deepseekModel') || setting.deepseekModel || 'deepseek-v4-pro';
}
// 保存 DeepSeek API 配置（同时写入 GM_setValue 和 localStorage）
function saveDeepSeekConfig(key, value) {
    GM_setValue(key, value);
    localStorage.setItem('GPTJsSetting.' + key, value);
}

// Kimi API 配置读取（与 DeepSeek 同样的三级优先级策略）
function getKimiApiKey() {
    return GM_getValue('kimiApiKey', '') || localStorage.getItem('GPTJsSetting.kimiApiKey') || setting.kimiApiKey || '';
}
function getKimiBaseUrl() {
    return GM_getValue('kimiBaseUrl', '') || localStorage.getItem('GPTJsSetting.kimiBaseUrl') || setting.kimiBaseUrl || 'https://api.moonshot.cn/v1';
}
function getKimiModel() {
    return GM_getValue('kimiModel', '') || localStorage.getItem('GPTJsSetting.kimiModel') || setting.kimiModel || 'kimi-k2.6';
}

var _mlist, _defaults, _domList, $subBtn, $saveBtn, $frame_c, $okBtn;
var _currentOptionHtml = '';
var _lastMatchInfo = '';
var _currentQuestionMeta = null;
// AI 搜题请求节流：记录下一次可发起请求的时间戳（ms），由 getAnswer 内部维护
var _ne21NextAiAllowedAt = 0;
var _toNextRetryCount = 0;
var _lastPageUrl = '';

$('.navshow').find('a:contains(体验新版)')[0] ? $('.navshow').find('a:contains(体验新版)')[0].click() : '';

setting.decrypt ? decryptFont() : '';

function waitForJQueryElement(selector) {
    return new Promise(function (resolve) {
        var interval = setInterval(function () {
            if ($(selector).length > 0) {
                clearInterval(interval);
                resolve();
            }
        }, 500);
    });
}

if (_l.hostname == 'i.mooc.chaoxing.com' || _l.hostname == "i.chaoxing.com") {
    // 
} else if (_l.pathname == '/login' && setting.autoLogin) {
    showBox()
    waitForJQueryElement('#phone').then(function () { autoLogin() });
} else if (_l.pathname.includes('/mycourse/studentstudy')) {
    showBox()
    $('#ne-21log', window.parent.document).html('初始化完毕！')
    setupAntiSleep()
    setupAutoRefresh()
} else if (_l.pathname.includes('/knowledge/cards')) {
    setupAntiSleep()
    var params = getTaskParams()
    var parsedParams = null;
    if (params && params !== '$mArg') {
        try { parsedParams = $.parseJSON(params); } catch (e) { parsedParams = null; }
    }
    if (!parsedParams || !parsedParams['attachments'] || parsedParams['attachments'].length <= 0) {
        logger(_logP.NAV + '[跳过] 无任务点可处理，跳转页面。', 'skip')
        toNext()
    } else {
        waitForJQueryElement('.wrap .ans-cc .ans-attach-ct').then(function () {
            top.checkJob ? top.checkJob = () => false : true
            _domList = []
            _mlist = parsedParams['attachments']
            _defaults = parsedParams['defaults']
            // 按每个 iframe 逐个推入 _domList，确保与 _mlist 一一对应
            // 修复：原来每个 .ans-attach-ct 推入一个 jQuery 对象，
            //       若一个容器内有多个 iframe（如两个视频），第二个会被跳过
            $('.wrap .ans-cc .ans-attach-ct').each(function() {
                var iframes = $(this).find('iframe');
                if (iframes.length === 0) {
                    _domList.push($());
                } else {
                    iframes.each(function() {
                        _domList.push($(this));
                    });
                }
            })
            if (_domList.length !== _mlist.length) {
                logger(_logP.TASK + '[警告] 任务列表与DOM数量不一致（任务' + _mlist.length + '/DOM' + _domList.length + '），部分任务可能无法处理。', 'warn')
            }
            // 接收父页面发送的跳过任务指令
            window.addEventListener('message', function(event) {
                if (!event.data || event.data.type !== 'NE21_SKIP_TASK') return
                if (typeof _mlist === 'undefined' || _mlist.length === 0) return
                var taskName = (_mlist[0] && _mlist[0].property && (_mlist[0].property.name || _mlist[0].property.title)) || '未知任务'
                logger(_logP.TASK + '[跳过] 用户手动跳过：' + taskName + '。', 'skip')
                var taskType = _mlist[0].type || (_mlist[0].property && _mlist[0].property.module)
                if (taskType === 'document' || taskType === 'read') {
                    try {
                        var domEl = _domList && _domList[0]
                        if (domEl && domEl.length > 0 && domEl[0].parentElement) {
                            domEl[0].parentElement.classList.add('ans-job-finished')
                        }
                    } catch (_) { /* ignore */ }
                }
                switchMission()
            })
            missonStart()
        });
    }
} else if (_l.pathname.includes('/exam/test/reVersionTestStartNew')) {
    showBox()
    waitForJQueryElement('.mark_table .whiteDiv').then(function () { missonExam() });
} else if (_l.pathname.includes('/mooc2/exam/preview')) {
    showBox()
    waitForJQueryElement('.mark_table .questionLi').then(function () { missonExamPreview() });
} else if (_l.pathname.includes('/mooc2/work/dowork')) {
    showBox()
    waitForJQueryElement('.mark_table form').then(function () { missonHomeWork() });
} else if (_l.pathname.includes('/work/phone/doHomeWork')) {
    var _oldal = _w.alert
    _w.alert = function (msg) {
        if (msg == '保存成功') {
            return;
        }
        return _oldal(msg)
    }
    var _oldcf = _w.confirm
    _w.confirm = function (msg) {
        if (msg.includes('确认提交') || msg.includes('未做完')) {
            return true
        }
        return _oldcf(msg)
    }
} else if (_l.pathname.includes('/mooc2/exam/exam-list')) {
    // Swal.fire('ChatGPT学习通助手提示', '注意：请谨慎使用脚本考试，开始考试之前请确保该账号已激活脚本。', 'info')
} else if (_l.hostname == 'groupweb.chaoxing.com' && _l.pathname.includes('/bbs/')) {
    // 讨论区页面：自动回复（弹窗中运行，通过 GM_getValue 读取父窗口保存的上下文）
    try {
        console.log('[DeepSeek助手] 检测到讨论区页面，hostname=' + _l.hostname + ', pathname=' + _l.pathname);
        showBox();
        // 讨论区弹窗中隐藏除日志外的所有 UI 元素
        $('#ne-21notice').hide();
        $('#ne-21box .ne21-header').hide();
        logger(_logP.BBS + '[信息] 检测到讨论区页面，准备自动回复。', 'info');
        // 用 Promise.race 给 waitForJQueryElement 加 30 秒超时，避免页面结构不同时永久卡住
        Promise.race([
            waitForJQueryElement('.topicDetail_detail'),
            new Promise(function (resolve) { setTimeout(resolve, 30000); })
        ]).then(function () {
            logger(_logP.BBS + '[信息] 页面内容已加载，开始自动回复。', 'info');
            missonBbsPage();
        });
    } catch (e) {
        console.error('[DeepSeek助手] 讨论区页面初始化出错:', e);
    }
} else if (_l.pathname == '/mycourse/stu') {
    checkBrowser()
} else {
    // console.log(_l.pathname)
}

function checkBrowser() {
    var userAgent = navigator.userAgent
    if (userAgent.indexOf('Chrome') == -1 || GM_info.scriptHandler != 'ScriptCat') {
        // 非推荐环境，但不弹出警告
        // Swal.fire('您使用的不是推荐运行环境(edge、谷歌浏览器+ScriptCat)，脚本运行可能会发生问题.')
    }
}

function parseUrlParams() {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    let _p = {}
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        _p[pair[0]] = pair[1]
    }
    return _p
}


function updateLocalStorage(event) {
    var checkbox = event.target;
    localStorage.setItem(checkbox.id, checkbox.checked);
}

// 判断是否开启重做模式（不跳过已答题）
function isRedoMode() {
    var stored = localStorage.getItem('GPTJsSetting.redo');
    if (stored !== null) return stored === 'true';
    return !!setting.redo;
}

// 判断是否开启相似度匹配
function isFuzzyMatchEnabled() {
    var stored = localStorage.getItem('GPTJsSetting.fuzzyMatch');
    if (stored !== null) return stored === 'true';
    return !!setting.fuzzyMatch;
}

// 判断是否只处理任务点
function isTaskMode() {
    var stored = localStorage.getItem('GPTJsSetting.task');
    if (stored !== null) return stored === 'true';
    return !!setting.task;
}

// 计算两个字符串的相似度（基于Levenshtein距离），返回 0~1 之间的值，1表示完全相同
function stringSimilarity(s1, s2) {
    if (!s1 && !s2) return 1;
    if (!s1 || !s2) return 0;
    // 统一小写、去除首尾空白
    s1 = s1.toLowerCase().trim();
    s2 = s2.toLowerCase().trim();
    if (s1 === s2) return 1;
    var len1 = s1.length, len2 = s2.length;
    if (len1 === 0 || len2 === 0) return 0;
    // Levenshtein距离 - 空间优化版
    var prev = [], curr = [];
    for (var j = 0; j <= len2; j++) prev[j] = j;
    for (var i = 1; i <= len1; i++) {
        curr[0] = i;
        for (var j = 1; j <= len2; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                curr[j] = prev[j - 1];
            } else {
                curr[j] = 1 + Math.min(prev[j], curr[j - 1], prev[j - 1]);
            }
        }
        var tmp = prev; prev = curr; curr = tmp;
    }
    var maxLen = Math.max(len1, len2);
    return 1 - prev[len2] / maxLen;
}

// 在选项数组中查找与AI回答最相似的选项，返回索引；相似度低于阈值时返回-1
// threshold 默认 0.5（50%相似度）
function findBestFuzzyMatch(optionTexts, aiAnswer, threshold) {
    if (!isFuzzyMatchEnabled()) return -1;
    if (!aiAnswer || !optionTexts || optionTexts.length === 0) return -1;
    threshold = (threshold !== undefined) ? threshold : 0.5;
    var bestIndex = -1, bestScore = 0;
    for (var i = 0; i < optionTexts.length; i++) {
        var score = stringSimilarity(optionTexts[i], aiAnswer);
        if (score > bestScore) {
            bestScore = score;
            bestIndex = i;
        }
    }
    if (bestScore >= threshold) {
        logger(_logP.QUIZ + '[信息] 相似度匹配：最佳匹配项[' + bestIndex + '] 相似度=' + (bestScore * 100).toFixed(1) + '%。', 'info');
        return bestIndex;
    }
    if (!/^[A-H]$/i.test(aiAnswer.trim())) {
        logger(_logP.QUIZ + '[警告] 相似度匹配：所有选项相似度均低于阈值（' + (threshold * 100) + '%），最高=' + (bestScore * 100).toFixed(1) + '%。', 'warn');
    }
    return -1;
}

// 单选/判断题答案匹配：精确 → 模糊 → 字母回退
function matchAnswerToOptions(optionTexts, aiAnswer) {
    if (!aiAnswer) return -1;
    // 1. 精确匹配
    let idx = optionTexts.findIndex(function (item) { return item == aiAnswer })
    if (idx !== -1) return idx
    // 2. 模糊匹配
    idx = findBestFuzzyMatch(optionTexts, aiAnswer)
    if (idx !== -1) return idx
    // 3. 字母回退（图片选项场景：AI返回 "A"/"B"/"C"/"D"，选项文本为空）
    let trimmed = aiAnswer.trim().toUpperCase()
    if (/^[A-H]$/.test(trimmed)) {
        let letterIdx = trimmed.charCodeAt(0) - 65
        if (letterIdx >= 0 && letterIdx < optionTexts.length) {
            _lastMatchInfo = '字母匹配: ' + trimmed + ' → 选项[' + letterIdx + ']'
            return letterIdx
        }
    }
    // 4. 从AI回复中提取首字母（处理 "[C为图片]"、"答案是B"、"选A" 等格式）
    let letterMatch = aiAnswer.match(/[A-Ha-h]/);
    if (letterMatch) {
        let letter = letterMatch[0].toUpperCase();
        let letterIdx = letter.charCodeAt(0) - 65;
        if (letterIdx >= 0 && letterIdx < optionTexts.length) {
            _lastMatchInfo = '字母提取: "' + aiAnswer + '" → ' + letter + ' → 选项[' + letterIdx + ']';
            return letterIdx;
        }
    }
    return -1
}

// 多选题答案匹配：按'|'分割后逐一匹配（精确 → 模糊 → 字母回退）
function matchAnswerToOptionsMultiple(optionTexts, aiAnswer) {
    if (!aiAnswer) return [];
    // 先尝试整体精确/模糊匹配
    let fuzzyResult = findFuzzyMatchMultiple(optionTexts, aiAnswer)
    if (fuzzyResult.length > 0) return fuzzyResult
    // 字母回退：按'|'或空格分割字母
    var parts = aiAnswer.replace(/[,，、]/g, '|').split('|')
    var matched = []
    for (var p = 0; p < parts.length; p++) {
        var part = parts[p].trim().toUpperCase()
        if (!part) continue
        if (/^[A-H]$/.test(part)) {
            var letterIdx = part.charCodeAt(0) - 65
            if (letterIdx >= 0 && letterIdx < optionTexts.length && matched.indexOf(letterIdx) === -1) {
                matched.push(letterIdx)
            }
        } else {
            // 从片段中提取首字母（处理 "[A为图片]" 等格式）
            var letterMatch = parts[p].match(/[A-Ha-h]/);
            if (letterMatch) {
                var letter = letterMatch[0].toUpperCase();
                var letterIdx = letter.charCodeAt(0) - 65;
                if (letterIdx >= 0 && letterIdx < optionTexts.length && matched.indexOf(letterIdx) === -1) {
                    matched.push(letterIdx);
                }
            }
        }
    }
    if (matched.length > 0) {
        _lastMatchInfo = '字母匹配(多选): ' + matched.map(function (i) { return String.fromCharCode(65 + i) }).join(',')
    }
    return matched
}

// 多选题模糊匹配：AI返回的答案用'|'分割后，对每个答案片段在选项中找最佳匹配
// 返回匹配到的选项索引数组
function findFuzzyMatchMultiple(optionTexts, aiAnswer, threshold) {
    if (!isFuzzyMatchEnabled()) return [];
    if (!aiAnswer || !optionTexts || optionTexts.length === 0) return [];
    threshold = (threshold !== undefined) ? threshold : 0.5;
    var parts = aiAnswer.split('|');
    var matched = [];
    for (var p = 0; p < parts.length; p++) {
        var part = parts[p].trim();
        if (!part) continue;
        var bestIndex = -1, bestScore = 0;
        for (var i = 0; i < optionTexts.length; i++) {
            var score = stringSimilarity(optionTexts[i], part);
            if (score > bestScore) {
                bestScore = score;
                bestIndex = i;
            }
        }
        if (bestScore >= threshold && matched.indexOf(bestIndex) === -1) {
            matched.push(bestIndex);
            logger(_logP.QUIZ + '[信息] 相似度匹配（多选）："' + part + '" → 选项[' + bestIndex + '] 相似度=' + (bestScore * 100).toFixed(1) + '%。', 'info');
        }
    }
    return matched;
}

// 读取播放倍速：优先 localStorage（UI 设置），否则回退 setting.rate；范围 (0, 16]
function getRate() {
    var stored = localStorage.getItem('GPTJsSetting.rate');
    var n = stored !== null ? parseFloat(stored) : (setting.rate || 1);
    if (!isFinite(n) || n <= 0) n = 1;
    if (n > 16) n = 16;
    return n;
}

// 统一判断题答案解析：将AI回答归一为 'true' / 'false' / null
// 解决旧版 string.indexOf 子串匹配导致 "正确的"、"True"、"对的" 等变体匹配失败的问题
function parseJudgeAnswer(agrs) {
    if (!agrs) return null;
    var s = agrs.replace(/[。，.,!！\s]/g, '').toLowerCase();
    var trueWords = ['正确', '是', '对', '√', 't', 'true', 'ri', 'right', 'yes'];
    var falseWords = ['错误', '否', '错', '×', 'f', 'false', 'wr', 'wrong', 'no'];
    // 精确匹配
    for (var i = 0; i < trueWords.length; i++) {
        if (s === trueWords[i]) return 'true';
    }
    for (var i = 0; i < falseWords.length; i++) {
        if (s === falseWords[i]) return 'false';
    }
    // 包含匹配（优先判断"错"避免"正确的"误判——先检查否定词）
    for (var i = 0; i < falseWords.length; i++) {
        if (s.indexOf(falseWords[i]) !== -1) return 'false';
    }
    for (var i = 0; i < trueWords.length; i++) {
        if (s.indexOf(trueWords[i]) !== -1) return 'true';
    }
    return null;
}

// 在选项列表中查找"正确/对"或"错误/错"对应的索引
function findJudgeOptionIndex(optionTexts, isTrue) {
    var trueWords = ['正确', '是', '对', '√', 'T', 'ri'];
    var falseWords = ['错误', '否', '错', '×', 'F', 'wr'];
    var words = isTrue ? trueWords : falseWords;
    for (var i = 0; i < optionTexts.length; i++) {
        var t = optionTexts[i];
        for (var j = 0; j < words.length; j++) {
            if (t.indexOf(words[j]) !== -1) return i;
        }
    }
    return -1;
}

// 查找文本作答类题目（简答/写作/翻译/名词解释/论述题/计算题/材料题等）的 textarea。
// 按特异性优先级尝试多个选择器，最后兜底为任意 textarea。
function findAnswerTextareas($container) {
    if (!$container || $container.length === 0) return $();
    // 1) 标准 UEditor 下层 textarea，name="answerEditor{questionId}{i}"
    var $eles = $container.find('textarea[name^="answerEditor"]');
    if ($eles.length > 0) return $eles;
    // 2) 旧版/兼容路径
    $eles = $container.find('.subEditor textarea, .Answer .divText textarea, .stem_answer textarea, .edui-editor textarea');
    if ($eles.length > 0) return $eles;
    // 3) 兜底：容器内任意 textarea
    return $container.find('textarea');
}

function showBox() {
    //公告&充值
    if (setting.showBox && top.document.querySelector('#ne-21notice') == undefined) {
        // 注入样式（仅一次）
        if (!top.document.getElementById('ne-21style')) {
            var styleEl = top.document.createElement('style');
            styleEl.id = 'ne-21style';
            styleEl.textContent = `
            /* ================================================================
               Liquid Glass UI v3.0 — iOS 26+ 液态毛玻璃
               质感 · 光影 · 微动效 · 专业级细节
               ================================================================ */

            /* —— 主浮窗：液态玻璃基底 —— */
            #ne-21box{position:fixed;top:5%;right:16%;width:340px;z-index:99999;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;font-size:13px;color:rgba(15,23,42,.86);background:linear-gradient(180deg,rgba(255,255,255,.62) 0%,rgba(241,245,249,.55) 100%);backdrop-filter:blur(22px) saturate(180%) brightness(1.04);-webkit-backdrop-filter:blur(22px) saturate(180%) brightness(1.04);border:1px solid rgba(255,255,255,.65);border-radius:22px;box-shadow:0 0 0 1px rgba(15,23,42,.09),0 24px 48px -12px rgba(15,23,42,.45),0 10px 26px -8px rgba(15,23,42,.3),inset 0 1px 0 rgba(255,255,255,.9),inset 0 -1px 0 rgba(15,23,42,.06);overflow:hidden;transition:opacity .25s ease,transform .25s ease;animation:ne21-in .45s cubic-bezier(.2,.9,.3,1) both;will-change:transform;user-select:none;}

            /* 浮窗边缘光晕 — 玻璃折射模拟 */
            #ne-21box::before{content:'';position:absolute;inset:-2px;border-radius:23px;padding:2px;background:linear-gradient(135deg,rgba(255,255,255,.5) 0%,rgba(255,255,255,.15) 30%,rgba(255,255,255,0) 50%,rgba(255,255,255,.1) 70%,rgba(255,255,255,.4) 100%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;z-index:-1;pointer-events:none;}

            /* —— 入场动画 —— */
            @keyframes ne21-in{from{opacity:0;transform:translateY(-12px) scale(.96)}60%{transform:translateY(2px) scale(1.01)}to{opacity:1;transform:none}}
            @keyframes ne21-soft-land{0%{transform:translateY(-12px) scale(.96);opacity:0}50%{transform:translateY(2px) scale(1.01)}100%{transform:translateY(0) scale(1);opacity:1}}
            @keyframes ne21-fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}

            /* —— 标题栏 —— */
            #ne-21box .ne21-header{position:relative;display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:linear-gradient(180deg,rgba(255,255,255,.78) 0%,rgba(248,250,252,.45) 60%,rgba(241,245,249,.3) 100%);color:rgba(15,23,42,.92);border-bottom:1px solid rgba(15,23,42,.07);box-shadow:inset 0 1px 0 rgba(255,255,255,.95);cursor:move;user-select:none;}
            #ne-21box .ne21-header::after{content:'';position:absolute;left:14px;right:14px;bottom:-1px;height:1px;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.4) 15%,rgba(255,255,255,.9) 50%,rgba(255,255,255,.4) 85%,transparent 100%);pointer-events:none;}

            /* —— Body（含滚动） —— */
            #ne-21box .ne21-body{position:relative;padding:14px 16px 16px;max-height:70vh;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(15,23,42,.15) transparent;opacity:1;transition:max-height .4s cubic-bezier(.4,0,.2,1),opacity .3s ease,padding .3s ease;will-change:max-height;}
            /* SVG噪点纹理 — 增强玻璃质感 */
            #ne-21box .ne21-body::before{content:'';position:absolute;inset:0;opacity:.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");background-size:128px 128px;pointer-events:none;z-index:0;}

            /* 最小化：缩为圆形按钮 */
            #ne-21box.ne21-minimized{width:36px!important;height:36px;border-radius:50%;cursor:grab;transition:width .4s cubic-bezier(.4,0,.2,1),height .4s cubic-bezier(.4,0,.2,1),border-radius .4s cubic-bezier(.4,0,.2,1),box-shadow .35s ease;box-shadow:0 0 0 1px rgba(15,23,42,.06),0 8px 24px -8px rgba(15,23,42,.35),0 3px 10px -4px rgba(15,23,42,.22),inset 0 1px 0 rgba(255,255,255,.9);}
            #ne-21box.ne21-minimized:active{cursor:grabbing;}
            #ne-21box.ne21-minimized::before{display:none;}
            #ne-21box.ne21-minimized .ne21-header{position:absolute;inset:0;padding:0;justify-content:center;align-items:center;background:transparent;box-shadow:none;border-bottom:none;cursor:grab;}
            #ne-21box.ne21-minimized .ne21-header::after{display:none;}
            #ne-21box.ne21-minimized .ne21-title{display:none;}
            #ne-21box.ne21-minimized #ne-21close{display:flex;position:static;margin:0;width:36px;height:36px;font-size:16px;font-weight:600;border-radius:50%;border:none;background:transparent;box-shadow:none;color:rgba(15,23,42,.55);cursor:grab;pointer-events:none;}
            #ne-21box.ne21-minimized #ne-21close:hover{background:transparent;transform:none;box-shadow:none;}
            #ne-21box.ne21-minimized .ne21-body{display:none;}
            #ne-21box.ne21-minimized:hover{transform:scale(1.08);box-shadow:0 0 0 1px rgba(15,23,42,.09),0 12px 28px -8px rgba(15,23,42,.45),0 5px 14px -4px rgba(15,23,42,.25),inset 0 1px 0 rgba(255,255,255,1);}
            #ne-21box.ne21-minimized:active{transform:scale(.95);}

            /* —— 标题文字 + 状态指示灯 —— */
            #ne-21box .ne21-title{display:flex;align-items:center;gap:9px;font-weight:600;font-size:14px;letter-spacing:.3px;margin:0;color:inherit;}
            #ne-21box .ne21-dot{width:9px;height:9px;border-radius:50%;background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.98),rgba(255,255,255,.5) 55%,rgba(15,23,42,.18) 100%);box-shadow:0 0 0 0 rgba(255,255,255,.7),inset 0 1px 1px rgba(255,255,255,.95);animation:ne21-pulse 2.5s infinite;flex-shrink:0;transition:background .4s ease;}
            /* 脉冲光晕扩散 */
            @keyframes ne21-pulse{0%{box-shadow:0 0 0 0 rgba(255,255,255,.7),inset 0 1px 1px rgba(255,255,255,.95)}50%{box-shadow:0 0 0 6px rgba(255,255,255,.3),0 0 0 12px rgba(255,255,255,.08),inset 0 1px 1px rgba(255,255,255,.95)}100%{box-shadow:0 0 0 12px rgba(255,255,255,0),0 0 0 24px rgba(255,255,255,0),inset 0 1px 1px rgba(255,255,255,.95)}}

            /* —— 关闭/折叠按钮 —— */
            #ne-21box #ne-21close{margin:0;width:24px;height:24px;padding:0;display:inline-flex;align-items:center;justify-content:center;font-size:18px;font-weight:600;line-height:1;color:rgba(15,23,42,.7);cursor:pointer;border:1px solid rgba(255,255,255,.65);border-radius:50%;background:rgba(255,255,255,.55);box-shadow:0 0 0 1px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,.8),0 1px 2px rgba(15,23,42,.08);transition:all .2s cubic-bezier(.4,0,.2,1);user-select:none;font-family:inherit;}
            #ne-21box #ne-21close:hover{background:rgba(255,255,255,.82);color:rgba(15,23,42,.92);box-shadow:0 0 0 1px rgba(15,23,42,.1),inset 0 1px 0 rgba(255,255,255,.95),0 2px 6px rgba(15,23,42,.12);transform:scale(1.05);}
            #ne-21box #ne-21close:active{transform:scale(.9);}

            #ne-21box .ne21-body::-webkit-scrollbar{width:5px;}
            #ne-21box .ne21-body::-webkit-scrollbar-thumb{background:rgba(15,23,42,.2);border-radius:4px;transition:background .3s;}
            #ne-21box .ne21-body::-webkit-scrollbar-thumb:hover{background:rgba(15,23,42,.36);}

            /* —— 通知区 —— */
            #ne-21box #ne-21notice{border-top:none!important;margin:0 0 6px!important;overflow:visible;}

            /* —— API状态卡片 —— */
            #ne-21box .ne21-uid{display:flex;align-items:center;gap:6px;color:rgba(15,23,42,.62);font-size:12px;margin-bottom:10px;padding:8px 12px;background:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.7);border-radius:12px;box-shadow:0 0 0 1px rgba(15,23,42,.05),inset 0 1px 0 rgba(255,255,255,.75),inset 0 0 20px rgba(255,255,255,.3),0 1px 2px rgba(15,23,42,.05);}
            #ne-21box .ne21-uid b{color:rgba(15,23,42,.92);font-weight:600;}

            /* —— 按钮行 —— */
            #ne-21box .ne21-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;}

            /* —— 按钮基底 —— */
            #ne-21box .ne21-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;padding:7px 14px;font-size:12px;font-weight:500;border-radius:14px;cursor:pointer;border:1px solid rgba(255,255,255,.7);transition:all .2s cubic-bezier(.4,0,.2,1);white-space:nowrap;overflow:hidden;}
            /* 涟漪伪元素 */
            #ne-21box .ne21-btn::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at center,rgba(255,255,255,.8) 0%,transparent 70%);opacity:0;transition:opacity .4s;pointer-events:none;}
            #ne-21box .ne21-btn:active::after{opacity:1;transition:opacity 0s;}
            #ne-21box .ne21-btn:active{transform:translateY(0) scale(.97);}

            /* 主按钮 — 色彩光泽hover */
            #ne-21box .ne21-btn-primary{color:rgba(15,23,42,.92);background:rgba(255,255,255,.72);box-shadow:0 0 0 1px rgba(15,23,42,.07),inset 0 1px 0 rgba(255,255,255,.95),inset 0 -6px 12px -6px rgba(15,23,42,.08),0 4px 10px -2px rgba(15,23,42,.22);}
            #ne-21box .ne21-btn-primary:hover{transform:translateY(-1px);background:linear-gradient(135deg,rgba(255,255,255,.9) 0%,rgba(240,245,255,.85) 50%,rgba(255,255,255,.9) 100%);box-shadow:0 0 0 1px rgba(59,130,246,.15),inset 0 1px 0 rgba(255,255,255,1),inset 0 -6px 12px -6px rgba(15,23,42,.1),0 8px 20px -4px rgba(59,130,246,.2),0 0 0 4px rgba(59,130,246,.06);}

            /* 次要按钮 */
            #ne-21box .ne21-btn-secondary{color:rgba(15,23,42,.78);background:rgba(255,255,255,.45);box-shadow:0 0 0 1px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,.75),0 1px 2px rgba(15,23,42,.06);}
            #ne-21box .ne21-btn-secondary:hover{background:rgba(255,255,255,.65);color:rgba(15,23,42,.92);box-shadow:0 0 0 1px rgba(15,23,42,.08),inset 0 1px 0 rgba(255,255,255,.85),0 4px 10px rgba(15,23,42,.1);transform:translateY(-1px);}

            /* 跳过任务按钮 — 红色光泽hover */
            #ne-21box #skipTaskBtn:hover{background:linear-gradient(135deg,rgba(255,255,255,.9) 0%,rgba(255,240,240,.85) 50%,rgba(255,255,255,.9) 100%)!important;box-shadow:0 0 0 1px rgba(220,38,38,.15),inset 0 1px 0 rgba(255,255,255,1),0 8px 20px -4px rgba(220,38,38,.15)!important;transform:translateY(-1px);}

            /* —— 输入框 / 下拉框 —— */
            #ne-21box #modelSelect{flex:1;min-width:0;padding:7px 10px;font-size:12px;border-radius:14px;border:1px solid rgba(255,255,255,.7);background:rgba(255,255,255,.55);color:rgba(15,23,42,.86);cursor:pointer;outline:none;box-shadow:0 0 0 1px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,.8);transition:all .25s cubic-bezier(.4,0,.2,1);}
            #ne-21box #modelSelect:hover{background:rgba(255,255,255,.7);}
            #ne-21box #modelSelect:focus{background:rgba(255,255,255,.8);box-shadow:0 0 0 1px rgba(59,130,246,.2),0 0 0 4px rgba(59,130,246,.08),inset 0 1px 0 rgba(255,255,255,.9);}

            #ne-21box .ne21-select{padding:5px 8px;font-size:12px;border-radius:10px;border:1px solid rgba(255,255,255,.65);background:rgba(255,255,255,.5);color:rgba(15,23,42,.86);cursor:pointer;outline:none;min-width:80px;flex-shrink:0;box-shadow:0 0 0 1px rgba(15,23,42,.05),inset 0 1px 0 rgba(255,255,255,.75);transition:all .25s cubic-bezier(.4,0,.2,1);}
            #ne-21box .ne21-select:hover{background:rgba(255,255,255,.7);}
            #ne-21box .ne21-select:focus{background:rgba(255,255,255,.8);box-shadow:0 0 0 1px rgba(59,130,246,.2),0 0 0 4px rgba(59,130,246,.08),inset 0 1px 0 rgba(255,255,255,.9);}
            #ne-21box input[type=text]:focus,#ne-21box input[type=number]:focus{box-shadow:0 0 0 1px rgba(59,130,246,.2),0 0 0 4px rgba(59,130,246,.08),inset 0 1px 0 rgba(255,255,255,.9)!important;background:rgba(255,255,255,.8)!important;}

            /* —— 用户信息区 —— */
            #ne-21box #userInfo{margin:10px 0 0;padding:10px 12px;background:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.7);border-radius:12px;box-shadow:0 0 0 1px rgba(15,23,42,.05),inset 0 1px 0 rgba(255,255,255,.75),inset 0 0 20px rgba(255,255,255,.3);font-size:12px;color:rgba(15,23,42,.66);line-height:1.6;overflow:hidden;display:none;}
            #ne-21box #userInfo:not(:empty){display:block;}
            #ne-21box #userInfo b{color:rgba(15,23,42,.9);font-weight:600;}

            /* —— 设置面板 —— */
            #ne-21box #moreSettings{padding:4px 14px;background:rgba(255,255,255,.42);border:1px solid rgba(255,255,255,.65);border-radius:14px;box-shadow:0 0 0 1px rgba(15,23,42,.05),inset 0 1px 0 rgba(255,255,255,.7),inset 0 0 20px rgba(255,255,255,.3);margin:10px 0 0;max-height:0;opacity:0;padding-top:0;padding-bottom:0;margin-top:0;overflow:hidden;transition:max-height .5s cubic-bezier(.4,0,.2,1),opacity .35s ease,margin .4s ease,padding .4s ease;scrollbar-width:thin;scrollbar-color:rgba(15,23,42,.2) transparent;}
            #ne-21box #moreSettings.ne21-show{max-height:50vh;opacity:1;padding:4px 14px;margin-top:10px;overflow-y:auto;}
            #ne-21box #moreSettings::-webkit-scrollbar{width:5px;}
            #ne-21box #moreSettings::-webkit-scrollbar-thumb{background:rgba(15,23,42,.2);border-radius:4px;transition:background .3s;}
            #ne-21box #moreSettings::-webkit-scrollbar-thumb:hover{background:rgba(15,23,42,.36);}

            /* 设置项逐条入场 */
            #ne-21box #moreSettings.ne21-show label{animation:ne21-fadeUp .4s ease both;}
            #ne-21box #moreSettings.ne21-show label:nth-child(1){animation-delay:.03s}
            #ne-21box #moreSettings.ne21-show label:nth-child(2){animation-delay:.07s}
            #ne-21box #moreSettings.ne21-show label:nth-child(3){animation-delay:.11s}
            #ne-21box #moreSettings.ne21-show label:nth-child(4){animation-delay:.15s}
            #ne-21box #moreSettings.ne21-show label:nth-child(5){animation-delay:.19s}
            #ne-21box #moreSettings.ne21-show label:nth-child(6){animation-delay:.23s}
            #ne-21box #moreSettings.ne21-show label:nth-child(7){animation-delay:.27s}
            #ne-21box #moreSettings.ne21-show label:nth-child(8){animation-delay:.31s}
            #ne-21box #moreSettings label{display:flex;flex-direction:row-reverse;align-items:center;justify-content:space-between;margin:0;padding:8px 2px;font-size:12px;color:rgba(15,23,42,.78);cursor:pointer;user-select:none;line-height:1.4;}
            #ne-21box #moreSettings label + label{border-top:1px dashed rgba(15,23,42,.08);}

            /* —— iOS 风格 Toggle Switch —— */
            #ne-21box #moreSettings input[type=checkbox]{appearance:none;-webkit-appearance:none;width:34px;height:20px;border:1px solid rgba(15,23,42,.08);border-radius:20px;cursor:pointer;position:relative;transition:all .3s cubic-bezier(.2,.9,.3,1);background:rgba(15,23,42,.16);box-shadow:inset 0 1px 2px rgba(15,23,42,.12);margin:0 0 0 10px;flex-shrink:0;}
            #ne-21box #moreSettings input[type=checkbox]::before{content:'';position:absolute;top:1px;left:1px;width:16px;height:16px;border-radius:50%;background:linear-gradient(180deg,rgba(255,255,255,1),rgba(255,255,255,.85));box-shadow:0 1px 3px rgba(15,23,42,.25),inset 0 1px 0 rgba(255,255,255,1);transition:transform .3s cubic-bezier(.2,.9,.3,1);}
            #ne-21box #moreSettings input[type=checkbox]:hover{background:rgba(15,23,42,.24);}
            #ne-21box #moreSettings input[type=checkbox]:checked{background:linear-gradient(135deg,#22c55e,#16a34a);border-color:rgba(34,197,94,.35);box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 0 10px rgba(34,197,94,.25);}
            #ne-21box #moreSettings input[type=checkbox]:checked:hover{background:linear-gradient(135deg,#22c55e,#15803d);box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 0 14px rgba(34,197,94,.35);}
            #ne-21box #moreSettings input[type=checkbox]:checked::before{transform:translateX(14px);box-shadow:0 2px 6px rgba(0,0,0,.15),0 0 4px rgba(34,197,94,.3),inset 0 1px 0 rgba(255,255,255,1);}
            #ne-21box #moreSettings p{display:none;}

            /* —— 设置分组 —— */
            #ne-21box #moreSettings .ne21-group{padding:6px 0 2px;}
            #ne-21box #moreSettings .ne21-group + .ne21-group{border-top:1.5px solid rgba(15,23,42,.12);margin-top:4px;padding-top:8px;}
            #ne-21box #moreSettings .ne21-group-title{font-size:11px;font-weight:600;color:rgba(15,23,42,.42);letter-spacing:.6px;text-transform:uppercase;padding:0 2px 6px;user-select:none;}

            #ne-21box #ne-21thinking{display:none!important;}

            /* —— 加载动画 —— */
            @keyframes ne21-spin{to{transform:rotate(360deg)}}
            @keyframes ne21-dot{0%,80%,100%{transform:scale(.5);opacity:.4}40%{transform:scale(1);opacity:1}}
            #ne-21box #ne-21log .ne21-log-spinner{display:inline-block;width:9px;height:9px;margin-right:5px;border:1.5px solid rgba(15,23,42,.18);border-top-color:rgba(15,23,42,.7);border-radius:50%;vertical-align:-1px;animation:ne21-spin .8s linear infinite;}
            #ne-21box #ne-21log .ne21-log-dots{display:inline-flex;gap:2px;margin-left:3px;vertical-align:1px;}
            #ne-21box #ne-21log .ne21-log-dots i{width:3px;height:3px;border-radius:50%;background:currentColor;opacity:.65;animation:ne21-dot 1.2s infinite ease-in-out both;}
            #ne-21box #ne-21log .ne21-log-dots i:nth-child(2){animation-delay:.16s;}
            #ne-21box #ne-21log .ne21-log-dots i:nth-child(3){animation-delay:.32s;}

            /* —— 日志面板 —— */
            #ne-21box #ne-21log{position:relative;max-height:140px;overflow-y:auto;margin:12px 0 0;padding:10px 12px;background:rgba(15,23,42,.08);border:1px solid rgba(255,255,255,.55);border-radius:14px;box-shadow:0 0 0 1px rgba(15,23,42,.06),inset 0 1px 0 rgba(255,255,255,.6),inset 0 0 20px rgba(15,23,42,.08);font-family:"SF Mono","Cascadia Code",Consolas,Menlo,monospace;font-size:11.5px;line-height:1.65;color:rgba(15,23,42,.88);transition:max-height .45s cubic-bezier(.4,0,.2,1),opacity .35s ease,margin .35s ease,padding .35s ease;user-select:text;}
            #ne-21box #ne-21log.ne21-hidden{max-height:0;opacity:0;margin-top:0;padding-top:0;padding-bottom:0;overflow:hidden;}
            #ne-21box #ne-21log:empty{display:none;}
            #ne-21box #ne-21log::-webkit-scrollbar{width:5px;}
            #ne-21box #ne-21log::-webkit-scrollbar-thumb{background:rgba(15,23,42,.2);border-radius:4px;transition:background .3s;}
            #ne-21box #ne-21log::-webkit-scrollbar-thumb:hover{background:rgba(15,23,42,.36);}

            /* 日志条目 + 入场动画 + 左侧色彩条 */
            #ne-21box #ne-21log p{margin:0;padding:3px 0 3px 10px;word-break:break-all;border-left:3px solid transparent;animation:ne21-log-in .3s ease both;font-size:11.5px;}
            @keyframes ne21-log-in{from{opacity:0;transform:translateX(-4px)}to{opacity:1;transform:translateX(0)}}

            /* 日志折叠详情 */
            #ne-21box #ne-21log .ne21-collapse{margin:4px 0;border:1px solid rgba(15,23,42,.1);border-radius:8px;overflow:hidden;}
            #ne-21box #ne-21log .ne21-collapse summary{padding:4px 8px;cursor:pointer;font-weight:600;background:rgba(15,23,42,.04);list-style:none;display:flex;align-items:center;gap:6px;font-size:11px;transition:background .2s;}
            #ne-21box #ne-21log .ne21-collapse summary:hover{background:rgba(15,23,42,.07);}
            #ne-21box #ne-21log .ne21-collapse summary::-webkit-details-marker{display:none;}
            #ne-21box #ne-21log .ne21-collapse summary::before{content:'▶';font-size:8px;transition:transform .2s;}
            #ne-21box #ne-21log .ne21-collapse[open] summary::before{transform:rotate(90deg);}
            #ne-21box #ne-21log .ne21-collapse .ne21-detail{padding:6px 10px;font-size:11px;border-top:1px solid rgba(15,23,42,.06);}
            #ne-21box #ne-21log .ne21-collapse .ne21-detail img{max-width:100%;border-radius:6px;margin:4px 0;}
            #ne-21box #ne-21log hr{display:none;}
            #ne-21box #ne-21log .ne21-time{color:rgba(15,23,42,.45);margin-right:6px;}

            /* —— 关于弹窗 —— */
            .ne21-credits-popup{backdrop-filter:blur(22px) saturate(180%);-webkit-backdrop-filter:blur(22px) saturate(180%);border:1px solid rgba(255,255,255,.65)!important;border-radius:22px!important;box-shadow:0 24px 48px -12px rgba(15,23,42,.35)!important;}
            #ne-21-about-overlay{position:fixed;inset:0;z-index:100000;background:rgba(15,23,42,.35);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;animation:ne21-fadeIn .3s ease both;}
            @keyframes ne21-fadeIn{from{opacity:0}to{opacity:1}}
            #ne-21-about-popup{width:400px;padding:20px;background:linear-gradient(180deg,rgba(255,255,255,.88) 0%,rgba(241,245,249,.82) 100%);backdrop-filter:blur(22px) saturate(180%);-webkit-backdrop-filter:blur(22px) saturate(180%);border:1px solid rgba(255,255,255,.65);border-radius:22px;box-shadow:0 0 0 1px rgba(15,23,42,.08),0 24px 48px -12px rgba(15,23,42,.4),inset 0 1px 0 rgba(255,255,255,.9);font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;font-size:12px;color:rgba(15,23,42,.86);animation:ne21-soft-land .4s cubic-bezier(.2,.9,.3,1) both;}
            /* 关于弹窗 — 信息卡片 */
            #ne-21-about-popup .ne21-about-card{background:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.7);border-radius:14px;padding:12px;margin-bottom:10px;box-shadow:0 0 0 1px rgba(15,23,42,.04),inset 0 1px 0 rgba(255,255,255,.8),inset 0 0 20px rgba(255,255,255,.3);}
            /* 关于弹窗 — 关闭按钮 */
            #ne-21-about-close{transition:all .2s;}
            #ne-21-about-close:hover{background:rgba(255,255,255,.78)!important;color:rgba(15,23,42,.8)!important;}
            `;
            top.document.head.appendChild(styleEl);
        }
        var box_html = `
            <div id="ne-21box">
                <div class="ne21-header" title="拖动移动 | 点击 − 最小化">
                    <h3 class="ne21-title"><span class="ne21-dot"></span>AI 学习通助手 <small style="font-size:10px;font-weight:400;opacity:0.6">v2.0</small></h3>
                    <button id="ne-21close" type="button" aria-label="最小化">−</button>
                </div>
                <div class="ne21-body">
                    <div id="ne-21notice"></div>
                    <div id="moreSettings">
                        <div class="ne21-group">
                            <div class="ne21-group-title">🤖 DeepSeek（纯文本题）</div>
                            <label title="DeepSeek API 密钥，从 platform.deepseek.com 获取">
                                <input type="text" id="GPTJsSetting.deepseekApiKey" class="ne21-select" placeholder="sk-..." style="min-width:120px;flex:1;padding:5px 8px;font-family:monospace;">API 密钥
                            </label>
                            <label title="DeepSeek API 地址，默认 https://api.deepseek.com">
                                <input type="text" id="GPTJsSetting.deepseekBaseUrl" class="ne21-select" placeholder="https://api.deepseek.com" style="min-width:120px;flex:1;padding:5px 8px;">API 地址
                            </label>
                            <label title="选择 DeepSeek 模型">
                                <select id="GPTJsSetting.deepseekModel" class="ne21-select">
                                    <option value="deepseek-v4-pro">deepseek-v4-pro (强力)</option>
                                    <option value="deepseek-v4-flash">deepseek-v4-flash (快速)</option>
                                </select>AI 模型
                            </label>
                        </div>
                        <div class="ne21-group">
                            <div class="ne21-group-title">👁️ Kimi（图片题自动使用）</div>
                            <label title="Kimi API 密钥，从 platform.moonshot.cn 获取">
                                <input type="text" id="GPTJsSetting.kimiApiKey" class="ne21-select" placeholder="sk-..." style="min-width:120px;flex:1;padding:5px 8px;font-family:monospace;">API 密钥
                            </label>
                            <label title="Kimi API 地址">
                                <input type="text" id="GPTJsSetting.kimiBaseUrl" class="ne21-select" placeholder="https://api.moonshot.cn/v1" style="min-width:120px;flex:1;padding:5px 8px;">API 地址
                            </label>
                        </div>
                        <div class="ne21-group">
                            <div class="ne21-group-title">🎬 视频 / 音频</div>
                            <label><select id="GPTJsSetting.rate" class="ne21-select"><option value="1">1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select>播放倍速</label>
                        </div>
                        <div class="ne21-group">
                            <div class="ne21-group-title">📝 答题行为</div>
                            <label title="两次 AI 搜题请求之间的最小间隔（秒）。0 为不节流；高并发可设 1~3">
                                <input type="number" id="GPTJsSetting.reqIntervalTime" class="ne21-select" min="0" max="60" step="1" style="min-width:56px;width:56px;padding:5px 8px;">搜题间隔 (秒)
                            </label>
                            <label><input type="checkbox" id="GPTJsSetting.goodStudent">好学生模式（仅加粗答案，不自动选择）</label>
                            <label><input type="checkbox" id="GPTJsSetting.alterTitle" checked>答案插入题目后</label>
                            <label><input type="checkbox" id="GPTJsSetting.fuzzyMatch" checked>相似度匹配（模糊匹配答案）</label>
                        </div>
                        <div class="ne21-group">
                            <div class="ne21-group-title">📋 测验 / 考试</div>
                            <label><input type="checkbox" id="GPTJsSetting.sub">测验自动提交</label>
                            <label><input type="checkbox" id="GPTJsSetting.force">测验强制提交（无论作答与否）</label>
                            <label><input type="checkbox" id="GPTJsSetting.examTurn">考试自动跳转下一题</label>
                        </div>
                        <div class="ne21-group">
                            <div class="ne21-group-title">⚙️ 模式开关</div>
                            <label><input type="checkbox" id="GPTJsSetting.redo">重做模式（不跳过已答题）</label>
                            <label><input type="checkbox" id="GPTJsSetting.task" checked>仅处理任务点（跳过非任务点）</label>
                        </div>
                    </div>
                    <div id="ne-21thinking">
                        <div class="ne21-thinking-spinner"></div>
                        <span class="ne21-thinking-text">AI 思考中<span class="ne21-thinking-dots"><i></i><i></i><i></i></span></span>
                    </div>
                    <div id="ne-21log"></div>
                </div>
            </div>
        `;
        $(box_html).appendTo('body');

        // 恢复保存的位置与收起/展开状态
        (function () {
            var $box = $('#ne-21box');
            // 恢复位置
            try {
                var savedPos = localStorage.getItem('GPTJsSetting.boxPosition');
                if (savedPos) {
                    var pos = JSON.parse(savedPos);
                    if (pos && typeof pos.left === 'number' && typeof pos.top === 'number') {
                        var vw = window.innerWidth, vh = window.innerHeight;
                        var w = $box.outerWidth() || 340;
                        // 约束：避免恢复后跑到视窗外不可见
                        var nx = Math.max(40 - w, Math.min(pos.left, vw - 40));
                        var ny = Math.max(0, Math.min(pos.top, vh - 40));
                        $box.css({ left: nx + 'px', top: ny + 'px', right: 'auto' });
                    }
                }
            } catch (_) { /* empty */ }
            // 恢复最小化状态
            if (localStorage.getItem('GPTJsSetting.boxCollapsed') === 'true') {
                $box.addClass('ne21-minimized');
                $('#ne-21close').text('+').attr('aria-label', '展开');
            }
        })();

        // 最小化按钮：切换 .ne21-minimized → 缩为浮动球 / 展开
        $('#ne-21close').on('mousedown', function (e) {
            e.stopPropagation(); // 避免触发标题栏拖动
        }).on('click', function (e) {
            e.stopPropagation();
            var $box = $('#ne-21box');
            var minimized = $box.toggleClass('ne21-minimized').hasClass('ne21-minimized');
            $(this).text(minimized ? '+' : '−');
            $(this).attr('aria-label', minimized ? '展开' : '最小化');
            // 持久化最小化状态
            try { localStorage.setItem('GPTJsSetting.boxCollapsed', minimized ? 'true' : 'false'); } catch (_) { /* empty */ }
        });
        // 标题栏拖动 + 浮动球拖动：拖动结束后写入 localStorage，刷新后保持上次位置
        (function () {
            var $box = $('#ne-21box');
            var $header = $box.find('.ne21-header');
            var dragging = false, wasDragged = false, startX = 0, startY = 0, startLeft = 0, startTop = 0;
            $header.on('mousedown', function (e) {
                if (e.which !== 1) return; // 仅响应鼠标左键
                if ($(e.target).closest('#ne-21close').length) return; // 点在按钮上不拖动
                dragging = true;
                wasDragged = false;
                var rect = $box[0].getBoundingClientRect();
                startX = e.clientX;
                startY = e.clientY;
                startLeft = rect.left;
                startTop = rect.top;
                // 清空 right，把 left/top 改为像素值，避免与默认 left:66% 计算冲突
                $box.css({ left: startLeft + 'px', top: startTop + 'px', right: 'auto' });
                $('body').css('user-select', 'none');
                e.preventDefault();
            });
            $(document).on('mousemove.ne21drag', function (e) {
                if (!dragging) return;
                wasDragged = true; // 标记发生了实际拖动
                var nx = startLeft + (e.clientX - startX);
                var ny = startTop + (e.clientY - startY);
                var w = $box.outerWidth();
                var vw = window.innerWidth;
                var vh = window.innerHeight;
                // 约束：保留至少 40px 标题栏在视窗内，便于回拉
                nx = Math.max(40 - w, Math.min(nx, vw - 40));
                ny = Math.max(0, Math.min(ny, vh - 40));
                $box.css({ left: nx + 'px', top: ny + 'px' });
            }).on('mouseup.ne21drag', function () {
                if (!dragging) return;
                dragging = false;
                $('body').css('user-select', '');
                // 持久化位置
                try {
                    var rect = $box[0].getBoundingClientRect();
                    localStorage.setItem('GPTJsSetting.boxPosition', JSON.stringify({ left: rect.left, top: rect.top }));
                } catch (_) { /* empty */ }
            });
            // 浮动球点击展开：仅当最小化且未拖拽时
            $box.on('click', function (e) {
                if ($box.hasClass('ne21-minimized') && !wasDragged && !$(e.target).closest('#ne-21close').length) {
                    $box.removeClass('ne21-minimized');
                    $('#ne-21close').text('−').attr('aria-label', '最小化');
                    try { localStorage.setItem('GPTJsSetting.boxCollapsed', 'false'); } catch (_) { /* empty */ }
                }
            });
        })();

        // 设置面板切换 + 复选框监听器
        (function () {
            var moreSettings = top.document.getElementById('moreSettings');
            var userInfo = top.document.getElementById('userInfo');
            if (!moreSettings) return;

            // #moreSettingsBtn 由 $('#ne-21notice').html(...) 在后面动态注入，
            // 此时还不存在，且每次 showBox() 都会被重建，因此使用事件委托。
            var isSettingsVisible = false;
            $('#ne-21box').on('click', '#moreSettingsBtn', function () {
                if (userInfo) userInfo.style.display = isSettingsVisible ? 'block' : 'none';
                moreSettings.classList.toggle('ne21-show', !isSettingsVisible);
                this.textContent = isSettingsVisible ? '设置' : '返回';
                isSettingsVisible = !isSettingsVisible;
            });
            // 日志按钮：切换日志区域显示/隐藏
            var isLogVisible = true;
            $('#ne-21box').on('click', '#toggleLogBtn', function () {
                var logEl = top.document.getElementById('ne-21log');
                if (logEl) {
                    isLogVisible = !isLogVisible;
                    logEl.classList.toggle('ne21-hidden', !isLogVisible);
                    this.textContent = isLogVisible ? '隐藏日志' : '显示日志';
                }
            });
            // 跳过任务按钮：通过 postMessage 通知 iframe 跳过当前任务点
            $('#ne-21box').on('click', '#skipTaskBtn', function () {
                var iframe = document.getElementById('iframe')
                if (!iframe || !iframe.contentWindow) {
                    logger(_logP.SYS + '[错误] 未找到任务iframe，无法跳过。', 'error')
                    return
                }
                logger(_logP.SYS + '[跳过] 已发送跳过指令到任务页面。', 'skip')
                iframe.contentWindow.postMessage({ type: 'NE21_SKIP_TASK' }, '*')
            });

            // 修改题目默认开启（仅初始化一次，避免 forEach 内重复执行）
            if (localStorage.getItem('GPTJsSetting.alterTitle') === null) {
                localStorage.setItem('GPTJsSetting.alterTitle', 'true');
            }
            // 相似度匹配默认开启
            if (localStorage.getItem('GPTJsSetting.fuzzyMatch') === null) {
                localStorage.setItem('GPTJsSetting.fuzzyMatch', 'true');
            }
            // 仅处理任务点默认开启
            if (localStorage.getItem('GPTJsSetting.task') === null) {
                localStorage.setItem('GPTJsSetting.task', 'true');
            }
            // 测验自动提交默认开启
            if (localStorage.getItem('GPTJsSetting.sub') === null) {
                localStorage.setItem('GPTJsSetting.sub', 'true');
            }

            ['sub', 'force', 'examTurn', 'goodStudent', 'alterTitle', 'redo', 'fuzzyMatch', 'task'].forEach(function (settingId) {
                var checkbox = top.document.getElementById('GPTJsSetting.' + settingId);
                if (!checkbox) return;
                checkbox.addEventListener('change', updateLocalStorage);
                checkbox.checked = localStorage.getItem('GPTJsSetting.' + settingId) === 'true';
            });

            // DeepSeek API 密钥输入框：恢复上次值并持久化（使用 GM_setValue 跨域共享）
            var apiKeyInput = top.document.getElementById('GPTJsSetting.deepseekApiKey');
            if (apiKeyInput) {
                apiKeyInput.value = getDeepSeekApiKey();
                apiKeyInput.addEventListener('change', function () {
                    saveDeepSeekConfig('deepseekApiKey', apiKeyInput.value.trim());
                    var statusEl = top.document.querySelector('.ne21-uid b:first-child');
                    if (statusEl) statusEl.textContent = apiKeyInput.value.trim() ? '✅ 已配置' : '❌ 未配置';
                    updateStatusDot();
                });
            }
            // DeepSeek API 地址输入框：恢复上次值并持久化
            var baseUrlInput = top.document.getElementById('GPTJsSetting.deepseekBaseUrl');
            if (baseUrlInput) {
                baseUrlInput.value = getDeepSeekBaseUrl();
                baseUrlInput.addEventListener('change', function () {
                    saveDeepSeekConfig('deepseekBaseUrl', baseUrlInput.value.trim() || 'https://api.deepseek.com');
                });
            }
            // DeepSeek 模型选择：恢复上次选择并持久化
            var modelSelect = top.document.getElementById('GPTJsSetting.deepseekModel');
            if (modelSelect) {
                modelSelect.value = getDeepSeekModel();
                modelSelect.addEventListener('change', function () {
                    saveDeepSeekConfig('deepseekModel', modelSelect.value);
                });
            }
            // Kimi API 密钥输入框：恢复上次值并持久化
            var kimiApiKeyInput = top.document.getElementById('GPTJsSetting.kimiApiKey');
            if (kimiApiKeyInput) {
                kimiApiKeyInput.value = getKimiApiKey();
                kimiApiKeyInput.addEventListener('change', function () {
                    saveDeepSeekConfig('kimiApiKey', kimiApiKeyInput.value.trim());
                    var statusEl = top.document.querySelector('.ne21-uid b:last-child');
                    if (statusEl) statusEl.textContent = kimiApiKeyInput.value.trim() ? '✅ 已配置' : '❌ 未配置';
                    updateStatusDot();
                });
            }
            // Kimi API 地址输入框：恢复上次值并持久化
            var kimiBaseUrlInput = top.document.getElementById('GPTJsSetting.kimiBaseUrl');
            if (kimiBaseUrlInput) {
                kimiBaseUrlInput.value = getKimiBaseUrl();
                kimiBaseUrlInput.addEventListener('change', function () {
                    saveDeepSeekConfig('kimiBaseUrl', kimiBaseUrlInput.value.trim() || 'https://api.moonshot.cn/v1');
                });
            }
            // 倍速下拉：恢复上次选择并持久化
            var rateSelect = top.document.getElementById('GPTJsSetting.rate');
            if (rateSelect) {
                rateSelect.value = localStorage.getItem('GPTJsSetting.rate') || '1';
                rateSelect.addEventListener('change', function () {
                    localStorage.setItem('GPTJsSetting.rate', rateSelect.value);
                });
            }
            // 搜题间隔输入框：恢复上次值并持久化（范围 0~60 秒）
            var reqIntervalInput = top.document.getElementById('GPTJsSetting.reqIntervalTime');
            if (reqIntervalInput) {
                var savedInterval = localStorage.getItem('GPTJsSetting.reqIntervalTime');
                reqIntervalInput.value = (savedInterval !== null && isFinite(parseInt(savedInterval, 10)))
                    ? savedInterval
                    : String(setting.reqIntervalTime || 0);
                reqIntervalInput.addEventListener('change', function () {
                    var v = parseInt(reqIntervalInput.value, 10);
                    if (!isFinite(v) || v < 0) v = 0;
                    if (v > 60) v = 60;
                    reqIntervalInput.value = String(v);
                    localStorage.setItem('GPTJsSetting.reqIntervalTime', String(v));
                });
            }
        })();
    } else {
        $('#ne-21log', window.parent.document).html('')
    }
    let _apiKeyStatus = getDeepSeekApiKey() ? '✅ 已配置' : '❌ 未配置'
    let _kimiStatus = getKimiApiKey() ? '✅ 已配置' : '❌ 未配置'
    // 更新状态指示灯颜色
    updateStatusDot();
    $('#ne-21notice').html(`
        <div id="ne-21-noticeContent">
            <div class="ne21-uid">DeepSeek: <b>${_apiKeyStatus}</b> | Kimi(图片): <b>${_kimiStatus}</b></div>
        </div>
        <div class="ne21-row">
            <button id="moreSettingsBtn" class="ne21-btn ne21-btn-secondary">设置</button>
            <button id="toggleLogBtn" class="ne21-btn ne21-btn-secondary">日志</button>
            <button id="skipTaskBtn" class="ne21-btn ne21-btn-secondary" style="color:#dc2626;" title="跳过当前正在处理的任务点">跳过任务</button>
            <button id="aboutBtn" class="ne21-btn ne21-btn-secondary">关于</button>
        </div>
    `);

    // 公告弹窗：每个版本首次显示
    (function () {
        var _ver = GM_info && GM_info.script ? GM_info.script.version : '2.1.0';
        var _key = 'GPTJsSetting.announcementSeen_' + _ver;
        if (!localStorage.getItem(_key)) {
            localStorage.setItem(_key, 'true');
            _showCredits();
        }
        // 设置面板的"关于"按钮
        $('#ne-21box').on('click', '#aboutBtn', function () { _showCredits(); });
    })();

    function _showCredits() {
        // 移除已有的弹窗（防止重复）
        var old = top.document.getElementById('ne-21-about-overlay');
        if (old) old.remove();
        var overlay = top.document.createElement('div');
        overlay.id = 'ne-21-about-overlay';
        overlay.innerHTML =
            '<div id="ne-21-about-popup">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">' +
            '<b style="font-size:15px;letter-spacing:.3px">✨ AI 学习通助手</b>' +
            '<span id="ne-21-about-close" style="cursor:pointer;font-size:18px;color:rgba(15,23,42,.5);width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;border:1px solid rgba(255,255,255,.6);background:rgba(255,255,255,.5);">×</span>' +
            '</div>' +
            '<div class="ne21-about-card" style="font-size:12px;line-height:1.8">' +
            '<div style="display:flex;justify-content:space-between"><span style="opacity:.5">📌 版本</span><b>v2.1.0</b></div>' +
            '<div style="display:flex;justify-content:space-between"><span style="opacity:.5">👤 原作者</span><span>Ne-21</span></div>' +
            '<div style="display:flex;justify-content:space-between"><span style="opacity:.5">🛠️ 开发者</span><b>Khihl & Claude</b></div>' +
            '<div style="display:flex;justify-content:space-between"><span style="opacity:.5">🧠 AI 模型</span><span>DeepSeek + Kimi</span></div>' +
            '<div style="display:flex;justify-content:space-between"><span style="opacity:.5">📊 代码规模</span><span>~5500 行</span></div>' +
            '</div>' +
            '<div style="border-left:3px solid #22c55e;padding-left:12px;margin:12px 0;font-size:12px;line-height:1.8;background:rgba(34,197,94,.04);border-radius:0 8px 8px 0;padding-right:8px;padding-top:6px;padding-bottom:6px">' +
            '<b style="color:#16a34a">🌟 核心功能</b><br>' +
            '🧠 双模型智能分流：纯文本 DeepSeek，图片题 Kimi 多模态<br>' +
            '📄 文档/PPT 模拟翻阅：逐屏滚动 + 自动提交 + DOM 实时刷新<br>' +
            '🎯 三级答案匹配：精确 → Levenshtein 模糊 → 字母回退<br>' +
            '📚 全任务类型支持：视频/音频/测验/文档/阅读/直播/速课/讨论<br>' +
            '🛡️ 智能防卡死：人脸识别检测、任务完成轮询、超时保护<br>' +
            '📝 日志系统：统一格式 [模块] [状态]，7级颜色语义<br>' +
            '💎 Liquid Glass UI：毛玻璃浮窗，可拖拽，位置/状态持久化' +
            '</div>' +
            '<div style="border-left:3px solid #eab308;padding-left:12px;margin:12px 0;font-size:12px;line-height:1.8;background:rgba(234,179,8,.04);border-radius:0 8px 8px 0;padding-right:8px;padding-top:6px;padding-bottom:6px">' +
            '<b style="color:#ca8a04">⭐ 独家功能</b><br>' +
            '💬 讨论区 AI 自动回复 — 全网学习通脚本中首个实现<br>' +
            '⏭️ 任务点跳过按钮 — 卡死时可手动跳过当前任务<br>' +
            '📖 文档/PPT 自动翻页 — 模拟真实阅读直到页底' +
            '</div>' +
            '<p style="margin:12px 0 0;opacity:.4;font-size:10px;text-align:center">AI 辅助编码 · 人类主导设计 — Khihl & Claude</p>' +
            '</div>';
        top.document.body.appendChild(overlay);
        // 点击遮罩或关闭按钮收起
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay || e.target.id === 'ne-21-about-close') overlay.remove();
        });
        // Esc 键收起
        var escHandler = function (e) {
            if (e.key === 'Escape') { overlay.remove(); top.document.removeEventListener('keydown', escHandler); }
        };
        top.document.addEventListener('keydown', escHandler);
    }

    // ===== 状态指示灯：根据 API 配置状态动态变色 =====
    function updateStatusDot() {
        var dot = top.document.querySelector('.ne21-dot');
        if (!dot) return;
        var hasDS = getDeepSeekApiKey();
        var hasKimi = getKimiApiKey();
        if (hasDS && hasKimi) {
            dot.style.background = 'radial-gradient(circle at 32% 28%, rgba(255,255,255,.98), #22c55e 55%, rgba(34,197,94,.35) 100%)';
        } else if (hasDS || hasKimi) {
            dot.style.background = 'radial-gradient(circle at 32% 28%, rgba(255,255,255,.98), #eab308 55%, rgba(234,179,8,.35) 100%)';
        } else {
            dot.style.background = 'radial-gradient(circle at 32% 28%, rgba(255,255,255,.98), rgba(255,255,255,.5) 55%, rgba(15,23,42,.18) 100%)';
        }
    }
}

var _ne21LogColorMap = {
    error:   '#dc2626', red:    '#dc2626',
    success: '#059669', green:  '#059669',
    skip:    '#ea580c', orange: '#ea580c',
    warn:    '#ca8a04', yellow: '#ca8a04',
    info:    '#2563eb', blue:   '#2563eb',
    hili:    '#7c3aed', purple: '#7c3aed',
    muted:   '#64748b', gray:   '#64748b', grey: '#64748b'
}
var _logP = {
    VID: '[视频] ', AUD: '[音频] ', QUIZ: '[测验] ', DOC: '[文档] ',
    READ: '[阅读] ', BOOK: '[读书] ', LIVE: '[直播] ', MICRO: '[速课] ',
    BBS: '[讨论] ', EXAM: '[考试] ', HW: '[作业] ', AI: '[AI] ',
    NAV: '[导航] ', SYS: '[系统] ', TASK: '[任务] '
}
function logger(str, color) {
    var _time = new Date().toLocaleTimeString()
    var _colorMap = (typeof _ne21LogColorMap !== 'undefined') ? _ne21LogColorMap : {};
    var c = _colorMap[color] || color || '#334155'
    var $p = $('<p><span class="ne21-time">[' + _time + ']</span><span class="ne21-msg" style="color:' + c + ';">' + str + '</span></p>')
    $p.css('border-left-color', c)  // 左侧色彩标识
    var $log = $('#ne-21log', window.parent.document);
    $log.append($p)
    // 自动滚动到底部
    var logEl = $log[0];
    if (logEl) { setTimeout(function() { logEl.scrollTop = logEl.scrollHeight; }, 50); }
    return $p
}
// 原地更新一条已存在的日志(由 logger 返回的 jQuery <p> 元素)。
// 用于把 "AI 思考中..." 占位行原地替换为答案/错误提示, 避免反复出现/消失。
function updateLogEntry($p, str, color) {
    if (!$p || !$p.length) return
    var _colorMap2 = (typeof _ne21LogColorMap !== 'undefined') ? _ne21LogColorMap : {};
    var c = _colorMap2[color] || color || '#334155'
    $p.find('.ne21-msg').css('color', c).html(str)
    $p.css('border-left-color', c)  // 同步更新左侧色彩条
}

function getStr(str, start, end) {
    let res = str.match(new RegExp(`${start}(.*?)${end}`))
    return res ? res[1] : null
}

function getTaskParams() {
    try {
        var _iframeScripts = _d.scripts,
            _p = null;
        for (let i = 0; i < _iframeScripts.length; i++) {
            if (_iframeScripts[i].innerHTML.indexOf('mArg = "";') != -1 && _iframeScripts[i].innerHTML.indexOf('==UserScript==') == -1) {
                _p = getStr(_iframeScripts[i].innerHTML.replace(/\s/g, ""), 'try{mArg=', ';}catch');
                return _p
            }
        }
        return _p
    } catch (e) {
        return null
    }

}

function getCk(name) {
    return document.cookie.match(`[;\\s+]?${name}=([^;]*)`)?.pop();
}


function autoLogin() {
    logger(_logP.SYS + '[信息] 自动登录已配置。', 'info')
    if (setting.phone.length <= 0 || setting.password.length <= 0) {
        logger(_logP.SYS + '[警告] 未设置登录信息，跳过自动登录。', 'warn')
        return
    }
    setTimeout(() => {
        $('#phone').val(setting.phone)
        $('#pwd').val(setting.password)
        $('#loginBtn').click()
    }, 3000)
}

// 检测当前页面是否还有未完成的任务点（DOM 层面未标记 ans-job-finished）
function hasUnfinishedTaskPoints() {
    try {
        var containers = document.querySelectorAll('.wrap .ans-cc .ans-attach-ct');
        if (!containers || containers.length === 0) return false;
        // 只检测视频和测验类任务点（PPT/文档类不参与检测，避免页面切换时无限循环）
        var taskTypes = ['video', 'workid', 'live', 'insertaudio'];
        var rawParams = getTaskParams();
        if (!rawParams || rawParams === '$mArg') return false;
        var params = $.parseJSON(rawParams);
        if (!params || !params['attachments']) return false;
        var attachments = params['attachments'];
        var cIdx = 0;
        for (var i = 0; i < attachments.length; i++) {
            var type = attachments[i]['type'];
            if (type === undefined && attachments[i]['property']) {
                type = attachments[i]['property']['module'];
            }
            // 只检查需要处理的任务类型
            if (taskTypes.indexOf(type) === -1) continue;
            if (cIdx < containers.length) {
                var container = containers[cIdx];
                var iframes = container.querySelectorAll('iframe');
                cIdx += Math.max(iframes.length, 1);
                // 任务模式下，没有 jobid 的任务会被各 misson 函数跳过，不应计入未完成
                if (isTaskMode() && attachments[i]['jobid'] == undefined) continue;
                // 讨论区任务不参与未完成检测（服务端不会实时刷新 ans-job-finished）
                if (type === 'insertbbs') continue;
                // DOM 层面未标记完成 → 视为未完成
                if (!container.classList.contains('ans-job-finished')) {
                    return true;
                }
            }
        }
    } catch (e) { /* ignore */ }
    return false;
}

// 检测当前是否为闯关模式（课程列表中任意章节的 status 包含"闯关"）
function isChallengeMode() {
    try {
        var items = top.document.querySelectorAll('#coursetree li, .posCatalog_level li');
        for (var i = 0; i < items.length; i++) {
            var tip = items[i].querySelector('.prevHoverTips');
            if (tip && tip.textContent.indexOf('闯关') !== -1) return true;
        }
    } catch (e) { /* ignore */ }
    return false;
}

function toNext() {
    refreshCourseList().then((res) => {
        // 检测当前课时是否还有未完成的页面（兼容多种 DOM 结构）
        // 返回 { activeIndex, total, hasNext, tabs } 或 null
        function detectSubTabPosition() {
            try {
                // 兼容现代版（.prev_ul）、旧版（#prev_tab）、备用版（#prevTabBox）
                var selectors = ['#prev_tab > li', '.prev_ul > li', '#prevTabBox > li'];
                for (var i = 0; i < selectors.length; i++) {
                    var nodes = top.document.querySelectorAll(selectors[i]);
                    if (!nodes || nodes.length === 0) continue;
                    var tabs = Array.prototype.slice.call(nodes);
                    var activeIdx = -1;
                    for (var j = 0; j < tabs.length; j++) {
                        if (tabs[j].classList && tabs[j].classList.contains('active')) {
                            activeIdx = j;
                            break;
                        }
                    }
                    if (activeIdx === -1) continue;
                    return {
                        activeIndex: activeIdx,
                        total: tabs.length,
                        hasNext: activeIdx < tabs.length - 1,
                        tabs: tabs
                    };
                }
                // 兼容风格：span.currents ~ span（当前页指示器后还有兄弟节点表示存在下一页）
                var currents = top.document.querySelector('span.currents');
                if (currents) {
                    var nextSibs = [];
                    var sib = currents.nextElementSibling;
                    while (sib) {
                        if (sib.tagName === 'SPAN') nextSibs.push(sib);
                        sib = sib.nextElementSibling;
                    }
                    if (nextSibs.length > 0) {
                        return { activeIndex: 0, total: nextSibs.length + 1, hasNext: true, tabs: null };
                    }
                }
            } catch (e) { /* ignore */ }
            return null;
        }

        // 点击章节内 “下一页” 按钮（仅在当前课时尚有页面时使用，避免误跳到下一章节）
        function clickNextPageBtn() {
            $('#ne-21log', window.parent.document).html('')
            var nextBtn = top.document.querySelector('#mainid > .prev_next.next')
            if (nextBtn) { nextBtn.click(); return true }
            return false
        }

        // 点击 “下一章节” 按钮：优先尝试章节内的“下一页/下一节”统一按钮，
        // 找不到时再退回 #prevNextFocusNext（仅用于章节级跳转）
        function clickNextChapterBtn() {
            $('#ne-21log', window.parent.document).html('')
            var nextBtn = top.document.querySelector('#mainid > .prev_next.next')
            if (nextBtn) { nextBtn.click(); return true }
            var focusBtn = top.document.querySelector('#prevNextFocusNext')
            if (focusBtn) { focusBtn.click(); return true }
            return false
        }

        // 优先级 0.5：检测本页是否还有未完成的任务点，尝试重新处理
        if (hasUnfinishedTaskPoints()) {
            _toNextRetryCount++;
            var _maxRetry = isChallengeMode() ? 10 : 5;
            if (_toNextRetryCount <= _maxRetry) {
                logger(_logP.NAV + '[警告] 检测到未完成任务点，第' + _toNextRetryCount + '/' + _maxRetry + '次重新处理。', 'warn')
                try {
                    _domList = []
                    _mlist = $.parseJSON(getTaskParams())['attachments']
                    $('.wrap .ans-cc .ans-attach-ct').each(function() {
                        var iframes = $(this).find('iframe');
                        if (iframes.length === 0) {
                            _domList.push($());
                        } else {
                            iframes.each(function() {
                                _domList.push($(this));
                            });
                        }
                    })
                } catch (e) {
                    logger(_logP.NAV + '[错误] 任务列表重新解析失败：' + e.message + '。', 'error')
                    _toNextRetryCount = 0
                }
                if (_mlist && _mlist.length > 0) {
                    setTimeout(missonStart, 3000)
                    return
                }
            } else {
                logger(_logP.NAV + '[跳过] 已达最大重试次数（' + _maxRetry + '），跳过剩余未完成任务。', 'skip')
                _toNextRetryCount = 0
            }
        } else {
            _toNextRetryCount = 0
        }

        // 优先级 1：当前课时若仍有未完成的页面，先切换到下一页，避免漏刷
        var sub = detectSubTabPosition()
        if (sub && sub.hasNext) {
            logger(_logP.NAV + '[信息] 当前课时存在未完成页（' + (sub.activeIndex + 1) + '/' + sub.total + '），切换到下一页。', 'info')
            setTimeout(() => {
                if (!clickNextPageBtn()) {
                    logger(_logP.NAV + '[警告] 未找到下一页按钮，回退到下一章节。', 'warn')
                    clickNextChapterBtn()
                }
            }, 5000)
            return
        }

        if (setting.review || !setting.work) {
            logger(_logP.NAV + '[信息] 本课时已完成，切换到下一章节。', 'info')
            setTimeout(() => { clickNextChapterBtn() }, 5000)
            return
        }
        let _t = []
        $.each($(res).find('li'), (_, t) => {
            let curid = $(t).find('.posCatalog_select').attr('id'),
                status = $(t).find('.prevHoverTips').text(),
                name = $(t).find('.posCatalog_name').attr('title');
            if (curid.indexOf('cur') != -1) {
                _t.push({ 'curid': curid, 'status': status, 'name': name })
            }
        })

        let _curChaterId = $('#coursetree', window.parent.document).find('.posCatalog_active').attr('id')
        let _curIndex = _t.findIndex((item) => item['curid'] == _curChaterId)
        for (_curIndex; _curIndex < _t.length - 1; _curIndex++) {
            // 当前章节仍标记为待完成，但章节内已无更多页面（hasNext=false 已在前面判定过）
            // 此分支保留作为兜底：万一 detectSubTabPosition 漏检，仍尝试调用一次
            if (_t[_curIndex]['status'].indexOf('待完成') != -1) {
                var subAgain = detectSubTabPosition()
                if (subAgain && subAgain.hasNext) {
                    logger(_logP.NAV + '[信息] 兜底检测：仍有未完成页（' + (subAgain.activeIndex + 1) + '/' + subAgain.total + '），切换到下一页。', 'info')
                    setTimeout(() => {
                        if (!clickNextPageBtn()) clickNextChapterBtn()
                    }, 5000)
                    return
                }
            }
            let t = _t[_curIndex + 1]
            if (t['status'].indexOf('待完成') != -1) {
                setTimeout(() => {
                    clickNextChapterBtn()
                    showBox()
                }, 5000)
                return
            } else if (t['status'].indexOf('闯关') != -1) {
                logger(_logP.NAV + '[错误] 闯关模式，脚本已暂停，请手动完成并点击下一章节。', 'error')
                return
            } else if (t['status'].indexOf('开放') != -1) {
                logger(_logP.NAV + '[跳过] 章节未开放。', 'skip')
                return
            } else {
                //  console.log(t)
            }
        }
        logger(_logP.NAV + '[完成] 此课程全部处理完毕。', 'success')
        return
    })
}

function missonStart() {
    // 新页面或 _mlist 为空时重置重试计数器
    var _curUrl = location.href;
    if (_curUrl !== _lastPageUrl || _mlist.length <= 0) {
        _toNextRetryCount = 0;
        _lastPageUrl = _curUrl;
    }
    showBox()
    if (_mlist.length <= 0) {
        logger(_logP.NAV + '[完成] 此页面任务全部完成。', 'success')
        return toNext()
    }
    let _type = _mlist[0]['type'],
        _dom = _domList[0],
        _task = _mlist[0];
    if (_dom === undefined) {
        logger(_logP.TASK + '[跳过] 任务"' + (_task.property && _task.property.name || '未知') + '" 没有对应的DOM元素。', 'skip')
        return switchMission()
    }
    if (_type == undefined) {
        _type = _mlist[0]['property']["module"]
    }
    var _taskName = _task.property && (_task.property.name || _task.property.title) || '未知'
    switch (_type) {
        case "video":
            if (_mlist[0]['property']['module'] == 'insertvideo') {
                logger(_logP.VID + '[启动] 开始处理：' + _taskName + '。', 'hili')
                missonVideo(_dom, _task)
                break
            } else if (_mlist[0]['property']['module'] == 'insertaudio') {
                logger(_logP.AUD + '[启动] 开始处理：' + _taskName + '。', 'hili')
                missonVideo(_dom, _task)
                break
            } else {
                logger(_logP.VID + '[错误] 未知视频子类型，已跳过。', 'error')
                switchMission()
                break
            }
        case "workid":
            logger(_logP.QUIZ + '[启动] 开始处理：' + _taskName + '。', 'hili')
            missonWork(_dom, _task)
            break
        case "document":
            logger(_logP.DOC + '[启动] 开始处理：' + _taskName + '。', 'hili')
            missonDoucument(_dom, _task)
            break
        case "read":
            logger(_logP.READ + '[启动] 开始处理：' + _taskName + '。', 'hili')
            missonRead(_dom, _task)
            break
        case "insertbook":
            logger(_logP.BOOK + '[启动] 开始处理：' + _taskName + '。', 'hili')
            missonBook(_dom, _task)
            break
        case "live":
            logger(_logP.LIVE + '[启动] 开始处理：' + _taskName + '。', 'hili')
            missonLive(_dom, _task)
            break
        case "microCourse":
        case "insertmicroCourse":
            logger(_logP.MICRO + '[启动] 开始处理：' + _taskName + '。', 'hili')
            missonMicroCourse(_dom, _task)
            break
        case "insertbbs":
            logger(_logP.BBS + '[启动] 开始处理：' + _taskName + '。', 'hili')
            missonBbs(_dom, _task)
            break
        default: {
            let GarbageTasks = ['insertimage', 'insertanswerquestion', 'insertshare', 'insertquestion', 'insertdiscuss', 'insertsubject']
            if (GarbageTasks.indexOf(_type) != -1) {
                logger(_logP.TASK + '[跳过] 非必要任务类型（' + _type + '）。', 'skip')
                switchMission()
            } else {
                logger(_logP.TASK + '[跳过] 不支持的任务类型：' + _type + '。', 'skip')
                switchMission()
            }
        }
    }
}

function missonVideo(dom, obj) {
    const { isPassed, otherInfo, property } = obj;
    const { _jobid: jobId, name, objectid: objectId, module } = property;

    // 同一函数处理视频与音频两种任务，按 module 区分日志/开关
    const isAudioTask = module === 'insertaudio';
    const taskLabel = isAudioTask ? '音频' : '视频';
    var _logLabel = isAudioTask ? _logP.AUD : _logP.VID;

    if (isAudioTask ? !setting.audio : !setting.video) {
        logger(_logLabel + '[跳过] 用户设置不处理' + taskLabel + '。', 'skip');
        return setTimeout(switchMission, 3000);
    }

    if (!setting.review && isPassed === true) {
        logger(_logLabel + '[跳过] ' + name + ' 检测已完成。', 'skip');
        return switchMission();
    }

    // DOM 层面检测：父元素含 ans-job-finished 类表示任务点已完成
    if (!setting.review && dom.length > 0 && dom[0].parentElement && dom[0].parentElement.classList.contains('ans-job-finished')) {
        logger(_logLabel + '[跳过] ' + name + ' 任务点已完成（DOM检测）。', 'skip');
        return switchMission();
    }

    // 兼容 jQuery 对象和原生 DOM：统一取原生 iframe 元素
    let target = null;
    if (dom.length > 0) {
        target = dom[0];
    } else if (dom instanceof Element) {
        target = dom;
    }

    if (!target) {
        logger(_logLabel + '[警告] 未找到' + taskLabel + ' iframe，3秒后重试。', 'warn');
        return setTimeout(() => missonVideo(dom, obj), 3000);
    }

    logger(_logLabel + '[信息] ' + name + '，正在解析。', 'info');

    let doc;
    try {
        doc = target.contentDocument || target.contentWindow.document;
    } catch (e) {
        logger(_logLabel + '[错误] ' + name + ' 无法访问iframe内容（跨域）。', 'error');
        return switchMission();
    }

    // 等待视频元素加载，500ms 轮询 + 3 分钟超时
    waitForMediaElement(doc, 500, 3 * 60 * 1000).then(function (media) {
        if (!media) {
            logger(_logLabel + '[错误] ' + name + ' 媒体元素未找到或加载超时。', 'error');
            return switchMission();
        }

        // 以实际 DOM 元素类型为准，不依赖任务标签
        var mediaType = media.tagName.toLowerCase() === 'audio' ? 'audio' : 'video';

        // 计算最终倍速：优先用户设置；若超星禁用了倍速菜单则强制 1×
        var userRate = getRate();
        var rateDisabled = mediaType === 'video' && isPlaybackRateDisabled(doc);
        var finalRate = rateDisabled ? 1 : userRate;
        if (rateDisabled && userRate > 1) {
            logger(_logLabel + '[警告] ' + name + ' 倍速菜单被禁用，已回退至1×。', 'warn');
        } else if (userRate > 1) {
            logger(_logLabel + '[信息] 已开启倍速：' + userRate + '×。', 'info');
        }

        logger(_logLabel + '[信息] ' + name + ' 播放成功，开始控制播放（' + finalRate + '×）。', 'info');

        // 静音播放，避免浏览器自动播放策略拦截
        media.muted = true;
        media.currentTime = 0;
        hookMediaRate(media, finalRate);

        // 弹题自动处理循环（借鉴 OCS）：独立检测播放中的弹题弹窗
        var quizLoopTimer = setInterval(function () {
            handleVideoQuiz(doc);
        }, 5000);

        // 防暂停恢复：检查人脸识别 → 检查视频是否已结束 → 恢复播放
        var resumeCount = 0;
        var resume = function () {
            if (media.ended) return;
            // 人脸识别弹窗出现时暂停等待，避免异常操作
            if (hasFaceRecognitionDialog()) {
                if (resumeCount === 0) {
                    logger(_logLabel + '[警告] ' + name + ' 检测到人脸识别弹窗，暂停等待用户识别。', 'warn');
                }
                resumeCount++;
                return;
            }
            resumeCount = 0;
            // 确保倍速未被播放器覆盖
            try { media.playbackRate = finalRate; } catch (_) {}
            media.play();
        };
        media.addEventListener('pause', resume);
        if (mediaType === 'video' && media.parentElement) {
            media.parentElement.addEventListener('mouseleave', resume);
        }

        // 视频错误监听：检测加载失败并自动跳过
        var errorCheckTimer = setInterval(function () {
            var errorDiv = doc.querySelector('.vjs-modal-dialog-content');
            if (errorDiv) {
                var errorText = errorDiv.innerText || '';
                var errorSignals = ['视频文件损坏', '网络错误导致视频下载中途失败', '视频因格式不支持', '网络的问题无法加载'];
                for (var i = 0; i < errorSignals.length; i++) {
                    if (errorText.indexOf(errorSignals[i]) !== -1) {
                        logger(_logLabel + '[错误] ' + name + ' 视频加载失败（' + errorSignals[i] + '）。', 'error');
                        clearInterval(errorCheckTimer);
                        clearInterval(quizLoopTimer);
                        media.removeEventListener('pause', resume);
                        return setTimeout(switchMission, 3000);
                    }
                }
            }
        }, 3000);

        // 临近结尾自动恢复 1×（仅当当前为倍速）—— 避免任务点判定失败
        var rateRestored = finalRate <= 1;
        if (!rateRestored) {
            var onTimeUpdate = function () {
                if (!rateRestored && isFinite(media.duration) && media.duration - media.currentTime < 10) {
                    rateRestored = true;
                    try { delete media.playbackRate; } catch (_) { /* empty */ }
                    hookMediaRate(media, 1);
                    media.removeEventListener('timeupdate', onTimeUpdate);
                }
            };
            media.addEventListener('timeupdate', onTimeUpdate);
        }

        // 播放完成 → 清理所有监听器和定时器 → 检测任务点状态
        media.addEventListener('ended', function () {
            logger(_logLabel + '[信息] ' + name + ' 已播放完成，等待状态更新。', 'info');
            media.removeEventListener('pause', resume);
            clearInterval(errorCheckTimer);
            clearInterval(quizLoopTimer);
            checkJobFinished(target, name, 0, 3);
        });

        // 启动播放
        media.play().then(function () {
            logger(_logLabel + '[信息] ' + name + ' 开始播放。', 'info');
        }).catch(function (err) {
            var msg = String(err);
            if (msg.indexOf("didn't interact with the document") !== -1 || msg.indexOf("user didn't interact") !== -1) {
                logger(_logLabel + '[警告] ' + name + ' 自动播放被浏览器拦截，请手动点击页面后脚本将继续。', 'warn');
                // 点击页面后 pause 事件会触发 resume，不需要额外处理
            } else {
                logger(_logLabel + '[错误] ' + name + ' 播放失败：' + msg + '。', 'error');
                clearInterval(errorCheckTimer);
                clearInterval(quizLoopTimer);
                switchMission();
            }
        });
    });
}

// 等待 iframe 内的 video/audio 元素加载完成
// 参考 OCS 的 waitForMedia：高频轮询 + 超时兜底
function waitForMediaElement(doc, interval, timeout) {
    return new Promise(function (resolve) {
        var timer = setInterval(function () {
            var el = doc.querySelector('video') || doc.querySelector('audio');
            if (el) {
                clearInterval(timer);
                clearTimeout(timeoutTimer);
                resolve(el);
            }
        }, interval);
        var timeoutTimer = setTimeout(function () {
            clearInterval(timer);
            resolve(null);
        }, timeout);
    });
}

// 检测超星播放中弹出的测验弹窗（弹题），随机选择并提交
// 参考 OCS 的 videoQuizStrategy: "random" 逻辑
function handleVideoQuiz(doc) {
    var submitBtn = doc.querySelector('#videoquiz-submit');
    if (!submitBtn) return;
    var options = doc.querySelectorAll('.ans-videoquiz-opt label');
    if (options.length === 0) return;
    // 随机选择一个选项
    var randomIndex = Math.floor(Math.random() * options.length);
    options[randomIndex].click();
    setTimeout(function () {
        submitBtn.click();
        // 提交后移除弹窗容器，恢复播放
        setTimeout(function () {
            var container = doc.querySelector('#video .ans-videoquiz');
            if (container) container.remove();
            var components = doc.querySelectorAll('.x-component-default');
            for (var i = 0; i < components.length; i++) {
                components[i].style.display = 'none';
            }
        }, 1500);
    }, 500);
}

// 检测人脸识别弹窗（新旧两种样式）
// 参考 OCS 的 hasFaceRecognition + hasNewFaceRecognition
function hasFaceRecognitionDialog() {
    try {
        // 旧版人脸识别
        var oldFaces = top.document.querySelectorAll('#fcqrimg');
        for (var i = 0; i < oldFaces.length; i++) {
            if (oldFaces[i].getAttribute('src')) return true;
        }
        // 新版人脸识别
        var newFaces = top.document.querySelectorAll('.chapterVideoFaceMaskDiv');
        for (var j = 0; j < newFaces.length; j++) {
            if (newFaces[j].style.display !== 'none') return true;
        }
    } catch (_) { /* 跨域时静默 */ }
    return false;
}

// 检测任务点完成状态，未完成则重试
function checkJobFinished(iframeDom, taskName, attempt, maxAttempts) {
    if (attempt >= maxAttempts) {
        logger(_logP.VID + '[错误] ' + taskName + ' 状态检测失败（已重试' + maxAttempts + '次）。', 'error');
        switchMission();
        return;
    }
    setTimeout(function() {
        try {
            var parentEl = iframeDom.parentElement;
            if (parentEl && parentEl.classList.contains('ans-job-finished')) {
                logger(_logP.VID + '[完成] ' + taskName + ' 任务点已完成。', 'success');
                switchMission();
            } else {
                logger(_logP.VID + '[警告] ' + taskName + ' 尚未标记完成（第' + (attempt + 1) + '次检测），5秒后重试。', 'warn');
                checkJobFinished(iframeDom, taskName, attempt + 1, maxAttempts);
            }
        } catch (e) {
            logger(_logP.VID + '[警告] ' + taskName + ' 状态检测出错（' + e.message + '），5秒后重试。', 'warn');
            checkJobFinished(iframeDom, taskName, attempt + 1, maxAttempts);
        }
    }, 5000);
}

// 强锁 playbackRate：用 Object.defineProperty 阻止超星播放器把倍速改回 1
// 失败则降级为 ratechange 监听守护，仍尽力维持倍速
function hookMediaRate(media, rate) {
    try { media.playbackRate = rate; } catch (_) { /* empty */ }
    try {
        Object.defineProperty(media, 'playbackRate', {
            configurable: true,
            get: function () { return rate; },
            set: function () { /* 阻止外部改写 */ }
        });
    } catch (_) {
        try {
            media.addEventListener('ratechange', function () {
                if (media.playbackRate !== rate) {
                    try { media.playbackRate = rate; } catch (__) { /* empty */ }
                }
            });
        } catch (___) { /* empty */ }
    }
}

// 超星 video.js 播放器若禁用了倍速，倍速菜单会无项 → 视为禁用
function isPlaybackRateDisabled(iframeDocument) {
    try {
        var items = iframeDocument.querySelectorAll('.vjs-playback-rate .vjs-menu-content .vjs-menu-item');
        return items.length === 0;
    } catch (_) {
        return false;
    }
}

function missonBook(dom, obj) {
    if (isTaskMode()) {
        if (obj['jobid'] == undefined) {
            logger(_logP.SYS + '[跳过] 非任务点，已跳过。', 'skip')
            switchMission()
            return
        }
    }
    let jobId = obj['property']['jobid'],
        name = obj['property']['bookname'],
        jtoken = obj['jtoken'],
        knowledgeId = _defaults['knowledgeid'],
        courseId = _defaults['courseid'],
        clazzId = _defaults['clazzId'];
    if (obj['job'] == undefined) {
        logger(_logP.BOOK + '[跳过] ' + name + ' 检测已完成。', 'skip')
        switchMission()
        return
    }
    $.ajax({
        url: _l.protocol + '//' + _l.host + '/ananas/job?jobid=' + jobId + '&knowledgeid=' + knowledgeId + '&courseid=' + courseId + '&clazzid=' + clazzId + '&jtoken=' + jtoken + '&_dc=' + String(Math.round(new Date())),
        method: 'GET',
        success: function (res) {
            if (res.status) {
                logger(_logP.BOOK + '[完成] ' + name + ' ' + res.msg + '。', 'success')
            } else {
                logger(_logP.BOOK + '[错误] ' + name + ' 处理异常。', 'error')
            }
            switchMission()
        },
        error: function () {
            logger(_logP.BOOK + '[错误] ' + name + ' 网络请求失败。', 'error')
            switchMission()
        }
    })
}

// 直播（live）任务：
// 1. 拉 /ananas/live/liveinfo 取 duration、timeLongValue、liveStatus
// 2. 触发一次 zhibo.chaoxing.com 的 index 请求完成鉴权
// 3. 循环上报 saveTimePc（每 30 秒一次），直到 playTime 达到剩余时长
// 注意：若 liveStatus==4 && ifReview==1 表示不允许回放，直接跳过
function missonLive(dom, obj) {
    if (!setting.video) {
        logger(_logP.LIVE + '[跳过] 用户设置不处理直播任务。', 'skip')
        return setTimeout(switchMission, 3000)
    }
    if (isTaskMode() && obj['jobid'] == undefined) {
        logger(_logP.QUIZ + '[跳过] 非任务点，已跳过。', 'skip')
        return switchMission()
    }
    if (!setting.review && obj['isPassed'] === true) {
        logger(_logP.LIVE + '[跳过] ' + (obj['property'] && obj['property']['title']) + ' 检测已完成。', 'skip')
        return switchMission()
    }

    let prop = obj['property'] || {}
    let name = prop['title'] || prop['name'] || '未命名'
    let liveId = prop['liveId']
    let streamName = prop['streamName']
    let vdoid = prop['vdoid']
    let jobId = obj['jobid']
    let courseId = _defaults['courseid']
    let clazzId = _defaults['clazzId']
    let knowledgeId = _defaults['knowledgeid']
    let userId = getCk('_uid') || getCk('UID')
    let liveSetEnc = obj['liveSetEnc'] || ''
    let authEnc = obj['authEnc'] || ''
    let rt = prop['rt'] ? parseFloat(prop['rt']) : 0.9

    if (!liveId || !userId) {
        logger(_logP.LIVE + '[错误] 缺少必要参数（liveId/userId）：' + name + '。', 'error')
        return switchMission()
    }

    let liveInfoUrl = _l.protocol + '//' + _l.host + '/ananas/live/liveinfo?liveid=' + liveId + '&userid=' + userId + '&clazzid=' + clazzId + '&knowledgeid=' + knowledgeId + '&courseid=' + courseId + '&jobid=' + jobId + '&ut=s'
    logger(_logP.LIVE + '[启动] 开始直播：' + name + '。', 'hili')

    $.ajax({
        url: liveInfoUrl,
        method: 'GET',
        dataType: 'text',
        success: function (raw) {
            let info
            try { info = JSON.parse(raw) } catch (_) { info = null }
            if (!info || !info.temp || !info.temp.data) {
                logger(_logP.LIVE + '[错误] 获取直播信息失败：' + name + '。', 'error')
                return switchMission()
            }
            let data = info.temp.data
            let duration = data['duration'] || 0
            let timeLongValue = (data['timeLongValue'] || 0) * 60
            let liveStatus = data['liveStatus']
            let ifReview = data['ifReview']
            if (liveStatus == 4 && ifReview == 1) {
                logger(_logP.LIVE + '[警告] 不允许回放，无法完成：' + name + '。', 'warn')
                return switchMission()
            }
            // 预热 zhibo.chaoxing.com session（鉴权上下文）—跨域请求，交给浏览器处理 cookie
            let indexUrl = _l.protocol + '//zhibo.chaoxing.com/' + liveId + '?courseId=' + courseId + '&classId=' + clazzId + '&knowledgeId=' + knowledgeId + '&jobId=' + jobId + '&userId=' + userId + '&rt=' + rt + '&livesetenc=' + encodeURIComponent(liveSetEnc) + '&isjob=true&watchingInCourse=1&customPara1=' + clazzId + '_' + courseId + '&customPara2=' + encodeURIComponent(authEnc) + '&isNotDrag=1&jobfs=0'
            $.ajax({
                url: indexUrl, method: 'GET', dataType: 'text',
                xhrFields: { withCredentials: true },
                complete: function () {
                    if (rt <= 0.9) duration = duration * (rt + 0.1)
                    if (timeLongValue > duration) {
                        logger(_logP.LIVE + '[完成] 时长已达标，无需继续观看：' + name + '。', 'success')
                        return switchMission()
                    }
                    duration -= timeLongValue
                    let playTime = 0, isStart = '0'
                    function reportOnce() {
                        let reportUrl = _l.protocol + '//zhibo.chaoxing.com/saveTimePc?streamName=' + streamName + '&vdoid=' + vdoid + '&userId=' + userId + '&isStart=' + isStart + '&t=' + Date.now() + '&courseId=' + courseId
                        $.ajax({
                            url: reportUrl, method: 'GET', dataType: 'text',
                            xhrFields: { withCredentials: true },
                            success: function (resp) {
                                if (String(resp).indexOf('success') !== -1) {
                                    logger(_logP.LIVE + '[信息] 进度上报成功（' + Math.round(playTime) + 's/' + Math.round(duration) + 's）：' + name + '。', 'info')
                                } else {
                                    logger(_logP.LIVE + '[警告] 进度上报失败：' + name + '。', 'warn')
                                }
                            },
                            error: function () { logger(_logP.LIVE + '[错误] 进度上报网络失败：' + name + '。', 'error') },
                            complete: function () {
                                isStart = '1'
                                if (playTime >= duration) {
                                    logger(_logP.LIVE + '[完成] 回放完成：' + name + '。', 'success')
                                    return switchMission()
                                }
                                playTime += 30
                                if (playTime > duration) playTime = duration
                                setTimeout(reportOnce, 30000)
                            }
                        })
                    }
                    reportOnce()
                }
            })
        },
        error: function () {
            logger(_logP.LIVE + '[错误] 获取直播信息网络失败：' + name + '。', 'error')
            switchMission()
        }
    })
}

// 速课（microCourse）任务：对齐九九助手的 /ananas/job/microCourse 接口
function missonMicroCourse(dom, obj) {
    if (isTaskMode() && obj['jobid'] == undefined) {
        logger(_logP.QUIZ + '[跳过] 非任务点，已跳过。', 'skip')
        return switchMission()
    }
    if (!setting.review && obj['isPassed'] === true) {
        logger(_logP.MICRO + '[跳过] ' + (obj['property'] && (obj['property']['title'] || obj['property']['name'])) + ' 检测已完成。', 'skip')
        return switchMission()
    }
    let prop = obj['property'] || {}
    let name = prop['title'] || prop['name'] || '未命名'
    let jobId = obj['jobid']
    let jtoken = obj['jtoken'] || ''
    let courseId = _defaults['courseid']
    let clazzId = _defaults['clazzId']
    let knowledgeId = _defaults['knowledgeid']
    let cb = 'jQuery' + Math.floor(Math.random() * 1e15) + '_' + Date.now()
    let url = _l.protocol + '//' + _l.host + '/ananas/job/microCourse?jobid=' + jobId + '&knowledgeid=' + knowledgeId + '&courseid=' + courseId + '&clazzid=' + clazzId + '&jtoken=' + jtoken + '&checkMicroTopic=true&microTopicId=undefined&jsoncallback=' + cb + '&_=' + Date.now()
    logger(_logP.MICRO + '[启动] 开始速课：' + name + '。', 'hili')
    $.ajax({
        url: url, method: 'GET', dataType: 'text',
        success: function (raw) {
            // jsonp 包装，但我们只需要判断字符串中是否含"添加考核点成功"
            if (String(raw).indexOf('添加考核点成功') !== -1) {
                logger(_logP.MICRO + '[完成] 速课任务完成：' + name + '。', 'success')
            } else {
                logger(_logP.MICRO + '[警告] 任务响应异常：' + name + '。', 'warn')
            }
            switchMission()
        },
        error: function () {
            logger(_logP.MICRO + '[错误] 任务网络失败：' + name + '。', 'error')
            switchMission()
        }
    })
}

function missonDoucument(dom, obj) {
    if (isTaskMode()) {
        if (obj['jobid'] == undefined) {
            logger(_logP.SYS + '[跳过] 非任务点，已跳过。', 'skip')
            switchMission()
            return
        }
    }
    let jobId = obj['property']['jobid'],
        name = obj['property']['name'],
        jtoken = obj['jtoken'],
        knowledgeId = _defaults['knowledgeid'],
        courseId = _defaults['courseid'],
        clazzId = _defaults['clazzId'];
    if (obj['job'] == undefined) {
        logger(_logP.DOC + '[跳过] ' + name + ' 检测已完成。', 'skip')
        switchMission()
        return
    }

    // 任务完成后刷新 DOM 状态：标记 ans-job-finished
    function markDomFinished() {
        try {
            if (docIframe && docIframe.parentElement) {
                docIframe.parentElement.classList.add('ans-job-finished')
            }
        } catch (_) { /* ignore */ }
    }

    // 提交文档任务的 AJAX 请求
    function submitDocumentJob() {
        $.ajax({
            url: _l.protocol + '//' + _l.host + '/ananas/job/document?jobid=' + jobId + '&knowledgeid=' + knowledgeId + '&courseid=' + courseId + '&clazzid=' + clazzId + '&jtoken=' + jtoken + '&_dc=' + String(Math.round(new Date())),
            method: 'GET',
            success: function (res) {
                if (res.status) {
                    logger(_logP.DOC + '[完成] ' + name + ' ' + res.msg + '。', 'success')
                    markDomFinished()
                } else {
                    logger(_logP.DOC + '[错误] ' + name + ' 处理异常。', 'error')
                }
                switchMission()
            },
            error: function () {
                logger(_logP.DOC + '[错误] ' + name + ' 网络请求失败。', 'error')
                switchMission()
            }
        })
    }

    // 获取文档 iframe 元素
    var docIframe = null
    if (dom && dom.length > 0) {
        docIframe = dom[0]
    } else if (dom instanceof Element) {
        docIframe = dom
    }

    if (!docIframe) {
        logger(_logP.DOC + '[警告] ' + name + ' 未找到iframe，降级为直接提交。', 'warn')
        submitDocumentJob()
        return
    }

    logger(_logP.DOC + '[启动] ' + name + ' 开始模拟翻阅。', 'hili')
    var scrollCompleted = false
    var scrollTimeout = null

    // 超时兜底：45秒后无论是否翻到底都提交（PDF通常页数较多）
    scrollTimeout = setTimeout(function () {
        if (!scrollCompleted) {
            scrollCompleted = true
            logger(_logP.DOC + '[警告] 翻阅超时（45s），降级为直接提交。', 'warn')
            submitDocumentJob()
        }
    }, 45000)

    try {
        var iframeDoc = docIframe.contentDocument || docIframe.contentWindow.document
        if (!iframeDoc || !iframeDoc.body) {
            logger(_logP.DOC + '[警告] iframe跨域限制，降级为直接提交。', 'warn')
            clearTimeout(scrollTimeout)
            submitDocumentJob()
            return
        }

        // 递归查找深层 iframe 中的实际文档内容（PDF阅读器通常在嵌套 iframe 内）
        function findDeepScrollable(doc, depth) {
            if (depth > 3) return null
            // 先查当前 document 内的可滚动元素
            var candidates = doc.querySelectorAll('.reader, .ppt-container, .doc-container, .slide-container, .pdfViewer, .page, [class*="scroll"], body')
            for (var i = 0; i < candidates.length; i++) {
                if (candidates[i].scrollHeight - candidates[i].clientHeight > 200) {
                    return { el: candidates[i], doc: doc }
                }
            }
            // 没找到则递归进入嵌套 iframe
            var nestedIframes = doc.querySelectorAll('iframe')
            for (var j = 0; j < nestedIframes.length; j++) {
                try {
                    var nestedDoc = nestedIframes[j].contentDocument || nestedIframes[j].contentWindow.document
                    if (nestedDoc && nestedDoc.body) {
                        var result = findDeepScrollable(nestedDoc, depth + 1)
                        if (result) return result
                    }
                } catch (_) { /* 跨域跳过 */ }
            }
            return null
        }

        var found = findDeepScrollable(iframeDoc, 0)
        if (!found) {
            // 回退：直接用 documentElement
            found = { el: iframeDoc.documentElement, doc: iframeDoc }
        }

        var scrollEl = found.el
        var scrollDoc = found.doc

        var maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight
        if (maxScroll <= 0) {
            logger(_logP.DOC + '[信息] 内容无需滚动，直接提交。', 'info')
            clearTimeout(scrollTimeout)
            submitDocumentJob()
            return
        }

        logger(_logP.DOC + '[信息] 滚动区域=' + (scrollEl.className || scrollEl.tagName) + '，总高=' + scrollEl.scrollHeight + 'px，可视=' + scrollEl.clientHeight + 'px。', 'info')

        // 触发滚动事件的辅助函数
        function fireScroll(el, win) {
            try {
                el.dispatchEvent(new Event('scroll', { bubbles: true }))
                if (win) win.dispatchEvent(new Event('scroll', { bubbles: true }))
            } catch (_) { /* ignore */ }
        }

        // 模拟逐页翻阅：每次滚动接近一屏，模拟真实阅读节奏
        var viewHeight = scrollEl.clientHeight || 600
        var currentStep = 0
        function scrollStep() {
            if (scrollCompleted) return
            // 每次滚动 0.7~0.9 屏（模拟人类阅读，有少量重叠）
            var step = viewHeight * (0.7 + Math.random() * 0.2)
            var nextPos = Math.min((currentStep + 1) * viewHeight, maxScroll)
            scrollEl.scrollTop = nextPos
            fireScroll(scrollEl, scrollDoc.defaultView)
            currentStep++
            if (nextPos >= maxScroll) {
                scrollCompleted = true
                clearTimeout(scrollTimeout)
                logger(_logP.DOC + '[完成] 已翻阅到底（' + currentStep + '屏），开始提交。', 'success')
                setTimeout(submitDocumentJob, 2000)
                return
            }
            // 每屏停留 2~4 秒，模拟阅读时间
            var delay = 2000 + Math.random() * 2000
            setTimeout(scrollStep, delay)
        }
        scrollStep()
    } catch (e) {
        logger(_logP.DOC + '[错误] 翻阅异常（' + e.message + '），降级为直接提交。', 'error')
        clearTimeout(scrollTimeout)
        submitDocumentJob()
    }
}

function missonRead(dom, obj) {
    if (isTaskMode()) {
        if (obj['jobid'] == undefined) {
            logger(_logP.SYS + '[跳过] 非任务点，已跳过。', 'skip')
            switchMission()
            return
        }
    }
    let jobId = obj['property']['jobid'],
        name = obj['property']['title'],
        jtoken = obj['jtoken'],
        knowledgeId = _defaults['knowledgeid'],
        courseId = _defaults['courseid'],
        clazzId = _defaults['clazzId'];
    if (obj['job'] == undefined) {
        logger(_logP.READ + '[跳过] ' + name + ' 检测已完成。', 'skip')
        switchMission()
        return
    }

    // 任务完成后刷新 DOM 状态
    function markDomFinished() {
        try {
            if (readIframe && readIframe.parentElement) {
                readIframe.parentElement.classList.add('ans-job-finished')
            }
        } catch (_) { /* ignore */ }
    }

    // 提交阅读任务的 AJAX 请求
    function submitReadJob() {
        $.ajax({
            url: _l.protocol + '//' + _l.host + '/ananas/job/readv2?jobid=' + jobId + '&knowledgeid=' + knowledgeId + '&courseid=' + courseId + '&clazzid=' + clazzId + '&jtoken=' + jtoken + '&_dc=' + String(Math.round(new Date())),
            method: 'GET',
            success: function (res) {
                if (res.status) {
                    logger(_logP.READ + '[完成] ' + name + ' ' + res.msg + '。', 'success')
                    markDomFinished()
                } else {
                    logger(_logP.READ + '[错误] ' + name + ' 处理异常。', 'error')
                }
                switchMission()
            },
            error: function () {
                logger(_logP.READ + '[错误] ' + name + ' 网络请求失败。', 'error')
                switchMission()
            }
        })
    }

    // 获取阅读任务 iframe 元素
    var readIframe = null
    if (dom && dom.length > 0) {
        readIframe = dom[0]
    } else if (dom instanceof Element) {
        readIframe = dom
    }

    if (!readIframe) {
        logger(_logP.READ + '[警告] ' + name + ' 未找到iframe，降级为直接提交。', 'warn')
        submitReadJob()
        return
    }

    logger(_logP.READ + '[启动] ' + name + ' 开始模拟翻阅。', 'hili')
    var scrollCompleted = false
    var scrollTimeout = null

    scrollTimeout = setTimeout(function () {
        if (!scrollCompleted) {
            scrollCompleted = true
            logger(_logP.READ + '[警告] 翻阅超时（45s），降级为直接提交。', 'warn')
            submitReadJob()
        }
    }, 45000)

    try {
        var iframeDoc = readIframe.contentDocument || readIframe.contentWindow.document
        if (!iframeDoc || !iframeDoc.body) {
            logger(_logP.READ + '[警告] iframe跨域限制，降级为直接提交。', 'warn')
            clearTimeout(scrollTimeout)
            submitReadJob()
            return
        }

        // 递归查找深层 iframe 中的实际文档内容
        function findDeepScrollable(doc, depth) {
            if (depth > 3) return null
            var candidates = doc.querySelectorAll('.reader, .ppt-container, .doc-container, .slide-container, .pdfViewer, .page, [class*="scroll"], body')
            for (var i = 0; i < candidates.length; i++) {
                if (candidates[i].scrollHeight - candidates[i].clientHeight > 200) {
                    return { el: candidates[i], doc: doc }
                }
            }
            var nestedIframes = doc.querySelectorAll('iframe')
            for (var j = 0; j < nestedIframes.length; j++) {
                try {
                    var nestedDoc = nestedIframes[j].contentDocument || nestedIframes[j].contentWindow.document
                    if (nestedDoc && nestedDoc.body) {
                        var result = findDeepScrollable(nestedDoc, depth + 1)
                        if (result) return result
                    }
                } catch (_) { /* 跨域跳过 */ }
            }
            return null
        }

        var found = findDeepScrollable(iframeDoc, 0)
        if (!found) {
            found = { el: iframeDoc.documentElement, doc: iframeDoc }
        }

        var scrollEl = found.el
        var scrollDoc = found.doc

        var maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight
        if (maxScroll <= 0) {
            logger(_logP.READ + '[信息] 内容无需滚动，直接提交。', 'info')
            clearTimeout(scrollTimeout)
            submitReadJob()
            return
        }

        logger(_logP.READ + '[信息] 滚动区域=' + (scrollEl.className || scrollEl.tagName) + '，总高=' + scrollEl.scrollHeight + 'px，可视=' + scrollEl.clientHeight + 'px。', 'info')

        function fireScroll(el, win) {
            try {
                el.dispatchEvent(new Event('scroll', { bubbles: true }))
                if (win) win.dispatchEvent(new Event('scroll', { bubbles: true }))
            } catch (_) { /* ignore */ }
        }

        var viewHeight = scrollEl.clientHeight || 600
        var currentStep = 0
        function scrollStep() {
            if (scrollCompleted) return
            var nextPos = Math.min((currentStep + 1) * viewHeight, maxScroll)
            scrollEl.scrollTop = nextPos
            fireScroll(scrollEl, scrollDoc.defaultView)
            currentStep++
            if (nextPos >= maxScroll) {
                scrollCompleted = true
                clearTimeout(scrollTimeout)
                logger(_logP.READ + '[完成] 已翻阅到底（' + currentStep + '屏），开始提交。', 'success')
                setTimeout(submitReadJob, 2000)
                return
            }
            var delay = 2000 + Math.random() * 2000
            setTimeout(scrollStep, delay)
        }
        scrollStep()
    } catch (e) {
        logger(_logP.READ + '[错误] 翻阅异常（' + e.message + '），降级为直接提交。', 'error')
        clearTimeout(scrollTimeout)
        submitReadJob()
    }
}

// 讨论区任务处理（在任务点页面调用）
// 策略：获取讨论区URL → 打开新窗口 → 在新窗口中自动回复（missonBbsPage处理）
function missonBbs(dom, obj) {
    let prop = obj['property'] || {};
    let name = prop['title'] || prop['name'] || '未命名讨论';
    let jobId = obj['jobid'];
    let knowledgeId = _defaults['knowledgeid'];
    let courseId = _defaults['courseid'];
    let clazzId = _defaults['clazzId'];
    let bbsId = prop['bbsid'] || obj['bbsid'] || '';

    // 检查是否已完成（通过 isPassed 字段或 DOM 中的 ans-job-finished 类）
    if (!setting.review && obj['isPassed'] === true) {
        logger(_logP.BBS + '[跳过] ' + name + ' 检测已完成。', 'skip');
        return switchMission();
    }

    // 检查 DOM 中的完成状态
    let target = dom.length > 0 ? dom[0] : null;
    if (target && target.parentElement && target.parentElement.classList.contains('ans-job-finished')) {
        logger(_logP.BBS + '[跳过] ' + name + ' 检测已完成（DOM）。', 'skip');
        return switchMission();
    }

    logger(_logP.BBS + '[启动] 开始处理讨论区：' + name + '。', 'hili');

    if (!target) {
        logger(_logP.BBS + '[警告] 未找到讨论区iframe，3秒后重试。', 'warn');
        return setTimeout(() => missonBbs(dom, obj), 3000);
    }

    // 轮询查找内部的讨论区iframe
    let attempts = 0;
    const maxAttempts = 30;
    const intervalId = setInterval(() => {
        attempts++;
        if (attempts > maxAttempts) {
            clearInterval(intervalId);
            logger(_logP.BBS + '[错误] 任务处理超时，脚本已停止：' + name + '。', 'error');
            logger(_logP.BBS + '[错误] 请检查问题后手动刷新页面继续。', 'error');
            return;
        }

        try {
            const doc = target.contentDocument || target.contentWindow.document;
            const innerIframe = doc.querySelector('#frame_content');
            if (innerIframe && innerIframe.src && innerIframe.src.indexOf('bbscircle') !== -1) {
                clearInterval(intervalId);
                const discussUrl = innerIframe.src;
                logger(_logP.BBS + '[信息] 找到讨论区中间页面：' + discussUrl + '。', 'info');

                // 先获取中间页面，提取正确的讨论区URL
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: discussUrl,
                    timeout: 15000,
                    onload: function(xhr) {
                        if (xhr.status === 200) {
                            const parser = new DOMParser();
                            const bbsDoc = parser.parseFromString(xhr.responseText, 'text/html');
                            const topicMainDiv = bbsDoc.querySelector('#topicMainDiv');

                            if (topicMainDiv) {
                                const realDiscussUrl = topicMainDiv.getAttribute('data');
                                if (realDiscussUrl) {
                                    logger(_logP.BBS + '[信息] 获取到讨论区链接：' + realDiscussUrl + '。', 'info');

                                    // 用 GM_setValue 保存讨论上下文（含 API 配置），供弹窗中的脚本跨域读取
                                    try {
                                        GM_setValue('bbsContext', {
                                            discussUrl: realDiscussUrl,
                                            courseId: _defaults['courseid'] || '',
                                            classId: _defaults['clazzId'] || '',
                                            bbsId: bbsId,
                                            name: name,
                                            deepseekApiKey: getDeepSeekApiKey(),
                                            deepseekBaseUrl: getDeepSeekBaseUrl(),
                                            deepseekModel: getDeepSeekModel(),
                                            timestamp: Date.now()
                                        });
                                    } catch (_) { /* ignore */ }

                                    // 打开正确的讨论区详情页面
                                    const newWindow = window.open(realDiscussUrl);
                                    if (!newWindow) {
                                        logger(_logP.BBS + '[错误] 弹窗被浏览器拦截，请允许此站点的弹窗权限后刷新页面重试。', 'error');
                                        return;
                                    }
                                    logger(_logP.BBS + '[信息] 已打开讨论区页面，等待自动回复完成。', 'info');

                                    // 通过轮询检查新窗口是否已关闭
                                    const checkClosed = setInterval(function() {
                                        try {
                                            if (newWindow.closed) {
                                                clearInterval(checkClosed);
                                                logger(_logP.BBS + '[完成] 讨论区页面已关闭。', 'success');
                                                switchMission();
                                            }
                                        } catch (e) { /* 跨域限制 */ }
                                    }, 2000);

                                    // 超时兜底：120秒后自动切换任务
                                    setTimeout(function() {
                                        clearInterval(checkClosed);
                                        logger(_logP.BBS + '[警告] 任务处理超时（120秒）。', 'warn');
                                        switchMission();
                                    }, 120000);
                                } else {
                                    logger(_logP.BBS + '[错误] 未找到讨论区详情链接。', 'error');
                                }
                            } else {
                                logger(_logP.BBS + '[错误] 未找到话题卡片。', 'error');
                            }
                        } else {
                            logger(_logP.BBS + '[错误] 获取中间页面失败：HTTP ' + xhr.status + '。', 'error');
                        }
                    },
                    onerror: function() {
                        logger(_logP.BBS + '[错误] 获取中间页面网络错误。', 'error');
                    },
                    ontimeout: function() {
                        logger(_logP.BBS + '[错误] 获取中间页面超时。', 'error');
                    }
                });
            }
        } catch (e) {
            // iframe可能还未加载完成，继续等待
        }
    }, 2000);
}

// 提交讨论区回复
function submitReply(bbsId, topicId, courseId, classId, content, callback) {
    logger(_logP.BBS + '[信息] 正在提交回复。', 'info');
    
    // topicId 实际上是话题的 uuid
    const topicUuid = topicId;
    
    // 使用正确的API接口：/pc/invitation/{uuid}/addReplys
    const submitUrl = 'https://groupweb.chaoxing.com/pc/invitation/' + topicUuid + '/addReplys';
    
    // 构造表单数据（参考源代码中的参数）
    const formData = 'courseId=' + encodeURIComponent(courseId) +
                     '&classId=' + encodeURIComponent(classId) +
                     '&replyId=-1' +
                     '&uuid=' + encodeURIComponent(topicUuid) +
                     '&topic_content=' + encodeURIComponent(content) +
                     '&bbsid=' + encodeURIComponent(bbsId);
    
    logger(_logP.BBS + '[信息] 提交URL：' + submitUrl + '。', 'info');
    logger(_logP.BBS + '[信息] 话题UUID：' + topicUuid + '。', 'info');
    logger(_logP.BBS + '[信息] 讨论ID：' + bbsId + '。', 'info');
    
    GM_xmlhttpRequest({
        method: 'POST',
        url: submitUrl,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData,
        timeout: 30000,
        onload: function(xhr) {
            logger(_logP.BBS + '[信息] 响应状态：' + xhr.status + '。', 'info');
            logger(_logP.BBS + '[信息] 响应内容：' + xhr.responseText.substring(0, 500), 'info');
            
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.status === true) {
                        logger(_logP.BBS + '[完成] 回复提交成功：' + (response.msg || '') + '。', 'success');
                        callback(true);
                    } else {
                        logger(_logP.BBS + '[错误] 回复提交失败：' + (response.msg || '未知错误') + '。', 'error');
                        callback(false);
                    }
                } catch (e) {
                    // 如果响应不是JSON
                    if (xhr.responseText.indexOf('success') !== -1 || xhr.responseText.indexOf('成功') !== -1) {
                        logger(_logP.BBS + '[完成] 回复提交成功。', 'success');
                        callback(true);
                    } else {
                        logger(_logP.BBS + '[错误] 回复提交失败：响应解析错误。', 'error');
                        logger(_logP.BBS + '[警告] 响应内容：' + xhr.responseText.substring(0, 500), 'warn');
                        callback(false);
                    }
                }
            } else {
                logger(_logP.BBS + '[错误] 回复提交失败：HTTP ' + xhr.status + '。', 'error');
                logger(_logP.BBS + '[警告] 响应内容：' + xhr.responseText.substring(0, 500), 'warn');
                callback(false);
            }
        },
        onerror: function() {
            logger(_logP.BBS + '[错误] 回复提交网络错误。', 'error');
            callback(false);
        },
        ontimeout: function() {
            logger(_logP.BBS + '[错误] 回复提交超时。', 'error');
            callback(false);
        }
    });
}

// 讨论区页面自动回复（在讨论区详情页面调用）
// 等待页面加载完成后，自动获取讨论内容 → AI生成回复 → 填入 → 提交 → 关闭窗口
function missonBbsPage() {
    logger(_logP.BBS + '[启动] 开始处理讨论区自动回复。', 'hili');

    // 等待页面内容加载完成
    const waitForContent = setInterval(() => {
        const titleEl = document.querySelector('.topicDetail_title span');
        const contentEl = document.querySelector('.replyContent');
        if (titleEl && contentEl) {
            clearInterval(waitForContent);
            clearTimeout(loadTimeout);
            processBbsReply();
        }
    }, 1000);

    // 超时处理：30秒后如果还没找到元素才触发
    const loadTimeout = setTimeout(() => {
        clearInterval(waitForContent);
        logger(_logP.BBS + '[错误] 页面加载超时（30s），未找到必要元素。', 'error');
    }, 30000);
}

function processBbsReply() {
    // 从 GM_getValue 读取父窗口保存的讨论上下文
    let ctx = null;
    try { ctx = GM_getValue('bbsContext', null); } catch (_) { /* ignore */ }

    let ctxCourseId = '';
    let ctxClassId = '';
    let ctxBbsId = '';
    let ctxName = '';
    if (ctx) {
        ctxCourseId = ctx.courseId || '';
        ctxClassId = ctx.classId || '';
        ctxBbsId = ctx.bbsId || '';
        ctxName = ctx.name || '';
        logger(_logP.BBS + '[信息] 读取到讨论上下文：' + ctxName + '。', 'info');
        // 将父窗口的 API 配置写入弹窗的全局 setting 对象，供 getDeepSeekApiKey() 读取
        // （弹窗在不同域名下，localStorage / GM_getValue 均无法共享父窗口的数据）
        if (ctx.deepseekApiKey) setting.deepseekApiKey = ctx.deepseekApiKey;
        if (ctx.deepseekBaseUrl) setting.deepseekBaseUrl = ctx.deepseekBaseUrl;
        if (ctx.deepseekModel) setting.deepseekModel = ctx.deepseekModel;
    }

    // 获取讨论主题和内容
    let topicTitle = '';
    let topicContent = '';

    try {
        const titleEl = document.querySelector('.topicDetail_title span');
        if (titleEl) topicTitle = titleEl.textContent.trim();

        const contentEl = document.querySelector('.replyContent');
        if (contentEl) topicContent = contentEl.textContent.trim();
    } catch (e) {
        logger(_logP.BBS + '[警告] 获取讨论主题出错：' + e.message + '。', 'warn');
    }

    if (!topicContent) {
        logger(_logP.BBS + '[错误] 未找到讨论内容。', 'error');
        return;
    }

    logger(_logP.BBS + '[信息] 讨论主题：' + topicTitle + '。', 'info');
    logger(_logP.BBS + '[信息] 讨论内容：' + topicContent.substring(0, 100) + '…', 'info');

    // 提取话题 UUID（从当前页面 URL 或 DOM 中获取）
    let topicUuid = '';
    try {
        // 从 URL 提取：/pc/invitation/{uuid}/...
        let m = window.location.href.match(/invitation\/([a-f0-9\-]+)\//i);
        if (m) topicUuid = m[1];
    } catch (_) { /* ignore */ }
    if (!topicUuid) {
        let uuidEl = document.querySelector('[data-uuid]');
        if (uuidEl) topicUuid = uuidEl.getAttribute('data-uuid') || '';
    }

    // 构造AI提示词
    const prompt = {
        type: '讨论区回复',
        question: topicTitle + '\n' + topicContent,
        answer_format: '请用100-200字简洁回答这个讨论话题，观点明确，语言通顺，适合大学生课程讨论'
    };

    // 调用AI获取答案
    getAnswer(4, buildPrompt(prompt)).then((answer) => {
        logger(_logP.AI + '[信息] AI生成回复：' + answer.substring(0, 50) + '…', 'info');

        // 优先通过 API 提交（不依赖 DOM 按钮，更稳定）
        if (topicUuid && ctxCourseId) {
            submitReply(ctxBbsId, topicUuid, ctxCourseId, ctxClassId, answer, function (success) {
                if (success) {
                    logger(_logP.BBS + '[完成] 讨论区回复提交完成，即将关闭页面。', 'success');
                } else {
                    logger(_logP.BBS + '[警告] API提交失败，回退到DOM方式。', 'warn');
                    submitReplyViaDom(answer);
                    return;
                }
                // 清除上下文并关闭窗口
                try { GM_setValue('bbsContext', null); } catch (_) { /* ignore */ }
                setTimeout(function () {
                    try { window.close(); } catch (e) {
                        logger(_logP.BBS + '[警告] 自动关闭窗口失败，请手动关闭此页面。', 'warn');
                    }
                }, 2000);
            });
        } else {
            // 回退到 DOM 操作方式
            logger(_logP.BBS + '[警告] 缺少上下文参数，回退到DOM提交方式。', 'warn');
            submitReplyViaDom(answer);
        }
    }).catch((error) => {
        let detail = error.msg || '未知错误';
        if (error.c && error.c > 0) detail += ' (HTTP ' + error.c + ')';
        logger(_logP.AI + '[错误] 获取回复内容失败：' + detail + '。', 'error');
    });
}

// DOM 方式提交回复（兜底方案）
function submitReplyViaDom(answer) {
    const replyBtn = document.querySelector('.replyBtn');
    if (replyBtn) {
        replyBtn.click();
        logger(_logP.BBS + '[信息] 已点击回复按钮。', 'info');

        setTimeout(() => {
            const textarea = document.querySelector('.editContainer textarea, .topicDetail_editContainer textarea');
            if (textarea) {
                textarea.value = answer;
                textarea.dispatchEvent(new Event('input', { bubbles: true }));
                textarea.dispatchEvent(new Event('change', { bubbles: true }));
                logger(_logP.BBS + '[信息] 已填入回复内容。', 'info');

                setTimeout(() => {
                    const submitBtn = document.querySelector('.addReply');
                    if (submitBtn) {
                        submitBtn.click();
                        logger(_logP.BBS + '[信息] 已点击提交按钮。', 'info');
                        setTimeout(() => {
                            logger(_logP.BBS + '[完成] 讨论区回复提交完成，即将关闭页面。', 'success');
                            try { GM_setValue('bbsContext', null); } catch (_) { /* ignore */ }
                            setTimeout(function () {
                                try { window.close(); } catch (e) {
                                    logger(_logP.BBS + '[警告] 自动关闭窗口失败，请手动关闭此页面。', 'warn');
                                }
                            }, 2000);
                        }, 3000);
                    } else {
                        logger(_logP.BBS + '[错误] 未找到提交按钮。', 'error');
                    }
                }, 1000);
            } else {
                logger(_logP.BBS + '[错误] 未找到回复输入框。', 'error');
            }
        }, 1000);
    } else {
        logger(_logP.BBS + '[错误] 未找到回复按钮。', 'error');
    }
}

function missonWork(dom, obj) {
    if (!setting.work) {
        logger(_logP.QUIZ + '[跳过] 用户设置不自动处理测验。', 'skip')
        switchMission()
        return
    }
    let isDo;
    if (isTaskMode()) {
        logger(_logP.SYS + '[跳过] 非任务点，已跳过。', 'skip')
        if (obj['jobid'] == undefined ? false : true) {
            isDo = true
        } else {
            isDo = false
        }
    } else {
        logger(_logP.SYS + '[信息] 当前默认处理所有任务（含非任务点）。', 'info')
        isDo = true
    }
    if (isDo) {
        if (obj['jobid'] !== undefined) {
            var phoneWeb = _l.protocol + '//' + _l.host + '/work/phone/work?workId=' + obj['jobid'].replace('work-', '') + '&courseId=' + _defaults['courseid'] + '&clazzId=' + _defaults['clazzId'] + '&knowledgeId=' + _defaults['knowledgeid'] + '&jobId=' + obj['jobid'] + '&enc=' + obj['enc']
            // setTimeout(() => { startDoCyWork(0, dom) }, 3000)
            setTimeout(() => { startDoPhoneCyWork(0, dom, phoneWeb) }, 3000)
        } else {
            setTimeout(() => { startDoCyWork(0, dom) }, 3000)
        }
        // } else if (!GM_getValue('cando')) {
        //     logger('存在未完成任务点，脚本已暂停执行，请手动处理后刷新网页。', 'red')
        //     return
    } else {
        logger(_logP.QUIZ + '[跳过] 用户设置只处理属于任务点的任务。', 'skip')
        switchMission()
        return
    }
}

function doPhoneWork($dom) {
    let $cy = $dom.find('.Wrappadding form')
    $subBtn = $cy.find('.zquestions .zsubmit .btn-ok-bottom')
    $okBtn = $dom.find('#okBtn')
    $saveBtn = $cy.find('.zquestions .zsubmit .btn-save')
    let TimuList = $cy.find('.zquestions .Py-mian1')
    startDoPhoneTimu(0, TimuList)
}

function startDoPhoneTimu(index, TimuList) {
    if (index == TimuList.length) {
        if (localStorage.getItem('GPTJsSetting.sub') === 'true') {
            logger(_logP.QUIZ + '[信息] 所有题目处理完成，开始自动提交。', 'info')
            setTimeout(() => {
                $subBtn.click()
                setTimeout(() => {
                    $okBtn.click()
                    logger(_logP.QUIZ + '[完成] 提交成功。', 'success')
                    _mlist.splice(0, 1)
                    _domList.splice(0, 1)
                    setTimeout(() => { switchMission() }, 3000)
                }, 3000)
            }, 5000)
        } else if (localStorage.getItem('GPTJsSetting.force') === 'true') {
            logger(_logP.QUIZ + '[警告] 存在无答案题目，用户启用了强制提交，开始自动提交。', 'warn')
            setTimeout(() => {
                $subBtn.click()
                setTimeout(() => {
                    $okBtn.click()
                    logger(_logP.QUIZ + '[完成] 提交成功。', 'success')
                    _mlist.splice(0, 1)
                    _domList.splice(0, 1)
                    setTimeout(() => { switchMission() }, 3000)
                }, 3000)
            }, 5000)
        } else {
            logger(_logP.QUIZ + '[跳过] 存在无答案题目，已自动保存。', 'skip')
            setTimeout(() => {
                $saveBtn.click()
                setTimeout(() => {
                    logger(_logP.QUIZ + '[完成] 保存成功。', 'success')
                    _mlist.splice(0, 1)
                    _domList.splice(0, 1)
                    setTimeout(() => { switchMission() }, 3000)
                }, 3000)
            }, 5000)
        }
        return
    }
    // 获取当前题目所属的window对象 (可能是iframe)
    let contextWindow = TimuList[index] ? (TimuList[index].ownerDocument.defaultView || unsafeWindow) : unsafeWindow;
    let questionFull = $(TimuList[index]).find('.Py-m1-title').html()
    let _question = tidyQuestion(questionFull).replace(/.*?\[.*?题\]\s*\n\s*/, '').trim()
    let typeName = questionFull.match(/.*?\[(.*?)]|$/)[1];
    let _type = ({
        单选题: 0, 单项选择题: 0, 单选: 0, 选择题: 0,
        多选题: 1, 多项选择题: 1, 多选: 1,
        填空题: 2, 填空: 2,
        判断题: 3, 是非题: 3, 判断: 3,
        简答题: 4, 简答: 4, 问答题: 4, 名词解释: 4, 论述题: 4, 论述: 4,
        计算题: 4, 计算: 4, 分录题: 4, 资料题: 4, 作图题: 4, 其他: 4, 其它: 4, 阅读理解: 4, 阅读: 4, 阅读题: 4, 理解题: 4, 完形填空: 4, 完形: 4, 综合题: 4,
        写作题: 5,
        翻译题: 6
    })[typeName]
    let _a = []
    let _answerTmpArr
    var check_answer_flag = 0;

    // 如果题型不在预设类型中，根据DOM结构自动识别题型
    if (_type === undefined) {
        logger(_logP.QUIZ + '[信息] 尝试自动识别题型：' + typeName + '。', 'info');

        // 检查选项列表特征
        let singleChoiceList = $(TimuList[index]).find('.answerList.singleChoice li');
        let multiChoiceList = $(TimuList[index]).find('.answerList.multiChoice li');

        if (singleChoiceList && singleChoiceList.length > 0) {
            _type = 0; // 单选题
            logger(_logP.QUIZ + '[信息] 自动识别为单选题。', 'info');
        } else if (multiChoiceList && multiChoiceList.length > 0) {
            _type = 1; // 多选题
            logger(_logP.QUIZ + '[信息] 自动识别为多选题。', 'info');
        } else {
            // 检查是否为填空题
            let tkList = $(TimuList[index]).find('.blankList2 input');
            if (tkList && tkList.length > 0) {
                _type = 2; // 填空题
                logger(_logP.QUIZ + '[信息] 自动识别为填空题。', 'info');
            } else {
                // 判断题等其他情况
                let panduanList = $(TimuList[index]).find('.answerList.panduan li');
                if (panduanList && panduanList.length > 0) {
                    _type = 3; // 判断题
                    logger(_logP.QUIZ + '[信息] 自动识别为判断题。', 'info');
                } else {
                    // 检查是否为简答题或材料题
                    let textareaList = $(TimuList[index]).find('textarea');
                    let editorList = $(TimuList[index]).find('.edui-editor');

                    if ((textareaList && textareaList.length > 0) || (editorList && editorList.length > 0)) {
                        _type = 4; // 简答题
                        logger(_logP.QUIZ + '[信息] 自动识别为简答题或材料题。', 'info');
                    }
                }
            }
        }
    }

    _currentQuestionMeta = { index: index, total: TimuList.length, typeName: typeName }
    switch (_type) {
        case 0: {
            //遍历选项列表
            _answerTmpArr = $(TimuList[index]).find('.answerList.singleChoice li')
            let mergedAnswers = [];
            let cleanOptions = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
                cleanOptions.push(answerText);
            });
            collectOptionHtml(_answerTmpArr);
            mergedAnswers = mergedAnswers.join("|");

            _question = buildPrompt({ type: '单选题', question: _question, options: mergedAnswers.split('|') })
            //判断题目是否已作答
            for (let i = 0; i < _answerTmpArr.length; i++) {
                if ($(_answerTmpArr[i]).attr('aria-label')) {
                    if (!isRedoMode()) {
                        logger(_logP.QUIZ + '[跳过] 第' + (index + 1) + '题 此题已作答。', 'skip')
                        check_answer_flag = 1;
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30)
                    } else {
                        logger(_logP.QUIZ + '[信息] 第' + (index + 1) + '题 此题已作答，重做模式下重新作答。', 'info')
                        // 重做模式：先取消已选选项
                        $(_answerTmpArr[i]).click()
                    }
                    break
                }
            }
            if (check_answer_flag == 0) {
                getAnswer(_type, _question).then((agrs) => {
                    _answerTmpArr = $(TimuList[index]).find('.answerList.singleChoice li')
                    _a = cleanOptions.slice()
                    let _i = matchAnswerToOptions(_a, agrs)
                    if (_i == -1) {
                        logger(_logP.QUIZ + '[警告] AI答案无法匹配任何选项。', 'warn')
                        // setting.sub = 0
                        localStorage.setItem('GPTJsSetting.sub', false)
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    } else {
                        $(_answerTmpArr[_i]).click()
                        logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success')
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            }
        }
            break
        case 1: {
            //遍历选项列表
            _answerTmpArr = $(TimuList[index]).find('.answerList.multiChoice li')
            let mergedAnswers = [];
            let cleanMultiOptions = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
                cleanMultiOptions.push(answerText);
            });
            collectOptionHtml(_answerTmpArr);
            mergedAnswers = mergedAnswers.join("|");
            _question = buildPrompt({ type: '多选题', question: _question, options: mergedAnswers.split('|'), answer_format: "用'|'分割多个答案" })
            //判断题目是否已作答
            for (let i = 0; i < _answerTmpArr.length; i++) {
                if ($(_answerTmpArr[i]).attr('aria-label')) {
                    if (!isRedoMode()) {
                        logger(_logP.QUIZ + '[跳过] 第' + (index + 1) + '题 此题已作答。', 'skip')
                        check_answer_flag = 1;
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30)
                    } else {
                        logger(_logP.QUIZ + '[信息] 第' + (index + 1) + '题 此题已作答，重做模式下重新作答。', 'info')
                        // 重做模式：先取消已选选项
                        $(_answerTmpArr[i]).click()
                    }
                    break
                }
            }
            if (check_answer_flag == 0) {
                getAnswer(_type, _question).then((agrs) => {
                    if (agrs == '暂无答案') {
                        logger(_logP.QUIZ + '[警告] AI答案无法匹配任何选项。', 'warn')
                        // setting.sub = 0
                        localStorage.setItem('GPTJsSetting.sub', false)
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    } else {
                        _answerTmpArr = $(TimuList[index]).find('.answerList.multiChoice li')
                        let _multiOptions = cleanMultiOptions.slice()
                        let _matchedAny = false
                        $.each(_answerTmpArr, (i, t) => {
                            if (agrs.indexOf(_multiOptions[i]) != -1) {
                                _matchedAny = true
                                setTimeout(() => { $(_answerTmpArr[i]).click() }, 300)
                            }
                        })
                        // 如果精确匹配没有命中任何选项，尝试模糊匹配
                        if (!_matchedAny) {
                            let fuzzyIndices = matchAnswerToOptionsMultiple(_multiOptions, agrs)
                            for (var fi = 0; fi < fuzzyIndices.length; fi++) {
                                (function (idx) {
                                    setTimeout(function () { $(_answerTmpArr[idx]).click() }, 300)
                                })(fuzzyIndices[fi])
                            }
                        }
                        let check = 0
                        setTimeout(() => {
                            $.each(_answerTmpArr, (i, t) => {
                                if (($(_answerTmpArr[i]).attr('class') || '').indexOf('cur') != -1) {
                                    check = 1
                                }
                            })
                            if (check) {
                                logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success')
                            } else {
                                logger(_logP.QUIZ + '[警告] 未能正确选择答案，请手动选择。', 'warn')
                                // setting.sub = 0
                                localStorage.setItem('GPTJsSetting.sub', false)
                            }
                            setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        }, 1000)
                    }
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            }
        }
            break
        case 2: {
            // 填空题处理 - 使用全局editors数组 (ExtJS)
            let tkList = $(TimuList[index]).find('.blankList2 input')
            // 使用属性选择器匹配包含editorIndex的元素
            let tkEditorBlocks = $(TimuList[index]).find('[data-editorindex]')

            // 检查是否使用UEditor编辑器（手机页面）
            if (tkEditorBlocks && tkEditorBlocks.length > 0) {
                let firstTextarea = $(TimuList[index]).find('textarea[name^="answer"]')
                if (firstTextarea.length > 0 && $(firstTextarea[0]).val() && $(firstTextarea[0]).val().trim() !== '' && !isRedoMode()) {
                    logger(_logP.QUIZ + '[跳过] 此题已作答。', 'skip');
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30);
                    break
                }

                _question = buildPrompt({ type: '填空题', question: _question, answer_format: "多个填空用'|'分隔" })
                getAnswer(_type, _question).then((agrs) => {
                    if (agrs == '暂无答案') {
                        logger(_logP.QUIZ + '[警告] AI答案无法匹配任何选项。', 'warn')
                        localStorage.setItem('GPTJsSetting.sub', false)
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        return
                    }
                    let answers = agrs.split('|')
                    let editorBlocks = $(TimuList[index]).find('[data-editorindex]')

                    $.each(editorBlocks, (i, block) => {
                        let editorIndex = $(block).attr('data-editorindex')
                        let itemId = $(block).attr('data-itemid')
                        let answerContent = answers[i] || answers[0] || agrs

                        setTimeout(() => {
                            try {
                                let ueditor = null

                                // 1. 尝试通过 contextWindow.editors 获取
                                if (contextWindow.editors && contextWindow.editors[editorIndex]) {
                                    ueditor = contextWindow.editors[editorIndex].ueditor
                                }

                                // 2. 尝试通过 contextWindow.UE.instants 获取
                                if (!ueditor && contextWindow.UE && contextWindow.UE.instants) {
                                    let instantKey = 'ueditorInstant' + editorIndex
                                    ueditor = contextWindow.UE.instants[instantKey]
                                }

                                // 3. 尝试通过标准ID获取 (ananas-editor-answer + itemId)
                                if (!ueditor && itemId && contextWindow.UE && contextWindow.UE.getEditor) {
                                    ueditor = contextWindow.UE.getEditor('ananas-editor-answer' + itemId)
                                }

                                if (ueditor) {
                                    ueditor.setContent(answerContent)
                                    logger(_logP.QUIZ + '[完成] 填空#' + (i + 1) + ' 已填入（EditorIndex=' + editorIndex + '）。', 'success')
                                } else {
                                    logger(_logP.QUIZ + '[警告] 填空#' + (i + 1) + ' 未找到编辑器实例（Index=' + editorIndex + ', ItemId=' + itemId + '）。', 'warn')
                                }

                                // 始终尝试更新隐藏的textarea作为兜底
                                if (itemId) {
                                    let textarea = $('#answer' + itemId)
                                    if (textarea.length > 0) {
                                        textarea.val(answerContent)
                                        try {
                                            if (textarea[0].value === answerContent) {
                                                textarea[0].dispatchEvent(new Event('change'))
                                                textarea[0].dispatchEvent(new Event('input'))
                                            }
                                        } catch (e) { /* empty */ }
                                    }
                                }
                            } catch (e) {
                                logger(_logP.QUIZ + '[错误] 填空填入异常：' + e.message + '。', 'error')
                            }
                        }, 500 * (i + 1))
                    })

                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time + 300 * editorBlocks.length)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            } else if (tkList && tkList.length > 0) {
                // 普通input模式（旧版页面）
                if ($(tkList[0]).val() && $(tkList[0]).val().trim() !== '' && !isRedoMode()) {
                    logger(_logP.QUIZ + '[跳过] 此题已作答。', 'skip');
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30);
                    break
                }
                getAnswer(_type, _question).then((agrs) => {
                    if (agrs == '暂无答案') {
                        logger(_logP.QUIZ + '[警告] AI答案无法匹配任何选项。', 'warn')
                        localStorage.setItem('GPTJsSetting.sub', false)
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        return
                    }
                    let answers = agrs.split('|')
                    let inputList = $(TimuList[index]).find('.blankList2 input')
                    $.each(inputList, (i, t) => {
                        setTimeout(() => {
                            $(t).val(answers[i] || answers[0] || agrs)
                            // 触发input事件以确保框架能够检测到值的变化
                            $(t).trigger('input').trigger('change')
                        }, 200)
                    })
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            } else {
                logger(_logP.QUIZ + '[错误] 未找到填空输入区域。', 'error')
                localStorage.setItem('GPTJsSetting.sub', false)
                setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
            }
            break
        }
        case 3: {
            _answerTmpArr = $(TimuList[index]).find('.answerList.panduan li')
            $.each(_answerTmpArr, (i, t) => {
                _a.push($(t).text().trim())
            })
            collectOptionHtml(_answerTmpArr);
            //判断题目是否已作答
            for (let i = 0; i < _answerTmpArr.length; i++) {
                if ($(_answerTmpArr[i]).attr('aria-label')) {
                    if (!isRedoMode()) {
                        logger(_logP.QUIZ + '[跳过] 第' + (index + 1) + '题 此题已作答。', 'skip')
                        check_answer_flag = 1;
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30)
                    } else {
                        logger(_logP.QUIZ + '[信息] 第' + (index + 1) + '题 此题已作答，重做模式下重新作答。', 'info')
                        // 重做模式：先取消已选选项
                        $(_answerTmpArr[i]).click()
                    }
                    break
                }
            }
            if (check_answer_flag == 0) {
                _question = buildPrompt({ type: '判断题', question: _question, answer_format: "只回答正确或错误" })
                getAnswer(_type, _question).then((agrs) => {
                    let judgeResult = parseJudgeAnswer(agrs)
                    if (judgeResult === null) {
                        logger(_logP.QUIZ + '[错误] 答案匹配过程出错。', 'error')
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        return
                    }
                    let _i = findJudgeOptionIndex(_a, judgeResult === 'true')
                    if (_i === -1) {
                        logger(_logP.QUIZ + '[警告] 未匹配到正确选项。', 'warn')
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        return
                    }
                    setTimeout(() => {
                        $(_answerTmpArr[_i]).click()
                        logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success')
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }, 300)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            }
            break
        }
        case 4: { // 简答题或材料题
            _question = buildPrompt({ type: '简答题或材料题', question: _question })

            // 查找可能的编辑器区域（通过data-editorindex）
            let jdEditorBlocks = $(TimuList[index]).find('[data-editorindex]')
            let jdTextareas = $(TimuList[index]).find('textarea[name^="answer"]')

            // 检查是否已作答
            let jdIsAnswered = false

            // 优先处理UEditor编辑器（手机页面）
            if (jdEditorBlocks && jdEditorBlocks.length > 0) {
                if (jdTextareas.length > 0 && $(jdTextareas[0]).val() && $(jdTextareas[0]).val().trim() !== '' && !isRedoMode()) {
                    logger(_logP.QUIZ + '[跳过] 第' + (index + 1) + '题 简答题已作答。', 'skip')
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30)
                    break
                }

                getAnswer(_type, _question).then((agrs) => {
                    if (agrs == '暂无答案') {
                        logger(_logP.QUIZ + '[警告] AI无法匹配答案，请手动完成。', 'warn')
                        localStorage.setItem('GPTJsSetting.sub', false)
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        return
                    }

                    // 获取第一个编辑器（简答题通常只有一个）
                    let firstBlock = jdEditorBlocks.first()
                    if (firstBlock.length > 0) {
                        let editorIndex = firstBlock.attr('data-editorindex')
                        let itemId = firstBlock.attr('data-itemid')
                        // 如果container上没有itemid，尝试从子元素或关联的textarea找
                        if (!itemId && jdTextareas.length > 0) {
                            let tid = $(jdTextareas[0]).attr('id')
                            if (tid) itemId = tid.replace('answer', '')
                        }

                        setTimeout(() => {
                            try {
                                let ueditor = null

                                // 1. 尝试通过 contextWindow.editors 获取
                                if (contextWindow.editors && contextWindow.editors[editorIndex]) {
                                    ueditor = contextWindow.editors[editorIndex].ueditor
                                }

                                // 2. 尝试通过 contextWindow.UE.instants 获取
                                if (!ueditor && contextWindow.UE && contextWindow.UE.instants) {
                                    let instantKey = 'ueditorInstant' + editorIndex
                                    ueditor = contextWindow.UE.instants[instantKey]
                                }

                                // 3. 尝试通过标准ID获取 (ananas-editor-answer + itemId)
                                if (!ueditor && itemId && contextWindow.UE && contextWindow.UE.getEditor) {
                                    ueditor = contextWindow.UE.getEditor('ananas-editor-answer' + itemId)
                                }

                                if (ueditor) {
                                    ueditor.setContent(agrs)
                                    logger(_logP.QUIZ + '[完成] 简答题已填入（EditorIndex=' + editorIndex + '）。', 'success')
                                } else {
                                    logger(_logP.QUIZ + '[警告] 简答题未找到编辑器实例（Index=' + editorIndex + ', ItemId=' + itemId + '）。', 'warn')
                                }

                                // 兜底：更新隐藏textarea
                                if (jdTextareas.length > 0) {
                                    let ta = $(jdTextareas[0])
                                    ta.val(agrs)
                                    // 触发change/input事件
                                    try {
                                        ta[0].dispatchEvent(new Event('change'))
                                        ta[0].dispatchEvent(new Event('input'))
                                    } catch (e) { /* empty */ }
                                }
                            } catch (e) {
                                logger(_logP.QUIZ + '[错误] 简答题填入异常：' + e.message + '。', 'error')
                                // 尝试直接设置textarea
                                if (jdTextareas.length > 0) {
                                    $(jdTextareas[0]).val(agrs)
                                    logger(_logP.QUIZ + '[信息] 简答题通过textarea填入答案。', 'info')
                                }
                            }
                        }, 500)
                    } else {
                        // Fallback direct textarea
                        if (jdTextareas.length > 0) {
                            $(jdTextareas[0]).val(agrs)
                            logger(_logP.QUIZ + '[信息] 简答题通过textarea填入答案。', 'info')
                        }
                    }

                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }
                })
            }
            // 如果没有编辑器，但有textarea，直接使用textarea
            else if (jdTextareas && jdTextareas.length > 0) {
                // 检查是否已作答
                if ($(jdTextareas[0]).val() && $(jdTextareas[0]).val().trim() !== '' && !isRedoMode()) {
                    logger(_logP.QUIZ + '[跳过] 第' + (index + 1) + '题 简答题已作答。', 'skip')
                    jdIsAnswered = true
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, 30)
                } else {
                    getAnswer(_type, _question).then((agrs) => {
                        if (agrs == '暂无答案') {
                            logger(_logP.QUIZ + '[警告] AI无法匹配答案，请手动完成。', 'warn')
                            localStorage.setItem('GPTJsSetting.sub', false)
                        } else {
                            $(jdTextareas[0]).val(agrs)
                            $(jdTextareas[0]).trigger('input').trigger('change')
                            logger(_logP.QUIZ + '[完成] 简答题自动答题成功。', 'success')
                        }
                        setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                    }).catch((agrs) => {
                        if (agrs && agrs['c'] == 0) {
                            setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                        }
                    })
                }
            }
            // 如果以上方法都失败
            else {
                logger(_logP.QUIZ + '[错误] 未找到简答题输入区域，请手动完成。', 'error')
                localStorage.setItem('GPTJsSetting.sub', false)
                setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
            }
            break
        }
        case 5: {
            getAnswer(_type, _question).then((agrs) => {
                // setting.sub = 0
                localStorage.setItem('GPTJsSetting.sub', false)
                logger(_logP.QUIZ + '[警告] 无法区分单/多选，请手动选择答案。', 'warn')
                setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
            }).catch((agrs) => {
                if (agrs['c'] == 0) {
                    setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
                }
            })
            break
        }
        default:
            logger(_logP.QUIZ + '[警告] 暂不支持此题目类型，请手动作答。', 'warn')
            // setting.sub = 0
            localStorage.setItem('GPTJsSetting.sub', false)
            setTimeout(() => { startDoPhoneTimu(index + 1, TimuList) }, setting.time)
            break
    }
}

// 轮询方式查找iframe内的元素
// 解决getElement使用MutationObserver在iframe文档替换时失效导致脚本卡死的问题
// 第四个参数 maxAttempts：最大轮询次数，超时返回 null（上层 if(!el) 会触发自身重试），避免永久卡死
function pollForElement(iframeDom, selector, interval, maxAttempts) {
    interval = interval || 2000;
    maxAttempts = (typeof maxAttempts === 'number' && maxAttempts > 0) ? maxAttempts : 60; // 默认 60 次 ≈ 2 分钟
    return new Promise(function (resolve) {
        var attempts = 0;
        var check = function () {
            try {
                var doc = $(iframeDom).contents()[0];
                if (doc) {
                    var el = doc.querySelector(selector);
                    if (el) return resolve(el);
                }
            } catch (e) { /* iframe未就绪或跨域 */ }
            attempts++;
            if (attempts >= maxAttempts) {
                logger(_logP.QUIZ + '[错误] 框架等待超时（' + Math.round(attempts * interval / 1000) + 's）。', 'error');
                return resolve(null);
            }
            if (attempts % 15 === 0) {
                logger(_logP.QUIZ + '[警告] 框架仍在加载，已等待' + (attempts * interval / 1000) + '秒。', 'warn');
            }
            setTimeout(check, interval);
        };
        check();
    });
}

// 后台标签页防休眠：用 Web Audio 静音振荡器维持音频上下文，缓解浏览器对隐藏标签页的节流。
// 已经被多个网课助手实践证明对超星视频任务在后台时进度回退/刷新不出问题有效。
// 浏览器策略要求自动播放需用户手势；首次失败时会挂监听到 click/keydown 上再试一次。
var _ne21AntiSleepStarted = false;
function setupAntiSleep() {
    if (_ne21AntiSleepStarted) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    function tryStart() {
        if (_ne21AntiSleepStarted) return;
        try {
            var ac = new AC();
            var osc = ac.createOscillator();
            var gain = ac.createGain();
            gain.gain.value = 0; // 完全静音
            osc.connect(gain);
            gain.connect(ac.destination);
            osc.start();
            _ne21AntiSleepStarted = true;
            // visibilitychange 后某些浏览器会 suspend AudioContext，主动恢复
            document.addEventListener('visibilitychange', function () {
                try { if (ac.state === 'suspended') ac.resume(); } catch (_) { /* empty */ }
            });
        } catch (_) { /* ignore */ }
    }
    tryStart();
    if (!_ne21AntiSleepStarted) {
        var onUserGesture = function () {
            tryStart();
            if (_ne21AntiSleepStarted) {
                document.removeEventListener('click', onUserGesture, true);
                document.removeEventListener('keydown', onUserGesture, true);
                document.removeEventListener('touchstart', onUserGesture, true);
            }
        };
        document.addEventListener('click', onUserGesture, true);
        document.addEventListener('keydown', onUserGesture, true);
        document.addEventListener('touchstart', onUserGesture, true);
    }
}

// 周期性自动刷新页面，防止脚本因不可恢复的 iframe 卡死/超星接口响应异常而死循环
// 默认关闭，需用户在 localStorage 写入 GPTJsSetting.autoRefresh=true 启用
// 默认 30 分钟，可通过 GPTJsSetting.autoRefreshMinutes 改写（最小 5 分钟）
function setupAutoRefresh() {
    var stored = localStorage.getItem('GPTJsSetting.autoRefresh');
    var enabled = stored !== null ? (stored === 'true') : false;
    if (!enabled) return;
    var minutes = parseInt(localStorage.getItem('GPTJsSetting.autoRefreshMinutes'), 10);
    if (!isFinite(minutes) || minutes < 5) minutes = 30;
    setTimeout(function () {
        logger(_logP.SYS + '[信息] 已达到自动刷新时间（' + minutes + '分钟），3秒后刷新页面。', 'info');
        setTimeout(function () { try { window.location.reload(); } catch (_) { /* empty */ } }, 3000);
    }, minutes * 60 * 1000);
}

function startDoPhoneCyWork(index, doms, phoneWeb) {
    if (index == doms.length) {
        logger(_logP.QUIZ + '[完成] 此页面全部测验已处理完毕。', 'success')
        setTimeout(missonStart, 5000)
        return
    }
    logger(_logP.QUIZ + '[信息] 等待测验框架加载。', 'info')
    pollForElement(doms[index], 'iframe').then(element => {
        let workIframe = element
        if (!workIframe) {
            setTimeout(() => { startDoPhoneCyWork(index, doms, phoneWeb) }, 5000)
            return
        }
        let workStatus = $(workIframe).contents().find('.newTestCon .newTestTitle .testTit_status').text().trim()
        if (!workStatus) {
            _domList.splice(0, 1)
            setTimeout(missonStart, 2000)
            return
        }
        if (isRedoMode() && workStatus.indexOf("已完成") != -1) {
            logger(_logP.QUIZ + '[信息] 测验' + (index + 1) + '：重做模式，重新处理已完成测验。', 'info')
            $(workIframe).attr('src', phoneWeb)
            getElement($(doms[index]).contents()[0], 'iframe[src="' + phoneWeb + '"]').then((element) => {
                setTimeout(() => { doPhoneWork($(element).contents()) }, 3000)
            })
        } else if (workStatus.indexOf("待做") != -1 || workStatus.indexOf("待完成") != -1 || workStatus.indexOf("重做") != -1 || workStatus.indexOf("未达到") != -1) {
            var isRedoStatus = workStatus.indexOf("重做") != -1 || workStatus.indexOf("未达到") != -1
            logger(_logP.QUIZ + '[信息] 测验' + (index + 1) + '：' + (isRedoStatus ? '未达及格线，重新处理' : '开始处理') + '。', 'info')
            $(workIframe).attr('src', phoneWeb)
            getElement($(doms[index]).contents()[0], 'iframe[src="' + phoneWeb + '"]').then((element) => {
                setTimeout(() => { doPhoneWork($(element).contents()) }, 3000)
            })
        } else if (workStatus.indexOf('待批阅') != -1) {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            logger(_logP.QUIZ + '[跳过] 测验' + (index + 1) + '：待批阅，已跳过。', 'skip')
            setTimeout(() => { startDoPhoneCyWork(index + 1, doms, phoneWeb) }, 5000)
        } else {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            logger(_logP.QUIZ + '[跳过] 测验' + (index + 1) + '：未知状态[' + workStatus + ']，已跳过。', 'skip')
            setTimeout(() => { startDoPhoneCyWork(index + 1, doms, phoneWeb) }, 5000)
        }
    })
}

function startDoCyWork(index, doms) {
    if (index == doms.length) {
        logger(_logP.QUIZ + '[完成] 此页面全部测验已处理完毕。', 'success')
        setTimeout(missonStart, 5000)
        return
    }
    logger(_logP.QUIZ + '[信息] 等待测验框架加载。', 'info')
    pollForElement(doms[index], 'iframe').then(element => {
        let workIframe = element
        if (!workIframe) {
            setTimeout(() => { startDoCyWork(index, doms) }, 5000)
            return
        }
        let workStatus = $(workIframe).contents().find(".newTestCon .newTestTitle .testTit_status").text().trim()
        if (!workStatus) {
            _domList.splice(0, 1)
            setTimeout(missonStart, 2000)
            return
        }
        if (isRedoMode() && workStatus.indexOf("已完成") != -1) {
            logger(_logP.QUIZ + '[信息] 测验' + (index + 1) + '：重做模式，重新处理已完成测验。', 'info')
            setTimeout(() => { doWork(index, doms, workIframe) }, 5000)
        } else if (workStatus.indexOf("待做") != -1 || workStatus.indexOf("待完成") != -1 || workStatus.indexOf("重做") != -1 || workStatus.indexOf("未达到") != -1) {
            var isRedoStatus = workStatus.indexOf("重做") != -1 || workStatus.indexOf("未达到") != -1
            logger(_logP.QUIZ + '[信息] 测验' + (index + 1) + '：' + (isRedoStatus ? '未达及格线，重新处理' : '开始处理') + '。', 'info')
            setTimeout(() => { doWork(index, doms, workIframe) }, 5000)
        } else if (workStatus.indexOf('待批阅') != -1) {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            logger(_logP.QUIZ + '[跳过] 测验' + (index + 1) + '：待批阅，已跳过。', 'skip')
            setTimeout(() => { startDoCyWork(index + 1, doms) }, 5000)
        } else {
            _mlist.splice(0, 1)
            _domList.splice(0, 1)
            logger(_logP.QUIZ + '[跳过] 测验' + (index + 1) + '：未知状态[' + workStatus + ']，已跳过。', 'skip')
            setTimeout(() => { startDoCyWork(index + 1, doms) }, 5000)
        }
    })
}



function getElement(parent, selector, timeout = 0) {
    /**
     * Author   cxxjackie
     * From     https://bbs.tampermonkey.net.cn
     */
    return new Promise(resolve => {
        var result = parent.querySelector(selector);
        if (result) return resolve(result);
        var timer;
        const mutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver;
        if (mutationObserver) {
            const observer = new mutationObserver(mutations => {
                for (var mutation of mutations) {
                    for (var addedNode of mutation.addedNodes) {
                        if (addedNode instanceof Element) {
                            result = addedNode.matches(selector) ? addedNode : addedNode.querySelector(selector);
                            if (result) {
                                observer.disconnect();
                                timer && clearTimeout(timer);
                                return resolve(result);
                            }
                        }
                    }
                }
            });
            observer.observe(parent, {
                childList: true,
                subtree: true
            });
            if (timeout > 0) {
                timer = setTimeout(() => {
                    observer.disconnect();
                    return resolve(null);
                }, timeout);
            }
        } else {
            const listener = e => {
                if (e.target instanceof Element) {
                    result = e.target.matches(selector) ? e.target : e.target.querySelector(selector);
                    if (result) {
                        parent.removeEventListener('DOMNodeInserted', listener, true);
                        timer && clearTimeout(timer);
                        return resolve(result);
                    }
                }
            };
            parent.addEventListener('DOMNodeInserted', listener, true);
            if (timeout > 0) {
                timer = setTimeout(() => {
                    parent.removeEventListener('DOMNodeInserted', listener, true);
                    return resolve(null);
                }, timeout);
            }
        }
    });
}

function missonHomeWork() {
    logger(_logP.HW + '[启动] 开始处理作业。', 'hili')
    let $_homeworktable = $('.mark_table').find('form')
    let TimuList = $_homeworktable.find('.questionLi')
    doHomeWork(0, TimuList)
}

function doHomeWork(index, TiMuList) {
    if (index == TiMuList.length) {
        logger(_logP.HW + '[完成] 作业题目已全部完成。', 'success')
        return
    }


    // Helper function for handling normal textareas
    function handleNormalTextarea(textareaList, jdt, index, TiMuList) {
        if (!textareaList || textareaList.length === 0) {
            setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
            return;
        }
        getAnswer(4, jdt).then((agrs) => {
            $.each(textareaList, (i, t) => {
                let _id = $(t).attr('id') || $(t).attr('name');
                setTimeout(() => {
                    try { UE.getEditor(_id).setContent(agrs) } catch (e) { /* ignore */ }
                }, 300 + i * 200);
            });
            logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success');
            setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time + 200 * textareaList.length);
        }).catch((agrs) => {
            if (agrs && agrs['c'] == 0) {
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
            }
        });
    }

    let typeName = $(TiMuList[index]).attr('typename');
    let _type = ({
        单选题: 0, 单项选择题: 0, 单选: 0,
        多选题: 1, 多项选择题: 1, 多选: 1,
        填空题: 2, 填空: 2,
        判断题: 3, 是非题: 3, 判断: 3,
        简答题: 4, 简答: 4, 问答题: 4, 名词解释: 4, 论述题: 4, 论述: 4,
        计算题: 4, 计算: 4, 分录题: 4, 资料题: 4, 作图题: 4, 其他: 4, 其它: 4, 阅读理解: 4, 阅读: 4, 阅读题: 4, 理解题: 4, 完形填空: 4, 完形: 4, 综合题: 4,
        写作题: 5,
        翻译题: 6
    })[typeName]
    _currentQuestionMeta = { index: index, total: TiMuList.length, typeName: typeName }
    let _questionFull = $(TiMuList[index]).find('.mark_name').html()
    let _question = tidyQuestion(_questionFull).replace(/^[(].*?[)]/, '').trim()
    let _a = []
    let _answerTmpArr, _textareaList
    var check_answer_flag = 0;

    // 如果题型不在预设类型中，根据DOM结构自动识别题型
    if (_type === undefined) {
        logger(_logP.QUIZ + '[信息] 尝试自动识别题型：' + typeName + '。', 'info');

        // 检查是否有选择题特征
        _answerTmpArr = $(TiMuList[index]).find('.stem_answer').find('.answer_p')
        if (_answerTmpArr && _answerTmpArr.length > 0) {
            _type = 0; // 假定为单选题

            // 检查是否有多个可选项
            let multiChoiceCheck = $(TiMuList[index]).find('.stem_answer input[type="checkbox"]');
            if (multiChoiceCheck && multiChoiceCheck.length > 0) {
                _type = 1; // 多选题
                logger(_logP.QUIZ + '[信息] 自动识别为多选题。', 'info');
            } else {
                logger(_logP.QUIZ + '[信息] 自动识别为单选题。', 'info');
            }
        }
        // 检查是否有文本输入框特征
        else {
            _textareaList = $(TiMuList[index]).find('.stem_answer').find('.subEditor textarea, .Answer .divText textarea, .Answer .divText .textDIV textarea, textarea[name^="answerEditor"], .edui-editor textarea');
            if (_textareaList && _textareaList.length > 0) {
                _type = 4; // 简答题
                logger(_logP.QUIZ + '[信息] 自动识别为简答题。', 'info');
            }
        }
    }

    switch (_type) {
        case 0: {
            _answerTmpArr = $(TiMuList[index]).find('.stem_answer').find('.answer_p')

            //遍历选项列表
            let mergedAnswers = [];
            let cleanOptions = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
                cleanOptions.push(answerText);
            });
            collectOptionHtml(_answerTmpArr);
            mergedAnswers = mergedAnswers.join("|");
            _question = buildPrompt({ type: '单选题', question: _question, options: mergedAnswers.split('|') })
            //判断题目是否已作答
            for (let i = 0; i < _answerTmpArr.length; i++) {
                if (($(_answerTmpArr[i]).parent().find('span').attr('class') || '').indexOf('check_answer') == -1) {
                    //没有被选择
                } else {
                    if (!isRedoMode()) {
                        logger(_logP.QUIZ + '[跳过] 第' + (index + 1) + '题 此题已作答。', 'skip')
                        check_answer_flag = 1;
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                    } else {
                        logger(_logP.QUIZ + '[信息] 第' + (index + 1) + '题 此题已作答，重做模式下重新作答。', 'info')
                        $(_answerTmpArr[i]).parent().click()
                    }
                    break
                }
            }
            if (check_answer_flag == 0) {
                getAnswer(_type, _question).then((agrs) => {
                    _a = cleanOptions.slice()
                    if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                        //修改题目将答案插入
                        let timuele = $(TiMuList[index]).find('.mark_name')
                        // logger("timuele题目标签:"+timuele.html())
                        timuele.html(timuele.html() + "<p></p>" + agrs)
                    }
                    let _i = matchAnswerToOptions(_a, agrs)

                    if (_i == -1) {
                        logger(_logP.QUIZ + '[警告] AI答案无法匹配任何选项。', 'warn')
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                    } else {
                        setTimeout(() => {
                            let check = $(_answerTmpArr[_i]).parent().find('span').attr('class') || ''
                            if (check.indexOf('check_answer') == -1) {
                                $(_answerTmpArr[_i]).parent().click()
                            }
                            logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success')
                            setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                        }, 300)
                    }
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                    }
                })
            }
        }
            break

        case 1: {
            _answerTmpArr = $(TiMuList[index]).find('.stem_answer').find('.answer_p')
            //遍历选项列表
            let mergedAnswers = [];
            let cleanMultiOptions = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
                cleanMultiOptions.push(answerText);
            });
            collectOptionHtml(_answerTmpArr);
            mergedAnswers = mergedAnswers.join("|");
            _question = buildPrompt({ type: '多选题', question: _question, options: mergedAnswers.split('|'), answer_format: "用'|'分割多个答案" })
            //判断题目是否已作答
            for (let i = 0; i < _answerTmpArr.length; i++) {
                if (($(_answerTmpArr[i]).parent().find('span').attr('class') || '').indexOf('check_answer') == -1) {
                    //没有被选择
                } else {
                    if (!isRedoMode()) {
                        logger(_logP.QUIZ + '[跳过] 第' + (index + 1) + '题 此题已作答。', 'skip')
                        check_answer_flag = 1;
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                        break
                    } else {
                        logger(_logP.QUIZ + '[信息] 第' + (index + 1) + '题 重做模式下取消旧答案。', 'info')
                        $(_answerTmpArr[i]).parent().click()
                        // 不break，继续取消其他已选选项
                    }
                }
            }
            if (check_answer_flag == 0) {
                getAnswer(_type, _question).then((agrs) => {
                    if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                        //修改题目将答案插入
                        let timuele = $(TiMuList[index]).find('.mark_name')
                        // logger("timuele题目标签:"+timuele.html())
                        timuele.html(timuele.html() + "<p></p>" + agrs)
                    }
                    let _multiOptions = cleanMultiOptions.slice()
                    let _matchedAny = false
                    $.each(_answerTmpArr, (i, t) => {
                        if (agrs.indexOf(_multiOptions[i]) != -1) {
                            _matchedAny = true
                            setTimeout(() => {
                                let check = $(_answerTmpArr[i]).parent().find('span').attr('class') || ''
                                if (check.indexOf('check_answer_dx') == -1) {
                                    $(_answerTmpArr[i]).parent().click()
                                }
                            }, 300)
                        }
                    });
                    // 如果精确匹配没有命中任何选项，尝试模糊匹配
                    if (!_matchedAny) {
                        let fuzzyIndices = findFuzzyMatchMultiple(_multiOptions, agrs)
                        for (var fi = 0; fi < fuzzyIndices.length; fi++) {
                            (function (idx) {
                                setTimeout(function () {
                                    let check = $(_answerTmpArr[idx]).parent().find('span').attr('class') || ''
                                    if (check.indexOf('check_answer_dx') == -1) {
                                        $(_answerTmpArr[idx]).parent().click()
                                    }
                                }, 300)
                            })(fuzzyIndices[fi])
                        }
                    }
                    logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success')
                    setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                    }
                })
            }
        }
            break
        case 2: {
            _question = buildPrompt({ type: '填空题', question: _question, answer_format: "用'|'分割多个答案" });
            _textareaList = findAnswerTextareas($(TiMuList[index]));
            if (!_textareaList || _textareaList.length === 0) {
                logger(_logP.QUIZ + '[错误] 未找到填空输入区域。', 'error');
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
                break
            }
            // 判断题目是否已作答（用 try/catch 防止 UE.getEditor 抛错；id 为空则回退 name）
            let _id = $(_textareaList[0]).attr('id') || $(_textareaList[0]).attr('name');
            let firstAnswered = false;
            try {
                if (_id && UE.getEditor(_id) && UE.getEditor(_id).getContent && UE.getEditor(_id).getContent() !== '') firstAnswered = true;
            } catch (e) { firstAnswered = false; }
            if (firstAnswered && !isRedoMode()) {
                logger(_logP.QUIZ + '[跳过] 第' + (index + 1) + '题 此题已作答。', 'skip');
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30);
            } else {
                getAnswer(_type, _question).then((agrs) => {
                    let _answerTmpArr = (agrs || '').split('|');
                    $.each(_textareaList, (i, t) => {
                        let _currentId = $(t).attr('id') || $(t).attr('name');
                        let val = _answerTmpArr[i] !== undefined ? _answerTmpArr[i] : (_answerTmpArr[0] || agrs);
                        setTimeout(() => {
                            try { UE.getEditor(_currentId).setContent(val) } catch (e) { /* ignore */ }
                        }, 300 + i * 200);
                    });
                    setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time + 200 * _textareaList.length);
                    logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success');
                }).catch((agrs) => {
                    if (agrs && agrs['c'] == 0) {
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
                    }
                });
            }
            break
        }
        case 3: {
            _answerTmpArr = $(TiMuList[index]).find('.stem_answer').find('.answer_p')
            $.each(_answerTmpArr, (i, t) => {
                _a.push($(t).text().trim())
            })
            collectOptionHtml(_answerTmpArr);
            //判断题目是否已作答
            for (let i = 0; i < _answerTmpArr.length; i++) {
                if (($(_answerTmpArr[i]).parent().find('span').attr('class') || '').indexOf('check_answer') == -1) {
                    //没有被选择
                } else {
                    if (!isRedoMode()) {
                        logger(_logP.QUIZ + '[跳过] 第' + (index + 1) + '题 此题已作答。', 'skip')
                        check_answer_flag = 1;
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                    } else {
                        logger(_logP.QUIZ + '[信息] 第' + (index + 1) + '题 此题已作答，重做模式下重新作答。', 'info')
                        $(_answerTmpArr[i]).parent().click()
                    }
                    break
                }
            }
            if (check_answer_flag == 0) {
                _question = buildPrompt({ type: '判断题', question: _question, answer_format: "只回答正确或错误" })
                getAnswer(_type, _question).then((agrs) => {
                    if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                        let timuele = $(TiMuList[index]).find('.mark_name')
                        timuele.html(timuele.html() + "<p></p>" + agrs)
                    }
                    let judgeResult = parseJudgeAnswer(agrs)
                    if (judgeResult === null) {
                        logger(_logP.QUIZ + '[错误] 答案匹配过程出错。', 'error')
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                        return
                    }
                    let _i = findJudgeOptionIndex(_a, judgeResult === 'true')
                    if (_i === -1) {
                        logger(_logP.QUIZ + '[警告] 未匹配到正确选项。', 'warn')
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                        return
                    }
                    setTimeout(() => {
                        let check = $(_answerTmpArr[_i]).parent().find('span').attr('class') || ''
                        if (check.indexOf('check_answer') == -1) {
                            $(_answerTmpArr[_i]).parent().click()
                        }
                    }, 300)
                    logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success')
                    setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                }).catch((agrs) => {
                    if (agrs['c'] == 0) {
                        setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                    }
                })
            }
            break
        }
        case 4: {
            let _answerEle = findAnswerTextareas($(TiMuList[index]))
            if (!_answerEle || _answerEle.length === 0) {
                logger(_logP.HW + '[错误] 第' + (index + 1) + '题 未找到文本作答区域。', 'error')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                break
            }
            let _isAnswered4 = false
            $.each(_answerEle, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnswered4 = true } catch (e) { /* ignore */ }
            })
            if (_isAnswered4 && !isRedoMode()) {
                logger(_logP.HW + '[跳过] 第' + (index + 1) + '题 此题已作答。', 'skip')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                break
            }
            let jdt = buildPrompt({ type: typeName || '简答题', question: _question, answer_format: "用50字简要回答" })
            getAnswer(_type, jdt).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $(TiMuList[index]).find('.mark_name')
                    timuele.html(timuele.html() + "<p></p>" + agrs)
                }
                $.each(_answerEle, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) { /* ignore */ }
                    }, 300 + i * 200);
                });
                logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time + 200 * _answerEle.length);
            }).catch(() => {
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
            });
        }
            break
        case 5: {
            let _answerEle5 = findAnswerTextareas($(TiMuList[index]))
            if (!_answerEle5 || _answerEle5.length === 0) {
                logger(_logP.HW + '[错误] 第' + (index + 1) + '题 未找到写作题文本框。', 'error')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                break
            }
            // 已作答检测
            let _isAnswered5 = false
            $.each(_answerEle5, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnswered5 = true } catch (e) { /* ignore */ }
            })
            if (_isAnswered5 && !isRedoMode()) {
                logger(_logP.HW + '[跳过] 第' + (index + 1) + '题 此题已作答。', 'skip')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                break
            }
            let jdt5 = buildPrompt({ type: typeName || '写作题', question: _question, answer_format: "用英文根据题目进行写作" })
            getAnswer(_type, jdt5).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $(TiMuList[index]).find('.mark_name')
                    timuele.html(timuele.html() + "<p></p>" + agrs)
                }
                $.each(_answerEle5, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) { /* ignore */ }
                    }, 300 + i * 200);
                });
                logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time + 200 * _answerEle5.length);
            }).catch(() => {
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
            });
        }
            break
        case 6: {
            let _answerEle6 = findAnswerTextareas($(TiMuList[index]))
            if (!_answerEle6 || _answerEle6.length === 0) {
                logger(_logP.HW + '[错误] 第' + (index + 1) + '题 未找到翻译题文本框。', 'error')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
                break
            }
            // 已作答检测
            let _isAnswered6 = false
            $.each(_answerEle6, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnswered6 = true } catch (e) { /* ignore */ }
            })
            if (_isAnswered6 && !isRedoMode()) {
                logger(_logP.HW + '[跳过] 第' + (index + 1) + '题 此题已作答。', 'skip')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, 30)
                break
            }
            let jdt6 = buildPrompt({ type: typeName || '翻译题', question: _question, answer_format: "中文英文互译" })
            getAnswer(_type, jdt6).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $(TiMuList[index]).find('.mark_name')
                    timuele.html(timuele.html() + "<p></p>" + agrs)
                }
                $.each(_answerEle6, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) { /* ignore */ }
                    }, 300 + i * 200);
                });
                logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time + 200 * _answerEle6.length);
            }).catch(() => {
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
            });
        }
            break
        default: {
            if (_type === undefined) {
                logger(_logP.QUIZ + '[警告] 无法识别题型：' + typeName + '。', 'warn')
                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time)
            } else {
                // 尝试获取文本输入区域
                _textareaList = $(TiMuList[index]).find('.stem_answer').find('textarea, .subEditor textarea, .divText textarea, .eidtDiv textarea, .divText .edui-editor, textarea[name^="answerEditor"]');
                if (_textareaList && _textareaList.length > 0) {
                    logger(_logP.QUIZ + '[信息] 检测到文本输入区域，尝试回答。', 'info');
                    let jdt = buildPrompt({ type: typeName || '未知题型', question: _question, answer_format: "请根据题目作答" })

                    // 检查是否有富文本编辑器特有的textarea
                    let editorTextareas = $(TiMuList[index]).find('.stem_answer textarea[name^="answerEditor"]');
                    if (editorTextareas && editorTextareas.length > 0) {
                        // 使用富文本编辑器ID
                        let editorId = $(editorTextareas[0]).attr('id');
                        if (editorId) {
                            getAnswer(_type || 4, jdt).then((agrs) => {
                                setTimeout(() => { UE.getEditor(editorId).setContent(agrs) }, 300);
                                logger(_logP.QUIZ + '[完成] 使用富文本编辑器回答成功。', 'success');
                                setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
                            }).catch((agrs) => {
                                if (agrs['c'] == 0) {
                                    setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
                                }
                            });
                        } else {
                            logger(_logP.QUIZ + '[警告] 富文本编辑器无法获取ID，改用普通方法。', 'warn');
                            // 如果没有ID，退回到常规处理
                            handleNormalTextarea(_textareaList, jdt, index, TiMuList);
                        }
                    } else {
                        // 处理普通文本输入区域
                        handleNormalTextarea(_textareaList, jdt, index, TiMuList);
                    }


                } else {
                    logger(_logP.QUIZ + '[警告] 无法处理此题型：' + typeName + '。', 'warn');
                    setTimeout(() => { doHomeWork(index + 1, TiMuList) }, setting.time);
                }
            }
        }
    }
}

function missonExam() {
    let $_examtable = $('.mark_table').find('.whiteDiv')
    let _questionFull = tidyStr($_examtable.find('h3.mark_name').html().trim())
    let typeName = _questionFull.match(/[(](.*?),.*?分[)]|$/)[1];
    let _qType = ({
        单选题: 0, 单项选择题: 0, 单选: 0,
        多选题: 1, 多项选择题: 1, 多选: 1,
        填空题: 2, 填空: 2,
        判断题: 3, 是非题: 3, 判断: 3,
        简答题: 4, 简答: 4, 问答题: 4, 名词解释: 4, 论述题: 4, 论述: 4,
        计算题: 4, 计算: 4, 分录题: 4, 资料题: 4, 作图题: 4, 其他: 4, 其它: 4, 阅读理解: 4, 阅读: 4, 阅读题: 4, 理解题: 4, 完形填空: 4, 完形: 4, 综合题: 4,
        写作题: 5,
        翻译题: 6
    })[typeName]
    // 尝试从导航栏获取当前题号
    let _examCurIdx = null
    try {
        let $curLi = $('.mark_table .mark_li_list li.active, .mark_table .mark_li_list li.current')
        if ($curLi.length) _examCurIdx = parseInt($curLi.text().trim()) - 1
    } catch (_) { /* empty */ }
    _currentQuestionMeta = { index: isFinite(_examCurIdx) ? _examCurIdx : null, total: null, typeName: typeName }
    let _question = tidyQuestion(_questionFull.replace(/[(].*?分[)]/, '').replace(/^\s*/, ''))
    let $_ansdom = $_examtable.find('#submitTest').find('.stem_answer')
    let _answerTmpArr;
    let _a = []

    function handleStandardExamTextarea(standardTextareas, _question) {
        logger(_logP.QUIZ + '[信息] 检测到标准文本输入区域，尝试回答。', 'info');
        let jdt = buildPrompt({ type: typeName || '未知题型', question: _question, answer_format: "请根据题目作答" })
        getAnswer(4, jdt).then((agrs) => {
            $.each(standardTextareas, (i, t) => {
                let _id = $(t).attr('id')
                setTimeout(() => { UE.getEditor(_id).setContent(agrs) }, 300)
            })
            logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success')
            toNextExam()
        }).catch((agrs) => {
            if (agrs['c'] == 0) {
                toNextExam()
            }
        })
    }

    // 如果题型不在预设类型中，根据DOM结构自动识别题型
    if (_qType === undefined) {
        logger(_logP.QUIZ + '[信息] 尝试自动识别题型：' + typeName + '。', 'info');

        // 检查是否有选择题特征
        _answerTmpArr = $_ansdom.find('.clearfix.answerBg .fl.answer_p');
        if (_answerTmpArr && _answerTmpArr.length > 0) {
            _qType = 0; // 假定为单选题

            // 检查是否有多个可选项
            let multiChoiceCheck = $_ansdom.find('.clearfix.answerBg input[type="checkbox"]');
            if (multiChoiceCheck && multiChoiceCheck.length > 0) {
                _qType = 1; // 多选题
                logger(_logP.QUIZ + '[信息] 自动识别为多选题。', 'info');
            } else {
                logger(_logP.QUIZ + '[信息] 自动识别为单选题。', 'info');
            }
        }
        // 检查是否有文本输入框特征
        else {
            let _textareaList = $_ansdom.find('.Answer .divText .subEditor textarea, .Answer .divText .edui-editor, .Answer .divText textarea, textarea[name^="answerEditor"]');
            if (_textareaList && _textareaList.length > 0) {
                _qType = 4; // 简答题
                logger(_logP.QUIZ + '[信息] 自动识别为简答题。', 'info');
            }
        }
    }

    switch (_qType) {
        case 0: {
            _answerTmpArr = $_ansdom.find('.clearfix.answerBg .fl.answer_p')
            // 已作答前置检查：兼容 check_answer 与 check_answer_dx（indexOf('check_answer') 都能命中）
            let _answeredIdxE0 = -1
            for (let _ai = 0; _ai < _answerTmpArr.length; _ai++) {
                let _cls = $(_answerTmpArr[_ai]).parent().find('span').attr('class') || ''
                if (_cls.indexOf('check_answer') !== -1) { _answeredIdxE0 = _ai; break }
            }
            if (_answeredIdxE0 !== -1 && !isRedoMode()) {
                logger(_logP.QUIZ + '[跳过] 此题已作答。', 'skip')
                toNextExam()
                break
            }
            if (_answeredIdxE0 !== -1 && isRedoMode()) {
                logger(_logP.QUIZ + '[信息] 此题已作答，重做模式下重新作答。', 'info')
                $(_answerTmpArr[_answeredIdxE0]).parent().click()
            }
            //遍历选项列表
            let mergedAnswers = [];
            let cleanOptions = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
                cleanOptions.push(answerText);
            });
            collectOptionHtml(_answerTmpArr);
            mergedAnswers = mergedAnswers.join("|");
            _question = buildPrompt({ type: '单选题', question: _question, options: mergedAnswers.split('|') })
            getAnswer(_qType, _question).then((agrs) => {
                _a = cleanOptions.slice()
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    //修改题目将答案插入
                    let timuele = $_examtable.find('h3.mark_name')
                    // logger(timuele.html())
                    timuele.html(timuele.html() + agrs)
                }

                let _i = matchAnswerToOptions(_a, agrs)
                if (_i == -1) {
                    logger(_logP.QUIZ + '[警告] AI答案无法匹配任何选项。', 'warn')
                    setTimeout(toNextExam, 5000)
                } else {
                    setTimeout(() => {
                        if (($(_answerTmpArr[_i]).parent().find('span').attr('class') || '').indexOf('check_answer') == -1) {
                            //好学生模式,ABCD加粗
                            if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                                $(_answerTmpArr[_i]).parent().find('span').css('font-weight', 'bold');
                            } else {
                                setTimeout(() => { $(_answerTmpArr[_i]).parent().click() }, 300)
                            }
                            logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success')
                            toNextExam()
                        } else {
                            logger(_logP.QUIZ + '[跳过] 此题已作答。', 'skip')
                            toNextExam()
                        }
                    }, 300)
                }
            }).catch((agrs) => {
                if (agrs['c'] == 0) {
                    toNextExam()
                }
            })
        }
            break
        case 1: {
            _answerTmpArr = $_ansdom.find('.clearfix.answerBg .fl.answer_p')
            // 已作答前置检查（多选用 check_answer_dx）
            let _alreadyAnsweredE1 = $_ansdom.find('.clearfix.answerBg span.check_answer_dx, .clearfix.answerBg span.check_answer').length > 0
            if (_alreadyAnsweredE1 && !isRedoMode()) {
                logger(_logP.QUIZ + '[跳过] 此题已作答。', 'skip')
                toNextExam()
                break
            }
            if (_alreadyAnsweredE1 && isRedoMode()) {
                logger(_logP.QUIZ + '[信息] 此题已作答，重做模式下重新作答。', 'info')
                $.each(_answerTmpArr, function (_i2, _t2) {
                    var _cls2 = $(_t2).parent().find('span').attr('class') || ''
                    if (_cls2.indexOf('check_answer') !== -1) {
                        $(_t2).parent().click()
                    }
                })
            }
            //遍历选项列表
            let mergedAnswers = [];
            let cleanMultiOptions = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
                cleanMultiOptions.push(answerText);
            });
            collectOptionHtml(_answerTmpArr);
            mergedAnswers = mergedAnswers.join("|");
            _question = buildPrompt({ type: '多选题', question: _question, options: mergedAnswers.split('|'), answer_format: "用'|'分割多个答案" })
            getAnswer(_qType, _question).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    //修改题目将答案插入
                    let timuele = $_examtable.find('h3.mark_name')
                    // logger(timuele.html())
                    timuele.html(timuele.html() + agrs)
                }

                {
                    let _multiOptions = cleanMultiOptions.slice()
                    let _matchedAny = false
                    $.each(_answerTmpArr, (i, t) => {
                        if (agrs.indexOf(_multiOptions[i]) != -1) {
                            _matchedAny = true
                            //好学生模式,ABCD加粗
                            if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                                $(_answerTmpArr[i]).parent().find('span').css('font-weight', 'bold');
                            } else {
                                setTimeout(() => { $(_answerTmpArr[i]).parent().click() }, 300)
                            }
                        }
                    });
                    // 如果精确匹配没有命中任何选项，尝试模糊匹配
                    if (!_matchedAny) {
                        let fuzzyIndices = findFuzzyMatchMultiple(_multiOptions, agrs)
                        for (var fi = 0; fi < fuzzyIndices.length; fi++) {
                            (function (idx) {
                                if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                                    $(_answerTmpArr[idx]).parent().find('span').css('font-weight', 'bold');
                                } else {
                                    setTimeout(function () { $(_answerTmpArr[idx]).parent().click() }, 300)
                                }
                            })(fuzzyIndices[fi])
                        }
                    }
                    logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success')
                    toNextExam()
                }
            }).catch((agrs) => {
                if (agrs['c'] == 0) {
                    toNextExam()
                }
            })
        }
            break
        case 2: {
            let _textareaList = $_ansdom.find('.Answer .divText .subEditor textarea')
            // 已作答前置检查：任一 textarea 已有内容即视为已作答
            let _alreadyAnsweredE2 = false
            $.each(_textareaList, function (_i2, _t2) {
                let _eid = $(_t2).attr('id')
                try {
                    if (_eid && typeof UE !== 'undefined' && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') {
                        _alreadyAnsweredE2 = true
                    }
                } catch (_e) { /* ignore */ }
            })
            if (_alreadyAnsweredE2 && !isRedoMode()) {
                logger(_logP.QUIZ + '[跳过] 此题已作答。', 'skip')
                toNextExam()
                break
            }
            if (_alreadyAnsweredE2 && isRedoMode()) {
                logger(_logP.QUIZ + '[信息] 此题已作答，重做模式下重新作答。', 'info')
                $.each(_textareaList, function (_i2, _t2) {
                    let _eid = $(_t2).attr('id')
                    try { if (_eid && UE.getEditor(_eid)) UE.getEditor(_eid).setContent('') } catch (_e) { /* ignore */ }
                })
            }
            _question = buildPrompt({ type: '填空题', question: _question, answer_format: "用'|'分割多个答案" });
            // logger(_textareaList)
            getAnswer(_qType, _question).then((agrs) => {
                let _answerTmpArr = agrs.split('|')
                $.each(_textareaList, (i, t) => {
                    let _id = $(t).attr('id')
                    setTimeout(() => { UE.getEditor(_id).setContent(_answerTmpArr[i]) }, 300)
                })
                logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success')
                toNextExam()
            }).catch((agrs) => {
                if (agrs && agrs['c'] == 0) { toNextExam() }
            })
            break
        }
        case 3: {
            _answerTmpArr = $_ansdom.find('.clearfix.answerBg .fl.answer_p')
            collectOptionHtml(_answerTmpArr);
            // 已作答前置检查
            let _answeredIdxE3 = -1
            for (let _ai = 0; _ai < _answerTmpArr.length; _ai++) {
                let _cls = $(_answerTmpArr[_ai]).parent().find('span').attr('class') || ''
                if (_cls.indexOf('check_answer') !== -1) { _answeredIdxE3 = _ai; break }
            }
            if (_answeredIdxE3 !== -1 && !isRedoMode()) {
                logger(_logP.QUIZ + '[跳过] 此题已作答。', 'skip')
                toNextExam()
                break
            }
            if (_answeredIdxE3 !== -1 && isRedoMode()) {
                logger(_logP.QUIZ + '[信息] 此题已作答，重做模式下重新作答。', 'info')
                $(_answerTmpArr[_answeredIdxE3]).parent().click()
            }
            _question = buildPrompt({ type: '判断题', question: _question, answer_format: "只回答正确或错误" });
            $.each(_answerTmpArr, (i, t) => {
                _a.push($(t).text().trim())
            })
            getAnswer(_qType, _question).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    //修改题目将答案插入
                    let timuele = $_examtable.find('h3.mark_name')
                    timuele.html(timuele.html() + agrs)
                }

                let judgeResult = parseJudgeAnswer(agrs)
                if (judgeResult === null) {
                    logger(_logP.QUIZ + '[错误] 答案匹配过程出错。', 'error')
                    toNextExam()
                    return
                }
                let _i = findJudgeOptionIndex(_a, judgeResult === 'true')
                if (_i === -1) {
                    logger(_logP.QUIZ + '[警告] 未匹配到正确选项。', 'warn')
                    toNextExam()
                    return
                }
                if (($(_answerTmpArr[_i]).parent().find('span').attr('class') || '').indexOf('check_answer') == -1) {
                    //好学生模式,ABCD加粗
                    if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                        setTimeout(() => { $(_answerTmpArr[_i]).parent().find('span').css('font-weight', 'bold'); }, 300)
                    } else {
                        $(_answerTmpArr[_i]).parent().click()
                    }
                    logger(_logP.QUIZ + '[完成] 自动答题成功。', 'success')
                    toNextExam()
                } else {
                    logger(_logP.QUIZ + '[跳过] 此题已作答。', 'skip')
                    toNextExam()
                }
            }).catch((agrs) => {
                if (agrs['c'] == 0) {
                    toNextExam()
                }
            })
            break
        }
        case 4: {
            let _answerEle = findAnswerTextareas($_ansdom)
            if (!_answerEle || _answerEle.length === 0) { toNextExam(); break }
            // 已作答检测
            let _isAnsweredE4 = false
            $.each(_answerEle, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnsweredE4 = true } catch (e) { /* ignore */ }
            })
            if (_isAnsweredE4 && !isRedoMode()) {
                logger(_logP.QUIZ + '[跳过] 此题已作答。', 'skip')
                toNextExam()
                break
            }
            let jdt = buildPrompt({ type: typeName || '简答题', question: _question, answer_format: "用50字简要回答" })
            getAnswer(_qType, jdt).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $_examtable.find('h3.mark_name')
                    timuele.html(timuele.html() + agrs)
                }
                $.each(_answerEle, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) { /* ignore */ }
                    }, 300 + i * 200);
                });
                setTimeout(toNextExam, 300 + 200 * _answerEle.length);
            }).catch(() => { toNextExam(); });
        }
            break
        case 5: {
            let _answerEle = findAnswerTextareas($_ansdom)
            if (!_answerEle || _answerEle.length === 0) { toNextExam(); break }
            // 已作答检测
            let _isAnsweredE5 = false
            $.each(_answerEle, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnsweredE5 = true } catch (e) { /* ignore */ }
            })
            if (_isAnsweredE5 && !isRedoMode()) {
                logger(_logP.QUIZ + '[跳过] 此题已作答。', 'skip')
                toNextExam()
                break
            }
            let jdt = buildPrompt({ type: typeName || '写作题', question: _question, answer_format: "用英文根据题目进行写作" })
            getAnswer(_qType, jdt).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $_examtable.find('h3.mark_name')
                    timuele.html(timuele.html() + agrs)
                }
                $.each(_answerEle, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) { /* ignore */ }
                    }, 300 + i * 200);
                });
                setTimeout(toNextExam, 300 + 200 * _answerEle.length);
            }).catch(() => { toNextExam(); });
        }
            break
        case 6: {
            let _answerEle = findAnswerTextareas($_ansdom)
            if (!_answerEle || _answerEle.length === 0) { toNextExam(); break }
            // 已作答检测
            let _isAnsweredE6 = false
            $.each(_answerEle, function (i, t) {
                let _eid = $(t).attr('id') || $(t).attr('name')
                try { if (_eid && UE.getEditor(_eid) && UE.getEditor(_eid).getContent && UE.getEditor(_eid).getContent() !== '') _isAnsweredE6 = true } catch (e) { /* ignore */ }
            })
            if (_isAnsweredE6 && !isRedoMode()) {
                logger(_logP.QUIZ + '[跳过] 此题已作答。', 'skip')
                toNextExam()
                break
            }
            let jdt = buildPrompt({ type: typeName || '翻译题', question: _question, answer_format: "中文英文互译" })
            getAnswer(_qType, jdt).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $_examtable.find('h3.mark_name')
                    timuele.html(timuele.html() + agrs)
                }
                $.each(_answerEle, (i, t) => {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(() => {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) { /* ignore */ }
                    }, 300 + i * 200);
                });
                setTimeout(toNextExam, 300 + 200 * _answerEle.length);
            }).catch(() => { toNextExam(); });
        }
            break
        default: {
            if (_qType === undefined) {
                logger(_logP.QUIZ + '[警告] 无法识别题型：' + typeName + '。', 'warn')
                toNextExam()
            } else {
                // 尝试获取文本输入区域
                // 查找所有可能的文本输入区域
                let standardTextareas = $_ansdom.find('.Answer .divText .subEditor textarea');
                let richEditors = $_ansdom.find('.Answer .divText .edui-editor');

                // 首先检查是否有材料题特有的富文本编辑器textarea
                let editorTextareas = $_ansdom.find('textarea[name^="answerEditor"]');

                if (editorTextareas && editorTextareas.length > 0) {
                    logger(_logP.QUIZ + '[信息] 检测到材料题富文本编辑器，尝试回答。', 'info');
                    let editorId = $(editorTextareas[0]).attr('id');
                    if (editorId) {
                        let jdt = buildPrompt({ type: '材料题', question: _question, answer_format: "请根据材料详细回答" })
                        getAnswer(4, jdt).then((agrs) => {
                            setTimeout(() => { UE.getEditor(editorId).setContent(agrs) }, 300);
                            logger(_logP.QUIZ + '[完成] 材料题自动答题成功。', 'success');
                            toNextExam();
                        }).catch((agrs) => {
                            if (agrs['c'] == 0) {
                                toNextExam();
                            }
                        });
                    } else {
                        logger(_logP.QUIZ + '[警告] 材料题编辑器无法获取ID，尝试其他方法。', 'warn');
                        handleStandardExamTextarea(standardTextareas, _question);
                    }
                }
                // 处理标准文本区域
                else if (standardTextareas && standardTextareas.length > 0) {
                    handleStandardExamTextarea(standardTextareas, _question);
                }
                // 处理其他类型的富文本编辑器
                else if (richEditors && richEditors.length > 0) {
                    logger(_logP.QUIZ + '[信息] 检测到富文本编辑器，尝试查找编辑器ID。', 'info');

                    // 尝试在页面中查找所有可能的编辑器ID
                    let editorScripts = $('script:contains("UE.getEditor")');
                    let editorIdMatch = null;

                    if (editorScripts && editorScripts.length > 0) {
                        // 从脚本中提取编辑器ID
                        let scriptContent = editorScripts.text();
                        let matches = scriptContent.match(/UE\.getEditor\(['"](.*?)['"]/);
                        if (matches && matches.length > 1) {
                            editorIdMatch = matches[1];
                            logger(_logP.QUIZ + '[信息] 从脚本中发现编辑器ID：' + editorIdMatch + '。', 'info');
                        }
                    }

                    if (editorIdMatch) {
                        let jdt = buildPrompt({ type: '材料题', question: _question, answer_format: "请根据材料详细回答" })
                        getAnswer(4, jdt).then((agrs) => {
                            setTimeout(() => { UE.getEditor(editorIdMatch).setContent(agrs) }, 300);
                            logger(_logP.QUIZ + '[完成] 使用编辑器ID回答成功。', 'success');
                            toNextExam();
                        }).catch((agrs) => {
                            if (agrs['c'] == 0) {
                                toNextExam();
                            }
                        });
                    } else {
                        logger(_logP.QUIZ + '[错误] 无法找到有效的编辑器ID。', 'error');
                        toNextExam();
                    }
                }
                else {
                    logger(_logP.QUIZ + '[警告] 无法处理此题型：' + typeName + '。', 'warn');
                    toNextExam();
                }


            }
        }
    }
}


function toNextExam() {
    if (localStorage.getItem('GPTJsSetting.examTurn') === 'true') {
        let $_examtable = $('.mark_table').find('.whiteDiv')
        let $nextbtn = $_examtable.find('.nextDiv a.jb_btn')
        setTimeout(() => {
            $nextbtn.click()
        }, setting.examTurnTime ? 2000 + (Math.floor(Math.random() * 5 + 1) * 1000) : 2000)
    } else {
        logger(_logP.QUIZ + '[跳过] 用户设置不自动跳转下一题。', 'skip')
    }
}

// ============== 整卷预览页面（一页多题）自动答题 ==============
// 适配 /mooc-ans/mooc2/exam/preview 与 /ans/mooc2/exam/preview
// 不自动跳转、不自动交卷；叠加随机抖动
function missonExamPreview() {
    logger(_logP.EXAM + '[启动] 进入整卷预览页面，开始处理考试。', 'hili')
    let TiMuList = $('.mark_table').find('.questionLi')
    if (!TiMuList || TiMuList.length === 0) {
        logger(_logP.EXAM + '[错误] 未解析到题目，请确认页面已渲染。', 'error')
        return
    }
    logger(_logP.EXAM + '[信息] 共解析到' + TiMuList.length + '道题。', 'info')
    doExamPreview(0, TiMuList)
}

// 题间间隔：基础 setting.time + 0~1500ms 抖动，模仿真人节奏
function getExamPreviewDelay() {
    let base = (setting && setting.time) ? setting.time : 2500
    return base + Math.floor(Math.random() * 1500)
}

// 解析 questionLi 题型：返回 { type: 0~6 | undefined, typeName: string }
function getExamPreviewType($timu) {
    let typeMap = {
        单选题: 0, 单项选择题: 0, 单选: 0,
        多选题: 1, 多项选择题: 1, 多选: 1,
        填空题: 2, 填空: 2,
        判断题: 3, 是非题: 3, 判断: 3,
        简答题: 4, 简答: 4, 问答题: 4, 名词解释: 4, 论述题: 4, 论述: 4,
        计算题: 4, 计算: 4, 分录题: 4, 资料题: 4, 作图题: 4, 其他: 4, 其它: 4, 阅读理解: 4, 阅读: 4, 阅读题: 4, 理解题: 4, 完形填空: 4, 完形: 4, 综合题: 4,
        写作题: 5,
        翻译题: 6
    }
    let typeName = $timu.attr('typename')
    if (typeName && typeMap[typeName] !== undefined) {
        return { type: typeMap[typeName], typeName: typeName }
    }
    let prefixText = $timu.find('.colorShallow').text() || $timu.find('.mark_name').text() || ''
    let m = prefixText.match(/(单选题|多选题|填空题|判断题|简答题|论述题|写作题|翻译题)/)
    if (m && typeMap[m[1]] !== undefined) {
        return { type: typeMap[m[1]], typeName: m[1] }
    }
    let qid = $timu.attr('data') || $timu.find('.questionId').val() || $timu.find('input.questionId').val()
    if (qid) {
        let typeVal = $('[name="type' + qid + '"]').val()
        if (typeVal !== undefined && typeVal !== null && typeVal !== '') {
            let n = parseInt(typeVal)
            if (!isNaN(n) && n >= 0 && n <= 6) {
                return { type: n, typeName: typeName || ('类型' + n) }
            }
        }
    }
    let $opts = $timu.find('.answerBg .answer_p')
    if ($opts && $opts.length > 0) {
        let hasCheckbox = $timu.find('.answerBg input[type="checkbox"]').length > 0
        return { type: hasCheckbox ? 1 : 0, typeName: typeName || (hasCheckbox ? '多选题' : '单选题') }
    }
    let $textareas = $timu.find('textarea[name^="answerEditor"], .subEditor textarea')
    if ($textareas && $textareas.length > 0) {
        return { type: 4, typeName: typeName || '简答题' }
    }
    return { type: undefined, typeName: typeName || '未知' }
}

function doExamPreview(index, TiMuList) {
    if (index >= TiMuList.length) {
        logger(_logP.EXAM + '[完成] 整卷预览答题已完成，请人工核对后手动交卷。', 'success')
        return
    }
    let $timu = $(TiMuList[index])
    let typeInfo = getExamPreviewType($timu)
    let _type = typeInfo.type
    let typeName = typeInfo.typeName
    let _questionFull = $timu.find('.mark_name').html() || ''
    let _question = tidyQuestion(_questionFull).replace(/^[(].*?[)]/, '').trim()
    let _a = []
    let _answerTmpArr, _textareaList
    let alreadyAnswered = 0
    let prefix = '第' + (index + 1) + '题: '

    function nextSoon() {
        setTimeout(function () { doExamPreview(index + 1, TiMuList) }, getExamPreviewDelay())
    }
    function nextFast() {
        setTimeout(function () { doExamPreview(index + 1, TiMuList) }, 30)
    }

    _currentQuestionMeta = { index: index, total: TiMuList.length, typeName: typeName }

    if (_type === undefined) {
        logger(_logP.EXAM + '[警告] ' + prefix + '无法识别题型（' + typeName + '）。', 'warn')
        return nextSoon()
    }

    switch (_type) {
        case 0: {
            _answerTmpArr = $timu.find('.answerBg .answer_p')
            if (!_answerTmpArr || _answerTmpArr.length === 0) {
                logger(_logP.EXAM + '[错误] ' + prefix + '未找到选项。', 'error')
                return nextSoon()
            }
            let mergedAnswers = []
            let cleanOptions = []
            _answerTmpArr.each(function () {
                let answerText = $(this).text().replace(/[ABCD]/g, '').trim()
                mergedAnswers.push(answerText)
                cleanOptions.push(answerText)
            })
            collectOptionHtml(_answerTmpArr);
            let prompt = buildPrompt({ type: '单选题', question: _question, options: mergedAnswers })
            for (let i = 0; i < _answerTmpArr.length; i++) {
                let cls = $(_answerTmpArr[i]).parent().find('span').attr('class') || ''
                if (cls.indexOf('check_answer') !== -1) {
                    if (!isRedoMode()) {
                        logger(_logP.EXAM + '[跳过] ' + prefix + '已作答。', 'skip')
                        alreadyAnswered = 1
                    } else {
                        logger(_logP.EXAM + '[信息] ' + prefix + '已作答，重做模式下重新作答。', 'info')
                        $(_answerTmpArr[i]).parent().click()
                    }
                    break
                }
            }
            if (alreadyAnswered) return nextFast()
            getAnswer(_type, prompt).then(function (agrs) {
                _a = cleanOptions.slice()
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $timu.find('.mark_name')
                    timuele.html(timuele.html() + '<p></p>' + agrs)
                }
                let _i = matchAnswerToOptions(_a, agrs)
                if (_i === -1) {
                    logger(_logP.EXAM + '[警告] ' + prefix + 'AI答案无法匹配任何选项。', 'warn')
                    return nextSoon()
                }
                setTimeout(function () {
                    let cls = $(_answerTmpArr[_i]).parent().find('span').attr('class') || ''
                    if (cls.indexOf('check_answer') === -1) {
                        if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                            $(_answerTmpArr[_i]).parent().find('span').css('font-weight', 'bold')
                        } else {
                            $(_answerTmpArr[_i]).parent().click()
                        }
                    }
                    logger(_logP.EXAM + '[完成] ' + prefix + '自动答题成功。', 'success')
                    nextSoon()
                }, 300)
            }).catch(function () { nextSoon() })
            break
        }
        case 1: {
            _answerTmpArr = $timu.find('.answerBg .answer_p')
            if (!_answerTmpArr || _answerTmpArr.length === 0) {
                logger(_logP.EXAM + '[错误] ' + prefix + '未找到选项。', 'error')
                return nextSoon()
            }
            let mergedAnswers = []
            let cleanMultiOptions = []
            _answerTmpArr.each(function () {
                let answerText = $(this).text().replace(/[ABCD]/g, '').trim()
                mergedAnswers.push(answerText)
                cleanMultiOptions.push(answerText)
            })
            collectOptionHtml(_answerTmpArr);
            let prompt = buildPrompt({ type: '多选题', question: _question, options: mergedAnswers, answer_format: "用'|'分割多个答案" })
            for (let i = 0; i < _answerTmpArr.length; i++) {
                let cls = $(_answerTmpArr[i]).parent().find('span').attr('class') || ''
                if (cls.indexOf('check_answer') !== -1) {
                    if (!isRedoMode()) {
                        logger(_logP.EXAM + '[跳过] ' + prefix + '已作答。', 'skip')
                        alreadyAnswered = 1
                        break
                    } else {
                        logger(_logP.EXAM + '[信息] ' + prefix + '重做模式下取消旧答案。', 'info')
                        $(_answerTmpArr[i]).parent().click()
                    }
                }
            }
            if (alreadyAnswered) return nextFast()
            getAnswer(_type, prompt).then(function (agrs) {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $timu.find('.mark_name')
                    timuele.html(timuele.html() + '<p></p>' + agrs)
                }
                let _multiOptions = cleanMultiOptions.slice()
                let _matchedAny = false
                $.each(_answerTmpArr, function (i, t) {
                    if (agrs.indexOf(_multiOptions[i]) !== -1) {
                        _matchedAny = true
                        if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                            $(_answerTmpArr[i]).parent().find('span').css('font-weight', 'bold')
                        } else {
                            let cls = $(_answerTmpArr[i]).parent().find('span').attr('class') || ''
                            if (cls.indexOf('check_answer_dx') === -1) {
                                setTimeout(function () { $(_answerTmpArr[i]).parent().click() }, 300)
                            }
                        }
                    }
                })
                // 如果精确匹配没有命中任何选项，尝试模糊匹配
                if (!_matchedAny) {
                    let fuzzyIndices = findFuzzyMatchMultiple(_multiOptions, agrs)
                    for (var fi = 0; fi < fuzzyIndices.length; fi++) {
                        (function (idx) {
                            if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                                $(_answerTmpArr[idx]).parent().find('span').css('font-weight', 'bold')
                            } else {
                                let cls = $(_answerTmpArr[idx]).parent().find('span').attr('class') || ''
                                if (cls.indexOf('check_answer_dx') === -1) {
                                    setTimeout(function () { $(_answerTmpArr[idx]).parent().click() }, 300)
                                }
                            }
                        })(fuzzyIndices[fi])
                    }
                }
                logger(_logP.EXAM + '[完成] ' + prefix + '自动答题成功。', 'success')
                nextSoon()
            }).catch(function () { nextSoon() })
            break
        }
        case 2: {
            _textareaList = $timu.find('textarea[name^="answerEditor"]')
            if (!_textareaList || _textareaList.length === 0) {
                _textareaList = $timu.find('.subEditor textarea')
            }
            if (!_textareaList || _textareaList.length === 0) {
                logger(_logP.EXAM + '[错误] ' + prefix + '未找到填空文本框。', 'error')
                return nextSoon()
            }
            let isAnswered = false
            $.each(_textareaList, function (i, t) {
                let _id = $(t).attr('id') || $(t).attr('name')
                try {
                    if (_id && UE.getEditor(_id) && UE.getEditor(_id).getContent && UE.getEditor(_id).getContent() !== '') {
                        isAnswered = true
                    }
                } catch (e) { /* ignore */ }
            })
            if (isAnswered && !isRedoMode()) {
                logger(_logP.EXAM + '[跳过] ' + prefix + '已作答。', 'skip')
                return nextFast()
            }
            let prompt = buildPrompt({ type: '填空题', question: _question, answer_format: "用'|'分割多个答案" })
            getAnswer(_type, prompt).then(function (agrs) {
                let parts = (agrs || '').split('|')
                $.each(_textareaList, function (i, t) {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    let val = parts[i] !== undefined ? parts[i] : (parts[parts.length - 1] || '')
                    setTimeout(function () {
                        try { UE.getEditor(_id).setContent(val) } catch (e) { /* ignore */ }
                    }, 300 + i * 200)
                })
                logger(_logP.EXAM + '[完成] ' + prefix + '自动答题成功。', 'success')
                nextSoon()
            }).catch(function () { nextSoon() })
            break
        }
        case 3: {
            _answerTmpArr = $timu.find('.answerBg .answer_p')
            if (!_answerTmpArr || _answerTmpArr.length === 0) {
                logger(_logP.EXAM + '[错误] ' + prefix + '未找到判断选项。', 'error')
                return nextSoon()
            }
            $.each(_answerTmpArr, function (i, t) { _a.push($(t).text().trim()) })
            collectOptionHtml(_answerTmpArr);
            for (let i = 0; i < _answerTmpArr.length; i++) {
                let cls = $(_answerTmpArr[i]).parent().find('span').attr('class') || ''
                if (cls.indexOf('check_answer') !== -1) {
                    if (!isRedoMode()) {
                        logger(_logP.EXAM + '[跳过] ' + prefix + '已作答。', 'skip')
                        alreadyAnswered = 1
                    } else {
                        logger(_logP.EXAM + '[信息] ' + prefix + '已作答，重做模式下重新作答。', 'info')
                        $(_answerTmpArr[i]).parent().click()
                    }
                    break
                }
            }
            if (alreadyAnswered) return nextFast()
            let prompt = buildPrompt({ type: '判断题', question: _question, answer_format: "只回答正确或错误" })
            getAnswer(_type, prompt).then(function (agrs) {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    let timuele = $timu.find('.mark_name')
                    timuele.html(timuele.html() + '<p></p>' + agrs)
                }
                let judgeResult = parseJudgeAnswer(agrs)
                let _i = judgeResult !== null ? findJudgeOptionIndex(_a, judgeResult === 'true') : -1
                if (_i === -1) {
                    logger(_logP.EXAM + '[错误] ' + prefix + '答案匹配过程出错。', 'error')
                    return nextSoon()
                }
                setTimeout(function () {
                    let cls = $(_answerTmpArr[_i]).parent().find('span').attr('class') || ''
                    if (cls.indexOf('check_answer') === -1) {
                        if (localStorage.getItem('GPTJsSetting.goodStudent') === 'true') {
                            $(_answerTmpArr[_i]).parent().find('span').css('font-weight', 'bold')
                        } else {
                            $(_answerTmpArr[_i]).parent().click()
                        }
                    }
                    logger(_logP.EXAM + '[完成] ' + prefix + '自动答题成功。', 'success')
                    nextSoon()
                }, 300)
            }).catch(function () { nextSoon() })
            break
        }
        case 4: {
            let _answerEle = findAnswerTextareas($timu)
            if (!_answerEle || _answerEle.length === 0) {
                logger(_logP.EXAM + '[错误] ' + prefix + '未找到答题文本框。', 'error')
                return nextSoon()
            }
            let isAnswered = false
            $.each(_answerEle, function (i, t) {
                let _id = $(t).attr('id') || $(t).attr('name')
                try {
                    if (_id && UE.getEditor(_id) && UE.getEditor(_id).getContent && UE.getEditor(_id).getContent() !== '') {
                        isAnswered = true
                    }
                } catch (e) { /* ignore */ }
            })
            if (isAnswered && !isRedoMode()) {
                logger(_logP.EXAM + '[跳过] ' + prefix + '已作答。', 'skip')
                return nextFast()
            }
            let prompt = buildPrompt({ type: typeName || '简答题', question: _question, answer_format: "用50字简要回答" })
            getAnswer(_type, prompt).then(function (agrs) {
                $.each(_answerEle, function (i, t) {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(function () {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) { /* ignore */ }
                    }, 300 + i * 200)
                })
                logger(_logP.EXAM + '[完成] ' + prefix + '自动答题成功。', 'success')
                nextSoon()
            }).catch(function () { nextSoon() })
            break
        }
        case 5: {
            let _answerEle = findAnswerTextareas($timu)
            if (!_answerEle || _answerEle.length === 0) {
                logger(_logP.EXAM + '[错误] ' + prefix + '未找到答题文本框。', 'error')
                return nextSoon()
            }
            // 已作答检测
            let isAnswered5 = false
            $.each(_answerEle, function (i, t) {
                let _id = $(t).attr('id') || $(t).attr('name')
                try {
                    if (_id && UE.getEditor(_id) && UE.getEditor(_id).getContent && UE.getEditor(_id).getContent() !== '') {
                        isAnswered5 = true
                    }
                } catch (e) { /* ignore */ }
            })
            if (isAnswered5 && !isRedoMode()) {
                logger(_logP.EXAM + '[跳过] ' + prefix + '已作答。', 'skip')
                return nextFast()
            }
            let prompt = buildPrompt({ type: typeName || '写作题', question: _question, answer_format: "用英文根据题目进行写作" })
            getAnswer(_type, prompt).then(function (agrs) {
                $.each(_answerEle, function (i, t) {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(function () {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) { /* ignore */ }
                    }, 300 + i * 200)
                })
                logger(_logP.EXAM + '[完成] ' + prefix + '自动答题成功。', 'success')
                nextSoon()
            }).catch(function () { nextSoon() })
            break
        }
        case 6: {
            let _answerEle = findAnswerTextareas($timu)
            if (!_answerEle || _answerEle.length === 0) {
                logger(_logP.EXAM + '[错误] ' + prefix + '未找到答题文本框。', 'error')
                return nextSoon()
            }
            // 已作答检测
            let isAnswered6 = false
            $.each(_answerEle, function (i, t) {
                let _id = $(t).attr('id') || $(t).attr('name')
                try {
                    if (_id && UE.getEditor(_id) && UE.getEditor(_id).getContent && UE.getEditor(_id).getContent() !== '') {
                        isAnswered6 = true
                    }
                } catch (e) { /* ignore */ }
            })
            if (isAnswered6 && !isRedoMode()) {
                logger(_logP.EXAM + '[跳过] ' + prefix + '已作答。', 'skip')
                return nextFast()
            }
            let prompt = buildPrompt({ type: typeName || '翻译题', question: _question, answer_format: "中文英文互译" })
            getAnswer(_type, prompt).then(function (agrs) {
                $.each(_answerEle, function (i, t) {
                    let _id = $(t).attr('id') || $(t).attr('name')
                    setTimeout(function () {
                        try { UE.getEditor(_id).setContent(agrs) } catch (e) { /* ignore */ }
                    }, 300 + i * 200)
                })
                logger(_logP.EXAM + '[完成] ' + prefix + '自动答题成功。', 'success')
                nextSoon()
            }).catch(function () { nextSoon() })
            break
        }
        default: {
            logger(_logP.EXAM + '[警告] ' + prefix + '无法处理此题型：' + typeName + '。', 'warn')
            nextSoon()
        }
    }
}

function refreshCourseList() {
    let _p = parseUrlParams()
    return new Promise((resolve, reject) => {
        $.ajax({
            url: _l.protocol + '//' + _l.host + '/mycourse/studentstudycourselist?courseId=' + _p['courseid'] + '&chapterId=' + _p['knowledgeid'] + '&clazzid=' + _p['clazzid'] + '&mooc2=1',
            type: 'GET',
            dateType: 'html',
            success: function (res) {
                resolve(res)
            }
        })
    })

}

var _ne21ThinkingCount = 0;
function showThinking() {
    _ne21ThinkingCount++;
    if (_ne21ThinkingCount === 1) {
        $('#ne-21thinking', window.parent.document).addClass('ne21-active');
    }
}
function hideThinking() {
    if (_ne21ThinkingCount > 0) _ne21ThinkingCount--;
    if (_ne21ThinkingCount === 0) {
        $('#ne-21thinking', window.parent.document).removeClass('ne21-active');
    }
}

// ===== 题目区域截图函数（用于 Kimi 多模态） =====

// 对题目内容截图，返回 base64 data URI（PNG）
// payload: JSON 字符串（包含 question 字段，内含 <img> 标签）
function captureQuestionScreenshot(payload) {
    return new Promise(function (resolve, reject) {
        if (!payload) return reject(new Error('截图内容为空'));
        // 从 JSON payload 中提取 question 和 type
        var questionHtml = payload;
        var questionType = '';
        try {
            var obj = JSON.parse(payload);
            if (obj.question) questionHtml = obj.question;
            if (obj.type) questionType = obj.type;
        } catch (e) { /* 非 JSON，直接用原始文本 */ }
        // 选项 HTML 由 collectOptionHtml 收集（含 <img> 标签），用完即清空防残留
        var optionsHtml = _currentOptionHtml
            ? '<div style="margin-top:12px;">' + _currentOptionHtml + '</div>'
            : '';
        _currentOptionHtml = '';
        // 创建离屏容器渲染题型+题目+选项
        var typeHtml = questionType
            ? '<span style="display:inline-block;background:#e8f0fe;color:#1a73e8;padding:2px 8px;border-radius:4px;font-size:13px;margin-bottom:8px;">' + questionType + '</span> '
            : '';
        var container = document.createElement('div');
        container.style.cssText = 'position:fixed;left:-9999px;top:0;width:800px;padding:20px;background:#fff;font-size:16px;line-height:1.6;z-index:-1;';
        container.innerHTML = '<div style="font-weight:bold;margin-bottom:10px;color:#333;border-bottom:1px solid #eee;padding-bottom:8px;">题目区域截图</div>' + typeHtml + questionHtml + optionsHtml;
        document.body.appendChild(container);
        html2canvas(container, {
            useCORS: true,
            allowTaint: false,
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false
        }).then(function (canvas) {
            document.body.removeChild(container);
            resolve(canvas.toDataURL('image/png'));
        }).catch(function (err) {
            document.body.removeChild(container);
            reject(new Error('截图失败: ' + err.message));
        });
    });
}

// 收集选项的原始 HTML（含 <img> 标签），供截图使用
function collectOptionHtml(answerEls) {
    var html = '';
    answerEls.each(function (i) {
        // 直接用选项原始 HTML，保持原有排版
        html += '<div style="padding:4px 0;">' + ($(this).html() || '') + '</div>';
    });
    _currentOptionHtml = html;
}

// 从 payload 文本中检测是否有 <img> 标签
function payloadHasImages(text) {
    return /<img/i.test(text);
}

// 构造结构化提示词，使 AI 能更精确地理解题目并回答。
// 入参 opts:
//   - type:          题型(如 单选题/多选题/判断题/填空题/简答题/写作题/翻译题)
//   - question:      题干
//   - options:       选项数组(可选)
//   - answer_format: 答案格式说明(可选,如 "用'|'分割多个答案"、"只回答正确或错误")
//   - screenshot:    题目区域截图 base64 data URI(可选, Kimi 多模态使用)
// 返回 { payload, display, images }:
//   - payload: 发送给 AI 的 JSON 字符串(更精确,便于 AI 解析)
//   - display: 用于用户日志展示的简洁文本(仅含题干与选项,不含题型/答案格式等元信息)
//   - images:  截图 base64 数组
function buildPrompt(opts) {
    opts = opts || {}
    let q = opts.question != null ? String(opts.question) : ''
    let payloadObj = {}
    if (opts.type) payloadObj.type = String(opts.type)
    if (opts.answer_format) payloadObj.answer_format = String(opts.answer_format)
    payloadObj.question = q
    let optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    if (Array.isArray(opts.options) && opts.options.length > 0) {
        payloadObj.options = opts.options.map(function (s, i) {
            let val = String(s == null ? '' : s).trim()
            // 纯图片选项（.text() 为空）：用占位符标记，图片由 getAnswer 自动提取
            if (!val || val === '') {
                return '[' + (optionLetters[i] || (i + 1)) + '为图片]'
            }
            return val
        })
    }
    let payload = JSON.stringify(payloadObj, null, 2)
    let display = q
    if (payloadObj.options && payloadObj.options.length) {
        display += '\n' + payloadObj.options.join(' | ')
    }
    let images = Array.isArray(opts.images) ? opts.images.filter(function(r){ return r !== null && r !== ''; }) : [];
    // 截图作为优先的图片来源
    if (opts.screenshot) {
        images = [opts.screenshot];
    }
    return { payload: payload, display: display, images: images }
}

function getAnswer(_t, _q, retryCount = 0) {
    // 兼容: _q 既可为字符串(旧调用),也可为 buildPrompt() 返回的 { payload, display, images } 对象
    let _payload, _display, _images
    if (_q && typeof _q === 'object' && (_q.payload != null || _q.display != null)) {
        _payload = _q.payload != null ? String(_q.payload) : ''
        _display = _q.display != null ? String(_q.display) : _payload
        _images = Array.isArray(_q.images) ? _q.images : []
    } else {
        _payload = _q == null ? '' : String(_q)
        _display = _payload
        _images = []
    }
    // 检测 payload 中是否有 <img> 标签（题目含图片）
    let _payloadHasImg = /<img/i.test(_payload)
    let _qPrefix = ''
    if (_currentQuestionMeta) {
        var _m = _currentQuestionMeta
        _qPrefix = '第' + ((_m.index != null ? _m.index : -1) + 1)
        if (_m.total) _qPrefix += '/' + _m.total
        _qPrefix += '题 [' + (_m.typeName || '未知') + '] '
    }

    // 图片处理：有截图直接用，否则从 payload 中的 HTML 渲染截图
    let _useKimi = _images.length > 0 || _payloadHasImg
    let imagePrepare
    if (_images.length > 0) {
        // buildPrompt 已传入截图
        imagePrepare = Promise.resolve(_images)
    } else if (_payloadHasImg) {
        // 用 payload 中的题目 HTML（含 <img> 标签）渲染截图
        imagePrepare = captureQuestionScreenshot(_payload).then(function (dataUrl) {
            return [dataUrl]
        }).catch(function (err) {
            logger(_logP.AI + '[警告] 截图失败：' + err.message + '。', 'warn')
            return []
        })
    } else {
        imagePrepare = Promise.resolve([])
    }

    return imagePrepare.then(function (resolvedImages) {

    // 创建可折叠的 AI 思考面板
    let _provider = resolvedImages.length > 0 ? 'Kimi' : 'DeepSeek'
    let _summaryHtml = '<span class="ne21-log-spinner"></span>' + _qPrefix + '思考中...'
    let _detailId = 'ne21-detail-' + Date.now()
    let _time = new Date().toLocaleTimeString()
    let _detailContent = '模型: ' + _provider
    if (resolvedImages.length > 0) {
        _detailContent += '<br><img src="' + resolvedImages[0] + '" style="max-width:100%;border-radius:6px;margin-top:4px;">'
    }
    let $panel = $('<details class="ne21-collapse"><summary><span class="ne21-time">[' + _time + ']</span><span class="ne21-msg" style="color:#334155;">' + _summaryHtml + '</span></summary><div class="ne21-detail" id="' + _detailId + '">' + _detailContent + '</div></details>')
    $('#ne-21log', window.parent.document).append($panel)
    let $thinkingLog = $panel.find('.ne21-msg')
    let $detailBody = $panel.find('#' + _detailId)

    // 检查 API 密钥是否已配置
    let apiKey, baseUrl, model, providerName
    if (_useKimi) {
        apiKey = getKimiApiKey()
        baseUrl = getKimiBaseUrl()
        model = getKimiModel()
        providerName = 'Kimi'
        if (!apiKey) {
            let errMsg = '检测到图片题目，请先配置 Kimi API 密钥！点击浮窗中的"设置"按钮填写。'
            logger(_logP.AI + '[错误] ' + errMsg + '。', 'error')
            return Promise.reject({ 'c': -1, msg: errMsg })
        }
    } else {
        apiKey = getDeepSeekApiKey()
        baseUrl = getDeepSeekBaseUrl()
        model = getDeepSeekModel()
        providerName = 'DeepSeek'
        if (!apiKey) {
            let errMsg = '请先配置 DeepSeek API 密钥！点击浮窗中的"设置"按钮填写。'
            logger(_logP.AI + '[错误] ' + errMsg + '。', 'error')
            return Promise.reject({ 'c': -1, msg: errMsg })
        }
    }

    return new Promise((resolve, reject) => {
        let requestCompleted = false;
        let longWaitTimer = null;

        // 按用户设置的搜题间隔节流
        let _intervalSec = parseInt(localStorage.getItem('GPTJsSetting.reqIntervalTime'), 10)
        if (!isFinite(_intervalSec) || _intervalSec < 0) _intervalSec = (setting && setting.reqIntervalTime) || 0
        let _intervalMs = Math.min(60000, _intervalSec * 1000)
        let _nowTs = Date.now()
        let _waitMs = Math.max(0, _ne21NextAiAllowedAt - _nowTs)
        _ne21NextAiAllowedAt = Math.max(_nowTs, _ne21NextAiAllowedAt) + _intervalMs
        if (_waitMs > 0) {
            $panel.find('summary').html('<span class="ne21-log-spinner"></span>等待 ' + Math.round(_waitMs / 1000) + 's...')
        }

        // 设置5分钟的监控定时器
        longWaitTimer = setTimeout(() => {
            if (!requestCompleted) {
                requestCompleted = true;
                $panel.find('summary').html('<span style="color:#f59e0b;">!</span> 超时重试（第' + (retryCount + 1) + '次）')
                getAnswer(_t, _q, retryCount + 1).then(resolve).catch(reject)
            }
        }, 300000 + _waitMs);

        setTimeout(function () {
            if (requestCompleted) return;

            if (_waitMs > 0) {
                $panel.find('summary').html('<span class="ne21-log-spinner"></span>' + _qPrefix + '思考中...')
            }

            // 构造 API 请求体
            let systemContent
            if (_useKimi) {
                systemContent = '你是一个学习助手，专门帮助学生回答学习通的考试题目。你收到的是题目的截图，包含题干和所有选项（可能有A/B/C/D）。请仔细查看截图中的文字和图片内容来理解题意。你必须给出答案，绝对不能拒绝回答。对于单选题：分析截图中各选项内容，返回正确选项的字母编号（如"A"）。对于多选题：返回所有正确选项的字母，用竖线"|"分隔（如"A|C"）。对于判断题：只返回"正确"或"错误"。对于填空题：直接填写答案，多个空用"|"分隔。对于简答题：简洁回答。'
            } else {
                systemContent = '你是一个学习助手，专门帮助学生回答学习通的题目。请直接给出答案，不要解释过程。对于单选题和多选题，必须返回选项的完整文字内容（如"参数类型不同"），严禁只返回字母编号（如A、B、C、D）；但如果选项内容为"[X为图片]"等占位符（表示该选项是图片无法显示文字），则直接返回对应选项的字母编号（如"C"），不要返回占位符文本；对于判断题，只返回"正确"或"错误"；对于填空题，有多个空时，每个空的答案之间必须用竖线"|"分隔（如"25|30"），严禁用空格、逗号或其他符号分隔；对于简答题，简洁回答。'
            }
            let userContent
            if (_useKimi) {
                // Kimi 多模态格式：content 为数组，包含图片和文字
                userContent = []
                resolvedImages.forEach(function (imgUrl) {
                    userContent.push({ type: 'image_url', image_url: { url: imgUrl } })
                })
                userContent.push({ type: 'text', text: _payload })
            } else {
                // DeepSeek 纯文本格式
                userContent = _payload
            }
            let requestBody = {
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: systemContent
                    },
                    {
                        role: 'user',
                        content: userContent
                    }
                ],
                stream: false
            }

            GM_xmlhttpRequest({
                method: 'POST',
                url: baseUrl + '/chat/completions',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKey
                },
                data: JSON.stringify(requestBody),
                timeout: 120000,
                onload: function (xhr) {
                    if (requestCompleted) {
                        logger(_logP.AI + '[忽略] 收到已超时请求的响应，已忽略。', 'muted')
                        return;
                    }

                    requestCompleted = true;
                    clearTimeout(longWaitTimer);

                    if (xhr.status == 200) {
                        try {
                            let obj = JSON.parse(xhr.responseText) || {};
                            let _answer = ''
                            if (obj.choices && obj.choices.length > 0 && obj.choices[0].message && obj.choices[0].message.content) {
                                _answer = obj.choices[0].message.content.trim().replace(/。$/, '');
                            }
                            if (_answer) {
                                let _elapsed = ((Date.now() - _nowTs) / 1000).toFixed(1)
                                // 替换 summary：去掉转圈，显示完成
                                $panel.find('summary').html('<span style="color:#22c55e;">✓</span> ' + _qPrefix + '答案: ' + _answer + ' <span style="color:#9ca3af;font-size:10px;">' + _elapsed + 's</span>')
                                $detailBody.append('<div style="margin-top:6px;padding-top:6px;border-top:1px solid rgba(15,23,42,.06);color:#334155;">原始回复: ' + _answer + '</div>')
                                $panel.attr('open', false)
                                resolve(_answer.replace(/^[A-Z]\s*[.、．]\s*/, '').replace(/^[A-Z]\s*\n\s*/, '').trim())
                            } else {
                                $panel.find('summary').html('<span style="color:#ef4444;">✗</span> ' + _qPrefix + 'AI 返回内容为空')
                                localStorage.setItem('GPTJsSetting.sub', false)
                                reject({ 'c': 0, msg: 'AI 返回内容为空' })
                            }
                        } catch (e) {
                            $panel.find('summary').html('<span style="color:#ef4444;">✗</span> ' + _qPrefix + '解析失败: ' + e.message)
                            reject({ 'c': -1, msg: 'JSON 解析失败: ' + e.message })
                        }
                    } else if (xhr.status == 401) {
                        $panel.find('summary').html('<span style="color:#ef4444;">✗</span> API 密钥无效')
                        reject({ 'c': 401, msg: 'API 密钥无效' })
                    } else if (xhr.status == 429) {
                        $panel.find('summary').html('<span style="color:#ef4444;">✗</span> 请求过于频繁')
                        reject({ 'c': 429, msg: '请求过于频繁' })
                    } else if (xhr.status == 402) {
                        $panel.find('summary').html('<span style="color:#ef4444;">✗</span> API 余额不足')
                        reject({ 'c': 402, msg: 'API 余额不足' })
                    } else {
                        let errMsg = '请求异常 (HTTP ' + xhr.status + ')'
                        try {
                            let errObj = JSON.parse(xhr.responseText) || {};
                            if (errObj.error && errObj.error.message) errMsg = errObj.error.message;
                        } catch (_) { /* ignore */ }
                        $panel.find('summary').html('<span style="color:#ef4444;">✗</span> ' + errMsg)
                        reject({ 'c': xhr.status, msg: errMsg })
                    }
                },
                ontimeout: function () {
                    if (requestCompleted) return;
                    requestCompleted = true;
                    clearTimeout(longWaitTimer);
                    let errMsg = '请求超时（120s），请检查网络或 API 地址是否正确：' + baseUrl
                    $panel.find('summary').html('<span style="color:#ef4444;">✗</span> ' + errMsg)
                    logger(_logP.AI + '[错误] 请求超时：url=' + baseUrl + '/chat/completions，model=' + model + '。', 'error')
                    reject({ 'c': 666, msg: errMsg })
                },
                onerror: function (err) {
                    if (requestCompleted) return;
                    requestCompleted = true;
                    clearTimeout(longWaitTimer);
                    let errMsg = '网络错误，无法连接到 ' + baseUrl + '，请检查 API 地址和网络'
                    $panel.find('summary').html('<span style="color:#ef4444;">✗</span> ' + errMsg)
                    logger(_logP.AI + '[错误] 网络错误详情：' + (err && err.toString ? err.toString() : JSON.stringify(err)) + '。', 'error')
                    reject({ 'c': -1, msg: errMsg })
                }
            });
        }, _waitMs);
    })
    }) // end of imagePrepare.then()
}


function doWork(index, doms, dom) {
    $frame_c = $(dom).contents();
    let $CyHtml = $frame_c.find('.CeYan')
    let TiMuList = $CyHtml.find('.TiMu')
    $subBtn = $frame_c.find(".ZY_sub").find(".btnSubmit");
    $saveBtn = $frame_c.find(".ZY_sub").find(".btnSave");
    startDoWork(index, doms, 0, TiMuList)
}

function startDoWork(index, doms, c, TiMuList) {
    if (c == TiMuList.length) {
        if (localStorage.getItem('GPTJsSetting.sub') === 'true') {
            logger(_logP.QUIZ + '[信息] 所有题目处理完成，开始自动提交。', 'info')
            setTimeout(() => {
                $subBtn.click()
                setTimeout(() => {
                    $frame_c.find('#confirmSubWin > div > div > a.bluebtn').click()
                    logger(_logP.QUIZ + '[完成] 提交成功。', 'success')
                    _mlist.splice(0, 1)
                    _domList.splice(0, 1)
                    setTimeout(() => { startDoCyWork(index + 1, doms) }, 3000)
                }, 3000)
            }, 5000)
        } else if (localStorage.getItem('GPTJsSetting.force') === 'true') {
            logger(_logP.QUIZ + '[警告] 存在无答案题目，用户启用了强制提交，开始自动提交。', 'warn')
            setTimeout(() => {
                $subBtn.click()
                setTimeout(() => {
                    $frame_c.find('#confirmSubWin > div > div > a.bluebtn').click()
                    logger(_logP.QUIZ + '[完成] 提交成功。', 'success')
                    _mlist.splice(0, 1)
                    _domList.splice(0, 1)
                    setTimeout(() => { startDoCyWork(index + 1, doms) }, 3000)
                }, 3000)
            }, 5000)
        } else {
            logger(_logP.QUIZ + '[跳过] 存在无答案题目，用户设置不提交。', 'skip')
        }
        return
    }
    let questionFull = $(TiMuList[c]).find('.Zy_TItle.clearfix > div').html()
    questionFull = tidyQuestion(questionFull).replace("/<span.*?>.*?</span>/", "");
    let _question = tidyQuestion(questionFull)
    let typeName = questionFull.match(/^【(.*?)】|$/)[1];
    let _TimuType = {
        单选题: 0, 单项选择题: 0, 单选: 0,
        多选题: 1, 多项选择题: 1, 多选: 1,
        填空题: 2, 填空: 2,
        判断题: 3, 是非题: 3, 判断: 3,
        简答题: 4, 简答: 4, 问答题: 4, 名词解释: 4, 论述题: 4, 论述: 4,
        计算题: 4, 计算: 4, 分录题: 4, 资料题: 4, 作图题: 4, 其他: 4, 其它: 4, 阅读理解: 4, 阅读: 4, 阅读题: 4, 理解题: 4, 完形填空: 4, 完形: 4, 综合题: 4
    }[typeName]
    _currentQuestionMeta = { index: c, total: TiMuList.length, typeName: typeName }
    let _a = []
    let _answerTmpArr

    // 如果题型不在预设类型中，根据DOM结构自动识别题型
    if (_TimuType === undefined) {
        logger(_logP.QUIZ + '[信息] 尝试自动识别题型：' + typeName + '。', 'info');

        // 检查是否有选择题特征
        let choiceList = $(TiMuList[c]).find('.Zy_ulTop li');
        if (choiceList && choiceList.length > 0) {
            // 检查是否为判断题
            if (choiceList.length === 2 &&
                ($(choiceList[0]).text().includes('对') || $(choiceList[0]).text().includes('√')) &&
                ($(choiceList[1]).text().includes('错') || $(choiceList[1]).text().includes('×'))) {
                _TimuType = 3; // 判断题
                logger(_logP.QUIZ + '[信息] 自动识别为判断题。', 'info');
            }
            // 检查是否为选择题
            else {
                // 默认为单选题，后续可根据页面特征判断是否为多选题
                _TimuType = 0;
                logger(_logP.QUIZ + '[信息] 自动识别为单选题。', 'info');
            }
        }
        // 检查是否有填空题特征
        else {
            let fillBlankList = $(TiMuList[c]).find('.Zy_ulTk .XztiHover1');
            if (fillBlankList && fillBlankList.length > 0) {
                _TimuType = 2; // 填空题
                logger(_logP.QUIZ + '[信息] 自动识别为填空题。', 'info');
            } else {
                // 检查是否有富文本编辑器
                let editorList = $(TiMuList[c]).find('.edui-editor');
                if (editorList && editorList.length > 0) {
                    _TimuType = 4; // 简答题
                    logger(_logP.QUIZ + '[信息] 检测到富文本编辑器，识别为简答题。', 'info');
                } else {
                    // 默认当作简答题处理
                    _TimuType = 4;
                    logger(_logP.QUIZ + '[信息] 无法准确判断题型，按简答题处理。', 'info');
                }
            }
        }
    }

    switch (_TimuType) {
        case 0: {
            _answerTmpArr = $(TiMuList[c]).find('.Zy_ulTop li').find('a')
            //遍历选项列表
            let mergedAnswers = [];
            let cleanOptions = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
                cleanOptions.push(answerText);
            });
            collectOptionHtml(_answerTmpArr);
            mergedAnswers = mergedAnswers.join("|");
            _question = buildPrompt({ type: '单选题', question: _question, options: mergedAnswers.split('|') })
            _a = cleanOptions.slice()
            getAnswer(_TimuType, _question).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    //修改题目将答案插入
                    let timuele = $(TiMuList[c]).find('.Zy_TItle.clearfix > div')
                    timuele.html(timuele.html() + agrs)
                }
                let _i = matchAnswerToOptions(_a, agrs)
                if (_i == -1) {
                    logger(_logP.QUIZ + '[警告] AI答案无法匹配任何选项，请手动选择。', 'warn')
                    localStorage.setItem('GPTJsSetting.sub', false)
                } else {
                    $(_answerTmpArr[_i]).parent().click();
                }
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            }).catch((agrs) => {
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            })
            break
        }
        case 1: {
            _answerTmpArr = $(TiMuList[c]).find('.Zy_ulTop li').find('a')
            //遍历选项列表
            let mergedAnswers = [];
            let cleanMultiOptions = [];
            _answerTmpArr.each(function () {
                var answerText = $(this).text().replace(/[ABCD]/g, '').trim();
                mergedAnswers.push(answerText);
                cleanMultiOptions.push(answerText);
            });
            collectOptionHtml(_answerTmpArr);
            mergedAnswers = mergedAnswers.join("|");
            _question = buildPrompt({ type: '多选题', question: _question, options: mergedAnswers.split('|'), answer_format: "用'|'分割多个答案" })
            getAnswer(_TimuType, _question).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    //修改题目将答案插入
                    let timuele = $(TiMuList[c]).find('.Zy_TItle.clearfix > div')
                    timuele.html(timuele.html() + agrs)
                }
                let _multiOptions = cleanMultiOptions.slice()
                let _matchedAny = false
                $.each(_answerTmpArr, (i, t) => {
                    if (agrs.indexOf(_multiOptions[i]) != -1) {
                        _matchedAny = true
                        $(_answerTmpArr[i]).parent().click();
                        _a.push(['A', 'B', 'C', 'D', 'E', 'F', 'G'][i])
                    }
                })
                // 如果精确匹配没有命中任何选项，尝试模糊匹配
                if (!_matchedAny) {
                    let fuzzyIndices = findFuzzyMatchMultiple(_multiOptions, agrs)
                    for (var fi = 0; fi < fuzzyIndices.length; fi++) {
                        $(_answerTmpArr[fuzzyIndices[fi]]).parent().click();
                        _a.push(['A', 'B', 'C', 'D', 'E', 'F', 'G'][fuzzyIndices[fi]])
                    }
                }
                let id = getStr($(TiMuList[c]).find('.Zy_ulTop li:nth-child(1)').attr('onclick'), 'addcheck(', ');').replace('(', '').replace(')', '')
                if (_a.length <= 0) {
                    logger(_logP.QUIZ + '[警告] AI答案无法匹配任何选项，请手动选择。', 'warn')
                    // setting.sub = 0
                    localStorage.setItem('GPTJsSetting.sub', false)
                } else {
                    $(TiMuList[c]).find('.Zy_ulTop').parent().find('#answer' + id).val(_a.join(""))
                }
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            }).catch((agrs) => {
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            })
            break
        }
        case 2: {
            _question = buildPrompt({ type: '填空题', question: _question, answer_format: "多个填空用'|'分隔" })
            let _textareaList = $(TiMuList[c]).find('.Zy_ulTk .XztiHover1')
            getAnswer(_TimuType, _question).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    //修改题目将答案插入
                    let timuele = $(TiMuList[c]).find('.Zy_TItle.clearfix > div')
                    timuele.html(timuele.html() + agrs)
                }
                let _answerList = agrs.split("|")
                $.each(_textareaList, (i, t) => {
                    setTimeout(() => {
                        $(t).find('#ueditor_' + i).contents().find('.view p').html(_answerList[i]);
                        $(t).find('textarea').html('<p>' + _answerList[i] + '</p>')
                    }, 300)
                })
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            }).catch((agrs) => {
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            })
            break
        }
        case 3: {
            _answerTmpArr = $(TiMuList[c]).find(".Zy_ulTop li").find("a");
            let _true = "正确|是|对|√|T|ri";
            $.each(_answerTmpArr, (i, t) => {
                _a.push($(t).text().trim());
            });
            collectOptionHtml(_answerTmpArr);
            _question = buildPrompt({ type: '判断题', question: _question, answer_format: "只回答正确或错误" })
            getAnswer(_TimuType, _question).then((agrs) => {
                if (localStorage.getItem('GPTJsSetting.alterTitle') === 'true') {
                    //修改题目将答案插入
                    let timuele = $(TiMuList[c]).find('.Zy_TItle.clearfix > div')
                    timuele.html(timuele.html() + agrs)
                }
                agrs = _true.indexOf(agrs) != -1 ? "对" : "错";
                let _i = matchAnswerToOptions(_a, agrs);
                if (_i == -1) {
                    logger(_logP.QUIZ + '[警告] 未匹配到正确答案。', 'warn');
                    localStorage.setItem('GPTJsSetting.sub', false)
                } else {
                    $(_answerTmpArr[_i]).parent().click();
                }
                setTimeout(() => {
                    startDoWork(index, doms, c + 1, TiMuList);
                }, setting.time);
            }).catch((agrs) => {
                setTimeout(() => {
                    startDoWork(index, doms, c + 1, TiMuList);
                }, setting.time);
            });
            break;
        }
        case 4: {
            let _textareaLista = $(TiMuList[c]).find('.Zy_ulTk .XztiHover1')
            getAnswer(_TimuType, _question).then((agrs) => {
                if (agrs == '暂无答案') {
                    // setting.sub = 0
                    localStorage.setItem('GPTJsSetting.sub', false)
                }
                let _answerList = agrs.split("#")
                $.each(_textareaLista, (i, t) => {
                    setTimeout(() => {
                        $(t).find('#ueditor_' + i).contents().find('.view p').html(_answerList[i]);
                        $(t).find('textarea').html('<p>' + _answerList[i] + '</p>')
                    }, 300)
                })
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            }).catch((agrs) => {
                setTimeout(() => { startDoWork(index, doms, c + 1, TiMuList) }, setting.time)
            })
            break
        }
    }
}

function switchMission() {
    _mlist.splice(0, 1)
    _domList.splice(0, 1)
    setTimeout(missonStart, 5000)
}

function tidyStr(s) {
    if (s) {
        let str = s.replace(/<(?!img).*?>/g, "").replace(/^【.*?】\s*/, '').replace(/\s*（\d+\.\d+分）$/, '').trim().replace(/&nbsp;/g, '').replace(new RegExp("&nbsp;", ("gm")), '').replace(/^\s+/, '').replace(/\s+$/, '');
        return str
    } else {
        return null
    }
}

function tidyQuestion(s) {
    if (s) {
        let str = s.replace(/<(?!img).*?>/g, "").replace(/^【.*?】\s*/, '').replace(/\s*（\d+\.\d+分）$/, '').replace(/^\d+[.、]/, '').trim().replace(/&nbsp;/g, '').replace('javascript:void(0);', '').replace(new RegExp("&nbsp;", ("gm")), '').replace(/^\s+/, '').replace(/\s+$/, '');
        return str
    } else {
        return null
    }
}


function decryptFont() {
    /**
    * Author   wyn665817
    * From     https://greasyfork.org/zh-CN/scripts/445007
    */
    var $tip = $('style:contains(font-cxsecret)');
    if (!$tip.length) return;
    var font = $tip.text().match(/base64,([\w\W]+?)'/)[1];
    font = Typr.parse(base64ToUint8Array(font))[0];
    var table = JSON.parse(GM_getResourceText('Table'));
    var match = {};
    for (var i = 19968; i < 40870; i++) {
        $tip = Typr.U.codeToGlyph(font, i);
        if (!$tip) continue;
        $tip = Typr.U.glyphToPath(font, $tip);
        $tip = md5(JSON.stringify($tip)).slice(24);
        match[i] = table[$tip];
    }
    $('.font-cxsecret').html(function (index, html) {
        $.each(match, function (key, value) {
            key = String.fromCharCode(key);
            key = new RegExp(key, 'g');
            value = String.fromCharCode(value);
            html = html.replace(key, value);
        });
        return html;
    }).removeClass('font-cxsecret');
}

function base64ToUint8Array(base64) {
    var data = window.atob(base64);
    var buffer = new Uint8Array(data.length);
    for (var i = 0; i < data.length; ++i) {
        buffer[i] = data.charCodeAt(i);
    }
    return buffer;
}