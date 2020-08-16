import React,{useState} from "react";
import { BootstrapCard, NavigationPane, TreeFolderContent } from "../../shared/common/index";
import { TabsComponent, PdfContainerComponent } from "./component/index";
import { Card } from "react-bootstrap";
import FolderIcon from '@material-ui/icons/Folder';
import test from "./libs/test.pdf";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

import { TreeMapperService } from "../../shared/helper/index";

const controls = [
    {icon: 'flaticon2-back', tooltip: 'Navigasi Ebook', buttonTypes:'primary'}
]

const treeControls = [
    {
        id: '6',
        parentId: '0',
        description: 'Semester',
        icon: FolderIcon
    },
    {
        id: '7',
        parentId: '6',
        description: 'I',
        icon: FolderIcon
    },
    {
        id: '8',
        parentId: '6',
        description: 'II',
        icon: FolderIcon
    },
    {
        id: '9',
        parentId: '8',
        description: 'BAB I',
        icon: FolderIcon
    },
    {
        id: '14',
        parentId: '8',
        description: 'Introduction',
        icon: FolderIcon
    },
    {
        id: '15',
        parentId: '12',
        description: 'Grammar',
        icon: FolderIcon
    },
    {
        id: '16',
        parentId: '14',
        description: 'Name',
        icon: FolderIcon
    },
    {
        id: '17',
        parentId: '16',
        description: 'Video',
        icon: FolderIcon
    },
]

//Mapper helper
const resultView = TreeMapperService.EntityDissolver(treeControls)


const Ebook = props => {
    const [propNavigation, setNavigation] = useState(true)

    const {Header, Body, Footer} = Card

    const applyToPlayerContext = url => {
        console.info(url)
    }

    return(<>
        <BootstrapCard title="Ebook Pembelajaran">
            <PdfContainerComponent file={test} />
            <TabsComponent 
            style={{marginTop: 12 + 'px', padding: 1 + 'em'}}
            description="Lorem Ipsum dolor sir amet" />
        </BootstrapCard>
        <NavigationPane propsTools={controls} handleClick={propNavigation}>
        <div>
            <Card style={{width: 100 + '%'}}>
                <Header>Navigasi</Header>
                <Body>
                    <TreeFolderContent propsNode={resultView} onChoose={applyToPlayerContext} />
                </Body>
                <Footer onClick={() => setNavigation(!propNavigation)} style={{cursor: 'pointer', position: 'fixed', bottom: 5 + 'px', width: 100 + '%', height: 40 + 'px', fontWeight: 'bold', backgroundColor: 'blue', opacity: .5, color: 'white'}}>
                    <span><DoubleArrowIcon /> Sembunyikan Navigasi</span>
                </Footer>
            </Card>
        </div>
        </NavigationPane>
    </>)
}

export default Ebook