import TipCalculator from "./components/TipCalculator"
import Logo from "./components/Logo"


export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[hsl(185,41%,84%)]
 text-white p-4">
      <Logo />
      <TipCalculator />
    </div>
  )
}

