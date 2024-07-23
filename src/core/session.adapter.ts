import { INestApplicationContext, WsMessageHandler } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { AbstractWsAdapter } from "@nestjs/websockets";
import { RequestHandler } from "express";
import { Observable } from "rxjs";
import { Server, ServerOptions, Socket } from 'socket.io';
import * as passport from "passport"
import * as cookieParser from 'cookie-parser';


export class SessionAdapter extends IoAdapter {
    constructor(
        private readonly session: RequestHandler,
        app: INestApplicationContext
    ) {
        super(app);
    }

    create(port: number, options?: ServerOptions & { namespace?: string; server?: any; }): Server {
        const server: Server = super.create(port, options);

        const wrap = (middleware) => (socket, next) =>
            middleware(socket.request, {}, next);

        server.use(wrap(cookieParser()));
        server.use(wrap(this.session));
        server.use(wrap(passport.initialize()));
        server.use(wrap(passport.session()));

        return server;
    }
}