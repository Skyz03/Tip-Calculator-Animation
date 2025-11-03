import TipCalculator
  from "./components/TipCalculator"


export default function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[hsl(185,41%,84%)]
 text-white p-4">
      <TipCalculator />
    </div>

  )
}


// - Green 900: hsl(183, 100%, 15%)
// - Grey 500: hsl(186, 14%, 43%)
// - Grey 400: hsl(184, 14%, 56%)
// - Grey 200: hsl(185, 41%, 84%)
// - Grey 50: hsl(189, 47%, 97%)
// - White: hsl(0, 100%, 100%)