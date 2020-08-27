import React from "react"
import AddIcon from '@material-ui/icons/Add'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'
import { Button } from "react-bootstrap"

const TreeItemControlsSharedComponent = ({delegateAddEvent, delegateEditEvent, delegateDeleteEvent}) => {
    return(<>
            <div>
            {/* CONTROLS */}
            <div className="row" style={{margin: 'auto', position: 'relative', left: '15%'}}>
                <div className="col-md-3" style={{textAlign: 'center', cursor: 'pointer', margin: '2px'}}>
                    <Button variant="info" style={{fontSize: '8px'}} onClick={delegateAddEvent}>
                        <AddIcon />Add
                    </Button>
                </div>
                <div className="col-md-3" style={{textAlign: 'center', cursor: 'pointer', margin: '2px'}}>
                    <Button variant="info" style={{fontSize: '8px'}} onClick={delegateEditEvent}>
                        <CreateIcon />Edit
                    </Button>
                </div>
                <div className="col-md-3" style={{textAlign: 'center', cursor: 'pointer', margin: '2px'}}>
                    <Button variant="info" style={{fontSize: '8px'}} onClick={delegateDeleteEvent}>
                        <DeleteIcon />Del
                    </Button>
                </div>
            </div>
        </div>
    </>)
}

export default TreeItemControlsSharedComponent