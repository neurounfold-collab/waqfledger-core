import crypto from 'crypto';

export function generateDeterministicHash(payload: object): string {
  const sortedPayload = Object.keys(payload)
    .sort()
    .reduce((obj: Record<string, unknown>, key: string) => {
      obj[key] = (payload as Record<string, unknown>)[key];
      return obj;
    }, {});
  return crypto.createHash('sha256').update(JSON.stringify(sortedPayload)).digest('hex');
}
