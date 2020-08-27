const polaSelectData = [
    {
        value: 'pola-1',
        description: 'Senin & Kamis, 08.00-12.00'
    },
    {
        value: 'pola-2',
        description: 'Selasa & Jumat, 12.00-14.00'
    },
    {
        value: 'pola-3',
        description: 'Rabu & Sabtu, 08.00-10.00'
    }
]

const moduleSelectData = [
    {
        value: 'biology',
        label: 'Biologi'
    },
    {
        value: 'physics',
        label: 'Fisika'
    },
    {
        value: 'chemical',
        label: 'Kimia'
    }
]

const studentColumnsData = [
    {title: 'ID', value: 'studentId'},
    {title: 'Nama', value: 'studentName'},
    {title: 'Kelas', value: 'studentClass'},
    {title: 'Pola', value: 'studentPattern'}
]

const studentTableData = [
    {
        studentId: 1,
        studentName: 'Mikhael Hermanus',
        studentClass: 'XI',
        studentPattern: 'Pola I | Setiap Senin 08.00-12.00'
    },
    {
        studentId: 2,
        studentName: 'Jalu Sehat Rahandolo',
        studentClass: 'XI',
        studentPattern: 'Pola I | Setiap Senin 08.00-12.00'
    },
    {
        studentId: 3,
        studentName: 'Fadhil Muhammad',
        studentClass: 'XI',
        studentPattern: 'Pola I | Setiap Senin 08.00-12.00'
    }
]

const createEduliveTeacherData = [
    {value: 1, label: 'Mr Budi Sasmita'},
    {value: 2, label: 'Mrs Khalida Nurhasanah'},
    {value: 3, label: 'Haerul Hidayat M.Kom, S.Kom'}
]

const eduliveColumnsData = [
    {title: 'Id', value: 'eduliveId'},
    {title: 'Sesi Kelas', value: 'eduliveClass'},
    {title: 'Kuota', value: 'eduliveQuota'},
    {title: 'Pengajar', value:'eduliveFaculty'},
    {title: 'Jadwal', value: 'eduliveSchedule'}
]

const eduliveDatasets = [
    {
        eduliveId: 1,
        eduliveClass: 'Fisika III - SN0001',
        eduliveQuota: 100,
        eduliveFaculty: 'Mr Bambang Soetedjo',
        eduliveSchedule: 'Senin, 28 November 2020 | 08.00-12.00'
    },
    {
        eduliveId: 2,
        eduliveClass: 'Biologi I - SN0011',
        eduliveQuota: 100,
        eduliveFaculty: 'Mrs Mia Khalifa',
        eduliveSchedule: 'Jumat, 31 November 2020 | 10.00-12.00'
    }
]

const eduliveRequestColumns = [
    {
        title: 'Id',
        value: 'eduliveRequestid'
    },
    {
        title: 'Kelas',
        value: 'eduliveRequestClass'
    },
    {
        title: 'Jumlah Siswa',
        value: 'eduliveRequestQuota'
    },
    {
        title: 'Nama Pengajar',
        value: 'eduliveRequestFaculty'
    },
    {
        title: 'Pola',
        value: 'eduliveRequestPattern'
    },
    {
        title: 'Tanggal Pembelajaran',
        value: 'eduliveRequestSchedule'
    }
]

const eduliveRequestDatasets = [
    {
        eduliveRequestid: 1,
        eduliveRequestClass: 'EDULIVE-001',
        eduliveQuota: 14,
        eduliveRequestFaculty: 'Rifni S.Pd',
        eduliveRequestSchedule: 'Senin, 28 November 2020 | 08.00-12.00',
        eduliveRequestPattern: 'Pola I'
    },
    {
        eduliveRequestid: 2,
        eduliveRequestClass: 'EDULIVE-002',
        eduliveQuota: 38,
        eduliveRequestFaculty: 'Bambang M.Pd',
        eduliveRequestSchedule: 'Rabu, 28 November 2020 | 08.00-12.00',
        eduliveRequestPattern: 'Pola II'
    }
]

export {
            polaSelectData,
            eduliveColumnsData, 
            eduliveDatasets, 
            createEduliveTeacherData,
            moduleSelectData, 
            studentColumnsData, 
            studentTableData,
            eduliveRequestColumns,
            eduliveRequestDatasets
        }