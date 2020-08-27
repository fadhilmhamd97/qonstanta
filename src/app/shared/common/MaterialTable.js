import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';

import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));

const TablePaginationActions = (props) => {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0)
    }

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    }

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    }

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
        <div className={classes.root}>
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="First Page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Last Page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </div>
      );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

const MaterialTable = ({columns, datasets, actions = [], handleViewAction, withReturnId = false, handleEditAction, handleDeleteAction}) => {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
      setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10))
  }

  const ButtonActions = ({actions, withReturnId, id = undefined}) => {

    const style = {
        margin: '2px'
    }

    const handleEditWithId = id => {
      handleEditAction(id)
    }

    const handleViewWithId = id => {
      handleViewAction(id)
    }

    const handleDeleteWithId = id => {
      handleDeleteAction(id)
    }

    return(<>
      {withReturnId ?
        actions.map(v => {
          if(v === 'edit') return(<Button size="small" onClick={() => handleEditWithId(id)} variant="contained" style={style} color="primary" startIcon={<CreateIcon />}>Edit</Button>)
          if(v === 'view') return(<Button size="small" onClick={() => handleViewWithId(id)} variant="contained" style={style} startIcon={<VisibilityIcon />}>View</Button>)
          if(v === 'delete') return(<Button size="small" onClick={() => handleDeleteWithId(id)} variant="contained" color="secondary" style={style} startIcon={<DeleteIcon />}>Delete</Button>)
          if(v === 'add') return(<Button size="small" variant="contained" color="primary" style={style} startIcon={<AddIcon />}>Add</Button>)
        })
        :
        actions.map(v => {
          if(v === 'edit') return(<Button size="small" onClick={handleEditAction} variant="contained" style={style} color="primary" startIcon={<CreateIcon />}>Edit</Button>)
          if(v === 'view') return(<Button size="small" onClick={handleViewAction} variant="contained" style={style} startIcon={<VisibilityIcon />}>View</Button>)
          if(v === 'delete') return(<Button size="small" onClick={handleDeleteAction} variant="contained" color="secondary" style={style} startIcon={<DeleteIcon />}>Delete</Button>)
          if(v === 'add') return(<Button size="small" variant="contained" color="primary" style={style} startIcon={<AddIcon />}>Add</Button>)
        })}
    </>)

  }

  return (
        <Table className={classes.table}>
          <TableHead>
              <TableRow>
                  {columns.map((v, i) => {
                      return(<TableCell key={i}>{v['title']}</TableCell>)
                  })}
                  {actions.length > 0 ? <TableCell>Actions</TableCell> : <></>}
              </TableRow>
          </TableHead>
          <TableBody>
            {datasets.length > 0 ? datasets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((v, i) => (
              <TableRow key={i}>
                {columns.map((v1, i1) => {
                    return(<TableCell key={`${i}.${i1}`}>{v[v1['value']]}</TableCell>)
                })}
                <TableCell key={`action-${i}`}>
                  {actions.length > 0 ? <ButtonActions id={v['id']} actions={actions} withReturnId={withReturnId} /> : <></>}
                </TableCell>
              </TableRow>
            )) : <TableRow key={1}><TableCell style={{textAlign: 'center'}} colSpan={columns.length + 1} key={1}>No Data Available</TableCell></TableRow>}

            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={columns.length + 1} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={columns.length + 1}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'Rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
  );
}

export default MaterialTable