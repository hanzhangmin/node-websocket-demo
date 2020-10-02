const ws = require("nodejs-websocket");
// 导入依赖包

const port = 3000;
let count = 0; //记录加入聊天室的人数
// 一旦有用户连接这个网站，函数就会执行就会为该用户分配一个connect对象
const server = ws.createServer(connect => {
    console.log('连接成功！');
    // 每当接受用户数据，这个函数就会触发

    count++;
    connect.userName = `用户${count}`; //给每一个用户起一个名字;
    connect.id = count;
    broadcast(`${connect.userName}进入了聊天室！`);
    connect.on("text", data => {
        // 当接受到一个用户的信息，就要告诉所有人这个信息
        broadcast1(`${connect.userName}:${data}`, connect);
    })

    connect.on("close", () => {
        broadcast(`${ connect.userName}离开了聊天室！`);
        // 告诉所有人，有人离开了
    })

    // 如果不对error进行处理，代码就会报错，app.js运行出错。
    connect.on("error", () => {
        console.log("链接出错了！");
    })
})

// 广播 
function broadcast(data) {
    server.connections.forEach(item => {
        item.send(data);
    })
}

function broadcast1(data, conn) {
    server.connections.forEach(item => {
        if (conn.id != item.id) {
            item.send(data);
        }
    })
}


server.listen(port, () => {
    console.log(`${port}      端口启动成功！`);

})