import { ContainerProps } from "@/types/props";
import { memo } from "react";

const Container = ({ children }: ContainerProps) => {
  return (
    <main className="min-h-screen p-3">
      <div className="max-w-6xl mx-auto"> 
        {children}
      </div>
    </main>
  )
}

export default memo(Container)