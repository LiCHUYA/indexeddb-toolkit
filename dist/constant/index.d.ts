declare const ResponseMessages: {
    OPEN_DB_SUCCESS: (data: {}) => import("../helper/formatReturn").IReturn;
    GET_TABLES_SUCCESS: (data?: never[]) => import("../helper/formatReturn").IReturn;
    GET_ALL_DBS_SUCCESS: (res: any) => import("../helper/formatReturn").IReturn;
    DEL_DB_SUCCESS: (info: any) => import("../helper/formatReturn").IReturn;
    DEL_ALL_DB_SUCCESS: () => import("../helper/formatReturn").IReturn;
    TB_CREATE_SUCCESS: (data?: any) => import("../helper/formatReturn").IReturn;
    TB_INSERT_SUCCESS: (data: any) => import("../helper/formatReturn").IReturn;
    TB_INSERT_MANY_SUCCESS: (info: any) => import("../helper/formatReturn").IReturn;
    TB_SELECT_SUCCESS: (data?: any) => import("../helper/formatReturn").IReturn;
    TB_DELETE_SUCCESS: (info: any) => import("../helper/formatReturn").IReturn;
    TB_DELETE_ERROR: (info: any) => import("../helper/formatReturn").IReturn;
    TB_DELETE_ALL_SUCCESS: () => import("../helper/formatReturn").IReturn;
    TB_DELETE_ALL_ERROR: (info: any) => import("../helper/formatReturn").IReturn;
    DBNAME_IS_NULL: () => import("../helper/formatReturn").IReturn;
    TBNAME_IS_NULL: () => import("../helper/formatReturn").IReturn;
    OPEN_DB_ERROR: (error: Response) => import("../helper/formatReturn").IReturn;
    OPEN_TB_ERROR: (error: Response) => import("../helper/formatReturn").IReturn;
    DB_NOTFOUND: () => import("../helper/formatReturn").IReturn;
    DB_DELETE_ERROR: (error: Response) => import("../helper/formatReturn").IReturn;
    TB_EXIST: (tableName: string) => import("../helper/formatReturn").IReturn;
    JSON_IMPORT_SUCCESS: (data: any) => import("../helper/formatReturn").IReturn;
    JSON_IMPORT_ERROR: (error: any) => import("../helper/formatReturn").IReturn;
    TB_CREATE_ERROR: (error: any) => import("../helper/formatReturn").IReturn;
    TB_NOTFOUND: (message?: string) => import("../helper/formatReturn").IReturn;
    TB_INSERT_ERROR: (error: any) => import("../helper/formatReturn").IReturn;
    JSON_EXPORT_SUCCESS: (data: any) => import("../helper/formatReturn").IReturn;
    JSON_EXPORT_ERROR: (error: any) => import("../helper/formatReturn").IReturn;
    TB_INSERT_MANY_ERROR: (error: Response) => import("../helper/formatReturn").IReturn;
    INSERT_DATA_ERROR: (data: Array<any>) => import("../helper/formatReturn").IReturn;
    TB_SELECT_ERROR: (error: any) => import("../helper/formatReturn").IReturn;
    PRIMARY_KEY_IS_NULL: () => import("../helper/formatReturn").IReturn;
    BASIC_ERROR: (error: any) => import("../helper/formatReturn").IReturn;
    DATA_ERROR: (message: string) => import("../helper/formatReturn").IReturn;
    TB_DELETE_MANY_BY_INDEXS_SUCCESS: (info: any) => import("../helper/formatReturn").IReturn;
    TB_DELETE_MANY_BY_INDEXS_ERROR: (error: any) => import("../helper/formatReturn").IReturn;
    TB_SELECT_INDEX_NAME_IS_NULL: () => import("../helper/formatReturn").IReturn;
    TB_SELECT_INDEX_VALUE_IS_NULL: () => import("../helper/formatReturn").IReturn;
    TB_DELETE_BY_INDEX_SUCCESS: (info: any) => import("../helper/formatReturn").IReturn;
    TB_DELETE_BY_INDEX_ERROR: (error: any) => import("../helper/formatReturn").IReturn;
    TB_DELETE_BY_PK_SUCCESS: (info: any) => import("../helper/formatReturn").IReturn;
    TB_DELETE_BY_PK_ERROR: (error: any) => import("../helper/formatReturn").IReturn;
    TB_INDEX_ERROR: () => import("../helper/formatReturn").IReturn;
    TB_SELECT_BY_INDEX_SUCCESS: (data: any) => import("../helper/formatReturn").IReturn;
    TB_SELECT_BY_INDEX_ERROR: (error: any) => import("../helper/formatReturn").IReturn;
    TB_DELETE_RECORDS_BY_KEYS_SUCCESS: (info: any) => import("../helper/formatReturn").IReturn;
    TB_DELETE_RECORDS_BY_KEYS_ERROR: (error: any) => import("../helper/formatReturn").IReturn;
    TB_MIGRATE_SUCCESS: (data: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_MIGRATE_ERROR: (error: any) => {
        code: number;
        message: string;
        result: any;
    };
    FILE_SAVE_SUCCESS: (data: any) => {
        code: number;
        message: string;
        result: any;
    };
    FILE_SAVE_ERROR: (error: any) => {
        code: number;
        message: string;
        result: any;
    };
    FILE_GET_SUCCESS: (data: any) => {
        code: number;
        message: string;
        result: any;
    };
    FILE_GET_ERROR: (error: any) => {
        code: number;
        message: string;
        result: any;
    };
    FILE_DELETE_SUCCESS: (data: any) => {
        code: number;
        message: string;
        result: any;
    };
    FILE_DELETE_ERROR: (error: any) => {
        code: number;
        message: string;
        result: any;
    };
    FILE_IS_NULL: () => {
        success: boolean;
        code: number;
        message: string;
    };
    TB_SELECT_BY_KEY_SUCCESS: (data: any) => import("../helper/formatReturn").IReturn;
    TB_SELECT_BY_KEY_ERROR: (error: any) => import("../helper/formatReturn").IReturn;
    TB_DATA_UPDATE_BY_INDEX_SUCCESS: (data: any) => import("../helper/formatReturn").IReturn;
    TB_DATA_UPDATE_BY_INDEX_ERROR: (error: any) => import("../helper/formatReturn").IReturn;
    TB_DATA_UPDATE_BY_PRIMARY_KEY_SUCCESS: (data: any) => import("../helper/formatReturn").IReturn;
    TB_DATA_UPDATE_BY_PRIMARY_KEY_ERROR: (error: any) => import("../helper/formatReturn").IReturn;
};
export default ResponseMessages;
