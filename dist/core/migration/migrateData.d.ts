interface MigrationOptions {
    overwrite?: boolean;
    transform?: (data: any) => any;
    onProgress?: (progress: MigrationProgress) => void;
}
interface MigrationProgress {
    phase: 'reading' | 'writing';
    current: number;
    total: number;
    percentage: number;
    message: string;
}
declare function migrateData(fromDB: string, toDB: string, options?: MigrationOptions): Promise<any>;
export default migrateData;
