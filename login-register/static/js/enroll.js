//确认按钮绑定事件
$.getid('sure').onclick = () => {
    let useV = $.getid('username').value;
    let pwdV = $.getid('password').value;    
    if(useV !== '' && pwdV !== '') {
        var options = {
            url: 'http://127.0.0.1:8080/enroll',
            method:'post',
            data: {
                username: useV,
                password: pwdV
            }
        }
        $.ajax(options,(res) => {
            let result = JSON.parse(res);
            // console.log(result);
            if(result.status === 200) {
                window.location.href = 'http://127.0.0.1:8080/confirm'
            }
            else {
                alert(result.err)
            }
        })
    }else {
        alert('请输入正确的用户名和密码')
    }
  
}

//取消按钮的事件
$.getid('cancel').onclick = () => {
    window.location.href = 'http://127.0.0.1:8080'
}