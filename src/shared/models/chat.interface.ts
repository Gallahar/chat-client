import { IMessage } from './message.interface'
import { IUser } from './user.interface'

export const enum ChatEvent {
	ChatConnect = 'chat/connect',
	ChatStart = 'chat/start',
	ChatReceiveNew = 'chat/receive_new',
}

export interface IConnection {
	userId: string
}

export interface StartChat {
	fromUserId: string
	toUserId: string
}

export interface IChat {
	users: IUser[]
	messages: IMessage[]
	_id: string
	createdAt: string
	updatedAt: string
}
