import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getAllPagos = async (req, res) => {
  try {
    const pagos = await prisma.pagos.findMany({
      include: {
        prestamo: { include: { cliente: true } },
      },
      orderBy: { fecha_pago: "desc" },
    });
    return res.json(pagos);
  } catch (error) {
    return res.json({ message: error.message });
  }
};
