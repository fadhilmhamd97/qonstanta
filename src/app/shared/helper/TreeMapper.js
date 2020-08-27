const TreeMapperService = 
{
    EntityDissolver: props => {     
            let _entity = [...props]  

            const p = _entity.filter(v => v.root === true)

            const _childs = v => {
                const _res = _entity.filter(v1 => v1.parentId === v.id)
                return _res.map((v, i) => {
                    return {...v, childs: _childs(v)}
                })
            }

            const res = p.map((v, i) => {
                return {...v, childs: _childs(v)}
            })

            return res
        }
}

export default TreeMapperService