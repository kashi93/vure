import { CssScope } from "@/helpers";
import style from "./PageNotFound.module.css";

export default function PageNotFound() {
  const css = new CssScope(style);
  
  return (
    <div
      className={css.scope(
        "relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0"
      )}
    >
      <div className={css.scope("max-w-xl mx-auto sm:px-6 lg:px-8")}>
        <div
          className={css.scope(
            "flex items-center pt-8 sm:justify-start sm:pt-0"
          )}
        >
          <div
            className={css.scope(
              "px-4 text-lg text-gray-500 border-r border-gray-400 tracking-wider"
            )}
          >
            404
          </div>
          <div
            className={css.scope(
              "ml-4 text-lg text-gray-500 uppercase tracking-wider"
            )}
          >
            Not Found
          </div>
        </div>
      </div>
    </div>
  );
}
