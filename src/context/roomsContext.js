import { createContext, useEffect, useState } from "react";
import { database } from "../misc/firebase";
import { transformToArrWithId } from "../misc/helper";
import { useContext } from "react";

const RoomsContext = createContext();

export function RoomsProvider({ children }) {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomListRef = database.ref("rooms");
    roomListRef.on("value", (snap) => {
      const data = transformToArrWithId(snap.val());
      setRooms(data);
    });

    return () => {
      roomListRef.off();
    };
  }, []);
  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
}

export const useRooms = () => useContext(RoomsContext);
