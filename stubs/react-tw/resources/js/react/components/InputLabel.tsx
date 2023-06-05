export default function InputLabel({ children, value = "", className = "", ...props }: { [key: string]: any }) {
    return (
        <label {...props} className={`block font-medium text-sm text-gray-700 ${className}`}>
            {value || children}
        </label>
    )
}
