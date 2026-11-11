import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import pg from 'pg'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const { Client } = pg
const SOURCE_MEDIA_ORIGIN = 'https://midgetdriftcarsandebikes.shop'

// Complete up-to-date product listing (55 products) from https://midgetdriftcarsandebikes.shop
export const CURRENT_PRODUCTS = [
  {
    "id": "8c41bbe1-2bdf-4952-89dc-c67326288251",
    "name": "JW1502 4-Seat Adult Off-Road Kart – Family Size Go-Kart",
    "description": "\nBuilt for massive family off-road adventures, the JW1502 is a heavily oversized 4-seat adult utility kart designed to carry 4 riders across rugged terrain with ease.\n\nPowered by a high-torque 200cc GY6 4-stroke air-cooled engine with fully automatic clutch, it delivers effortless power through an advanced rear drive axle with integrated bridge differential.\n\nKey Highlights:\n\n4-Seat Configuration – Spacious adult-size seating for driver + 3 passengers\nEngine: 200cc GY6 single-cylinder 4-stroke, air-cooled, automatic\nTop Speed: 70 km/h\nRange: 70 km per tank\nFuel Tank: 15L long-range tank\nBrakes: Front & rear hydraulic disc brakes\nSuspension: 4x independent shock suspensions for rough terrain\nGround Clearance: 180mm + 15°+ climbing capacity\nLoad Capacity: Over 300 kg (660 lbs)\nTires: Heavy-tread off-road – Front 23×7-10, Rear 22×10-10, aluminum rims\nDimensions: 2350 × 1450 × 1460 mm\nColors: Red, Black, White, Blue, Purple, Green\nSkill Level: Intermediate\nCondition: Brand New – In Stock\nA heavy-duty, stable, and highly capable off-road ride that combines maximum passenger capacity with smooth control.",
    "price": 950,
    "original_price": 1000,
    "sku": "MMR-1070",
    "stock": 2900,
    "images": [
      "/images/prod_1793737099460_886577456_1929621351747325_6410364728832386594_n.webp",
      "/images/prod_1793737076816_880351903_1045984678527924_3419632813795135202_n.webp",
      "/images/prod_1793737111965_884732388_1160931663148672_5997856890774842320_n.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "29-39 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-03T20:18:51.584397+00:00",
    "updated_at": "2026-11-10T13:56:07.698004+00:00"
  },
  {
    "id": "ed56c705-0370-409e-b59a-6d03a0b3cbe3",
    "name": "BKDG35- 125cc Dirt Bike",
    "description": "Powered by a 125cc engine, this lightweight off-road bike delivers a top speed of 40-60 km/h, blending a compact build with solid trail capability. Tipping the scales at just 65 kg and producing 5.6 kW of peak power, it's built for riders who want an agile, easy-to-handle machine.\n\nSpecs:\n\n125cc engine\nTop speed: 40–60 km/h\nPeak power: 5.6 kW\nWeight: 65 kg\nDimensions: 1600 x 750 x 990 mm\nCondition: Brand New\nOrigin: Made in China",
    "price": 450,
    "original_price": 550,
    "sku": "MMR-3757",
    "stock": 967,
    "images": [
      "/images/prod_1793732667683_879638786_2248836466035052_1303313473377013885_n.webp",
      "/images/prod_1793732709399_884349664_1370493511631422_2898659355809811886_n.webp",
      "/images/prod_1793732728706_884455161_4603601663241409_3033630037199873865_n.webp",
      "/images/prod_1793732746421_886476525_1021664074284855_477357320236823975_n.webp",
      "/images/prod_1793732770969_888101687_1276289491330891_5047534280241037923_n.webp"
    ],
    "videos": [],
    "category": "dirtBikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "29-39 business days (Nanshan, Shenzhen, Guangdong Province, China Warehouse)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-03T19:07:30.297116+00:00",
    "updated_at": "2026-11-10T13:56:04.91747+00:00"
  },
  {
    "id": "b6b7d0a4-0779-4b5a-af56-a436bbaf841e",
    "name": "micro Porsche Go-Kart Is Pure, Unlimited Fun",
    "description": " Premium vibe for your MIDGET MICRODRIVES brand:\n\nShort & viral (for TikTok / Reels):\n\nPure Fun, Mini Porsche Edition\nSmall Kart. Big Grin.\nThis Mini Porsche Doesn't Play Nice\nUnfiltered Fun in Mini Porsche Form\nPocket-Sized Porsche, Full-Send Fun\nPremium / Ad copy:\n6. The Mini Porsche Go-Kart Built For Pure Adrenaline\n7. Small Scale. Full Throttle. Pure Fun.\n8. Meet The Mini Porsche That Rewrites Fun\n9. Not A Toy. It's Pure, Unfiltered Porsche Fun - Miniaturized\n10. The Mini Porsche Go-Kart That Feels Too Fun To Be Legal\n\nWith MIDGET MICRODRIVES angle:\n11. MIDGET MICRODRIVES: Pure, Unfiltered Fun. Mini Porsche Approved.\n12. Pure Porsche Fun, Shrunk To Perfect Size\n13. This Isn't A Mini Go-Kart. It's Unfiltered Joy On Wheels.",
    "price": 750,
    "original_price": 850,
    "sku": "MMR-4005",
    "stock": 5780,
    "images": [
      "/images/prod_1793713230768_879375193_4380359228881411_2680515772863278963_n.webp",
      "/images/prod_1793713268678_886520170_4698303330399289_8440611912197974984_n.webp",
      "/images/prod_1793713283260_888033386_2513005489207954_527265973326789750_n.webp",
      "/images/prod_1793713297260_885670062_3440567349436257_2801491055186895436_n.webp",
      "/images/prod_1793713311279_884822599_2605283919941118_4704706393162341550_n.webp",
      "/images/prod_1793713321616_881933260_889854187473665_2261958795252111869_n.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "29-39 business days",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-03T13:43:18.293292+00:00",
    "updated_at": "2026-11-10T13:56:02.583087+00:00"
  },
  {
    "id": "5fd47266-c58f-4a83-8806-0867305152ee",
    "name": "F40 Adult Electric Go Kart with Lithium Battery Customizable Exterior & Wheel Hub 80KM/H for Off-Road Racing",
    "description": "High-speed electric go kart for adults The F40 Adult Electric Go Kart delivers a thrilling ride with a top speed of 80km/h, powered by a 2500W mid-mounted high-torque motor for strong performance on off-road tracks.\nLithium battery with 72V power system Equipped with a 72V lithium battery, this go kart ensures long-lasting power and efficient energy use, supporting high-speed operation and reliable performance during extended racing sessions.\nShaft drive with gear drive technology Featuring a shaft drive and gear drive system, the F40 provides smooth, durable power transmission with minimal maintenance, ideal for demanding off-road racing environments.\nAdvanced hydraulic braking system The hydraulic brake system ensures precise and responsive stopping power, enhancing safety and control at high speeds, especially during aggressive cornering or sudden deceleration.\nCustomizable exterior and logo options With customized color and custom logo acceptance, the F40 allows users to personalize the look of their go kart, making it unique for racing events or personal branding.\nRobust build for heavy-duty use Built with a sturdy frame, the F40 weighs 280KG and supports a maximum load of 200kg, making it suitable for adult and teen users seeking a durable, high-performance electric kart.\nCompact packaging for easy shipping Packed in a wood box with dimensions of 150 x 150 x 150 cm and a package weight of 30.000 kg, the go kart is securely shipped from China Mainland for reliable delivery.\n\nSpecifications\nHigh-concerned chemical\nnone\nOrigin\nMainland China\nPackaging\nwood box\nBrand Name\ninsostar\nModel Number\n911\nType\nElectric Go Karts\nEngine\n2500W mid-mounted high-torque motor\nDrive Mode\ngear drive\nWheel Size\n8inch\nOil Tank Capacity\nNo\nEngine Capacity\nOther\nWeight\n280KG\nFuel\nElectric\nmax load\n200kg\nApplication\nOutdoor, RACING, Sports, Amusement Park, Entertainment\nPower\n2500W\nMax Speed\n80kmh\nEngine Type\nElectric\nSuitable Person\nAdult, Teen\nBraking System\nHydraulic Brake\nDrive Type\nShaft Drive\nProduct name\nF40 Adult Electric Go Kart with Lithium Battery\nStyle\nPlastic Vehicle Toys\nFunction\nFancy\nSize\n2600*1100*800mm\nColor\nCustomized Color\nLogo\nCustom Logo Accept\nBattery\n72V\nG.W & N.W\n290kgs\nAge\n14Years +\nUsage\nIndoor Play Car\n\n",
    "price": 750,
    "original_price": 850,
    "sku": "MMR-7089",
    "stock": 2960,
    "images": [
      "/images/prod_1793711401875_S4a70d6c1c7a343fd910c99c7fdc3c545f.jpg_960x960q75.jpg_.avif",
      "/images/prod_1793711401876_S903f773db36244d685c7ce3491856b0ai.jpg_960x960q75.jpg_.avif",
      "/images/prod_1793711401876_S903f773db36244d685c7ce3491856b0ai.jpg_960x960q75.jpg___1_.avif",
      "/images/prod_1793711401876_S996ad4cb760d4dad9929a88fd91913e3M.jpg_960x960q75.jpg_.avif",
      "/images/prod_1793711401878_Sa816d6c2be8b47a1a1dd9cab408d6174L.jpg_960x960q75.jpg_.avif",
      "/images/prod_1793711401878_Sb3d59c08d6fc468091e590aeb85db4e99.jpg_960x960q75.jpg_.avif"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "29-39 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-03T13:09:35.100183+00:00",
    "updated_at": "2026-11-10T13:56:01.882772+00:00"
  },
  {
    "id": "054f3f65-5503-464f-b3d6-dc99e4a23edd",
    "name": "RE49-60V Electric Dirt Bike",
    "description": "The 60V Electric Dirt Bike combines a lightweight aluminum frame with large 19-inch front and 17-inch rear tires for stability and handling across off-road terrain.\n\n60V electric motorcycle\nMaximum speed: >80 km/h\nAluminum frame construction\nFront 19-inch and rear 17-inch aluminum tires\nFront hydraulic shock absorption\nRear spring suspension\nFront and rear disc brakes\nHydraulic disc brakes for responsive stopping power\nMaximum load capacity: 200 kg\nLCD speed meter and power indicator\nLED headlight, brake light, and front/rear turn signals\nNormal start function\nSingle seat\nPrice listed without battery\nMotorcycle Type: Electric Motorcycle\nVoltage: 60V\nPlace of Origin: Zhejiang\nDashboard: LCD speed meter and power indicator\nTire: Front 19-inch + Rear 17-inch aluminum tires\nLight: LED headlight + Brake light + Front and rear turning light\nSuspension: Front hydraulic shock absorption / Rear spring\nStart function: Normal start\nSeat: Single seat\nBrakes: Front and Rear Disc Brake\nMax load: 200 kg\n\n",
    "price": 450,
    "original_price": null,
    "sku": "MMR-4174",
    "stock": 4120,
    "images": [
      "/images/prod_1793655999233_883961451_1353859123431811_8423157313489684358_n.webp",
      "/images/prod_1793732960629_F11.webp",
      "/images/prod_1793732977953_F1.webp",
      "/images/prod_1793732990301_F1111.webp"
    ],
    "videos": [],
    "category": "dirtBikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "29-39 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-02T21:47:52.769757+00:00",
    "updated_at": "2026-11-10T13:56:18.952423+00:00"
  },
  {
    "id": "38a235d3-2f6c-4180-9987-200d6ed3983a",
    "name": "AGGD54- JW3001 300cc 4x4 Mini Jeep",
    "description": "The JW3001 4x4 is an adult-sized, open-air mini Jeep\ndesigned for recreational off-road use. Manufacturer-published\nspecifications describe a 300cc, water-cooled, single-cylinder,\nfour-stroke petrol engine, automatic CVT transmission, 25-litre fuel\ntank, hydraulic disc brakes, and 270mm minimum ground clearance.\n\nIts rugged utility design includes four wheels, 12-inch wheels, front\nand rear suspension, and a stated load capacity of at least 450kg. The\nmanufacturer’s standard specification lists seating for four people.\nSome promotional imagery supplied for this listing describes it as a\nfive-seat vehicle, so confirm the exact configuration of the unit being\nsold before publishing the passenger capacity.\n\nModel: JW3001 4x4\nEngine: 300cc, water-cooled, single-cylinder, four-stroke\nFuel: Petrol / gasoline (manufacturer documentation specifies 92# or\nabove)\n\nTransmission: Automatic continuously variable transmission (CVT)\nDrive/transmission layout: Manufacturer documentation describes a\nrear drive axle with integrated differential; confirm whether the\nspecific unit is true 4x4 before advertising four-wheel drive\n\nFuel tank: 25 litres\nManufacturer-listed economic fuel consumption: approximately 6 L/100\nkm\n\nManufacturer-listed minimum ground clearance: 270mm\nManufacturer-listed load capacity: at least 450kg\nBrakes: Front and rear hydraulic disc brakes\nWheels: 12-inch front and rear\nSuspension: Front and rear longitudinal leaf springs with hydraulic\nshock-absorption system; confirm configuration on the supplied unit\n\nManufacturer-listed climbing capacity: over 25 degrees\nProduct dimensions: 2900 x 1520 x 1620mm\nNet weight: approximately 500kg\nGross shipping weight: approximately 528kg; packaging and shipping\nweight may vary\n\nPublished color options: gray, red, blue, black, and yellow; confirm\nlocal availability\n\nIntended user: Adult\nImages show a tubular roll cage, roof rack with auxiliary lights,\nopen sides, and red-and-black seats; confirm which accessories are\nincluded as standard and which are optional.\n\n",
    "price": 950,
    "original_price": 1100,
    "sku": "MMR-4215",
    "stock": 210,
    "images": [
      "/images/prod_1793655307660_887990622_984518170799343_8527378308260745393_n.webp",
      "/images/prod_1793655329615_877686103_1127855649642082_8344215946139665423_n.webp",
      "/images/prod_1793655336796_884551677_1761662094949663_331402969597307552_n.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "21-35 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-02T21:36:09.624103+00:00",
    "updated_at": "2026-11-10T13:55:46.029693+00:00"
  },
  {
    "id": "842581cf-fcc6-4af3-8539-bc0b2c08ae68",
    "name": "MD02TK-60V 5000W High-Speed Electric Drift Kart",
    "description": "The 60V 5000W High-Speed Electric Drift Kart is built for riders who want serious speed, long-range electric performance, and responsive drift control. Its high-carbon steel frame, CATL LiFePO4 battery, and powerful mid-mounted motor make it ready for demanding indoor and outdoor track riding.\n\n5000W peak power electric drift system\n2500W rated motor power\nMid-mounted permanent-magnet DC motor\n60V 30Ah CATL LiFePO4 battery\nUp to 70 km/h top speed\nUp to 60 km riding range\n6–7 hour charging time\nFarDriver controller\nHigh-carbon steel frame\nThree-piston caliper braking system\nFront and rear three-piston disc brakes\nUltra wear-resistant rubber tyres\nMaximum load capacity of 200 kg\nNet weight of 93.3 kg\nDesigned for indoor and outdoor track riding\nAvailable in Red, Black, White, Blue, and Purple\nCE certified\nComplete vehicle\nCustomized configuration available\n",
    "price": 450,
    "original_price": 550,
    "sku": "MMR-2131",
    "stock": 20,
    "images": [
      "/images/prod_1793655524065_884349659_969322075794279_3563922004757067156_n.webp",
      "/images/prod_1793655531730_881774318_1658263612316915_2694547234369306523_n.webp",
      "/images/prod_1793655550248_886086252_1426993952365630_4186868635883834793_n.webp",
      "/images/prod_1793655570927_886730768_2203919443534546_8994401216894529365_n.webp",
      "/images/prod_1793655587708_886552257_2332523500920088_2228785376381597553_n.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "29-35 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-02T21:10:14.13023+00:00",
    "updated_at": "2026-11-10T13:56:16.682895+00:00"
  },
  {
    "id": "8908f81c-2eab-47cb-8ab2-34be9f489ded",
    "name": "MD03FB-6000W Electric Dirt Bike",
    "description": "Built around a powerful 6000W mid-drive motor, this electric dirt bike delivers strong acceleration, high-speed performance, and substantial climbing capability. Its 60V 50Ah battery provides up to 110 miles of stated range, while the 19-inch front and 16-inch rear tires provide a versatile setup for adult riders.\n\n6000W peak mid-drive motor\n300Nm maximum torque\n65 MPH top speed\n60V 50Ah battery\n3000Wh battery capacity\nUp to 110 miles stated range\nTriple-mode drive\nFront 19\" × 2.8\" tire\nRear 16\" × 3.5\" tire\nTwist throttle\nAvailable in one size: 19\" / 16\"\nSuitable for riders from 5'1\" to 6'5\"\nWeight: 238 lbs\n",
    "price": 450,
    "original_price": null,
    "sku": "MMR-3424",
    "stock": 3125,
    "images": [
      "/images/prod_1793653242856_883920826_1658468065928975_3646863090824895650_n.webp",
      "/images/prod_1793653242859_885312375_1787421929174851_257089085887956976_n.webp",
      "/images/prod_1793653275393_886341218_2115838279294533_6222962306871054991_n.webp"
    ],
    "videos": [],
    "category": "dirtBikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "29-39 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-02T21:01:38.83944+00:00",
    "updated_at": "2026-11-10T13:56:15.982974+00:00"
  },
  {
    "id": "e24f440c-5809-4356-b142-a0b40391ab0a",
    "name": "MD02FB-MRZ Racing MR26 CB320 320cc Motocross Dirt Bike",
    "description": "The MRZ Racing MR26 CB320 Motocross Dirt Bike is built for riders seeking dependable engine performance, manual control, and rugged off-road capability. Powered by a Loncin CB320 320cc single-cylinder, four-stroke, air-cooled engine producing 15.5 kW, this dirt bike combines practical engineering with a purpose-built motocross design for trail riding and off-road adventures.\n\nDesigned for control across challenging terrain, the MR26 features 21-inch front and 18-inch rear wheels for a full-size motocross setup. Its 51 mm inverted hydraulic front forks offer dual adjustability and 180 mm of travel, helping absorb impacts and maintain handling over uneven surfaces. At the rear, a 455 mm dual-adjustable shock with a ballonet provides 90 mm of suspension travel.\n\nThe MR26 offers both kick-start and electric-start options for convenient ignition. Its manual-clutch transmission features a 1-0-2-3-4-5 gear configuration, giving riders direct control over gear selection and engine performance. A 7.5-litre fuel tank supports extended riding between refills, while the 1450 mm wheelbase contributes to the bike's overall riding geometry.\n\nCombining a 320cc Loncin engine, adjustable suspension, full-size motocross wheels, and a manual transmission, the MRZ Racing MR26 is designed for riders looking for a powerful, mechanically engaging off-road motorcycle.",
    "price": 450,
    "original_price": 550,
    "sku": "MMR-9035",
    "stock": 206,
    "images": [
      "/images/prod_1793652762700_886225214_1164796866218954_4523005557990705892_n.webp",
      "/images/prod_1793652762704_886577457_4629173220705448_1653650312108799827_n.webp"
    ],
    "videos": [],
    "category": "dirtBikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "29-39 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-02T20:53:22.479088+00:00",
    "updated_at": "2026-11-10T13:55:59.882972+00:00"
  },
  {
    "id": "bad7c633-5eaf-4942-b9a2-260902a1f709",
    "name": "45RWEDF-MRZ Racing MR26 CB320 320cc Motocross Dirt Bike",
    "description": "The MRZ Racing MR26 CB320 Motocross Dirt Bike is built for riders seeking powerful petrol performance, precise control, and rugged off-road capability. Powered by a 320cc Loncin CB320 single-cylinder, four-stroke, air-cooled engine producing 15.5 kW, this dirt bike combines dependable engine performance with a purpose-built motocross design for trail riding and off-road adventures.\n\nDesigned for demanding terrain, the MR26 features 21-inch front and 18-inch rear wheels, providing a full-size motocross setup for off-road riding. The front suspension consists of 51 mm inverted hydraulic dual-adjustable forks with 180 mm of travel, helping absorb impacts and maintain control over uneven surfaces. At the rear, a 455 mm dual-adjustable shock with a ballonet provides 90 mm of suspension travel.\n\nThe MR26 offers both kick-start and electric-start ignition for added convenience. Its manual-clutch transmission features a 1-0-2-3-4-5 gear configuration, giving riders direct control over gear selection. A 7.5-litre fuel tank supports extended riding between refills, while the 1450 mm wheelbase contributes to the bike's overall handling geometry.\n\nCombining a 320cc Loncin engine, adjustable suspension, full-size motocross wheels, and manual transmission, the MRZ Racing MR26 is designed for riders looking for a capable, mechanically engaging off-road motorcycle.\n\n320cc Loncin CB320 single-cylinder, four-stroke, air-cooled engine\nMaximum engine power: 15.5 kW\nKick starter and electric starter\nManual clutch transmission\n21-inch front and 18-inch rear wheels\n51 mm inverted hydraulic front forks\nFront suspension travel: 180 mm\n455 mm dual-adjustable rear shock with ballonet\nRear suspension travel: 90 mm\n7.5-litre fuel tank\nWheelbase: 1450 mm\n",
    "price": 450,
    "original_price": 550,
    "sku": "MMR-4743",
    "stock": 129,
    "images": [
      "/images/prod_1793652294435_66206a0f-3aa3-4db4-85a1-0b466a5e8f23.webp",
      "/images/prod_1793652294435_2a463ed2-3953-47bb-b4a5-2670fbe2330e.webp",
      "/images/prod_1793652294438_2f9699a5-a285-499e-9b2a-e1f887561f3b.webp"
    ],
    "videos": [],
    "category": "dirtBikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "29-39 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-02T20:44:59.68433+00:00",
    "updated_at": "2026-11-10T13:55:59.012752+00:00"
  },
  {
    "id": "b6270225-bc20-4b07-b963-c15e236e5a94",
    "name": "RTB582- Minicar Aventador",
    "description": "",
    "price": 1000,
    "original_price": null,
    "sku": "MMR-4371",
    "stock": 20,
    "images": [
      "/images/prod_1794226500206_897385796_1099429619792777_6468290525799825132_n.webp",
      "/images/prod_1793651930330_IMG_5060_avent_main_67323f73-5f26-4907-98ab-bade5b9ba92c.webp"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "21-35 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-02T20:39:01.862295+00:00",
    "updated_at": "2026-11-10T13:56:15.643448+00:00"
  },
  {
    "id": "46148dfa-e01d-4fe9-b65e-4b6ac032a54c",
    "name": "APEX 3RT5- Minicar Ford F-150",
    "description": "",
    "price": 1000,
    "original_price": 1249.96,
    "sku": "MMR-9321",
    "stock": 1240,
    "images": [
      "/images/prod_1793651838101_ford_f-150_main_23f7ee94-2573-4dac-8989-f427d0c728b7.webp",
      "/images/prod_1793651838100_ford_f-150_man_ca766be3-dd70-41e4-bb53-490ddb7247cf.webp"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "21-35 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-02T20:37:33.029484+00:00",
    "updated_at": "2026-11-10T20:24:34.342707+00:00"
  },
  {
    "id": "97719922-e37f-4251-adb9-7492a60972cb",
    "name": "Minicar AMG OPEN TOP",
    "description": "",
    "price": 1000,
    "original_price": 1250,
    "sku": "MMR-9818",
    "stock": 275,
    "images": [
      "/images/prod_1793651737694_IMG_5009_amg_main_a799f470-3343-4af4-97db-ce1eaf985920.webp",
      "/images/prod_1793651737692_IMG_5010_amg_man_f91541f5-adc2-4e8e-bcfa-b0bea44f9a80.webp"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "21-35 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-02T20:35:54.834152+00:00",
    "updated_at": "2026-11-10T13:56:14.082772+00:00"
  },
  {
    "id": "115e4a3f-ff51-4457-bdfc-b5eca697ff95",
    "name": "Minicar Bentley Red",
    "description": "",
    "price": 1000,
    "original_price": 1250,
    "sku": "MMR-8281",
    "stock": 288,
    "images": [
      "/images/prod_1793651630434_IMG_5026_1_bentley_red_main_141eebcd-08c0-470d-92a5-f174b445b984.webp",
      "/images/prod_1793651630435_IMG_5027_1_bentley_red_man_c5c917e9-3ec9-4055-91be-18bfbddfed21.webp"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "21-35 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-02T20:34:23.163967+00:00",
    "updated_at": "2026-11-10T13:56:12.457469+00:00"
  },
  {
    "id": "76744e3a-707b-4df7-bfd8-5099444964ef",
    "name": "4khg- Minicar Mercedes Maybach",
    "description": "Minicar Mercedes Maybach Uprated controller on electric builds, performance carb and exhaust on petrol. Harder launches, stronger top end Powertrain\nElectric\nDrive unit\n2500 W motor, 72 V 40 Ah\nTop speed\nUp to 30 mph",
    "price": 1000,
    "original_price": 1250,
    "sku": "MMR-3074",
    "stock": 20,
    "images": [
      "/images/prod_1793651377263_886706513_990365067482464_2836382038474994218_n.webp",
      "/images/prod_1793651377258_886035761_1388967919985923_3416478601697540313_n.webp"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "21-35 business days",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-02T20:29:53.185195+00:00",
    "updated_at": "2026-11-10T13:56:13.358502+00:00"
  },
  {
    "id": "242acc3d-9ddc-4b0d-83ed-97cd7053bdcb",
    "name": "3EE4-Both blue Bugatti",
    "description": "half size, from $1000, with you in the seat and a passenger beside you. Steel frame, real brakes, rear-wheel drive that slides when you ask. Up to 35 mph inches off the ground. Electric for the silence.\n\n\nBuild sheet\nPowertrain\nGasoline\nDrive unit  125cc four-stroke\nTop speed\nUp to 35 mph\nRange / tank\n3.5 L tank\nDimensions\n102 x 43 x 31 in\nKerb weight\n419 lb\nMax load\n440 lb, two seats\nFits riders up to\n6 ft 3 in",
    "price": 1000,
    "original_price": 1250,
    "sku": "MMR-8525",
    "stock": 256,
    "images": [
      "/images/prod_1793650898589_879817959_2328417041244926_288892056541258223_n.webp",
      "/images/prod_1793650898593_888017594_1634290948243571_4991560922745237402_n.webp"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "21-35 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-02T20:23:02.553472+00:00",
    "updated_at": "2026-11-10T13:56:12.822332+00:00"
  },
  {
    "id": "e38e49ff-f11e-46c9-b671-fbc8bf35b15d",
    "name": "3U45H -STREET FRIENDLY MICRO CARS",
    "description": "Quiet enough for our street\nCul-de-sac, neighbours close. Electric was the right call",
    "price": 1000,
    "original_price": 1250,
    "sku": "MMR-7660",
    "stock": 219,
    "images": [
      "/images/prod_1793650025282_879375234_2380473659450246_70180426148421530_n.webp",
      "/images/prod_1793650032858_886770566_1645896740648662_6732348246359460554_n.webp",
      "/images/prod_1793650040265_888506302_1125828299857042_316727796852675222_n.webp",
      "/images/prod_1793650247405_881774324_1087285747463622_7822863289122069249_n.webp",
      "/images/prod_1793650267222_879544614_2070309011038601_9086743362186625132_n.webp",
      "/images/prod_1793650480832_885312371_1669894924573764_9012584498484360434_n.webp",
      "/images/prod_1793650491998_885265808_1439417001657360_3433208380395612932_n.webp",
      "/images/prod_1793650503219_886609299_1456673486431583_7728887533111138269_n.webp"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "21-35 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-02T20:11:58.313079+00:00",
    "updated_at": "2026-11-10T13:56:12.10331+00:00"
  },
  {
    "id": "7e93292c-835d-41c6-a013-d37fed276caf",
    "name": "Minicar Porsche 911",
    "description": "Exact 1:2 scale drivable replica, two seats as standard\nAt half size, from $750, with you in the seat and a passenger beside you. Steel frame, real brakes, rear-wheel drive that slides when you ask. Up to 35 mph inches off the ground. Petrol for the noise, electric for the silence.",
    "price": 750,
    "original_price": 849.99,
    "sku": "MMR-7802",
    "stock": 2070,
    "images": [
      "/images/prod_1793713692028_886376572_1433042665000943_7801620454266700358_n.webp",
      "/images/prod_1793649074433_879779068_1368028398560616_3466829741489366487_n.webp",
      "/images/prod_1793649694952_883034637_1104417505801998_6869710603593887594_n.webp",
      "/images/prod_1793649702275_884252158_1600544418221672_7743596483789082124_n.webp",
      "/images/prod_1793649713960_882517511_28957992453894551_4916612327555497492_n.webp"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "21-35 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-02T19:51:59.677275+00:00",
    "updated_at": "2026-11-10T13:56:15.209068+00:00"
  },
  {
    "id": "71803330-82ff-4907-b77e-da9e6353e329",
    "name": "MEH-5000 72V 5000W Electric Go Kart",
    "description": "The MEH-5000 Electric Go Kart HAS powerful acceleration, responsive handling, and dependable performance for recreational karting. Built with a robust 5000W electric motor, heavy-duty steel frame, and hydraulic disc brakes, it offers an exciting and reliable driving experience on private tracks and off-road terrain.\n\nKey Features:\n\nHigh-performance 5000W permanent magnet synchronous motor\n72V lead-acid battery system\nPeak power output up to 18 kW\nTop speed up to 65 km/h\nFour-wheel hydraulic disc braking system\nDurable chain-drive transmission\nHeavy-duty 4130 chromoly steel frame\nPrecision TIG and MIG welded chassis\nThree-spoke sport steering wheel\nComfortable high-back seat\nMaximum load capacity: 200 kg\nHeavy-duty 13 × 6.5-6 tyres\nDesigned for recreational electric karting",
    "price": 450,
    "original_price": 550,
    "sku": "MEH-5000 ",
    "stock": 297689,
    "images": [
      "/images/prod_1793644938147_black.webp",
      "/images/prod_1793645006253_yello.webp",
      "/images/prod_1793645017659_ingine.webp",
      "/images/prod_1793645044915_blue_2.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "29-39 business days (Nanshan, Shenzhen, Guangdong Province, China Warehouse)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-11-02T12:37:35.422023+00:00",
    "updated_at": "2026-11-10T20:24:58.507786+00:00"
  },
  {
    "id": "bc538035-8cfa-47c0-9369-c5341c327ff2",
    "name": "Porsche 964 Open Top",
    "description": "The Porsche 964 Open Top Electric Microcar (popularly known as the 964 Turbo Junior by manufacturers like END OF S.T.A.Y.) is a highly sought-after, 1:2 scale electric junior car built for adults and kids alike. Mimicking the iconic convertible architecture of the classic 964-generation Porsche 911, these high-end, street-legal-capable karts offer scaled-down luxury combined with surprisingly fast electric performance.",
    "price": 750,
    "original_price": 850,
    "sku": "MMR-5525",
    "stock": 304,
    "images": [
      "/images/prod_1793646861244_midget_porsche_1.png",
      "/images/prod_1793646878919_midget_porsche_2.png",
      "/images/prod_1793646887083_midget_porsche_3.png",
      "/images/prod_1793646899957_midget_porsche_4.png",
      "/images/prod_1793646907973_midget_porsche_5.png"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "29-39 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": null,
    "dimensions": null,
    "rating": 4.9,
    "reviews": 0,
    "created_at": "2026-10-17T12:52:46.010478+00:00",
    "updated_at": "2026-11-10T13:55:53.553177+00:00"
  },
  {
    "id": "eb9f53ee-ea3f-4299-823d-2ae9aa6455e2",
    "name": "3000W Electric Motorcycle",
    "description": "The 3000W Electric Motorcycle combines a brushless motor with front and rear suspension for a capable and comfortable ride.\r\n\r\n* 3000W peak brushless motor\r\n* 40 - 60 km/h maximum speed\r\n* Single-speed drivetrain\r\n* Front and rear suspension\r\n* Net weight: 57kg\r\n* Gross weight: 64kg\r\n* Product size: 157 × 65 × 93cm\r\n* Black finish\r\n* New condition\r\n\r\nPlace of Origin: Jiangsu, China\r\nBrand Name: XSZB",
    "price": 450,
    "original_price": 550,
    "sku": "MMR-3000W-ELECTRIC-M",
    "stock": 2000,
    "images": [
      "/images/prod_1793646219683_midget_ym_final_6.png",
      "/images/prod_1793646247309_midget_ym_final_2.png",
      "/images/prod_1793646258552_midget_ym_final_3.png",
      "/images/prod_1793646272625_midget_ym_final_4.png",
      "/images/prod_1793646308637_midget_ym_final_6.png"
    ],
    "videos": [],
    "category": "dirtBikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "29-39 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 40,
    "dimensions": "Range: 70 KM",
    "rating": 4.95,
    "reviews": 103,
    "created_at": "2026-10-13T19:01:12.358821+00:00",
    "updated_at": "2026-11-10T13:56:13.707695+00:00"
  },
  {
    "id": "2c27a6df-c5c0-4945-bb72-4cc0f74c15c1",
    "name": "S1 2kW Electric All-Terrain Buggy",
    "description": "Take on outdoor terrain with the S1 2kW Electric All-Terrain Buggy, a shaft-driven off-road go-kart designed for adults and teens. Powered by a 2000W NanPu electric motor and a 72V 40Ah battery, it combines electric performance with a rugged galvanized steel tube frame, large off-road tyres, and hydraulic disc brakes at both the front and rear.\r\n\r\nBuilt for outdoor and off-road use, the S1 features 180mm of ground clearance with large tyres, a 1300mm wheelbase, and a maximum load capacity of 200kg. The shaft-drive system provides direct power delivery while the hydraulic braking system provides braking at all four wheels.\r\n\r\n- 2000W NanPu electric motor\r\n- 72V 40Ah battery\r\n- Shaft-driven off-road drivetrain\r\n- Front and rear hydraulic disc brakes\r\n- Galvanized steel tube frame\r\n- 180mm ground clearance with large tyres\r\n- 200kg maximum load capacity\r\n- 16x8-7 off-road wheels\r\n- Suitable for adults and teens\r\n- Designed for outdoor and off-road riding\r\n- 1-year whole vehicle warranty\r\n- 3-year motor warranty\r\n\r\nThe manufacturer lists a maximum speed of up to 100 km/h.",
    "price": 650,
    "original_price": 813,
    "sku": "MMR-S1-2KW-ELECTRIC-",
    "stock": 1000,
    "images": [
      "/images/prod_1793647901220_midget_brand_4.png",
      "/images/prod_1793648026716_midget_brand_2.png"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 100,
    "dimensions": "Range: 65 KM",
    "rating": 4.92,
    "reviews": 35,
    "created_at": "2026-10-13T19:01:11.673927+00:00",
    "updated_at": "2026-11-10T13:56:06.612882+00:00"
  },
  {
    "id": "6d994d46-5c4a-4203-bc8a-1c73a928bbe1",
    "name": "GC3001 300cc Two-Seater Off-Road Go Kart",
    "description": "The GC3001 is a full-size two-seater off-road go-kart built for riders who want strong performance, comfort, and dependable handling. Its 300cc water-cooled engine, automatic transmission with reverse, hydraulic disc brakes, and double-chain drive make it well suited for recreational riding across challenging terrain.\r\n\r\nKey Features:\r\n\r\n* Powerful 300cc single-cylinder 4-stroke water-cooled engine\r\n* Two-seater adult-size design\r\n* Automatic transmission with reverse\r\n* Electric start with 12V 9Ah battery\r\n* Double-chain drive power transmission\r\n* Front and rear hydraulic disc brakes\r\n* Comfortable shock suspension system\r\n* 260 mm ground clearance\r\n* Maximum speed of over 85 km/h\r\n* Load capacity of over 300 kg\r\n* Climbing capability of at least 20°\r\n* Large off-road tyres for improved traction\r\n* Available in black, red, blue, orange, and other colours\r\n\r\nSpecifications:\r\n\r\n* Model: GC3001\r\n* Engine: 300cc single-cylinder, 4-stroke, water-cooled\r\n* Transmission: Automatic with reverse\r\n* Starting system: Electric start\r\n* Battery: 12V 9Ah\r\n* Load capacity: >300 kg (660 lbs)\r\n* Ground clearance: 260 mm\r\n* Fuel tank: 7 litres\r\n* Fuel type: Unleaded petrol, 90 octane or higher\r\n* Top speed: >85 km/h\r\n* Wheelbase: 1150 mm\r\n* Climbing capacity: ≥20°\r\n* Net weight: 260 kg (572 lbs)\r\n* Gross weight: 280 kg (616 lbs)\r\n\r\nDimensions:\r\n\r\n* Overall dimensions: 2300 × 1640 × 1570 mm\r\n* Carton size: 230 × 138 × 73 cm per unit\r\n\r\nBraking System:\r\n\r\n* Front hydraulic disc brakes\r\n* Rear hydraulic disc brakes\r\n\r\nDrive System:\r\n\r\n* Double-chain drive transmission\r\n\r\nWheels & Tyres:\r\n\r\n* Front: 21 × 7-10\r\n* Rear: 22 × 10-10\r\n\r\nAvailable Colours:\r\n\r\n* Black\r\n* Red\r\n* Blue\r\n* Orange\r\n* Additional colours may be available\r\n\r\nIdeal For:\r\n\r\n* Recreational off-road riding\r\n* Private tracks\r\n* Farms and large properties\r\n* Trails and open terrain\r\n* Two-person outdoor adventures",
    "price": 450,
    "original_price": 560,
    "sku": "MMR-GC3001-300CC-TWO",
    "stock": 3000,
    "images": [
      "/images/prod_1793648585796_883256059_1843699147051081_6457045567992984700_n.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "29-39 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 85,
    "dimensions": "Range: 75 KM",
    "rating": 4.91,
    "reviews": 27,
    "created_at": "2026-10-13T19:01:10.891018+00:00",
    "updated_at": "2026-11-10T13:56:09.492547+00:00"
  },
  {
    "id": "18cc9ead-df21-4c61-84df-a23f768cb57b",
    "name": "JW1502 4-Seat Adult Off-Road Kart",
    "description": "The JW1501 is a heavily oversized, 4-seat adult off-road utility kart built to carry up to four riders across rugged terrain with ease. Powered by a high-torque 200cc GY6 4-stroke air-cooled engine with a smooth automatic clutch, it delivers effortless power managed by an advanced rear drive axle and integrated bridge differential. Equipped with four independent shock suspensions and high-clearance 180 mm seating, this heavy-duty machine combines maximum passenger capacity with a smooth, stable, and highly capable off-road ride.\r\n\r\nKey Features:\r\n• Significantly larger chassis optimized for adult riders\r\n• Spacious 4-seat passenger configuration\r\n• High-torque 200cc GY6 single-cylinder 4-stroke air-cooled engine\r\n• Fully automatic clutch for effortless operational control\r\n• Rear drive axle equipped with an integrated bridge differential\r\n• Massive 15-litre long-range fuel tank for extended driving time\r\n• Four premium independent shock suspensions for rugged terrain\r\n• Adjustable seat clearance for custom driver and rider comfort\r\n• Responsive front and rear hydraulic disc brakes\r\n• High-ground clearance of 180 mm to conquer obstacles\r\n• Strong climbing capacity exceeding 15 degrees\r\n• Heavy-duty load capacity: Over 300 kg (660 lbs)\r\n• Heavy-tread off-road tyres (Front: 23×7-10, Rear: 22×10-10)\r\n• Premium full aluminum wheel rims with optional 12-inch upgrades\r\n• Robust overall product dimensions: 2350 × 1450 × 1460 mm\r\n• Available in vibrant colour options (Red, Blue, Orange, Yellow, Green)",
    "price": 750,
    "original_price": 1250,
    "sku": "MMR-JW1502-4-SEAT-AD",
    "stock": 900,
    "images": [
      "/images/prod_1793654801618_879511779_28913074728360346_2297068246274224465_n.webp",
      "/images/prod_1793654813049_884829744_3371872033004705_1111376557460618083_n.webp",
      "/images/prod_1793654823051_886167603_1679839003749225_1985721710914708304_n.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "21 - 28  business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 70,
    "dimensions": "Range: 65 KM",
    "rating": 4.97,
    "reviews": 80,
    "created_at": "2026-10-13T19:01:10.36613+00:00",
    "updated_at": "2026-11-10T13:56:02.232633+00:00"
  },
  {
    "id": "460f658f-ba6d-449d-a1ad-e9022ea7efba",
    "name": "G45UH- High-Speed Electric Drift Go Kart",
    "description": "The High-Speed Electric Drift Go Kart delivers powerful acceleration, responsive handling, and smooth electric performance for an exciting driving experience. Built with a durable steel frame, hydraulic disc brakes, and a dedicated hand brake, it's designed for recreational drifting, private tracks, and off-road adventures.\r\n\r\nKey Features:\r\n• High-performance electric drive system\r\n• Top speed up to 75 km/h\r\n• Durable heavy-duty steel frame\r\n• Hydraulic disc braking system\r\n• Chain drive transmission\r\n• Hand brake for improved drift control\r\n• Smooth and quiet electric operation\r\n• Heavy-duty off-road tyres\r\n• Maximum load capacity: 200 kg\r\n• Vehicle weight: 150 kg\r\n• Designed for recreational off-road and drift riding\r\n• Available in multiple colour options",
    "price": 350,
    "original_price": 450,
    "sku": "MMR-HIGH-SPEED-ELECT",
    "stock": 1000,
    "images": [
      "/images/prod_1793654346420_864685568_4457547844484876_2650379428582532061_n.webp",
      "/images/prod_1793654353359_881774318_1658263612316915_2694547234369306523_n.webp",
      "/images/prod_1793654360938_883718070_987170297776126_1731842969153634989_n.webp",
      "/images/prod_1793654392180_885312369_1669352248050578_619129323973863391_n.webp",
      "/images/prod_1793654419982_886376567_912107175319201_634110139812029498_n.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "29-39 business days ",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 75,
    "dimensions": "Range: 90 KM",
    "rating": 4.92,
    "reviews": 97,
    "created_at": "2026-10-13T19:01:08.996901+00:00",
    "updated_at": "2026-11-10T13:56:16.343888+00:00"
  },
  {
    "id": "617e894e-f1f8-4d4d-a733-0bd8760a5556",
    "name": "EG0502 Kids Electric Go Kart",
    "description": "The EG0502 Electric Go Kart is specifically designed for kids, offering a perfect blend of safety and electric performance. Driven by a 48V 550W brushless hub motor and a reliable shaft drive transmission with forward and reverse, it features a semi-covered seat with a 3-point safety belt. Parents can easily manage performance using the built-in 3-speed limitation settings, while the detachable battery box ensures convenient charging away from the kart.\r\n\r\nKey Features:\r\n• Special safety-focused design built for kids\r\n• Efficient 48V 550W brushless hub motor\r\n• Shaft driving transmission with forward and reverse functionality\r\n• Detachable battery box for convenient remote charging\r\n• Long-lasting 48V 13Ah Chaowei lead-acid battery\r\n• Travel range: Up to 60 km or 4–6 hours of driving time\r\n• Charging time: 6–8 hours\r\n• Three parent-controlled speed limitations: 10, 15, or 20 km/h\r\n• Semi-covered seat ensures enhanced rider safety\r\n• Secure 3-point driver safety belt\r\n• Adjustable seat leg clearance ranging from 620 mm to 670 mm\r\n• Premium 4 aluminum wheel rims with 5-inch tubeless tyres\r\n• Responsive rear step hydraulic brake system\r\n• Ground clearance: 55 mm\r\n• Maximum load capacity: Over 120 kg (264 lbs)\r\n• Product dimensions: 1400 × 950 × 780 mm",
    "price": 1200,
    "original_price": 1500,
    "sku": "MMR-EG0502-KIDS-ELEC",
    "stock": 1000,
    "images": [
      "/images/eg0502-kids-electric-go-kart.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 20,
    "dimensions": "Range: 60 km",
    "rating": 4.88,
    "reviews": 58,
    "created_at": "2026-10-13T19:01:07.26802+00:00",
    "updated_at": "2026-11-10T13:56:01.008134+00:00"
  },
  {
    "id": "b9702410-22b6-4ae3-8c1e-27725618a1bc",
    "name": "GC2002 Adult Racing Go Kart",
    "description": "The GC2002 Go Kart is our most popular adult racing model, engineered to deliver top-tier performance at an economical cost. Driven by a powerful 200cc 6.5HP 4-stroke engine featuring a wet clutch system, it reaches thrilling speeds over 70 km/h with exceptional control. Built with a heavy-duty frame, stable 1160 mm wheelbase, and a responsive rear caliper disc brake, this versatile kart is a track favorite available with multiple engine size options.\r\n\r\nKey Features:\r\n• High-performance chassis optimized for adult riders\r\n• Most popular and widely demanded track model\r\n• Powerful 200cc 6.5HP 4-stroke engine with wet clutch system\r\n• Pull-start ignition with optional electric start upgrade\r\n• Blazing top speed: Over 70 km/h\r\n• Sharp rear caliper disc brake with a 1.5m braking distance\r\n• Durable chain-drive transmission\r\n• High weight capacity: Over 200 kg (440 lbs)\r\n• Fuel tank capacity: 2 litres\r\n• Wide wheelbase of 1160 mm for stable cornering\r\n• Front tyres: 10 × 4.5-5\r\n• Rear tyres: 11 × 7.1-5\r\n• Overall dimensions: 1700 × 1100 × 450 mm\r\n• Strong climbing ability: Greater than or equal to 10 degrees\r\n• Available in multiple colours (Black, Red, Blue, Orange)\r\n• Highly economical initial and maintenance costs\r\n• Engine options available in 160cc, 200cc, and 270cc configurations\r\n• OEM customization available on mass orders",
    "price": 2000,
    "original_price": 2500,
    "sku": "MMR-GC2002-ADULT-RAC",
    "stock": 3000,
    "images": [
      "/images/gc2002-adult-racing-go-kart.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 70,
    "dimensions": "Range: 70 KM",
    "rating": 4.95,
    "reviews": 49,
    "created_at": "2026-10-13T19:01:06.600984+00:00",
    "updated_at": "2026-11-10T13:56:08.798208+00:00"
  },
  {
    "id": "4957e38a-3cbd-4679-8a73-df26e4826e45",
    "name": "JW1501 200cc Adult Mini Jeep Willys",
    "description": "The JW1501 200cc Adult Mini Jeep Willys is built with a larger adult-sized design, automatic GY6 power, independent suspension, and a high-capacity 15-litre fuel tank. Its durable construction and four-wheel hydraulic braking make it suited for recreational off-road driving.\r\n\r\n- 200cc GY6 single-cylinder 4-stroke air-cooled engine\r\n- Automatic clutch\r\n- Four independent shock suspensions\r\n- Large 15-litre fuel tank\r\n- Adjustable seat clearance\r\n- Full aluminium wheel rims\r\n- Front and rear hydraulic disc brakes\r\n- Rear drive axle with integrated bridge differential\r\n- Adult-size large-body design\r\n- 300 kg (660 lbs) load capacity\r\n- 180 mm minimum ground clearance\r\n- Over 15° climbing capability\r\n- Product size: 2350 × 1450 × 1460 mm\r\n- Front tyres: 23 × 7-10\r\n- Rear tyres: 22 × 10-10\r\n- Optional 12-inch wheels\r\n- Available in Red, Blue, Orange, Yellow, Green, and more\r\n- Net weight: 178 kg\r\n- Gross weight: 202 kg\r\n- Carton packed",
    "price": 1000,
    "original_price": 1250,
    "sku": "MMR-JW1501-200CC-ADU",
    "stock": 220,
    "images": [
      "/images/jw1501-200cc-adult-mini-jeep-willys.webp"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": false,
    "shipping_required": true,
    "average_delivery_time": "21  - 28 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 75,
    "dimensions": "Range: 65 KM",
    "rating": 4.98,
    "reviews": 72,
    "created_at": "2026-10-13T19:01:06.107916+00:00",
    "updated_at": "2026-11-10T13:56:10.357588+00:00"
  },
  {
    "id": "dd87324b-242c-4a97-b02e-7e25918b7d37",
    "name": "ES8005 800W Electric Scooter",
    "description": "The ES8005 800W Electric Scooter combines performance, comfort, and convenience for daily commuting and leisure riding. Powered by an 800W brushless motor, equipped with a removable lithium battery, and featuring a foldable frame, it delivers a smooth, reliable, and enjoyable riding experience wherever you go.\r\n\r\nKey Features:\r\n• Powerful 800W brushless hub motor\r\n• 48V 12Ah removable lithium battery\r\n• Top speed: 35–45 km/h\r\n• Riding range: Up to 45 km per charge\r\n• Foldable frame for easy storage and transport\r\n• Large 10 × 6.0-5.5 wide tubeless tyres\r\n• Front and rear disc brakes\r\n• Rear hub motor drive\r\n• Adjustable front fork\r\n• Adjustable seat height\r\n• Dual rear brake lights for improved visibility\r\n• Lockable battery compartment with easy battery access\r\n• Maximum load capacity: 120 kg\r\n• Maximum climbing ability: 18°\r\n• Charging time: 4–6 hours\r\n• Wheelbase: 980 mm\r\n• Overall dimensions: 1300 × 550 × 1100 mm\r\n• Available in White, Black, Red, Pink, Yellow, Orange, and additional colours",
    "price": 340,
    "original_price": 425,
    "sku": "MMR-ES8005-800W-ELEC",
    "stock": 1000,
    "images": [
      "/images/es8005-800w-electric-scooter.png"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "21 - 28 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 45,
    "dimensions": "Range: 45 km",
    "rating": 4.94,
    "reviews": 32,
    "created_at": "2026-10-13T19:01:05.597998+00:00",
    "updated_at": "2026-11-10T13:56:01.452954+00:00"
  },
  {
    "id": "ba448cd5-ae3d-49e2-aba8-554b7ebe4b7e",
    "name": "200cc High-Speed Drift Go Kart",
    "description": "The 200cc High-Speed Drift Go Kart combines powerful performance, rugged construction, and responsive handling for an exciting off-road driving experience. Powered by a dependable 200cc 4-stroke petrol engine and built on a heavy-duty steel frame, it's designed for riders who want speed, control, and adventure on private tracks and off-road terrain.\r\n\r\nKey Features:\r\n• Powerful 200cc single-cylinder 4-stroke petrol engine\r\n• 4.5 kW power output\r\n• Top speed up to 90 km/h\r\n• Rear-wheel drive for responsive handling\r\n• Manual pull-start ignition\r\n• Heavy-duty steel frame construction\r\n• Designed for off-road and drift riding\r\n• Large off-road tyres for improved traction\r\n• Maximum load capacity: 200 kg\r\n• Fuel tank capacity: 5 litres\r\n• Front tyres: 8-inch\r\n• Rear tyres: 10-inch\r\n• Vehicle dimensions: 1800 × 1100 × 520 mm\r\n• Vehicle weight: 90 kg\r\n• Available in Black and Green",
    "price": 350,
    "original_price": 438,
    "sku": "MMR-200CC-HIGH-SPEED",
    "stock": 0,
    "images": [
      "/images/200cc-high-speed-drift-go-kart.png",
      "/images/mm1.webp",
      "/images/mm2.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "21 - 28 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 90,
    "dimensions": "Range: 100 KM",
    "rating": 4.89,
    "reviews": 45,
    "created_at": "2026-10-13T19:01:05.142879+00:00",
    "updated_at": "2026-11-10T13:56:18.952423+00:00"
  },
  {
    "id": "23c1989d-c145-4263-abff-f4ea1a859d72",
    "name": "212cc Drift Racing Go Kart",
    "description": "The 212cc Drift Racing Go Kart delivers impressive power, responsive handling, and rugged durability for adrenaline-filled off-road adventures. Featuring a reliable 212cc 4-stroke petrol engine, hydraulic disc brakes, and a heavy-duty steel frame, it's built for recreational drifting, racing, and off-road riding on private tracks.\r\n\r\nKey Features:\r\n• Powerful 212cc single-cylinder 4-stroke petrol engine\r\n• Top speed up to 90 km/h\r\n• Rear-wheel drive with chain transmission\r\n• Heavy-duty steel frame construction\r\n• Hydraulic disc braking system\r\n• Hand brake for improved drift control\r\n• 150 mm suspension travel for enhanced comfort\r\n• Rugged off-road tyres\r\n• Fuel tank capacity: 3.5 litres\r\n• Maximum load capacity: 200 kg\r\n• Front tyres: 10 × 4.50-5\r\n• Rear tyres: 11 × 7.10-5\r\n• Vehicle weight: 100 kg\r\n• Single-seat racing design\r\n• Available in multiple colour options",
    "price": 400,
    "original_price": 500,
    "sku": "MMR-212CC-DRIFT-RACI",
    "stock": 1000,
    "images": [
      "/images/212cc-drift-racing-go-kart.png"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 90,
    "dimensions": "Range: 100 KM",
    "rating": 4.91,
    "reviews": 67,
    "created_at": "2026-10-13T19:01:04.26098+00:00",
    "updated_at": "2026-11-10T13:56:00.63816+00:00"
  },
  {
    "id": "10e5f7c9-98f0-4019-a7ff-5d659fdd308f",
    "name": "EA6001 4×4 Electric All-Terrain Scooter",
    "description": "The EA6001 4×4 Electric All-Terrain Scooter is engineered for maximum traction, stability, and long-range performance. Featuring four powerful hub motors, automatic power steering, and a high-capacity lithium battery, it delivers exceptional control and comfort for off-road adventures, farms, estates, and utility applications.\r\n\r\nKey Features:\r\n• Four independent 1500W brushless hub motors (6000W total output)\r\n• Four-wheel drive (4WD) system\r\n• Automatic power steering\r\n• 60V 80Ah lithium battery pack\r\n• Top speed: Up to 45 km/h\r\n• Riding range: Up to 120 km per charge\r\n• Front double swing arm suspension\r\n• Front and rear hydraulic disc brakes\r\n• IP66-rated motor controller\r\n• Forward and reverse drive\r\n• Foldable design with detachable seat\r\n• Full aluminium wheel rims\r\n• Front and rear cargo racks\r\n• Tubeless all-terrain tyres\r\n• Maximum load capacity: 300 kg (660 lbs)\r\n• Maximum climbing ability: 55°\r\n• Ground clearance: 220 mm\r\n• Charging input: 80–240V AC, 50–60Hz, 7A\r\n• Front tyres: 21 × 7-10 Tubeless\r\n• Rear tyres: 21 × 7-10 Tubeless\r\n• Overall dimensions: 1750 × 1400 × 1403 mm\r\n• Available in Red, Blue, Black, Yellow, and additional colours",
    "price": 450,
    "original_price": 563,
    "sku": "MMR-EA6001-4X4-ELECT",
    "stock": 500,
    "images": [
      "/images/ea6001-4x4-electric-all-terrain-scooter.png"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 45,
    "dimensions": "Range: 120 km",
    "rating": 4.93,
    "reviews": 95,
    "created_at": "2026-10-13T19:01:03.197176+00:00",
    "updated_at": "2026-11-10T13:56:00.263252+00:00"
  },
  {
    "id": "400f2373-b5d8-44d2-ad8c-09d9e39cdc35",
    "name": "JW1501 4-Seat Adult Off-Road Kart",
    "description": "The JW1501 is a heavily oversized, 4-seat adult off-road utility kart built to carry up to four riders across rugged terrain with ease. Powered by a high-torque 200cc GY6 4-stroke air-cooled engine with a smooth automatic clutch, it delivers effortless power managed by an advanced rear drive axle and integrated bridge differential. Equipped with four independent shock suspensions and high-clearance 180 mm seating, this heavy-duty machine combines maximum passenger capacity with a smooth, stable, and highly capable off-road ride.\r\n\r\nKey Features:\r\n• Significantly larger chassis optimized for adult riders\r\n• Spacious 4-seat passenger configuration\r\n• High-torque 200cc GY6 single-cylinder 4-stroke air-cooled engine\r\n• Fully automatic clutch for effortless operational control\r\n• Rear drive axle equipped with an integrated bridge differential\r\n• Massive 15-litre long-range fuel tank for extended driving time\r\n• Four premium independent shock suspensions for rugged terrain\r\n• Adjustable seat clearance for custom driver and rider comfort\r\n• Responsive front and rear hydraulic disc brakes\r\n• High-ground clearance of 180 mm to conquer obstacles\r\n• Strong climbing capacity exceeding 15 degrees\r\n• Heavy-duty load capacity: Over 300 kg (660 lbs)\r\n• Heavy-tread off-road tyres (Front: 23×7-10, Rear: 22×10-10)\r\n• Premium full aluminum wheel rims with optional 12-inch upgrades\r\n• Robust overall product dimensions: 2350 × 1450 × 1460 mm\r\n• Available in vibrant colour options (Red, Blue, Orange, Yellow, Green)",
    "price": 750,
    "original_price": 1375,
    "sku": "MMR-JW1501-4-SEAT-AD",
    "stock": 1000,
    "images": [
      "/images/200cc 4-Seater Off-Road Go Kart 1 - $550.webp",
      "/images/jw1501-4-seat-adult-off-road-kart.webp",
      "/images/200cc 4-Seater Off-Road Go Kart 3 - $550.webp.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "21 - 28 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 70,
    "dimensions": "Range: 70 KM",
    "rating": 4.9,
    "reviews": 51,
    "created_at": "2026-10-13T19:01:02.247115+00:00",
    "updated_at": "2026-11-10T13:56:10.938319+00:00"
  },
  {
    "id": "e5e569c1-822c-4657-bb93-edcacb0744f0",
    "name": "EA4801 4×4 Electric Quad ATV",
    "description": "The EA4801 4×4 Electric Quad ATV is built to conquer challenging terrain with powerful performance, exceptional traction, and dependable control. Equipped with four independent hub motors, a high-capacity lithium battery, and advanced suspension, it delivers a smooth and capable riding experience for work, recreation, and outdoor adventure.\r\n\r\nKey Features:\r\n• Four 1200W brushless AC hub motors (4800W total output)\r\n• Four-wheel drive with independent hub motors\r\n• 60V 40Ah lithium battery pack\r\n• Top speed: Up to 55 km/h\r\n• Front double swing arm suspension\r\n• Front and rear hydraulic disc brakes\r\n• IP66-rated motor controller\r\n• Forward and reverse drive\r\n• Overload protection system\r\n• Foldable design with detachable seat\r\n• Full aluminium wheel rims\r\n• Rear tow bar\r\n• Rear storage toolbox\r\n• Tubeless all-terrain tyres\r\n• Maximum load capacity: 300 kg (660 lbs)\r\n• Maximum climbing ability: 55°\r\n• Ground clearance: 220 mm\r\n• Charging time: 3–4 hours\r\n• Charging input: 80–240V AC, 50–60Hz, 7A\r\n• Front tyres: 225 × 40-10 Tubeless\r\n• Rear tyres: 225 × 40-10 Tubeless\r\n• Overall dimensions: 1430 × 1020 × 1255 mm\r\n• Available in Red, Blue, Black, Yellow, and additional colours",
    "price": 550,
    "original_price": 688,
    "sku": "MMR-EA4801-4X4-ELECT",
    "stock": 500,
    "images": [
      "/images/ea4801-4x4-electric-quad-atv.png"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 55,
    "dimensions": "Range: 60 km",
    "rating": 4.94,
    "reviews": 93,
    "created_at": "2026-10-13T19:01:01.497366+00:00",
    "updated_at": "2026-11-10T13:56:05.648206+00:00"
  },
  {
    "id": "9b5f6a39-0cf6-44e1-bc88-9971a21065e6",
    "name": "EG1002 Single Seat Electric Go Kart",
    "description": "The EG1002 Single Seat Electric Go Kart combines smooth electric performance, responsive handling, and all-terrain capability in a compact, rider-friendly design. Featuring a powerful 1000W brushless motor, adjustable speed modes, and independent suspension, it's built for comfortable and exciting recreational riding across a variety of off-road environments.\r\n\r\nKey Features:\r\n• Powerful 1000W brushless electric motor\r\n• Three selectable speed modes\r\n• Detachable battery pack for convenient charging\r\n• Quiet and efficient electric operation\r\n• Four independent shock absorbers\r\n• Adjustable leg clearance for improved comfort\r\n• Gearbox shaft drive transmission\r\n• Dual rear disc braking system\r\n• Rugged all-terrain tyres\r\n• Top speed: 40 ± 2 km/h\r\n• Riding range: Up to 40 km (48V battery)\r\n• Riding range: Up to 80 km (optional 60V lithium battery)\r\n• Maximum load capacity: 160 kg (352 lbs)\r\n• Ground clearance: 200 mm\r\n• Battery options: 48V 20Ah lead-acid or optional 60V lithium\r\n• Charging input: 80–240V AC, 50–60Hz, 7A\r\n• Front tyres: 16 × 8-7\r\n• Rear tyres: 16 × 8-7\r\n• Overall dimensions: 1450 × 1010 × 1200 mm\r\n• Available in Red, Blue, Orange, Yellow, and additional colours",
    "price": 400,
    "original_price": 500,
    "sku": "MMR-EG1002-SINGLE-SE",
    "stock": 1000,
    "images": [
      "/images/eg1002-single-seat-electric-go-kart.png"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 40,
    "dimensions": "Range: Up to 80 km",
    "rating": 4.96,
    "reviews": 20,
    "created_at": "2026-10-13T19:01:00.89707+00:00",
    "updated_at": "2026-11-10T13:56:05.298106+00:00"
  },
  {
    "id": "d26a41e4-1e53-467e-b16e-623eb4c02c89",
    "name": "GC2005 Two-Seater Racing Go Kart",
    "description": "The GC2005 Racing Go Kart features a unique double-seater design equipped with dual steering wheels and twin speed and brake pedals for shared driving control. Powered by a strong 200cc 6.5HP 4-stroke engine featuring a smooth wet clutch system, this kart ensures safe handling with a sharp 1.5-meter braking distance. Built on a wide, stable chassis with comfortable ground clearance, it offers a thrilling tandem racing experience perfect for tracks and training.\r\n\r\nKey Features:\r\n• Double seaters for tandem riding\r\n• Double steering wheels for shared driving control\r\n• Double speed and brake pedals for dual instruction or operation\r\n• Powerful 200cc 6.5HP 4-stroke engine with wet clutch system\r\n• Pull-start ignition with optional electric start\r\n• Top speed: 50–70 km/h\r\n• Efficient rear caliper disc brake with 1.5m braking distance\r\n• Durable chain-drive transmission\r\n• High load capacity: Over 200 kg (440 lbs)\r\n• Fuel tank capacity: 3.5 litres\r\n• Stable track design with 50 mm ground clearance\r\n• Front tyres: 10 × 4.5-5\r\n• Rear tyres: 11 × 7.1-5\r\n• Overall dimensions: 2020 × 1550 × 650 mm\r\n• Net weight: 135 kg (Gross weight: 150 kg)\r\n• Available in multiple colours (Black, Red, Blue, Orange)\r\n• OEM customization available on mass orders\r\n• Alternative power upgrade available in a 270cc model",
    "price": 1800,
    "original_price": 2250,
    "sku": "MMR-GC2005-TWO-SEATE",
    "stock": 1000,
    "images": [
      "/images/gc2005-two-seater-racing-go-kart.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 50,
    "dimensions": "Range: 65 KM",
    "rating": 4.89,
    "reviews": 73,
    "created_at": "2026-10-13T19:01:00.484181+00:00",
    "updated_at": "2026-11-10T13:55:58.113272+00:00"
  },
  {
    "id": "6a26cd23-2bec-4533-951b-a9b4194341bd",
    "name": "GC1101 110cc Off-Road Go Kart",
    "description": "The GC1101 is a proven off-road go-kart designed for reliable recreational riding. Its 110cc 4-stroke engine, automatic transmission with reverse, electric start, disc brakes, and durable chain drive make it a practical choice for riders looking for dependable performance on private tracks, farms, trails, and open terrain.\r\n\r\nKey Features:\r\n\r\n* 110cc single-cylinder 4-stroke air-cooled engine\r\n* One forward gear with reverse\r\n* Electric start with 12V 5Ah battery\r\n* Front and rear disc brakes\r\n* Durable chain-drive transmission\r\n* Load capacity of over 150 kg\r\n* Ground clearance of 120 mm\r\n* Top speed of over 40 km/h (25 mph)\r\n* Riding range of up to 50 km (31 miles)\r\n* Climbing capability of at least 15°\r\n* Compact 6-inch wheel setup\r\n* Proven factory design with over 5,000 units produced\r\n* Stable and dependable construction\r\n* Available in black, red, blue, orange, and other colours\r\n\r\nSpecifications:\r\n\r\n* Model: GC1101\r\n* Engine: 110cc, 4-stroke, air-cooled\r\n* Transmission: 1 forward gear with reverse\r\n* Starting system: Electric start\r\n* Battery: 12V 5Ah\r\n* Load capacity: >150 kg\r\n* Ground clearance: 120 mm\r\n* Fuel tank capacity: 6.2 litres\r\n* Top speed: >40 km/h (25 mph)\r\n* Riding range: Up to 50 km (31 miles)\r\n* Climbing capacity: ≥15°\r\n* Net weight: 93 kg (204.6 lbs)\r\n* Gross weight: 118 kg (259.6 lbs)\r\n\r\nDimensions:\r\n\r\n* Overall dimensions: 1680 × 1030 × 1180 mm\r\n* Carton size: 161 × 82 × 52 cm per unit\r\n\r\nBraking System:\r\n\r\n* Front disc brakes\r\n* Rear disc brakes\r\n\r\nDrive System:\r\n\r\n* Chain-drive transmission\r\n\r\nWheels & Tyres:\r\n\r\n* Front: 145 × 70-6 (6-inch)\r\n* Rear: 145 × 70-6 (6-inch)\r\n\r\nAvailable Colours:\r\n\r\n* Black\r\n* Red\r\n* Blue\r\n* Orange\r\n* Additional colours may be available\r\n\r\nIdeal For:\r\n\r\n* Recreational off-road riding\r\n* Farms and private properties\r\n* Trails and dirt tracks\r\n* Outdoor family recreation\r\n* Private tracks",
    "price": 400,
    "original_price": 500,
    "sku": "MMR-GC1101-110CC-OFF",
    "stock": 5000,
    "images": [
      "/images/gc1101-110cc-off-road-go-kart.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 70,
    "dimensions": "Range: 50 km",
    "rating": 4.97,
    "reviews": 97,
    "created_at": "2026-10-13T19:01:00.091525+00:00",
    "updated_at": "2026-11-10T13:55:57.637648+00:00"
  },
  {
    "id": "0e8695f7-cddc-4ab0-b332-06aa813272e0",
    "name": "EA5601 Pro 8KW Electric 4-Wheel Scooter",
    "description": "The EA5601 Pro 8KW Electric 4-Wheel Scooter delivers exceptional power, outstanding traction, and all-terrain capability for riders who demand the very best. Equipped with four high-performance hub motors, a high-capacity lithium battery, and advanced suspension, it provides a smooth, stable, and confident ride across farms, estates, trails, and rugged outdoor terrain.\r\n\r\nKey Features:\r\n• Four independent 2000W brushless AC hub motors (8000W total output)\r\n• Four-wheel drive (4WD) system\r\n• 60V 50Ah lithium battery pack\r\n• Top speed: Up to 55 km/h\r\n• Riding range: Up to 80 km per charge\r\n• Front double swing arm suspension\r\n• Front and rear hydraulic disc brakes\r\n• IP66-rated motor controller\r\n• Forward and reverse drive\r\n• Overload protection system\r\n• Foldable design with detachable seat\r\n• Full aluminium wheel rims\r\n• Rear tow bar\r\n• Rear storage toolbox\r\n• Tubeless all-terrain tyres\r\n• Maximum load capacity: 300 kg (660 lbs)\r\n• Maximum climbing ability: 55°\r\n• Ground clearance: 220 mm\r\n• Charging input: 80–240V AC, 50–60Hz, 7A\r\n• Front tyres: 230 × 70-10 Tubeless\r\n• Rear tyres: 230 × 70-10 Tubeless\r\n• Overall dimensions: 1750 × 1400 × 1403 mm\r\n• Available in Red, Blue, Black, Yellow, and additional colours",
    "price": 450,
    "original_price": 563,
    "sku": "MMR-EA5601-PRO-8KW-E",
    "stock": 500,
    "images": [
      "/images/ea5601-pro-8kw-electric-4-wheel-scooter.png"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 55,
    "dimensions": "Range: 80 km",
    "rating": 4.98,
    "reviews": 63,
    "created_at": "2026-10-13T19:00:59.711229+00:00",
    "updated_at": "2026-11-10T13:55:57.272283+00:00"
  },
  {
    "id": "a7339ad0-ac00-46f0-a8fc-1fac6b071414",
    "name": "GC0901 Kids Off-Road Go Kart",
    "description": "The GC0901 Go Kart is an economical, single-seat model specifically sized for kids. It is powered by a dependable 90cc 2.4HP 4-stroke engine equipped with a dry clutch system and a simple pull-start mechanism. Built with a sturdy chain-drive transmission and responsive rear caliper disc brakes, it ensures a controlled ride with a short 1.5-meter stopping distance. It is an affordable and durable option for young racers learning the ropes.\r\n\r\nKey Features:\r\n• Single-seater design perfectly sized for kids\r\n• Dependable 90cc 2.4HP 4-stroke engine with dry clutch system\r\n• Easy-to-use manual pull-start ignition\r\n• Top speed: Over 45 km/h\r\n• Efficient rear caliper disc brake with a 1.5m braking distance\r\n• Durable chain-drive transmission\r\n• Heavy-duty load capacity: Over 150 kg (330 lbs)\r\n• Fuel tank capacity: 2 litres\r\n• Reliable wheelbase of 1125 mm for stable handling\r\n• Front tyres: 10 × 3.6-5 inch\r\n• Rear tyres: 11 × 4.5-5 inch\r\n• Overall dimensions: 1380 × 1080 × 390 mm\r\n• Capable climbing ability: Greater than or equal to 10 degrees\r\n• Available in multiple colours (Black, Red, Blue, Orange)\r\n• Highly economical running and initial costs\r\n• OEM customization available on mass orders",
    "price": 1300,
    "original_price": 1625,
    "sku": "MMR-GC0901-KIDS-OFF-",
    "stock": 1000,
    "images": [
      "/images/gc0901-kids-off-road-go-kart.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 45,
    "dimensions": "Range: 60 KM",
    "rating": 4.91,
    "reviews": 25,
    "created_at": "2026-10-13T19:00:59.327123+00:00",
    "updated_at": "2026-11-10T13:55:58.553664+00:00"
  },
  {
    "id": "b1b379c4-dbfe-40bb-8891-c510e19312d9",
    "name": "GC2009 Off-Road Go Kart",
    "description": "The GC2009 Go Kart brings high performance to the track with a factory-latest design engineered for maximum durability. Powered by a reliable 168cc 6.5HP 4-stroke engine with a wet clutch system, it offers a thrilling yet secure ride thanks to an enforced vehicle frame and an updated rear caliper disc brake system. Built to handle heavy loads with a stable wheelbase, it is the perfect blend of strength, control, and off-road excitement.\r\n\r\nKey Features:\r\n• Enforced vehicle frame for enhanced durability\r\n• Updated rear caliper disc brake system\r\n• Factory latest aerodynamic chassis design\r\n• Powerful 168cc 6.5HP 4-stroke engine with wet clutch system\r\n• Pull-start ignition with optional electric start\r\n• Top speed: 50–70 km/h\r\n• Durable chain-drive transmission\r\n• Heavy-duty load capacity: Over 200 kg (440 lbs)\r\n• Fuel tank capacity: 7 litres\r\n• Compact track design with 40 mm ground clearance\r\n• Front tyres: 10 × 4.5-5\r\n• Rear tyres: 11 × 7.1-5\r\n• Wheelbase: 1040 mm\r\n• Overall dimensions: 1820 × 1060 × 600 mm\r\n• Net weight: 156 kg (Gross weight: 175 kg)\r\n• Available in multiple colours (Black, Red, Blue, Orange)\r\n• OEM customization available on mass orders\r\n• Power upgrades available on 200cc and 270cc models",
    "price": 1500,
    "original_price": 1875,
    "sku": "MMR-GC2009-OFF-ROAD-",
    "stock": 1000,
    "images": [
      "/images/GC2009 Off-Road Go Kart - $1200.webp",
      "/images/gc2009-off-road-go-kart.webp",
      "/images/GC2009 Off-Road Go Kart 2 - $1200.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 50,
    "dimensions": "Range: 45 KM",
    "rating": 4.87,
    "reviews": 76,
    "created_at": "2026-10-13T19:00:58.897982+00:00",
    "updated_at": "2026-11-10T13:56:08.452727+00:00"
  },
  {
    "id": "f20e8d65-ae61-4bc5-ab55-26a5e5992eda",
    "name": "200cc 4-Seater Off-Road Go Kart",
    "description": "The 200cc 4-Seater Off-Road Go Kart is designed for adults and combines a powerful GY6 engine, automatic clutch, independent suspension, and a large 15-liter fuel tank for comfortable and reliable off-road driving.\r\n\r\nKey Features:\r\n• Much larger size for adult\r\n• 200CC GY6 Engine, Auto Clutch\r\n• 4 Independent Shock Suspensions\r\n• Big 15 Liter Fuel Tank\r\n• Adjustable Seat Clearance\r\n• Full aluminum wheel-rim\r\n• 4-seat capacity\r\n• Front & rear hydraulic disc brake\r\n• Rear drive axle with integrated bridge differential\r\n• Minimum ground clearance: 180mm\r\n• Load capacity: ≥ 300Kkg/660Lbs\r\n• Climbing capacity: Over 15 degrees\r\n• Front wheel size: 23×7-10\r\n• Rear wheel size: 22×10-10\r\n• 12-inch wheels optional\r\n• Color available: Red, Blue, Orange, Yellow,Green etc.",
    "price": 650,
    "original_price": 813,
    "sku": "MMR-200CC-4-SEATER-O",
    "stock": 1000,
    "images": [
      "/images/200cc 4-Seater Off-Road Go Kart 1 - $550.webp",
      "/images/200cc-4-seater-off-road-go-kart.webp",
      "/images/200cc 4-Seater Off-Road Go Kart 3 - $550.webp.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 70,
    "dimensions": "Range: 120 KM",
    "rating": 4.88,
    "reviews": 63,
    "created_at": "2026-10-13T19:00:58.480665+00:00",
    "updated_at": "2026-11-10T13:55:56.572986+00:00"
  },
  {
    "id": "86ec3a05-2ce7-414a-9e5a-88a7ff53636c",
    "name": "X26 3000W Electric Dirt Bike",
    "description": "The X26 3000W Electric Dirt Bike is designed for riders seeking powerful electric performance, responsive handling, and all-terrain capability. Equipped with a 3000W motor and a 48V 20Ah lithium battery, this electric dirt bike delivers a top speed of 45–55 km/h, making it suitable for recreational off-road riding and exploring rugged trails.\r\n\r\nBuilt around a compact 14-inch fat-tire design, the X26 combines traction, stability, and maneuverability for varied riding conditions. Its hydraulic front suspension helps absorb impacts from uneven terrain, while the adjustable oil-hydraulic nitrogen rear shock absorber provides additional support and ride comfort.\r\n\r\nA chain-drive drivetrain transfers motor power to the rear wheel, while the 200 kg maximum load capacity accommodates the rider and additional gear within the specified limit. The lithium battery is designed for convenient recharging, with a stated charging time of approximately 3–4 hours from 0% to 100%.\r\n\r\nWith a claimed range of 70–100 km per charge and electric power delivery, the X26 offers a practical option for riders looking for a capable, rechargeable off-road bike.",
    "price": 400,
    "original_price": 500,
    "sku": "MMR-X26-3000W-ELECTR",
    "stock": 1000,
    "images": [
      "/images/b3 $ 400.webp",
      "/images/X26-3000w-electric-dirt-bike.webp"
    ],
    "videos": [],
    "category": "dirtBikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": false,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 55,
    "dimensions": "Range: 70–100 km",
    "rating": 4.93,
    "reviews": 20,
    "created_at": "2026-10-13T19:00:58.086968+00:00",
    "updated_at": "2026-11-10T13:55:56.027296+00:00"
  },
  {
    "id": "634f8a5e-08e3-4025-ad38-c30c28c4528f",
    "name": "EH-5000 72V 5000W Electric Go Kart",
    "description": "The EH-5000 Electric Go Kart delivers powerful acceleration, responsive handling, and dependable performance for recreational karting. Built with a robust 5000W electric motor, heavy-duty steel frame, and hydraulic disc brakes, it offers an exciting and reliable driving experience on private tracks and off-road terrain.\r\n\r\nKey Features:\r\n• High-performance 5000W permanent magnet synchronous motor\r\n• 72V lead-acid battery system\r\n• Peak power output up to 18 kW\r\n• Top speed up to 65 km/h\r\n• Four-wheel hydraulic disc braking system\r\n• Durable chain-drive transmission\r\n• Heavy-duty 4130 chromoly steel frame\r\n• Precision TIG and MIG welded chassis\r\n• Three-spoke sport steering wheel\r\n• Comfortable high-back seat\r\n• Maximum load capacity: 200 kg\r\n• Heavy-duty 13 × 6.5-6 tyres\r\n• Designed for recreational electric karting",
    "price": 400,
    "original_price": 500,
    "sku": "MMR-EH-5000-72V-5000",
    "stock": 1000,
    "images": [
      "/images/eh-5000-72v-5000w-electric-go-kart.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": false,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 60,
    "dimensions": "Range: Up to 85 KM",
    "rating": 4.86,
    "reviews": 27,
    "created_at": "2026-10-13T19:00:57.681066+00:00",
    "updated_at": "2026-11-10T13:55:55.29825+00:00"
  },
  {
    "id": "a66c14cc-957e-41ab-802c-0a6e8a3819bf",
    "name": "200cc Off-Road Go Kart",
    "description": "The 200cc Off-Road Go Kart combines dependable power, rugged durability, and responsive handling for exciting off-road adventures. Equipped with a reliable 200cc oil-cooled engine, heavy-duty suspension, and hydraulic braking, it's built to confidently tackle dirt tracks, trails, farms, and challenging terrain.\r\n\r\nKey Features:\r\n• Powerful 200cc single-cylinder 4-stroke oil-cooled engine\r\n• 6.5 HP power output\r\n• Pull-start ignition system\r\n• High ground clearance for superior off-road capability\r\n• Four heavy-duty shock absorbers\r\n• Rear hydraulic disc brake\r\n• Durable chain-drive transmission\r\n• Rugged all-terrain tyres\r\n• Maximum load capacity: 150 kg (330 lbs)\r\n• Maximum climbing ability: 25°\r\n• Ground clearance: 245 mm\r\n• Fuel tank capacity: 6.5 litres\r\n• Front & rear tyres: 16 × 7-8\r\n• Wheelbase: 1020 mm\r\n• Overall dimensions: 1420 × 1030 × 760 mm\r\n• Single-seat off-road design",
    "price": 400,
    "original_price": 500,
    "sku": "MMR-200CC-OFF-ROAD-G",
    "stock": 500,
    "images": [
      "/images/200cc-off-road-go-kart.png"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 65,
    "dimensions": "Range: 75 Km",
    "rating": 4.93,
    "reviews": 50,
    "created_at": "2026-10-13T19:00:57.277004+00:00",
    "updated_at": "2026-11-10T13:55:54.728526+00:00"
  },
  {
    "id": "d302149a-4381-4e1a-80bb-4d89fa3181cd",
    "name": "Cross Cart 212cc Go Kart",
    "description": "The Cross Cart 212cc Go Kart delivers dependable power, rugged durability, and responsive handling for exciting off-road adventures. Featuring a reliable 212cc OHV engine, Forward-Neutral-Reverse gearbox, independent suspension, and hydraulic braking, it's built to tackle dirt tracks, trails, farms, and challenging terrain with confidence.\r\n\r\nKey Features:\r\n• Powerful 212cc OHV single-cylinder 4-stroke oil-cooled engine\r\n• Forward-Neutral-Reverse (F-N-R) gearbox\r\n• Pull-start ignition\r\n• Top speed: Over 60 km/h\r\n• Four independent shock absorbers\r\n• Adjustable leg clearance for improved rider comfort\r\n• Rear hydraulic disc brake\r\n• Durable chain-drive transmission\r\n• Rugged all-terrain tyres\r\n• Maximum load capacity: 200 kg\r\n• Maximum climbing ability: 35°\r\n• Ground clearance: 200 mm\r\n• Fuel tank capacity: 6.5 litres\r\n• Front tyres: 16 × 8-7\r\n• Rear tyres: 16 × 8-7\r\n• Wheelbase: 1200 mm\r\n• Overall dimensions: 1450 × 1010 × 1200 mm\r\n• Single-seat off-road design",
    "price": 350,
    "original_price": 438,
    "sku": "MMR-CROSS-CART-212CC",
    "stock": 300,
    "images": [
      "/images/cross-cart-212cc-go-kart.png"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 60,
    "dimensions": "Range: 75 km",
    "rating": 4.95,
    "reviews": 48,
    "created_at": "2026-10-13T19:00:56.876128+00:00",
    "updated_at": "2026-11-10T13:55:56.923214+00:00"
  },
  {
    "id": "aba4cf92-ffbd-485b-8d2e-2406fa4077a9",
    "name": "3KW Electric Go Kart",
    "description": "The 3KW Electric Go Kart delivers exhilarating acceleration, long-range performance, and outstanding off-road capability. Powered by a 3000W brushless motor and a high-capacity 72V lithium battery, it's engineered for riders who want speed, control, and confidence across trails, tracks, and challenging terrain.\r\n\r\nKey Features:\r\n• Powerful 3000W brushless electric motor\r\n• 72V 35Ah lithium battery\r\n• Top speed: Up to 75 km/h\r\n• Riding range: Up to 65 km per charge\r\n• Three selectable speed modes\r\n• Forward and reverse drive\r\n• Smooth thumb throttle control\r\n• Front double swing arm suspension\r\n• Four independent shock absorbers\r\n• High-efficiency gearbox shaft drive\r\n• Dual rear disc brakes\r\n• Large AT19 × 7-8 all-terrain tyres\r\n• Maximum load capacity: 200 kg (440 lbs)\r\n• Maximum climbing ability: 25°\r\n• Ground clearance: 230 mm\r\n• Charging time: 4–6 hours\r\n• Overall dimensions: 1500 × 1050 × 800 mm\r\n• Available in White, Black, Red, Pink, Yellow, Orange, and additional colours",
    "price": 530,
    "original_price": 663,
    "sku": "MMR-3KW-ELECTRIC-GO-",
    "stock": 350,
    "images": [
      "/images/3kw-electric-go-kart.png"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 75,
    "dimensions": "Range: 65 km",
    "rating": 4.96,
    "reviews": 55,
    "created_at": "2026-10-13T19:00:56.461091+00:00",
    "updated_at": "2026-11-10T13:56:18.952423+00:00"
  },
  {
    "id": "a411ff8f-9ef6-4365-bb5e-48f3f2c50e2e",
    "name": "EA5601 4×4 Electric All-Terrain Vehicle (ATV)",
    "description": "The EA5601 4×4 Electric ATV combines exceptional power, advanced traction, and rugged durability for demanding off-road adventures. Equipped with four independent brushless hub motors, a high-capacity lithium battery, and hydraulic disc brakes, it delivers confident performance across farms, trails, estates, and challenging outdoor terrain.\r\n\r\nKey Features:\r\n• Four independent 1400W brushless AC hub motors (5600W total output)\r\n• Four-wheel drive (4WD) system\r\n• 60V 50Ah lithium battery pack\r\n• Top speed: Up to 55 km/h\r\n• Riding range: Up to 80 km per charge\r\n• Front double swing arm suspension\r\n• Front and rear hydraulic disc brakes\r\n• IP66-rated motor controller\r\n• Forward and reverse drive\r\n• Overload protection system\r\n• Foldable design with detachable seat\r\n• Full aluminium wheel rims\r\n• Rear tow bar\r\n• Rear storage toolbox\r\n• Tubeless all-terrain tyres\r\n• Maximum load capacity: 300 kg (660 lbs)\r\n• Maximum climbing ability: 55°\r\n• Ground clearance: 220 mm\r\n• Charging input: 80–240V AC, 50–60Hz, 7A\r\n• Front tyres: 230 × 70-10 Tubeless\r\n• Rear tyres: 230 × 70-10 Tubeless\r\n• Overall dimensions: 1750 × 1400 × 1403 mm\r\n• Available in Red, Blue, Black, Yellow, and additional colours",
    "price": 400,
    "original_price": 500,
    "sku": "MMR-EA5601-4X4-ELECT",
    "stock": 300,
    "images": [
      "/images/ea5601-4x4-electric-all-terrain-vehicle-atv.png"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 55,
    "dimensions": "Range: 80 km",
    "rating": 4.99,
    "reviews": 35,
    "created_at": "2026-10-13T19:00:56.051961+00:00",
    "updated_at": "2026-11-10T13:55:54.283247+00:00"
  },
  {
    "id": "085a260d-4a18-480c-844a-fe862476ed3a",
    "name": "GC2010 200cc Off-Road Sand Buggy Go Kart",
    "description": "The GC2010 200cc Off-Road Sand Buggy Go Kart is engineered for riders who demand power, comfort, and dependable off-road performance. Equipped with a reliable 200cc single-cylinder 4-stroke air-cooled engine, this buggy delivers smooth acceleration and excellent durability for recreational riding across dirt tracks, trails, farms, and open terrain.\r\n\r\nDesigned with rider comfort in mind, the GC2010 features a spacious single-seat layout with a semi-covered leather seat, adjustable seating position, and adjustable steering wheel. Four independent shock absorbers provide excellent ride quality over rough surfaces, while front and rear hydraulic disc brakes deliver confident stopping power in challenging conditions.\r\n\r\nA chain-driven automatic transmission and electric start make operation simple and reliable, while the large 12-inch wheels provide outstanding grip and stability. With a tight 3.2-metre turning radius, 192 mm of ground clearance, and a climbing capability of up to 25 degrees, the GC2010 is ready for demanding off-road adventures.\r\n\r\nBuilt for durability, control, and all-day riding enjoyment, the GC2010 offers an excellent combination of performance, safety, and practicality for recreational off-road enthusiasts.",
    "price": 350,
    "original_price": 438,
    "sku": "MMR-GC2010-200CC-OFF",
    "stock": 1000,
    "images": [
      "/images/gc2010-200cc-off-road-sand-buggy-go-kart.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": false,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 60,
    "dimensions": "Range: Up to 100 km",
    "rating": 4.93,
    "reviews": 105,
    "created_at": "2026-10-13T19:00:55.651168+00:00",
    "updated_at": "2026-11-10T13:56:03.363289+00:00"
  },
  {
    "id": "214aa791-1e78-4638-8889-f0465ace9d78",
    "name": "GC2701 270cc Off-Road Go Kart",
    "description": "The GC2701 270cc Off-Road Go Kart is designed for riders seeking reliable performance, responsive handling, and all-terrain capability. Built with a durable 4-stroke engine, independent suspension, and a rugged chassis, it delivers a comfortable and exciting driving experience on dirt tracks, trails, farms, and private property.\r\n\r\nKey Features:\r\n• Available with 168cc, 198cc, or 270cc engine options\r\n• Reliable single-cylinder 4-stroke oil-cooled engine\r\n• Pull-start system with optional electric start\r\n• Durable chain-drive transmission\r\n• Four independent shock absorbers\r\n• Rear single disc brake\r\n• Rugged 7-inch off-road tyres\r\n• Fuel tank capacity: 5.0 litres\r\n• Maximum load capacity: 110 kg (242 lbs)\r\n• Minimum ground clearance: 190 mm\r\n• Wheelbase: 1250 mm\r\n• Overall dimensions: 2015 × 950 × 760 mm\r\n• Single-seat design\r\n• Built for recreational off-road riding",
    "price": 350,
    "original_price": 438,
    "sku": "MMR-GC2701-270CC-OFF",
    "stock": 1000,
    "images": [
      "/images/gc2701-270cc-off-road-go-kart.png"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 60,
    "dimensions": "Range: 75 KM",
    "rating": 4.95,
    "reviews": 41,
    "created_at": "2026-10-13T19:00:55.253914+00:00",
    "updated_at": "2026-11-10T13:55:53.193136+00:00"
  },
  {
    "id": "c542cf85-f5c4-43cb-91de-c61c559a30b4",
    "name": "M1 2X2 Dual Motor Electric Scooter",
    "description": "The M1 2X2 Dual Motor Electric Scooter delivers exceptional power, stability, and comfort for riders who demand more from their electric scooter. Featuring dual 800W hub motors, advanced suspension, and a rugged aluminium frame, it's built for high-performance commuting, off-road exploration, and recreational riding.\r\n\r\nKey Features:\r\n• Dual 800W brushless hub motors (1600W total output)\r\n• Four-wheel traction through front and rear motor drive\r\n• Top speed up to 65 km/h\r\n• Riding range up to 60 km per charge\r\n• 48V 18Ah lithium battery\r\n• Fast 4–6 hour charging time\r\n• Maximum climbing ability: 40°\r\n• Maximum load capacity: 150 kg\r\n• Aviation-grade aluminium frame\r\n• Quick 5-second folding mechanism\r\n• Front and rear suspension\r\n• Front and rear disc brakes\r\n• Smart LCD display\r\n• Front and rear LED lights\r\n• 11-inch tubeless off-road tyres\r\n• Wheelbase: 950 mm\r\n• Overall dimensions: 1160 × 260 × 1110 mm\r\n• Optional accessories include detachable seat, rear cargo rack, storage bag, mobile phone holder, flashing deck, hydraulic brakes, front bar lock, and bell.",
    "price": 300,
    "original_price": 375,
    "sku": "MMR-M1-2X2-DUAL-MOTO",
    "stock": 1000,
    "images": [
      "/images/m1-2x2-dual-motor-electric-scooter.png"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 65,
    "dimensions": "Range: 60 km",
    "rating": 4.89,
    "reviews": 64,
    "created_at": "2026-10-13T19:00:54.840027+00:00",
    "updated_at": "2026-11-10T13:55:53.918917+00:00"
  },
  {
    "id": "9ea56b3a-303d-4d7b-8481-6f387068cf12",
    "name": "ES2510 400W Foldable Electric Scooter",
    "description": "The ES2510 400W Foldable Electric Scooter combines smooth electric performance, rider comfort, and everyday practicality in a lightweight, portable design. Featuring a 400W brushless motor, front and rear suspension, and a convenient folding frame, it's an ideal choice for commuting, campus travel, and leisure rides.\r\n\r\nKey Features:\r\n• Powerful 400W brushless hub motor\r\n• 36V 10Ah lithium battery\r\n• Top speed: 25–35 km/h\r\n• Riding range: Up to 40 km per charge\r\n• Lightweight and portable folding design\r\n• Foldable handlebars for easy storage and transport\r\n• Front and rear suspension\r\n• Adjustable seat height\r\n• Front LED headlight\r\n• Front and rear disc brakes\r\n• Rear hub motor drive\r\n• 10-inch inflatable tyres\r\n• Maximum load capacity: 150 kg\r\n• Maximum climbing ability: 15°\r\n• Charging time: 4–6 hours\r\n• Overall dimensions: 1100 × 560 × 1200 mm\r\n• Folded dimensions: 1000 × 250 × 300 mm\r\n• Wheelbase: 850 mm\r\n• Available in White, Black, and Grey",
    "price": 320,
    "original_price": 400,
    "sku": "MMR-ES2510-400W-FOLD",
    "stock": 1000,
    "images": [
      "/images/es2510-400w-foldable-electric-scooter.png"
    ],
    "videos": [],
    "category": "Micro-Cars",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 35,
    "dimensions": "Range: 40 km",
    "rating": 4.85,
    "reviews": 111,
    "created_at": "2026-10-13T19:00:54.448048+00:00",
    "updated_at": "2026-11-10T13:56:02.933333+00:00"
  },
  {
    "id": "32a99865-16f2-4cd4-8d00-73601cd94983",
    "name": "125cc Dirt Bike",
    "description": "Built around a 125cc engine with a maximum speed of 40–60 km/h, this lightweight dirt bike combines compact dimensions with practical off-road performance. With an overall weight of 65 kg and maximum engine power of 5.6 kW, it is designed for riders looking for a compact and agile motorcycle.\r\n\r\n* 125cc displacement\r\n* Maximum speed of 40–60 km/h\r\n* Maximum engine power of 5.6 kW\r\n* Lightweight 65 kg overall weight\r\n* Overall dimensions of 1600 × 750 × 990 mm\r\n* New condition\r\n* Manufactured in China",
    "price": 400,
    "original_price": 500,
    "sku": "MMR-125CC-DIRT-BIKE",
    "stock": 1000,
    "images": [
      "/images/b2 - $400.webp",
      "/images/125cc-dirt-bike.webp"
    ],
    "videos": [],
    "category": "dirtBikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": true,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 60,
    "dimensions": "Range: 90 KM",
    "rating": 4.97,
    "reviews": 34,
    "created_at": "2026-10-13T19:00:54.049331+00:00",
    "updated_at": "2026-11-10T13:56:18.952423+00:00"
  },
  {
    "id": "8d78b869-c598-46c8-ab62-06cefd98cc05",
    "name": "60V Electric Dirt Bike",
    "description": "The 60V Electric Dirt Bike combines a lightweight aluminum frame with large 19-inch front and 17-inch rear tires for stability and handling across off-road terrain.\r\n\r\n* 60V electric motorcycle\r\n* Maximum speed: >80 km/h\r\n* Aluminum frame construction\r\n* Front 19-inch and rear 17-inch aluminum tires\r\n* Front hydraulic shock absorption\r\n* Rear spring suspension\r\n* Front and rear disc brakes\r\n* Hydraulic disc brakes for responsive stopping power\r\n* Maximum load capacity: 200 kg\r\n* LCD speed meter and power indicator\r\n* LED headlight, brake light, and front/rear turn signals\r\n* Normal start function\r\n* Single seat\r\n* Price listed without battery\r\n\r\nMotorcycle Type: Electric Motorcycle\r\nVoltage: 60V\r\nPlace of Origin: Zhejiang\r\nDashboard: LCD speed meter and power indicator\r\nTire: Front 19-inch + Rear 17-inch aluminum tires\r\nLight: LED headlight + Brake light + Front and rear turning light\r\nSuspension: Front hydraulic shock absorption / Rear spring\r\nStart function: Normal start\r\nSeat: Single seat\r\nBrakes: Front and Rear Disc Brake\r\nMax load: 200 kg",
    "price": 400,
    "original_price": 500,
    "sku": "MMR-60V-ELECTRIC-DIR",
    "stock": 2000,
    "images": [
      "/images/b1-$250.webp",
      "/images/60v-electric-dirt-bike.webp"
    ],
    "videos": [],
    "category": "dirtBikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": false,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 45,
    "dimensions": "Range: 55 KM",
    "rating": 4.88,
    "reviews": 112,
    "created_at": "2026-10-13T19:00:53.643847+00:00",
    "updated_at": "2026-11-10T13:56:18.952423+00:00"
  },
  {
    "id": "0e6b14b8-7a22-4510-9624-2f5b34ae7762",
    "name": "6000W Electric Dirt Bike",
    "description": "Built around a powerful 6000W mid-drive motor, this electric dirt bike delivers strong acceleration, high-speed performance, and substantial climbing capability. Its 60V 50Ah battery provides up to 110 miles of stated range, while the 19-inch front and 16-inch rear tires provide a versatile setup for adult riders.\r\n\r\n* 6000W peak mid-drive motor\r\n* 300Nm maximum torque\r\n* 65 MPH top speed\r\n* 60V 50Ah battery\r\n* 3000Wh battery capacity\r\n* Up to 110 miles stated range\r\n* Triple-mode drive\r\n* Front 19\" × 2.8\" tire\r\n* Rear 16\" × 3.5\" tire\r\n* Twist throttle\r\n* Available in one size: 19\" / 16\"\r\n* Suitable for riders from 5'1\" to 6'5\"\r\n* Weight: 238 lbs",
    "price": 700,
    "original_price": 875,
    "sku": "MMR-6000W-ELECTRIC-D",
    "stock": 2000,
    "images": [
      "/images/b5 - $280.webp",
      "/images/6000w-electric-dirt-bike.webp"
    ],
    "videos": [],
    "category": "dirtBikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": false,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 65,
    "dimensions": "Range: Up to 110 miles",
    "rating": 4.88,
    "reviews": 62,
    "created_at": "2026-10-13T19:00:53.241102+00:00",
    "updated_at": "2026-11-10T13:55:51.312883+00:00"
  },
  {
    "id": "c7bc8092-bd1e-4044-bab8-996aa6bc4211",
    "name": "60V 5000W High-Speed Electric Drift Kart",
    "description": "The 60V 5000W High-Speed Electric Drift Kart is built for riders who want serious speed, long-range electric performance, and responsive drift control. Its high-carbon steel frame, CATL LiFePO4 battery, and powerful mid-mounted motor make it ready for demanding indoor and outdoor track riding.\r\n\r\n- 5000W peak power electric drift system\r\n- 2500W rated motor power\r\n- Mid-mounted permanent-magnet DC motor\r\n- 60V 30Ah CATL LiFePO4 battery\r\n- Up to 70 km/h top speed\r\n- Up to 60 km riding range\r\n- 6–7 hour charging time\r\n- FarDriver controller\r\n- High-carbon steel frame\r\n- Three-piston caliper braking system\r\n- Front and rear three-piston disc brakes\r\n- Ultra wear-resistant rubber tyres\r\n- Maximum load capacity of 200 kg\r\n- Net weight of 93.3 kg\r\n- Designed for indoor and outdoor track riding\r\n- Available in Red, Black, White, Blue, and Purple\r\n- CE certified\r\n- Complete vehicle\r\n- Customized configuration available",
    "price": 350,
    "original_price": 438,
    "sku": "MMR-60V-5000W-HIGH-S",
    "stock": 1000,
    "images": [
      "/images/60v-5000w-high-speed-electric-drift-kart.webp",
      "/images/mm1.webp",
      "/images/mm2.webp"
    ],
    "videos": [],
    "category": "Trikes",
    "brand": "Midget Micro Drive & Rides",
    "is_active": true,
    "is_new": false,
    "shipping_required": true,
    "average_delivery_time": "2-4 business days (US Texas Depot)",
    "store_location": "Shenzhen Technology & Electric Mobility Hub, China",
    "weight": 70,
    "dimensions": "Range: 60 km",
    "rating": 4.85,
    "reviews": 52,
    "created_at": "2026-10-13T19:00:52.767816+00:00",
    "updated_at": "2026-11-10T13:55:49.248765+00:00"
  }
]

/**
 * Ensures all product media files (/images/...) exist locally in client/public/images
 * (and dist/images if built) by downloading any missing assets from https://midgetdriftcarsandebikes.shop
 */
async function ensureLocalMediaAssets() {
  const clientImagesDir = path.resolve('client/public/images')
  const distImagesDir = path.resolve('dist/images')

  if (!fs.existsSync(clientImagesDir)) {
    fs.mkdirSync(clientImagesDir, { recursive: true })
  }

  const allMediaPaths = new Set()
  for (const product of CURRENT_PRODUCTS) {
    for (const img of product.images || []) {
      if (img && img.startsWith('/images/')) allMediaPaths.add(img)
    }
    for (const vid of product.videos || []) {
      if (vid && vid.startsWith('/images/')) allMediaPaths.add(vid)
    }
  }

  let verifiedCount = 0
  let downloadedCount = 0

  for (const mediaPath of allMediaPaths) {
    const filename = mediaPath.replace(/^\/images\//, '')
    const localFilePath = path.join(clientImagesDir, filename)

    if (fs.existsSync(localFilePath)) {
      verifiedCount++
    } else {
      const encodedUrl =
        SOURCE_MEDIA_ORIGIN +
        mediaPath
          .split('/')
          .map((seg, idx) => (idx === 0 && seg === '' ? '' : encodeURIComponent(decodeURIComponent(seg))))
          .join('/')

      try {
        const res = await fetch(encodedUrl)
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer())
          fs.writeFileSync(localFilePath, buf)
          downloadedCount++
        } else {
          console.warn(`⚠️ Media asset HTTP ${res.status}: ${encodedUrl}`)
        }
      } catch (err) {
        console.warn(`⚠️ Could not download media asset ${encodedUrl}: ${err.message}`)
      }
    }

    // Sync to dist/images if dist exists
    if (fs.existsSync(distImagesDir) && fs.existsSync(localFilePath)) {
      const distFilePath = path.join(distImagesDir, filename)
      if (!fs.existsSync(distFilePath)) {
        try {
          fs.copyFileSync(localFilePath, distFilePath)
        } catch {}
      }
    }
  }

  console.log(`🖼️  Media check complete: ${verifiedCount} already present locally, ${downloadedCount} downloaded from ${SOURCE_MEDIA_ORIGIN}.`)
}

async function seedViaSupabaseClient(supabaseUrl, supabaseKey) {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  })

  // Remove old placeholder products if present
  await supabase.from('products').delete().in('id', ['prod_001', 'prod_002', 'prod_003', 'prod_004', 'prod_005', 'prod_006'])

  const { error } = await supabase.from('products').upsert(CURRENT_PRODUCTS, { onConflict: 'sku' })
  if (error) throw error

  const { count, error: countError } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
  if (countError) throw countError

  console.log(`✅ Successfully seeded ${CURRENT_PRODUCTS.length} products via Supabase API! Total products in DB: ${count}`)
}

async function seedViaPostgres(databaseUrl) {
  const client = new Client({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } })
  await client.connect()
  console.log('Connected to PostgreSQL for catalog seeding.')

  await client.query("DELETE FROM public.products WHERE id IN ('prod_001', 'prod_002', 'prod_003', 'prod_004', 'prod_005', 'prod_006')")

  for (const p of CURRENT_PRODUCTS) {
    const queryText = `
      INSERT INTO public.products (
        id, name, description, price, original_price, sku, stock, images, videos,
        category, brand, is_active, is_new, shipping_required, average_delivery_time,
        store_location, weight, dimensions, rating, reviews, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14, $15,
        $16, $17, $18, $19, $20, $21, $22
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
        updated_at = NOW()
    `

    await client.query(queryText, [
      p.id,
      p.name,
      p.description,
      p.price,
      p.original_price,
      p.sku,
      p.stock,
      p.images,
      p.videos,
      p.category,
      p.brand,
      p.is_active,
      p.is_new,
      p.shipping_required,
      p.average_delivery_time,
      p.store_location,
      p.weight,
      p.dimensions,
      p.rating,
      p.reviews,
      p.created_at,
      p.updated_at
    ])
  }

  const countRes = await client.query('SELECT count(*) FROM public.products')
  console.log(`✅ Successfully seeded ${CURRENT_PRODUCTS.length} products via PostgreSQL! Total products in DB: ${countRes.rows[0].count}`)
  await client.end()
}

async function seed() {
  await ensureLocalMediaAssets()

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
  const databaseUrl = process.env.DATABASE_URL

  if (supabaseUrl && supabaseKey) {
    try {
      await seedViaSupabaseClient(supabaseUrl, supabaseKey)
      return
    } catch (err) {
      console.warn('Supabase REST upsert notice, falling back to DATABASE_URL if available:', err.message)
    }
  }

  if (databaseUrl) {
    await seedViaPostgres(databaseUrl)
    return
  }

  throw new Error('Missing SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY or DATABASE_URL in .env')
}

seed().catch((err) => {
  console.error('❌ Seeding error:', err)
  process.exit(1)
})
