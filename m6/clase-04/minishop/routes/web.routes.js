import { Router } from "express";

const router = Router();

const nombreTienda = "MiniShop";
const mensajeBienvenida = "Bienvenido a nuestra tienda ficticia de productos destacados.";

const productos = [
    {
        nombre: "Camiseta Básica",
        precio: 15,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600"
    },
    {
        nombre: "Pantalón Jeans",
        precio: 30,
        disponible: false,
        imagen: "https://images.unsplash.com/photo-1583005008627-cf9c4e1a9d6d?w=600"
    },
    {
        nombre: "Zapatos Deportivos",
        precio: 50,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1528701800489-20be8c01c1a3?w=600"
    },
    {
        nombre: "Chaqueta de Cuero",
        precio: 80,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600"
    },
    {
        nombre: "Gorra Clásica",
        precio: 12,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1526170375885-bf2f5f0f3e3a?w=600"
    },
    {
        nombre: "Bolso de Mano",
        precio: 45,
        disponible: false,
        imagen: "https://images.unsplash.com/photo-1526170375885-43f5d6d4f00f?w=600"
    },
    {
        nombre: "Reloj Digital",
        precio: 60,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1526170375885-6c60d6f0f47f?w=600"
    },
    {
        nombre: "Bufanda de Lana",
        precio: 18,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1526170375885-6b73d6d0f0aa?w=600"
    },
    {
        nombre: "Sudadera Hoodie",
        precio: 35,
        disponible: false,
        imagen: "https://images.unsplash.com/photo-1526170375885-9f25d6f0f077?w=600"
    },
    {
        nombre: "Gafas de Sol",
        precio: 25,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1526170375885-fc40d6f0f0cc?w=600"
    }
];

router.get("/", (req, res) => {
    res.render("home", {
        nombreTienda,
        mensajeBienvenida,
        productos
    });
});

router.get("/about", (req, res) => {
    res.render("about", {
        nombreTienda
    });
});

router.get("/contact", (req, res) => {
    res.render("contact", {
        nombreTienda
    });
});

router.post("/contact", (req, res) => {
    const { nombre, email, mensaje } = req.body;

    res.render("success", {
        nombre,
        email,
        mensaje
    });
});

router.all("/", (req, res) => {
    res.status(405).send("Método no permitido");
});

router.all("/about", (req, res) => {
    res.status(405).send("Método no permitido");
});

router.all("/contact", (req, res) => {
    res.status(405).send("Método no permitido");
});

export default router;