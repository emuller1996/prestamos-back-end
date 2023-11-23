-- CreateTable
CREATE TABLE `Clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `numero_telefonico` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NULL,
    `deuda_actual` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prestamos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor_prestamo` DOUBLE NOT NULL,
    `valor_pagado` DOUBLE NULL,
    `deuda_actual` DOUBLE NULL,
    `deuda_capital` DOUBLE NULL,
    `deuda_interes` DOUBLE NULL,
    `estado` VARCHAR(191) NULL DEFAULT 'Pendiente',
    `pago_interes` DOUBLE NULL,
    `fecha_ultimo_pago` DATETIME(3) NULL,
    `fecha_pago` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `clientesId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pagos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor_pagado` DOUBLE NULL,
    `abono_capital` DOUBLE NULL,
    `abono_interes` DOUBLE NULL,
    `fecha_pago` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `prestamoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prestamos` ADD CONSTRAINT `Prestamos_clientesId_fkey` FOREIGN KEY (`clientesId`) REFERENCES `Clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagos` ADD CONSTRAINT `Pagos_prestamoId_fkey` FOREIGN KEY (`prestamoId`) REFERENCES `Prestamos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
