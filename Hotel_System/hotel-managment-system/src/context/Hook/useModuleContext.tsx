import { useContext } from "react";
import { ModuleContext } from "../ModuleContext";

export function useModuleContext() {
  const ctx = useContext(ModuleContext);
  if (!ctx) {
    throw new Error("useModuleContext must be used inside ModuleProvider");
  }
  return ctx;
}
