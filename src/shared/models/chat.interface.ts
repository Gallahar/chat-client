import { IMessage } from './message.interface'
import { IUser } from './user.interface'

export const enum ChatEvent {
	ChatConnect = 'chat/connect',
	ChatStart = 'chat/start',
	ChatReceiveNew = 'chat/receive_new',
	ChatDelete = 'chat/delete',
	ChatReceiveDelete = 'chat/receive_delete',
}

export interface IConnectionDto {
	userId: string
}

export interface IStartChatDto {
	fromUserId: string
	toUserId: string
}

export interface IDeleteChatDto {
	chatId: string
}

export interface IChat {
	users: IUser[]
	messages: IMessage[]
	_id: string
	createdAt: string
	updatedAt: string
}
