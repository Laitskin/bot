export enum DatabaseTable {
    PETEPUNTOS = 'petepuntos',
}

export interface QueryOptions {
    limit?: number;
    sortBy?: { column: string, order: 'DESC' | 'ASC'}
}

export type GetMany<Entity> = Array<Entity>