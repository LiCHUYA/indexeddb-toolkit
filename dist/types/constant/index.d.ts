declare const ResponseMessages: {
    OPEN_DB_SUCCESS: (data: {}) => {
        code: number;
        message: string;
        result: any;
    };
    GET_TABLES_SUCCESS: (data?: any[]) => {
        code: number;
        message: string;
        result: any;
    };
    GET_ALL_DBS_SUCCESS: (res: any) => {
        code: number;
        message: string;
        result: any;
    };
    DEL_DB_SUCCESS: (info: any) => {
        code: number;
        message: string;
        result: any;
    };
    DEL_ALL_DB_SUCCESS: () => {
        code: number;
        message: string;
        result: any;
    };
    TB_CREATE_SUCCESS: () => {
        code: number;
        message: string;
        result: any;
    };
    TB_INSERT_SUCCESS: (event: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_INSERT_MANY_SUCCESS: (info: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_SELECT_SUCCESS: (data?: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_DATA_UPDATE_BY_PK_SUCCESS: (data?: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_SELECT_BY_KEY_SUCCESS: (data: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_SELECT_BY_INDEX_SUCCESS: (data: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_DELETE_BY_PK_SUCCESS: (data: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_DELETE_BY_INDEX_SUCCESS: (data: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_DATA_UPDATE_BY_INDEX_SUCCESS: (data?: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_DELETE_SUCCESS: (info: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_DELETE_RECORDS_BY_KEYS_SUCCESS: (info: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_DELETE_MANY_BY_INDEXS_SUCCESS: (info: any) => {
        code: number;
        message: string;
        result: any;
    };
    BASIC_ERROR: (error: Response) => {
        code: number;
        message: string;
        result: any;
    };
    DBNAME_IS_NULL: () => {
        code: number;
        message: string;
        result: any;
    };
    TBNAME_IS_NULL: () => {
        code: number;
        message: string;
        result: any;
    };
    OPEN_DB_ERROR: (error: Response) => {
        code: number;
        message: string;
        result: any;
    };
    OPEN_TB_ERROR: (error: Response) => {
        code: number;
        message: string;
        result: any;
    };
    TB_EXIST: (info: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_CREATE_ERROR: (error: Response) => {
        code: number;
        message: string;
        result: any;
    };
    DEL_DB_ERROR: (error: Response) => {
        code: number;
        message: string;
        result: any;
    };
    DEL_ALL_DB_ERROR: (error: Response) => {
        code: number;
        message: string;
        result: any;
    };
    DB_NOTFOUNT: () => {
        code: number;
        message: string;
        result: any;
    };
    TB_NOTFOUND: (info?: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_INSERT_ERROR: (error: Response) => {
        code: number;
        message: string;
        result: any;
    };
    TB_INSERT_MANY_ERROR: (error: Response) => {
        code: number;
        message: string;
        result: any;
    };
    INSERT_DATA_ERROR: (data: Array<any>) => {
        code: number;
        message: string;
        result: any;
    };
    TB_SELECT_ERROR: (error: any) => {
        code: number;
        message: string;
        result: any;
    };
    PRIMARY_KEY_IS_NULL: () => {
        code: number;
        message: string;
        result: any;
    };
    TB_DATA_UPDATE_BY_PK_ERROR: (data?: any) => {
        code: number;
        message: string;
        result: any;
    };
    DATA_ERROR: (error: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_SELECT_BY_KEY_ERROR: (data: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_SELECT_INDEX_NAME_IS_NULL: () => {
        code: number;
        message: string;
        result: any;
    };
    TB_SELECT_INDEX_VALUE_IS_NULL: () => {
        code: number;
        message: string;
        result: any;
    };
    TB_INDEX_ERROR: () => {
        code: number;
        message: string;
        result: any;
    };
    TB_SELECT_BY_INDEX_ERROR: (data: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_DELETE_BY_PK_ERROR: (error: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_DELETE_BY_INDEX_ERROR: (data: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_DATA_UPDATE_BY_INDEX_ERROR: (data?: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_DELETE_ERROR: (data?: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_DELETE_RECORDS_BY_KEYS_ERROR: (info: any) => {
        code: number;
        message: string;
        result: any;
    };
    TB_DELETE_MANY_BY_INDEXS_ERROR: (info: any) => {
        code: number;
        message: string;
        result: any;
    };
};
export default ResponseMessages;
