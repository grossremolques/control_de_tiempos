import {
  PresentationChartBarIcon,
  ScissorsIcon,
  PaperClipIcon,
} from "@heroicons/react/16/solid";
import { useGlobal } from "../context/GlobalContext";
import { useEffect, useState } from "react";
import { Input, Button } from "../components/Forms";
export default function Ordenes() {
  const {
    getCorte,
    getNesting,
    getMecanizado,
    corte,
    mecanizado,
    nesting,
    getTonInPeriod,
  } = useGlobal();
  const [totales, setTotales] = useState({
    corte: 0,
    mecanizado: 0,
  });
  const [period, setPeriod] = useState(null);
  useEffect(() => {
    getStartMonthDate();
  }, []);
  useEffect(() => {
    getCorte();
    getNesting();
    getMecanizado();
  }, [period]);
  useEffect(() => {
    if (
      corte.length > 0 &&
      nesting.length > 0 &&
      mecanizado.length > 0 &&
      period
    ) {
      setTotales({
        corte:
          getTonInPeriod(corte, period.start, period.end) +
          getTonInPeriod(nesting, period.start, period.end),
        mecanizado: getTonInPeriod(mecanizado, period.start, period.end),
      });
    }
  }, [corte, nesting, period]);
  const getStartMonthDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    setPeriod({
      start: `${year}-${month > 9 ? month : `0${month}`}-01`,
      end: `${year}-${month > 9 ? month : `0${month}`}-31`,
    });
  };
  return (
    <div className="mt-6 ">
      <form className="flex gap-4 items-end">
        <Input
          type="date"
          name="startDate"
          label="Fecha de inicio"
          className="w-full"
          defaultValue={period?.start || ""}
          onChange={(e) =>
            setPeriod((prev) => ({ ...prev, start: e.target.value }))
          }
        />
        <Input
          type="date"
          name="endDate"
          label="Fecha de fin"
          className="w-full"
          defaultValue={period?.end || ""}
          onChange={(e) =>
            setPeriod((prev) => ({ ...prev, end: e.target.value }))
          }
        />
      </form>
      <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto mt-8">
        <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <span className="rounded-full bg-blue-100 p-3 text-blue-600">
            <PresentationChartBarIcon className="h-8 w-8" />
          </span>

          <div>
            <p className="text-2xl font-medium text-gray-900">0 Tn</p>
            <p className="text-sm text-gray-500">
              Tonelas totales procesadas en el sector
            </p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <span className="rounded-full bg-indigo-100 p-3 text-indigo-600">
            <ScissorsIcon className="h-8 w-8" />
          </span>

          <div>
            <p className="text-2xl font-medium text-gray-900">
              {totales.corte.toPrecision(5)} Tn
            </p>
            <p className="text-sm text-gray-500">
              Tonelas totales procesadas en corte
            </p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <span className="rounded-full bg-green-100 p-3 text-green-600">
            <PaperClipIcon className="h-8 w-8" />
          </span>

          <div>
            <p className="text-2xl font-medium text-gray-900">{totales.mecanizado.toPrecision(5)} Tn</p>
            <p className="text-sm text-gray-500">
              Tonelas totales procesadas en mecanizado
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
