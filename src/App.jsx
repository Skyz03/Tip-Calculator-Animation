import TipCalculator from "./components/TipCalculator"
import Logo from "./components/Logo"


export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-16 bg-[hsl(185,41%,84%)]">
      <Logo />
      <TipCalculator />
    </div>
  )
}

