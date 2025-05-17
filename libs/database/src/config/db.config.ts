export interface IGetMongoUriParams {
    dbName: string;
    host?: string;
    port?: number;
}

export function getMongoUri({
    dbName,
    host = 'localhost',
    port = 27017,
}: IGetMongoUriParams): string {
    return `mongodb://${host}:${port}/${dbName}`;
}
