export default function ({ message }) {
  return (
    <div className="pop-up flex items-center justify-center rounded-full fixed px-4 py-2 bg-gray-800 text-white text-sm md:text-muted">
      {message}
    </div>
  )
}