import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { FC, ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Spinner } from "./Spinner";

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
              <div className="p-3 rounded bg-danger text-light w-50 mx-auto m-3">
                {error.message}
              </div>
              <button
                className="btn btn-secondary"
                onClick={resetErrorBoundary}
              >
                Try again
              </button>
            </div>
          )}
        >
          <Suspense fallback={<Spinner />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
