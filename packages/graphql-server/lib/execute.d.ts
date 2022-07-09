declare const execute: (body: {
    query: string;
    variables: Record<string, unknown>;
}, env: AppEnv) => Promise<void>;
export default execute;
