interface InputErrorProp {
    className?: string,
    messages: string[]
}

export default function InputError({ className = "", messages }: InputErrorProp) {
    return (
        <ul className={`text-sm text-red-600 space-y-1 ${className}`}>
            {messages.map((message,index) => {
                return <li key={index}>{message}</li>
            })}
        </ul>
    )
}
