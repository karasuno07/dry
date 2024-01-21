import authOptions from '@features/authentication/lib';
import { getServerSession } from 'next-auth/next';
import { SessionUser } from '../model/user';

export async function getCurrentUser(): Promise<SessionUser | undefined> {
  const session = await getServerSession(authOptions);

  return session?.user;
}
