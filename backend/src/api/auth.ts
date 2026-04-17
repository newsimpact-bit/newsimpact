import { Router, Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { authMiddleware } from '../middleware/auth';
import { RegisterRequest, LoginRequest, AuthResponse } from '../types/index';

const router = Router();

/**
 * POST /auth/register
 * Register a new user
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, username, password, name } = req.body as RegisterRequest;

    // Validate input
    if (!email || !username || !password) {
      res.status(400).json({
        success: false,
        message: 'Email, username, and password are required',
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
      return;
    }

    // Validate password strength (min 8 chars)
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters',
      });
      return;
    }

    const result = await AuthService.register({
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      name,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    } as AuthResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed';

    if (message.includes('already exists')) {
      res.status(409).json({
        success: false,
        message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
});

/**
 * POST /auth/login
 * Login user
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as LoginRequest;

    // Validate input
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
      return;
    }

    const result = await AuthService.login({
      email: email.toLowerCase(),
      password,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    } as AuthResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';

    if (message.includes('not found') || message.includes('Invalid password')) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
});

/**
 * POST /auth/refresh
 * Refresh access token
 */
router.post('/refresh', async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({
        success: false,
        message: 'Refresh token is required',
      });
      return;
    }

    const result = await AuthService.refreshToken(refreshToken);

    res.status(200).json({
      success: true,
      message: 'Token refreshed',
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    } as AuthResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Token refresh failed';

    res.status(401).json({
      success: false,
      message,
    });
  }
});

/**
 * GET /auth/me
 * Get current user (requires auth)
 */
router.get('/me', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const userData = await AuthService.getUserById(user.userId);

    res.status(200).json({
      success: true,
      message: 'User retrieved',
      data: { user: userData },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get user';

    res.status(500).json({
      success: false,
      message,
    });
  }
});

/**
 * POST /auth/logout
 * Logout user (client-side token deletion)
 */
router.post('/logout', authMiddleware, (_req: Request, res: Response): void => {
  // Token invalidation happens on client (token deletion)
  // In production, you might want to blacklist tokens in Redis

  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
});

export default router;
