"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import Community from "../models/community.model";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectDB } from "../libs/mongodb";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { GoogleProfile } from "next-auth/providers/google";
import { signJwtAccessToken } from "@/libs/jwt";
import bcrypt from 'bcryptjs';

export async function fetchUser(email: string) {
  try {
    connectDB();
    return await User.findOne({ email }).populate({
      path: "communities",
      model: Community,
    });

  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}
export async function fetchUserById(_id: string) {
  try {
    connectDB();
    return await User.findOne({ _id }).populate({
      path: "communities",
      model: Community,
    });

  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

interface Params {
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
  email: string
}

export async function createUser({
  bio,
  name,
  path,
  email,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectDB();
    return await User.create(
      {
        username: username.toLowerCase(),
        name,
        email,
        bio,
        image,
        onboarded: false,
      }
    );
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
export async function updateUser({
  bio,
  name,
  path,
  email,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectDB();
    await User.findOneAndUpdate(
      { email },
      {
        username: username && username.toLowerCase(),
        name,
        email,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function igoreOnboard(email: string) {
  try {
    connectDB();
    await User.findOneAndUpdate(
      { email },
      {
        onboarded: true,
      },

    );
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectDB();

    // Find all threads authored by the user with the given userId
    const threads = await User.findOne({ _id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "community",
          model: Community,
          select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
        },
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });
    return threads;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}
export async function fetchUserReplies(userId: string) {
  try {
    connectDB();

    // Find all threads authored by the user with the given userId
    const threads = await Thread.find().populate([{
      path: "children",
      model: Thread,
      populate: {
        path: "author",
        model: User,
        select: "name image id", // Select the "name" and "_id" fields from the "User" model
      },

    },
    {
      path: "author",
      model: User,
      match: {
        author: { id: userId }
      },
      select: "name image id", // Select the "name" and "_id" fields from the "User" model
    },
    ],);
    return threads;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}

// Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectDB();

    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter users.
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId }, // Exclude the current user from the results.
    };

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // Define the sort options for the fetched users based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    // Count the total number of users that match the search criteria (without pagination).
    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    // Check if there are more users beyond the current page.
    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getActivity(userId: string) {
  try {
    connectDB();

    // Find all threads created by the user
    const userThreads = await Thread.find({ author: userId });

    // Collect all the child thread ids (replies) from the 'children' field of each user thread
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);

    // Find and return the child threads (replies) excluding the ones created by the same user
    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId }, // Exclude threads authored by the same user
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}

export async function getMe(req: NextRequest) {
  try {
    const session = await getToken({ req })
    if (!session) throw new Error('Usuario não autenticado.')

    return session

  } catch (error: any) {
    throw new Error(error)
  }
}

export async function validateGoogleSign({ profile }: { profile: GoogleProfile }) {
  let user = await fetchUser(profile.email)
  console.log(user, 'ewasdasd')
  if (!user) {
    const createUserPayload = {
      image: profile.picture,
      email: profile.email,
      name: profile.name,
      username: profile.email.split("@")[0],
      path: "/login",
      bio: "",
      onboarded: false
    }
    user = await createUser(createUserPayload)
  }

  const { password, ...userWithoutPass } = user._doc;
  const accessToken = signJwtAccessToken(userWithoutPass);
  const result = {
    ...userWithoutPass,
    accessToken,
  };

  return result;

}

export async function signWithPassword({ email, sendedPassword }: { email: string, sendedPassword?: string }) {
  await connectDB();
  if (!sendedPassword) return null
  const userFound = await User.findOne({ email }).select("+password");
  if (!userFound) return null

  if (userFound && await comparePasswords(sendedPassword, userFound.password)) {
    const { password, ...userWithoutPass } = userFound._doc;
    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };
    return result;
  } else return null;

}

export async function hashPassword(password: string): Promise<string> {
  try {
    // Gera o salt para hashing
    const salt = await bcrypt.genSalt(10);
    // Gera o hash da senha
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Erro ao gerar hash da senha:', error);
    throw new Error('Erro ao gerar hash da senha');
  }
}

export async function comparePasswords(plainPassword: string, hashedPassword: string | null) {
  try {
    console.log(plainPassword, hashedPassword)
    if (!hashedPassword) throw new Error
    // Compara a senha fornecida com o hash armazenado
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error('Erro ao comparar senhas:', error);
    throw new Error('Erro ao comparar senhas');
  }
}