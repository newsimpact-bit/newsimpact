import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RegisterRequest, LoginRequest, JwtToken, TokenPayload } from '../types/index';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production';

export class AuthService {
  /**
   * Register a new user
   */
  static async register(data: RegisterRequest) {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
        name: data.name,
        subscriptionTier: 'free',
      },
    });

    // Generate tokens
    const tokens = this.generateTokens(user.id, user.email, user.subscriptionTier);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        subscriptionTier: user.subscriptionTier,
      },
      ...tokens,
    };
  }

  /**
   * Login user
   */
  static async login(data: LoginRequest) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Compare passwords
    const isValidPassword = await bcrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const tokens = this.generateTokens(user.id, user.email, user.subscriptionTier);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        subscriptionTier: user.subscriptionTier,
      },
      ...tokens,
    };
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshToken(refreshToken: string) {
    try {
      const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as TokenPayload;

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const tokens = this.generateTokens(user.id, user.email, user.subscriptionTier);

      return {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
          subscriptionTier: user.subscriptionTier,
        },
        ...tokens,
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  /**
   * Generate JWT tokens
   */
  static generateTokens(userId: string, email: string, subscriptionTier: string): JwtToken {
    const payload: TokenPayload = {
      userId,
      email,
      subscriptionTier,
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Verify access token
   */
  static verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      subscriptionTier: user.subscriptionTier,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
    };
  }
}
