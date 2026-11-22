export type CheckStatus = "pass" | "warn" | "fail" | "blocked" | "manual";

export type ReadinessCheck = {
  id: string;
  category:
    | "tests"
    | "security"
    | "performance"
    | "editorial"
    | "domain"
    | "deploy";
  title: string;
  status: CheckStatus;
  detail: string;
};

export type ReadinessReport = {
  generatedAt: string;
  productionDeployAllowed: false;
  domain: string;
  summary: {
    pass: number;
    warn: number;
    fail: number;
    blocked: number;
    manual: number;
  };
  checks: ReadinessCheck[];
};
