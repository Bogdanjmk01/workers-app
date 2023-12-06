const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.user.create({
        data: {
            username: "Bogdan JMK",
            email: "bogdanjmk@hot.com",
            password: "123456"
        }
    });

    console.log(`A user has been created ${newUser.id}`);
}

main().catch((err) => {
   console.log(err);
   process.exit(1);
}).finally(async () => {
   await prisma.$disconnect();
});