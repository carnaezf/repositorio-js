import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    allowExitOnIdle: process.env.ALLOW_EXIT_ON_IDLE === 'true'
});

async function obtenerClientes() {
    const resultado = await pool.query('SELECT * FROM clientes;');

    console.log('\nClientes registrados:');
    console.table(resultado.rows);
}

async function obtenerPedidos() {
    const consulta = `
        SELECT 
            pedidos.id_pedido,
            clientes.nombre AS cliente,
            productos.nombre AS producto,
            detalle_pedidos.cantidad,
            detalle_pedidos.precio_unitario,
            detalle_pedidos.cantidad * detalle_pedidos.precio_unitario AS subtotal
        FROM pedidos
        JOIN clientes 
            ON pedidos.id_cliente = clientes.id_cliente
        JOIN detalle_pedidos 
            ON pedidos.id_pedido = detalle_pedidos.id_pedido
        JOIN productos 
            ON detalle_pedidos.id_producto = productos.id_producto
        ORDER BY pedidos.id_pedido;
    `;

    const resultado = await pool.query(consulta);

    console.log('\nPedidos con detalle:');
    console.table(resultado.rows);
}

async function main() {
    try {
        await obtenerClientes();
        await obtenerPedidos();
    } catch (error) {
        console.error('Error al consultar la base de datos:', error.message);
    } finally {
        await pool.end();
    }
}

main();