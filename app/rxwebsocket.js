class rxwebsocket {
    constructor() {

    }
    connect() {
        let cmd = {
            "type": 1,
            "target": "Send",
            "arguments": [
                {
                    "SignalRType": 4,
                    "Type": 4,
                    "Content": {
                        "Title": "关注好友",
                        "Body": 2
                    }
                }
            ]
        }
        const webSocketSubject = rxjs.webSocket.webSocket({
            url: "ws://47.98.226.195:7102/social/ws",
            openObserver: {
                next: () => {
                    console.log('openObserver->连接成功');
                }
            },
            serializer: msg => JSON.stringify(msg),
            closeObserver: {
                next(closeEvent) {
                    const customError = { code: 6666, reason: "Custom evil reason" }
                    console.log(`code: ${customError.code}, reason: ${customError.reason}`);
                }
            },
            binaryType: "arraybuffer"
        });

        const multiplex = webSocketSubject.multiplex(
            () => (cmd),
            () => (cmd),
            message => {
                console.log(message);
            }
        );

        multiplex.subscribe(
            msg => {
                console.log(msg);
            },
            error => {
                console.log(`code: ${error.code}, reason: ${error.reason}`);
            },
            complete => {
                console.log(complete);
            }
        );
    }
}