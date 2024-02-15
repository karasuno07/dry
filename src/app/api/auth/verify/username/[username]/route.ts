import { UserBriefResponse } from '@features/authentication/model/user';
import { apiHandler } from '@lib/http';
import prisma from '@lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { NextParams } from 'types/api';

type UserParams = {
  username: string;
};

async function verifyExistedUsername(
  req: NextRequest,
  { params: { username } }: NextParams<UserParams>
) {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  const response = user !== null ? new UserBriefResponse(user) : null;

  return NextResponse.json(response);
}

module.exports = apiHandler({
  GET: verifyExistedUsername,
});
