/**
 * 
 * @author: fajar postman
 * 
 */

export const users = [
    {
        id: 1,
        name: "Fajar Dwi Rianto",
        email: "fajardwirianto3@gmail.com",
        password: "password",
        avatar: null,
        education: "S1"
    },
        {
        id: 2,
        name: "Admin Demo",
        email: "admindemo@gmail.com",
        password: "password",
        avatar: null,
        education: "S1"
    }
];

export const tests = [
    {
        id: "disc",
        title: "DISC Personality Test",
        description: "Discover your personality type with the DISC assessment.",
        durationSeconds: 120,
        questions: [
            { id: 1, text: "Saya lebih suka memimpin kelompok.", options: ["Setuju", "Netral", "Tidak Setuju"], correct: 0, score: 8 },
            { id: 2, text: "Saya nyaman bekerja sendiri.", options: ["Setuju", "Netral", "Tidak Setuju"], correct: 0, score: 8 },
            { id: 3, text: "Saya cepat membuat keputusan.", options: ["Setuju", "Netral", "Tidak Setuju"], correct: 0, score: 8 }
        ]
    },
    {
        id: "numeric",
        title: "Numeric Aptitude Test",
        description: "Test your numerical reasoning skills with this aptitude test.",
        durationSeconds: 120,
        questions: [
            { id: 1, text: "2 + 2 = ?", options: ["3", "4", "5"], correct: 1, score: 10 },
            { id: 2, text: "5 * 6 = ?", options: ["30", "35", "25"], correct: 0, score: 10 },
            { id: 3, text: "12 / 4 = ?", options: ["2", "3", "4"], correct: 1, score: 10 }
        ]
    }
]