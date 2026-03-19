export default function Button({
  children,
  type = "button",
  className = "",
  variant = "primary",
  ...props
}) {
  const baseStyles = "w-full rounded-lg text-center font-bold shadow-md transition-all active:scale-[0.98]"

  const variants = {
    primary: "bg-red-500 hover:bg-opacity-90 text-[#111b0e] py-4",
    secondary: "bg-blue-500 dark:bg-[#152111] border border-[#d5e7d0] dark:border-emerald-900/50 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-background-dark",
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
