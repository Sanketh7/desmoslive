import { getConnection, getRepository } from "typeorm";
import GraphData from "../interfaces/GraphData";
import { User } from "../models/user.model";

/**
 * finds User entity by email
 * @param email
 * @returns matching User or undefined if it doesn't exist
 */
export const getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  return await getRepository(User).findOne(email);
};

/**
 * creates a new User entity with the given email and name
 * @param email
 * @param name
 */
export const createUser = async (
  email: string,
  name: string
): Promise<void> => {
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([{ name: name, email: email, myGraphs: [] }])
    .onConflict(`("email") DO NOTHING`)
    .execute();
};

/*
export const getMyGraphsIDs = async (email: string): Promise<string[]> => {
  // need to specifically load the relation
  const loadedUser = await getRepository(User).findOne(email, {
    relations: ["myGraphs"],
  });
  return loadedUser && loadedUser.myGraphs
    ? loadedUser.myGraphs.map((graph) => graph.id)
    : [];
};*/

export const getMyGraphsData = async (email: string): Promise<{
  id: string;
  name: string;
}[]> => {
  // load user with relation
  const user = await getRepository(User).findOne(email, {
    relations: ["myGraphs"],
  });
  return user && user.myGraphs
    ? user.myGraphs.map((graph) => {
      return {
        id: graph.id,
        name: graph.name
      }
    })
    : [];
};
/*
export const getSharedGraphsIDs = async (email: string): Promise<string[]> => {
  // need to specifically load the relation
  const loadedUser = await getRepository(User).findOne(email, {
    relations: ["sharedGraphs"],
  });
  return loadedUser && loadedUser.sharedGraphs
    ? loadedUser.sharedGraphs.map((graph) => graph.id)
    : [];
};*/

export const getSharedGraphsData = async (email: string): Promise<GraphData[]> => {
  // load user with relation
  const user = await getRepository(User).findOne(email, { relations: ["sharedGraphs"] });
  return user && user.sharedGraphs ? user.sharedGraphs.map(graph => { return { id: graph.id, name: graph.name } }) : [];
}