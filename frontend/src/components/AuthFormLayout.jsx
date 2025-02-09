export default function Layout({ children }) {
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-gradient-to-bl from-[#FFD080] to-[#E39529] bg-cover bg-no-repeat"
    >
      <div className="rounded-xl bg-gray-800/50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        {children}
      </div>
    </div>
  )
}
