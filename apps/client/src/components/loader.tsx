import { useEffect, useState } from "react"
import { useScene } from "../hooks/useScene.ts"

export const Loader = () => {
  const scene = useScene()

  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (!scene?.id) {
      return
    }

    setShowLoader(true)

    const timer = setTimeout(() => {
      setShowLoader(false)
    }, 1000)

    return () => clearInterval(timer)
  }, [scene?.id])

  return (
    <div
      className="grid place-content-center fixed top-0 bottom-0 left-0 right-0 bg-violet-4 border-violet-2 border-y-[35px] -translate-x-full data-[active=true]:translate-x-0 data-[active=false]:duration-500 ease-in-out"
      style={{ zIndex: 99999 }}
      data-active={showLoader}
    >
      <div className="mx-auto w-64 h-64 animate-bounce">
        <img src={"/hero/hero_512.png"} alt="" width={256} height={256} />
      </div>
    </div>
  )
}
