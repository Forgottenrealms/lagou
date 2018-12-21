require.config({
    baseUrl: "/",
    paths: {
        jquery: "/lib/jquery/jquery-1.12.4.min",
        bootstrap: "/lib/bootstrap/js/bootstrap.min",
        load: "/js/loadHeader",  //加载头部
        swiper: "/lib/swiper/js/swiper.min"
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        }
    }
});