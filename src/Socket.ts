import * as io from 'socket.io-client';

class Socket {
    id: string;
    io: SocketIOClient.Socket;

    constructor(token: string, ns = '') {
    // ns: room.name && token: jwt authentication
    this.io = io(`${window.location.hostname}:3030/${ns}`, { query: `token=${token}` });
    this.id = this.io.id;
    // Bindings allow usage in exported environment
    this.initSocket = this.initSocket.bind(this);
    this.ask = this.ask.bind(this);
    this.nick = this.nick.bind(this);
  }

  // Functions invoked upon message receipt
  initSocket(parameters: { callback: Function, idhandler: Function, userhandler: Function }) {
      let {callback, idhandler, userhandler} = parameters;
    this.io.on('assignment', idhandler);
    this.io.on('questionAsked', callback);
    this.io.on('newUser', userhandler);
  }

  // Methods for emitting messages
  ask(question: string) { this.io.emit('questionAsked', question); }
  nick(newName: string) { this.io.emit('nameChanged', newName); }
  vote(questionId: number) { this.io.emit('voteCast', questionId); }
}
export default Socket;
