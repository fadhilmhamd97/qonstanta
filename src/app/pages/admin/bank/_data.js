const treeControls = [
    {
        id: '6',
        parentId: '0',
        description: 'Semester',
        icon: "default",
        link: undefined
    },
    {
        id: '7',
        parentId: '6',
        description: 'I',
        icon: "default",
        link: undefined
    },
    {
        id: '8',
        parentId: '6',
        description: 'II',
        icon: "default",
        link: undefined
    },
    {
        id: '9',
        parentId: '8',
        description: 'BAB I',
        icon: "default",
        link: undefined
    },
    {
        id: '14',
        parentId: '9',
        description: 'Introduction',
        icon: "default",
        link: undefined
    },
    {
        id: '15',
        parentId: '14',
        description: 'LINQ Advanced C#',
        icon: "video",
        link: "https://www.youtube.com/watch?v=p5myHVOtmiU&list=PLdo4fOcmZ0oXzJ3FC-ApBes-0klFN9kr9"
    },
    {
        id: '16',
        parentId: '14',
        description: 'Baby Shark',
        icon: "video",
        link: "https://www.youtube.com/watch?v=XqZsoesa55w"
    }
]

const columnsData = [
    {
        title: 'Id',
        value: 'bankId'
    },
    {
        title: 'Judul',
        value: 'bankName'
    },
    {
        title: 'Deskripsi',
        value: 'bankDescription'
    },
    {
        title: 'Jumlah',
        value: 'bankPostTestNum'
    },
    {
        title: 'Pembahasan',
        value: 'bankExplaination'
    }
]

const bankData = [
    {
        bankId: 1,
        bankName: 'Trigonometri',
        bankDescription: 'Mempelajari dasar dari penghitungan Trigonometri',
        bankNum: 40,
        bankExplaination: 'Tersedia'
    },
    {
        bankId: 2,
        bankName: 'Integral',
        bankDescription: 'Mempelajari dasar dari penghitungan Integral suatu bidang',
        bankPostTestNum: 15,
        bankExplaination: 'Tidak Tersedia'
    },
]

export {treeControls, columnsData, bankData}