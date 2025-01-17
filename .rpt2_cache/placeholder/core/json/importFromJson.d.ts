interface ImportProgress {
    phase: 'preparing' | 'importing';
    current: number;
    total: number;
    percentage: number;
    message: string;
}
interface ImportOptions {
    overwrite?: boolean;
    onProgress?: (progress: ImportProgress) => void;
}
declare function importFromJson(dbName: string, jsonData: string, options?: ImportOptions): Promise<any>;
export default importFromJson;
