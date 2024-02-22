import { createContext, useContextSelector } from "use-context-selector";

const CurrentRooomContext = createContext();

export const CurrentRoomProvider = ({ children, data }) => {
  return (
    <CurrentRooomContext.Provider value={data}>
      {children}
    </CurrentRooomContext.Provider>
  );
};

export const useCurrentRoom = (selector) =>
  useContextSelector(CurrentRooomContext, selector);
