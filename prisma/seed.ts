const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cultures = [
    {
    key: 'sami',
    name: "Sámi",
    region: "Northern Europe",
    population: "~80,000",
    language: "Sámi languages (Northern Sámi, Inari Sámi, etc.)",
    location: "Norway, Sweden, Finland, and Russia's Kola Peninsula",
    continent: "Europe",
    coordinates: [65,10,300000],
    description:
      "The Sámi people are indigenous to the northern parts of Norway, Sweden, Finland, and Russia's Kola Peninsula. Traditionally, they have pursued a variety of livelihoods, including coastal fishing, fur trapping, and sheep herding. Their best-known means of livelihood is semi-nomadic reindeer herding, with which about 10% of the Sámi are connected and 2,800 actively involved in. For traditional, environmental, cultural, and political reasons, reindeer herding is legally reserved for Sámi people in certain regions of the Nordic countries.",
    traditions:
      "The Sámi have a rich cultural heritage that includes distinctive colorful clothing (gákti), handicrafts (duodji), and the joik, a traditional form of song. The Sámi spiritual tradition is characterized by a deep connection to the land and animistic beliefs. Traditional Sámi religion was animistic, with a worship of nature and natural forces. The Sámi shaman, or noaidi, would use a drum decorated with symbols to enter a trance and communicate with the spirit world.",
    lifestyle:
      "While many Sámi have adopted modern lifestyles and live in urban areas, traditional practices like reindeer herding remain important cultural touchstones. Modern Sámi communities balance traditional knowledge with contemporary life, working to preserve their language and cultural practices while adapting to changing social and environmental conditions. The Sámi have their own parliaments in Norway, Sweden, and Finland, which advocate for Sámi rights and interests.",
    images: [
        'https://images.ctfassets.net/7mmwp5vb96tc/2B5NzeHMrMcIuTpllrxJ3S/7300970ab7bbc870cdefdd272340073b/Sami_Culture_Kjollefjord_Norway_HGR_54857_1920_Photo_Orjan_Bertelsen.jpg',
        'https://res.cloudinary.com/havila-kystruten/image/upload/c_limit,q_80,w_1500/v1/ievv_filestore/3e547439a5fd4f568ff660d4d258b02f2c776a73a1ab4fe1a486235025854aee',
        'https://media.istockphoto.com/id/872473132/photo/traditional-ethnographic-sami-bag-made-of-deer-fur.jpg?s=612x612&w=0&k=20&c=HcThSibVlYj-pwtFeeEZyoWL4qVaUaTxNOiRTUPIxSg=',
        'https://visitumea.se/sites/cb_umea/files/inline-images/sami-people-history.jpg'
      ]
  },
  {
    key: "hmong",
    name: "Hmong",
    region: "Southeast Asia",
    population: "~4-5 million worldwide",
    language: "Hmong language (various dialects)",
    location: "China, Vietnam, Laos, Thailand, and diaspora communities",
    continent: "Asia",
    coordinates: [20,105,400000],
    description:
      "The Hmong are an ethnic group from the mountainous regions of China, Vietnam, Laos, and Thailand. Following the Vietnam War, many Hmong people migrated to the United States, France, Australia, and other countries, forming significant diaspora communities. The Hmong have a rich cultural heritage that has been preserved despite centuries of migration and political upheaval.",
    traditions:
      "Hmong culture is known for its intricate needlework, particularly the pa ndau (story cloths) that use embroidery to tell stories and preserve history. Traditional Hmong music uses instruments like the qeej, a bamboo reed pipe. Hmong spiritual practices often involve shamanism, with rituals to maintain harmony between the physical and spiritual worlds. Important ceremonies include New Year celebrations and complex funeral rites that guide the deceased to join their ancestors.",
    lifestyle:
      "Traditionally, the Hmong practiced slash-and-burn agriculture in mountainous regions, growing rice, corn, and opium as a cash crop. Family and clan structures are central to Hmong society, with clan membership determining many social relationships. In diaspora communities, Hmong people have adapted to new environments while working to preserve their cultural identity, language, and traditions across generations.",
    images: [
        'https://wp.wisconsinhistory.org/wp-content/uploads/sites/15/2022/02/Hmong-dancers-banner.jpg.png',
        'https://cdn.shopify.com/s/files/1/0022/3838/2169/files/kyle-petzer-3FjR_2bUXFc-unsplash_1024x1024.jpg?v=1626558502',
        'https://factsanddetails.com/archives/002/202210/c4fc3af8836782ec88a8b9e03701d8a78e8c8bc78f9d74ca265db3e5d3a4c851.jpg',
        'https://ewscripps.brightspotcdn.com/dims4/default/a2b7e94/2147483647/strip/true/crop/5472x3648+0+0/resize/1280x853!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2F4d%2Ffa%2F74fbe1524ff094cdb0c436858e2d%2F3.JPG'
      ]
  },
  {
    key: "maori",
    name: "Māori",
    region: "New Zealand",
    population: "~850,000",
    language: "Te Reo Māori",
    location: "New Zealand (Aotearoa)",
    continent: "Oceania",
    coordinates: [-41,172,200000],
    description:
      "The Māori are the indigenous Polynesian people of New Zealand (Aotearoa). They arrived in New Zealand from eastern Polynesia in several waves of canoe voyages between 1250 and 1300 CE. Over centuries, they developed a distinct culture with unique art forms, social structures, and a rich oral tradition. Today, Māori make up about 16.5% of New Zealand's population and their culture is an integral part of New Zealand's national identity.",
    traditions:
      "Māori culture is rich in tradition, including the haka (ceremonial dance), whakairo (carving), and tā moko (traditional tattooing). The marae (meeting grounds) serves as a focal point for social and ceremonial events. Māori have a strong oral tradition, with histories, genealogies (whakapapa), and cultural knowledge passed down through generations in the form of stories, songs, and chants. The concept of mana (prestige, authority) and tapu (sacredness) are central to Māori spiritual and social systems.",
    lifestyle:
      "Traditional Māori society was tribal (iwi), with communities led by chiefs (rangatira) who were selected based on their genealogical connections and personal qualities. While many Māori now live in urban areas and participate in mainstream New Zealand society, there has been a significant cultural revival since the 1970s. The Māori language (Te Reo Māori) is an official language of New Zealand, and Māori cultural practices are incorporated into national ceremonies and everyday life.",
    images: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/New_Zealand_-_Maori_rowing_-_8444.jpg/1200px-New_Zealand_-_Maori_rowing_-_8444.jpg',
        'https://kaitiaki.co.nz/wp-content/uploads/2016/08/maori-culture-new-plymouth.jpg',
        'https://lp-cms-production.imgix.net/2024-08/GettyRF82773708.jpg?auto=format,compress&q=72&w=1440&h=810&fit=crop',
        'https://www.swaindestinations.com/blog/wp-content/uploads/2013/05/Traditional-Maori.jpg'
      ]
  },
  {
    key: "inuit",
    name: "Inuit",
    region: "Arctic",
    population: "~180,000",
    language: "Inuktitut and related languages",
    location: "Arctic regions of Canada, Alaska, and Greenland",
    continent: "North America",
    coordinates: [70,-60,500000],
    description:
      "The Inuit are indigenous peoples who live primarily in the Arctic regions of Canada, Alaska, and Greenland. The term 'Inuit' means 'the people' in Inuktitut, their language. They have traditionally been hunters and gatherers, with a deep knowledge of the Arctic environment that has allowed them to thrive in one of the world's harshest climates for thousands of years.",
    traditions:
      "Inuit cultural traditions are closely tied to their Arctic environment. Traditional practices include hunting marine mammals (particularly seals, walrus, and whales), fishing, and gathering. The Inuit are known for their technological innovations, including the igloo, kayak, and ulu (women's knife). Inuit art, particularly soapstone carvings, prints, and textiles, has gained international recognition. Traditional beliefs center around animism and shamanism, with a rich mythology featuring figures like Sedna, the goddess of the sea.",
    lifestyle:
      "While traditional hunting and gathering practices continue to be important, contemporary Inuit communities have undergone significant changes due to colonization, forced settlement, and climate change. Many Inuit now live in permanent settlements and participate in wage economies, while working to preserve their cultural heritage and address social challenges. In Canada, the creation of the territory of Nunavut in 1999 represented a significant achievement in Inuit self-governance.",
    images: [
        'https://resources.arctickingdom.com/hs-fs/hubfs/InuitTraditionalClothing.png?width=1080&height=566&name=InuitTraditionalClothing.png',
        'https://media.istockphoto.com/id/487123353/photo/inuit-woman-in-traditional-clothing.jpg?s=612x612&w=0&k=20&c=NvFXGoUbK4mIgzsaQmElDDrfvHDq_48BEXNzrxx6pEY=',
        'https://www.documentarytube.com/wp-content/uploads/2023/03/the-tradition-and-rituals-of-the-inuit-people.jpg',
        'https://t3.ftcdn.net/jpg/02/12/29/34/360_F_212293475_hDpsSQUXWHC6BncRPVFlSYkqTLzUsZzQ.jpg'
      ]
  },
  {
    key: "yanomami",
    name: "Yanomami",
    region: "Amazon Rainforest",
    population: "~35,000",
    language: "Yanomami languages",
    location: "Venezuela and Brazil",
    continent: "South America",
    coordinates: [71.5, 35.7, 1000000],
    description:
      "The Yanomami are one of the largest relatively isolated indigenous peoples in South America, living in the Amazon rainforest on the border between Venezuela and Brazil. They live in villages usually consisting of a single large communal house called a shabono, which houses multiple families. The Yanomami have been significantly impacted by outside contact, particularly from illegal gold miners who have brought disease and environmental destruction to their territories.",
    traditions:
      "Yanomami spiritual life centers around shamanism and the belief in a mythical ancestral world. Shamans communicate with spirits through the use of hallucinogenic snuff called yopo. Elaborate funeral rituals are important in Yanomami culture, including the practice of endocannibalism, where the cremated remains of the deceased are mixed with plantain soup and consumed by relatives as a way to ensure the soul of the deceased finds peace. Traditional body decoration includes body painting and the use of botanical materials.",
    lifestyle:
      "The Yanomami practice shifting cultivation, growing plantains, cassava, and other crops in gardens cleared from the forest. They supplement their diet through hunting, gathering wild foods, and fishing. Their society is largely egalitarian, with decisions made through consensus. Despite increasing outside pressures, many Yanomami communities maintain their traditional way of life while advocating for the protection of their lands and rights.",
    images: [
        'https://socioambiental.org/sites/default/files/styles/large/public/2022-06/RS102148_SNY05488-lpr.jpg?itok=SZtNqSp0',
        'https://assets.survivalinternational.org/pictures/7495/width460-f5ae3fe881d38b396029e8620cf8c155.jpg',
        'https://rightlivelihood.org/wp-content/uploads/2024/07/RS76_Davi-Carrrera-Yanomami-in-Raposa-Serra-do-Sol.FW-17-copy-lpr.jpg',
        'https://d36dm5l5awwtco.cloudfront.net/api/file/ZiMr2pmISFKz1m4wKk3Z/convert?w=2048&compress=true&fit=max'
      ]
  },
    {
        key: 'kalash',
        name: 'Kalash',
        region: 'South Asia',
        population: 'Around 4,000',
        language: 'Kalasha',
        location: 'Chitral District, Pakistan',
        continent: 'Asia',
        coordinates: [71.5, 35.7, 1000000],
        description: 'The Kalash are an indigenous people of Pakistan known for their unique religion and culture.',
        traditions: 'Colorful festivals (Chilam Joshi), polytheism, traditional dancing',
        lifestyle: 'Mountain village life, agriculture and animal husbandry',
        images: ['kalash1.jpg', 'kalash2.jpg']
      },
      {
        key: 'torres_strait',
        name: 'Torres Strait Islanders',
        region: 'Oceania',
        population: 'About 65,000',
        language: 'Kala Lagaw Ya, Meriam Mir, English',
        location: 'Torres Strait Islands, between Australia and Papua New Guinea',
        continent: 'Oceania',
        coordinates: [143.5, -10.6, 500000],
        description: 'The Torres Strait Islanders are the indigenous people of the Torres Strait Islands. These islands form part of the Australian Torres Strait Islands Archipelago, situated between Australia and Papua New Guinea. The Torres Strait Islanders have a rich cultural heritage shaped by their unique geographical location, history, and strong connection to the sea.',
        traditions: 'The Torres Strait Islanders have a variety of traditions, including dances and ceremonial performances that often depict stories from their ancestral past. Their storytelling traditions pass down history and cultural knowledge through generations. They are also known for their intricate navigation skills, using the stars and the ocean currents for navigation. Additionally, ceremonial masks and body art play a significant role in their rituals and celebrations.',
        lifestyle: 'The lifestyle of the Torres Strait Islanders is deeply connected to their natural environment, with a strong focus on the sea, fishing, and hunting. Many Islanders engage in subsistence fishing, using traditional methods to catch fish and other marine life. Island life is closely tied to the rhythm of the seasons, with ceremonies and festivals marking important points in the calendar year. The community is also known for its resilience, and their connection to their ancestral land and sea is vital to their cultural identity.',      
        images: ['https://www.queensland.com/content/dam/teq/consumer/global/images/destinations/tropical-north-queensland/web-images/2021_TNQ_TorresStrait_PrinceofWalesIsland_IslandStarsDanceTroupe_147289-19.jpg', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/a7/88/57/caption.jpg?w=1200&h=1200&s=1', 'https://www.wherewildthingsroam.com/wp-content/uploads/2023/08/Naygayiw-Gigi-Cultural-Performance.-Photo-Credit-Kate-Webster-04-1024x683.jpg']
      },
      {
        key: 'hamar',
        name: 'Hamar',
        region: 'East Africa',
        population: 'Around 50,000',
        language: 'Hamer-Banna',
        location: 'Omo Valley, Ethiopia',
        continent: 'Africa',
        coordinates: [36.5, 5.3, 500000],
        description: 'The Hamar are an indigenous people in southern Ethiopia, renowned for their unique cultural practices and rituals. They reside mainly in the Omo Valley, which is home to several ethnic groups. The Hamar people are particularly known for their distinctive and elaborate hairstyles, which are part of their social identity and can be a reflection of a person’s status, age, or marital state. Their culture is deeply connected to nature, and they maintain traditions that have been passed down through generations.',
        traditions: 'The Hamar people are most famous for their bull-jumping ceremony, a rite of passage for young men who are about to become warriors. The ceremony involves leaping over the backs of bulls, which is considered a symbol of bravery and strength. They also practice elaborate body decoration using clay, ochre, and other natural materials, particularly for special occasions and rituals. Their tattoos and scarification are an important part of their identity, and they are often associated with different stages of life or achievements.',
        lifestyle: 'The Hamar are semi-nomadic pastoralists, relying primarily on cattle herding for their livelihood. Cattle are not only a source of food but also a form of wealth and an important cultural symbol. They move with their cattle through the semi-arid Omo Valley, often setting up temporary settlements. Their lifestyle is adapted to the harsh conditions of the region, and they have a deep understanding of the natural environment. Social organization is centered around clans, and their daily life involves tending to their herds, preparing food, and participating in communal activities.',
        images: ['https://i0.wp.com/franceleclerc.com/wp-content/uploads/2022/10/HamarL25.jpg?fit=1500%2C1000&ssl=1', 'https://dvqlxo2m2q99q.cloudfront.net/000_clients/657152/file/657152HTsPLes3.jpg']
      },
      {
        key: 'chukchi',
        name: 'Chukchi',
        region: 'Siberia (Far East Russia)',
        population: 'Around 16,000',
        language: 'Chukchi',
        location: 'Chukotka Peninsula, Russia',
        continent: 'Asia',
        coordinates: [174, 66, 200000],
        description: 'The Chukchi are indigenous people of northeastern Siberia, traditionally living in the Chukchi Peninsula, the Bering Sea coast, and the surrounding Arctic regions. They are well-known for their adaptation to harsh Arctic environments, with their lifestyle being deeply connected to reindeer herding and coastal hunting. The Chukchi culture is rich in traditions, many of which revolve around their relationships with the natural world and their survival in one of the most extreme climates on Earth. They are famous for their skill in throat singing, which is an important part of their oral traditions and spiritual practices.',
        traditions: 'The Chukchi are known for throat singing, a form of vocalization that produces harmonics and is deeply connected to their spiritual life. It is used in shamanistic rituals and is often done in a group. The Chukchi also have a rich tradition of crafting skin boats (umiaks), which are used for hunting and transportation along the coast. Shamanism plays a key role in their spiritual practices, with shamans acting as intermediaries between the human world and the spirits of the natural environment. Their rituals often include dances, chants, and offerings to ensure harmony with the spirits of the animals and nature.',
        lifestyle: 'The Chukchi have historically been semi-nomadic, relying on reindeer herding and coastal hunting as their primary means of subsistence. They practice a subsistence lifestyle in one of the harshest environments on Earth, and their cultural practices have evolved to fit the Arctic conditions. The Chukchi use their knowledge of the environment to navigate the frozen landscapes, hunt marine mammals like seals and whales, and herd reindeer for food, clothing, and tools. Their traditional dwellings, known as "chums," are circular, tent-like structures made of reindeer skin, which offer protection from the cold. Today, many Chukchi still maintain traditional livelihoods, although they also engage in modern industries and technology.',      
        images: ['https://reindeerherding.org/images/news/2019/Chukchi_reindeer_herders_in_Chersky.jpg', 'https://mf.b37mrtl.ru/rbthmedia/images/2020.06/original/5ee8dba985600a353122049c.jpg']
      }      
  ]

  for (const culture of cultures) {
    await prisma.culture.create({
      data: culture
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
