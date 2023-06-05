export default function AuthSessionStatus({ className = "", status }: { status: string, [key: string]: any }) {
  return (
    <div className={`font-medium text-sm text-green-600 ${className}`}>
      {status}
    </div>
  )
}
