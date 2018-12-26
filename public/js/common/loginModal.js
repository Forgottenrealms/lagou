define(["jquery"], function($) {
    function LoadLoginModal() {
        this.render();
        this.addListener();     //点击验证码刷新
    }

    LoadLoginModal.loginModalTemplate = `<div class="modal fade" id="loginModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                        <h4 class="modal-title" id="loginModalLabel">用户登录</h4>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger hidden login-error">用户名或密码错误</div>
                        <form id="login-form">
                            <input type="hidden" id="loginId">
                            <div class="form-group">
                                <label for="loginUsername">用户名</label>
                                <input type="text" class="form-control" id="loginUsername" name="username" placeholder="输入用户名">
                            </div>
                            <div class="form-group">
                                <label for="loginUserpwd">密码</label>
                                <input type="password" class="form-control" id="loginUserpwd" name="password" placeholder="输入密码">
                            </div>
                            <div class="form-group">
                                <label for="loginValidateCode">验证码</label>
                                <input type="text" class="form-control" id="loginValidateCode" placeholder="请输入验证码">
                                <div class="validate-code"></div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary btn-login">登录</button>
                    </div>
                </div>
            </div>
        </div>
        `;

    $.extend(LoadLoginModal.prototype, {
        render() {
            $(LoadLoginModal.loginModalTemplate).appendTo("body");
            this.loadValidateCode();
        },
        //加载验证码
        loadValidateCode() {
            // $.getJSON("http://rap2api.taobao.org/app/mock/120022/api/captcha/gen", (data)=>{
            //     $(".validate-code img").attr("src", data.res_body.ret.data.image);
            // });
            $.getJSON("/api/captcha/gen", (data)=>{
                // console.log(data)
                $(".validate-code").html(data.res_body.ret.data.image);
            });
        },
        //事件监听
        addListener() {
            $("div.validate-code").on("click", this.loadValidateCode);  //点击生成验证码
            $(".btn-login").on("click", this.login);                    //点击登录按钮提交表单
            $("#login-form").on("focus", "input", this.hiddenAlert);    //表单输入聚焦隐藏警告框，验证输入
            // $("#login-form").on("blur", "input",this.verify); 
            $("#loginValidateCode").on("blur", function() {         //校验验证码
                $.getJSON("/api/captcha/verify", {code: $(this).val()}, (data)=>{
                    if(!data.res_body.ret.data.valid) {
                        $("div.login-error").removeClass("hidden");
                        $("div.login-error").text("验证码错误");
                    }
                });
            });     //校验验证码
        },
        //登录提交表单
        login() {
            const data = $("#login-form").serialize();
            // console.log(data)
            const 
                username = $("#loginUsername").val(),
                password = $("#loginUserpwd").val();
            const 
                reg1 = /^[a-zA-Z0-9_-]{4,16}$/,
                reg2 = /^[a-zA-Z]\w{5,17}$/;
            if(!reg1.test(username) || !reg2.test(password)) {
                $("div.login-error").removeClass("hidden");
                $("div.login-error").text("用户名或密码不符合格式");
            } else {
                $.post("http://localhost:3000/api/users/login.do", data, (data)=>{
                    // console.log(data)
                    if(data.res_body.ret.code === 1) {
                        sessionStorage.setItem("loginUser", data.res_body.ret.data.username);
                        location.reload();
                    } else {
                        $("div.login-error").removeClass("hidden");
                        $("div.login-error").text("用户名或密码错误");
                    }
                }, "json");
            }
                
        },
        //隐藏警告框
        hiddenAlert() {
            $("div.login-error").addClass("hidden");
        },
        //表单验证
       /* verifyLogin() {
            console.log("正在验证")
            const 
                username = $("#loginUsername").val(),
                password = $("#loginUserpwd").val();
                console.log(username)
                console.log(password)
            const 
                reg1 = /^[a-zA-Z0-9_-]{4,16}$/,
                reg2 = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
            if(!reg1.test(username) || !reg2.test(password)) {
                return false;
            } else {
                return true;
            }
        }*/
    });

    return LoadLoginModal;
});