import { PresentationChartBarIcon, ScissorsIcon, PaperClipIcon } from "@heroicons/react/16/solid";
export default function Ordenes() {
  return (
    <div className="mt-6 ">
      <div className="grid grid-cols-1 gap-4 max-w-xl mx-auto mt-8">
        <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <span className="rounded-full bg-blue-100 p-3 text-blue-600">
            <PresentationChartBarIcon className="h-8 w-8" />
          </span>

          <div>
            <p className="text-2xl font-medium text-gray-900">0 Tn</p>
            <p className="text-sm text-gray-500">Tonelas totales procesadas en el sector</p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <span className="rounded-full bg-indigo-100 p-3 text-indigo-600">
            <ScissorsIcon className="h-8 w-8" />
          </span>

          <div>
            <p className="text-2xl font-medium text-gray-900">0 Tn</p>
            <p className="text-sm text-gray-500">Tonelas totales procesadas en corte</p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <span className="rounded-full bg-green-100 p-3 text-green-600">
            <PaperClipIcon className="h-8 w-8" />
          </span>

          <div>
            <p className="text-2xl font-medium text-gray-900">0 Tn</p>
            <p className="text-sm text-gray-500">Tonelas totales procesadas en mecanizado</p>
          </div>
        </article>
      </div>
    </div>
  );
}
