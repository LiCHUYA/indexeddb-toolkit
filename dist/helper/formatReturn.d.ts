export interface IReturn {
    code: number;
    message: string;
    result: any;
}
declare function returnFormatter(code: number, message: string, result?: any): IReturn;
export default returnFormatter;
