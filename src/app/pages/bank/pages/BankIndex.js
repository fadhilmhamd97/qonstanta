import React,{useState} from "react";
import { BootstrapCard, NavigationPane, TreeFolderContent } from "../../../shared/common/index";
import { Card, Modal, Button, ListGroup } from "react-bootstrap";
import FolderIcon from '@material-ui/icons/Folder';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

import { TreeMapperService } from "../../../shared/helper/index";

import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import NavigationIcon from '@material-ui/icons/Navigation'

import { BankNavigation, BankQuestionComponent } from "./component/index";

const controls = [
    {icon: 'flaticon2-back', tooltip: 'Navigasi Ebook', buttonTypes:'primary'}
]

const questions = [
    {
        question: 
        {
            id: 1, 
            description: 'Siapakah penemu benua Amerika'
        }, 
        answers: 
        [
            {
                option: 'A',
                description: 'Chrisopther Colombus'
            },
            {
                option: 'B',
                description: 'Genghis Khan'
            },
            {
                option: 'C',
                description: 'Tokugawa Ieyasu'
            },
            {
                option: 'D',
                description: 'Gadjah Mada'
            },
            {
                option: 'E',
                description: 'Jia Diao'
            }
        ]
    }
]

const treeControls = [
    {
        id: '9',
        parentId: '0',
        description: 'BAB I',
        icon: FolderIcon
    },
    {
        id: '14',
        parentId: '9',
        description: 'Introduction',
        icon: FolderIcon
    },
    {
        id: '15',
        parentId: '9',
        description: 'Grammar',
        icon: FolderIcon
    },
    {
        id: '16',
        parentId: '15',
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

const questionContext = [
    {id: 1, question: 'Apa yang dimaksud dengan OOP ?', answers: [
        {id: 1, option: 'A', description: 'OOP adalah sebuah design pattern dalam pemrograman'},
        {id: 2, option: 'B', description: 'OOP adalah konsep pemrograman dahulu'},
        {id: 3, option: 'C', description: 'OOP adalah sebuah bahasa pemrograman yang digunakan dalam membuat web'},
        {id: 4, option: 'D', description: 'OOP adalah interaksi antar sub komponen dalam javascript'},
        {id: 5, option: 'E', description: 'OOP adalah interaksi antar manusia dan mesin'}
    ]}
]

//Mapper helper
const resultView = TreeMapperService.EntityDissolver(treeControls)

const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));


const BankIndex = props => {
    const [propNavigation, setNavigation] = useState(true)

    const [propExamNavigation, setExamNavigation] = useState(false)

    const {Header, Title, Body, Footer} = Card

    const applyToPlayerContext = url => {
        console.info(url)
    }

    const classes = useStyles();

    const ModalNavigation = ({onShow, children, handleClose}) => {
        return(<Modal
                show={onShow}
                size="md"
                centered
                >
                    <Header>
                        <Title>Navigasi Soal</Title>
                    </Header>
                    <Body>
                        {children}
                    </Body>
                    <Footer>
                        <Button style={{float: 'right'}} variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Footer>
        </Modal>)
    }

    

    const PropPostTest = ({listQuestion = null}) => {
        const {Item} = ListGroup
        const {Body} = Card

        console.info(listQuestion)

        if(listQuestion){
            return(<ListGroup style={{padding: 1 + 'em'}}>
                {
                    listQuestion.map((v, i) => {
                        const {question, answers} = v
                        return(<Item key={i}>
                            <BankQuestionComponent answers={answers} question={{index: question['id'], description: question['description']}} />
                        </Item>)
                    })
                }
            </ListGroup>)
        }

        return(<>
            <ListGroup>
                <Item></Item>
            </ListGroup>
        </>)
    }

    return(<>
        <PropPostTest listQuestion={questions} />
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
        <ModalNavigation style={{padding: 8 + 'px'}} handleClose={() => setExamNavigation(false)} onShow={propExamNavigation}>
                <BankNavigation />
        </ModalNavigation>
        <Fab onClick={() => setExamNavigation(true)} style={{position: 'fixed', right: 5 + '%', bottom: 10 + '%'}} color="secondary" variant="extended" aria-label="Delete" className={classes.fab}>
            <NavigationIcon className={classes.extendedIcon} />
            Navigasi Soal
        </Fab>
    </>)
}

export default BankIndex