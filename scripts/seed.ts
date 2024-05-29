const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function Home() {
    try {
        await database.category.createMany({
            data: [
                { name: "Amateur" },
                { name: "Anal" },
                { name: "BBW (Big Beautiful Women)" },
                { name: "BDSM (Bondage, Discipline, Sadism, Masochism)" },
                { name: "Big Breasts" },
                { name: "Big Butts" },
                { name: "Blowjobs" },
                { name: "Cartoon/Hentai" },
                { name: "Couples" },
                { name: "Creampie" },
                { name: "Cuckold" },
                { name: "Cumshots" },
                { name: "Ebony" },
                { name: "Facials" },
                { name: "Fetish" },
                { name: "Fisting" },
                { name: "Gangbang" },
                { name: "Gay" },
                { name: "Group Sex" },
                { name: "Interracial" },
                { name: "Lesbian" },
                { name: "MILF (Mothers I'd Like to F*)" },
                { name: "Mature" },
                { name: "Oral Sex" },
                { name: "Public" },
                { name: "Reality" },
                { name: "Roleplay" },
                { name: "Solo Male" },
                { name: "Solo Female" },
                { name: "Swingers" },
                { name: "Threesomes" },
                { name: "Transgender" },
                { name: "Voyeur" },
            ]
        })
    } catch (error) {
        console.log("Error during creation", error);
    } finally {
        await database.$disconnect();
    }
}

Home();

//node scripts/seed.ts
//3:25