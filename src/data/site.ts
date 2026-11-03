import kasol from "@/assets/trip-kasol.jpg";
import manali from "@/assets/trip-manali.jpg";
import amritsar from "@/assets/trip-amritsar.jpg";

export const WHATSAPP_NUMBER = "919876543210";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type VehicleType = "Car" | "Bike" | "Bus";

export type City = {
  name: string;
  colleges: string;
};

export const cities: City[] = [
  { name: "Patiala", colleges: "Thapar, Punjabi University" },
  { name: "Ludhiana", colleges: "PAU, GNE" },
  { name: "Jalandhar", colleges: "LPU, NIT Jalandhar" },
  { name: "Chandigarh", colleges: "PU, PEC, Chitkara" },
  { name: "Amritsar", colleges: "GNDU" },
  { name: "Bathinda", colleges: "Giani Zail Singh, CUP" },
  { name: "Mohali", colleges: "CGC Landran, ISB" },
  { name: "Phagwara", colleges: "LPU (main campus)" },
  { name: "Hoshiarpur", colleges: "Rayat Bahra, DAV" },
  { name: "Pathankot", colleges: "Sri Sai University" },
  { name: "Sangrur", colleges: "Bhai Gurdas Group" },
  { name: "Moga", colleges: "Lala Lajpat Rai" },
];

export type Vehicle = {
  id: string;
  name: string;
  type: VehicleType;
  seats: number;
  pricePerDay: number;
  studentPrice: number;
  fuelPolicy: string;
  driveOptions: string[];
  available: number;
  rating: number;
  trips: number;
};

export const vehicles: Vehicle[] = [
  {
    id: "swift-dzire",
    name: "Maruti Swift Dzire",
    type: "Car",
    seats: 4,
    pricePerDay: 2200,
    studentPrice: 1799,
    fuelPolicy: "Fuel not included · return same level",
    driveOptions: ["Self-drive", "With driver"],
    available: 3,
    rating: 4.6,
    trips: 212,
  },
  {
    id: "ertiga",
    name: "Maruti Ertiga (7-seater)",
    type: "Car",
    seats: 7,
    pricePerDay: 3200,
    studentPrice: 2699,
    fuelPolicy: "Fuel not included · 300 km/day free",
    driveOptions: ["With driver"],
    available: 2,
    rating: 4.8,
    trips: 164,
  },
  {
    id: "innova",
    name: "Toyota Innova Crysta",
    type: "Car",
    seats: 7,
    pricePerDay: 4200,
    studentPrice: 3699,
    fuelPolicy: "Fuel not included · hill-ready",
    driveOptions: ["With driver"],
    available: 1,
    rating: 4.9,
    trips: 98,
  },
  {
    id: "classic-350",
    name: "Royal Enfield Classic 350",
    type: "Bike",
    seats: 2,
    pricePerDay: 1100,
    studentPrice: 849,
    fuelPolicy: "Fuel not included · helmets free",
    driveOptions: ["Self-drive"],
    available: 6,
    rating: 4.7,
    trips: 340,
  },
  {
    id: "himalayan",
    name: "RE Himalayan 411",
    type: "Bike",
    seats: 2,
    pricePerDay: 1500,
    studentPrice: 1199,
    fuelPolicy: "Fuel not included · saddle bags free",
    driveOptions: ["Self-drive"],
    available: 2,
    rating: 4.8,
    trips: 187,
  },
  {
    id: "activa",
    name: "Honda Activa 6G",
    type: "Bike",
    seats: 2,
    pricePerDay: 450,
    studentPrice: 349,
    fuelPolicy: "Fuel not included · city use",
    driveOptions: ["Self-drive"],
    available: 9,
    rating: 4.4,
    trips: 512,
  },
  {
    id: "tempo-17",
    name: "Tempo Traveller 17-seater",
    type: "Bus",
    seats: 17,
    pricePerDay: 8500,
    studentPrice: 7499,
    fuelPolicy: "Fuel + driver included",
    driveOptions: ["With driver"],
    available: 2,
    rating: 4.7,
    trips: 76,
  },
  {
    id: "bus-35",
    name: "Mini Bus 35-seater",
    type: "Bus",
    seats: 35,
    pricePerDay: 15000,
    studentPrice: 13499,
    fuelPolicy: "Fuel + driver + tolls included",
    driveOptions: ["With driver"],
    available: 1,
    rating: 4.5,
    trips: 41,
  },
];

export type Trip = {
  id: string;
  title: string;
  place: string;
  nights: string;
  perHead: number;
  seatsLeft: number;
  totalSeats: number;
  departs: string;
  image: string;
  includes: string[];
  vibe: string;
};

export const trips: Trip[] = [
  {
    id: "kasol",
    title: "Kasol × Kheerganga",
    place: "Himachal",
    nights: "2 nights / 3 days",
    perHead: 2499,
    seatsLeft: 5,
    totalSeats: 17,
    departs: "Every Friday, 9 PM · Chandigarh / Ludhiana pickup",
    image: kasol,
    includes: ["Tempo Traveller", "Camp stay", "2 breakfasts", "Trek guide"],
    vibe: "Riverside camps, bonfire, guitar wale log.",
  },
  {
    id: "manali",
    title: "Manali × Solang Snow Run",
    place: "Himachal",
    nights: "3 nights / 4 days",
    perHead: 3299,
    seatsLeft: 9,
    totalSeats: 20,
    departs: "Every Thursday, 8 PM · Jalandhar / Chandigarh pickup",
    image: manali,
    includes: ["Volvo + local cab", "Hostel dorm", "Snow point drop", "Cafe hopping"],
    vibe: "Old Manali cafes, snow, midnight maggi.",
  },
  {
    id: "amritsar",
    title: "Amritsar Darshan + Wagah",
    place: "Punjab",
    nights: "1 day trip",
    perHead: 899,
    seatsLeft: 12,
    totalSeats: 30,
    departs: "Every Sunday, 5 AM · Patiala / Ludhiana pickup",
    image: amritsar,
    includes: ["AC bus", "Golden Temple", "Wagah border", "Kulcha stop"],
    vibe: "Sasta, full desi, ek din mein sab kuch.",
  },
];

export type Review = {
  id: string;
  name: string;
  college: string;
  rating: number;
  text: string;
  trip: string;
  date: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Simran K.",
    college: "Thapar, Patiala",
    rating: 5,
    text: "Kasol trip was insane. Split fare feature ne budget bacha diya — 6 friends, ₹2499 each and sab kuch sorted.",
    trip: "Kasol × Kheerganga",
    date: "Aug 2026",
  },
  {
    id: "r2",
    name: "Arjun S.",
    college: "LPU, Jalandhar",
    rating: 4,
    text: "Himalayan bike clean thi aur driver verification proof bhi mila. Pickup 20 min late tha, baaki solid.",
    trip: "Self-drive · RE Himalayan",
    date: "Jul 2026",
  },
  {
    id: "r3",
    name: "Navneet C.",
    college: "GNDU, Amritsar",
    rating: 5,
    text: "Student ID discount actually applies, no drama. Wagah border trip ₹899 mein — hostel gang ka favourite.",
    trip: "Amritsar Darshan + Wagah",
    date: "Jul 2026",
  },
  {
    id: "r4",
    name: "Ritika M.",
    college: "PU, Chandigarh",
    rating: 5,
    text: "Group matching se 3 unknown girls ke saath group bana, ab we plan every month. Safe feel hua, driver verified tha.",
    trip: "Manali × Solang Snow Run",
    date: "Jun 2026",
  },
  {
    id: "r5",
    name: "Harman B.",
    college: "CGC Landran",
    rating: 4,
    text: "Ertiga with driver for a 2-day Shimla run. Pricing clear thi, no hidden toll charges at the end.",
    trip: "Ertiga · With driver",
    date: "Jun 2026",
  },
  {
    id: "r6",
    name: "Yuvraj D.",
    college: "PAU, Ludhiana",
    rating: 5,
    text: "Emergency support button use kiya jab tyre puncture hua — replacement cab 40 min mein aa gayi.",
    trip: "Self-drive · Swift Dzire",
    date: "May 2026",
  },
];
