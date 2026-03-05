export class EnvConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EnvConfigError";
  }
}

function unwrapQuotedValue(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/^(['"])(.*)\1$/);
  return match ? match[2].trim() : trimmed;
}

export function getRequiredEnv(name: string): string {
  const rawValue = process.env[name];

  if (typeof rawValue !== "string") {
    throw new EnvConfigError(`Missing required environment variable: ${name}`);
  }

  const value = unwrapQuotedValue(rawValue);
  if (!value) {
    throw new EnvConfigError(`Environment variable ${name} is empty`);
  }

  return value;
}
