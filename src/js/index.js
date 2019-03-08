var wrap = document.querySelector('.wrap');
var btn = document.querySelector('.next');
var jieguo = document.querySelector('#jieguo')
var mask = document.querySelector('.mask');
var yuanyin;
var idx = 0;
var count = 0;
var data;
var liidx = 0;
//初始化渲染页面
var xml = new XMLHttpRequest;
xml.open('get', '/getdata', true);
xml.onload = function(res) {
    data = JSON.parse(res.target.response);
    if (data.code == 1) {
        render(data.data[count]);
        var sps = [...wrap.querySelectorAll("span")];
        var zqda = wrap.querySelector('#da')
        clickxx(sps); //调用点击选项函数将   sps选项卡的元素传过去
        nextbtn(sps, zqda); //调用点击下一题函数  sps所有的选项节点   zqda 正确答案  传过去
    }
}
xml.send();
//点击选项函数
function clickxx(sps) {
    sps.forEach(function(item, i) { //给选项绑定点击事件
        item.onclick = function() {
            sps[idx].style.background = ""; //之前选中的选中项失去样式
            sps[idx].className = ""; //之前点击的选项取消类名
            this.style.background = "orange"; //当前选中的选项添加样式
            this.className = "ok"; //当前点击的选项添加类名
            idx = i;
        }
    })
}
//点击下一题函数
function nextbtn(sps, zqda) {
    btn.onclick = function() { //点击下一题
        zqda.className = ""
        var xsda = document.querySelector('.ok'); //获取选中的选项
        if (!xsda) { //没有选中选项
            mask.className = "mask"; //弹框显示
            lis = [...mask.querySelectorAll('li')]; //获取弹框内的内容弄
            lis.forEach(function(item, i) { //循环内容绑定点击事件
                item.onclick = function() {
                    lis[liidx].style.background = ""; //之前点击的原因取消样式
                    lis[liidx].style.color = "";
                    this.style.background = "aqua"; //当前点击的选项原因添加样式
                    this.style.color = "#fff";
                    liidx = i;
                }
            })
            var btn = mask.querySelector('.active'); //获取提交按钮
            //点击提交按钮
            btn.onclick = function() {
                lis.forEach(function(item, i) {
                        if (item.style.color = "#fff") {
                            yuanyin = item.inneRHTML; //获取点击原因的内容

                        }
                    })
                    //将原因提交到数据库
                var xml = new XMLHttpRequest;
                xml.open('post', '/active', true);
                xml.setRequestHeader('content-type', 'application/json');
                xml.onload = function(res) {
                    var data = JSON.parse(res.target.response);
                    if (data.code == 1) { //数据库添加成功
                        alert('添加原因成功');
                        location.href('/'); //刷新页面
                    }
                }
                xml.send(JSON.stringify({ yuanyin: yuanyin }))
            }

        } else { //选项选中
            var content = xsda.innerHTML; //获取选中的结果
            if (content === data.data[count].da) { //与正确答案相匹配
                xsda.style.background = "green"; //添加样式
                jieguo.innerHTML = "正确"; //添加判断结果

            } else { //与正确答案不匹配
                xsda.style.background = "red"; //添加响应的样式
                jieguo.innerHTML = "错误"; //添加判断结果
            }

        }

    }
}

//初始页面渲染函数
function render(data) {
    var html = "";
    html = `<p>${data.title}</p><ul class="list">`
    for (var i = 0; i < data.selec.length; i++) {
        html += `<li><span>${data.selec[i].one}</span><b>${data.all[i].xx}</b></li>`
    }
    html += ` </ul>
            <p id="zqda">答案：<i class="hide" id="da">${data.da}</i></p>
           `;
    wrap.innerHTML = html;

}