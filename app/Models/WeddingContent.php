<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WeddingContent extends Model
{
    protected $fillable = ['section', 'data'];

    protected $casts = [
        'data' => 'array',
    ];

    /**
     * Get default website content matching the reference design.
     */
    public static function getDefaults(): array
    {
        $venue = "Samridhi Resort, Darjikuan, Gonda";
        $cdn = "https://hercules-cdn.com";

        return [
            'wedding' => [
                'brand' => 'K&A Forever',
                'groom' => 'Kritagaya',
                'bride' => 'Anuradha',
                'dateIso' => '2027-02-27T18:00:00+05:30',
                'venueShort' => $venue,
            ],
            'splash' => [
                'title' => 'K&A FOREVER',
                'names' => 'KRITAGAYA × ANURADHA',
                'blessing' => 'Rishta jo pyaare Madhav ne apne aashirwad ke roop mein banaya, aur humne dil se apnaya.',
                'invite' => '“Aapka intezaar hai… Enter our story.”',
                'placeholder' => 'Aapka shubh naam...',
                'button' => 'OPEN THE DOORS ♥',
                'durationMs' => 2200,
                'doorImage' => "{$cdn}/file_H117hJwQxH74QrVchBTUSi6n",
                'backgroundImage' => "{$cdn}/file_J0MYGABg8vNQ5Vni2BjvfAxE",
            ],
            'hero' => [
                'title' => 'K&A FOREVER',
                'names' => 'KRITAGAYA × ANURADHA',
                'tagline' => 'Two hearts, one beautiful journey.',
                'image' => "{$cdn}/file_b5wG7foSzCbTj7Fgpd6w9lSg",
                'imageAlt' => 'Kritagaya and Anuradha looking at each other',
            ],
            'nav' => [
                ['id' => 'home', 'label' => 'Home'],
                ['id' => 'story', 'label' => 'Our Story'],
                ['id' => 'families', 'label' => 'Families'],
                ['id' => 'celebrations', 'label' => 'Celebrations'],
                ['id' => 'countdown', 'label' => 'Wedding Countdown'],
                ['id' => 'venue', 'label' => 'Venue'],
                ['id' => 'gallery', 'label' => 'Gallery'],
                ['id' => 'wishes', 'label' => 'Best Wishes'],
                ['id' => 'rsvp', 'label' => 'RSVP'],
            ],
            'story' => [
                [
                    'eyebrow' => 'Our Story',
                    'heading' => 'Ek Rishta, Jo Dilon Tak Pahucha',
                    'paragraphs' => [
                        '“Ek rishta jo gharwalon ne joda aur humare dilon tak pahuncha. Aur aaj Madhav ki kripa se, dono parivaar ek hone ja rahe hain.”',
                    ],
                    'image' => "{$cdn}/file_RB9zYP6py0Ks4JrFssXOuou8",
                    'alt' => 'Kritagaya and Anuradha showing their engagement rings',
                    'caption' => 'The engagement · 1 July 2026',
                ],
                [
                    'eyebrow' => 'Bas thoda sa aur intezaar…',
                    'heading' => 'Ek Doosre Ka Humsafar',
                    'paragraphs' => [
                        '“Aur dheere-dheere, jo rishta families ne shuru kiya tha, woh humara ban gaya.',
                        'Kritagaya aur Anuradha ne bhi ek doosre ko waqt diya, samjha, jaana aur ek doosre ko humsafar bana liya.',
                        'Ab iss safar mein hum ek-doosre ka haath thaame, saath chalenge.”',
                    ],
                    'image' => "{$cdn}/file_DK7TVjTkChTYQsRqXsuYrX1D",
                    'alt' => 'Kritagaya and Anuradha on a boat by the lake palace at sunset',
                    'caption' => 'Sunsets by the lake',
                ],
            ],
            'familyIntro' => [
                'heading' => 'The People Behind Our Story',
                'text' => '“Every beautiful story has people who make it special. Ours is blessed with the love of our families, the warmth of our relationships, and the happiness of beginning a new journey together.”',
            ],
            'families' => [
                [
                    'title' => "From Anuradha's Family",
                    'members' => [
                        [
                            'name' => 'Mr. Rajendra Singh',
                            'relation' => "Anuradha's Father",
                            'messages' => [
                                '“Hamari beti ki zindagi ka ek naya safar shuru hone ja raha hai. Aapka aana is khushi ko aur bhi khaas bana dega.”',
                            ],
                            'more' => '',
                            'portrait' => '',
                            'hidden' => false,
                        ],
                        [
                            'name' => 'Mrs. Rajkumari Singh',
                            'relation' => "Anuradha's Mother",
                            'messages' => [
                                '“Beti ko vida karna sirf ek rasam nahi hoti, uski khushiyon ko naye ghar mein khilte dekhna ek maa ka sabse bada sapna hota hai. Aaiye, Anuradha ki is nayi journey ko apni duaon se aur khoobsurat banaiye.”',
                            ],
                            'more' => '',
                            'portrait' => '',
                            'hidden' => false,
                        ],
                        [
                            'name' => 'Mr. Ashish Singh',
                            'relation' => "Anuradha's Brother",
                            'messages' => [
                                '“Behen ki shaadi hai... toh celebration mein thodi masti, thoda dance aur bahut saari yaadein toh banti hain! Aap aa rahe hain na?”',
                            ],
                            'more' => '',
                            'portrait' => '',
                            'hidden' => false,
                        ],
                        [
                            'name' => 'Ms. Preeti Singh',
                            'relation' => "Anu's Bhabhi | A Sister by Heart",
                            'messages' => [
                                '“Bhabhi ka rishta naam se bhale hi juda ho, par apnapan dil se hota hai.”',
                                '“Anu ki zindagi mein ek aisi Bhabhi, jo sirf family ka hissa nahi, balki ek dost, ek guide aur ek apni si companion hain.”',
                            ],
                            'more' => '“Anu ki khushi mein humari khushi hai, aur uski shaadi mein toh celebration double banta hai! Is khoobsurat naye safar ke liye meri taraf se dher saara pyaar, blessings... aur thodi si Bhabhi wali teasing bhi!”',
                            'portrait' => '',
                            'hidden' => false,
                        ],
                    ],
                ],
                [
                    'title' => "From Kritagaya's Family",
                    'members' => [
                        [
                            'name' => 'Mr. Om Prakash Singh',
                            'relation' => "Kritagaya's Father",
                            'messages' => [
                                '“Beta jab apni zindagi ka saathi chunta hai, toh maa-baap ke liye usse badi khushi aur kya ho sakti hai. Aaiye, Kritagaya aur Anuradha ko apna aashirwad dijiye.”',
                            ],
                            'more' => '',
                            'portrait' => '',
                            'hidden' => false,
                        ],
                        [
                            'name' => 'Mrs. Sudha Singh',
                            'relation' => "Kritagaya's Mother",
                            'messages' => [
                                '“Ghar mein bahu nahi, ek beti aa rahi hai... aur is khushi ko apno ke saath baantne ka intezaar hai. Aap zaroor aaiyega.”',
                            ],
                            'more' => '',
                            'portrait' => '',
                            'hidden' => false,
                        ],
                        [
                            'name' => 'Bhoomi Singh',
                            'relation' => "Kritagaya's Sister",
                            'messages' => [
                                '“Bhai ki shaadi hai... ab dance floor par bhai ki izzat bachegi ya nahi, yeh toh aap sabke dance moves decide karenge! Ready rehna... celebration full on hai!”',
                            ],
                            'more' => '',
                            'portrait' => '',
                            'hidden' => false,
                        ],
                    ],
                ],
            ],
            'cousins' => [
                'heading' => 'Cousins, Chaos & Countless Memories',
                'lines' => [
                    '“Bachpan ki shararaton se lekar aaj ki celebrations tak, cousins ke bina har kahaani adhoori hai.',
                    'Aur ab Anuradha, tumhari baari hai iss pyaari si family ka hissa banne ki!”',
                ],
                'image' => "{$cdn}/file_SWOek4poWs6urEK50fb8OJQe",
                'imageAlt' => 'Kritagaya and Anuradha with family at the engagement',
            ],
            'celebrationsIntro' => [
                'eyebrow' => 'Celebrations',
                'heading' => 'Now The Real Celebration',
                'script' => 'Ab baari hai jashn ki!',
                'text' => '“Engagement ke baad ab woh waqt aa gaya hai jiska sabko intezaar tha. Mehendi ki mithaas, Haldi ki masti, Sangeet ki dhamaal… aur phir woh shaam, jab do parivaar ek nayi kahaani ka hissa banenge.”',
            ],
            'events' => [
                [
                    'title' => 'Mehendi',
                    'tagline' => 'Rang Mein Rang Jayein',
                    'startIso' => '2027-02-26T11:00:00+05:30',
                    'venue' => $venue,
                    'dressCode' => 'Green Traditional Wear',
                    'quote' => '“Haathon mein mehendi, chehron par khushi aur apno ke saath khoobsurat yaadein.”',
                    'image' => "{$cdn}/file_pOgWC4olwfW6oj0L78L8wH6r",
                ],
                [
                    'title' => 'Haldi',
                    'tagline' => 'Peela Rang, Dher Saari Khushiyaan',
                    'startIso' => '2027-02-26T14:00:00+05:30',
                    'venue' => $venue,
                    'dressCode' => 'Yellow Traditional Wear',
                    'quote' => '“Haldi ka function hai... toh haldi ka rang chadhega, thodi masti aur dher saari shararat hogi!”',
                    'image' => "{$cdn}/file_2wCmduw2fvcUiQcw688lvtGi",
                ],
                [
                    'title' => 'Sangeet',
                    'tagline' => 'Music, Masti & Memories',
                    'startIso' => '2027-02-26T20:00:00+05:30',
                    'venue' => $venue,
                    'dressCode' => 'Party Wear',
                    'quote' => '“Sangeet ki shaam aur apno ka saath, khoob jamega rang, jab dulha-dulhan naachenge saath!”',
                    'image' => "{$cdn}/file_xLVeTnF5rdTD09WWCqVghAcU",
                ],
                [
                    'title' => 'The Wedding',
                    'tagline' => 'Our Forever Begins',
                    'startIso' => '2027-02-27T18:00:00+05:30',
                    'venue' => $venue,
                    'dressCode' => 'Traditional Indian Wear',
                    'quote' => '“Mehendi ka rang, Haldi ki masti, Sangeet ki dhamaal... sabke baad aayegi woh shaam, jiska intezaar sab kar rahe hain.”',
                    'image' => "{$cdn}/file_Ki7ysGbNjes2P5GhrqjyakLJ",
                ],
            ],
            'countdown' => [
                'eyebrow' => 'The Countdown Begins',
                'heading' => 'Until Our Forever Begins',
                'script' => '“Bas thoda sa aur… phir milte hain shaadi mein!”',
                'backgroundImage' => "{$cdn}/file_Kjj9IC5h20jeesJmgeOnogi0",
            ],
            'venue' => [
                'name' => 'Samridhi Resort',
                'address' => 'Darjikuan, Gonda, Uttar Pradesh, India',
                'mapUrl' => 'https://www.google.com/maps/search/?api=1&query=Samridhi+Resort+Darjikuan+Gonda+Uttar+Pradesh',
                'image' => "{$cdn}/file_J0MYGABg8vNQ5Vni2BjvfAxE",
                'baraatPlace' => 'Vikramjot, Basti',
                'baraatNote' => 'Near Awdesh Singh Dhaba',
                'baraatMapUrl' => 'https://www.google.com/maps/search/?api=1&query=Awdesh+Singh+Dhaba+Vikramjot+Basti+Uttar+Pradesh',
            ],
            'gallery' => [
                ['src' => "{$cdn}/file_b5wG7foSzCbTj7Fgpd6w9lSg", 'alt' => 'Couple looking at each other', 'caption' => 'A glance that says everything'],
                ['src' => "{$cdn}/file_SWOek4poWs6urEK50fb8OJQe", 'alt' => 'Couple walking in together at the engagement', 'caption' => 'Walking in, together'],
                ['src' => "{$cdn}/file_DK7TVjTkChTYQsRqXsuYrX1D", 'alt' => 'Couple on a boat by a lake palace', 'caption' => 'Golden hour by the lake'],
                ['src' => "{$cdn}/file_utWd91tTxzfard1EdEV2mk7b", 'alt' => 'Couple under a grand chandelier', 'caption' => 'Under the chandeliers'],
                ['src' => "{$cdn}/file_ElttHrdK9P07xXLfbktIL3ud", 'alt' => 'Couple embracing on a misty beach', 'caption' => 'Quiet moments'],
                ['src' => "{$cdn}/file_2VPDvPbY3B6BVz0rleKYc7aZ", 'alt' => 'Kritagaya and Anuradha', 'caption' => 'Engagement memories'],
                ['src' => "{$cdn}/file_Tmp16JgglGIEhXS4VdW1DbDU", 'alt' => 'Kritagaya and Anuradha', 'caption' => 'Forever begins'],
            ],
            'finalInvitation' => [
                'backgroundImage' => "{$cdn}/file_J0MYGABg8vNQ5Vni2BjvfAxE",
            ],
            'parents' => [
                [
                    'title' => "From Anuradha's Parents",
                    'names' => 'Rajendra & Rajkumari Singh',
                    'message' => '“Apni beti ki khushi mein aapki khushi bhi shaamil ho... bas isi umeed ke saath aapka intezaar rahega.”',
                ],
                [
                    'title' => "From Kritagaya's Parents",
                    'names' => 'Om Prakash & Sudha Singh',
                    'message' => '“Hamare ghar ki khushi ab aapke ghar ki khushi bhi bane... aaiye, is naye rishte ko apna aashirwad dijiye.”',
                ],
            ],
            'design' => [
                'primary' => '#7D1F35',
                'accent' => '#C7A064',
                'background' => '#F8F1E7',
                'headingFont' => 'Cormorant Garamond',
                'radius' => 0.5,
                'overlay' => 80,
                'animations' => true,
            ],
            'music' => [
                'enabled' => false,
                'url' => '',
                'title' => 'Our song',
            ],
            'settings' => [
                'siteTitle' => 'K&A Forever · Kritagaya × Anuradha · 27 Feb 2027',
                'description' => 'You are invited to the wedding of Kritagaya Singh and Anuradha Singh on 27 February 2027 at Samridhi Resort, Gonda.',
                'shareText' => 'Kritagaya & Anuradha are getting married! Here is our invitation ♥',
                'footerNote' => 'With love from both families',
            ],
        ];
    }

    /**
     * Get all content merged with default fallbacks.
     */
    public static function getAllContent(): array
    {
        $defaults = self::getDefaults();

        try {
            $records = self::all()->keyBy('section');

            $result = [];
            foreach ($defaults as $sec => $def) {
                if (isset($records[$sec]) && is_array($records[$sec]->data)) {
                    if (is_array($def) && !array_is_list($def)) {
                        // Associative array: merge with defaults so newly added keys aren't lost
                        $result[$sec] = array_merge($def, $records[$sec]->data);
                    } else {
                        // Indexed array or raw data: use DB data if not empty
                        $result[$sec] = $records[$sec]->data;
                    }
                } else {
                    $result[$sec] = $def;
                }
            }

            return $result;
        } catch (\Throwable $e) {
            return $defaults;
        }
    }

    /**
     * Update or create a single section.
     */
    public static function setSection(string $section, array $data): self
    {
        return self::updateOrCreate(
            ['section' => $section],
            ['data' => $data]
        );
    }
}
