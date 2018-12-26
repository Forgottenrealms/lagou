require.config({
    baseUrl: "/",
    paths: {
        jquery: "/lib/jquery/jquery-1.12.4.min",
        bootstrap: "/lib/bootstrap/js/bootstrap.min",
        load: "/js/loadHeader",  //加载头部
        swiper: "/lib/swiper/js/swiper.min",
        login: "/js/common/loginModal",     //登录模态框
        register: "/js/common/registerModal",   //注册模态框
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        }
    }
});