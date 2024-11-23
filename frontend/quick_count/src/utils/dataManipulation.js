export const getTotalVotesAndPercentagesByKecamatan = (data) => {
    return data.reduce((acc, curr) => {
        acc.jumlah_suara_paslon1 += curr.jumlah_suara_paslon1;
        acc.jumlah_suara_paslon2 += curr.jumlah_suara_paslon2;
        acc.total_suara_sah += curr.total_suara_sah;
        acc.jumlah_suara_tidak_sah += curr.jumlah_suara_tidak_sah;
        acc.total_suara_masuk += curr.total_suara_masuk;

        return acc
    }, {
        jumlah_suara_paslon1: 0,
        jumlah_suara_paslon2: 0,
        total_suara_sah: 0,
        jumlah_suara_tidak_sah: 0,
        total_suara_masuk: 0,
    })
}

export const groupByKecamatan = (data) => {
    const result = data.reduce((acc, curr) => {
        const kecamatanId = curr.Tps.kecamatan_id;
        const kecamatanName = curr.Tps.Kecamatan.nama_kecamatan;

        // Initialize the group if it doesn't exist
        if (!acc[kecamatanId]) {
            acc[kecamatanId] = {
                kecamatanId,
                kecamatanName,
                jumlah_suara_paslon1: 0,
                jumlah_suara_paslon2: 0,
                jumlah_suara_tidak_sah: 0,
                total_suara_masuk: 0,
                tps_count: 0
            };
        }

        // Accumulate the data
        acc[kecamatanId].jumlah_suara_paslon1 += curr.jumlah_suara_paslon1;
        acc[kecamatanId].jumlah_suara_paslon2 += curr.jumlah_suara_paslon2;
        acc[kecamatanId].jumlah_suara_tidak_sah += curr.jumlah_suara_tidak_sah;
        acc[kecamatanId].total_suara_masuk += curr.total_suara_masuk;
        acc[kecamatanId].tps_count++;

        return acc;
    }, {});

    for (const item in result) {
        result[item].total_suara_sah = result[item].jumlah_suara_paslon1 + result[item].jumlah_suara_paslon2;
    }

    return Object.keys(result).map((key) => result[key])
}


export const aggregateDataByKecamatanAndDesa = (data, kecamatanId) => {
    // Create an object to store the aggregate data for the selected Kecamatan
    let kecamatan = {
        kecamatanId: kecamatanId,
        kecamatanName: "",
        jumlah_suara_paslon1: 0,
        jumlah_suara_paslon2: 0,
        jumlah_suara_sah: 0,
        jumlah_suara_tidak_sah: 0,
        total_suara_masuk: 0,
        tps_count: 0,
        desa: []
    };

    // Loop through the data to aggregate results for the given kecamatanId
    data.forEach(item => {
        const kecamatanData = item.Tps.Kecamatan;
        if (kecamatanData.id === kecamatanId) {
            // Set the kecamatanName once, as it's the same for all records within the same Kecamatan
            if (!kecamatan.kecamatanName) {
                kecamatan.kecamatanName = kecamatanData.nama_kecamatan;
            }

            const desa = item.Tps.Desa;
            const desaId = desa.id;
            const desaName = desa.nama_desa;

            // Check if the desa already exists in the array
            let existingDesa = kecamatan.desa.find(d => d.desaId === desaId);
            if (existingDesa) {
                // If desa exists, accumulate the values
                existingDesa.jumlah_suara_paslon1 += item.jumlah_suara_paslon1;
                existingDesa.jumlah_suara_paslon2 += item.jumlah_suara_paslon2;
                existingDesa.jumlah_suara_sah += item.jumlah_suara_paslon1 + item.jumlah_suara_paslon2;
                existingDesa.jumlah_suara_tidak_sah += item.jumlah_suara_tidak_sah;
                existingDesa.total_suara_masuk += item.total_suara_masuk;
                existingDesa.tps_count += 1;
            } else {
                // If desa does not exist, add it as a new entry
                const newDesa = {
                    desaId: desaId,
                    desaName: desaName,
                    jumlah_suara_paslon1: item.jumlah_suara_paslon1,
                    jumlah_suara_paslon2: item.jumlah_suara_paslon2,
                    jumlah_suara_sah: item.jumlah_suara_paslon1 + item.jumlah_suara_paslon2,
                    jumlah_suara_tidak_sah: item.jumlah_suara_tidak_sah,
                    total_suara_masuk: item.total_suara_masuk,
                    tps_count: 1
                };
                kecamatan.desa.push(newDesa);
            }

            // Aggregate total kecamatan data
            kecamatan.jumlah_suara_paslon1 += item.jumlah_suara_paslon1;
            kecamatan.jumlah_suara_paslon2 += item.jumlah_suara_paslon2;
            kecamatan.jumlah_suara_sah += item.jumlah_suara_paslon1 + item.jumlah_suara_paslon2; // Aggregate jumlah_suara_sah
            kecamatan.jumlah_suara_tidak_sah += item.jumlah_suara_tidak_sah;
            kecamatan.total_suara_masuk += item.total_suara_masuk;
            kecamatan.tps_count += 1;
        }
    });

    // If there is any aggregated data for the given Kecamatan, push it to the result array
    if (kecamatan.desa.length > 0) {
        return kecamatan
    } else return {}


}
