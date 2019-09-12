

function jq () {

}
jq.prototype.getid = (id) => {
    return document.getElementById(id);
}
jq.prototype.ajax = (options, callback) => {
    let default_op = {
        url: '',
        method: 'POST',
        async: true,
        data: null
    }
    let new_op = {};
    for(var key in default_op) {
       new_op[key] = default_op[key]
    }
    for(var key in options) {
        if(new_op.hasOwnProperty(key)) {
             new_op[key] = options[key];
        }
    }
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    }
    let method = new_op.method.toUpperCase();
    let data = Object.keys(new_op.data).map(item => item + '=' + new_op.data[item]).join('&');
    xhr.open(method, new_op.url+(method !== 'POST' ? data : ''), new_op.async);
    method === 'POST' && xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded;charset=UTF-8');
    method === 'POST' ? xhr.send(data) : xhr.send();
}

var $ = new jq();
