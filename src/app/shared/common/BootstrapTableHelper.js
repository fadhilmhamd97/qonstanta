import React,{useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import paginationFactory, {
    PaginationProvider,
} from "react-bootstrap-table2-paginator";
// import { PaginationLinks } from "../helper/PaginationLinks";
import { PaginationToolbar } from "../helper/PaginationToolbar";
import BootstrapTable from "react-bootstrap-table-next";

const Pagination = (props) => {
    const { children, isLoading, paginationProps } = props;
    return (
      <>
        {children}
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          {/* <PaginationLinks paginationProps={paginationProps} /> */}
          <PaginationToolbar
            isLoading={isLoading}
            paginationProps={paginationProps}
          />
        </div>
      </>
    );
}

const PleaseWaitMessage = ({ entities }) => {
    return <>{entities === null && <div>Please wait...</div>}</>;
}
  
const NoRecordsFoundMessage = ({ entities }) => {
    const customersList = entities === null ? [] : entities;
    return (
      <>
        {customersList.length === 0 && entities !== null && (
          <div>No records found</div>
        )}
      </>
    );
}

    //whether check any props of the buttons
const Actions = ({id, edit, view, del}) => {
  const Edit = ({flag}) => {
      return flag ? (<Button>
          Edit            
      </Button>)
      :
      (<></>)   
  }
  const Delete = ({flag}) => {
      return flag ? (<Button>
          Delete
      </Button>)
      :
      (<></>)
  } 

  const View = ({flag}) => {
      return flag ? (<Button>
              View
          </Button>)
          :
          (<></>)
  }

  return(
      <>
          <View flag={view} />
          <></>
          <Edit flag={edit} />
          <></>
          <Delete flag={del} />
      </>
  )
}

//HOC for Bootstrap Table
const BootstrapTableHelper = ({datasets, columns, buttons, editActions, viewActions, deleteActions, actionData}) => {

    const {sizePerPageList, pageSize, pageNumber} = actionData

    const [PropsColumnsIfAnyAction, SetColumnsIfAnyAction] = useState({})

    const {edit, view, del} = buttons

    useEffect(() => {
        columns.length > 0 ?
            //Set Actions columns
            SetColumnsIfAnyAction([...columns, 
                {
                    dataField: "action",
                    text: "Actions",
                    formatter: Actions,
                    formatExtraData: {
                        view: view,
                        edit: edit,
                        del: del
                    },
                    classes: "text-right pr-0",
                    headerClasses: "text-right pr-3",
                    style: {
                    minWidth: "100px",
                    },
              },])
        :
              SetColumnsIfAnyAction([...columns])
        
    },[])

    const { totalCount, entities, listLoading } = {totalCount: 10, entities: datasets, listLoading: true}

    // Table pagination properties
    const paginationOptions = {
        custom: true,
        totalSize: totalCount,
        sizePerPageList: sizePerPageList,
        sizePerPage: pageSize,
        page: pageNumber,
    };

        return(<>
            <PaginationProvider pagination={paginationFactory(paginationOptions)}>
              {({ paginationProps, paginationTableProps }) => {
                return (
                  <Pagination
                    isLoading={listLoading}
                    paginationProps={paginationProps}
                  >
                    <BootstrapTable
                      wrapperClasses="table-responsive"
                      bordered={false}
                      classes="table table-head-custom table-vertical-center overflow-hidden"
                      bootstrap4
                      remote
                      keyField="id"
                      data={entities === null ? [] : entities}
                      columns={PropsColumnsIfAnyAction}
                      {...paginationTableProps}
                    >
                      <PleaseWaitMessage entities={entities} />
                      <NoRecordsFoundMessage entities={entities} />
                    </BootstrapTable>
                  </Pagination>
                );
              }}
            </PaginationProvider>
          </>)
}

export default BootstrapTableHelper