import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
   origin: "*",
   methods: ["GET", "POST"]
});

const teams = [
    { id: 1, name: "McLaren", base: "Working, United Kingdom"},
    { id: 2, name: "Mercedes", base: "Brackley, United Kingdom"},
    { id: 3, name: "Red Bull Racing", base: "Wilton Keynes, United Kingdom"},
];

const drivers = [
    { id: 1, name: "Max Verstappen", team: "Red Bull Racing"},
    { id: 2, name: "Lewis Hamilton", team: "Ferrari"},
    { id: 3, name: "Lando Morris", team: "McLaren"},
]

server.get("/teams", async(request, response) => {
    response.type("application/json").code(200)

    return { teams }
});

server.get("/drivers", async(request, response) => {
    response.type("application/json").code(200);

    return { drivers }
})

interface DriverParams { id: string }

server.get<{Params: DriverParams}>("/drivers/:id", async(request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find(d => d.id === id);

    if (!driver) {
        response.type("application/json").code(404);

        return { message: "Driver Not Found"}
    }

    response.type("application/json").code(200);

    return { driver }
})

server.listen({port: 3333}, () => {
   console.log("Server init");
});