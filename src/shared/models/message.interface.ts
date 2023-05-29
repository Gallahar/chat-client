export interface IMessage {
	chatId: string
	createdAt: string
	text: string
	updatedAt: string
	user: string
	_id: string
}

export interface ICreateMessage {
	chatId: string
	user: string
	text: string
}

export interface IDeleteMessage {
	messageId: string
}

export interface IDeleteMessageResponse {
	messageId: string
	chatId: string
}

export const enum MessageEvent {
	SendMessage = 'message/send',
	ReceiveNew = 'message/receive',
	DeleteMessage = 'message/delete',
	ReceiveDelete = 'message/receive_delete',
}
