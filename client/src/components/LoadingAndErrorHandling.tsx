import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { FC, ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Spinner } from "./Spinner";
import { ReportBugFormModal } from "./ReportBugFormModal";
import { HeadNav } from "../navigation/HeadNav";

export const LoadingAndErrorHandling: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div className="text-center">
              <HeadNav />
              <div className="p-3 rounded bg-primary text-light w-50 mx-auto m-3">
                {error.message}
              </div>
              <button
                className="btn btn-secondary"
                onClick={resetErrorBoundary}
              >
                Try again
              </button>
              <br />
              <button
                type="button"
                className="btn btn-outline-primary mt-3"
                data-bs-toggle="modal"
                data-bs-target="#ReportBugFormModal"
              >
                <i className="bi-bug me-1" />
                Report a Bug
              </button>
              <ReportBugFormModal startingError={error.message} />
            </div>
          )}
        >
          <Suspense fallback={<Spinner />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
