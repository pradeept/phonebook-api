import bcrypt from "bcrypt";
export const generateHash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(4);
  const hash = await bcrypt.hash(password, salt);
  return hash
};
