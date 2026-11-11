-- =====================================================
-- Midget Micro Drives & Rides - Live Product Catalog Migration & Seeding Script
-- Source Domain: https://midgetdriftcarsandebikes.shop
-- Total Active Products: 55
-- =====================================================
-- Safe and idempotent to execute in any new Supabase SQL Editor or via psql.
-- Preserves exact product IDs, current names, SKUs, USD pricing, categories,
-- descriptions, China fulfillment hub locations, and /images/... media paths.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Ensure products table exists with all required columns before seeding
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    sku TEXT UNIQUE NOT NULL,
    stock INTEGER DEFAULT 0,
    images TEXT[] DEFAULT '{}',
    videos TEXT[] DEFAULT '{}',
    category TEXT NOT NULL,
    brand TEXT,
    is_active BOOLEAN DEFAULT true,
    is_new BOOLEAN DEFAULT false,
    shipping_required BOOLEAN DEFAULT true,
    average_delivery_time TEXT DEFAULT '21-35 business days (Express Courier from China Hub)',
    store_location TEXT DEFAULT 'Shenzhen Technology & Electric Mobility Hub, China',
    weight DECIMAL(8,2),
    dimensions TEXT,
    rating DECIMAL(3,2) DEFAULT 4.90,
    reviews INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Remove legacy mock sample products if present
DELETE FROM public.products WHERE id IN ('prod_001', 'prod_002', 'prod_003', 'prod_004', 'prod_005', 'prod_006');

-- Upsert all 55 live products from https://midgetdriftcarsandebikes.shop
INSERT INTO public.products (
    id,
    name,
    description,
    price,
    original_price,
    sku,
    stock,
    images,
    videos,
    category,
    brand,
    is_active,
    is_new,
    shipping_required,
    average_delivery_time,
    store_location,
    weight,
    dimensions,
    rating,
    reviews,
    created_at,
    updated_at
)
VALUES
    (
        '8c41bbe1-2bdf-4952-89dc-c67326288251',
        'JW1502 4-Seat Adult Off-Road Kart – Family Size Go-Kart',
        '
Built for massive family off-road adventures, the JW1502 is a heavily oversized 4-seat adult utility kart designed to carry 4 riders across rugged terrain with ease.

Powered by a high-torque 200cc GY6 4-stroke air-cooled engine with fully automatic clutch, it delivers effortless power through an advanced rear drive axle with integrated bridge differential.

Key Highlights:

4-Seat Configuration – Spacious adult-size seating for driver + 3 passengers
Engine: 200cc GY6 single-cylinder 4-stroke, air-cooled, automatic
Top Speed: 70 km/h
Range: 70 km per tank
Fuel Tank: 15L long-range tank
Brakes: Front & rear hydraulic disc brakes
Suspension: 4x independent shock suspensions for rough terrain
Ground Clearance: 180mm + 15°+ climbing capacity
Load Capacity: Over 300 kg (660 lbs)
Tires: Heavy-tread off-road – Front 23×7-10, Rear 22×10-10, aluminum rims
Dimensions: 2350 × 1450 × 1460 mm
Colors: Red, Black, White, Blue, Purple, Green
Skill Level: Intermediate
Condition: Brand New – In Stock
A heavy-duty, stable, and highly capable off-road ride that combines maximum passenger capacity with smooth control.',
        950,
        1000,
        'MMR-1070',
        2900,
        ARRAY['/images/prod_1793737099460_886577456_1929621351747325_6410364728832386594_n.webp', '/images/prod_1793737076816_880351903_1045984678527924_3419632813795135202_n.webp', '/images/prod_1793737111965_884732388_1160931663148672_5997856890774842320_n.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '29-39 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-03T20:18:51.584397+00:00'::timestamptz,
        '2026-11-10T13:56:07.698004+00:00'::timestamptz
    ),
    (
        'ed56c705-0370-409e-b59a-6d03a0b3cbe3',
        'BKDG35- 125cc Dirt Bike',
        'Powered by a 125cc engine, this lightweight off-road bike delivers a top speed of 40-60 km/h, blending a compact build with solid trail capability. Tipping the scales at just 65 kg and producing 5.6 kW of peak power, it''s built for riders who want an agile, easy-to-handle machine.

Specs:

125cc engine
Top speed: 40–60 km/h
Peak power: 5.6 kW
Weight: 65 kg
Dimensions: 1600 x 750 x 990 mm
Condition: Brand New
Origin: Made in China',
        450,
        550,
        'MMR-3757',
        967,
        ARRAY['/images/prod_1793732667683_879638786_2248836466035052_1303313473377013885_n.webp', '/images/prod_1793732709399_884349664_1370493511631422_2898659355809811886_n.webp', '/images/prod_1793732728706_884455161_4603601663241409_3033630037199873865_n.webp', '/images/prod_1793732746421_886476525_1021664074284855_477357320236823975_n.webp', '/images/prod_1793732770969_888101687_1276289491330891_5047534280241037923_n.webp']::text[],
        '{}'::text[],
        'dirtBikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '29-39 business days (Nanshan, Shenzhen, Guangdong Province, China Warehouse)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-03T19:07:30.297116+00:00'::timestamptz,
        '2026-11-10T13:56:04.91747+00:00'::timestamptz
    ),
    (
        'b6b7d0a4-0779-4b5a-af56-a436bbaf841e',
        'micro Porsche Go-Kart Is Pure, Unlimited Fun',
        ' Premium vibe for your MIDGET MICRODRIVES brand:

Short & viral (for TikTok / Reels):

Pure Fun, Mini Porsche Edition
Small Kart. Big Grin.
This Mini Porsche Doesn''t Play Nice
Unfiltered Fun in Mini Porsche Form
Pocket-Sized Porsche, Full-Send Fun
Premium / Ad copy:
6. The Mini Porsche Go-Kart Built For Pure Adrenaline
7. Small Scale. Full Throttle. Pure Fun.
8. Meet The Mini Porsche That Rewrites Fun
9. Not A Toy. It''s Pure, Unfiltered Porsche Fun - Miniaturized
10. The Mini Porsche Go-Kart That Feels Too Fun To Be Legal

With MIDGET MICRODRIVES angle:
11. MIDGET MICRODRIVES: Pure, Unfiltered Fun. Mini Porsche Approved.
12. Pure Porsche Fun, Shrunk To Perfect Size
13. This Isn''t A Mini Go-Kart. It''s Unfiltered Joy On Wheels.',
        750,
        850,
        'MMR-4005',
        5780,
        ARRAY['/images/prod_1793713230768_879375193_4380359228881411_2680515772863278963_n.webp', '/images/prod_1793713268678_886520170_4698303330399289_8440611912197974984_n.webp', '/images/prod_1793713283260_888033386_2513005489207954_527265973326789750_n.webp', '/images/prod_1793713297260_885670062_3440567349436257_2801491055186895436_n.webp', '/images/prod_1793713311279_884822599_2605283919941118_4704706393162341550_n.webp', '/images/prod_1793713321616_881933260_889854187473665_2261958795252111869_n.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '29-39 business days',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-03T13:43:18.293292+00:00'::timestamptz,
        '2026-11-10T13:56:02.583087+00:00'::timestamptz
    ),
    (
        '5fd47266-c58f-4a83-8806-0867305152ee',
        'F40 Adult Electric Go Kart with Lithium Battery Customizable Exterior & Wheel Hub 80KM/H for Off-Road Racing',
        'High-speed electric go kart for adults The F40 Adult Electric Go Kart delivers a thrilling ride with a top speed of 80km/h, powered by a 2500W mid-mounted high-torque motor for strong performance on off-road tracks.
Lithium battery with 72V power system Equipped with a 72V lithium battery, this go kart ensures long-lasting power and efficient energy use, supporting high-speed operation and reliable performance during extended racing sessions.
Shaft drive with gear drive technology Featuring a shaft drive and gear drive system, the F40 provides smooth, durable power transmission with minimal maintenance, ideal for demanding off-road racing environments.
Advanced hydraulic braking system The hydraulic brake system ensures precise and responsive stopping power, enhancing safety and control at high speeds, especially during aggressive cornering or sudden deceleration.
Customizable exterior and logo options With customized color and custom logo acceptance, the F40 allows users to personalize the look of their go kart, making it unique for racing events or personal branding.
Robust build for heavy-duty use Built with a sturdy frame, the F40 weighs 280KG and supports a maximum load of 200kg, making it suitable for adult and teen users seeking a durable, high-performance electric kart.
Compact packaging for easy shipping Packed in a wood box with dimensions of 150 x 150 x 150 cm and a package weight of 30.000 kg, the go kart is securely shipped from China Mainland for reliable delivery.

Specifications
High-concerned chemical
none
Origin
Mainland China
Packaging
wood box
Brand Name
insostar
Model Number
911
Type
Electric Go Karts
Engine
2500W mid-mounted high-torque motor
Drive Mode
gear drive
Wheel Size
8inch
Oil Tank Capacity
No
Engine Capacity
Other
Weight
280KG
Fuel
Electric
max load
200kg
Application
Outdoor, RACING, Sports, Amusement Park, Entertainment
Power
2500W
Max Speed
80kmh
Engine Type
Electric
Suitable Person
Adult, Teen
Braking System
Hydraulic Brake
Drive Type
Shaft Drive
Product name
F40 Adult Electric Go Kart with Lithium Battery
Style
Plastic Vehicle Toys
Function
Fancy
Size
2600*1100*800mm
Color
Customized Color
Logo
Custom Logo Accept
Battery
72V
G.W & N.W
290kgs
Age
14Years +
Usage
Indoor Play Car

',
        750,
        850,
        'MMR-7089',
        2960,
        ARRAY['/images/prod_1793711401875_S4a70d6c1c7a343fd910c99c7fdc3c545f.jpg_960x960q75.jpg_.avif', '/images/prod_1793711401876_S903f773db36244d685c7ce3491856b0ai.jpg_960x960q75.jpg_.avif', '/images/prod_1793711401876_S903f773db36244d685c7ce3491856b0ai.jpg_960x960q75.jpg___1_.avif', '/images/prod_1793711401876_S996ad4cb760d4dad9929a88fd91913e3M.jpg_960x960q75.jpg_.avif', '/images/prod_1793711401878_Sa816d6c2be8b47a1a1dd9cab408d6174L.jpg_960x960q75.jpg_.avif', '/images/prod_1793711401878_Sb3d59c08d6fc468091e590aeb85db4e99.jpg_960x960q75.jpg_.avif']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '29-39 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-03T13:09:35.100183+00:00'::timestamptz,
        '2026-11-10T13:56:01.882772+00:00'::timestamptz
    ),
    (
        '054f3f65-5503-464f-b3d6-dc99e4a23edd',
        'RE49-60V Electric Dirt Bike',
        'The 60V Electric Dirt Bike combines a lightweight aluminum frame with large 19-inch front and 17-inch rear tires for stability and handling across off-road terrain.

60V electric motorcycle
Maximum speed: >80 km/h
Aluminum frame construction
Front 19-inch and rear 17-inch aluminum tires
Front hydraulic shock absorption
Rear spring suspension
Front and rear disc brakes
Hydraulic disc brakes for responsive stopping power
Maximum load capacity: 200 kg
LCD speed meter and power indicator
LED headlight, brake light, and front/rear turn signals
Normal start function
Single seat
Price listed without battery
Motorcycle Type: Electric Motorcycle
Voltage: 60V
Place of Origin: Zhejiang
Dashboard: LCD speed meter and power indicator
Tire: Front 19-inch + Rear 17-inch aluminum tires
Light: LED headlight + Brake light + Front and rear turning light
Suspension: Front hydraulic shock absorption / Rear spring
Start function: Normal start
Seat: Single seat
Brakes: Front and Rear Disc Brake
Max load: 200 kg

',
        450,
        NULL,
        'MMR-4174',
        4120,
        ARRAY['/images/prod_1793655999233_883961451_1353859123431811_8423157313489684358_n.webp', '/images/prod_1793732960629_F11.webp', '/images/prod_1793732977953_F1.webp', '/images/prod_1793732990301_F1111.webp']::text[],
        '{}'::text[],
        'dirtBikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '29-39 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-02T21:47:52.769757+00:00'::timestamptz,
        '2026-11-10T13:56:18.952423+00:00'::timestamptz
    ),
    (
        '38a235d3-2f6c-4180-9987-200d6ed3983a',
        'AGGD54- JW3001 300cc 4x4 Mini Jeep',
        'The JW3001 4x4 is an adult-sized, open-air mini Jeep
designed for recreational off-road use. Manufacturer-published
specifications describe a 300cc, water-cooled, single-cylinder,
four-stroke petrol engine, automatic CVT transmission, 25-litre fuel
tank, hydraulic disc brakes, and 270mm minimum ground clearance.

Its rugged utility design includes four wheels, 12-inch wheels, front
and rear suspension, and a stated load capacity of at least 450kg. The
manufacturer’s standard specification lists seating for four people.
Some promotional imagery supplied for this listing describes it as a
five-seat vehicle, so confirm the exact configuration of the unit being
sold before publishing the passenger capacity.

Model: JW3001 4x4
Engine: 300cc, water-cooled, single-cylinder, four-stroke
Fuel: Petrol / gasoline (manufacturer documentation specifies 92# or
above)

Transmission: Automatic continuously variable transmission (CVT)
Drive/transmission layout: Manufacturer documentation describes a
rear drive axle with integrated differential; confirm whether the
specific unit is true 4x4 before advertising four-wheel drive

Fuel tank: 25 litres
Manufacturer-listed economic fuel consumption: approximately 6 L/100
km

Manufacturer-listed minimum ground clearance: 270mm
Manufacturer-listed load capacity: at least 450kg
Brakes: Front and rear hydraulic disc brakes
Wheels: 12-inch front and rear
Suspension: Front and rear longitudinal leaf springs with hydraulic
shock-absorption system; confirm configuration on the supplied unit

Manufacturer-listed climbing capacity: over 25 degrees
Product dimensions: 2900 x 1520 x 1620mm
Net weight: approximately 500kg
Gross shipping weight: approximately 528kg; packaging and shipping
weight may vary

Published color options: gray, red, blue, black, and yellow; confirm
local availability

Intended user: Adult
Images show a tubular roll cage, roof rack with auxiliary lights,
open sides, and red-and-black seats; confirm which accessories are
included as standard and which are optional.

',
        950,
        1100,
        'MMR-4215',
        210,
        ARRAY['/images/prod_1793655307660_887990622_984518170799343_8527378308260745393_n.webp', '/images/prod_1793655329615_877686103_1127855649642082_8344215946139665423_n.webp', '/images/prod_1793655336796_884551677_1761662094949663_331402969597307552_n.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '21-35 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-02T21:36:09.624103+00:00'::timestamptz,
        '2026-11-10T13:55:46.029693+00:00'::timestamptz
    ),
    (
        '842581cf-fcc6-4af3-8539-bc0b2c08ae68',
        'MD02TK-60V 5000W High-Speed Electric Drift Kart',
        'The 60V 5000W High-Speed Electric Drift Kart is built for riders who want serious speed, long-range electric performance, and responsive drift control. Its high-carbon steel frame, CATL LiFePO4 battery, and powerful mid-mounted motor make it ready for demanding indoor and outdoor track riding.

5000W peak power electric drift system
2500W rated motor power
Mid-mounted permanent-magnet DC motor
60V 30Ah CATL LiFePO4 battery
Up to 70 km/h top speed
Up to 60 km riding range
6–7 hour charging time
FarDriver controller
High-carbon steel frame
Three-piston caliper braking system
Front and rear three-piston disc brakes
Ultra wear-resistant rubber tyres
Maximum load capacity of 200 kg
Net weight of 93.3 kg
Designed for indoor and outdoor track riding
Available in Red, Black, White, Blue, and Purple
CE certified
Complete vehicle
Customized configuration available
',
        450,
        550,
        'MMR-2131',
        20,
        ARRAY['/images/prod_1793655524065_884349659_969322075794279_3563922004757067156_n.webp', '/images/prod_1793655531730_881774318_1658263612316915_2694547234369306523_n.webp', '/images/prod_1793655550248_886086252_1426993952365630_4186868635883834793_n.webp', '/images/prod_1793655570927_886730768_2203919443534546_8994401216894529365_n.webp', '/images/prod_1793655587708_886552257_2332523500920088_2228785376381597553_n.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '29-35 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-02T21:10:14.13023+00:00'::timestamptz,
        '2026-11-10T13:56:16.682895+00:00'::timestamptz
    ),
    (
        '8908f81c-2eab-47cb-8ab2-34be9f489ded',
        'MD03FB-6000W Electric Dirt Bike',
        'Built around a powerful 6000W mid-drive motor, this electric dirt bike delivers strong acceleration, high-speed performance, and substantial climbing capability. Its 60V 50Ah battery provides up to 110 miles of stated range, while the 19-inch front and 16-inch rear tires provide a versatile setup for adult riders.

6000W peak mid-drive motor
300Nm maximum torque
65 MPH top speed
60V 50Ah battery
3000Wh battery capacity
Up to 110 miles stated range
Triple-mode drive
Front 19" × 2.8" tire
Rear 16" × 3.5" tire
Twist throttle
Available in one size: 19" / 16"
Suitable for riders from 5''1" to 6''5"
Weight: 238 lbs
',
        450,
        NULL,
        'MMR-3424',
        3125,
        ARRAY['/images/prod_1793653242856_883920826_1658468065928975_3646863090824895650_n.webp', '/images/prod_1793653242859_885312375_1787421929174851_257089085887956976_n.webp', '/images/prod_1793653275393_886341218_2115838279294533_6222962306871054991_n.webp']::text[],
        '{}'::text[],
        'dirtBikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '29-39 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-02T21:01:38.83944+00:00'::timestamptz,
        '2026-11-10T13:56:15.982974+00:00'::timestamptz
    ),
    (
        'e24f440c-5809-4356-b142-a0b40391ab0a',
        'MD02FB-MRZ Racing MR26 CB320 320cc Motocross Dirt Bike',
        'The MRZ Racing MR26 CB320 Motocross Dirt Bike is built for riders seeking dependable engine performance, manual control, and rugged off-road capability. Powered by a Loncin CB320 320cc single-cylinder, four-stroke, air-cooled engine producing 15.5 kW, this dirt bike combines practical engineering with a purpose-built motocross design for trail riding and off-road adventures.

Designed for control across challenging terrain, the MR26 features 21-inch front and 18-inch rear wheels for a full-size motocross setup. Its 51 mm inverted hydraulic front forks offer dual adjustability and 180 mm of travel, helping absorb impacts and maintain handling over uneven surfaces. At the rear, a 455 mm dual-adjustable shock with a ballonet provides 90 mm of suspension travel.

The MR26 offers both kick-start and electric-start options for convenient ignition. Its manual-clutch transmission features a 1-0-2-3-4-5 gear configuration, giving riders direct control over gear selection and engine performance. A 7.5-litre fuel tank supports extended riding between refills, while the 1450 mm wheelbase contributes to the bike''s overall riding geometry.

Combining a 320cc Loncin engine, adjustable suspension, full-size motocross wheels, and a manual transmission, the MRZ Racing MR26 is designed for riders looking for a powerful, mechanically engaging off-road motorcycle.',
        450,
        550,
        'MMR-9035',
        206,
        ARRAY['/images/prod_1793652762700_886225214_1164796866218954_4523005557990705892_n.webp', '/images/prod_1793652762704_886577457_4629173220705448_1653650312108799827_n.webp']::text[],
        '{}'::text[],
        'dirtBikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '29-39 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-02T20:53:22.479088+00:00'::timestamptz,
        '2026-11-10T13:55:59.882972+00:00'::timestamptz
    ),
    (
        'bad7c633-5eaf-4942-b9a2-260902a1f709',
        '45RWEDF-MRZ Racing MR26 CB320 320cc Motocross Dirt Bike',
        'The MRZ Racing MR26 CB320 Motocross Dirt Bike is built for riders seeking powerful petrol performance, precise control, and rugged off-road capability. Powered by a 320cc Loncin CB320 single-cylinder, four-stroke, air-cooled engine producing 15.5 kW, this dirt bike combines dependable engine performance with a purpose-built motocross design for trail riding and off-road adventures.

Designed for demanding terrain, the MR26 features 21-inch front and 18-inch rear wheels, providing a full-size motocross setup for off-road riding. The front suspension consists of 51 mm inverted hydraulic dual-adjustable forks with 180 mm of travel, helping absorb impacts and maintain control over uneven surfaces. At the rear, a 455 mm dual-adjustable shock with a ballonet provides 90 mm of suspension travel.

The MR26 offers both kick-start and electric-start ignition for added convenience. Its manual-clutch transmission features a 1-0-2-3-4-5 gear configuration, giving riders direct control over gear selection. A 7.5-litre fuel tank supports extended riding between refills, while the 1450 mm wheelbase contributes to the bike''s overall handling geometry.

Combining a 320cc Loncin engine, adjustable suspension, full-size motocross wheels, and manual transmission, the MRZ Racing MR26 is designed for riders looking for a capable, mechanically engaging off-road motorcycle.

320cc Loncin CB320 single-cylinder, four-stroke, air-cooled engine
Maximum engine power: 15.5 kW
Kick starter and electric starter
Manual clutch transmission
21-inch front and 18-inch rear wheels
51 mm inverted hydraulic front forks
Front suspension travel: 180 mm
455 mm dual-adjustable rear shock with ballonet
Rear suspension travel: 90 mm
7.5-litre fuel tank
Wheelbase: 1450 mm
',
        450,
        550,
        'MMR-4743',
        129,
        ARRAY['/images/prod_1793652294435_66206a0f-3aa3-4db4-85a1-0b466a5e8f23.webp', '/images/prod_1793652294435_2a463ed2-3953-47bb-b4a5-2670fbe2330e.webp', '/images/prod_1793652294438_2f9699a5-a285-499e-9b2a-e1f887561f3b.webp']::text[],
        '{}'::text[],
        'dirtBikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '29-39 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-02T20:44:59.68433+00:00'::timestamptz,
        '2026-11-10T13:55:59.012752+00:00'::timestamptz
    ),
    (
        'b6270225-bc20-4b07-b963-c15e236e5a94',
        'RTB582- Minicar Aventador',
        '',
        1000,
        NULL,
        'MMR-4371',
        20,
        ARRAY['/images/prod_1794226500206_897385796_1099429619792777_6468290525799825132_n.webp', '/images/prod_1793651930330_IMG_5060_avent_main_67323f73-5f26-4907-98ab-bade5b9ba92c.webp']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '21-35 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-02T20:39:01.862295+00:00'::timestamptz,
        '2026-11-10T13:56:15.643448+00:00'::timestamptz
    ),
    (
        '46148dfa-e01d-4fe9-b65e-4b6ac032a54c',
        'APEX 3RT5- Minicar Ford F-150',
        '',
        1000,
        1249.96,
        'MMR-9321',
        1240,
        ARRAY['/images/prod_1793651838101_ford_f-150_main_23f7ee94-2573-4dac-8989-f427d0c728b7.webp', '/images/prod_1793651838100_ford_f-150_man_ca766be3-dd70-41e4-bb53-490ddb7247cf.webp']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '21-35 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-02T20:37:33.029484+00:00'::timestamptz,
        '2026-11-10T20:24:34.342707+00:00'::timestamptz
    ),
    (
        '97719922-e37f-4251-adb9-7492a60972cb',
        'Minicar AMG OPEN TOP',
        '',
        1000,
        1250,
        'MMR-9818',
        275,
        ARRAY['/images/prod_1793651737694_IMG_5009_amg_main_a799f470-3343-4af4-97db-ce1eaf985920.webp', '/images/prod_1793651737692_IMG_5010_amg_man_f91541f5-adc2-4e8e-bcfa-b0bea44f9a80.webp']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '21-35 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-02T20:35:54.834152+00:00'::timestamptz,
        '2026-11-10T13:56:14.082772+00:00'::timestamptz
    ),
    (
        '115e4a3f-ff51-4457-bdfc-b5eca697ff95',
        'Minicar Bentley Red',
        '',
        1000,
        1250,
        'MMR-8281',
        288,
        ARRAY['/images/prod_1793651630434_IMG_5026_1_bentley_red_main_141eebcd-08c0-470d-92a5-f174b445b984.webp', '/images/prod_1793651630435_IMG_5027_1_bentley_red_man_c5c917e9-3ec9-4055-91be-18bfbddfed21.webp']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '21-35 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-02T20:34:23.163967+00:00'::timestamptz,
        '2026-11-10T13:56:12.457469+00:00'::timestamptz
    ),
    (
        '76744e3a-707b-4df7-bfd8-5099444964ef',
        '4khg- Minicar Mercedes Maybach',
        'Minicar Mercedes Maybach Uprated controller on electric builds, performance carb and exhaust on petrol. Harder launches, stronger top end Powertrain
Electric
Drive unit
2500 W motor, 72 V 40 Ah
Top speed
Up to 30 mph',
        1000,
        1250,
        'MMR-3074',
        20,
        ARRAY['/images/prod_1793651377263_886706513_990365067482464_2836382038474994218_n.webp', '/images/prod_1793651377258_886035761_1388967919985923_3416478601697540313_n.webp']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '21-35 business days',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-02T20:29:53.185195+00:00'::timestamptz,
        '2026-11-10T13:56:13.358502+00:00'::timestamptz
    ),
    (
        '242acc3d-9ddc-4b0d-83ed-97cd7053bdcb',
        '3EE4-Both blue Bugatti',
        'half size, from $1000, with you in the seat and a passenger beside you. Steel frame, real brakes, rear-wheel drive that slides when you ask. Up to 35 mph inches off the ground. Electric for the silence.


Build sheet
Powertrain
Gasoline
Drive unit  125cc four-stroke
Top speed
Up to 35 mph
Range / tank
3.5 L tank
Dimensions
102 x 43 x 31 in
Kerb weight
419 lb
Max load
440 lb, two seats
Fits riders up to
6 ft 3 in',
        1000,
        1250,
        'MMR-8525',
        256,
        ARRAY['/images/prod_1793650898589_879817959_2328417041244926_288892056541258223_n.webp', '/images/prod_1793650898593_888017594_1634290948243571_4991560922745237402_n.webp']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '21-35 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-02T20:23:02.553472+00:00'::timestamptz,
        '2026-11-10T13:56:12.822332+00:00'::timestamptz
    ),
    (
        'e38e49ff-f11e-46c9-b671-fbc8bf35b15d',
        '3U45H -STREET FRIENDLY MICRO CARS',
        'Quiet enough for our street
Cul-de-sac, neighbours close. Electric was the right call',
        1000,
        1250,
        'MMR-7660',
        219,
        ARRAY['/images/prod_1793650025282_879375234_2380473659450246_70180426148421530_n.webp', '/images/prod_1793650032858_886770566_1645896740648662_6732348246359460554_n.webp', '/images/prod_1793650040265_888506302_1125828299857042_316727796852675222_n.webp', '/images/prod_1793650247405_881774324_1087285747463622_7822863289122069249_n.webp', '/images/prod_1793650267222_879544614_2070309011038601_9086743362186625132_n.webp', '/images/prod_1793650480832_885312371_1669894924573764_9012584498484360434_n.webp', '/images/prod_1793650491998_885265808_1439417001657360_3433208380395612932_n.webp', '/images/prod_1793650503219_886609299_1456673486431583_7728887533111138269_n.webp']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '21-35 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-02T20:11:58.313079+00:00'::timestamptz,
        '2026-11-10T13:56:12.10331+00:00'::timestamptz
    ),
    (
        '7e93292c-835d-41c6-a013-d37fed276caf',
        'Minicar Porsche 911',
        'Exact 1:2 scale drivable replica, two seats as standard
At half size, from $750, with you in the seat and a passenger beside you. Steel frame, real brakes, rear-wheel drive that slides when you ask. Up to 35 mph inches off the ground. Petrol for the noise, electric for the silence.',
        750,
        849.99,
        'MMR-7802',
        2070,
        ARRAY['/images/prod_1793713692028_886376572_1433042665000943_7801620454266700358_n.webp', '/images/prod_1793649074433_879779068_1368028398560616_3466829741489366487_n.webp', '/images/prod_1793649694952_883034637_1104417505801998_6869710603593887594_n.webp', '/images/prod_1793649702275_884252158_1600544418221672_7743596483789082124_n.webp', '/images/prod_1793649713960_882517511_28957992453894551_4916612327555497492_n.webp']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '21-35 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-02T19:51:59.677275+00:00'::timestamptz,
        '2026-11-10T13:56:15.209068+00:00'::timestamptz
    ),
    (
        '71803330-82ff-4907-b77e-da9e6353e329',
        'MEH-5000 72V 5000W Electric Go Kart',
        'The MEH-5000 Electric Go Kart HAS powerful acceleration, responsive handling, and dependable performance for recreational karting. Built with a robust 5000W electric motor, heavy-duty steel frame, and hydraulic disc brakes, it offers an exciting and reliable driving experience on private tracks and off-road terrain.

Key Features:

High-performance 5000W permanent magnet synchronous motor
72V lead-acid battery system
Peak power output up to 18 kW
Top speed up to 65 km/h
Four-wheel hydraulic disc braking system
Durable chain-drive transmission
Heavy-duty 4130 chromoly steel frame
Precision TIG and MIG welded chassis
Three-spoke sport steering wheel
Comfortable high-back seat
Maximum load capacity: 200 kg
Heavy-duty 13 × 6.5-6 tyres
Designed for recreational electric karting',
        450,
        550,
        'MEH-5000 ',
        297689,
        ARRAY['/images/prod_1793644938147_black.webp', '/images/prod_1793645006253_yello.webp', '/images/prod_1793645017659_ingine.webp', '/images/prod_1793645044915_blue_2.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '29-39 business days (Nanshan, Shenzhen, Guangdong Province, China Warehouse)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-11-02T12:37:35.422023+00:00'::timestamptz,
        '2026-11-10T20:24:58.507786+00:00'::timestamptz
    ),
    (
        'bc538035-8cfa-47c0-9369-c5341c327ff2',
        'Porsche 964 Open Top',
        'The Porsche 964 Open Top Electric Microcar (popularly known as the 964 Turbo Junior by manufacturers like END OF S.T.A.Y.) is a highly sought-after, 1:2 scale electric junior car built for adults and kids alike. Mimicking the iconic convertible architecture of the classic 964-generation Porsche 911, these high-end, street-legal-capable karts offer scaled-down luxury combined with surprisingly fast electric performance.',
        750,
        850,
        'MMR-5525',
        304,
        ARRAY['/images/prod_1793646861244_midget_porsche_1.png', '/images/prod_1793646878919_midget_porsche_2.png', '/images/prod_1793646887083_midget_porsche_3.png', '/images/prod_1793646899957_midget_porsche_4.png', '/images/prod_1793646907973_midget_porsche_5.png']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '29-39 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        NULL,
        NULL,
        4.9,
        0,
        '2026-10-17T12:52:46.010478+00:00'::timestamptz,
        '2026-11-10T13:55:53.553177+00:00'::timestamptz
    ),
    (
        'eb9f53ee-ea3f-4299-823d-2ae9aa6455e2',
        '3000W Electric Motorcycle',
        'The 3000W Electric Motorcycle combines a brushless motor with front and rear suspension for a capable and comfortable ride.

* 3000W peak brushless motor
* 40 - 60 km/h maximum speed
* Single-speed drivetrain
* Front and rear suspension
* Net weight: 57kg
* Gross weight: 64kg
* Product size: 157 × 65 × 93cm
* Black finish
* New condition

Place of Origin: Jiangsu, China
Brand Name: XSZB',
        450,
        550,
        'MMR-3000W-ELECTRIC-M',
        2000,
        ARRAY['/images/prod_1793646219683_midget_ym_final_6.png', '/images/prod_1793646247309_midget_ym_final_2.png', '/images/prod_1793646258552_midget_ym_final_3.png', '/images/prod_1793646272625_midget_ym_final_4.png', '/images/prod_1793646308637_midget_ym_final_6.png']::text[],
        '{}'::text[],
        'dirtBikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '29-39 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        40,
        'Range: 70 KM',
        4.95,
        103,
        '2026-10-13T19:01:12.358821+00:00'::timestamptz,
        '2026-11-10T13:56:13.707695+00:00'::timestamptz
    ),
    (
        '2c27a6df-c5c0-4945-bb72-4cc0f74c15c1',
        'S1 2kW Electric All-Terrain Buggy',
        'Take on outdoor terrain with the S1 2kW Electric All-Terrain Buggy, a shaft-driven off-road go-kart designed for adults and teens. Powered by a 2000W NanPu electric motor and a 72V 40Ah battery, it combines electric performance with a rugged galvanized steel tube frame, large off-road tyres, and hydraulic disc brakes at both the front and rear.

Built for outdoor and off-road use, the S1 features 180mm of ground clearance with large tyres, a 1300mm wheelbase, and a maximum load capacity of 200kg. The shaft-drive system provides direct power delivery while the hydraulic braking system provides braking at all four wheels.

- 2000W NanPu electric motor
- 72V 40Ah battery
- Shaft-driven off-road drivetrain
- Front and rear hydraulic disc brakes
- Galvanized steel tube frame
- 180mm ground clearance with large tyres
- 200kg maximum load capacity
- 16x8-7 off-road wheels
- Suitable for adults and teens
- Designed for outdoor and off-road riding
- 1-year whole vehicle warranty
- 3-year motor warranty

The manufacturer lists a maximum speed of up to 100 km/h.',
        650,
        813,
        'MMR-S1-2KW-ELECTRIC-',
        1000,
        ARRAY['/images/prod_1793647901220_midget_brand_4.png', '/images/prod_1793648026716_midget_brand_2.png']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        100,
        'Range: 65 KM',
        4.92,
        35,
        '2026-10-13T19:01:11.673927+00:00'::timestamptz,
        '2026-11-10T13:56:06.612882+00:00'::timestamptz
    ),
    (
        '6d994d46-5c4a-4203-bc8a-1c73a928bbe1',
        'GC3001 300cc Two-Seater Off-Road Go Kart',
        'The GC3001 is a full-size two-seater off-road go-kart built for riders who want strong performance, comfort, and dependable handling. Its 300cc water-cooled engine, automatic transmission with reverse, hydraulic disc brakes, and double-chain drive make it well suited for recreational riding across challenging terrain.

Key Features:

* Powerful 300cc single-cylinder 4-stroke water-cooled engine
* Two-seater adult-size design
* Automatic transmission with reverse
* Electric start with 12V 9Ah battery
* Double-chain drive power transmission
* Front and rear hydraulic disc brakes
* Comfortable shock suspension system
* 260 mm ground clearance
* Maximum speed of over 85 km/h
* Load capacity of over 300 kg
* Climbing capability of at least 20°
* Large off-road tyres for improved traction
* Available in black, red, blue, orange, and other colours

Specifications:

* Model: GC3001
* Engine: 300cc single-cylinder, 4-stroke, water-cooled
* Transmission: Automatic with reverse
* Starting system: Electric start
* Battery: 12V 9Ah
* Load capacity: >300 kg (660 lbs)
* Ground clearance: 260 mm
* Fuel tank: 7 litres
* Fuel type: Unleaded petrol, 90 octane or higher
* Top speed: >85 km/h
* Wheelbase: 1150 mm
* Climbing capacity: ≥20°
* Net weight: 260 kg (572 lbs)
* Gross weight: 280 kg (616 lbs)

Dimensions:

* Overall dimensions: 2300 × 1640 × 1570 mm
* Carton size: 230 × 138 × 73 cm per unit

Braking System:

* Front hydraulic disc brakes
* Rear hydraulic disc brakes

Drive System:

* Double-chain drive transmission

Wheels & Tyres:

* Front: 21 × 7-10
* Rear: 22 × 10-10

Available Colours:

* Black
* Red
* Blue
* Orange
* Additional colours may be available

Ideal For:

* Recreational off-road riding
* Private tracks
* Farms and large properties
* Trails and open terrain
* Two-person outdoor adventures',
        450,
        560,
        'MMR-GC3001-300CC-TWO',
        3000,
        ARRAY['/images/prod_1793648585796_883256059_1843699147051081_6457045567992984700_n.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '29-39 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        85,
        'Range: 75 KM',
        4.91,
        27,
        '2026-10-13T19:01:10.891018+00:00'::timestamptz,
        '2026-11-10T13:56:09.492547+00:00'::timestamptz
    ),
    (
        '18cc9ead-df21-4c61-84df-a23f768cb57b',
        'JW1502 4-Seat Adult Off-Road Kart',
        'The JW1501 is a heavily oversized, 4-seat adult off-road utility kart built to carry up to four riders across rugged terrain with ease. Powered by a high-torque 200cc GY6 4-stroke air-cooled engine with a smooth automatic clutch, it delivers effortless power managed by an advanced rear drive axle and integrated bridge differential. Equipped with four independent shock suspensions and high-clearance 180 mm seating, this heavy-duty machine combines maximum passenger capacity with a smooth, stable, and highly capable off-road ride.

Key Features:
• Significantly larger chassis optimized for adult riders
• Spacious 4-seat passenger configuration
• High-torque 200cc GY6 single-cylinder 4-stroke air-cooled engine
• Fully automatic clutch for effortless operational control
• Rear drive axle equipped with an integrated bridge differential
• Massive 15-litre long-range fuel tank for extended driving time
• Four premium independent shock suspensions for rugged terrain
• Adjustable seat clearance for custom driver and rider comfort
• Responsive front and rear hydraulic disc brakes
• High-ground clearance of 180 mm to conquer obstacles
• Strong climbing capacity exceeding 15 degrees
• Heavy-duty load capacity: Over 300 kg (660 lbs)
• Heavy-tread off-road tyres (Front: 23×7-10, Rear: 22×10-10)
• Premium full aluminum wheel rims with optional 12-inch upgrades
• Robust overall product dimensions: 2350 × 1450 × 1460 mm
• Available in vibrant colour options (Red, Blue, Orange, Yellow, Green)',
        750,
        1250,
        'MMR-JW1502-4-SEAT-AD',
        900,
        ARRAY['/images/prod_1793654801618_879511779_28913074728360346_2297068246274224465_n.webp', '/images/prod_1793654813049_884829744_3371872033004705_1111376557460618083_n.webp', '/images/prod_1793654823051_886167603_1679839003749225_1985721710914708304_n.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '21 - 28  business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        70,
        'Range: 65 KM',
        4.97,
        80,
        '2026-10-13T19:01:10.36613+00:00'::timestamptz,
        '2026-11-10T13:56:02.232633+00:00'::timestamptz
    ),
    (
        '460f658f-ba6d-449d-a1ad-e9022ea7efba',
        'G45UH- High-Speed Electric Drift Go Kart',
        'The High-Speed Electric Drift Go Kart delivers powerful acceleration, responsive handling, and smooth electric performance for an exciting driving experience. Built with a durable steel frame, hydraulic disc brakes, and a dedicated hand brake, it''s designed for recreational drifting, private tracks, and off-road adventures.

Key Features:
• High-performance electric drive system
• Top speed up to 75 km/h
• Durable heavy-duty steel frame
• Hydraulic disc braking system
• Chain drive transmission
• Hand brake for improved drift control
• Smooth and quiet electric operation
• Heavy-duty off-road tyres
• Maximum load capacity: 200 kg
• Vehicle weight: 150 kg
• Designed for recreational off-road and drift riding
• Available in multiple colour options',
        350,
        450,
        'MMR-HIGH-SPEED-ELECT',
        1000,
        ARRAY['/images/prod_1793654346420_864685568_4457547844484876_2650379428582532061_n.webp', '/images/prod_1793654353359_881774318_1658263612316915_2694547234369306523_n.webp', '/images/prod_1793654360938_883718070_987170297776126_1731842969153634989_n.webp', '/images/prod_1793654392180_885312369_1669352248050578_619129323973863391_n.webp', '/images/prod_1793654419982_886376567_912107175319201_634110139812029498_n.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '29-39 business days ',
        'Shenzhen Technology & Electric Mobility Hub, China',
        75,
        'Range: 90 KM',
        4.92,
        97,
        '2026-10-13T19:01:08.996901+00:00'::timestamptz,
        '2026-11-10T13:56:16.343888+00:00'::timestamptz
    ),
    (
        '617e894e-f1f8-4d4d-a733-0bd8760a5556',
        'EG0502 Kids Electric Go Kart',
        'The EG0502 Electric Go Kart is specifically designed for kids, offering a perfect blend of safety and electric performance. Driven by a 48V 550W brushless hub motor and a reliable shaft drive transmission with forward and reverse, it features a semi-covered seat with a 3-point safety belt. Parents can easily manage performance using the built-in 3-speed limitation settings, while the detachable battery box ensures convenient charging away from the kart.

Key Features:
• Special safety-focused design built for kids
• Efficient 48V 550W brushless hub motor
• Shaft driving transmission with forward and reverse functionality
• Detachable battery box for convenient remote charging
• Long-lasting 48V 13Ah Chaowei lead-acid battery
• Travel range: Up to 60 km or 4–6 hours of driving time
• Charging time: 6–8 hours
• Three parent-controlled speed limitations: 10, 15, or 20 km/h
• Semi-covered seat ensures enhanced rider safety
• Secure 3-point driver safety belt
• Adjustable seat leg clearance ranging from 620 mm to 670 mm
• Premium 4 aluminum wheel rims with 5-inch tubeless tyres
• Responsive rear step hydraulic brake system
• Ground clearance: 55 mm
• Maximum load capacity: Over 120 kg (264 lbs)
• Product dimensions: 1400 × 950 × 780 mm',
        1200,
        1500,
        'MMR-EG0502-KIDS-ELEC',
        1000,
        ARRAY['/images/eg0502-kids-electric-go-kart.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        20,
        'Range: 60 km',
        4.88,
        58,
        '2026-10-13T19:01:07.26802+00:00'::timestamptz,
        '2026-11-10T13:56:01.008134+00:00'::timestamptz
    ),
    (
        'b9702410-22b6-4ae3-8c1e-27725618a1bc',
        'GC2002 Adult Racing Go Kart',
        'The GC2002 Go Kart is our most popular adult racing model, engineered to deliver top-tier performance at an economical cost. Driven by a powerful 200cc 6.5HP 4-stroke engine featuring a wet clutch system, it reaches thrilling speeds over 70 km/h with exceptional control. Built with a heavy-duty frame, stable 1160 mm wheelbase, and a responsive rear caliper disc brake, this versatile kart is a track favorite available with multiple engine size options.

Key Features:
• High-performance chassis optimized for adult riders
• Most popular and widely demanded track model
• Powerful 200cc 6.5HP 4-stroke engine with wet clutch system
• Pull-start ignition with optional electric start upgrade
• Blazing top speed: Over 70 km/h
• Sharp rear caliper disc brake with a 1.5m braking distance
• Durable chain-drive transmission
• High weight capacity: Over 200 kg (440 lbs)
• Fuel tank capacity: 2 litres
• Wide wheelbase of 1160 mm for stable cornering
• Front tyres: 10 × 4.5-5
• Rear tyres: 11 × 7.1-5
• Overall dimensions: 1700 × 1100 × 450 mm
• Strong climbing ability: Greater than or equal to 10 degrees
• Available in multiple colours (Black, Red, Blue, Orange)
• Highly economical initial and maintenance costs
• Engine options available in 160cc, 200cc, and 270cc configurations
• OEM customization available on mass orders',
        2000,
        2500,
        'MMR-GC2002-ADULT-RAC',
        3000,
        ARRAY['/images/gc2002-adult-racing-go-kart.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        70,
        'Range: 70 KM',
        4.95,
        49,
        '2026-10-13T19:01:06.600984+00:00'::timestamptz,
        '2026-11-10T13:56:08.798208+00:00'::timestamptz
    ),
    (
        '4957e38a-3cbd-4679-8a73-df26e4826e45',
        'JW1501 200cc Adult Mini Jeep Willys',
        'The JW1501 200cc Adult Mini Jeep Willys is built with a larger adult-sized design, automatic GY6 power, independent suspension, and a high-capacity 15-litre fuel tank. Its durable construction and four-wheel hydraulic braking make it suited for recreational off-road driving.

- 200cc GY6 single-cylinder 4-stroke air-cooled engine
- Automatic clutch
- Four independent shock suspensions
- Large 15-litre fuel tank
- Adjustable seat clearance
- Full aluminium wheel rims
- Front and rear hydraulic disc brakes
- Rear drive axle with integrated bridge differential
- Adult-size large-body design
- 300 kg (660 lbs) load capacity
- 180 mm minimum ground clearance
- Over 15° climbing capability
- Product size: 2350 × 1450 × 1460 mm
- Front tyres: 23 × 7-10
- Rear tyres: 22 × 10-10
- Optional 12-inch wheels
- Available in Red, Blue, Orange, Yellow, Green, and more
- Net weight: 178 kg
- Gross weight: 202 kg
- Carton packed',
        1000,
        1250,
        'MMR-JW1501-200CC-ADU',
        220,
        ARRAY['/images/jw1501-200cc-adult-mini-jeep-willys.webp']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        false,
        true,
        '21  - 28 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        75,
        'Range: 65 KM',
        4.98,
        72,
        '2026-10-13T19:01:06.107916+00:00'::timestamptz,
        '2026-11-10T13:56:10.357588+00:00'::timestamptz
    ),
    (
        'dd87324b-242c-4a97-b02e-7e25918b7d37',
        'ES8005 800W Electric Scooter',
        'The ES8005 800W Electric Scooter combines performance, comfort, and convenience for daily commuting and leisure riding. Powered by an 800W brushless motor, equipped with a removable lithium battery, and featuring a foldable frame, it delivers a smooth, reliable, and enjoyable riding experience wherever you go.

Key Features:
• Powerful 800W brushless hub motor
• 48V 12Ah removable lithium battery
• Top speed: 35–45 km/h
• Riding range: Up to 45 km per charge
• Foldable frame for easy storage and transport
• Large 10 × 6.0-5.5 wide tubeless tyres
• Front and rear disc brakes
• Rear hub motor drive
• Adjustable front fork
• Adjustable seat height
• Dual rear brake lights for improved visibility
• Lockable battery compartment with easy battery access
• Maximum load capacity: 120 kg
• Maximum climbing ability: 18°
• Charging time: 4–6 hours
• Wheelbase: 980 mm
• Overall dimensions: 1300 × 550 × 1100 mm
• Available in White, Black, Red, Pink, Yellow, Orange, and additional colours',
        340,
        425,
        'MMR-ES8005-800W-ELEC',
        1000,
        ARRAY['/images/es8005-800w-electric-scooter.png']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '21 - 28 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        45,
        'Range: 45 km',
        4.94,
        32,
        '2026-10-13T19:01:05.597998+00:00'::timestamptz,
        '2026-11-10T13:56:01.452954+00:00'::timestamptz
    ),
    (
        'ba448cd5-ae3d-49e2-aba8-554b7ebe4b7e',
        '200cc High-Speed Drift Go Kart',
        'The 200cc High-Speed Drift Go Kart combines powerful performance, rugged construction, and responsive handling for an exciting off-road driving experience. Powered by a dependable 200cc 4-stroke petrol engine and built on a heavy-duty steel frame, it''s designed for riders who want speed, control, and adventure on private tracks and off-road terrain.

Key Features:
• Powerful 200cc single-cylinder 4-stroke petrol engine
• 4.5 kW power output
• Top speed up to 90 km/h
• Rear-wheel drive for responsive handling
• Manual pull-start ignition
• Heavy-duty steel frame construction
• Designed for off-road and drift riding
• Large off-road tyres for improved traction
• Maximum load capacity: 200 kg
• Fuel tank capacity: 5 litres
• Front tyres: 8-inch
• Rear tyres: 10-inch
• Vehicle dimensions: 1800 × 1100 × 520 mm
• Vehicle weight: 90 kg
• Available in Black and Green',
        350,
        438,
        'MMR-200CC-HIGH-SPEED',
        0,
        ARRAY['/images/200cc-high-speed-drift-go-kart.png', '/images/mm1.webp', '/images/mm2.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '21 - 28 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        90,
        'Range: 100 KM',
        4.89,
        45,
        '2026-10-13T19:01:05.142879+00:00'::timestamptz,
        '2026-11-10T13:56:18.952423+00:00'::timestamptz
    ),
    (
        '23c1989d-c145-4263-abff-f4ea1a859d72',
        '212cc Drift Racing Go Kart',
        'The 212cc Drift Racing Go Kart delivers impressive power, responsive handling, and rugged durability for adrenaline-filled off-road adventures. Featuring a reliable 212cc 4-stroke petrol engine, hydraulic disc brakes, and a heavy-duty steel frame, it''s built for recreational drifting, racing, and off-road riding on private tracks.

Key Features:
• Powerful 212cc single-cylinder 4-stroke petrol engine
• Top speed up to 90 km/h
• Rear-wheel drive with chain transmission
• Heavy-duty steel frame construction
• Hydraulic disc braking system
• Hand brake for improved drift control
• 150 mm suspension travel for enhanced comfort
• Rugged off-road tyres
• Fuel tank capacity: 3.5 litres
• Maximum load capacity: 200 kg
• Front tyres: 10 × 4.50-5
• Rear tyres: 11 × 7.10-5
• Vehicle weight: 100 kg
• Single-seat racing design
• Available in multiple colour options',
        400,
        500,
        'MMR-212CC-DRIFT-RACI',
        1000,
        ARRAY['/images/212cc-drift-racing-go-kart.png']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        90,
        'Range: 100 KM',
        4.91,
        67,
        '2026-10-13T19:01:04.26098+00:00'::timestamptz,
        '2026-11-10T13:56:00.63816+00:00'::timestamptz
    ),
    (
        '10e5f7c9-98f0-4019-a7ff-5d659fdd308f',
        'EA6001 4×4 Electric All-Terrain Scooter',
        'The EA6001 4×4 Electric All-Terrain Scooter is engineered for maximum traction, stability, and long-range performance. Featuring four powerful hub motors, automatic power steering, and a high-capacity lithium battery, it delivers exceptional control and comfort for off-road adventures, farms, estates, and utility applications.

Key Features:
• Four independent 1500W brushless hub motors (6000W total output)
• Four-wheel drive (4WD) system
• Automatic power steering
• 60V 80Ah lithium battery pack
• Top speed: Up to 45 km/h
• Riding range: Up to 120 km per charge
• Front double swing arm suspension
• Front and rear hydraulic disc brakes
• IP66-rated motor controller
• Forward and reverse drive
• Foldable design with detachable seat
• Full aluminium wheel rims
• Front and rear cargo racks
• Tubeless all-terrain tyres
• Maximum load capacity: 300 kg (660 lbs)
• Maximum climbing ability: 55°
• Ground clearance: 220 mm
• Charging input: 80–240V AC, 50–60Hz, 7A
• Front tyres: 21 × 7-10 Tubeless
• Rear tyres: 21 × 7-10 Tubeless
• Overall dimensions: 1750 × 1400 × 1403 mm
• Available in Red, Blue, Black, Yellow, and additional colours',
        450,
        563,
        'MMR-EA6001-4X4-ELECT',
        500,
        ARRAY['/images/ea6001-4x4-electric-all-terrain-scooter.png']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        45,
        'Range: 120 km',
        4.93,
        95,
        '2026-10-13T19:01:03.197176+00:00'::timestamptz,
        '2026-11-10T13:56:00.263252+00:00'::timestamptz
    ),
    (
        '400f2373-b5d8-44d2-ad8c-09d9e39cdc35',
        'JW1501 4-Seat Adult Off-Road Kart',
        'The JW1501 is a heavily oversized, 4-seat adult off-road utility kart built to carry up to four riders across rugged terrain with ease. Powered by a high-torque 200cc GY6 4-stroke air-cooled engine with a smooth automatic clutch, it delivers effortless power managed by an advanced rear drive axle and integrated bridge differential. Equipped with four independent shock suspensions and high-clearance 180 mm seating, this heavy-duty machine combines maximum passenger capacity with a smooth, stable, and highly capable off-road ride.

Key Features:
• Significantly larger chassis optimized for adult riders
• Spacious 4-seat passenger configuration
• High-torque 200cc GY6 single-cylinder 4-stroke air-cooled engine
• Fully automatic clutch for effortless operational control
• Rear drive axle equipped with an integrated bridge differential
• Massive 15-litre long-range fuel tank for extended driving time
• Four premium independent shock suspensions for rugged terrain
• Adjustable seat clearance for custom driver and rider comfort
• Responsive front and rear hydraulic disc brakes
• High-ground clearance of 180 mm to conquer obstacles
• Strong climbing capacity exceeding 15 degrees
• Heavy-duty load capacity: Over 300 kg (660 lbs)
• Heavy-tread off-road tyres (Front: 23×7-10, Rear: 22×10-10)
• Premium full aluminum wheel rims with optional 12-inch upgrades
• Robust overall product dimensions: 2350 × 1450 × 1460 mm
• Available in vibrant colour options (Red, Blue, Orange, Yellow, Green)',
        750,
        1375,
        'MMR-JW1501-4-SEAT-AD',
        1000,
        ARRAY['/images/200cc 4-Seater Off-Road Go Kart 1 - $550.webp', '/images/jw1501-4-seat-adult-off-road-kart.webp', '/images/200cc 4-Seater Off-Road Go Kart 3 - $550.webp.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '21 - 28 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        70,
        'Range: 70 KM',
        4.9,
        51,
        '2026-10-13T19:01:02.247115+00:00'::timestamptz,
        '2026-11-10T13:56:10.938319+00:00'::timestamptz
    ),
    (
        'e5e569c1-822c-4657-bb93-edcacb0744f0',
        'EA4801 4×4 Electric Quad ATV',
        'The EA4801 4×4 Electric Quad ATV is built to conquer challenging terrain with powerful performance, exceptional traction, and dependable control. Equipped with four independent hub motors, a high-capacity lithium battery, and advanced suspension, it delivers a smooth and capable riding experience for work, recreation, and outdoor adventure.

Key Features:
• Four 1200W brushless AC hub motors (4800W total output)
• Four-wheel drive with independent hub motors
• 60V 40Ah lithium battery pack
• Top speed: Up to 55 km/h
• Front double swing arm suspension
• Front and rear hydraulic disc brakes
• IP66-rated motor controller
• Forward and reverse drive
• Overload protection system
• Foldable design with detachable seat
• Full aluminium wheel rims
• Rear tow bar
• Rear storage toolbox
• Tubeless all-terrain tyres
• Maximum load capacity: 300 kg (660 lbs)
• Maximum climbing ability: 55°
• Ground clearance: 220 mm
• Charging time: 3–4 hours
• Charging input: 80–240V AC, 50–60Hz, 7A
• Front tyres: 225 × 40-10 Tubeless
• Rear tyres: 225 × 40-10 Tubeless
• Overall dimensions: 1430 × 1020 × 1255 mm
• Available in Red, Blue, Black, Yellow, and additional colours',
        550,
        688,
        'MMR-EA4801-4X4-ELECT',
        500,
        ARRAY['/images/ea4801-4x4-electric-quad-atv.png']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        55,
        'Range: 60 km',
        4.94,
        93,
        '2026-10-13T19:01:01.497366+00:00'::timestamptz,
        '2026-11-10T13:56:05.648206+00:00'::timestamptz
    ),
    (
        '9b5f6a39-0cf6-44e1-bc88-9971a21065e6',
        'EG1002 Single Seat Electric Go Kart',
        'The EG1002 Single Seat Electric Go Kart combines smooth electric performance, responsive handling, and all-terrain capability in a compact, rider-friendly design. Featuring a powerful 1000W brushless motor, adjustable speed modes, and independent suspension, it''s built for comfortable and exciting recreational riding across a variety of off-road environments.

Key Features:
• Powerful 1000W brushless electric motor
• Three selectable speed modes
• Detachable battery pack for convenient charging
• Quiet and efficient electric operation
• Four independent shock absorbers
• Adjustable leg clearance for improved comfort
• Gearbox shaft drive transmission
• Dual rear disc braking system
• Rugged all-terrain tyres
• Top speed: 40 ± 2 km/h
• Riding range: Up to 40 km (48V battery)
• Riding range: Up to 80 km (optional 60V lithium battery)
• Maximum load capacity: 160 kg (352 lbs)
• Ground clearance: 200 mm
• Battery options: 48V 20Ah lead-acid or optional 60V lithium
• Charging input: 80–240V AC, 50–60Hz, 7A
• Front tyres: 16 × 8-7
• Rear tyres: 16 × 8-7
• Overall dimensions: 1450 × 1010 × 1200 mm
• Available in Red, Blue, Orange, Yellow, and additional colours',
        400,
        500,
        'MMR-EG1002-SINGLE-SE',
        1000,
        ARRAY['/images/eg1002-single-seat-electric-go-kart.png']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        40,
        'Range: Up to 80 km',
        4.96,
        20,
        '2026-10-13T19:01:00.89707+00:00'::timestamptz,
        '2026-11-10T13:56:05.298106+00:00'::timestamptz
    ),
    (
        'd26a41e4-1e53-467e-b16e-623eb4c02c89',
        'GC2005 Two-Seater Racing Go Kart',
        'The GC2005 Racing Go Kart features a unique double-seater design equipped with dual steering wheels and twin speed and brake pedals for shared driving control. Powered by a strong 200cc 6.5HP 4-stroke engine featuring a smooth wet clutch system, this kart ensures safe handling with a sharp 1.5-meter braking distance. Built on a wide, stable chassis with comfortable ground clearance, it offers a thrilling tandem racing experience perfect for tracks and training.

Key Features:
• Double seaters for tandem riding
• Double steering wheels for shared driving control
• Double speed and brake pedals for dual instruction or operation
• Powerful 200cc 6.5HP 4-stroke engine with wet clutch system
• Pull-start ignition with optional electric start
• Top speed: 50–70 km/h
• Efficient rear caliper disc brake with 1.5m braking distance
• Durable chain-drive transmission
• High load capacity: Over 200 kg (440 lbs)
• Fuel tank capacity: 3.5 litres
• Stable track design with 50 mm ground clearance
• Front tyres: 10 × 4.5-5
• Rear tyres: 11 × 7.1-5
• Overall dimensions: 2020 × 1550 × 650 mm
• Net weight: 135 kg (Gross weight: 150 kg)
• Available in multiple colours (Black, Red, Blue, Orange)
• OEM customization available on mass orders
• Alternative power upgrade available in a 270cc model',
        1800,
        2250,
        'MMR-GC2005-TWO-SEATE',
        1000,
        ARRAY['/images/gc2005-two-seater-racing-go-kart.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        50,
        'Range: 65 KM',
        4.89,
        73,
        '2026-10-13T19:01:00.484181+00:00'::timestamptz,
        '2026-11-10T13:55:58.113272+00:00'::timestamptz
    ),
    (
        '6a26cd23-2bec-4533-951b-a9b4194341bd',
        'GC1101 110cc Off-Road Go Kart',
        'The GC1101 is a proven off-road go-kart designed for reliable recreational riding. Its 110cc 4-stroke engine, automatic transmission with reverse, electric start, disc brakes, and durable chain drive make it a practical choice for riders looking for dependable performance on private tracks, farms, trails, and open terrain.

Key Features:

* 110cc single-cylinder 4-stroke air-cooled engine
* One forward gear with reverse
* Electric start with 12V 5Ah battery
* Front and rear disc brakes
* Durable chain-drive transmission
* Load capacity of over 150 kg
* Ground clearance of 120 mm
* Top speed of over 40 km/h (25 mph)
* Riding range of up to 50 km (31 miles)
* Climbing capability of at least 15°
* Compact 6-inch wheel setup
* Proven factory design with over 5,000 units produced
* Stable and dependable construction
* Available in black, red, blue, orange, and other colours

Specifications:

* Model: GC1101
* Engine: 110cc, 4-stroke, air-cooled
* Transmission: 1 forward gear with reverse
* Starting system: Electric start
* Battery: 12V 5Ah
* Load capacity: >150 kg
* Ground clearance: 120 mm
* Fuel tank capacity: 6.2 litres
* Top speed: >40 km/h (25 mph)
* Riding range: Up to 50 km (31 miles)
* Climbing capacity: ≥15°
* Net weight: 93 kg (204.6 lbs)
* Gross weight: 118 kg (259.6 lbs)

Dimensions:

* Overall dimensions: 1680 × 1030 × 1180 mm
* Carton size: 161 × 82 × 52 cm per unit

Braking System:

* Front disc brakes
* Rear disc brakes

Drive System:

* Chain-drive transmission

Wheels & Tyres:

* Front: 145 × 70-6 (6-inch)
* Rear: 145 × 70-6 (6-inch)

Available Colours:

* Black
* Red
* Blue
* Orange
* Additional colours may be available

Ideal For:

* Recreational off-road riding
* Farms and private properties
* Trails and dirt tracks
* Outdoor family recreation
* Private tracks',
        400,
        500,
        'MMR-GC1101-110CC-OFF',
        5000,
        ARRAY['/images/gc1101-110cc-off-road-go-kart.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        70,
        'Range: 50 km',
        4.97,
        97,
        '2026-10-13T19:01:00.091525+00:00'::timestamptz,
        '2026-11-10T13:55:57.637648+00:00'::timestamptz
    ),
    (
        '0e8695f7-cddc-4ab0-b332-06aa813272e0',
        'EA5601 Pro 8KW Electric 4-Wheel Scooter',
        'The EA5601 Pro 8KW Electric 4-Wheel Scooter delivers exceptional power, outstanding traction, and all-terrain capability for riders who demand the very best. Equipped with four high-performance hub motors, a high-capacity lithium battery, and advanced suspension, it provides a smooth, stable, and confident ride across farms, estates, trails, and rugged outdoor terrain.

Key Features:
• Four independent 2000W brushless AC hub motors (8000W total output)
• Four-wheel drive (4WD) system
• 60V 50Ah lithium battery pack
• Top speed: Up to 55 km/h
• Riding range: Up to 80 km per charge
• Front double swing arm suspension
• Front and rear hydraulic disc brakes
• IP66-rated motor controller
• Forward and reverse drive
• Overload protection system
• Foldable design with detachable seat
• Full aluminium wheel rims
• Rear tow bar
• Rear storage toolbox
• Tubeless all-terrain tyres
• Maximum load capacity: 300 kg (660 lbs)
• Maximum climbing ability: 55°
• Ground clearance: 220 mm
• Charging input: 80–240V AC, 50–60Hz, 7A
• Front tyres: 230 × 70-10 Tubeless
• Rear tyres: 230 × 70-10 Tubeless
• Overall dimensions: 1750 × 1400 × 1403 mm
• Available in Red, Blue, Black, Yellow, and additional colours',
        450,
        563,
        'MMR-EA5601-PRO-8KW-E',
        500,
        ARRAY['/images/ea5601-pro-8kw-electric-4-wheel-scooter.png']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        55,
        'Range: 80 km',
        4.98,
        63,
        '2026-10-13T19:00:59.711229+00:00'::timestamptz,
        '2026-11-10T13:55:57.272283+00:00'::timestamptz
    ),
    (
        'a7339ad0-ac00-46f0-a8fc-1fac6b071414',
        'GC0901 Kids Off-Road Go Kart',
        'The GC0901 Go Kart is an economical, single-seat model specifically sized for kids. It is powered by a dependable 90cc 2.4HP 4-stroke engine equipped with a dry clutch system and a simple pull-start mechanism. Built with a sturdy chain-drive transmission and responsive rear caliper disc brakes, it ensures a controlled ride with a short 1.5-meter stopping distance. It is an affordable and durable option for young racers learning the ropes.

Key Features:
• Single-seater design perfectly sized for kids
• Dependable 90cc 2.4HP 4-stroke engine with dry clutch system
• Easy-to-use manual pull-start ignition
• Top speed: Over 45 km/h
• Efficient rear caliper disc brake with a 1.5m braking distance
• Durable chain-drive transmission
• Heavy-duty load capacity: Over 150 kg (330 lbs)
• Fuel tank capacity: 2 litres
• Reliable wheelbase of 1125 mm for stable handling
• Front tyres: 10 × 3.6-5 inch
• Rear tyres: 11 × 4.5-5 inch
• Overall dimensions: 1380 × 1080 × 390 mm
• Capable climbing ability: Greater than or equal to 10 degrees
• Available in multiple colours (Black, Red, Blue, Orange)
• Highly economical running and initial costs
• OEM customization available on mass orders',
        1300,
        1625,
        'MMR-GC0901-KIDS-OFF-',
        1000,
        ARRAY['/images/gc0901-kids-off-road-go-kart.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        45,
        'Range: 60 KM',
        4.91,
        25,
        '2026-10-13T19:00:59.327123+00:00'::timestamptz,
        '2026-11-10T13:55:58.553664+00:00'::timestamptz
    ),
    (
        'b1b379c4-dbfe-40bb-8891-c510e19312d9',
        'GC2009 Off-Road Go Kart',
        'The GC2009 Go Kart brings high performance to the track with a factory-latest design engineered for maximum durability. Powered by a reliable 168cc 6.5HP 4-stroke engine with a wet clutch system, it offers a thrilling yet secure ride thanks to an enforced vehicle frame and an updated rear caliper disc brake system. Built to handle heavy loads with a stable wheelbase, it is the perfect blend of strength, control, and off-road excitement.

Key Features:
• Enforced vehicle frame for enhanced durability
• Updated rear caliper disc brake system
• Factory latest aerodynamic chassis design
• Powerful 168cc 6.5HP 4-stroke engine with wet clutch system
• Pull-start ignition with optional electric start
• Top speed: 50–70 km/h
• Durable chain-drive transmission
• Heavy-duty load capacity: Over 200 kg (440 lbs)
• Fuel tank capacity: 7 litres
• Compact track design with 40 mm ground clearance
• Front tyres: 10 × 4.5-5
• Rear tyres: 11 × 7.1-5
• Wheelbase: 1040 mm
• Overall dimensions: 1820 × 1060 × 600 mm
• Net weight: 156 kg (Gross weight: 175 kg)
• Available in multiple colours (Black, Red, Blue, Orange)
• OEM customization available on mass orders
• Power upgrades available on 200cc and 270cc models',
        1500,
        1875,
        'MMR-GC2009-OFF-ROAD-',
        1000,
        ARRAY['/images/GC2009 Off-Road Go Kart - $1200.webp', '/images/gc2009-off-road-go-kart.webp', '/images/GC2009 Off-Road Go Kart 2 - $1200.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        50,
        'Range: 45 KM',
        4.87,
        76,
        '2026-10-13T19:00:58.897982+00:00'::timestamptz,
        '2026-11-10T13:56:08.452727+00:00'::timestamptz
    ),
    (
        'f20e8d65-ae61-4bc5-ab55-26a5e5992eda',
        '200cc 4-Seater Off-Road Go Kart',
        'The 200cc 4-Seater Off-Road Go Kart is designed for adults and combines a powerful GY6 engine, automatic clutch, independent suspension, and a large 15-liter fuel tank for comfortable and reliable off-road driving.

Key Features:
• Much larger size for adult
• 200CC GY6 Engine, Auto Clutch
• 4 Independent Shock Suspensions
• Big 15 Liter Fuel Tank
• Adjustable Seat Clearance
• Full aluminum wheel-rim
• 4-seat capacity
• Front & rear hydraulic disc brake
• Rear drive axle with integrated bridge differential
• Minimum ground clearance: 180mm
• Load capacity: ≥ 300Kkg/660Lbs
• Climbing capacity: Over 15 degrees
• Front wheel size: 23×7-10
• Rear wheel size: 22×10-10
• 12-inch wheels optional
• Color available: Red, Blue, Orange, Yellow,Green etc.',
        650,
        813,
        'MMR-200CC-4-SEATER-O',
        1000,
        ARRAY['/images/200cc 4-Seater Off-Road Go Kart 1 - $550.webp', '/images/200cc-4-seater-off-road-go-kart.webp', '/images/200cc 4-Seater Off-Road Go Kart 3 - $550.webp.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        70,
        'Range: 120 KM',
        4.88,
        63,
        '2026-10-13T19:00:58.480665+00:00'::timestamptz,
        '2026-11-10T13:55:56.572986+00:00'::timestamptz
    ),
    (
        '86ec3a05-2ce7-414a-9e5a-88a7ff53636c',
        'X26 3000W Electric Dirt Bike',
        'The X26 3000W Electric Dirt Bike is designed for riders seeking powerful electric performance, responsive handling, and all-terrain capability. Equipped with a 3000W motor and a 48V 20Ah lithium battery, this electric dirt bike delivers a top speed of 45–55 km/h, making it suitable for recreational off-road riding and exploring rugged trails.

Built around a compact 14-inch fat-tire design, the X26 combines traction, stability, and maneuverability for varied riding conditions. Its hydraulic front suspension helps absorb impacts from uneven terrain, while the adjustable oil-hydraulic nitrogen rear shock absorber provides additional support and ride comfort.

A chain-drive drivetrain transfers motor power to the rear wheel, while the 200 kg maximum load capacity accommodates the rider and additional gear within the specified limit. The lithium battery is designed for convenient recharging, with a stated charging time of approximately 3–4 hours from 0% to 100%.

With a claimed range of 70–100 km per charge and electric power delivery, the X26 offers a practical option for riders looking for a capable, rechargeable off-road bike.',
        400,
        500,
        'MMR-X26-3000W-ELECTR',
        1000,
        ARRAY['/images/b3 $ 400.webp', '/images/X26-3000w-electric-dirt-bike.webp']::text[],
        '{}'::text[],
        'dirtBikes',
        'Midget Micro Drive & Rides',
        true,
        false,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        55,
        'Range: 70–100 km',
        4.93,
        20,
        '2026-10-13T19:00:58.086968+00:00'::timestamptz,
        '2026-11-10T13:55:56.027296+00:00'::timestamptz
    ),
    (
        '634f8a5e-08e3-4025-ad38-c30c28c4528f',
        'EH-5000 72V 5000W Electric Go Kart',
        'The EH-5000 Electric Go Kart delivers powerful acceleration, responsive handling, and dependable performance for recreational karting. Built with a robust 5000W electric motor, heavy-duty steel frame, and hydraulic disc brakes, it offers an exciting and reliable driving experience on private tracks and off-road terrain.

Key Features:
• High-performance 5000W permanent magnet synchronous motor
• 72V lead-acid battery system
• Peak power output up to 18 kW
• Top speed up to 65 km/h
• Four-wheel hydraulic disc braking system
• Durable chain-drive transmission
• Heavy-duty 4130 chromoly steel frame
• Precision TIG and MIG welded chassis
• Three-spoke sport steering wheel
• Comfortable high-back seat
• Maximum load capacity: 200 kg
• Heavy-duty 13 × 6.5-6 tyres
• Designed for recreational electric karting',
        400,
        500,
        'MMR-EH-5000-72V-5000',
        1000,
        ARRAY['/images/eh-5000-72v-5000w-electric-go-kart.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        false,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        60,
        'Range: Up to 85 KM',
        4.86,
        27,
        '2026-10-13T19:00:57.681066+00:00'::timestamptz,
        '2026-11-10T13:55:55.29825+00:00'::timestamptz
    ),
    (
        'a66c14cc-957e-41ab-802c-0a6e8a3819bf',
        '200cc Off-Road Go Kart',
        'The 200cc Off-Road Go Kart combines dependable power, rugged durability, and responsive handling for exciting off-road adventures. Equipped with a reliable 200cc oil-cooled engine, heavy-duty suspension, and hydraulic braking, it''s built to confidently tackle dirt tracks, trails, farms, and challenging terrain.

Key Features:
• Powerful 200cc single-cylinder 4-stroke oil-cooled engine
• 6.5 HP power output
• Pull-start ignition system
• High ground clearance for superior off-road capability
• Four heavy-duty shock absorbers
• Rear hydraulic disc brake
• Durable chain-drive transmission
• Rugged all-terrain tyres
• Maximum load capacity: 150 kg (330 lbs)
• Maximum climbing ability: 25°
• Ground clearance: 245 mm
• Fuel tank capacity: 6.5 litres
• Front & rear tyres: 16 × 7-8
• Wheelbase: 1020 mm
• Overall dimensions: 1420 × 1030 × 760 mm
• Single-seat off-road design',
        400,
        500,
        'MMR-200CC-OFF-ROAD-G',
        500,
        ARRAY['/images/200cc-off-road-go-kart.png']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        65,
        'Range: 75 Km',
        4.93,
        50,
        '2026-10-13T19:00:57.277004+00:00'::timestamptz,
        '2026-11-10T13:55:54.728526+00:00'::timestamptz
    ),
    (
        'd302149a-4381-4e1a-80bb-4d89fa3181cd',
        'Cross Cart 212cc Go Kart',
        'The Cross Cart 212cc Go Kart delivers dependable power, rugged durability, and responsive handling for exciting off-road adventures. Featuring a reliable 212cc OHV engine, Forward-Neutral-Reverse gearbox, independent suspension, and hydraulic braking, it''s built to tackle dirt tracks, trails, farms, and challenging terrain with confidence.

Key Features:
• Powerful 212cc OHV single-cylinder 4-stroke oil-cooled engine
• Forward-Neutral-Reverse (F-N-R) gearbox
• Pull-start ignition
• Top speed: Over 60 km/h
• Four independent shock absorbers
• Adjustable leg clearance for improved rider comfort
• Rear hydraulic disc brake
• Durable chain-drive transmission
• Rugged all-terrain tyres
• Maximum load capacity: 200 kg
• Maximum climbing ability: 35°
• Ground clearance: 200 mm
• Fuel tank capacity: 6.5 litres
• Front tyres: 16 × 8-7
• Rear tyres: 16 × 8-7
• Wheelbase: 1200 mm
• Overall dimensions: 1450 × 1010 × 1200 mm
• Single-seat off-road design',
        350,
        438,
        'MMR-CROSS-CART-212CC',
        300,
        ARRAY['/images/cross-cart-212cc-go-kart.png']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        60,
        'Range: 75 km',
        4.95,
        48,
        '2026-10-13T19:00:56.876128+00:00'::timestamptz,
        '2026-11-10T13:55:56.923214+00:00'::timestamptz
    ),
    (
        'aba4cf92-ffbd-485b-8d2e-2406fa4077a9',
        '3KW Electric Go Kart',
        'The 3KW Electric Go Kart delivers exhilarating acceleration, long-range performance, and outstanding off-road capability. Powered by a 3000W brushless motor and a high-capacity 72V lithium battery, it''s engineered for riders who want speed, control, and confidence across trails, tracks, and challenging terrain.

Key Features:
• Powerful 3000W brushless electric motor
• 72V 35Ah lithium battery
• Top speed: Up to 75 km/h
• Riding range: Up to 65 km per charge
• Three selectable speed modes
• Forward and reverse drive
• Smooth thumb throttle control
• Front double swing arm suspension
• Four independent shock absorbers
• High-efficiency gearbox shaft drive
• Dual rear disc brakes
• Large AT19 × 7-8 all-terrain tyres
• Maximum load capacity: 200 kg (440 lbs)
• Maximum climbing ability: 25°
• Ground clearance: 230 mm
• Charging time: 4–6 hours
• Overall dimensions: 1500 × 1050 × 800 mm
• Available in White, Black, Red, Pink, Yellow, Orange, and additional colours',
        530,
        663,
        'MMR-3KW-ELECTRIC-GO-',
        350,
        ARRAY['/images/3kw-electric-go-kart.png']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        75,
        'Range: 65 km',
        4.96,
        55,
        '2026-10-13T19:00:56.461091+00:00'::timestamptz,
        '2026-11-10T13:56:18.952423+00:00'::timestamptz
    ),
    (
        'a411ff8f-9ef6-4365-bb5e-48f3f2c50e2e',
        'EA5601 4×4 Electric All-Terrain Vehicle (ATV)',
        'The EA5601 4×4 Electric ATV combines exceptional power, advanced traction, and rugged durability for demanding off-road adventures. Equipped with four independent brushless hub motors, a high-capacity lithium battery, and hydraulic disc brakes, it delivers confident performance across farms, trails, estates, and challenging outdoor terrain.

Key Features:
• Four independent 1400W brushless AC hub motors (5600W total output)
• Four-wheel drive (4WD) system
• 60V 50Ah lithium battery pack
• Top speed: Up to 55 km/h
• Riding range: Up to 80 km per charge
• Front double swing arm suspension
• Front and rear hydraulic disc brakes
• IP66-rated motor controller
• Forward and reverse drive
• Overload protection system
• Foldable design with detachable seat
• Full aluminium wheel rims
• Rear tow bar
• Rear storage toolbox
• Tubeless all-terrain tyres
• Maximum load capacity: 300 kg (660 lbs)
• Maximum climbing ability: 55°
• Ground clearance: 220 mm
• Charging input: 80–240V AC, 50–60Hz, 7A
• Front tyres: 230 × 70-10 Tubeless
• Rear tyres: 230 × 70-10 Tubeless
• Overall dimensions: 1750 × 1400 × 1403 mm
• Available in Red, Blue, Black, Yellow, and additional colours',
        400,
        500,
        'MMR-EA5601-4X4-ELECT',
        300,
        ARRAY['/images/ea5601-4x4-electric-all-terrain-vehicle-atv.png']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        55,
        'Range: 80 km',
        4.99,
        35,
        '2026-10-13T19:00:56.051961+00:00'::timestamptz,
        '2026-11-10T13:55:54.283247+00:00'::timestamptz
    ),
    (
        '085a260d-4a18-480c-844a-fe862476ed3a',
        'GC2010 200cc Off-Road Sand Buggy Go Kart',
        'The GC2010 200cc Off-Road Sand Buggy Go Kart is engineered for riders who demand power, comfort, and dependable off-road performance. Equipped with a reliable 200cc single-cylinder 4-stroke air-cooled engine, this buggy delivers smooth acceleration and excellent durability for recreational riding across dirt tracks, trails, farms, and open terrain.

Designed with rider comfort in mind, the GC2010 features a spacious single-seat layout with a semi-covered leather seat, adjustable seating position, and adjustable steering wheel. Four independent shock absorbers provide excellent ride quality over rough surfaces, while front and rear hydraulic disc brakes deliver confident stopping power in challenging conditions.

A chain-driven automatic transmission and electric start make operation simple and reliable, while the large 12-inch wheels provide outstanding grip and stability. With a tight 3.2-metre turning radius, 192 mm of ground clearance, and a climbing capability of up to 25 degrees, the GC2010 is ready for demanding off-road adventures.

Built for durability, control, and all-day riding enjoyment, the GC2010 offers an excellent combination of performance, safety, and practicality for recreational off-road enthusiasts.',
        350,
        438,
        'MMR-GC2010-200CC-OFF',
        1000,
        ARRAY['/images/gc2010-200cc-off-road-sand-buggy-go-kart.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        false,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        60,
        'Range: Up to 100 km',
        4.93,
        105,
        '2026-10-13T19:00:55.651168+00:00'::timestamptz,
        '2026-11-10T13:56:03.363289+00:00'::timestamptz
    ),
    (
        '214aa791-1e78-4638-8889-f0465ace9d78',
        'GC2701 270cc Off-Road Go Kart',
        'The GC2701 270cc Off-Road Go Kart is designed for riders seeking reliable performance, responsive handling, and all-terrain capability. Built with a durable 4-stroke engine, independent suspension, and a rugged chassis, it delivers a comfortable and exciting driving experience on dirt tracks, trails, farms, and private property.

Key Features:
• Available with 168cc, 198cc, or 270cc engine options
• Reliable single-cylinder 4-stroke oil-cooled engine
• Pull-start system with optional electric start
• Durable chain-drive transmission
• Four independent shock absorbers
• Rear single disc brake
• Rugged 7-inch off-road tyres
• Fuel tank capacity: 5.0 litres
• Maximum load capacity: 110 kg (242 lbs)
• Minimum ground clearance: 190 mm
• Wheelbase: 1250 mm
• Overall dimensions: 2015 × 950 × 760 mm
• Single-seat design
• Built for recreational off-road riding',
        350,
        438,
        'MMR-GC2701-270CC-OFF',
        1000,
        ARRAY['/images/gc2701-270cc-off-road-go-kart.png']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        60,
        'Range: 75 KM',
        4.95,
        41,
        '2026-10-13T19:00:55.253914+00:00'::timestamptz,
        '2026-11-10T13:55:53.193136+00:00'::timestamptz
    ),
    (
        'c542cf85-f5c4-43cb-91de-c61c559a30b4',
        'M1 2X2 Dual Motor Electric Scooter',
        'The M1 2X2 Dual Motor Electric Scooter delivers exceptional power, stability, and comfort for riders who demand more from their electric scooter. Featuring dual 800W hub motors, advanced suspension, and a rugged aluminium frame, it''s built for high-performance commuting, off-road exploration, and recreational riding.

Key Features:
• Dual 800W brushless hub motors (1600W total output)
• Four-wheel traction through front and rear motor drive
• Top speed up to 65 km/h
• Riding range up to 60 km per charge
• 48V 18Ah lithium battery
• Fast 4–6 hour charging time
• Maximum climbing ability: 40°
• Maximum load capacity: 150 kg
• Aviation-grade aluminium frame
• Quick 5-second folding mechanism
• Front and rear suspension
• Front and rear disc brakes
• Smart LCD display
• Front and rear LED lights
• 11-inch tubeless off-road tyres
• Wheelbase: 950 mm
• Overall dimensions: 1160 × 260 × 1110 mm
• Optional accessories include detachable seat, rear cargo rack, storage bag, mobile phone holder, flashing deck, hydraulic brakes, front bar lock, and bell.',
        300,
        375,
        'MMR-M1-2X2-DUAL-MOTO',
        1000,
        ARRAY['/images/m1-2x2-dual-motor-electric-scooter.png']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        65,
        'Range: 60 km',
        4.89,
        64,
        '2026-10-13T19:00:54.840027+00:00'::timestamptz,
        '2026-11-10T13:55:53.918917+00:00'::timestamptz
    ),
    (
        '9ea56b3a-303d-4d7b-8481-6f387068cf12',
        'ES2510 400W Foldable Electric Scooter',
        'The ES2510 400W Foldable Electric Scooter combines smooth electric performance, rider comfort, and everyday practicality in a lightweight, portable design. Featuring a 400W brushless motor, front and rear suspension, and a convenient folding frame, it''s an ideal choice for commuting, campus travel, and leisure rides.

Key Features:
• Powerful 400W brushless hub motor
• 36V 10Ah lithium battery
• Top speed: 25–35 km/h
• Riding range: Up to 40 km per charge
• Lightweight and portable folding design
• Foldable handlebars for easy storage and transport
• Front and rear suspension
• Adjustable seat height
• Front LED headlight
• Front and rear disc brakes
• Rear hub motor drive
• 10-inch inflatable tyres
• Maximum load capacity: 150 kg
• Maximum climbing ability: 15°
• Charging time: 4–6 hours
• Overall dimensions: 1100 × 560 × 1200 mm
• Folded dimensions: 1000 × 250 × 300 mm
• Wheelbase: 850 mm
• Available in White, Black, and Grey',
        320,
        400,
        'MMR-ES2510-400W-FOLD',
        1000,
        ARRAY['/images/es2510-400w-foldable-electric-scooter.png']::text[],
        '{}'::text[],
        'Micro-Cars',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        35,
        'Range: 40 km',
        4.85,
        111,
        '2026-10-13T19:00:54.448048+00:00'::timestamptz,
        '2026-11-10T13:56:02.933333+00:00'::timestamptz
    ),
    (
        '32a99865-16f2-4cd4-8d00-73601cd94983',
        '125cc Dirt Bike',
        'Built around a 125cc engine with a maximum speed of 40–60 km/h, this lightweight dirt bike combines compact dimensions with practical off-road performance. With an overall weight of 65 kg and maximum engine power of 5.6 kW, it is designed for riders looking for a compact and agile motorcycle.

* 125cc displacement
* Maximum speed of 40–60 km/h
* Maximum engine power of 5.6 kW
* Lightweight 65 kg overall weight
* Overall dimensions of 1600 × 750 × 990 mm
* New condition
* Manufactured in China',
        400,
        500,
        'MMR-125CC-DIRT-BIKE',
        1000,
        ARRAY['/images/b2 - $400.webp', '/images/125cc-dirt-bike.webp']::text[],
        '{}'::text[],
        'dirtBikes',
        'Midget Micro Drive & Rides',
        true,
        true,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        60,
        'Range: 90 KM',
        4.97,
        34,
        '2026-10-13T19:00:54.049331+00:00'::timestamptz,
        '2026-11-10T13:56:18.952423+00:00'::timestamptz
    ),
    (
        '8d78b869-c598-46c8-ab62-06cefd98cc05',
        '60V Electric Dirt Bike',
        'The 60V Electric Dirt Bike combines a lightweight aluminum frame with large 19-inch front and 17-inch rear tires for stability and handling across off-road terrain.

* 60V electric motorcycle
* Maximum speed: >80 km/h
* Aluminum frame construction
* Front 19-inch and rear 17-inch aluminum tires
* Front hydraulic shock absorption
* Rear spring suspension
* Front and rear disc brakes
* Hydraulic disc brakes for responsive stopping power
* Maximum load capacity: 200 kg
* LCD speed meter and power indicator
* LED headlight, brake light, and front/rear turn signals
* Normal start function
* Single seat
* Price listed without battery

Motorcycle Type: Electric Motorcycle
Voltage: 60V
Place of Origin: Zhejiang
Dashboard: LCD speed meter and power indicator
Tire: Front 19-inch + Rear 17-inch aluminum tires
Light: LED headlight + Brake light + Front and rear turning light
Suspension: Front hydraulic shock absorption / Rear spring
Start function: Normal start
Seat: Single seat
Brakes: Front and Rear Disc Brake
Max load: 200 kg',
        400,
        500,
        'MMR-60V-ELECTRIC-DIR',
        2000,
        ARRAY['/images/b1-$250.webp', '/images/60v-electric-dirt-bike.webp']::text[],
        '{}'::text[],
        'dirtBikes',
        'Midget Micro Drive & Rides',
        true,
        false,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        45,
        'Range: 55 KM',
        4.88,
        112,
        '2026-10-13T19:00:53.643847+00:00'::timestamptz,
        '2026-11-10T13:56:18.952423+00:00'::timestamptz
    ),
    (
        '0e6b14b8-7a22-4510-9624-2f5b34ae7762',
        '6000W Electric Dirt Bike',
        'Built around a powerful 6000W mid-drive motor, this electric dirt bike delivers strong acceleration, high-speed performance, and substantial climbing capability. Its 60V 50Ah battery provides up to 110 miles of stated range, while the 19-inch front and 16-inch rear tires provide a versatile setup for adult riders.

* 6000W peak mid-drive motor
* 300Nm maximum torque
* 65 MPH top speed
* 60V 50Ah battery
* 3000Wh battery capacity
* Up to 110 miles stated range
* Triple-mode drive
* Front 19" × 2.8" tire
* Rear 16" × 3.5" tire
* Twist throttle
* Available in one size: 19" / 16"
* Suitable for riders from 5''1" to 6''5"
* Weight: 238 lbs',
        700,
        875,
        'MMR-6000W-ELECTRIC-D',
        2000,
        ARRAY['/images/b5 - $280.webp', '/images/6000w-electric-dirt-bike.webp']::text[],
        '{}'::text[],
        'dirtBikes',
        'Midget Micro Drive & Rides',
        true,
        false,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        65,
        'Range: Up to 110 miles',
        4.88,
        62,
        '2026-10-13T19:00:53.241102+00:00'::timestamptz,
        '2026-11-10T13:55:51.312883+00:00'::timestamptz
    ),
    (
        'c7bc8092-bd1e-4044-bab8-996aa6bc4211',
        '60V 5000W High-Speed Electric Drift Kart',
        'The 60V 5000W High-Speed Electric Drift Kart is built for riders who want serious speed, long-range electric performance, and responsive drift control. Its high-carbon steel frame, CATL LiFePO4 battery, and powerful mid-mounted motor make it ready for demanding indoor and outdoor track riding.

- 5000W peak power electric drift system
- 2500W rated motor power
- Mid-mounted permanent-magnet DC motor
- 60V 30Ah CATL LiFePO4 battery
- Up to 70 km/h top speed
- Up to 60 km riding range
- 6–7 hour charging time
- FarDriver controller
- High-carbon steel frame
- Three-piston caliper braking system
- Front and rear three-piston disc brakes
- Ultra wear-resistant rubber tyres
- Maximum load capacity of 200 kg
- Net weight of 93.3 kg
- Designed for indoor and outdoor track riding
- Available in Red, Black, White, Blue, and Purple
- CE certified
- Complete vehicle
- Customized configuration available',
        350,
        438,
        'MMR-60V-5000W-HIGH-S',
        1000,
        ARRAY['/images/60v-5000w-high-speed-electric-drift-kart.webp', '/images/mm1.webp', '/images/mm2.webp']::text[],
        '{}'::text[],
        'Trikes',
        'Midget Micro Drive & Rides',
        true,
        false,
        true,
        '2-4 business days (US Texas Depot)',
        'Shenzhen Technology & Electric Mobility Hub, China',
        70,
        'Range: 60 km',
        4.85,
        52,
        '2026-10-13T19:00:52.767816+00:00'::timestamptz,
        '2026-11-10T13:55:49.248765+00:00'::timestamptz
    )
ON CONFLICT (sku) DO UPDATE SET
    id = EXCLUDED.id,
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    original_price = EXCLUDED.original_price,
    stock = EXCLUDED.stock,
    images = EXCLUDED.images,
    videos = EXCLUDED.videos,
    category = EXCLUDED.category,
    brand = EXCLUDED.brand,
    is_active = EXCLUDED.is_active,
    is_new = EXCLUDED.is_new,
    shipping_required = EXCLUDED.shipping_required,
    average_delivery_time = EXCLUDED.average_delivery_time,
    store_location = EXCLUDED.store_location,
    weight = EXCLUDED.weight,
    dimensions = EXCLUDED.dimensions,
    rating = EXCLUDED.rating,
    reviews = EXCLUDED.reviews,
    updated_at = NOW();

DO $$
BEGIN
    RAISE NOTICE 'Successfully seeded 55 live products from https://midgetdriftcarsandebikes.shop!';
END $$;
