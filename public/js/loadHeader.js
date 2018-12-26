define(["jquery", "login", "register"], function($, LoadLoginModal, LoadRegisterModal) {
    function Header() {
        this.init();
    }

    Header.headTemplate =  `<nav class="navbar navbar-inverse">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">拉勾网管理系统</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collaps
            e-1">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="/index.html">首页</a></li>
                    <li class="management"><a href="/html/position.html">职位管理</a></li>
                </ul>
        
                <ul class="nav navbar-nav navbar-right not-loged-in">
                    <li><a href="#" data-toggle="modal" data-target="#loginModal">登录</a></li>
                    <li><a href="#" data-toggle="modal" data-target="#registerModal">注册</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right loged-in hidden">
                    <li><a href="#">欢迎：</a></li>
                    <li ><a href="#" class="link-logout">退出</a></li>
                </ul>
            </div>
        </div>
    </nav>`;

    $.extend(Header.prototype, {
        //初始化
        init() {
            this.render();
            this.loginUser();
            this.addListener();
        },
        //加载头部
        render() {
            // $("header").load("/html/include/header.html");
            $(Header.headTemplate).appendTo("header");
        },
        loginUser() {
            const user = sessionStorage.loginUser;
            if(user) {
                $(".loged-in").removeClass("hidden").siblings(".not-loged-in").addClass("hidden");
                $(".loged-in li:first a").text("欢迎：" + user);
            } else {
                this.loadModal();
            }
        },
        loadModal() {
            new LoadLoginModal();
            new LoadRegisterModal();
        },
        addListener() {
            $(".link-logout").click(()=>{
                sessionStorage.removeItem("loginUser");
                location.reload();
            })
        }
    });

    return new Header();
});