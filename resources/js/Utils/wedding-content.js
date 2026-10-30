// Default content matching exact reference website assets and copy
const CDN = "https://hercules-cdn.com";

export const PHOTOS = {
  lookingAtEachOther: `${CDN}/file_b5wG7foSzCbTj7Fgpd6w9lSg`,
  walkingIn: `${CDN}/file_SWOek4poWs6urEK50fb8OJQe`,
  lakePalace: `${CDN}/file_DK7TVjTkChTYQsRqXsuYrX1D`,
  chandelier: `${CDN}/file_utWd91tTxzfard1EdEV2mk7b`,
  beach: `${CDN}/file_ElttHrdK9P07xXLfbktIL3ud`,
  extra1: `${CDN}/file_2VPDvPbY3B6BVz0rleKYc7aZ`,
  extra2: `${CDN}/file_Tmp16JgglGIEhXS4VdW1DbDU`,
};

export const DECOR = {
  palaceGarden: `${CDN}/file_J0MYGABg8vNQ5Vni2BjvfAxE`,
  doorPanel: `${CDN}/file_H117hJwQxH74QrVchBTUSi6n`,
  countdownBg: `${CDN}/file_Kjj9IC5h20jeesJmgeOnogi0`,
};

export const VENUE = "Samridhi Resort, Darjikuan, Gonda";

const member = (name, relation, messages, more = "") => ({
  name,
  relation,
  messages,
  more,
  portrait: "",
  hidden: false,
});

export const DEFAULT_CONTENT = {
  wedding: {
    brand: "K&A Forever",
    groom: "Kritagaya",
    bride: "Anuradha",
    dateIso: "2027-02-27T18:00:00+05:30",
    venueShort: VENUE,
  },
  splash: {
    title: "K&A FOREVER",
    names: "KRITAGAYA × ANURADHA",
    blessing: "Rishta jo pyaare Madhav ne apne aashirwad ke roop mein banaya, aur humne dil se apnaya.",
    invite: "“Aapka intezaar hai… Enter our story.”",
    placeholder: "Aapka shubh naam...",
    button: "OPEN THE DOORS ♥",
    durationMs: 2200,
    doorImage: DECOR.doorPanel,
    backgroundImage: DECOR.palaceGarden,
  },
  hero: {
    title: "K&A FOREVER",
    names: "KRITAGAYA × ANURADHA",
    tagline: "Two hearts, one beautiful journey.",
    image: PHOTOS.lookingAtEachOther,
    imageAlt: "Kritagaya and Anuradha looking at each other",
  },
  nav: [
    { id: "home", label: "Home" },
    { id: "story", label: "Our Story" },
    { id: "families", label: "Families" },
    { id: "celebrations", label: "Celebrations" },
    { id: "countdown", label: "Wedding Countdown" },
    { id: "venue", label: "Venue" },
    { id: "gallery", label: "Gallery" },
    { id: "wishes", label: "Best Wishes" },
    { id: "rsvp", label: "RSVP" },
  ],
  story: [
    {
      eyebrow: "Our Story",
      heading: "Ek Rishta, Jo Dilon Tak Pahucha",
      paragraphs: [
        "“Ek rishta jo gharwalon ne joda aur humare dilon tak pahuncha. Aur aaj Madhav ki kripa se, dono parivaar ek hone ja rahe hain.”",
      ],
      image: "https://hercules-cdn.com/file_RB9zYP6py0Ks4JrFssXOuou8",
      alt: "Kritagaya and Anuradha showing their engagement rings",
      caption: "The engagement · 1 July 2026",
    },
    {
      eyebrow: "Bas thoda sa aur intezaar…",
      heading: "Ek Doosre Ka Humsafar",
      paragraphs: [
        "“Aur dheere-dheere, jo rishta families ne shuru kiya tha, woh humara ban gaya.",
        "Kritagaya aur Anuradha ne bhi ek doosre ko waqt diya, samjha, jaana aur ek doosre ko humsafar bana liya.",
        "Ab iss safar mein hum ek-doosre ka haath thaame, saath chalenge.”",
      ],
      image: PHOTOS.lakePalace,
      alt: "Kritagaya and Anuradha on a boat by the lake palace at sunset",
      caption: "Sunsets by the lake",
    },
  ],
  familyIntro: {
    heading: "The People Behind Our Story",
    text: "“Every beautiful story has people who make it special. Ours is blessed with the love of our families, the warmth of our relationships, and the happiness of beginning a new journey together.”",
  },
  families: [
    {
      title: "From Anuradha's Family",
      members: [
        member("Mr. Rajendra Singh", "Anuradha's Father", [
          "“Hamari beti ki zindagi ka ek naya safar shuru hone ja raha hai. Aapka aana is khushi ko aur bhi khaas bana dega.”",
        ]),
        member("Mrs. Rajkumari Singh", "Anuradha's Mother", [
          "“Beti ko vida karna sirf ek rasam nahi hoti, uski khushiyon ko naye ghar mein khilte dekhna ek maa ka sabse bada sapna hota hai. Aaiye, Anuradha ki is nayi journey ko apni duaon se aur khoobsurat banaiye.”",
        ]),
        member("Mr. Ashish Singh", "Anuradha's Brother", [
          "“Behen ki shaadi hai... toh celebration mein thodi masti, thoda dance aur bahut saari yaadein toh banti hain! Aap aa rahe hain na?”",
        ]),
        member(
          "Ms. Preeti Singh",
          "Anu's Bhabhi | A Sister by Heart",
          [
            "“Bhabhi ka rishta naam se bhale hi juda ho, par apnapan dil se hota hai.”",
            "“Anu ki zindagi mein ek aisi Bhabhi, jo sirf family ka hissa nahi, balki ek dost, ek guide aur ek apni si companion hain.”",
          ],
          "“Anu ki khushi mein humari khushi hai, aur uski shaadi mein toh celebration double banta hai! Is khoobsurat naye safar ke liye meri taraf se dher saara pyaar, blessings... aur thodi si Bhabhi wali teasing bhi!”"
        ),
      ],
    },
    {
      title: "From Kritagaya's Family",
      members: [
        member("Mr. Om Prakash Singh", "Kritagaya's Father", [
          "“Beta jab apni zindagi ka saathi chunta hai, toh maa-baap ke liye usse badi khushi aur kya ho sakti hai. Aaiye, Kritagaya aur Anuradha ko apna aashirwad dijiye.”",
        ]),
        member("Mrs. Sudha Singh", "Kritagaya's Mother", [
          "“Ghar mein bahu nahi, ek beti aa rahi hai... aur is khushi ko apno ke saath baantne ka intezaar hai. Aap zaroor aaiyega.”",
        ]),
        member("Bhoomi Singh", "Kritagaya's Sister", [
          "“Bhai ki shaadi hai... ab dance floor par bhai ki izzat bachegi ya nahi, yeh toh aap sabke dance moves decide karenge! Ready rehna... celebration full on hai!”",
        ]),
      ],
    },
  ],
  cousins: {
    heading: "Cousins, Chaos & Countless Memories",
    lines: [
      "“Bachpan ki shararaton se lekar aaj ki celebrations tak, cousins ke bina har kahaani adhoori hai.",
      "Aur ab Anuradha, tumhari baari hai iss pyaari si family ka hissa banne ki!”",
    ],
    image: PHOTOS.walkingIn,
    imageAlt: "Kritagaya and Anuradha with family at the engagement",
  },
  celebrationsIntro: {
    eyebrow: "Celebrations",
    heading: "Now The Real Celebration",
    script: "Ab baari hai jashn ki!",
    text: "“Engagement ke baad ab woh waqt aa gaya hai jiska sabko intezaar tha. Mehendi ki mithaas, Haldi ki masti, Sangeet ki dhamaal… aur phir woh shaam, jab do parivaar ek nayi kahaani ka hissa banenge.”",
  },
  events: [
    {
      title: "Mehendi",
      tagline: "Rang Mein Rang Jayein",
      startIso: "2027-02-26T11:00:00+05:30",
      venue: VENUE,
      dressCode: "Green Traditional Wear",
      quote: "“Haathon mein mehendi, chehron par khushi aur apno ke saath khoobsurat yaadein.”",
      image: `${CDN}/file_pOgWC4olwfW6oj0L78L8wH6r`,
    },
    {
      title: "Haldi",
      tagline: "Peela Rang, Dher Saari Khushiyaan",
      startIso: "2027-02-26T14:00:00+05:30",
      venue: VENUE,
      dressCode: "Yellow Traditional Wear",
      quote: "“Haldi ka function hai... toh haldi ka rang chadhega, thodi masti aur dher saari shararat hogi!”",
      image: `${CDN}/file_2wCmduw2fvcUiQcw688lvtGi`,
    },
    {
      title: "Sangeet",
      tagline: "Music, Masti & Memories",
      startIso: "2027-02-26T20:00:00+05:30",
      venue: VENUE,
      dressCode: "Party Wear",
      quote: "“Sangeet ki shaam aur apno ka saath, khoob jamega rang, jab dulha-dulhan naachenge saath!”",
      image: `${CDN}/file_xLVeTnF5rdTD09WWCqVghAcU`,
    },
    {
      title: "The Wedding",
      tagline: "Our Forever Begins",
      startIso: "2027-02-27T18:00:00+05:30",
      venue: VENUE,
      dressCode: "Traditional Indian Wear",
      quote: "“Mehendi ka rang, Haldi ki masti, Sangeet ki dhamaal... sabke baad aayegi woh shaam, jiska intezaar sab kar rahe hain.”",
      image: `${CDN}/file_Ki7ysGbNjes2P5GhrqjyakLJ`,
    },
  ],
  countdown: {
    eyebrow: "The Countdown Begins",
    heading: "Until Our Forever Begins",
    script: "“Bas thoda sa aur… phir milte hain shaadi mein!”",
    backgroundImage: DECOR.countdownBg,
  },
  venue: {
    name: "Samridhi Resort",
    address: "Darjikuan, Gonda, Uttar Pradesh, India",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Samridhi+Resort+Darjikuan+Gonda+Uttar+Pradesh",
    image: DECOR.palaceGarden,
    baraatPlace: "Vikramjot, Basti",
    baraatNote: "Near Awdesh Singh Dhaba",
    baraatMapUrl: "https://www.google.com/maps/search/?api=1&query=Awdesh+Singh+Dhaba+Vikramjot+Basti+Uttar+Pradesh",
  },
  gallery: [
    { src: PHOTOS.lookingAtEachOther, alt: "Couple looking at each other", caption: "A glance that says everything" },
    { src: PHOTOS.walkingIn, alt: "Couple walking in together at the engagement", caption: "Walking in, together" },
    { src: PHOTOS.lakePalace, alt: "Couple on a boat by a lake palace", caption: "Golden hour by the lake" },
    { src: PHOTOS.chandelier, alt: "Couple under a grand chandelier", caption: "Under the chandeliers" },
    { src: PHOTOS.beach, alt: "Couple embracing on a misty beach", caption: "Quiet moments" },
    { src: PHOTOS.extra1, alt: "Kritagaya and Anuradha", caption: "Engagement memories" },
    { src: PHOTOS.extra2, alt: "Kritagaya and Anuradha", caption: "Forever begins" },
  ],
  finalInvitation: { backgroundImage: DECOR.palaceGarden },
  parents: [
    {
      title: "From Anuradha's Parents",
      names: "Rajendra & Rajkumari Singh",
      message: "“Apni beti ki khushi mein aapki khushi bhi shaamil ho... bas isi umeed ke saath aapka intezaar rahega.”",
    },
    {
      title: "From Kritagaya's Parents",
      names: "Om Prakash & Sudha Singh",
      message: "“Hamare ghar ki khushi ab aapke ghar ki khushi bhi bane... aaiye, is naye rishte ko apna aashirwad dijiye.”",
    },
  ],
  design: {
    primary: "#7D1F35",
    accent: "#C7A064",
    background: "#F8F1E7",
    headingFont: "Cormorant Garamond",
    radius: 0.5,
    overlay: 80,
    animations: true,
  },
  music: { enabled: false, url: "", title: "Our song" },
  settings: {
    siteTitle: "K&A Forever · Kritagaya × Anuradha · 27 Feb 2027",
    description: "You are invited to the wedding of Kritagaya Singh and Anuradha Singh on 27 February 2027 at Samridhi Resort, Gonda.",
    shareText: "Kritagaya & Anuradha are getting married! Here is our invitation ♥",
    footerNote: "With love from both families",
  },
};

import logoImg from "../../images/madhav-kripa-logo.png";

export const MADHAV_KRIPA_LOGO = logoImg;
