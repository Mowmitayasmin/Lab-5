import prisma from "../utils/prisma";

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return null;
  } else {
    return user;
  }
};

export const createUser = async (id: string, username: string) => {
  const newUser = await prisma.user.create({
    data: {
      id,
      name: username,
    },
  });

  return newUser;
};
