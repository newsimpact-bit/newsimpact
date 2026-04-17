import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { TokenPayload } from '../types/index';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
      token?: string;
    }
  }
}

/**
 * Middleware to verify JWT token
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = extractToken(req);

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'No token provided',
      });
      return;
    }

    const payload = AuthService.verifyToken(token);
    (req as any).user = payload;
    (req as any).token = token;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : 'Unauthorized',
    });
  }
};

/**
 * Optional auth middleware (doesn't fail if no token)
 */
export const optionalAuthMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const token = extractToken(req);

    if (token) {
      const payload = AuthService.verifyToken(token);
      (req as any).user = payload;
      (req as any).token = token;
    }

    next();
  } catch (error) {
    // Silent fail - user is optional
    next();
  }
};

/**
 * Extract token from headers
 */
function extractToken(req: Request): string | null {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return null;
  }

  return parts[1];
}
