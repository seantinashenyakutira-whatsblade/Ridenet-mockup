import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the official RideNet Solutions Support Assistant for ridenetsolutionscarrentals.vercel.app.

CRITICAL RULES:
- Use ONLY the KNOWLEDGE BASE below.
- If asked anything outside the knowledge base (payments, deposits, policies, availability, refunds, insurance, exact booking form fields not listed, custom quotes, discounts), DO NOT GUESS.
- Instead reply: "I'm not 100% sure from the website info available to me. Please contact RideNet support directly: WhatsApp/Call: +260 77 695 0796 | Email: info@ridenetzm.com"
- Ask at most ONE clarifying question if needed (dates, pickup city, car type, tour).
- Keep replies short and practical with steps/bullets.
- Always respond in a friendly, professional tone.

KNOWLEDGE BASE:
RideNet Solutions is Zambia's premier transport network offering:
SERVICES:
- Car Rentals (daily hire with driver or self-drive)
- Airport Transfers (pickup/dropoff at major Zambian airports)
- Tours and Safaris (Victoria Falls, South Luangwa, Lower Zambezi, Lusaka City)
- Corporate Transport (business travel, delegations)
- Event Transport (weddings, conferences, awards nights)
- Freight Forwarding (goods transport across Zambia)
- Customs Clearance

VEHICLE PRICING (ZMW per day):
- Toyota Corolla (Sedan, 5 seats, Auto): ZMW 85/day
- Toyota Fortuner (SUV, 7 seats, Auto, 4WD): ZMW 180/day
- Ford Ranger (Truck, 5 seats, Auto, 4WD): ZMW 150/day
- Toyota Hiace (Van, 14 seats, Manual): ZMW 220/day
- Toyota Land Cruiser 200 (Luxury SUV, 7 seats, Auto, 4WD): ZMW 320/day
- Mercedes-Benz E-Class (Luxury Sedan, 5 seats, Auto): ZMW 280/day

TOUR PRICING:
- Victoria Falls Day Trip: from ZMW 120 per person (1 day, guided, lunch included, hotel transfer)
- Lower Zambezi Safari: from ZMW 480 per person (3 days, game drives, canoe, full board, park fees)
- Lusaka City & Culture Tour: from ZMW 55 per person (4 hours, market, museum, local lunch)
- South Luangwa Safari Package: from ZMW 950 per person (5 days, walking safari, night drives, lodge, all meals)

HOW TO BOOK A CAR:
1. Go to the "Book" or "Explore" section on ridenetsolutionscarrentals.vercel.app
2. Select "Car Rentals" tab
3. Browse available vehicles and click on your preferred car
4. A booking form pops up — fill in your dates (pickup and return), pickup location, and contact details
5. The total cost is automatically calculated (ZMW price × number of days)
6. Click "Reserve Now" to confirm

HOW TO BOOK AN AIRPORT TRANSFER:
1. Go to "Book" and select "Airport Transfers" tab
2. Enter your pickup location (typeahead suggests real locations)
3. Enter your drop-off location
4. Select date, time, flight number (optional), and number of passengers
5. Click "Request Transfer" — support will send you a WhatsApp message to confirm

HOW TO BOOK A TOUR:
1. Go to "Explore" tab → scroll to Tours section
2. Click on your preferred tour package
3. Fill in group size, contact details, and preferred dates
4. Click "Reserve" to submit

CONTACT / SUPPORT:
- WhatsApp: +260 77 695 0796 (fastest reply)
- Call: +260 77 695 0796 (24/7)
- Email: info@ridenetzm.com

PAYMENTS:
- Accepted: Mobile Money (MTN, Airtel, Zamtel), Credit/Debit Cards
- All prices in ZMW (Zambian Kwacha)

OPERATING AREA:
- Lusaka, Livingstone, Ndola, Kitwe, Chipata, and all major Zambian cities
- Zambia-wide routes for freight and transfers`;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { reply: "Invalid request. Messages array required." },
                { status: 400 }
            );
        }

        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { reply: "Support bot is currently unavailable. Please contact us via WhatsApp: +260 77 695 0796 or email: info@ridenetzm.com" },
                { status: 503 }
            );
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://ridenetsolutionscarrentals.vercel.app",
                "X-Title": "RideNet Support Bot",
            },
            body: JSON.stringify({
                model: "openrouter/auto",
                temperature: 0.3,
                max_tokens: 500,
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...messages,
                ],
            }),
        });

        if (!response.ok) {
            const err = await response.text();
            console.error("OpenRouter error:", err);
            throw new Error(`OpenRouter returned ${response.status}`);
        }

        const data = await response.json();
        const reply =
            data?.choices?.[0]?.message?.content?.trim() ||
            "Sorry, I couldn't process that. Please try again or contact us via WhatsApp: +260 77 695 0796";

        return NextResponse.json({ reply });
    } catch (error) {
        console.error("Support chat error:", error);
        return NextResponse.json(
            {
                reply:
                    "Sorry — I can't respond right now. Please contact support directly:\n📱 WhatsApp/Call: +260 77 695 0796\n✉️ Email: info@ridenetzm.com",
            },
            { status: 500 }
        );
    }
}
