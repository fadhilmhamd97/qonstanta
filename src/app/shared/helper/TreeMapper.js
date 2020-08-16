const TreeMapperService = 
{
    EntityDissolver: props => {     
            let _entity = [...props]  

            console.log(_entity);
            const p = _entity.filter(v => v.parentId === '0')

            console.log('p')
            console.log(p);

            const _childs = v => {
                const _res = _entity.filter(v1 => v1.parentId === v.id)
                return _res.map((v, i) => {
                    return {...v, childs: _childs(v)}
                })
            }

            const res = p.map((v, i) => {
                console.log('v')
                console.log(v);
                return {...v, childs: _childs(v)}
            })

            console.log(res, 'result')
            return res
        }
}

export default TreeMapperService