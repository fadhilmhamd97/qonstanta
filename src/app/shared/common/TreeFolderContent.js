import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { TreeMapperService } from "../helper/index";
import FolderIcon from '@material-ui/icons/Folder';
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(1),
    },
  },
  expanded: {
    marginLeft: 10 + 'px'
  },
  selected: {
    color: 'blue'
  },
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

const StyledTreeItem = (props) => {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 2,
    maxWidth: 560
  },
});

const TreeFolderContent = ({propsNode, onChoose}) => {
  const classes = useStyles();

  const IconProps = icon => {
    switch(icon){
      case "book":
        return LibraryBooksIcon
      case "video":
        return VideoLibraryIcon
      default:
        return FolderIcon
    }
  }

  const [propsContext, setContext] = useState(undefined)

  useEffect(cb => {
    onChoose(propsContext)
  },[propsContext])

  const ChildProp = ({menus}) => {
    return (<>{menus.map((menu, i) => {
        const {id, description, hierarchyType, childs, icon, link} = menu;
        return (<StyledTreeItem  onClick={() => setContext(menu)} key={i} nodeId={id} labelText={description} labelIcon={IconProps(icon)}>
            {(childs.length > 0 && <ChildProp menus={childs} />)}
          </StyledTreeItem>
        );
      })
    }</>)
  }

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['1']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 1 }} />}
    >
      <ChildProp menus={propsNode}/>
    </TreeView>
  );
}

export default TreeFolderContent