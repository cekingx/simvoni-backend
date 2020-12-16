import { Request, Response } from 'express';

class JSONResponse {
    constructor() {}

    static success(req: Request, res: Response, message: String | null, data: any) {
        res.status(200).json({
            code: 200,
            message: message || 'Success',
            data: data,
        });
    }
    
    static unauthorized(req: Request, res: Response, message: String | null) {
        res.status(403).json({
            code: 403,
            message: message || 'Unauthorized Request'
        })
    }
    
    static notFound(req: Request, res: Response, message: String | null) {
        res.status(404).json({
            code: 404,
            message: message || 'Not Found',
        });
    }

    static serverError(req: Request, res: Response, message: String | null) {
        res.status(500).json({
            code: 500,
            message: message || 'Internal server error',
        });
    }
}

export default JSONResponse;