
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ly970623',
    database:'nodejs'
});

exports.getUser = (userdata) => {
    const {username, password} = userdata;
    let sql = `select * from register where username="${username}" and password = "${password}" and id`;  
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if(err) reject(err);
            else if(rows.length > 0) resolve(rows);
            else resolve(false);
        })
    })
}

exports.enrollUser = (userdata) => {
    const {username, password} = userdata;
    let sql = `insert into register(username, password) values("${username}", "${password}") `;  
    return new Promise((resolve, reject) => {
        db.query(sql, (err) => {
            // console.log(err)
            if(err) reject(err);
            else resolve(1);
        })
    })
}

exports.oldUser = (userdata) => {
    const {username, password} = userdata;
    let sql = `select * from register where username="${username}"`; 
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if(err) reject(err);
            else if(rows.length > 0) resolve(1);
            else resolve(0);
        })
    })
}


exports.addcontent = (userdata) => {
    const {author, title, content, images, id, createtime} = userdata;
    // console.log(JSON.stringify(images));
    // let images1 = JSON.stringify(images);
    let imgdata = {images};
    let sql = `insert into content(author, title, content, imgFile, uid,createtime) values('${author}', '${title}', '${content}','${JSON.stringify({imgdata})}', '${id}', '${createtime}') `;  
    return new Promise((resolve, reject) => {
        db.query(sql, (err) => {
            // console.log(err)
            if(err) reject(err);
            else resolve(1);
        })
    })
}


exports.getContent = (id) => {
    let sql = `select * from content where uid="${id}"`; 
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            let data = rows.map(item => {
                item.images = JSON.parse(item.imgFile).imgdata;
                return item;
            })
            //返回的data是一个数组  包含对应id的信息
            if(err) reject(err);
            else resolve(data);
        })
    })
}

exports.delContent = (id) => {
    let sql = `delete  from content where id="${id}"`; 
    return new Promise((resolve, reject) => {
        db.query(sql, (err) => {
            //返回的data是一个数组  包含对应id的信息
            if(err) reject(err);
            else resolve(true);
        })
    })
}




exports.getC = () => {
    let sql = `select * from content`; 
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            let data = rows.map(item => {
                item.images = JSON.parse(item.imgFile).imgdata;
                return item;
            })
            //返回的data是一个数组  包含对应id的信息
            if(err) reject(err);
            else resolve(data);
        })
    })
}