import React,{useState} from "react"
import { Card, Button } from "react-bootstrap"
import { TreeFolderContent } from "../../../shared/common/index"
import { TreeMapperService } from "../../../shared/helper/index"
import { treeControls, columnsData, ebookData } from "./_data"

import AddIcon from '@material-ui/icons/Add'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

import { EbookTableContainerComponent } from "./component/index";

const AdminEbookPage = ({props}) => {

    const resultView = TreeMapperService.EntityDissolver(treeControls)

    const [propFolderContext, setFolderContext] = useState(null);

    const changeToContext = cb => {
        //1 As Root
        const _data = cb !== undefined ? cb['id'] : 1
        setFolderContext(_data)
    }

    const EditAction = () => {
        //show Edit Modal
    }

    const AddAction = () => {
        //show Add Modal
    }

    const DeleteAction = () => {
        //show Delete Modal
    }

    const {Body, Header, Title} = Card
    return(<>
        <Card style={{minHeight: '720px'}}>
            <Header>
                <Title>Master Video</Title>
            </Header>
            <Body>
                <div className="row">
                    <div className="col-md-3">
                        <div style={{overflowY: 'scroll'}}>
                            {/* CONTROLS */}
                            <div className="row">
                                <div className="col-md-4" style={{textAlign: 'center', cursor: 'pointer'}}>
                                    <AddIcon />
                                    <p>Add</p>
                                </div>
                                <div className="col-md-4" style={{textAlign: 'center', cursor: 'pointer'}}>
                                    <CreateIcon />
                                    <p>Edit</p>
                                </div>
                                <div className="col-md-4" style={{textAlign: 'center', cursor: 'pointer'}}>
                                    <DeleteIcon />
                                    <p>Delete</p>
                                </div>
                            </div>
                            <TreeFolderContent propsNode={resultView} onChoose={changeToContext} />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <EbookTableContainerComponent columns={columnsData} datasets={ebookData} title="Daftar Pembelajaran Ebook" />
                    </div>
                </div>
            </Body>
        </Card>
    </>)
}

export default AdminEbookPage