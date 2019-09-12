const handle = data => JSON.parse(Object.keys(data)[0]);
//放回对象的格式
const product = (params = {} ) => {
    const {status = 200,data = null,err = ''} = params;
    return {
        status,
        err,
        data,
    }
}

exports.product = product;
exports.handle = handle;