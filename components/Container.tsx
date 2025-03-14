import { ContainerProps } from "@/types/props";
import { memo } from "react";

const Container = ({ children }: ContainerProps) => {
  return (
    <main className="min-h-screen p-3">
        {children}
    </main>
  )
}

export default memo(Container)