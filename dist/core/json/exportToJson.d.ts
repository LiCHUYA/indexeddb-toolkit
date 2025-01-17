interface ExportOptions {
    pretty?: boolean;
    download?: boolean;
    fileName?: string;
}
declare function exportToJson(dbName: string, options?: ExportOptions): Promise<any>;
export default exportToJson;
