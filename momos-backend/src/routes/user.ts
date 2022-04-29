import express from "express";
import { db } from "../models";
import { SystemUser } from "../types/data";
import bcrypt from "bcrypt";
const rounds = 5;

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await db.user.findAll();
  return res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await db.user.findOne({ where: { id: req.params.id } });
  res.send(user);
});
router.post("/", async (req, res) => {
  const user = await db.user.create({ ...req.body, set_password: true });
  res.send(user);
});

router.post("/login", async (req, res) => {
  const { password, email } = req.body as SystemUser;
  const if_exist = await db.user.findOne({ where: { email } });
  if (!if_exist) return res.status(404).send("Email used is unrecognized");
  // check password comparison
  const validate = bcrypt.compareSync(
    password!,
    if_exist.getDataValue("password")!
  );
  if (!validate) return res.status(404).send(`Login credentials are invalid`);
  console.log(`-------- Login action [user: ${email}] --------------`);
  res.send(if_exist);
});
router.put("/:id", async (req, res) => {
  const data = req.body as SystemUser;
  const user_id = req.params.id;
  if (data.password) data.set_password = true;
  await db.user.update({ ...data }, { where: { id: user_id } });
  return res.send("User details have been updated successfully");
});
router.delete("/:id", async (req, res) => {
  await db.user.destroy({ where: { id: req.params.id } });
  return res.send("User entry successfully deleted from DB");
});
export { router as UserController };
