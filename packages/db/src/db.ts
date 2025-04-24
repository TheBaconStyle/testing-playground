export function createConnectionString(
  user: string,
  password: string,
  host: string,
  port: string,
  dbName: string
) {
  return `postgres://${user}:${password}@${host}:${port}/${dbName}`;
}
