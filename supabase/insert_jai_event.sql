INSERT INTO public.events (
    title,
    category,
    status,
    date,
    time,
    location,
    description,
    image_url,
    registration_url,
    tags,
    featured
) VALUES (
    'JAI 2026: Jaypee Agentic AI Hackathon',
    'Hackathon',
    'Upcoming',
    'Oct 30 - 31, 2026',
    '24 Hours',
    'JIIT Wish Town Campus, Sector-128, Noida',
    'Flagship Agentic AI Hackathon. Build autonomous agents. Tracks in Cybersecurity, Healthcare, NLP, and Open Innovation. ₹15L Prize Pool & ₹1CR Pre-Seed Pool. Inter-college & international participation.',
    'https://zqctadeszfnpnqopiamb.supabase.co/storage/v1/object/public/event-banners/EVENT/WhatsApp%20Image%202026-10-10%20at%2020.13.57.jpeg',
    'https://unstop.com/o/XAfa40i?lb=HG5JUnJm&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Adhiraox19770',
    ARRAY['#JAI2026', '#AgenticAI', '#Hackathon', '#AI', '#Unstop'],
    true
)
RETURNING *;
