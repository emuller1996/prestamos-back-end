import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPrestamos = async (req, res) => {
  try {
    const prestamos = await prisma.prestamos.findMany({
      include: { cliente: true },
    });
    return res.json(prestamos);
  } catch (error) {
    return res.json({ message: error.message });
  }
};
export const getPrestamosById = async (req, res) => {
  try {
    const prestamo = await prisma.prestamos.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { Pagos: true, cliente: true },
    });
    if (prestamo === null) {
      return res
        .status(404)
        .json({
          message: `no existe ningun prestamos con el id ${req.params.id}`,
        });
    } else {
      return res.json({ prestamo: prestamo });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
};
export const createPrestamo = async (req, res) => {
  try {
    const data = req.body;
    const { valor_prestamo, fecha_pago, clienteId } = req.body;
    console.log(clienteId);
    const pago_interes = valor_prestamo * 0.1; //pago de interes
    const prestamo = await prisma.prestamos.create({
      data: {
        valor_prestamo,
        fecha_pago,
        clientesId: clienteId,
        deuda_actual: valor_prestamo + pago_interes,
        deuda_interes: 0,
        pago_interes,
        /* cliente: { connect: { id: clienteId } }, */
      },
    });

    const client = await prisma.clientes.findUnique({
      where: { id: clienteId },
    });
    client.deuda_actual = client.deuda_actual + valor_prestamo + pago_interes;
    console.log(client);
    await prisma.clientes.update({ where: { id: clienteId }, data: client });
    return res.status(201).json({
      prestamo: prestamo,
      message: "Prestamos Creado Correctamentoe",
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const createPagoByPrestamo = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const { valor_pagado, fecha_pago, prestamoId } = req.body;
    //Resgistros Pago
    const pago = await prisma.pagos.create({
      data: { valor_pagado, fecha_pago, prestamoId },
    });
    console.log(pago);

    //Busco y Actualizo  Prestamo
    const prestamo = await prisma.prestamos.findUnique({
      where: { id: prestamoId },
    });
    console.log(prestamo);
    prestamo.deuda_actual = prestamo.deuda_actual - valor_pagado;
    await prisma.prestamos.update({
      where: { id: prestamoId },
      data: prestamo,
    });

    //Busco y Actualizo  Cliente
    const cliente = await prisma.clientes.findUnique({
      where: { id: prestamo.clientesId },
    });
    console.log(cliente);
    cliente.deuda_actual = cliente.deuda_actual - valor_pagado;
    await prisma.clientes.update({
      where: { id: prestamo.clientesId },
      data: cliente,
    });
    //Responde todo Exitoso
    return res.json({ pago: pago, message: "Pago Realizado" });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
export const getPagosByPrestamo = async (req, res) => {
  try {
    const pagos = await prisma.pagos.findMany({
      where: { prestamoId: parseInt(req.params.id) },
    });

    return res.json({ pagos: pagos });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
