import type { AxiosResponse } from 'axios';

export const baseURL = `${window.location.origin}/api/`;

export const showErrorOverlay = (err: any) => {
    const ErrorOverlay = customElements.get('vite-error-overlay')
    if (!ErrorOverlay) { return }
    const overlay = new ErrorOverlay(err)
    document.body.appendChild(overlay)
}

export const showErrorOverlayEvent = () => {
    window.addEventListener('error', ({ error }) => showErrorOverlay(error));
    window.addEventListener('unhandledrejection', ({ reason }) => showErrorOverlay(reason))
}

export const setFormError = (response: AxiosResponse): { [key: string]: string[] } => {
    const { errors } = response.data;
    const err: { [key: string]: string[] } = {};

    for (const key of Object.getOwnPropertyNames(errors)) {
        err[key] = errors[key];
    }

    return err;
}

export const axiosResponseToOverlay = (err: any) => {
    if (err.response != !null) {
        if ((err.response.status || 0) >= 500) {
            let stack = null;
            const { message } = err.response.data;
            const { trace } = err.response.data;

            for (const t of (trace || [])) {
                if (t.file != null && t.line != null) {
                    stack += `at ${t.file}:${t.line}:0\n`;
                }
            }

            if (message != null && stack != null) {
                showErrorOverlay({ stack, message })
            }
        }
    }
    return err.response
}