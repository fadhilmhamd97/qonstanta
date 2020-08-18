/* THESE IS TEMPORARY DATA BINDING */

const DashboardData = {
        infoCards: [
            {icon: 'users', totalRows: '41K', description: 'Member Terdaftar'},
            {icon: 'user', totalRows: '35K', description: 'Pendaftar Baru'},
            {icon: 'exam', totalRows: '200', description: 'Pendaftar Try Out'}
      ],
      pieDatasetByPackage: {
        labels: [
          'Alpha',
          'Betha',
          'Gamma'
        ],
        datasets: [{
          data: [300, 50, 100],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
        }]
      },
      pieDatasetByStudent: {
        labels: [
          'IPA',
          'IPS'
        ],
        datasets: [{
          data: [200, 150],
          backgroundColor: [
            '#8EFF14',
            '#f1ABFF',
          ],
        }]
      },
    lineDatasetByYear: {
        labels: ["Januari", "Februari", "Maret", "April", "Mei","Juni","Juli","Agustus","September","Oktober", "November", "Desember"],
        datasets: [
            {
                label: 'Pendaftaran dalam Setahun',
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                data: [65, 59, 80, 81, 56, 55, 40, 12, 56, 98, 100]
            }
        ]
    }
}

export {DashboardData}