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
        value: 'ebookId'
    },
    {
        title: 'Judul',
        value: 'ebookName'
    },
    {
        title: 'Deskripsi',
        value: 'ebookDescription'
    },
    {
        title: 'Url',
        value: 'ebookUrl'
    },
]

const ebookData = [
    {
        ebookId: 1,
        ebookName: 'Trigonometri',
        ebookDescription: 'Mempelajari dasar dari penghitungan Trigonometri',
        ebookUrl: 'https://www.facebook.com'
    },
    {
        ebookId: 2,
        ebookName: 'Integral',
        ebookDescription: 'Mempelajari dasar dari penghitungan Integral',
        ebookUrl: 'https://www.twitter.com'
    },
]

export {treeControls, columnsData, ebookData}