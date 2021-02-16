import React, { createContext, useCallback, useEffect, useState } from "react";
import SQLite, { SQLiteDatabase } from "react-native-sqlite-storage";

export const AppContext = createContext<SQLite.SQLiteDatabase | undefined>(
  undefined
);

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider = ({
  children,
}: AppContextProviderProps): React.ReactElement => {
  const [dbInstance, setDBInstance] = useState<
    SQLite.SQLiteDatabase | undefined
  >(undefined);

  const openDB = useCallback(() => {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    SQLite.openDatabase({
      name: "timer-tracker.db",
      location: "default",
      createFromLocation: "~/www/timer-tracker.db",
    }).then((db: SQLiteDatabase) => {
      setDBInstance(db);
      console.log("[db] Database open!");
    });
  }, []);

  const closeDB = useCallback(() => {
    console.log("[db] Database closed.");
    setDBInstance(undefined);
  }, []);

  useEffect(
    function () {
      openDB();
      return closeDB;
    },
    [closeDB, openDB]
  );

  return (
    <AppContext.Provider value={dbInstance}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
