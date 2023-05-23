export interface IMessage {
	chatId: string
	email: string
	text: string
	date: Date
}


export const enum ChatEvent {
    CreateMessage = 'create-message',
	SendMessage = 'send_message',
	RequestAllMessages = 'request_all_messages',
	SendAllMessages = 'send_all_messages',
	ReceiveMessage = 'receive_message',
}