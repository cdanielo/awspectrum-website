export default function BackgroundGlow() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="glow-blob absolute top-10 left-10 w-96 h-96 rounded-full bg-red-400 dark:bg-red-900" />
      <div className="glow-blob absolute top-1/3 right-10 w-96 h-96 rounded-full bg-green-300 dark:bg-green-800" />
      <div className="glow-blob absolute bottom-10 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-300 dark:bg-blue-900" />
      <div className="glow-blob absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-300 dark:bg-purple-900" />
    </div>
  );
}
