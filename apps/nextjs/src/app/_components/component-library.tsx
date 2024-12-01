import type { loadComponentTask } from "@devlab/jobs";
import type { RunStatus } from "@trigger.dev/core/v3";
import { useRealtimeRunsWithTag } from "@trigger.dev/react-hooks";

const ComponentLibrary = () => {
  const { runs, error } =
    useRealtimeRunsWithTag<typeof loadComponentTask>("component");

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h3 className="text-lg font-semibold text-red-800">Error</h3>
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Component Runs</h2>
      {runs.length === 0 ? (
        <p className="text-gray-500">No component runs found</p>
      ) : (
        <div className="divide-y divide-gray-200 rounded-lg border">
          {runs.map((run) => (
            <div key={run.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Run #{run.number}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(run.createdAt).toLocaleString()}
                  </p>
                </div>
                <StatusBadge status={run.status} />
              </div>
              {run.error && (
                <div className="mt-2 text-sm text-red-600">
                  Error: {run.error.message}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }: { status: RunStatus }) => {
  const colors: Record<RunStatus, string> = {
    COMPLETED: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800",
    EXECUTING: "bg-blue-100 text-blue-800",
    QUEUED: "bg-yellow-100 text-yellow-800",
    WAITING_FOR_DEPLOY: "bg-gray-100 text-gray-800",
    REATTEMPTING: "bg-purple-100 text-purple-800",
    FROZEN: "bg-slate-100 text-slate-800",
    CANCELED: "bg-gray-100 text-gray-800",
    CRASHED: "bg-red-100 text-red-800",
    INTERRUPTED: "bg-orange-100 text-orange-800",
    SYSTEM_FAILURE: "bg-red-100 text-red-800",
    DELAYED: "bg-yellow-100 text-yellow-800",
    EXPIRED: "bg-gray-100 text-gray-800",
    TIMED_OUT: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-sm font-medium ${colors[status]}`}
    >
      {status.toLowerCase()}
    </span>
  );
};

export default ComponentLibrary;
