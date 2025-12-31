window.pg = window.pg || {};
var je = window.pg;
async function sendBi(obj) {
    // 将 SDK 实例赋给全局变量 ta，或者其他您指定的变量
    window.ta_bat = thinkingdata;
   

    let nextUrl = getUrlParam("next_url");
    if (nextUrl) {
      nextUrl = atob(nextUrl);
      // 2. 创建URL对象，自动解析参数
      const url = new URL(nextUrl);

      // 3. 提取所有参数到对象中（核心步骤）
      const paramsObj = {};
      // 遍历所有参数键值对
      url.searchParams.forEach((value, key) => {
        paramsObj[key] = value;
        obj[key] = value;
      });
      

      // 4. 结果使用：直接按key获取参数值，或打印所有参数
      console.log("所有参数对象：", paramsObj);
    }
    let offerId = getUrlParam('offer_id');
    if (offerId) {
        obj.offerId = offerId;
    }
    let cid = getUrlParam('cid');
    if (cid) {
        obj.cid = cid;
    }

    // 创建 SDK 配置对象
    var config = {
        appId: '10299',
        showLog: false,
        serverUrl: 'https://apicpm.yeahtargeter.com/client/report',
        // serverUrl: 'https://deapi.funsdata.com/v1/sdk/report',
        mode: 'debug',
        // heartbeat: true, // 心跳（v1.0心跳使用方式，v1.1作废）
        // interval: 10000, // 心跳周期（v1.0心跳使用方式，v1.1作废）
        // encrypt: true // 开启上报加密
    };

    // 用配置对象初始化 SDK
    ta_bat.init(config);
    try {
        const {
            res,
            req
        } = await ta_bat.track(
            "lpPageView", //追踪事件的名称
            obj
        );

    } catch (error) {
        // 抛出错误
        console.error(error);
    }

};
  // 获取字符串参数的函数
  function getUrlParam(paramName) {
    const queryString = window.location.search.substring(1);
    const params = queryString.split('&');

    for (let i = 0; i < params.length; i++) {
      const pair = params[i].split('=');
      if (decodeURIComponent(pair[0]) === paramName) {
        return decodeURIComponent(pair[1] || '');
      }
    }
    return null;
  }



async function getInfo() {
    const e = window.screen,
        t = window.navigator;
    let obj = {
        userAgent: navigator.userAgent || navigator.vendor || window.opera || "",
        device: getDeviceType(),
        currentHeapSize: -1,
        heapSizeLimit: -1,

        // 返回用户操作系统的平台字符串
        platform: t.platform || "",
        inner: (window.innerWidth || 0) + "x" + (window.innerHeight || 0),
        outer: (window.outerWidth || 0) + "x" + (window.outerHeight || 0),
        screen: (screen.availWidth || 0) + "x" + (screen.availHeight || 0) + "x" + (screen.colorDepth || 0),
        resolution: (e.width || 0) + "x" + (e.height || 0),
        screenWidth: void 0 !== window.screen.width ? window.screen.width : -1,
        screenHeight: void 0 !== window.screen.height ? window.screen.height : -1,
        // 返回设备上的逻辑处理器数量
        hardwareConcurrency: navigator.hardwareConcurrency || -1,
        deviceMemory: navigator.deviceMemory || -1,
        // 用于获取设备支持的最大触摸点数  要作用是判断设备的触控功能，帮助开发者决定是否启用触摸特定的交互
        maxTouchPoints: void 0 !== navigator.maxTouchPoints ? navigator.maxTouchPoints : -1,
        pixelDepth: void 0 !== window.screen.pixelDepth ? window.screen.pixelDepth : -1,
        deviceMotion: "DeviceMotionEvent" in window,
        deviceOrientation: "DeviceOrientationEvent" in window,
        accelerometer: "Accelerometer" in window,
        pointerCoarse: window.matchMedia("(pointer: coarse)").matches,
        hover: window.matchMedia("(hover: none)").matches,
        pointerFine: window.matchMedia("(pointer: fine)").matches,
        portrait: window.matchMedia("(orientation: portrait)").matches,
        landscape: window.matchMedia("(orientation: landscape)").matches,
        devicePixelRatio: void 0 !== window.devicePixelRatio ? window.devicePixelRatio : -1,
        navigatorProduct: window.navigator.product,
        referrer: document.referrer || "",
        utmSource: getUTMParameter('utm_source') || '/fail/',
        utmMedium: getUTMParameter('utm_medium') || '/fail/',
        utmCampaign: getUTMParameter('utm_campaign') || '/fail/',
        utmContent: getUTMParameter('utm_content') || '/fail/',
        utmTerm: getUTMParameter('utm_term') || '/fail/',
        navigatorProperties: getNavigatorProperties(),
        touchSupport: t.maxTouchPoints || t.msMaxTouchPoints || 0,
        domain: window.location.hostname,
        isPointerFine: window.matchMedia("(pointer: fine)").matches,
        isPointerCoarse: window.matchMedia("(pointer: coarse)").matches,
        // 获取当前的网络下载速度（以 Mbps 为单位）
        downlink: navigator.connection && navigator.connection.downlink || -1,
        // 返回当前的网络连接类型
        connectionType: navigator.connection && navigator.connection.type || "",
        // 返回当前网络连接的估计类型，
        connectionEffectiveType: navigator.connection && navigator.connection.effectiveType || "",
        // 获取网络往返时间（RTT）
        rtt: navigator.connection && navigator.connection.rtt || -1
    }
    try {
        // 发起GET请求
        const response = await fetch('https://apicpm.batcom.online/cpm/get_ip_info');

        // 检查响应是否成功
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // 解析JSON格式的响应
        const data = await response.json();
        if (data.result) {
            for (let key in data.result) {
                obj['result_' + key] = data.result[key]
            }
        }

    } catch (e) {

    }
    try {
        let appInfo = collectAppInfo(obj.userAgent, obj.referrer);
        //
        obj.appNameInfo = appInfo.refererInfo.appName;
        obj.xRequestWith = appInfo.refererInfo.packageName;
        
    } catch(e) {

    }



    const device = getDeviceInfo();
    for (let key in device) {
        obj[key] = device[key]
    }
    je.tc = obj;
    try {
        // 是一个表示当前 JavaScript 堆内存使用量的属性。它返回已使用的 JavaScript 堆内存的字节数，帮助开发者监测内存使用情况，优化性能，避免内存泄漏或不足的问题。这个值在页面运行时动态变化，通常用于性能分析和调试。
        obj.currentHeapSize = window.performance.memory.usedJSHeapSize;
    } catch (e) {}
    try {
        // 表示 JavaScript 堆内存的最大限制，单位为字节。它用于指示浏览器允许的最大堆内存大小，帮助开发者了解在执行复杂应用时可能遇到的内存限制，以便进行性能优化和避免内存溢出?
        obj.heapSizeLimit = window.performance.memory.jsHeapSizeLimit
    } catch (e) {}
    try {
        obj.totalJSHeapSize = window.performance.memory.totalJSHeapSize;
    } catch (e) {}
    const t1 = getGpuUnmaskedInfo();
    obj.renderer = t1.renderer;
    obj.vendor = t1.vendor;
    obj.unmaskedRenderer = t1.unmaskedRenderer;
    obj.unmaskedVendor = t1.unmaskedVendor;
    obj.detectedBrowser = detectBrowserName();
    isDevToolsOpen();
    let t2 = getWebGLImpParams();
    await getDeviceMotionEvent(obj);
    try {
        for (let key in t2) {
            obj[key] = t2[key]
        }
    } catch (e) {}
    try {
        console.log('测试问题++=1', platform)
        // 创建一个 UAParser 实例
        const parser = new UAParser();

        // 获取设备信息
        const result = parser.getResult();


        const deviceInfo = parser.getDevice();
        const browserInfo = parser.getBrowser();
        const osInfo = parser.getOS();
        if (navigator.userAgentData) {
            await navigator.userAgentData.getHighEntropyValues(["platform", "platformVersion", "architecture", "model", "ua"])
                .then(ua => {

                    obj.userAgentData = ua;
                    obj.deviceModel = ua.model;
                })
                .catch(error => {});
        } else {
            obj.deviceModel = deviceInfo.model;

        }
        if (!obj.deviceModel) {
            obj.deviceModel = deviceInfo.model;
        }
        // console.log('测试deviceInfo',deviceInfo.model )
        obj.browser = result.browser;
        obj.OperatingSystem = result.os;
        obj.deviceInfo = result.Device;
        obj.cpu = result.cpu;
        // obj.deviceModel = deviceInfo.model;
        obj.BrowserName = browserInfo.name;
        obj.osName = osInfo.name;
    } catch (e) {

    }

    //   // 将信息打印到页面
    //   const infoContainer = document.getElementById('info-container');
    //   let infoText = '';
    //   for (let key in obj) {
    //       infoText += `<strong>${key}:</strong> ${obj[key]}<br>`;
    //   }
    //   infoContainer.innerHTML = infoText;


    sendBi(obj);



};

function collectAppInfo(userAgent, referer) {
        

    // 映射表：Referer 对应的应用包名或来源
    const refererToAppMap = {
        'tiktok.com': {
            appName: 'TikTok',
            packageName: 'com.zhiliaoapp.musically',
        },
        'pangleglobal.com': {
            appName: 'Pangle',
            packageName: 'com.bytedance.pangle',
        },
        'douyin.com': {
            appName: 'Douyin',
            packageName: 'com.ss.android.ugc.aweme',
        },
        'kuaishou.com': {
            appName: 'Kuaishou',
            packageName: 'com.kuaishou.nebula',
        },
        'facebook.com': {
            appName: 'Facebook',
            packageName: 'com.facebook.katana',
        },
        'instagram.com': {
            appName: 'Instagram',
            packageName: 'com.instagram.android',
        },
        'snapchat.com': {
            appName: 'Snapchat',
            packageName: 'com.snapchat.android',
        },
        'adcolony.com': {
            appName: 'AdColony',
            packageName: 'com.adcolony.sdk',
        },
        'applovin.com': {
            appName: 'AppLovin',
            packageName: 'com.applovin.sdk',
        },
        'unityads.unity3d.com': {
            appName: 'Unity Ads',
            packageName: 'com.unity3d.ads',
        },
        'chartboost.com': {
            appName: 'Chartboost',
            packageName: 'com.chartboost.sdk',
        },
        'inmobi.com': {
            appName: 'InMobi',
            packageName: 'com.inmobi.sdk',
        },
        'ironsrc.com': {
            appName: 'ironSource',
            packageName: 'com.ironsource.sdk',
        },
        'admob.com': {
            appName: 'AdMob',
            packageName: 'com.google.android.gms.ads',
        },
        'google.com': {
            appName: 'Google Ads',
            packageName: 'com.google.android.googlequicksearchbox',
        },
        'twitter.com': {
            appName: 'Twitter',
            packageName: 'com.twitter.android',
        },
        'linkedin.com': {
            appName: 'LinkedIn',
            packageName: 'com.linkedin.android',
        },
        'reddit.com': {
            appName: 'Reddit',
            packageName: 'com.reddit.frontpage',
        },
        'pinterest.com': {
            appName: 'Pinterest',
            packageName: 'com.pinterest',
        },
        'youtube.com': {
            appName: 'YouTube',
            packageName: 'com.google.android.youtube',
        },
        'amazon.com': {
            appName: 'Amazon',
            packageName: 'com.amazon.mShop.android.shopping',
        },
        'ebay.com': {
            appName: 'eBay',
            packageName: 'com.ebay.mobile',
        },
        'huawei.com': {
            appName: 'Huawei Ads',
            packageName: 'com.huawei.hms.ads',
        },
        'vungle.com': {
            appName: 'Vungle',
            packageName: 'com.vungle.publisher',
        },
        'taboola.com': {
            appName: 'Taboola',
            packageName: 'com.taboola.android',
        },
        'outbrain.com': {
            appName: 'Outbrain',
            packageName: 'com.outbrain.sdk',
        },
        'beeshortdrama.com': {
            appName: 'Bee Short Drama',
            packageName: 'com.bee.shortdrama',
        },
    };

    // User-Agent 中可能的关键字段匹配
    const userAgentPatterns = [{
            pattern: /AppName\/([\w.-]+)/i,
            key: 'appName'
        },
        {
            pattern: /BytedanceWebview\/([\w]+)/i,
            key: 'webviewVersion'
        },
        {
            pattern: /AppId\/([\w]+)/i,
            key: 'appId'
        },
        {
            pattern: /Channel\/([\w.-]+)/i,
            key: 'channel'
        },
    ];

    // 提取 User-Agent 中的信息
    const userAgentInfo = {};
    userAgentPatterns.forEach(({
        pattern,
        key
    }) => {
        const match = userAgent.match(pattern);
        if (match) userAgentInfo[key] = match[1];
    });

    // 从 Referer 中推测来源
    let refererInfo = {
        appName: '',
        packageName: ''
    };
    for (const [key, value] of Object.entries(refererToAppMap)) {
        if (referer.includes(key)) {
            refererInfo = value;
            break;
        }
    }

    // 返回收集到的信息
    return {
        userAgent,
        referer,
        userAgentInfo,
        refererInfo,
    };
}
// // 这个 JavaScript 函数 getDeviceType 用于检测用户设备的类型。它通过分析 navigator.userAgent 字符串中的内容，判断设备是：
// - "tablet"：如果用户代理字符串中匹配到 MSIE 和 Touch，或匹配到 Android、Silk、iPad、Tablet 但不包含 Mobile。
// - "mobile"：如果用户代理字符串中匹配到 iPad、Blackberry、Opera Mobi、Opera Mini、IEMobile 或 Mobile。
// - "desktop"：如果上述条件都不满足，则返回 desktop。
// 总体来说，这个函数用于确定用户是使用平板、手机还是桌面设备
function getDeviceType() {
    return null !== navigator.userAgent.match(/MSIE/i) && null !== navigator.userAgent.match(/Touch/i) || null !== navigator.userAgent.match(/Android|Silk|iPad|Tablet/i) && null === navigator.userAgent.match(/Mobile/i) ? "tablet" : null !== navigator.userAgent.match(/iPad|Blackberry|Opera Mobi|Opera Mini|IEMobile|Mobile/i) ? "mobile" : "desktop"
};
/**
 * 用于获取当前用户设备的 GPU 信息，具体包括渲染器（renderer）、供应商（vendor）、未掩码的渲染器（unmaskedRenderer）和未掩码的供应商（unmaskedVendor）
 */
function getGpuUnmaskedInfo() {
    const e = {
        renderer: "",
        vendor: "",
        unmaskedRenderer: "",
        unmaskedVendor: ""
    };
    try {
        /**
         * 这行代码创建一个 HTML5 <canvas> 元素，并试图获取其 WebGL 上下文。WebGL 是一种用于在网页上绘制 3D 图形的 JavaScript API。
         */
        const t = document.createElement("canvas").getContext("webgl");
        if (void 0 === t)
            return;
        // 调用 t.getParameter 方法，分别获取 GPU 的渲染器和供应商信息，并将其存储到对象 e 中。

        e.renderer = t.getParameter(t.RENDERER),
            e.vendor = t.getParameter(t.VENDOR);
        // 尝试获取 WEBGL_debug_renderer_info 扩展。如果浏览器支持此扩展，可以获取更详细的未掩码 GPU 信息。
        const i = t.getExtension("WEBGL_debug_renderer_info");
        i && (e.unmaskedRenderer = t.getParameter(i.UNMASKED_RENDERER_WEBGL),
            e.unmaskedVendor = t.getParameter(i.UNMASKED_VENDOR_WEBGL))
    } catch (e) {

    }
    return e
}
// 用于获取 WebGL 的一系列实现参数，主要是为了检查浏览器的图形能力。具体来说，它会创建一个 WebGL 上下文，并通过一系列方法调用来获取与图形渲染相关的参数。
function getWebGLImpParams() {
    try {
        var e = document.createElement("canvas").getContext("webgl");
        if (!e)
            return {};
        var t = document.createElement("canvas").getContext("webgl2");
        return {
            glVersion: e.getParameter(e.VERSION) || "Unknown",
            shadingLanguageVersion: e.getParameter(e.SHADING_LANGUAGE_VERSION) || "Unknown",
            maxTextureSize: e.getParameter(e.MAX_TEXTURE_SIZE) || 0,
            maxCubeMapTextureSize: e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE) || 0,
            max3DTextureSize: t ? t.getParameter(t.MAX_3D_TEXTURE_SIZE) : 0,
            maxRenderBufferSize: e.getParameter(e.MAX_RENDERBUFFER_SIZE) || 0,
            maxVertexUniformVectors: e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS) || 0,
            maxFragmentUniformVectors: e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS) || 0,
            maxVaryingVectors: e.getParameter(e.MAX_VARYING_VECTORS) || 0,
            maxCombinedTextureImageUnits: e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS) || 0,
            powerPreference: e.getContextAttributes().powerPreference || "Unknown",
            maxVertexAttribs: e.getParameter(e.MAX_VERTEX_ATTRIBS) || 0,
            depthBits: e.getParameter(e.DEPTH_BITS) || 0,
            stencilBits: e.getParameter(e.STENCIL_BITS) || 0,
            maxDrawBuffers: t ? t.getParameter(t.MAX_DRAW_BUFFERS) : 0,
            maxColorAttachments: t ? t.getParameter(t.MAX_COLOR_ATTACHMENTS) : 0,
            maxSamples: t ? t.getParameter(t.MAX_SAMPLES) : 0,
            supportedExtensionsLength: (e.getSupportedExtensions() || []).length
        }
    } catch (e) {
        return
    }
}
// 获取设备运动状态
async function getDeviceMotionEvent(obj) {
    if (window.DeviceMotionEvent) {
        await window.addEventListener('devicemotion', async function(event) {
            const acceleration = event.acceleration;

            // 如果需要包括重力影响，使用 event.accelerationIncludingGravity
            const accelerationIncludingGravity = event.accelerationIncludingGravity;
            const interval = event.interval;
            obj.accelerationX = acceleration.x;
            obj.accelerationY = acceleration.y;
            obj.accelerationZ = acceleration.z;
            obj.accelerationIncludingGravityX = accelerationIncludingGravity.x;
            obj.accelerationIncludingGravityY = accelerationIncludingGravity.y;
            obj.accelerationIncludingGravityZ = accelerationIncludingGravity.z;
            obj.interval = interval;

        });
    }
}
// 这个函数的主要目的是检测用户的浏览器类型。它通过检查用户代理字符串和特定浏览器的特征来识别浏览器，比如 Chrome、Opera、IE、Edge 和 Mozilla。

function detectBrowserName() {

    let e, t, i, o, n, s;
    je.tc.detectedBrowser = "";
    const r = window.navigator && window.navigator.userAgentData && window.navigator.userAgentData.brands && window.navigator.userAgentData.brands.map((e => e.brand)) || [];
    try {
        e = !(!window.chrome || window.opr || void 0 === window.chrome || !window.chrome.webstore && !window.chrome.runtime)
    } catch (e) {
        je.warn("&&576&&", "tc")
    }
    try {
        t = !!window.chrome && (!!window.opr || !!window.opera || "opera" in window || "undefined" != typeof opera && ("version" in opera || opera.version()) || "undefined" != typeof opr && opr.addons)
    } catch (e) {
        je.warn("&&577&&", "tc")
    }
    try {
        i = !!document.documentMode
    } catch (e) {
        je.warn("&&578&&", "tc")
    }
    try {
        o = !i && (!!window.styleMedia || r.includes("Microsoft Edge"))
    } catch (e) {
        je.warn("&&579&&", "tc")
    }
    try {
        n = window.CSS.supports("( -moz-user-select:unset )") || void 0 !== window.InstallTrigger
    } catch (e) {
        je.warn("&&580&&")
    }
    try {
        s = "Gecko" === window.navigator.product || window.navigator.productSub
    } catch (e) {
        je.warn("&&581&&", "tc")
    }
    return e ? "Chrome" : t ? "opera" : i ? "IE" : o ? "Edge" : n ? "Mozzila" : 'Gecko'
}

function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => {
        // console.log(`${url} loaded successfully`);
        if (callback) callback();
    };
    script.onerror = () => {
        console.error(`Error loading ${url}`);
    };
    document.head.appendChild(script);
}

function isDevToolsOpen() {
    if (void 0 === je.tc.devtoolsOpen) {
        je.tc.devToolsOpen = !1,
            je.tc.devToolsString = "";
        const e = Math.abs(window.outerWidth - window.innerWidth) > 170,
            t = Math.abs(window.outerHeight - window.innerHeight) > 170;
        t && e || !e && !t || (je.tc.devToolsOpen = !0,
                je.tc.devToolsString = "width-height,"),
            window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized && (je.tc.devToolsOpen = !0,
                je.tc.devToolsString += "firebug,"),
            (window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || window.__VUE_DEVTOOLS_GLOBAL_HOOK__) && (je.tc.devToolsOpen = !0,
                je.tc.devToolsString += "react-vue,"),
            // 这段代码使用了 window.matchMedia("(any-pointer: fine)") 来检查设备的指针输入方式。如果设备支持 精细的指针输入（如鼠标），且匹配此条件，则可能是开发者工具的影响。
            // 开发者工具通常会改变这种匹配的行为，因此，如果匹配成功，认为开发者工具已打开，并将 "match-media," 添加到 devToolsString。
            window.matchMedia && window.matchMedia("(any-pointer: fine)").matches && (je.tc.devToolsOpen = !0,
                je.tc.devToolsString += "match-media,"),
            void 0 !== window.ElementsPanel && (je.tc.devToolsOpen = !0,
                je.tc.devToolsString += "elements,");
        const i = window.console || {};
        try {
            Object.defineProperty(window, "console", {
                    get: function() {
                        return je.tc.devToolsString.includes("console") || (je.tc.devToolsString += "console",
                                je.tc.devToolsOpen = !0),
                            i
                    }
                }),
                console.log("Checking if DevTools is open")
        } catch (e) {
            je.logEvent({
                code: "devtools_console_error"
            })
        } finally {
            try {
                window.console = i
            } catch (e) {}
        }
    }
}

function getUTMParameter(parameterName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameterName);
}

function getNavigatorProperties() {
    const e = [];
    for (let t in window.navigator)
        e.push(t);
    return e.toString()
}

function getDeviceInfo() {
    const ua = navigator.userAgent;
    let deviceInfo = {
        brand: 'Unknown',
        model: 'Unknown',
        os: 'Unknown',
        osVersion: 'Unknown'
    };

    // Apple iPhone, iPad, iPod
    if (ua.includes("iPhone")) {
        deviceInfo.brand = 'Apple';
        deviceInfo.os = 'iOS';
        const match = ua.match(/iPhone OS (\d+_\d+)/);
        if (match) {
            deviceInfo.osVersion = match[1].replace('_', '.');
        }
        deviceInfo.model = ua.match(/iPhone (.*?)(?=;)|iPhone/)[0]; // Match the model name (e.g., "iPhone X")

    } else if (ua.includes("iPad")) {
        deviceInfo.brand = 'Apple';
        deviceInfo.os = 'iOS';
        const match = ua.match(/iPad; CPU OS (\d+_\d+)/);
        if (match) {
            deviceInfo.osVersion = match[1].replace('_', '.');
        }
        deviceInfo.model = "iPad";

    } else if (ua.includes("Android")) {
        deviceInfo.os = 'Android';
        const androidVersionMatch = ua.match(/Android (\d+\.\d+)/);
        if (androidVersionMatch) {
            deviceInfo.osVersion = androidVersionMatch[1];
        }

        // Samsung Galaxy (Common identifiers: "SM-" or "Samsung")
        if (ua.includes("Samsung")) {
            deviceInfo.brand = 'Samsung';
            const samsungMatch = ua.match(/SM-[A-Za-z0-9-]+/);
            if (samsungMatch) {
                deviceInfo.model = samsungMatch[0];
            }

        } else if (ua.includes("Huawei") || ua.includes("Honor")) {
            deviceInfo.brand = 'Huawei';
            const huaweiMatch = ua.match(/(Huawei|Honor)[A-Za-z0-9]+/);
            if (huaweiMatch) {
                deviceInfo.model = huaweiMatch[0];
            }

        } else if (ua.includes("Xiaomi")) {
            deviceInfo.brand = 'Xiaomi';
            const xiaomiMatch = ua.match(/Xiaomi|Redmi ([A-Za-z0-9-]+)/);
            if (xiaomiMatch) {
                deviceInfo.model = xiaomiMatch[0];
            }

        } else if (ua.includes("OPPO")) {
            deviceInfo.brand = 'Oppo';
            const oppoMatch = ua.match(/CPH[A-Za-z0-9-]+/);
            if (oppoMatch) {
                deviceInfo.model = oppoMatch[0];
            }

        } else if (ua.includes("Vivo")) {
            deviceInfo.brand = 'Vivo';
            const vivoMatch = ua.match(/Vivo[A-Za-z0-9-]+/);
            if (vivoMatch) {
                deviceInfo.model = vivoMatch[0];
            }

        } else if (ua.includes("OnePlus")) {
            deviceInfo.brand = 'OnePlus';
            const onePlusMatch = ua.match(/OnePlus[A-Za-z0-9-]+/);
            if (onePlusMatch) {
                deviceInfo.model = onePlusMatch[0];
            }

        } else if (ua.includes("Google Pixel")) {
            deviceInfo.brand = 'Google';
            const pixelMatch = ua.match(/Pixel \d+/);
            if (pixelMatch) {
                deviceInfo.model = pixelMatch[0];
            }

        } else if (ua.includes("Realme")) {
            deviceInfo.brand = 'Realme';
            const realmeMatch = ua.match(/Realme[A-Za-z0-9-]+/);
            if (realmeMatch) {
                deviceInfo.model = realmeMatch[0];
            }

        } else if (ua.includes("Asus")) {
            deviceInfo.brand = 'Asus';
            const asusMatch = ua.match(/Asus[A-Za-z0-9-]+/);
            if (asusMatch) {
                deviceInfo.model = asusMatch[0];
            }

        } else if (ua.includes("Lenovo")) {
            deviceInfo.brand = 'Lenovo';
            const lenovoMatch = ua.match(/Lenovo[A-Za-z0-9-]+/);
            if (lenovoMatch) {
                deviceInfo.model = lenovoMatch[0];
            }

        } else if (ua.includes("Meizu")) {
            deviceInfo.brand = 'Meizu';
            const meizuMatch = ua.match(/Meizu[A-Za-z0-9-]+/);
            if (meizuMatch) {
                deviceInfo.model = meizuMatch[0];
            }
        }
    }

    return deviceInfo;
}


// UAParser 已本地引入（js/ua-parser.min.js），页面加载后再采集设备信息
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    try { getInfo(); } catch (e) { console.error(e); }
  }, 300);
});
