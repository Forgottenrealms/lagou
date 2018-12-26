define(["jquery"], function($) {
    function LoadLoginModal() {
        this.render();
        this.addListener();
    }

    LoadLoginModal.loginModalTemplate = `<div class="modal fade" id="registerModal">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                    <h4 class="modal-title" id="registerModalLabel">用户注册</h4>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger hidden register-error">用户名、密码或邮箱不符合格式</div>
                    <form id="register-form">
                        <input type="hidden" id="registerId">
                        <div class="form-group">
                            <label for="regisUsername">用户名</label>
                            <input type="text" class="form-control" id="regisUsername" name="username" placeholder="输入用户名">
                        </div>
                        <div class="form-group">
                            <label for="regisUserpwd">密码</label>
                            <input type="password" class="form-control" id="regisUserpwd" name="password" placeholder="输入密码">
                        </div>
                        <div class="form-group">
                            <label for="regisConfirmpwd">确认密码</label>
                            <input type="password" class="form-control" id="regisConfirmpwd" placeholder="再次输入密码">
                        </div>
                        <div class="form-group">
                            <label for="regisUseremail">邮箱</label>
                            <input type="text" class="form-control" id="regisUseremail" name="email" placeholder="输入e-mail地址">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-register">注册</button>
                </div>
                </div>
            </div>
        </div>
        `;

    $.extend(LoadLoginModal.prototype, {
        render() {
            $(LoadLoginModal.loginModalTemplate).appendTo("body");
        },
        //注册事件监听
        addListener() {
            $(".btn-register").on("click", this.registerHandle);
            $("#register-form").on("focus", "input", function() {
                $("div.register-error").addClass("hidden");
            })
        },
        //注册事件处理
        registerHandle() {
            const data = $("#register-form").serialize();
            // console.log(data)
            //表单验证
            const 
                username = $("#regisUsername").val(),   //用户名
                password = $("#regisUserpwd").val(),    //密码
                confirmpwd = $("#regisConfirmpwd").val(),   //确认密码
                email = $("#regisUseremail").val();     //邮箱
            
            const 
                reg1 = /^[a-zA-Z0-9_-]{4,16}$/, //用户名
                reg2 = /^[a-zA-Z]\w{5,17}$/,    //密码
                reg3 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //邮箱

            if(!reg1.test(username) || !reg2.test(password) || !reg3.test(email) || (confirmpwd !== password)) {
                $("div.register-error").removeClass("hidden");
            } else {
                $.post("http://localhost:3000/api/users/register.do", data, (data)=>{
                    console.log(data)
                    location.reload();
                });
            }
        }
    });

    return LoadLoginModal;
});