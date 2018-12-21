define(["jquery", "bootstrap"], function($) {
    function Header() {
        this.init();
    }

    $.extend(Header.prototype, {
        //初始化
        init() {
            this.loadHeader();
        },
        //加载头部
        loadHeader() {
            $("header").load("/html/include/header.html");
        }
    });

    return new Header();
});