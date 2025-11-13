declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_FORMSPREE_ENDPOINT?: string;
    NEXT_PUBLIC_API_BASE?: string;
    NEXT_PUBLIC_BACKEND_URL?: string;
    NEXT_PUBLIC_FRONTEND_URL?: string;
    NEXT_PUBLIC_WS_URL?: string;
    NEXT_PUBLIC_NODE_ENV?: string;
    NEXT_PUBLIC_NEXT_TELEMETRY_DISABLED?: string;
    NEXT_PUBLIC_ENABLE_SOURCE_MAPS?: string;
    NEXT_PUBLIC_PORT?: string;
    NEXT_PUBLIC_TRUST_PROXY?: string;
    NEXT_PUBLIC_LOG_LEVEL?: string;
    NEXT_PUBLIC_HEALTHCHECK_PATH?: string;
    NEXT_PUBLIC_FEATURE_FLAGS?: string;
    NEXT_PUBLIC_EXPERIMENTS_ENABLED?: string;
  }
}
