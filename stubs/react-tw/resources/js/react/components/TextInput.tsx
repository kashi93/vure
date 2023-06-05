interface TextInputProp {
  className?: string
  [key: string]: any
}

export default function TextInput({ className = "", ...props }: TextInputProp) {
  return (
    <input {...props} className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`} />
  )
}
