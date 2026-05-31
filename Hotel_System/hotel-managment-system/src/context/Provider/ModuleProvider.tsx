import { useState } from "react";
import { useCountries } from "../../hooks/useGetAllCountry";
import { ModuleContext, type ModalType } from "../ModuleContext";

export function ModuleProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openId, setOpenId] = useState<number>(0);
  const [modalType, setModalType] = useState<ModalType>(null);

  const [isOpeNestedModal, setIsOpenNestedModal] = useState(false);

  const onCloseModuleMenu = () => {
    setOpenId(0);
    setModalType(null);
  };

  const onCloseModule = () => setIsOpen(false);
  const onCloseNestedModalModule = () => setIsOpenNestedModal(false);

  const { isLoading, countries } = useCountries();

  return (
    <ModuleContext.Provider
      value={{
        modalType,
        setModalType,
        openId: openId,
        setOpenId: setOpenId,
        onCloseModuleMenu,
        isOpen,
        setIsOpen,
        onCloseModule,
        isLoading,
        countries,
        isOpeNestedModal,
        onCloseNestedModalModule,
        setIsOpenNestedModal,
      }}
    >
      {children}
    </ModuleContext.Provider>
  );
}
