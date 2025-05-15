import { createContext, useContext, useState } from "react";
import {
  ss_mecanizado,
  ss_corte,
  ss_nesting,
} from "../Backend/initialize_sheets";

const GlobalContext = createContext();
export const useGlobal = () => useContext(GlobalContext);

export const GlobalContextProvider = ({ children }) => {
  const [mecanizado, setMecanizado] = useState([]);
  const [corte, setCorte] = useState([]);
  const [nesting, setNesting] = useState([]);
  const [responseGeneral, setResponseGeneral] = useState(null);

  const getMecanizado = async () => {
    try {
      const res = await ss_mecanizado.getData();
      setMecanizado(res.reverse());
    } catch (e) {
      console.log(e);
    }
  };
  const getCorte = async () => {
    try {
      const res = await ss_corte.getData();
      setCorte(res.reverse());
    } catch (e) {
      console.log(e);
    }
  };
  const getNesting = async () => {
    try {
      const res = await ss_nesting.getData();
      setNesting(res.reverse());
    } catch (e) {
      console.log(e);
    }
  };
  const updateMecanizado = async (id, values) => {
    try {
      const { error, status } = await ss_mecanizado.update({
        colName: "id",
        id,
        values,
      });
      if (error) {
        throw new Error(error.message);
      }
      return { status };
    } catch (e) {
      return { error: e };
    }
  };
  const updateCorte = async (id, values) => {
    try {
      const { error, status } = await ss_corte.update({
        colName: "id",
        id,
        values,
      });
      if (error) {
        throw new Error(error.message);
      }
      return { status };
    } catch (e) {
      return { error: e };
    }
  };
  const updateNesting = async (id, values) => {
    try {
      const { error, status } = await ss_nesting.update({
        colName: "id",
        id,
        values,
      });
      if (error) {
        throw new Error(error.message);
      }
      return { status };
    } catch (e) {
      return { error: e };
    }
  };
  const getTonInPeriod = (data, startDate, endDate) => {
    const start = turnToDate(startDate);
    const end = turnToDate(endDate);
    const filteredData = data.filter((item) => {
      const date = turnToDate(item.f_fin);
      return date >= start && date <= end;
    });
    const totalTon = filteredData.reduce((acc, item) => acc + item.tn_procesadas, 0);
    return totalTon;
  };
  const getTonInPeriodTotal = (startDate, endDate) => {
    const start = turnToDate(startDate);
    const end = turnToDate(endDate);
    const corteNoMecanizado = corte.filter((item) => {
      const date = turnToDate(item.f_fin);
      return date >= start && date <= end;
    })
    const totalTonNoMecanizadaCorte = corteNoMecanizado.reduce((acc, item) => acc + item.tn_no_mecanizada, 0);
    const nestingNoMecanizado = corte.filter((item) => {
      const date = turnToDate(item.f_fin);
      return date >= start && date <= end;
    })
    const totalTonNoMecanizadaNesting = nestingNoMecanizado.reduce((acc, item) => acc + item.tn_no_mecanizada, 0);
    const totalTonNoMecanizada = totalTonNoMecanizadaCorte + totalTonNoMecanizadaNesting;
    const totalTonMecanizada = getTonInPeriod(mecanizado, startDate, endDate);
    const totalTon = totalTonNoMecanizada + totalTonMecanizada;
    return totalTon;
  };
  const turnToDate = (date) => {
    const year = date.split("-")[0];
    const month = date.split("-")[1];
    const day = date.split("-")[2];
    const newDate = new Date(year, month - 1, day);
    return newDate;
  };
  return (
    <GlobalContext.Provider
      value={{
        mecanizado,
        corte,
        nesting,
        responseGeneral,
        getCorte,
        getMecanizado,
        getNesting,
        updateMecanizado,
        updateCorte,
        updateNesting,
        setResponseGeneral,
        getTonInPeriod,
        getTonInPeriodTotal
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
