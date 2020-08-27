import React,{useState, useEffect} from "react"
import {Form, Button} from "react-bootstrap"
import { getHierarchyTree } from "../shared/common-services"

const EditTreeModalSharedComponent = ({delegateTreeEvent, propsParent}) => {
    const {Group, Label, Control, Text} = Form

    const [propFormDetailData, setFormDetailData] = useState({
        root: propsParent['id'] === undefined ? true : false,
        name: propsParent['description'],
        hierarchyType: propsParent['hierarchyType'],
        order: 0,
        gradeId: 0,
        majorId: 0,
        courseId: 0,
        parentId: propsParent['parentId']
    })

    useEffect(() => {
        delegateTreeEvent(propFormDetailData)
    }, [propFormDetailData])

    return(<>
        <Form>
            <Group controlId="formParentScope">
                <Label>Parent Id</Label>
                <Control type="text" disabled={true} value={propFormDetailData['parentId'] === null ? 'ROOT' : propFormDetailData['parentId']} />
            </Group>
            <Group>
                <Label>Nama</Label>
                <Control type="text" value={propFormDetailData['name']} placeholder="Nama" onChange={ev => setFormDetailData({...propFormDetailData, name: ev.target.value})} />
            </Group>
            <Group>
                <Label>Tipe</Label>
                <Control type="text" value={propFormDetailData['hierarchyType']}  placeholder="Tipe" onChange={ev => setFormDetailData({...propFormDetailData, hierarchyType: ev.target.value})} />
            </Group>
        </Form>
    </>)
}

export default EditTreeModalSharedComponent