const questionIndexColumns = [
    {title: 'Id', value: 'questionIndexId'},
    {title: 'Deskripsi', value:'questionIndexDescription'},
    {title: 'Soal', value: 'questionIndexTotal'},
    {title: 'Mata Pelajaran', value: 'questionIndexModule'},
    {title: 'Kelas', value: 'questionIndexClass'}
]

const questionIndexDatasets = [
    {
        questionIndexId: 1,
        questionIndexDescription: 'BIOLOGI-X-TRYOUT-001',
        questionIndexTotal: 40,
        questionIndexModule: 'BIOLOGI',
        questionIndexClass: 'X'
    },
    {
        questionIndexId: 2,
        questionIndexDescription: 'FISIKA-X-POST-021',
        questionIndexTotal: 40,
        questionIndexModule: 'FISIKA',
        questionIndexClass: 'XI'
    }
]

const questionModuleColumns = [
    {title: 'Pertanyaan', value: 'questionModuleQuiz'},
    {title: 'Opsi A', value: 'questionModuleOptionA'},
    {title: 'Opsi B', value: 'questionModuleOptionB'},
    {title: 'Opsi C', value: 'questionModuleOptionC'},
    {title: 'Opsi D', value: 'questionModuleOptionD'},
    {title: 'Opsi E', value: 'questionModuleOptionE'},
    {title: 'Skor', value: 'questionModuleScore'}
]

const questionModuleDatasets = [
    {
        questionModuleQuiz: 'Apakah ibukota Indonesia ?',
        questionModuleOptionA: 'Jakarta',
        questionModuleOptionB: 'Manila',
        questionModuleOptionC: 'Bangkok',
        questionModuleOptionD: 'Beijing',
        questionModuleOptionE: 'Sydney',
        questionModuleScore: 4
    }
]

export 
{
    questionIndexColumns,
    questionIndexDatasets,
    questionModuleColumns,
    questionModuleDatasets
}