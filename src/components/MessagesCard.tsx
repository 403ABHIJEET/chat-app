import dayjs from 'dayjs';

interface props {
    name: string,
    content: string
    time: Date
}

export function SenderMessageCard({name, content, time}: props) {
    return (
        <div>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-50">{dayjs(time).format('MMM D, YYYY h:mm A')}</time>
                </div>
                <div className="chat-bubble">{content}</div>
            </div>
        </div>
    )
}


export function ReceiverMessageCard({name, content, time}: props) {
    return (
        <div>
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-50">{dayjs(time).format('MMM D, YYYY h:mm A')}</time>
                </div>
                <div className="chat-bubble">{content}</div>
            </div>
        </div>
    )
}