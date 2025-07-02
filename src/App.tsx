import { Terminal } from "./components/Terminal";

function App() {
  return (
    <main className="min-h-screen font-mono flex items-center justify-center">
      <div className="w-screen h-screen bg-base/80 backdrop-blur-lg rounded-xl shadow-2xl flex flex-col overflow-hidden border border-surface0">
        {/* Scrollable Terminal Content */}
        <div className="flex-1 overflow-y-auto">
          <Terminal />
        </div>
      </div>
    </main>
  );
}

export default App;
