import React,{useEffect, useState} from "react"
import {Form, Button} from "react-bootstrap"

const AddTreeModalSharedComponent = ({listenerSubmit, propsParent = {}, delegateTreeEvent}) => {
    const {Group, Label, Control, Text} = Form

    const [propFormDetailData, setFormDetailData] = useState({
        root: propsParent['id'] === undefined ? true : false,
        name: '',
        hierarchyType: '',
        order: 0,
        gradeId: 0,
        majorId: 0,
        courseId: 0,
        parentId: propsParent['id'] === undefined ? 0 : propsParent['id']
    })

    useEffect(() => {
        delegateTreeEvent(propFormDetailData)
    }, [propFormDetailData])

    return(<>
        <Form>
            <Group controlId="formParentScope">
                <Label>Parent Id</Label>
                {propsParent['id'] === undefined ? <Control type="text" disabled={true} value='ROOT'></Control> : <Control type="number" disabled={true} value={propsParent['id']}></Control>}
            </Group>
            <Group>
                <Label>Nama</Label>
                <Control type="text"  placeholder="Nama" onChange={ev => setFormDetailData({...propFormDetailData, name: ev.target.value})} />
            </Group>
            <Group>
                <Label>Tipe</Label>
                <Control type="text"  placeholder="Tipe" onChange={ev => setFormDetailData({...propFormDetailData, hierarchyType: ev.target.value})} />
            </Group>
        </Form>
    </>)
}

export default AddTreeModalSharedComponent