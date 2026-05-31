import { createContext } from "react";
import type { Country } from "../services/models/Country";

export type ModalType =
  | "view"
  | "viewUser"
  | "update"
  | "updateUser"
  | "delete"
  | "AddVisitor"
  | "updatePasswordAndEmail"
  | null;

interface ModuleContextType {
  openId: number;
  setOpenId: React.Dispatch<React.SetStateAction<number>>;
  modalType: ModalType;
  setModalType: React.Dispatch<React.SetStateAction<ModalType>>;
  onCloseModuleMenu: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseModule: () => void;
  isLoading: boolean;
  countries: Country[];
  isOpeNestedModal: boolean;
  setIsOpenNestedModal: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseNestedModalModule: () => void;
}

export const ModuleContext = createContext<ModuleContextType | null>(null);
