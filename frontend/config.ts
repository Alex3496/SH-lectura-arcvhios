declare global {
    interface ImportMetaEnv {
        VITE_API_URL: string;
    }
    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}
const { VITE_API_URL } = import.meta.env;

export const API_URL = VITE_API_URL || 'http://localhost:3000';
