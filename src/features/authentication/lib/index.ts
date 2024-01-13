import { AUTH_ERROR } from '@features/authentication/constants';
import prisma from '@lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare, genSaltSync } from 'bcryptjs';
import { AuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import NodeCache from 'node-cache';

export const passwordSalt = genSaltSync(7);

const loginAttemptsCache = new NodeCache({
  stdTTL: 300,
  checkperiod: 84600,
});

type TokenizedSession = Session & {
  id: string;
  accessToken: string;
};

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    /* define callback options here */
    jwt({ token, account, user }) {
      if (account) {
        token.id = user.id;
        token.accessToken = account.access_token;
      }
      return token;
    },
    session({ session, token }) {
      const modifiedSession = session as unknown as TokenizedSession;
      modifiedSession.accessToken = token.accessToken as string;
      modifiedSession.id = token.id as string;
      return modifiedSession;
    },
    redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      type: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        const ipAddress = (req.headers?.['x-forwarded-for'] || '127.0.0.1').split(',')[0];

        if (!credentials?.username || !credentials?.password) {
          throw { name: 'AuthError', message: AUTH_ERROR.MISSING_AUTH_PARAMS };
        }

        const loginAttemptTimes = loginAttemptsCache.get<number>(ipAddress) || 0;

        if (loginAttemptTimes === 5) {
          throw {
            name: 'AuthError',
            message: AUTH_ERROR.LOGIN_ATTEMPTS_FAILED,
          };
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user || !user.password || !(await compare(credentials.password, user.password))) {
          loginAttemptsCache.set(ipAddress, loginAttemptTimes + 1);
          throw {
            name: 'AuthError',
            message: AUTH_ERROR.CREDENTIALS_MISMATCH,
          };
        }

        return {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export default authOptions;
