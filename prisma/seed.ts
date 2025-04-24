const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cultures = [
    {
        key: 'kalash',
        name: 'Kalash',
        region: 'South Asia',
        population: 'Around 4,000',
        language: 'Kalasha',
        location: 'Chitral District, Pakistan',
        continent: 'Asia',
        coordinates: [71.5, 35.7, 1000000],
        description: `The Kalash are a small but culturally rich indigenous community residing in the remote valleys of the Hindu Kush mountains in northern Pakistan, particularly in the Chitral District. Their origins are often debated, with some theories linking them to the ancient Indo-Aryans or even to the soldiers of Alexander the Great. Despite centuries of isolation and external pressure, the Kalash have managed to preserve their unique cultural identity, language, and customs in a region dominated by other ethnic and religious groups.`,
        traditions: `The Kalash people are known for their vibrant and colorful festivals that celebrate the cycles of nature, fertility, and the spiritual world. One of the most famous festivals is Chilam Joshi, held in spring to welcome the new season and pray for prosperous harvests and healthy livestock. Their polytheistic belief system includes a pantheon of gods and nature spirits, and rituals are often held near sacred cedar trees and in special temples. Traditional Kalash dances involve large communal gatherings where men and women dance in circles, sing ancient songs, and wear their iconic embroidered clothes adorned with shells, beads, and feathers.`,
        lifestyle: `Life in Kalash valleys is deeply rooted in agricultural and pastoral traditions. The community practices terrace farming, growing crops like wheat, corn, and barley. Animal husbandry is also central to their sustenance, with goats, sheep, and cows providing dairy, meat, and wool. Their wooden houses are constructed on steep slopes, often with flat roofs used for drying food or social gatherings. Despite facing modernization and external cultural pressures, the Kalash continue to uphold their ancient way of life, guided by communal values, oral traditions, and a deep respect for nature.`,
        images: ['https://hunzaguidespakistan.com/wp-content/uploads/2022/02/Chilam-Joshi-Festival-1.jpg', 'https://www.pakpedia.pk/files/Image/kalash-2.jpg']
      },
  ]

  for (const culture of cultures) {
    await prisma.culture.upsert({
        where: { key: culture.key },
        update: culture,
        create: culture
        })
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
