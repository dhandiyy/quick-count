export const chartData = {
    labels: ["Paslon 1", "Paslon 2"],
    datasets: [
        {
            data: [6500, 3500],
            label: "Total Suara",
            backgroundColor: ["#2F9371", "rgb(96 165 250)"],
        },
    ]
}

export const totalData = {
    counted: 10000,
    uncounted: 3000
}

export const fullDummyData = [
    {
        "slug": "ambunten",
        "name": "Ambunten",
        "villages": [
            {
                "slug": "ambunten",
                "name": "Ambunten",
                "total": [12000, 18000]
            },
            {
                "slug": "banyupelle",
                "name": "Banyupelle",
                "total": [11000, 15000]
            },
            {
                "slug": "beluk",
                "name": "Beluk",
                "total": [8000, 12000]
            }
        ]
    },
    {
        "slug": "arjasa",
        "name": "Arjasa",
        "villages": [
            {
                "slug": "arjasa",
                "name": "Arjasa",
                "total": [15000, 13000]
            },
            {
                "slug": "banyubiru",
                "name": "Banyubiru",
                "total": [10000, 9000]
            },
            {
                "slug": "bluto",
                "name": "Bluto",
                "total": [11000, 14000]
            }
        ]
    },
    {
        "slug": "batang-batang",
        "name": "Batang-Batang",
        "villages": [
            {
                "slug": "batang-batang",
                "name": "Batang-Batang",
                "total": [14000, 16000]
            },
            {
                "slug": "banjar",
                "name": "Banjar",
                "total": [12000, 18000]
            }
        ]
    },
    {
        "slug": "dungkek",
        "name": "Dungkek",
        "villages": [
            {
                "slug": "dungkek",
                "name": "Dungkek",
                "total": [17000, 21000]
            },
            {
                "slug": "duri",
                "name": "Duri",
                "total": [13000, 14000]
            }
        ]
    },
    {
        "slug": "giligenting",
        "name": "Giligenting",
        "villages": [
            {
                "slug": "giligenting",
                "name": "Giligenting",
                "total": [9000, 9500]
            },
            {
                "slug": "pusat",
                "name": "Pusat",
                "total": [10500, 11000]
            }
        ]
    },
    {
        "slug": "gayam",
        "name": "Gayam",
        "villages": [
            {
                "slug": "gayam",
                "name": "Gayam",
                "total": [19000, 18000]
            },
            {
                "slug": "larangan",
                "name": "Larangan",
                "total": [12000, 11000]
            }
        ]
    },
    {
        "slug": "kangayan",
        "name": "Kangayan",
        "villages": [
            {
                "slug": "kangayan",
                "name": "Kangayan",
                "total": [21000, 22000]
            },
            {
                "slug": "kampung-baru",
                "name": "Kampung Baru",
                "total": [17000, 16000]
            }
        ]
    },
    {
        "slug": "kota-sumenep",
        "name": "Kota Sumenep",
        "villages": [
            {
                "slug": "alun-alun",
                "name": "Alun-Alun",
                "total": [13000, 14000]
            },
            {
                "slug": "batangan",
                "name": "Batangan",
                "total": [15000, 18000]
            }
        ]
    }
]


export const newDummies = fullDummyData.map((item) => {
    let dummyTotalVotes = 0
    let comparisons = []

    item.villages.forEach((village) => {
        // sum total of all votes
        let total = 0
        village.total.forEach((num) => {
            total += num
        })
        dummyTotalVotes += total
    })

    for (let j = 0; j < item.villages[0].total.length; j++) {
        let total = 0
        item.villages.forEach((village) => {
            total += village.total[j]
        })

        const percentage = (total / dummyTotalVotes) * 100
        comparisons.push({total, percentage})
    }

    return {
        slug: item.slug,
        name: item.name,
        dummyTotalVotes, comparisons,
    }
})

export const dummyTotalVotesDetail = []
newDummies[0].comparisons.forEach((comparison, idx) => {
    let total = 0
    newDummies.map((dummy) => {
        total += dummy.comparisons[idx].total
    })

    dummyTotalVotesDetail.push(total)
})

export const dummyTotalVotes = dummyTotalVotesDetail.reduce((prev, curr) => prev + curr, 0)

export const sumNewDummies = {
    totalVotesDetail: dummyTotalVotesDetail,
    percentages: dummyTotalVotesDetail.map((num) => (num / dummyTotalVotes) * 100),
    data: newDummies
}


////////////////////////////////////////////////////////////////////////////////
// FIXED DUMMY

// export const fixedData = [
//     {
//         "id": 2,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 50,
//         "jumlah_suara_paslon2": 70,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 121,
//         "status": "COMPLETE",
//         "approval": "PENDING",
//         "created_by": 2,
//         "created_at": "2024-11-16T10:16:52.684Z",
//         "updated_at": "2024-11-18T07:48:27.273Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 2,
//             "username": "admin2",
//             "password": "admin2",
//             "nama": "Hasan",
//             "role": "SUPER_ADMIN"
//         }
//     },
//     {
//         "id": 3,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "REJECT",
//         "created_by": 2,
//         "created_at": "2024-11-17T05:07:51.167Z",
//         "updated_at": "2024-11-17T05:07:51.167Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 2,
//             "username": "admin2",
//             "password": "admin2",
//             "nama": "Hasan",
//             "role": "SUPER_ADMIN"
//         }
//     },
//     {
//         "id": 4,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "PENDING",
//         "created_by": 2,
//         "created_at": "2024-11-17T05:07:57.981Z",
//         "updated_at": "2024-11-17T05:07:57.981Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 2,
//             "username": "admin2",
//             "password": "admin2",
//             "nama": "Hasan",
//             "role": "SUPER_ADMIN"
//         }
//     },
//     {
//         "id": 7,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "PENDING",
//         "created_by": 2,
//         "created_at": "2024-11-17T12:33:06.659Z",
//         "updated_at": "2024-11-17T12:33:06.659Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 2,
//             "username": "admin2",
//             "password": "admin2",
//             "nama": "Hasan",
//             "role": "SUPER_ADMIN"
//         }
//     },
//     {
//         "id": 8,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "PENDING",
//         "created_by": 7,
//         "created_at": "2024-11-17T17:59:29.756Z",
//         "updated_at": "2024-11-17T17:59:29.756Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 7,
//             "username": "admin1",
//             "password": "$2b$10$aeL.897kJrdBVLDyKYD8A.PjxAL1YYDr2KCeWBqT2CABC8PuLOINy",
//             "nama": "Junaedi",
//             "role": "ADMIN"
//         }
//     },
//     {
//         "id": 9,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "PENDING",
//         "created_by": 7,
//         "created_at": "2024-11-17T18:00:27.719Z",
//         "updated_at": "2024-11-17T18:00:27.719Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 7,
//             "username": "admin1",
//             "password": "$2b$10$aeL.897kJrdBVLDyKYD8A.PjxAL1YYDr2KCeWBqT2CABC8PuLOINy",
//             "nama": "Junaedi",
//             "role": "ADMIN"
//         }
//     },
//     {
//         "id": 10,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "PENDING",
//         "created_by": 7,
//         "created_at": "2024-11-17T18:03:12.672Z",
//         "updated_at": "2024-11-17T18:03:12.672Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 7,
//             "username": "admin1",
//             "password": "$2b$10$aeL.897kJrdBVLDyKYD8A.PjxAL1YYDr2KCeWBqT2CABC8PuLOINy",
//             "nama": "Junaedi",
//             "role": "ADMIN"
//         }
//     },
//     {
//         "id": 11,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "PENDING",
//         "created_by": 7,
//         "created_at": "2024-11-17T18:08:28.762Z",
//         "updated_at": "2024-11-17T18:08:28.762Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 7,
//             "username": "admin1",
//             "password": "$2b$10$aeL.897kJrdBVLDyKYD8A.PjxAL1YYDr2KCeWBqT2CABC8PuLOINy",
//             "nama": "Junaedi",
//             "role": "ADMIN"
//         }
//     },
//     {
//         "id": 12,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "PENDING",
//         "created_by": 7,
//         "created_at": "2024-11-17T18:08:53.821Z",
//         "updated_at": "2024-11-17T18:08:53.821Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 7,
//             "username": "admin1",
//             "password": "$2b$10$aeL.897kJrdBVLDyKYD8A.PjxAL1YYDr2KCeWBqT2CABC8PuLOINy",
//             "nama": "Junaedi",
//             "role": "ADMIN"
//         }
//     },
//     {
//         "id": 13,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "PENDING",
//         "created_by": 7,
//         "created_at": "2024-11-17T18:09:51.693Z",
//         "updated_at": "2024-11-17T18:09:51.693Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 7,
//             "username": "admin1",
//             "password": "$2b$10$aeL.897kJrdBVLDyKYD8A.PjxAL1YYDr2KCeWBqT2CABC8PuLOINy",
//             "nama": "Junaedi",
//             "role": "ADMIN"
//         }
//     },
//     {
//         "id": 14,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "PENDING",
//         "created_by": 7,
//         "created_at": "2024-11-17T18:16:25.394Z",
//         "updated_at": "2024-11-17T18:16:25.394Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 7,
//             "username": "admin1",
//             "password": "$2b$10$aeL.897kJrdBVLDyKYD8A.PjxAL1YYDr2KCeWBqT2CABC8PuLOINy",
//             "nama": "Junaedi",
//             "role": "ADMIN"
//         }
//     },
//     {
//         "id": 15,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "PENDING",
//         "created_by": 7,
//         "created_at": "2024-11-17T18:17:25.406Z",
//         "updated_at": "2024-11-17T18:17:25.406Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 7,
//             "username": "admin1",
//             "password": "$2b$10$aeL.897kJrdBVLDyKYD8A.PjxAL1YYDr2KCeWBqT2CABC8PuLOINy",
//             "nama": "Junaedi",
//             "role": "ADMIN"
//         }
//     },
//     {
//         "id": 16,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "PENDING",
//         "created_by": 7,
//         "created_at": "2024-11-17T18:29:38.589Z",
//         "updated_at": "2024-11-17T18:29:38.589Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 7,
//             "username": "admin1",
//             "password": "$2b$10$aeL.897kJrdBVLDyKYD8A.PjxAL1YYDr2KCeWBqT2CABC8PuLOINy",
//             "nama": "Junaedi",
//             "role": "ADMIN"
//         }
//     },
//     {
//         "id": 17,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "PENDING",
//         "created_by": 7,
//         "created_at": "2024-11-17T18:34:54.697Z",
//         "updated_at": "2024-11-17T18:34:54.697Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 7,
//             "username": "admin1",
//             "password": "$2b$10$aeL.897kJrdBVLDyKYD8A.PjxAL1YYDr2KCeWBqT2CABC8PuLOINy",
//             "nama": "Junaedi",
//             "role": "ADMIN"
//         }
//     },
//     {
//         "id": 18,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "PENDING",
//         "created_by": 7,
//         "created_at": "2024-11-17T18:41:34.801Z",
//         "updated_at": "2024-11-17T18:41:34.801Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 7,
//             "username": "admin1",
//             "password": "$2b$10$aeL.897kJrdBVLDyKYD8A.PjxAL1YYDr2KCeWBqT2CABC8PuLOINy",
//             "nama": "Junaedi",
//             "role": "ADMIN"
//         }
//     },
//     {
//         "id": 19,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "PENDING",
//         "created_by": 7,
//         "created_at": "2024-11-17T18:42:34.463Z",
//         "updated_at": "2024-11-17T18:42:34.463Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 7,
//             "username": "admin1",
//             "password": "$2b$10$aeL.897kJrdBVLDyKYD8A.PjxAL1YYDr2KCeWBqT2CABC8PuLOINy",
//             "nama": "Junaedi",
//             "role": "ADMIN"
//         }
//     },
//     {
//         "id": 20,
//         "tps_id": 1,
//         "jumlah_suara_paslon1": 10,
//         "jumlah_suara_paslon2": 20,
//         "jumlah_suara_tidak_sah": 1,
//         "total_suara_masuk": 31,
//         "status": "PARTIAL",
//         "approval": "PENDING",
//         "created_by": 7,
//         "created_at": "2024-11-18T07:38:33.759Z",
//         "updated_at": "2024-11-18T07:38:33.759Z",
//         "Tps": {
//             "id": 1,
//             "nomer_tps": "tps0021",
//             "jumlah_dpt": 2001,
//             "kecamatan_id": 3,
//             "desa_id": 3,
//             "Kecamatan": {
//                 "id": 3,
//                 "nama_kecamatan": "Saronggi"
//             },
//             "Desa": {
//                 "id": 3,
//                 "nama_desa": "Ambunten Timur",
//                 "kecamatan_id": 13
//             }
//         },
//         "Admin": {
//             "id": 7,
//             "username": "admin1",
//             "password": "$2b$10$aeL.897kJrdBVLDyKYD8A.PjxAL1YYDr2KCeWBqT2CABC8PuLOINy",
//             "nama": "Junaedi",
//             "role": "ADMIN"
//         }
//     }
// ]

export const fixedData = [
    // Kecamatan 1
    {
        "id": 1,
        "tps_id": 1,
        "jumlah_suara_paslon1": 50,
        "jumlah_suara_paslon2": 70,
        "jumlah_suara_tidak_sah": 1,
        "total_suara_masuk": 121,
        "status": "COMPLETE",
        "approval": "PENDING",
        "created_by": 2,
        "created_at": "2024-11-16T10:16:52.684Z",
        "updated_at": "2024-11-18T07:48:27.273Z",
        "Tps": {
            "id": 1,
            "nomer_tps": "tps001",
            "jumlah_dpt": 2001,
            "kecamatan_id": 1,
            "desa_id": 1,
            "Kecamatan": {
                "id": 1,
                "nama_kecamatan": "Kecamatan A"
            },
            "Desa": {
                "id": 1,
                "nama_desa": "Desa A1",
                "kecamatan_id": 1
            }
        },
        "Admin": {
            "id": 2,
            "username": "admin2",
            "password": "admin2",
            "nama": "Hasan",
            "role": "SUPER_ADMIN"
        }
    },
    {
        "id": 2,
        "tps_id": 2,
        "jumlah_suara_paslon1": 40,
        "jumlah_suara_paslon2": 60,
        "jumlah_suara_tidak_sah": 2,
        "total_suara_masuk": 102,
        "status": "PARTIAL",
        "approval": "REJECT",
        "created_by": 2,
        "created_at": "2024-11-17T05:07:51.167Z",
        "updated_at": "2024-11-17T05:07:51.167Z",
        "Tps": {
            "id": 2,
            "nomer_tps": "tps002",
            "jumlah_dpt": 2101,
            "kecamatan_id": 1,
            "desa_id": 2,
            "Kecamatan": {
                "id": 1,
                "nama_kecamatan": "Kecamatan A"
            },
            "Desa": {
                "id": 2,
                "nama_desa": "Desa A2",
                "kecamatan_id": 1
            }
        },
        "Admin": {
            "id": 2,
            "username": "admin2",
            "password": "admin2",
            "nama": "Hasan",
            "role": "SUPER_ADMIN"
        }
    },
    {
        "id": 3,
        "tps_id": 3,
        "jumlah_suara_paslon1": 30,
        "jumlah_suara_paslon2": 50,
        "jumlah_suara_tidak_sah": 3,
        "total_suara_masuk": 83,
        "status": "PARTIAL",
        "approval": "PENDING",
        "created_by": 2,
        "created_at": "2024-11-17T06:30:00.000Z",
        "updated_at": "2024-11-17T06:30:00.000Z",
        "Tps": {
            "id": 3,
            "nomer_tps": "tps003",
            "jumlah_dpt": 2201,
            "kecamatan_id": 1,
            "desa_id": 3,
            "Kecamatan": {
                "id": 1,
                "nama_kecamatan": "Kecamatan A"
            },
            "Desa": {
                "id": 3,
                "nama_desa": "Desa A3",
                "kecamatan_id": 1
            }
        },
        "Admin": {
            "id": 2,
            "username": "admin2",
            "password": "admin2",
            "nama": "Hasan",
            "role": "SUPER_ADMIN"
        }
    },
    {
        "id": 4,
        "tps_id": 4,
        "jumlah_suara_paslon1": 60,
        "jumlah_suara_paslon2": 80,
        "jumlah_suara_tidak_sah": 0,
        "total_suara_masuk": 140,
        "status": "COMPLETE",
        "approval": "PENDING",
        "created_by": 2,
        "created_at": "2024-11-17T08:45:00.000Z",
        "updated_at": "2024-11-17T08:45:00.000Z",
        "Tps": {
            "id": 4,
            "nomer_tps": "tps004",
            "jumlah_dpt": 2501,
            "kecamatan_id": 1,
            "desa_id": 4,
            "Kecamatan": {
                "id": 1,
                "nama_kecamatan": "Kecamatan A"
            },
            "Desa": {
                "id": 4,
                "nama_desa": "Desa A4",
                "kecamatan_id": 1
            }
        },
        "Admin": {
            "id": 2,
            "username": "admin2",
            "password": "admin2",
            "nama": "Hasan",
            "role": "SUPER_ADMIN"
        }
    },
    {
        "id": 5,
        "tps_id": 5,
        "jumlah_suara_paslon1": 55,
        "jumlah_suara_paslon2": 75,
        "jumlah_suara_tidak_sah": 2,
        "total_suara_masuk": 132,
        "status": "PARTIAL",
        "approval": "REJECT",
        "created_by": 2,
        "created_at": "2024-11-17T10:00:00.000Z",
        "updated_at": "2024-11-17T10:00:00.000Z",
        "Tps": {
            "id": 5,
            "nomer_tps": "tps005",
            "jumlah_dpt": 2301,
            "kecamatan_id": 1,
            "desa_id": 5,
            "Kecamatan": {
                "id": 1,
                "nama_kecamatan": "Kecamatan A"
            },
            "Desa": {
                "id": 5,
                "nama_desa": "Desa A5",
                "kecamatan_id": 1
            }
        },
        "Admin": {
            "id": 2,
            "username": "admin2",
            "password": "admin2",
            "nama": "Hasan",
            "role": "SUPER_ADMIN"
        }
    },

    // Kecamatan 2
    {
        "id": 6,
        "tps_id": 6,
        "jumlah_suara_paslon1": 45,
        "jumlah_suara_paslon2": 65,
        "jumlah_suara_tidak_sah": 4,
        "total_suara_masuk": 114,
        "status": "COMPLETE",
        "approval": "PENDING",
        "created_by": 3,
        "created_at": "2024-11-17T11:15:00.000Z",
        "updated_at": "2024-11-17T11:15:00.000Z",
        "Tps": {
            "id": 6,
            "nomer_tps": "tps006",
            "jumlah_dpt": 2001,
            "kecamatan_id": 2,
            "desa_id": 6,
            "Kecamatan": {
                "id": 2,
                "nama_kecamatan": "Kecamatan B"
            },
            "Desa": {
                "id": 6,
                "nama_desa": "Desa B1",
                "kecamatan_id": 2
            }
        },
        "Admin": {
            "id": 3,
            "username": "admin3",
            "password": "admin3",
            "nama": "Arif",
            "role": "ADMIN"
        }
    },
    // Add more villages (desa) here similarly for Kecamatan 2

    // Kecamatan 3
    {
        "id": 11,
        "tps_id": 11,
        "jumlah_suara_paslon1": 20,
        "jumlah_suara_paslon2": 40,
        "jumlah_suara_tidak_sah": 0,
        "total_suara_masuk": 60,
        "status": "PARTIAL",
        "approval": "PENDING",
        "created_by": 4,
        "created_at": "2024-11-17T12:00:00.000Z",
        "updated_at": "2024-11-17T12:00:00.000Z",
        "Tps": {
            "id": 11,
            "nomer_tps": "tps011",
            "jumlah_dpt": 1600,
            "kecamatan_id": 3,
            "desa_id": 11,
            "Kecamatan": {
                "id": 3,
                "nama_kecamatan": "Kecamatan C"
            },
            "Desa": {
                "id": 11,
                "nama_desa": "Desa C1",
                "kecamatan_id": 3
            }
        },
        "Admin": {
            "id": 4,
            "username": "admin4",
            "password": "admin4",
            "nama": "Budi",
            "role": "ADMIN"
        }
    },
    {
        "id": 11,
        "tps_id": 11,
        "jumlah_suara_paslon1": 2000,
        "jumlah_suara_paslon2": 40,
        "jumlah_suara_tidak_sah": 0,
        "total_suara_masuk": 2040,
        "status": "PARTIAL",
        "approval": "PENDING",
        "created_by": 4,
        "created_at": "2024-11-17T12:00:00.000Z",
        "updated_at": "2024-11-17T12:00:00.000Z",
        "Tps": {
            "id": 12,
            "nomer_tps": "tps012",
            "jumlah_dpt": 1600,
            "kecamatan_id": 3,
            "desa_id": 11,
            "Kecamatan": {
                "id": 3,
                "nama_kecamatan": "Kecamatan C"
            },
            "Desa": {
                "id": 11,
                "nama_desa": "Desa C1",
                "kecamatan_id": 3
            }
        },
        "Admin": {
            "id": 4,
            "username": "admin4",
            "password": "admin4",
            "nama": "Budi",
            "role": "ADMIN"
        }
    },
    // Add more villages (desa) for Kecamatan 3
];

