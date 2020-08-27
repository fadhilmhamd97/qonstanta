import React,{useState} from "react"
import { Card } from "react-bootstrap"
import { TreeFolderContent, BootstrapModalHelper } from "../../../shared/common/index"
import { TreeMapperService } from "../../../shared/helper/index"
import { treeControls, columnsData, ebookData } from "./_data"

import { TreeItemControlsSharedComponent, AddTreeModalSharedComponent, EditTreeModalSharedComponent } from "../shared/index";

import { EbookTableContainerComponent, CreateEbookModalComponent } from "./component/index"

const AdminEbookPage = ({props}) => {

    const resultView = TreeMapperService.EntityDissolver(treeControls)

    const [propFolderContext, setFolderContext] = useState(null);

    const changeToContext = cb => {
        //1 As Root
        const _data = cb !== undefined ? cb['id'] : 1
        setFolderContext(_data)
    }

    //Add Modal
    const [propAddFolderModal, setAddFolderModal] = useState(false)
    //Edit Modal
    const [propEditFolderModal, setEditFolderModal] = useState(false)

    const [propAddEbookModal, setAddEbookModal] = useState(false)

    const {Body, Header, Title} = Card
    return(<>
        <Card style={{minHeight: '720px'}}>
            <Header>
                <Title>Master Video</Title>
            </Header>
            <Body>
                <h5>Controls</h5>
                <div className="row">
                <div className="col-md-3">
                    <div style={{overflowY: 'scroll'}}>
                            {/* CONTROLS: Set EventArgs and Listener to suspend the long syntax style */}
                            <TreeItemControlsSharedComponent
                                delegateAddEvent={() => setAddFolderModal(true)} 
                                delegateEditEvent={() => setEditFolderModal(true)} />
                            <hr />
                            <div style={{minHeight: '390px'}}>
                                <TreeFolderContent propsNode={resultView} onChoose={changeToContext} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <EbookTableContainerComponent delegateAddEbookEvent={() => setAddEbookModal(true)} columns={columnsData} datasets={ebookData} title="Daftar Pembelajaran Ebook" />
                    </div>
                </div>
            </Body>
        </Card>

        {/* ADD Tree MODAL */}
        <BootstrapModalHelper title="Tambah Folder Video" propsAction={propAddFolderModal} delegateHideEvent={() => setAddFolderModal(false)}>
            <AddTreeModalSharedComponent />
        </BootstrapModalHelper>

        <BootstrapModalHelper title="Edit Folder Video" propsAction={propEditFolderModal} delegateHideEvent={() => setEditFolderModal(false)}>
            <EditTreeModalSharedComponent propsParent={propFolderContext} />
        </BootstrapModalHelper>

        <BootstrapModalHelper size="lg" title="Tambah Ebook" propsAction={propAddEbookModal} delegateHideEvent={() => setAddEbookModal(false)}>
            <CreateEbookModalComponent />
        </BootstrapModalHelper>
    </>)
}

export default AdminEbookPage