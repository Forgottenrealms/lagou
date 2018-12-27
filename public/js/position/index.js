require(["../config"], ()=>{
    require(["jquery", "load", "bootstrap"], function($) {
        function Position() {
            this.init();
            this.addListener();
        }

        $.extend(Position.prototype, {
            init() {
                // console.log("进来了")
                // console.log($("li.management"))
                $("li.management").addClass("active").siblings().removeClass("active");
                const user = sessionStorage.getItem("loginUser");   //获取登录用户名
                // console.log(user)

                const limits = 10;  //每页显示的条数

                let html1 = "";
                //查询条数
                $.get("http://localhost:3000/api/positions/findCount.do", {user}, (data) => {
                    const pages = Math.ceil(data.res_body.ret.data / limits);
                    for(let i = 0; i < pages; i++) {
                        html1 += `<li class="pages"><a href="#">${i + 1} <span class="sr-only"></span></a></li>`;
                    }
                    $(html1).insertBefore(".pagination .next-arrow");
                });

                let html2 = "";
                $.get("http://localhost:3000/api/positions/find.do", {user, pages: 1}, (data) => {  //  通过登录用户查找数据
                    console.log(data)
                    $.each(data.res_body.ret.data, (index, curr) => {
                        html2 += `<tr>
                            <td class="hidden">${curr._id}</td>
                            <td>${index + 1}</td>
                            <td><img src="${curr.logo}" style="width:40px;height:40px;"></td>
                            <td>${curr.position}</td>
                            <td>${curr.company}</td>
                            <td>${curr.experience}</td>
                            <td>${curr.type}</td>
                            <td>${curr.address}</td>
                            <td>${curr.salary}</td>
                            <td><a href="#" class="link-update" data-toggle="modal" data-target="#updateModal">修改</a> <a href="javacript:void(0);" class="link-delete">删除</a></td>
                        </tr>`;
                    });
                    $("#tbd").html(html2);
                });
            },
            //事件监听
            addListener() {
                $(".btn-add-position").on("click", this.addCompanyHandle);  //  添加职位处理
                $(".btn-update-position").on("click", this.updateCompanyHandle);  //  修改职位处理
                $("#tbd").on("click", ".link-update", this.linkUpdateHandle);   //  点击修改链接
                $("#tbd").on("click", ".link-delete", this.linkDeleteHandle);   //  点击删除链接
                $(".pagination").on("click", ".pages a", this.pagesSwitchHandle);   //  点击页数切换
            },
            //添加职位
            addCompanyHandle() {
                //获取表单提交数据
                /*const data = decodeURIComponent($("#add-form").serialize());
                const user = sessionStorage.getItem("loginUser");
                console.log(data + "&user=" + user)
                $.post("http://localhost:3000/api/positions/add.do", data + "&user=" + user, (data)=>{
                    console.log(data)
                });*/

                const formData = new FormData($("#add-form")[0]);
                const user = sessionStorage.getItem("loginUser");   //获取登录用户名
                formData.append("user", user);
                $.ajax({
                    type: "post",
                    url: "/api/positions/add.do",
                    contentType: false,
                    processData: false,
                    data: formData,
                    dataType: "json",
                    success: function(data) {
                        console.log(data)
                        location.reload();
                    }
                })
            },
            // 点击修改链接
            linkUpdateHandle(event) {
                const src = $(event.target);  // 点击的哪一行的链接
                const _tr = src.parents("tr");  // 获取当前行
                
                const 
                    _id = $("td:eq(0)", $(_tr)).text(),
                    _logo = $("td:eq(2) img", $(_tr)).attr("src"),
                    _position = $("td:eq(3)", $(_tr)).text(),
                    _company = $("td:eq(4)", $(_tr)).text(),
                    _experience = $("td:eq(5)", $(_tr)).text(),
                    _type = $("td:eq(6)", $(_tr)).text(),
                    _address = $("td:eq(7)", $(_tr)).text(),
                    _salary = $("td:eq(8)", $(_tr)).text();
                    
                $("#_id", $("#update-form")).val(_id);
                // $("#updateLogo", $("#update-form")).val(logo);
                $("#updatePosition", $("#update-form")).val(_position);
                $("#updateName", $("#update-form")).val(_company);
                $("#updateExperience", $("#update-form")).val(_experience);
                $("#updateType", $("#update-form")).val(_type);
                $("#updateAddress", $("#update-form")).val(_address);
                $("#updateSalary", $("#update-form")).val(_salary);
            },
            // 修改职位处理
            updateCompanyHandle() {
                const formData = new FormData($("#update-form")[0]);
                const user = sessionStorage.getItem("loginUser");   //获取登录用户名
                formData.append("user", user);
                $.ajax({
                    type: "post",
                    url: "/api/positions/update.do",
                    contentType: false,
                    processData: false,
                    data: formData,
                    dataType: "json",
                    success: function(data) {
                        // console.log(data)
                        location.reload();
                    }
                })
            },
            // 删除职位处理
            linkDeleteHandle(event) {
                const src = $(event.target);  // 点击的哪一行的链接
                const _tr = src.parents("tr");  // 获取当前行
                
                const _id = $("td:eq(0)", $(_tr)).text();

                $.get("/api/positions/delete.do", {_id}, ()=>{
                    console.log("删除成功")
                    location.reload();
                })
            },
            //  点击分页
            pagesSwitchHandle(event) {
                const user = sessionStorage.getItem("loginUser");   //获取登录用户名
                var src = $(event.target);
                const pages = src.text();

                let html = "";
                $.get("http://localhost:3000/api/positions/find.do", {user, pages}, (data) => {  //  通过登录用户和页码查找数据
                    // console.log(data)
                    $.each(data.res_body.ret.data, (index, curr) => {
                        html += `<tr>
                            <td class="hidden">${curr._id}</td>
                            <td>${index + 1}</td>
                            <td><img src="${curr.logo}" style="width:40px;height:40px;"></td>
                            <td>${curr.position}</td>
                            <td>${curr.company}</td>
                            <td>${curr.experience}</td>
                            <td>${curr.type}</td>
                            <td>${curr.address}</td>
                            <td>${curr.salary}</td>
                            <td><a href="#" class="link-update" data-toggle="modal" data-target="#updateModal">修改</a> <a href="javacript:void(0);" class="link-delete">删除</a></td>
                        </tr>`;
                    });
                    $("#tbd").html(html);
                });
            }
        });

        new Position();
    });
});