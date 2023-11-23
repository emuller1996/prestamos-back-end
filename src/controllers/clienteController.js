import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getAllClientes = async (req, res) => {
  try {
    const clientes = await prisma.clientes.findMany();
    return res.json(clientes);
  } catch (error) {
    return res.json({ message: error.message });
  }
};
export const CreateClientes = async (req, res) => {
  try {
    const data = req.body;
    if (!data.hasOwnProperty("nombre"))
      return res.status(403).json({ message: "El nombre es Requerido" });
    if (!data.hasOwnProperty("numero_telefonico"))
      return res
        .status(403)
        .json({ message: "el campo numero_telefonico es Requerido" });

    const cliente = await prisma.clientes.create({ data });
    return res.json({ cliente, message: "Cliente Creado" });
  } catch (error) {
    console.log(error.message);

    return res.json({ message: error.message });
  }
};
export const UpdateClientes = async (req, res) => {
  try {
    const data = req.body;

    const client = await prisma.clientes.update({
      where: { id: parseInt(req.params.id) },
      data,
    });
    return res.json({
      cliente: client,
      message: "Cliente Actualizado",
    });
  } catch (error) {
    console.log(error.message);

    return res.json({ message: error.message });
  }
};
export const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await prisma.clientes.findUnique({
      where: { id: parseInt(id) },
    });
    if (cliente) {
      return res.json(cliente);
    } else {
      return res
        .status(404)
        .json({ message: "cliente no existe en la base de datos." });
    }
  } catch (error) {
    console.log(error.message);

    return res.json({ message: error.message });
  }
};
