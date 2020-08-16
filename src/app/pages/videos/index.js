import React,{useState, useEffect} from "react";
import { BootstrapCard, NavigationPane, TreeFolderContent } from "../../shared/common/index";
import { TabsComponent } from "./component/index";
import FolderIcon from '@material-ui/icons/Folder';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { Card } from "react-bootstrap";
import ReactPlayer from 'react-player'
import { TreeMapperService } from "../../shared/helper/index";
import { toAbsoluteUrl } from "../../../_metronic/_helpers/AssetsHelpers";

const Video = props => {

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

    const controls = [
        {icon: 'flaticon2-back', tooltip: 'Navigasi Video', buttonTypes:'primary'}
    ]

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

    const {Header, Body, Footer} = Card

    //Mapper helper
    const resultView = TreeMapperService.EntityDissolver(treeControls)

    const [propNavigation, setNavigation] = useState(true)
    const [propVideoUrl, setVideoUrl] = useState("")
    const [propMaskPlayer, setMaskPlayer] = useState(false)

    const applyToPlayerContext = url => {
        console.info(url)
        if(url !== undefined){
            setVideoUrl(url);
            setMaskPlayer(true)
            return;
        }
    }

    const StreamLoader = ({flag}) => {
        return flag ? (<ReactPlayer
            width='100%'
            height='100%'
            url={propVideoUrl}
            config={{
                youtube: {
                playerVars: { showinfo: 1 }
                },
                facebook: {
                appId: '12345'
                }
            }}
        />) : (<img style={{maxWidth: 240 + 'px', marginTop: 80 + 'px'}} alt="Masking Element" src={toAbsoluteUrl("/media/media/learning-from-home.png")} />)
    }

    return(
    <>
        <BootstrapCard title="Video Pembelajaran">
            <div style={{maxWidth: 720 + 'px', height: 380 + 'px', margin: 'auto', textAlign: 'center'}}>
                <StreamLoader flag={propMaskPlayer} />
            </div>
            <TabsComponent 
                    style={{marginTop: 12 + 'px', padding: 1 + 'em'}}
                    description="Lorem Ipsum dolor sir amet"
                    postTest={questions} />
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
    </>
    )
}

export default Video